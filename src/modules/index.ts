/**
 * Central export point for the module system.
 * This is the only place where ModuleRegistry should be imported from.
 */
import { internalModuleRegistry as ModuleRegistry } from './_system/ModuleRegistry';

// Define module source paths for the build process to discover.
// This map is only used by the build process, not at runtime.
export const MODULE_PATHS = {
    AssetLoader: 'src/modules/asset/loader/AssetLoader.ts',
    AssetConverter: 'src/modules/asset/converter/AssetConverter.ts',
    AssetExporter: 'src/modules/asset/exporter/AssetExporter.ts',
    ARSystem: 'src/modules/ar/ARSystem.ts',
    MediaCreator: 'src/modules/mediacreator/MediaCreator.ts',
    SystemInfo: 'src/modules/systeminfo/SystemInfo.ts',
};

// Register all modules with just their names
Object.keys(MODULE_PATHS).forEach((name) => {
    ModuleRegistry.register(name as keyof typeof MODULE_PATHS);
});

// Re-export the ModuleRegistry as the only public access point
export { ModuleRegistry };
