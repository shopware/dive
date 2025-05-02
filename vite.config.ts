import { defineConfig } from 'vite';
import type { UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';
import moduleBuildPlugin from './ci/build/vite/vite-plugin-module-exports.ts';

// --- Main Vite Export ---
export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom', // or 'node' if no DOM required
        include: ['src/**/*.test.ts'], // adjust as needed
        coverage: {
            reporter: [
                'text',
                'html',
            ],
            statements: 98,
            branches: 98,
            functions: 98,
            lines: 98,
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
    ],
} as UserConfigExport);
