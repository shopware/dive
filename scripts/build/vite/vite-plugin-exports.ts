import { resolve as pathResolve, join, relative } from 'path';
import * as fs from 'fs';
import { Plugin, UserConfig } from 'vite';

const plugins_PATH = 'src/plugins';

interface pluginRegistration {
    name: string;
    path: string; // Original src path
    buildPath: string; // Path in the build output
}

const externalDependencies = [/^three(?:\/.*)?$/, '@tweenjs/tween.js'];

// Function to update package.json exports
function updatePackageJsonExports(registrations: pluginRegistration[]): void {
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

    // Add each plugin to exports
    registrations.forEach(({ name }) => {
        // Ensure buildPath for plugins points to the plugin's own folder structure
        const pluginExportPath = `./${name}`;
        exports[pluginExportPath] = {
            types: `./build/plugins/${name}/index.d.ts`,
            import: `./build/plugins/${name}/index.mjs`,
            require: `./build/plugins/${name}/index.cjs`,
        };
    });

    // Update package.json
    packageJson.exports = exports;
    fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 4) + '\n',
    );
    console.log('[DIVE Build] Updated package.json exports');
}

// Plugin to discover plugins, configure library build, and inject path map
export default function pluginBuildPlugin(): Plugin {
    // --- Discover Registrations (Scan for index.ts in plugin folders) ---
    console.log(
        `[DIVE Build] Discovering plugin registrations by looking for index.ts in subdirectories of ${plugins_PATH}...`,
    );
    const projectRoot = process.cwd();
    const pluginsDirAbs = pathResolve(projectRoot, plugins_PATH);
    const registrations: pluginRegistration[] = [];

    if (!fs.existsSync(pluginsDirAbs)) {
        console.warn(
            `[DIVE Build] plugins directory not found: ${pluginsDirAbs}. No plugins will be registered.`,
        );
    } else {
        try {
            // Scan for index.ts files in the direct subdirectories of plugins_PATH
            const pluginDirs = fs
                .readdirSync(pluginsDirAbs, { withFileTypes: true })
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name);

            for (const dirName of pluginDirs) {
                const indexPath = join(pluginsDirAbs, dirName, 'index.ts');
                if (fs.existsSync(indexPath)) {
                    const relativeIndexPath = relative(projectRoot, indexPath);
                    // Ensure plugin name is consistently cased (e.g. ar, not AR)
                    // The plugin name should be the directory name for consistent export paths
                    const pluginName = dirName; // Keep original casing for path, package.json export name can be lowercased if needed
                    console.log(
                        `   Found plugin: ${pluginName} at ${relativeIndexPath}`,
                    );
                    registrations.push({
                        name: pluginName, // This name is used for the `plugins/${name}` export path
                        path: relativeIndexPath, // Path to the plugin's index.ts
                        // buildPath determines the output structure within 'build/'
                        // e.g., 'plugins/ar/index' which becomes 'build/plugins/ar/index.mjs'
                        buildPath: `plugins/${pluginName}/index`,
                    });
                }
            }
        } catch (error) {
            console.error(
                `[Dive Build] Error scanning plugins directory ${pluginsDirAbs}:`,
                error,
            );
        }
    }

    // Update package.json exports
    updatePackageJsonExports(registrations);

    return {
        name: 'plugin-build-config',
        config(): UserConfig {
            // Prepare build config
            const rollupInput: Record<string, string> = {
                // Main library entry point
                dive: pathResolve(projectRoot, 'src/index.ts'),
            };

            // Add plugin entry points
            registrations.forEach(({ path, buildPath }) => {
                const absoluteSrcPath = pathResolve(projectRoot, path);
                // The key in rollupInput should match the desired output path structure
                // e.g., 'plugins/ar/index' will produce 'build/plugins/ar/index.mjs'
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
                                // [name] will be replaced by the key in rollupInput (e.g., 'plugins/ar/index')
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
                        external: externalDependencies,
                    },
                },
            };
        },
        resolveId(source, importer) {
            // For direct imports in the entry point, use ./src/plugins/...
            if (
                importer?.endsWith('index.ts') &&
                source.startsWith('./src/plugins/')
            ) {
                return { id: source, external: true };
            }
            return null;
        },
    };
}
