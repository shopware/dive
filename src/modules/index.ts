/**
 * Central export point for the module system.
 * This is the only place where ModuleRegistry should be imported from.
 */
import { internalModuleRegistry as Modules } from './_system/ModuleRegistry';

// Define module source paths for build process and module registry.
export const MODULE_PATHS = {
    AssetLoader: './asset/loader/AssetLoader.ts',
    AssetConverter: './asset/converter/AssetConverter.ts',
    AssetExporter: './asset/exporter/AssetExporter.ts',
    ARSystem: './ar/ARSystem.ts',
    MediaCreator: './mediacreator/MediaCreator.ts',
    SystemInfo: './systeminfo/SystemInfo.ts',
};

// Register all modules with just their names
Object.keys(MODULE_PATHS).forEach((name) => {
    Modules.register(name as keyof ModuleClasses);
});

// Re-export the ModuleRegistry as the only public access point
export { Modules };
