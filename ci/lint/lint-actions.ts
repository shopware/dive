/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// checkInterfaces.js
import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const ACTIONS_DIR = 'src/com/actions/'; // Adjust path as needed

// Define the required properties for each interface
const REQUIRED_PROPERTIES = ['DESCRIPTION', 'PAYLOAD', 'RETURN'];

// Specify the directory with TypeScript files to check
const INTERFACE_DIR = path.resolve(ACTIONS_DIR); // Adjust path as needed

/**
 * Check if an interface node has all required properties.
 * @param {ts.InterfaceDeclaration} interfaceNode
 * @returns {boolean}
 */
function hasRequiredProperties(interfaceNode: ts.InterfaceDeclaration) {
    const properties = interfaceNode.members.map(member => member.name && member.name.getText());
    return REQUIRED_PROPERTIES.every(prop => properties.includes(prop));
}

/**
 * Parse TypeScript file and find all interfaces.
 * @param {string} filePath
 * @returns {Array<{ name: string, missingProps: string[] }>}
 */
function checkInterfacesInFile(filePath: string) {
    const sourceFile = ts.createSourceFile(
        filePath,
        fs.readFileSync(filePath, 'utf8'),
        ts.ScriptTarget.ES2015,
        true
    );

    const missingProperties: { name: string, missingProps: string[] }[] = [];

    function visit(node: ts.Node) {
        if (ts.isInterfaceDeclaration(node)) {
            const interfaceName = node.name.escapedText;
            if (!hasRequiredProperties(node)) {
                const properties = node.members.map(member => member.name && member.name.getText());
                const missingProps = REQUIRED_PROPERTIES.filter(prop => !properties.includes(prop));
                missingProperties.push({ name: interfaceName as string, missingProps });
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return missingProperties;
}

/**
 * Recursively get all TypeScript files in a directory.
 * @param {string} dir
 * @returns {string[]}
 */
function getAllTsFiles(dir: string, isTopLevel = true) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries.flatMap((entry): string | string[] => {
        const res = path.resolve(dir, entry.name);

        // Only process files if they are in subdirectories or if this is not a top-level file
        if (entry.isDirectory()) {
            return getAllTsFiles(res, false);
        } else if (!isTopLevel && res.endsWith('.ts')) {
            return res;
        }

        return [];
    });
    return files;
}

const filesWithErrors: { name: string, file: string, missingProps: string[] }[] = [];

// Main function
function main() {
    const tsFiles = getAllTsFiles(INTERFACE_DIR);
    let hasErrors = false;

    tsFiles.forEach(file => {
        const missingPropsInFile = checkInterfacesInFile(file);
        if (missingPropsInFile.length > 0) {

            missingPropsInFile.forEach(({ name, missingProps }) => {
                filesWithErrors.push({ name, file, missingProps });
            });
            hasErrors = true;
        }
    });

    if (hasErrors) {
        filesWithErrors.forEach(({ name, file, missingProps }, index) => {
            if (index === 0) console.error(`\n`);
            console.error(`    Error: Interface ${name} is missing the following properties: ${missingProps.join(', ')} (File ${file})\n`);
        });

        process.exit(1);
    }
}

// Run the script
main();