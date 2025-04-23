import { resolve as pathResolve, join, relative } from 'path';
import * as fs from 'fs';
import { Plugin, UserConfig } from 'vite';

const MODULES_PATH = 'src/modules';

interface ModuleRegistration {
    name: string;
    path: string; // Original src path
}

// Function to update package.json exports
function updatePackageJsonExports(registrations: ModuleRegistration[]): void {
    const packageJsonPath = pathResolve(process.cwd(), 'package.json');
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
    registrations.forEach(({ name, path }) => {
        // Convert the source path to the build path structure
        const buildPath = path.replace(/\.ts$/, '');
        const modulePath = `./modules/${name}`;

        exports[modulePath] = {
            types: `./build/${buildPath}.d.ts`,
            import: `./build/${buildPath}.mjs`,
            require: `./build/${buildPath}.cjs`,
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

// Function to recursively find module files
function findModuleFiles(dir: string, projectRoot: string): string[] {
    let files: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(findModuleFiles(fullPath, projectRoot));
        } else if (
            entry.isFile() &&
            entry.name.endsWith('.ts') &&
            entry.name !== 'index.ts'
        ) {
            // Store path relative to project root
            files.push(relative(projectRoot, fullPath));
        }
    }
    return files;
}

// Plugin to discover modules, configure library build, and inject path map
export default function moduleBuildPlugin(): Plugin {
    // --- Discover Registrations (Scan files for ModuleClasses interface extension) ---
    console.log(
        `[Dive Build] Discovering module registrations by scanning ${MODULES_PATH}...`,
    );
    const projectRoot = process.cwd(); // Get project root directory
    const modulesDirAbs = pathResolve(projectRoot, MODULES_PATH);
    const registrations: ModuleRegistration[] = [];

    if (!fs.existsSync(modulesDirAbs)) {
        console.warn(
            `[Dive Build] Modules directory not found: ${modulesDirAbs}. No modules will be registered.`,
        );
    } else {
        try {
            const moduleFiles = findModuleFiles(modulesDirAbs, projectRoot);

            for (const relativeFilePath of moduleFiles) {
                const absoluteFilePath = pathResolve(
                    projectRoot,
                    relativeFilePath,
                );
                const content = fs.readFileSync(absoluteFilePath, 'utf-8');

                // Look for the specific pattern: interface ModuleClasses { ClassName: typeof ClassName; }
                const interfaceRegex = /interface\s+ModuleClasses\s*{([^}]*)}/s;
                const interfaceMatch = content.match(interfaceRegex);

                if (interfaceMatch) {
                    const interfaceContent = interfaceMatch[1];
                    // Extract the class name
                    const classRegex =
                        /\s*([A-Za-z0-9_]+)\s*:\s*typeof\s*\1\s*;/;
                    const classMatch = interfaceContent.match(classRegex);

                    if (classMatch && classMatch[1]) {
                        const className = classMatch[1];
                        console.log(
                            `   Found module: ${className} in ${relativeFilePath}`,
                        );
                        registrations.push({
                            name: className,
                            path: relativeFilePath, // Store relative path from project root
                        });
                    } else {
                        // Optionally log files that extend the interface but don't match the expected format
                        // console.log(`   DEBUG: File ${relativeFilePath} extends ModuleClasses but pattern not matched in content: ${interfaceContent}`);
                    }
                }
            }
        } catch (error) {
            console.error(
                `[Dive Build] Error scanning modules directory ${modulesDirAbs}:`,
                error,
            );
        }
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
        // Path relative to project root, without .ts extension (e.g., src/modules/ar/ARSystem)
        const pathWithoutExt = path.replace(/\.ts$/, '');

        if (!pathWithoutExt) {
            console.error(
                `Could not determine path without extension for ${name} (${path})`,
            );
            return;
        }
        // Value for runtime import (relative from build/index.mjs)
        // Example: ARSystem -> ./src/modules/ar/ARSystem.mjs
        moduleBuildPathMap[name] = `./${pathWithoutExt}.mjs`;
    });

    return {
        name: 'module-build-config',

        // Use the config hook to modify the config before it's resolved
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        config(
            userConfig: UserConfig,
            { command }: { command: 'build' | 'serve' },
        ) {
            console.log('[Dive Build] Configuring build...');
            // --- Prepare Build Config ---
            const rollupInput: Record<string, string> = {
                // Main library entry point
                index: pathResolve(projectRoot, 'src/index.ts'),
                // Keep the modules index file itself as an entry point if needed
                // 'modules/index': pathResolve(
                //     projectRoot,
                //     'src/modules/index.ts',
                // ),
            };
            registrations.forEach(({ name, path }) => {
                // path is relative to project root (e.g., src/modules/ar/ARSystem.ts)
                const absoluteSrcPath = pathResolve(projectRoot, path);

                // Key for Rollup output file structure (relative to build dir)
                // e.g., src/modules/ar/ARSystem
                const rollupEntryKey = path.replace(/\.ts$/, '');

                if (!rollupEntryKey) {
                    console.error(
                        `[Build Error] Could not determine Rollup entry key for module ${name} (${path})`,
                    );
                    return; // Skip this invalid registration
                }

                rollupInput[rollupEntryKey] = absoluteSrcPath;
            });

            // Log the final rollup inputs
            console.log('[Dive Build] Rollup Inputs:');
            for (const [
                key,
                value,
            ] of Object.entries(rollupInput)) {
                console.log(`  ${key}: ${relative(projectRoot, value)}`);
            }

            // --- Define Build Options ---
            const buildConfig: UserConfig['build'] = {
                lib: {
                    entry: rollupInput,
                    // name: 'dive', // name is less relevant for multi-entry builds
                    // formats: ['es', 'cjs'] // Specify formats here
                },
                sourcemap: true,
                minify: true,
                outDir: 'build',
                emptyOutDir: true,
                rollupOptions: {
                    // input: rollupInput, // Provided by lib.entry
                    output: [
                        {
                            format: 'esm',
                            // [name] will be the keys from rollupInput (e.g., index, modules/ar/ARSystem)
                            entryFileNames: '[name].mjs',
                            chunkFileNames: 'chunks/[name]-[hash].mjs',
                            exports: 'named',
                            // preserveModules: true, // Alternative way to structure output
                            // preserveModulesRoot: 'src',
                        },
                        {
                            format: 'cjs',
                            entryFileNames: '[name].cjs',
                            chunkFileNames: 'chunks/[name]-[hash].cjs',
                            exports: 'named',
                            // preserveModules: true,
                            // preserveModulesRoot: 'src',
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
            const defineStaticConfig: Record<string, string> = {
                __MODULE_BUILD_PATHS__: JSON.stringify(moduleBuildPathMap),
            };

            // Return the modifications to be merged into the user config
            return {
                build: buildConfig,
                define: defineStaticConfig,
            };
        },
    };
}
