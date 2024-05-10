import { fileURLToPath, URL } from 'url';
import fs from 'fs';
import path from 'path';
import ts from 'typescript';

// Define primitive types
const primitiveTypes = ['string', 'number', 'boolean', 'null', 'undefined'];

const object = {};

// Function to print properties of a type
function printProperties(type, object) {
    const properties = checker.getPropertiesOfType(type);
    properties.forEach(prop => {
        const propType = checker.getTypeOfSymbolAtLocation(prop, prop.declarations[0]);
        const typeName = checker.typeToString(propType);

        // primitive types
        if(typeName.endsWith('[]')) {
            object[prop.name] = typeName; // type defined
            return;
        }
        if(typeName.endsWith('string') || typeName.endsWith('"')) {
            object[prop.name] = typeName; // type defined
            return;
        }
        if(typeName.endsWith('number')) {
            object[prop.name] = typeName; // type defined
            return;
        }
        if(typeName.startsWith('Map<')) {
            object[prop.name] = typeName; // type defined
            return;
        }

        let deeperObject = {};
        // action name
        if(propType === typeName) {
            object[propType] = {}; // action defined
            deeperObject = object[propType];
        } else {
            object[prop.name] = {}; // type defined
            deeperObject = object[prop.name];
        }

        // complex type
        if (!primitiveTypes.includes(typeName)) {
            printProperties(propType, deeperObject);
        }
    });
  }



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, './template.md');
const targetPath = path.join(__dirname, '../README.md');

const tsFilePath = fileURLToPath(new URL('../src/com/actions/index.ts', import.meta.url));
const program = ts.createProgram([tsFilePath], {});
const checker = program.getTypeChecker();
const sourceFile = program.getSourceFile(tsFilePath);

// Find all interfaces
const interfaces = sourceFile.statements.filter(node => ts.isInterfaceDeclaration(node));

interfaces.forEach(interfaceNode => {
  if (ts.isInterfaceDeclaration(interfaceNode)) {
    const symbol = checker.getSymbolAtLocation(interfaceNode.name);
    if (symbol) {
      const type = checker.getDeclaredTypeOfSymbol(symbol);
      printProperties(type, object);
    }
  }
});

fs.access(templatePath, fs.constants.F_OK, (err) => {
    if (err) throw err;

    fs.readFile(templatePath, 'utf8', (err, markdown) => {
        if (err) throw err;

        fs.access(targetPath, fs.constants.F_OK, (err) => {
            if (err) {
                // File does not exist, create it
                fs.writeFile(targetPath, markdown, (err) => {
                    if (err) throw err;
                });
            } else {
                // File exists, open a stream and write to it
                const writeStream = fs.createWriteStream(targetPath, { flags: 'w' });
                writeStream.write('\n' + markdown);
                writeStream.end();
            }
        });
    });
});

