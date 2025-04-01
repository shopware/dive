import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        target: 'esnext', // Ensure compatibility with modern JS
        rollupOptions: {
            input: 'src/dive.ts',
            output: [
                {
                    format: 'esm',
                    entryFileNames: '[name].mjs', // Name the output files as .mjs
                },
                {
                    format: 'cjs', // CommonJS format
                    entryFileNames: '[name].cjs', // Name for .cjs files
                },
                {
                    format: 'iife', // For traditional .js files
                    entryFileNames: '[name].js', // Name for .js files
                    name: 'dive'
                }
            ]
        },
        lib: {
            entry: 'src/dive.ts',
            formats: [
                'es',
                'cjs',
            ],
            fileName: 'dive',
        },
        sourcemap: true,
        emptyOutDir: true,
        outDir: 'build',
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
    plugins: [
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
