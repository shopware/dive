import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

interface ActionDefinition {
    name: string;
    description: string;
    payloadType: string;
    returnType: string;
    sourceFile: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INSERT_MARKER = '<!-- INSERT_ACTIONS -->';
const END_MARKER = '<!-- END_ACTIONS -->';

function findTypeDefinition(type: string): string | null {
    // Handle built-in types
    if (
        [
            'string',
            'number',
            'boolean',
            'void',
            'unknown',
            'null',
            'undefined',
            'object',
        ].includes(type)
    ) {
        return null;
    }

    // Handle special cases
    const specialTypes: Record<string, string> = {
        Vector3Like: 'https://threejs.org/docs/#api/en/math/Vector3',
        DIVESceneFileType: 'src/types/SceneType.ts',
        DIVESceneData: 'src/types/SceneData.ts',
        DIVESceneObject: 'src/types/SceneObjects.ts',
        COMEntity: 'src/plugins/state/types.ts',
    };

    if (type in specialTypes) {
        return specialTypes[type];
    }

    // Search in types directory
    const typesDir = path.join(process.cwd(), 'src/types');
    if (fs.existsSync(typesDir)) {
        for (const file of fs.readdirSync(typesDir)) {
            if (file.endsWith('.ts')) {
                const content = fs.readFileSync(
                    path.join(typesDir, file),
                    'utf-8',
                );
                if (
                    new RegExp(`(type|interface|enum)\\s+${type}\\b`).test(
                        content,
                    )
                ) {
                    return `src/types/${file}`;
                }
            }
        }
    }

    // Search in src directory
    const srcDir = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcDir)) {
        for (const file of fs.readdirSync(srcDir)) {
            if (file.endsWith('.ts')) {
                const content = fs.readFileSync(
                    path.join(srcDir, file),
                    'utf-8',
                );
                if (
                    new RegExp(`(type|interface|enum)\\s+${type}\\b`).test(
                        content,
                    )
                ) {
                    return `src/${file}`;
                }
            }
        }
    }

    return null;
}

function formatType(type: string): string {
    // Handle generic types (Map, Array, Promise, etc.)
    const genericMatch = type.match(/^([A-Za-z0-9_]+)<(.+)>$/);
    if (genericMatch) {
        const [
            ,
            baseType,
            genericParams,
        ] = genericMatch;
        const typeDef = findTypeDefinition(baseType);
        const formattedBaseType = typeDef
            ? `[${baseType}](${typeDef})`
            : baseType;

        // Format each generic parameter
        const formattedParams = genericParams
            .split(',')
            .map((param) => {
                param = param.trim();
                // Handle keyof operator in generic parameters
                if (param.startsWith('keyof ')) {
                    const baseType = param.substring(6);
                    const typeDef = findTypeDefinition(baseType);
                    return `keyof ${typeDef ? `[${baseType}](${typeDef})` : baseType}`;
                }
                // Handle complex types in generic parameters
                if (
                    param.includes('{') ||
                    param.includes('|') ||
                    param.includes('&')
                ) {
                    return param.replace(/\b([A-Za-z0-9_]+)\b/g, (match) => {
                        const typeDef = findTypeDefinition(match);
                        return typeDef ? `[${match}](${typeDef})` : match;
                    });
                }
                // Handle simple types in generic parameters
                const typeDef = findTypeDefinition(param);
                return typeDef ? `[${param}](${typeDef})` : param;
            })
            .join(', ');

        return `${formattedBaseType}<${formattedParams}>`;
    }

    // Handle keyof operator
    if (type.startsWith('keyof ')) {
        const baseType = type.substring(6);
        const typeDef = findTypeDefinition(baseType);
        return `keyof ${typeDef ? `[${baseType}](${typeDef})` : baseType}`;
    }

    // Handle complex types (objects, unions, etc.)
    if (type.includes('{') || type.includes('|') || type.includes('&')) {
        return type.replace(/\b([A-Za-z0-9_]+)\b/g, (match) => {
            const typeDef = findTypeDefinition(match);
            return typeDef ? `[${match}](${typeDef})` : match;
        });
    }

    const typeDef = findTypeDefinition(type);
    if (typeDef) {
        return `[${type}](${typeDef})`;
    }
    return type;
}

