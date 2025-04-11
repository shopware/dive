import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
// import { globSync } from 'glob'; // No longer needed
import fs from 'fs';
import type { Plugin } from 'vite';

interface ModuleRegistration {
    name: string;
    path: string; // Original src path
}

// Plugin to discover modules, configure library build, and inject path map
function moduleBuildPlugin(): Plugin {
    // --- Discover Registrations (Done outside hooks, runs once when vite.config.js is loaded) ---
    console.log(
        '[Dive Build] Discovering module registrations from src/modules/index.ts...',
    );
    const projectRoot = process.cwd(); // Get project root directory
    const registrationFilePath = resolve(projectRoot, 'src/modules/index.ts');
    const registrations: ModuleRegistration[] = [];

    try {
        const content = fs.readFileSync(registrationFilePath, 'utf-8');
        console.log(
            `Read ${content.length} characters from ${registrationFilePath}`,
        );

        // Log a snippet of the file content
        console.log(`File content snippet:\n${content.substring(0, 500)}...`);

        // Look for the MODULE_PATHS object definition with more permissive regex
        const mapRegex = /export\s+const\s+MODULE_PATHS\s*=\s*({[\s\S]*?})\s*;/;
        const mapMatch = content.match(mapRegex);

        if (!mapMatch || !mapMatch[1]) {
            console.error('MODULE_PATHS map not found in src/modules/index.ts');
            // Continue with empty registrations array instead of returning
        } else {
            // Extract the object literal as a string
            const mapLiteral = mapMatch[1];
            console.log(
                `Found map literal: ${mapLiteral.substring(0, 200)}...`,
            );

            // Try a simpler approach - split by lines and look for key-value pairs
            const lines = mapLiteral.split('\n');
            console.log(`Map has ${lines.length} lines`);

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

                    console.log(
                        `[Debug] Found module in line: '${line.trim()}' -> Name='${name}', Path='${path}'`,
                    );

                    // Validate the source path exists
                    const absoluteSrcPath = resolve(projectRoot, path);
                    if (!fs.existsSync(absoluteSrcPath)) {
                        console.error(
                            `[Build Error] Source file for module '${name}' not found at expected path: ${absoluteSrcPath}`,
                        );
                        // Skip this invalid registration
                        continue;
                    }

                    // Add to registrations array
                    registrations.push({ name, path });
                } else {
                    // This line might contain a key-value pair but our regex didn't match
                    if (line.includes(':') && line.includes("'")) {
                        console.log(
                            `[Debug] Couldn't parse line: '${line.trim()}'`,
                        );
                    }
                }
            }

            // If no entries were found, try to inspect why
            if (registrations.length === 0) {
                console.error(
                    `No entries found in map literal. Double-check the format:`,
                );
                console.error(mapLiteral);
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
            'No module registrations found in src/modules/index.ts. Build might be incomplete.',
        );
    }

    // --- Prepare Build Path Map (Done outside hooks) ---
    const moduleBuildPathMap: Record<string, string> = {};
    registrations.forEach(({ name, path }) => {
        // Extract relative path: remove 'src/modules/' and '.ts'
        const relativePath = path.replace(/^src\/modules\/|\.ts$/g, '');
        if (!relativePath) {
            console.error(
                `Could not determine relative path for ${name} (${path})`,
            );
            return;
        }
        // Value for runtime import (relative from build/index.mjs)
        moduleBuildPathMap[name] = `./modules/${relativePath}.mjs`;
    });

    return {
        name: 'module-build-config',

        // Use the config hook to modify the config before it's resolved
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        config(_userConfig, { command: _command }) {
            console.log('[Dive Build] config hook running...');
            // --- Prepare Build Config ---
            const rollupInput: Record<string, string> = {
                index: resolve(projectRoot, 'src/index.ts'), // Main entry point
            };
            registrations.forEach(({ path }) => {
                // Extract relative path again (or pass from outer scope)
                const relativePath = path.replace(/^src\/modules\/|\.ts$/g, '');
                if (!relativePath) return; // Skip if path is invalid

                // Key for Rollup output file structure
                rollupInput[`modules/${relativePath}`] = resolve(
                    projectRoot,
                    path,
                );
            });
            console.log('Generated Rollup inputs:', Object.keys(rollupInput));

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
            console.log(
                `Defining __MODULE_BUILD_PATHS__ with ${Object.keys(moduleBuildPathMap).length} entries.`,
            );

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
    // Most build config is now handled by the plugin
    // Keep other top-level configs like server, resolve, etc. if needed

    plugins: [
        moduleBuildPlugin(),
        dts({
            // Handles .d.ts generation
            // Review DTS config for multi-entry: rollupTypes might be better
            // to generate individual .d.ts files alongside modules if desired.
            // Current setup likely focuses on src/index.ts -> build/index.d.ts
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
