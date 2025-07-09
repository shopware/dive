import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const ACTIONS_FOLDER = 'src/plugins/state/src/actions';
const README_PATH = 'src/plugins/state/README.md';

interface ActionDefinition {
    name: string;
    description: string;
    sourceFile: string;
}

const INSERT_MARKER = '<!-- INSERT_ACTIONS -->';
const END_MARKER = '<!-- END_ACTIONS -->';

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
                                sourceFile: sourceFile.fileName,
                            });
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
    let actionsSection = '| Action | Description |\n';
    actionsSection += '|--------|-------------|\n';

    for (const action of actions) {
        const relativePath = path.posix.relative(readmeDir, action.sourceFile);
        actionsSection += `| [${action.name}](${relativePath}) | ${action.description} |\n`;
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
