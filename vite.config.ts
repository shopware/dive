import { defineConfig } from 'vite';
import type { UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';
import moduleBuildPlugin from './ci/build/vite/vite-plugin-module-exports.ts';
import copy from 'rollup-plugin-copy';

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
                'src/modules/ar/webxr/**', // webxr currently not supported in dive
                'src/engine/scene/xrroot/**', // webxr currently not supported in dive
                'src/modules/asset/draco/**', // draco is static lib, does not need to be tested
            ],
            thresholds: {
                lines: 98,
                branches: 98,
                functions: 98,
                statements: 98,
            },
        },
    },
    plugins: [
        moduleBuildPlugin(),
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
        copy({
            targets: [
                {
                    src: 'src/modules/asset/draco/**/*',
                    dest: 'build/src/modules/asset/draco',
                },
            ],
            hook: 'writeBundle',
        }),
    ],
} as UserConfigExport);