function extractActionDefinitions(
    sourceFile: ts.SourceFile,
): ActionDefinition[] {
    const actions: ActionDefinition[] = [];

    function visit(node: ts.Node): void {
        // Handle Action.define
        if (ts.isVariableStatement(node)) {
            const declaration = node.declarationList.declarations[0];
            if (
                ts.isVariableDeclaration(declaration) &&
                ts.isIdentifier(declaration.name)
            ) {
                const initializer = declaration.initializer;
                if (initializer && ts.isCallExpression(initializer)) {
                    const callExpr = initializer;
                    // Loosened: match any .define call on something called Action
                    if (
                        ts.isPropertyAccessExpression(callExpr.expression) &&
                        callExpr.expression.name.text === 'define' &&
                        ts.isIdentifier(callExpr.expression.expression) &&
                        callExpr.expression.expression.text === 'Action'
                    ) {
                        const typeArgs = callExpr.typeArguments;
                        if (typeArgs && typeArgs.length >= 2) {
                            const payloadType = typeArgs[0].getText();
                            const returnType = typeArgs[2]
                                ? typeArgs[2].getText()
                                : 'void';
                            // Extract description from the options object
                            let description = '';
                            if (callExpr.arguments.length > 0) {
                                const optionsArg = callExpr.arguments[0];
                                if (ts.isObjectLiteralExpression(optionsArg)) {
                                    for (const prop of optionsArg.properties) {
                                        if (
                                            ts.isPropertyAssignment(prop) &&
                                            ts.isIdentifier(prop.name) &&
                                            prop.name.text === 'description' &&
                                            ts.isStringLiteral(prop.initializer)
                                        ) {
                                            description = prop.initializer.text;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (description) {
                                actions.push({
                                    name: declaration.name.text,
                                    description,
                                    payloadType,
                                    returnType,
                                    sourceFile: sourceFile.fileName,
                                });
                            }
                        }
                    }
                }
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return actions;
}

function findActionFiles(dir: string): string[] {
    const files: string[] = [];
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...findActionFiles(fullPath));
        } else if (
            stat.isFile() &&
            entry.endsWith('.ts') &&
            entry !== 'action.ts' &&
            entry !== 'index.ts'
        ) {
            files.push(fullPath);
        }
    }

    return files;
}

function escapeMarkdownTableCell(text: string): string {
    return text
        .replace(/\|/g, '\\|') // Escape pipe
        .replace(/\n/g, '<br/>') // Replace newlines with <br/>
        .replace(/\r/g, '') // Remove carriage returns
        .replace(/\s+$/gm, '') // Trim trailing whitespace on each line
        .trim();
}

function generateReadme(): void {
    const actionsDir = path.join(
        process.cwd(),
        'src/plugins/state/src/actions',
    );
    const actionsReferencePath = path.join(
        __dirname,
        '../actions-reference.md',
    );

    // Read template
    const actionsReferenceFile = fs.readFileSync(actionsReferencePath, 'utf-8');

    // Find all TypeScript files in actions directory recursively
    const actionFiles = findActionFiles(actionsDir);

    // Extract action definitions
    const actions: ActionDefinition[] = [];
    for (const file of actionFiles) {
        const sourceFile = ts.createSourceFile(
            file,
            fs.readFileSync(file, 'utf-8'),
            ts.ScriptTarget.Latest,
            true,
        );
        const fileActions = extractActionDefinitions(sourceFile);
        actions.push(...fileActions);
    }

    // Sort actions by name
    actions.sort((a, b) => a.name.localeCompare(b.name));

    // Generate actions section
    let actionsSection = '| Action | Description | Input | Return |\n';
    actionsSection += '|--------|-------------|-------|--------|\n';

    for (const action of actions) {
        const relativePath = path.relative(process.cwd(), action.sourceFile);
        const formattedPayloadType = escapeMarkdownTableCell(
            formatType(action.payloadType),
        );
        const formattedReturnType = escapeMarkdownTableCell(
            formatType(action.returnType),
        );
        actionsSection += `| [${action.name}](${relativePath}) | ${action.description} | <code>${formattedPayloadType}</code> | <code>${formattedReturnType}</code> |\n`;
    }

    actionsSection += '\n';

    // Replace the placeholder in the template
    const newContent = actionsReferenceFile.replace(
        new RegExp(`${INSERT_MARKER}[\\s\\S]*?${END_MARKER}`, 'g'),
        `${INSERT_MARKER}\n${actionsSection}${END_MARKER}`,
    );
    fs.writeFileSync(actionsReferencePath, newContent);

    console.log('Actions documentation generated successfully!');
}

generateReadme();
