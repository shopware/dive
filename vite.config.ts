import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import moduleBuildPlugin from './ci/build/vite/vite-plugin-module-exports';
// import rewriteModuleImporterPathsPlugin from './ci/build/vite/vite-plugin-rewrite-module-importer-paths';

// --- Main Vite Export ---
export default defineConfig({
    plugins: [
        // rewriteModuleImporterPathsPlugin(),
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
});
