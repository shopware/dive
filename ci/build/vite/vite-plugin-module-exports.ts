import { resolve as pathResolve, join, relative } from 'path';
import * as fs from 'fs';
import { Plugin, UserConfig } from 'vite';

const MODULES_PATH = 'src/modules';

interface ModuleRegistration {
    name: string;
    path: string; // Original src path
    buildPath: string; // Path in the build output
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
            types: './build/dive.d.ts',
            import: './build/dive.mjs',
            require: './build/dive.cjs',
        },
    };

    // Add each module to exports
    registrations.forEach(({ name, buildPath }) => {
        // Ensure buildPath for modules points to the module's own folder structure
        const moduleExportPath = `./${name}`;
        exports[moduleExportPath] = {
            types: `./build/modules/${name}/index.d.ts`,
            import: `./build/modules/${name}/index.mjs`,
            require: `./build/modules/${name}/index.cjs`,
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
export default function moduleBuildPlugin(): Plugin {
    // --- Discover Registrations (Scan for index.ts in module folders) ---
    console.log(
        `[Dive Build] Discovering module registrations by looking for index.ts in subdirectories of ${MODULES_PATH}...`,
    );
    const projectRoot = process.cwd();
    const modulesDirAbs = pathResolve(projectRoot, MODULES_PATH);
    let registrations: ModuleRegistration[] = [];

    if (!fs.existsSync(modulesDirAbs)) {
        console.warn(
            `[Dive Build] Modules directory not found: ${modulesDirAbs}. No modules will be registered.`,
        );
    } else {
        try {
            // Scan for index.ts files in the direct subdirectories of MODULES_PATH
            const moduleDirs = fs
                .readdirSync(modulesDirAbs, { withFileTypes: true })
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name);

            for (const dirName of moduleDirs) {
                const indexPath = join(modulesDirAbs, dirName, 'index.ts');
                if (fs.existsSync(indexPath)) {
                    const relativeIndexPath = relative(projectRoot, indexPath);
                    // Ensure module name is consistently cased (e.g. ar, not AR)
                    // The module name should be the directory name for consistent export paths
                    const moduleName = dirName; // Keep original casing for path, package.json export name can be lowercased if needed
                    console.log(
                        `   Found module: ${moduleName} at ${relativeIndexPath}`,
                    );
                    registrations.push({
                        name: moduleName, // This name is used for the `modules/${name}` export path
                        path: relativeIndexPath, // Path to the module's index.ts
                        // buildPath determines the output structure within 'build/'
                        // e.g., 'modules/ar/index' which becomes 'build/modules/ar/index.mjs'
                        buildPath: `modules/${moduleName}/index`,
                    });
                }
            }
        } catch (error) {
            console.error(
                `[Dive Build] Error scanning modules directory ${modulesDirAbs}:`,
                error,
            );
        }
    }

    // Update package.json exports
    updatePackageJsonExports(registrations);

    return {
        name: 'module-build-config',
        config(config: UserConfig): UserConfig {
            // Prepare build config
            const rollupInput: Record<string, string> = {
                // Main library entry point
                dive: pathResolve(projectRoot, 'src/index.ts'),
            };

            // Add module entry points
            registrations.forEach(({ name, path, buildPath }) => {
                const absoluteSrcPath = pathResolve(projectRoot, path);
                // The key in rollupInput should match the desired output path structure
                // e.g., 'modules/ar/index' will produce 'build/modules/ar/index.mjs'
                rollupInput[buildPath] = absoluteSrcPath;
            });

            return {
                build: {
                    outDir: 'build',
                    lib: {
                        entry: rollupInput,
                    },
                    rollupOptions: {
                        output: [
                            {
                                format: 'esm',
                                // [name] will be replaced by the key in rollupInput (e.g., 'modules/ar/index')
                                entryFileNames: '[name].mjs',
                                chunkFileNames: 'chunks/[name]-[hash].mjs',
                                exports: 'named',
                            },
                            {
                                format: 'cjs',
                                entryFileNames: '[name].cjs',
                                chunkFileNames: 'chunks/[name]-[hash].cjs',
                                exports: 'named',
                            },
                        ],
                        external: [
                            'three',
                            '@tweenjs/tween.js',
                            'three-spritetext',
                        ],
                    },
                },
            };
        },
        resolveId(source, importer) {
            // For direct imports in the entry point, use ./src/modules/...
            if (
                importer?.endsWith('index.ts') &&
                source.startsWith('./src/modules/')
            ) {
                return { id: source, external: true };
            }
            return null;
        },
    };
}
