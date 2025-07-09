import { defineConfig } from 'vite';
import type { UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';
import pluginBuildPlugin from './scripts/build/vite/vite-plugin-exports.ts';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

// --- Main Vite Export ---
export default defineConfig({
    test: {
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        environment: 'jsdom',
        include: ['src/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,js}'],
            reporter: [
                'text',
                'html',
            ],
            exclude: [
                '**/build/**',
                '**/__mocks__/**',
                'src/plugins/ar/src/webxr/**', // webxr currently not supported in dive
                'src/engine/scene/xrroot/**', // webxr currently not supported in dive
                '**/index.ts', // Exclude all index.ts barrel export files
            ],
            thresholds: {
                lines: 95,
                branches: 90,
                functions: 95,
                statements: 95,
            },
        },
    },
    plugins: [
        // use tsconfig.json to resolve custom paths
        tsconfigPaths(),

        // build plugins, generates exports to write to {rootDir}/package.json
        pluginBuildPlugin(),

        // generate types
        dts({
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

        // build wasm for draco decoder
        wasm(),
    ],
} as UserConfigExport);
