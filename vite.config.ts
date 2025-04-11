import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { globSync } from 'glob';
import fs from 'fs';
import type { Plugin, ResolvedConfig } from 'vite';

interface ModuleRegistration {
    name: string;
    path: string;
}

// Plugin to inject module registration info
function moduleRegistrationPlugin(): Plugin {
    return {
        name: 'module-registration',
        configResolved(config: ResolvedConfig) {
            // Find all TypeScript files that contain Modules.register
            const files = globSync('src/**/*.ts', {
                ignore: [
                    '**/__test__/**',
                    '**/*.test.ts',
                    '**/*.spec.ts',
                ],
            });
            console.log('Found files:', files);
            const registrations: ModuleRegistration[] = [];

            files.forEach((file) => {
                const content = fs.readFileSync(file, 'utf-8');

                // First find all potential module registration blocks
                const blocks = content.split(/ModuleRegistry\.register/);
                if (blocks.length > 1) {
                    blocks.slice(1).forEach((block) => {
                        // Extract content between parentheses
                        const parenContent = block.match(/\(([^)]+)\)/);
                        if (parenContent) {
                            const [
                                name,
                                path,
                            ] = parenContent[1]
                                .split(',')
                                .map((s) => s.trim().replace(/['"]/g, ''));

                            if (
                                name &&
                                path &&
                                path.startsWith('src/modules/') &&
                                path.endsWith('.ts')
                            ) {
                                console.log(
                                    `Found registration: ${name} -> ${path}\n`,
                                );
                                registrations.push({ name, path });
                            }
                        }
                    });
                }
            });

            // Create entries for each module
            const input: Record<string, string> = {
                index: resolve(__dirname, 'src/index.ts'),
            };

            // Add each registered module as an entry point
            registrations.forEach(({ name, path }) => {
                input[`modules/${name}`] = resolve(__dirname, path);
            });

            config.build.rollupOptions = config.build.rollupOptions || {};
            config.build.rollupOptions.input = input;
            config.build.rollupOptions.output = [
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
            ];

            // Mark external dependencies
            config.build.rollupOptions.external = [
                'three',
                '@tweenjs/tween.js',
                'three-spritetext',
            ];
        },
    };
}

export default defineConfig({
    build: {
        target: 'esnext',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'dive',
            fileName: () => 'dive.js',
        },
        sourcemap: true,
        emptyOutDir: true,
        outDir: 'build',
        rollupOptions: {
            external: [
                'three',
                '@tweenjs/tween.js',
                'three-spritetext',
            ],
            output: {
                globals: {
                    three: 'THREE',
                    '@tweenjs/tween.js': 'TWEEN',
                    'three-spritetext': 'SpriteText',
                },
            },
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
    plugins: [
        moduleRegistrationPlugin(),
        dts({
            insertTypesEntry: true,
            outDir: 'build',
            tsconfigPath: './tsconfig.json',
            include: ['src/**/*.ts'],
            exclude: [
                '**/*.test.ts',
                '**/*.spec.ts',
            ],
        }),
    ],
});
