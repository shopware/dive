/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * This script generates a README.md file based on the interfaces defined in the source code.
 */

import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import pkgjson from '../../package.json';

const templatePath = path.resolve(__dirname, './template/TEMPLATE_README.md');
const targetPath = path.resolve('./README.md');
const actionIndexFile = path.resolve('./src/com/actions/index.ts');

function extractInterfaces(mainFile: string) {
    function extractInterfaceDetails(filePath: string) {
        const sourceCode = fs.readFileSync(filePath, 'utf8');
        const sourceFile = ts.createSourceFile(path.basename(filePath), sourceCode, ts.ScriptTarget.Latest);
        const interfaces: { name: string; description: string; payload: string; returnType: string; filePath: string }[] = [];

        function visit(node: ts.Node) {
            // Look for interface declarations
            if (ts.isInterfaceDeclaration(node)) {
                const name = node.name.text;
                let description = '';
                let payload = '';
                let returnType = '';

                // Extract DESCRIPTION, PAYLOAD, and RETURN
                node.members.forEach(member => {
                    if (ts.isPropertySignature(member)) {
                        const memberName = member.name.getText(sourceFile);
                        if (member.type && memberName === 'DESCRIPTION') {
                            description = member.type.getText(sourceFile);
                        } else if (member.type && memberName === 'PAYLOAD') {
                            payload = member.type.getText(sourceFile);
                        } else if (member.type && memberName === 'RETURN') {
                            returnType = member.type.getText(sourceFile);
                        }
                    }
                });

                // create a relative path to the file for adding to the table
                const packageName = pkgjson.name;
                const [packagePath, relativeFilePath] = filePath.split(packageName);

                interfaces.push({ name, description, payload, returnType, filePath: relativeFilePath });
            }

            ts.forEachChild(node, visit);
        }

        ts.forEachChild(sourceFile, visit);
        return interfaces;
    }

    function getImportedInterfaces(mainFilePath: string) {
        const sourceCode = fs.readFileSync(mainFilePath, 'utf8');
        const sourceFile = ts.createSourceFile(path.basename(mainFilePath), sourceCode, ts.ScriptTarget.Latest);
        const importPaths: string[] = [];

        function visit(node: ts.Node) {
            // Collect import declarations
            if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
                const importPath = node.moduleSpecifier.text;
                const resolvedPath = path.resolve(path.dirname(mainFilePath), importPath.replace('.js', '.ts'));
                importPaths.push(resolvedPath);
            }

            ts.forEachChild(node, visit);
        }

        ts.forEachChild(sourceFile, visit);
        return importPaths;
    }

    // Change this to your main TS file path
    const mainFilePath = path.resolve(__dirname, mainFile);

    // Get all imported interface files
    const importPaths = getImportedInterfaces(mainFilePath);
    const extractedInterfaces = importPaths.flatMap(importPath => extractInterfaceDetails(importPath));
    return extractedInterfaces;
}

// create table
const interfaces = extractInterfaces(actionIndexFile).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

let table = `
| Action                                                                           | Description                                                                                        |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
`;

let rowBuffer = '';
interfaces.forEach(({ name, description, filePath }) => {
    // enter name and filepath
    rowBuffer = `| [${name}](${'.'.concat(filePath)})`;

    // fill up the rowBuffer with spaces
    rowBuffer.length < 83 ? rowBuffer += ' '.repeat(83 - rowBuffer.length) : rowBuffer += ' ';

    // enter the description and cut away leading and trailing quotes
    rowBuffer += `| ${description.slice(1, description.length - 1)}`;

    // fill up the rowBuffer with spaces
    rowBuffer.length < 184 ? rowBuffer += ' '.repeat(184 - rowBuffer.length) : rowBuffer += ' ';

    // finish the row with a newline
    rowBuffer += '|\n';

    // append the row to the table
    table += rowBuffer;
});

// finally, write the markdown to the README.md file
fs.access(templatePath, fs.constants.F_OK, (err) => {
    if (err) throw err;

    fs.readFile(templatePath, 'utf8', (err, templateMarkdown) => {
        if (err) throw err;

        fs.access(targetPath, fs.constants.F_OK, (err) => {
            if (err) {
                // File does not exist, create it
                fs.writeFile(targetPath, templateMarkdown, (err) => {
                    if (err) throw err;
                });
            } else {
                // File exists, open a stream and write to it
                const writeStream = fs.createWriteStream(targetPath, {
                    flags: 'w',
                });
                writeStream.write('\n' + templateMarkdown);
                writeStream.write('\n' + table);
                writeStream.end();
            }
        });
    });
});

