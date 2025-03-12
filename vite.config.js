import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        rollupOptions: {
            input: 'src/dive.ts',
        },
        lib: {
            entry: 'src/dive.ts',
            formats: ['es', 'cjs'],
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
            include: ["src/**/*.ts"],
            exclude: ['**/*.test.ts', '**/*.spec.ts']
        }),
    ],
});