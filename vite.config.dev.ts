import { defineConfig } from 'vite';
import type { UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';
import pluginBuildPlugin from './scripts/build/vite/vite-plugin-exports.ts';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';
import { exec } from 'child_process';
import type { Plugin } from 'vite';

const yalcPush = (): Plugin => ({
    name: 'yalc-push',
    closeBundle() {
        exec('yalc push --content', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`yalc push: ${stdout}`);
            if (stderr) console.error(`stderr: ${stderr}`);
        });
    },
});

// --- Development Vite Config ---
export default defineConfig({
    define: {
        __APP_VERSION__: JSON.stringify(pkg.version),
        __DEV_MODE__: JSON.stringify(true),
    },
    build: {
        // Faster builds for development
        minify: false,
        sourcemap: 'inline',
        // Output to the standard build directory
        outDir: 'build',
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
        // @ts-expect-error - wasm is not typed
        wasm(),

        yalcPush(),
    ],
} as UserConfigExport);
