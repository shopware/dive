import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { globSync } from 'glob';
import fs from 'fs';

// Plugin to inject module registration info
function moduleRegistrationPlugin() {
    return {
        name: 'module-registration',
        configResolved(config) {
            // Find all TypeScript files that contain Modules.register
            const files = globSync('src/**/*.ts');
            const registrations = [];

            files.forEach(file => {
                const content = fs.readFileSync(file, 'utf-8');
                const matches = content.match(/Modules\.register\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/g);
                if (matches) {
                    matches.forEach(match => {
                        const [_, name, path] = match.match(/Modules\.register\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);
                        registrations.push({ name, path });
                    });
                }
            });

            // Create entries for each module
            const input = {
                'index': resolve(__dirname, 'src/index.ts'),
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
                    inlineDynamicImports: false
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].cjs',
                    chunkFileNames: 'chunks/[name]-[hash].cjs',
                    exports: 'named',
                    inlineDynamicImports: false
                }
            ];

            // Mark external dependencies
            config.build.rollupOptions.external = [
                'three',
                '@tweenjs/tween.js',
                'three-spritetext'
            ];
        }
    };
}

export default defineConfig({
    build: {
        target: 'esnext',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'dive',
            formats: ['iife'],
            fileName: () => 'dive.js'
        },
        sourcemap: true,
        emptyOutDir: true,
        outDir: 'build',
        rollupOptions: {
            external: ['three', '@tweenjs/tween.js', 'three-spritetext'],
            output: {
                globals: {
                    'three': 'THREE',
                    '@tweenjs/tween.js': 'TWEEN',
                    'three-spritetext': 'SpriteText'
                }
            }
        }
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
            outputDir: 'build',
            tsConfigFilePath: './tsconfig.json',
            include: ['src/**/*.ts'],
            exclude: [
                '**/*.test.ts',
                '**/*.spec.ts',
            ],
        }),
    ],
});
