import { resolve } from 'path';
import fs from 'fs';

interface PackageExports {
    types: string;
    import: string;
    require: string;
}

function validateBuildPaths(): void {
    console.log('[Dive Build] Validating build paths...');
    const buildDir = resolve(process.cwd());
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    let hasErrors = false;

    // Validate main entry point
    const mainEntry = packageJson.exports['.'] as PackageExports;
    if (mainEntry) {
        const mainFiles = [
            mainEntry.types,
            mainEntry.import,
            mainEntry.require,
        ];
        mainFiles.forEach((file) => {
            const fullPath = resolve(buildDir, file);
            console.log('Checking file:', fullPath);
            if (!fs.existsSync(fullPath)) {
                console.error(`[Build Error] Missing main entry file: ${file}`);
                hasErrors = true;
            }
        });
    }

    // Validate module entries
    Object.entries(packageJson.exports).forEach(
        ([
            path,
            entry,
        ]) => {
            if (path === '.') return; // Skip main entry

            const moduleEntry = entry as PackageExports;
            const moduleFiles = [
                moduleEntry.types,
                moduleEntry.import,
                moduleEntry.require,
            ];
            moduleFiles.forEach((file) => {
                const fullPath = resolve(buildDir, file);
                console.log('Checking file:', fullPath);
                if (!fs.existsSync(fullPath)) {
                    console.error(
                        `[Build Error] Missing module file for ${path}: ${file}`,
                    );
                    hasErrors = true;
                }
            });
        },
    );

    if (hasErrors) {
        console.error(
            '[Dive Build] Build path validation failed. Some files are missing.',
        );
        process.exit(1);
    } else {
        console.log('[Dive Build] All build paths are valid.');
    }
}

// Run validation
validateBuildPaths();
