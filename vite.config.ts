import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve, join } from 'path';
import fs from 'fs';
import type { Plugin } from 'vite';

const MODULES_PATH = 'src/modules';

interface ModuleRegistration {
    name: string;
    path: string; // Original src path
}

// Function to update package.json exports
function updatePackageJsonExports(registrations: ModuleRegistration[]): void {
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Start with the main entry point
    const exports: Record<
        string,
        {
            types: string;
            import: string;
            require: string;
        }
    > = {
        '.': {
            types: './build/index.d.ts',
            import: './build/index.mjs',
            require: './build/index.cjs',
        },
    };

    // Add each module to exports
    registrations.forEach(({ name }) => {
        const modulePath = `./${name}`;
        exports[modulePath] = {
            types: `./build/src/modules/${name}.d.ts`,
            import: `./build/src/modules/${name}.mjs`,
            require: `./build/src/modules/${name}.cjs`,
        };
    });

    // Update package.json
    packageJson.exports = exports;
    fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 4) + '\n',
    );
    console.log('[Dive Build] Updated package.json exports');
}

// Plugin to discover modules, configure library build, and inject path map
function moduleBuildPlugin(): Plugin {
    // --- Discover Registrations (Done outside hooks, runs once when vite.config.js is loaded) ---
    console.log(`[Dive Build] Discovering module registrations...`);
    const projectRoot = process.cwd(); // Get project root directory
    const registrationFilePath = resolve(
        projectRoot,
        `${MODULES_PATH}/index.ts`,
    );
    const registrations: ModuleRegistration[] = [];

    try {
        const content = fs.readFileSync(registrationFilePath, 'utf-8');

        // Look for the MODULE_PATHS object definition with more permissive regex
        const mapRegex = /export\s+const\s+MODULE_PATHS\s*=\s*({[\s\S]*?})\s*;/;
        const mapMatch = content.match(mapRegex);

        if (!mapMatch || !mapMatch[1]) {
            console.error(
                `MODULE_PATHS map not found in ${MODULES_PATH}/index.ts`,
            );
            // Continue with empty registrations array instead of returning
        } else {
            // Extract the object literal as a string
            const mapLiteral = mapMatch[1];

            // Try a simpler approach - split by lines and look for key-value pairs
            const lines = mapLiteral.split('\n');

            for (const line of lines) {
                // Skip empty lines or lines without a colon (not key-value)
                if (!line.trim() || !line.includes(':')) continue;

                // Extract key and value with regex
                const lineRegex =
                    /\s*['"]?([^'":\s]+)['"]?\s*:\s*['"]([^'"]+)['"]/;
                const match = line.match(lineRegex);

                if (match && match.length >= 3) {
                    const name = match[1];
                    const path = match[2];

                    // Convert relative path to absolute path for validation
                    const absoluteSrcPath = resolve(
                        projectRoot,
                        MODULES_PATH,
                        path,
                    );
                    if (!fs.existsSync(absoluteSrcPath)) {
                        console.error(
                            `[Build Error] Source file for module '${name}' not found at expected path: ${absoluteSrcPath}`,
                        );
                        // Skip this invalid registration
                        continue;
                    }

                    // Add to registrations array with the relative path
                    registrations.push({
                        name,
                        path: join(MODULES_PATH, path), // Use path.join to maintain relative paths
                    });
                }
            }

            // If no entries were found, try to inspect why
            if (registrations.length === 0) {
                console.error(
                    `No entries found in map literal. Double-check the format:`,
                    mapLiteral,
                );
            }
        }
    } catch (error) {
        console.error(
            `Error reading or processing ${registrationFilePath}:`,
            error,
        );
        // Continue with potentially empty registrations
    }

    console.log(`Found ${registrations.length} module registrations.`);
    if (registrations.length === 0) {
        console.warn(
            `No module registrations found in ${MODULES_PATH}/index.ts. Build might be incomplete.`,
        );
    } else {
        console.log('Found modules:');
        registrations.forEach(({ name, path }) => {
            console.log(`- ${name}: ${path}`);
        });
    }

    // Update package.json exports
    updatePackageJsonExports(registrations);

    // --- Prepare Build Path Map (Done outside hooks) ---
    const moduleBuildPathMap: Record<string, string> = {};
    registrations.forEach(({ name, path }) => {
        // Extract relative path: remove 'src/modules/' and '.ts'
        const relativePath = path.replace(
            new RegExp(`^${MODULES_PATH}/|\\.ts$`, 'g'),
            '',
        );
        if (!relativePath) {
            console.error(
                `Could not determine relative path for ${name} (${path})`,
            );
            return;
        }
        // Value for runtime import (relative from build/index.mjs)
        moduleBuildPathMap[name] = `./src/modules/${relativePath}.mjs`;
    });

    return {
        name: 'module-build-config',

        // Use the config hook to modify the config before it's resolved
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        config(_userConfig, { command: _command }) {
            console.log('[Dive Build] Configuring build...');
            // --- Prepare Build Config ---
            const rollupInput: Record<string, string> = {
                index: resolve(projectRoot, 'src/index.ts'), // Main entry point
            };
            registrations.forEach(({ path }) => {
                // Extract relative path again (or pass from outer scope)
                const relativePath = path.replace(
                    new RegExp(`^${MODULES_PATH}/|\\.ts$`, 'g'),
                    '',
                );
                if (!relativePath) return; // Skip if path is invalid

                // Key for Rollup output file structure
                rollupInput[`${MODULES_PATH}/${relativePath}`] = resolve(
                    projectRoot,
                    path,
                );
            });

            // --- Define Build Options ---
            const buildConfig: UserConfig['build'] = {
                lib: {
                    entry: rollupInput,
                    name: 'dive',
                },
                sourcemap: true,
                minify: true,
                outDir: 'build',
                emptyOutDir: true,
                rollupOptions: {
                    input: rollupInput,
                    output: [
                        {
                            format: 'esm',
                            entryFileNames: '[name].mjs',
                            chunkFileNames: 'chunks/[name]-[hash].mjs',
                            exports: 'named',
                            inlineDynamicImports: false,
                        },
                        {
                            format: 'cjs',
                            entryFileNames: '[name].cjs',
                            chunkFileNames: 'chunks/[name]-[hash].cjs',
                            exports: 'named',
                            inlineDynamicImports: false,
                        },
                    ],
                    external: [
                        'three',
                        '@tweenjs/tween.js',
                        'three-spritetext',
                    ],
                },
            };

            // --- Define Path Map Injection ---
            const defineConfig: Record<string, string> = {
                __MODULE_BUILD_PATHS__: JSON.stringify(moduleBuildPathMap),
            };

            // Return the modifications to be merged into the user config
            return {
                build: buildConfig,
                define: defineConfig,
            };
        },
    };
}

// --- Main Vite Export ---
export default defineConfig({
    plugins: [
        moduleBuildPlugin(),
        dts({
            insertTypesEntry: true,
            outDir: 'build',
            tsconfigPath: './tsconfig.json',
            include: ['src/**/*.ts'],
            exclude: [
                'src/**/__test__/**',
                'src/**/*.test.ts',
                'src/**/*.spec.ts',
            ],
        }),
    ],
});
