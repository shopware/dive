import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const ACTIONS_FOLDER = 'src/plugins/state/src/actions';
const README_PATH = 'src/plugins/state/README.md';
const MAIN_BRANCH = 'trunk';

let allTsFiles: string[] | null = null;

function findAllTypeScriptFiles(dir: string): string[] {
    const files: string[] = [];
    const entries = fs.readdirSync(dir);

    for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (entry.includes('__test__')) {
                continue;
            }
            files.push(...findAllTypeScriptFiles(fullPath));
        } else if (stat.isFile() && entry.endsWith('.ts')) {
            files.push(fullPath);
        }
    }

    return files;
}

interface ActionDefinition {
    name: string;
    description: string;
    payloadType: string;
    returnType: string;
    sourceFile: string;
}

const INSERT_MARKER = '<!-- INSERT_ACTIONS -->';
const END_MARKER = '<!-- END_ACTIONS -->';

function getGitRepoUrl(): string | null {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(
            fs.readFileSync(packageJsonPath, 'utf-8'),
        );
        let repository = packageJson.repository;
        if (typeof repository === 'object' && repository.url) {
            repository = repository.url;
        }

        if (typeof repository === 'string') {
            if (repository.startsWith('git@')) {
                return `https://${repository
                    .substring(4)
                    .replace(/:/, '/')
                    .replace(/.git$/, '')}`;
            }

            return repository.replace(/^git\+/, '').replace(/.git$/, '');
        }
    }
    return null;
}

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
            'Promise',
            'Map',
            'Array',
            'Partial',
        ].includes(type)
    ) {
        return null;
    }

    // Handle special cases
    const specialTypes: Record<string, string> = {
        Vector3Like: 'https://threejs.org/docs/#api/en/math/Vector3',
    };

    if (type in specialTypes) {
        return specialTypes[type];
    }

    if (!allTsFiles) {
        const srcDir = path.join(process.cwd(), 'src');
        allTsFiles = findAllTypeScriptFiles(srcDir);
    }

    for (const file of allTsFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        if (
            new RegExp(
                `^\\s*(export\\s+)?(type|interface|enum|class)\\s+${type}\\b`,
                'm',
            ).test(content)
        ) {
            return file;
        }
    }

    return null;
}

function makePathRelative(
    filePath: string | null,
    relativeTo: string,
): string | null {
    if (!filePath || filePath.startsWith('http')) {
        return filePath;
    }

    const repoUrl = getGitRepoUrl();
    if (repoUrl) {
        const relativePath = path.posix.relative(process.cwd(), filePath);
        return `${repoUrl}/blob/${MAIN_BRANCH}/${relativePath}`;
    }

    return path.posix.relative(relativeTo, path.join(process.cwd(), filePath));
}

function formatType(type: string, relativeTo: string): string {
    const formatLink = (
        typeName: string,
        typeDefPath: string | null,
    ): string => {
        const relativePath = makePathRelative(typeDefPath, relativeTo);
        return relativePath ? `[${typeName}](${relativePath})` : typeName;
    };

    // Handle array types
    const arrayMatch = type.match(/^(.*)\[\]$/);
    if (arrayMatch) {
        const baseType = arrayMatch[1];
        return `${formatType(baseType, relativeTo)}[]`;
    }

    // Handle generic types (Map, Array, Promise, etc.)
    const genericMatch = type.match(/^([A-Z][A-Za-z0-9_]+)<(.+)>$/);
    if (genericMatch) {
        const [
            ,
            baseType,
            genericParams,
        ] = genericMatch;
        const formattedBaseType = formatLink(
            baseType,
            findTypeDefinition(baseType),
        );

        // Format each generic parameter
        const formattedParams = genericParams
            .split(',')
            .map((param) => {
                param = param.trim();
                // Handle keyof operator in generic parameters
                if (param.startsWith('keyof ')) {
                    const baseTypeName = param.substring(6);
                    return `keyof ${formatLink(baseTypeName, findTypeDefinition(baseTypeName))}`;
                }
                // Handle complex types in generic parameters
                if (
                    param.includes('{') ||
                    param.includes('|') ||
                    param.includes('&')
                ) {
                    return param.replace(
                        /\b([A-Z][A-Za-z0-9_]*)\b/g,
                        (match) => {
                            return formatLink(match, findTypeDefinition(match));
                        },
                    );
                }
                // Handle simple types in generic parameters
                return formatLink(param, findTypeDefinition(param));
            })
            .join(', ');

        return `${formattedBaseType}<${formattedParams}>`;
    }

    // Handle keyof operator
    if (type.startsWith('keyof ')) {
        const baseType = type.substring(6);
        return `keyof ${formatLink(baseType, findTypeDefinition(baseType))}`;
    }

    // Handle complex types (objects, unions, etc.)
    if (type.includes('{') || type.includes('|') || type.includes('&')) {
        return type.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (match) => {
            return formatLink(match, findTypeDefinition(match));
        });
    }

    return formatLink(type, findTypeDefinition(type));
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
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br/>') // Replace newlines with <br/>
        .replace(/\r/g, '') // Remove carriage returns
        .replace(/\s+$/gm, '') // Trim trailing whitespace on each line
        .trim();
}

function generateReadme(): void {
    const actionsDir = path.join(process.cwd(), ACTIONS_FOLDER);
    const readmePath = path.join(process.cwd(), README_PATH);
    const readmeDir = path.dirname(readmePath);

    // Read template
    const actionsReferenceFile = fs.readFileSync(readmePath, 'utf-8');

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
        const relativePath = path.posix.relative(readmeDir, action.sourceFile);
        const formattedPayloadType = escapeMarkdownTableCell(
            formatType(action.payloadType, readmeDir),
        );
        const formattedReturnType = escapeMarkdownTableCell(
            formatType(action.returnType, readmeDir),
        );
        actionsSection += `| [${action.name}](${relativePath}) | ${action.description} | <code>${formattedPayloadType}</code> | <code>${formattedReturnType}</code> |\n`;
    }

    actionsSection += '\n';

    // Replace the placeholder in the template
    const newContent = actionsReferenceFile.replace(
        new RegExp(`${INSERT_MARKER}[\\s\\S]*?${END_MARKER}`, 'g'),
        `${INSERT_MARKER}\n${actionsSection}${END_MARKER}`,
    );
    fs.writeFileSync(readmePath, newContent);

    console.log('Actions documentation generated successfully!');
}

generateReadme();
