import {
    Project,
    SyntaxKind,
    NewExpression,
    StringLiteral,
    SourceFile,
} from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';

// --- Configuration ---
const projectRoot = process.cwd();
const buildDir = path.resolve(projectRoot, 'build'); // Base for build output
const tsConfigPath = path.resolve(projectRoot, 'tsconfig.json');
// --- End Configuration ---

console.log('[Module Importer Validation] Starting - Target: build/ directory');
if (!fs.existsSync(buildDir)) {
    console.error(
        `[Module Importer Validation Error] Build directory not found at: ${buildDir}`,
    );
    console.error(
        "Please run the main build command (e.g., 'npm run build:vite') before validation.",
    );
    process.exit(1);
}

const project = new Project({
    tsConfigFilePath: tsConfigPath,
    skipAddingFilesFromTsConfig: true,
});

// Add source files for analysis
project.addSourceFilesAtPaths(`${projectRoot}/**/*.ts`);

let errorCount = 0;

// Function to report errors consistently
const reportError = (message: string, node?: NewExpression) => {
    if (node) {
        const sourceFile = node.getSourceFile();
        const { line, column } = sourceFile.getLineAndColumnAtPos(
            node.getStart(),
        );
        console.error(
            `\n[Module Importer Validation Error] ${sourceFile.getFilePath()}:${line}:${column}`,
        );
        console.error(`> ${message}`);
        console.error(`> Offending code: ${node.getText()}`);
    } else {
        console.error(`\n[Module Importer Validation Error] ${message}`);
    }
    errorCount++;
};

project.getSourceFiles().forEach((sourceFile: SourceFile) => {
    sourceFile
        .getDescendantsOfKind(SyntaxKind.NewExpression)
        .forEach((newExpression: NewExpression) => {
            const identifier = newExpression.getExpression();
            if (identifier.getText().endsWith('ModuleImporter')) {
                const typeArgs = newExpression.getTypeArguments();
                const args = newExpression.getArguments();

                if (
                    typeArgs.length !== 1 ||
                    args.length !== 1 ||
                    args[0].getKind() !== SyntaxKind.StringLiteral
                ) {
                    return; // Skip malformed calls
                }

                const typeArgNode = typeArgs[0];
                const pathArgNode = args[0] as StringLiteral;

                const expectedTypeIdText = typeArgNode
                    .getText()
                    .replace(/['"]/g, '');
                const pathStringFromImporter = pathArgNode.getLiteralValue(); // Path like 'modules/file.ts'

                // --- Adjust Path Resolution ---
                // The path is now relative to srcDir, not the calling file's directory.

                // Calculate absolute SOURCE path by resolving from sourceDir
                const absoluteSrcPath = path.resolve(
                    projectRoot,
                    pathStringFromImporter,
                );

                // Path relative to build is just the original string (without .ts)
                const pathRelativeSrcDir = pathStringFromImporter;

                // --- Validation 1: Source File Existence (for AST Analysis) ---
                if (!fs.existsSync(absoluteSrcPath)) {
                    reportError(
                        `Source path '${pathStringFromImporter}' (resolved from src/) does not exist.\n  Expected absolute source path: ${absoluteSrcPath}`,
                        newExpression,
                    );
                    return; // Cannot perform AST analysis
                }
                if (!fs.statSync(absoluteSrcPath).isFile()) {
                    reportError(
                        `Source path '${pathStringFromImporter}' resolves to a directory, not a file.\n  Absolute path: ${absoluteSrcPath}`,
                        newExpression,
                    );
                    return;
                }

                // --- Validation 2: Expected Build File Existence ---
                // Construct the expected path within the build directory, including 'src'
                const buildPathBase = path
                    .resolve(buildDir, pathRelativeSrcDir) // Use path relative to src
                    .replace(/\.ts$/, ''); // Remove .ts extension

                const expectedBuildPathMjs = `${buildPathBase}.mjs`;
                const expectedBuildPathCjs = `${buildPathBase}.cjs`;

                if (
                    !fs.existsSync(expectedBuildPathMjs) &&
                    !fs.existsSync(expectedBuildPathCjs)
                ) {
                    reportError(
                        `Corresponding build output not found for source '${pathStringFromImporter}'.\n  Checked for:\n    - ${expectedBuildPathMjs}\n    - ${expectedBuildPathCjs}`,
                        newExpression,
                    );
                    // Don't return yet, we can still check the source file's exports/types
                } else {
                    console.log(
                        `[Module Importer Validation] Found build output for ${pathStringFromImporter}`,
                    );
                }

                // --- Validation 3 & 4: Target Source File Parsing & Export/Type Check ---
                let targetSourceFile;
                try {
                    targetSourceFile =
                        project.getSourceFile(absoluteSrcPath) ??
                        project.addSourceFileAtPath(absoluteSrcPath);
                    if (!targetSourceFile) {
                        // Should be caught by source file existence check, but good safeguard
                        throw new Error(
                            'Failed to add or retrieve source file in ts-morph project.',
                        );
                    }

                    // Perform Export Name Match (Validation 3)
                    const exportedDeclarations =
                        targetSourceFile.getExportedDeclarations();
                    let foundMatchingExport = false;
                    for (const [name] of exportedDeclarations.entries()) {
                        if (name === expectedTypeIdText) {
                            foundMatchingExport = true;
                            break;
                        }
                    }

                    if (!foundMatchingExport) {
                        const actualExports = Array.from(
                            exportedDeclarations.keys(),
                        );
                        reportError(
                            `Source file at '${pathStringFromImporter}' does not have an export named '${expectedTypeIdText}'.\n  Found exports: ${actualExports.length > 0 ? actualExports.join(', ') : 'None'}`,
                            newExpression,
                        );
                        // No need to return, other errors might exist
                    } else {
                        // Perform Type Assignability Check (Validation 4 - Optional but recommended)
                        const expectedType = typeArgNode.getType();
                        const targetExportDeclaration =
                            exportedDeclarations.get(expectedTypeIdText)?.[0];

                        if (targetExportDeclaration) {
                            // Add robust type checking logic here (as shown in previous examples)
                            // Example simplified check:
                            const constructorSig = targetExportDeclaration
                                .getType()
                                .getConstructSignatures();
                            if (
                                constructorSig.length === 0 &&
                                expectedType.getConstructSignatures().length > 0
                            ) {
                                reportError(
                                    `Export '${expectedTypeIdText}' from '${pathStringFromImporter}' does not appear to be a constructor, but ModuleImporter<${expectedTypeIdText}> implies one is expected.`,
                                    newExpression,
                                );
                            }
                            // Add more detailed assignability checks if needed...
                        }
                    }
                } catch (e) {
                    reportError(
                        `Failed during analysis of source file '${pathStringFromImporter}'.\n  Absolute path: ${absoluteSrcPath}\n  Error: ${e instanceof Error ? e.message : String(e)}`,
                        newExpression,
                    );
                }
            }
        });
});

if (errorCount > 0) {
    console.error(
        `\n[Module Importer Validation] Failed with ${errorCount} error(s).`,
    );
    process.exit(1);
} else {
    console.log(
        '\n[Module Importer Validation] All ModuleImporter paths and types validated successfully against build output.',
    );
}
