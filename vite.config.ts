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
        // Alternative: Use JS string splitting
        const registrationBlocks = content.split('ModuleRegistry.register');

        // Start from the second element (index 1) as the first is content before any registration
        for (let i = 1; i < registrationBlocks.length; i++) {
            const block = registrationBlocks[i];

            // Find the first opening parenthesis
            const openParenIndex = block.indexOf('(');
            if (openParenIndex === -1) continue; // Malformed block

            // Find the matching closing parenthesis (simple approach: find first one after open)
            // A more robust parser might handle nested parentheses, but unlikely here.
            const closeParenIndex = block.indexOf(')', openParenIndex);
            if (closeParenIndex === -1) continue; // Malformed block

            // Extract content between parentheses
            const argsContent = block.substring(
                openParenIndex + 1,
                closeParenIndex,
            );

            // Use regex to find the two quoted arguments within the parentheses content
            const argRegex = /['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/;
            const argMatch = argsContent.match(argRegex);

            if (!argMatch || argMatch.length < 3) {
                console.warn(
                    `  Skipping block - could not extract 2 quoted args from: ${argsContent.trim().substring(0, 50)}...`,
                );
                continue;
            }

            // Captured groups are index 1 and 2
            const name = argMatch[1]; // No extra trim/replace needed if captured correctly
            const path = argMatch[2];

            // Validate the extracted path
            if (
                name &&
                path &&
                path.startsWith('src/modules/') &&
                path.endsWith('.ts')
            ) {
                console.log(`  Processing registration: ${name} -> ${path}`);
                registrations.push({ name, path });
            } else {
                console.warn(
                    `  Skipping potentially invalid registration found: Name='${name}', Path='${path}'`,
                );
            }
        }
    } catch (error) {
        console.error(
            `Error reading or processing ${registrationFilePath}:`,
            error,
        );
        // Decide if build should fail here? For now, continue with potentially empty registrations.
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
