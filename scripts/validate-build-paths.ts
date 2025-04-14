import { resolve } from 'path';
import fs from 'fs';

interface ModuleRegistration {
    name: string;
    path: string;
}

function validateBuildPaths(registrations: ModuleRegistration[]): void {
    console.log('[Dive Build] Validating build paths...');
    const buildDir = resolve(process.cwd(), 'build');
    let hasErrors = false;

    registrations.forEach(({ name, path }) => {
        const expectedFiles = [
            `${path.replace(/\.ts$/, '.d.ts')}`,
            `${path.replace(/\.ts$/, '.mjs')}`,
            `${path.replace(/\.ts$/, '.cjs')}`,
        ];

        expectedFiles.forEach((file) => {
            const fullPath = resolve(buildDir, file);
            console.log('Checking file:', fullPath);
            if (!fs.existsSync(fullPath)) {
                console.error(
                    `[Build Error] Missing build file for module '${name}': ${file}`,
                );
                hasErrors = true;
            }
        });
    });

    if (hasErrors) {
        console.error(
            '[Dive Build] Build path validation failed. Some module files are missing.',
        );
        process.exit(1);
    } else {
        console.log('[Dive Build] All build paths are valid.');
    }
}

// Read registrations from modules/index.ts
function getModuleRegistrations(): ModuleRegistration[] {
    const MODULES_PATH = 'src/modules';
    const projectRoot = process.cwd();
    const registrationFilePath = resolve(
        projectRoot,
        `${MODULES_PATH}/index.ts`,
    );
    const registrations: ModuleRegistration[] = [];

    try {
        const content = fs.readFileSync(registrationFilePath, 'utf-8');
        const mapRegex = /export\s+const\s+MODULE_PATHS\s*=\s*({[\s\S]*?})\s*;/;
        const mapMatch = content.match(mapRegex);

        if (!mapMatch || !mapMatch[1]) {
            console.error(
                `MODULE_PATHS map not found in ${MODULES_PATH}/index.ts`,
            );
            return registrations;
        }

        const mapLiteral = mapMatch[1];
        const lines = mapLiteral.split('\n');

        for (const line of lines) {
            if (!line.trim() || !line.includes(':')) continue;

            const lineRegex = /\s*['"]?([^'":\s]+)['"]?\s*:\s*['"]([^'"]+)['"]/;
            const match = line.match(lineRegex);

            if (match && match.length >= 3) {
                const name = match[1];
                const path = match[2];
                registrations.push({
                    name,
                    path: `${MODULES_PATH}/${path}`,
                });
            }
        }
    } catch (error) {
        console.error(
            `Error reading or processing ${registrationFilePath}:`,
            error,
        );
    }

    return registrations;
}

// Run validation
const registrations = getModuleRegistrations();
validateBuildPaths(registrations);
