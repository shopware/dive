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
        const modulePath = `./modules/${name}`;
        exports[modulePath] = {
            types: `./build/src/${buildPath}.d.ts`,
            import: `./build/src/${buildPath}.mjs`,
            require: `./build/src/${buildPath}.cjs`,
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
    const projectRoot = process.cwd();
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
                    const classRegex =
                        /\s*([A-Za-z0-9_]+)\s*:\s*typeof\s*\1\s*;/;
                    const classMatch = interfaceContent.match(classRegex);

                    if (classMatch && classMatch[1]) {
                        const className = classMatch[1];
                        console.log(
                            `   Found module: ${className} in ${relativeFilePath}`,
                        );

                        // Convert source path to build path
                        const buildPath = relativeFilePath
                            .replace(/^src\//, '')
                            .replace(/\.ts$/, '');

                        registrations.push({
                            name: className,
                            path: relativeFilePath,
                            buildPath: buildPath,
                        });
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
            registrations.forEach(({ name, path }) => {
                const absoluteSrcPath = pathResolve(projectRoot, path);
                const rollupEntryKey = path.replace(/\.ts$/, '');
                rollupInput[rollupEntryKey] = absoluteSrcPath;
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
