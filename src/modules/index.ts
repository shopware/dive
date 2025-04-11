/**
 * Central export point for the module system.
 * This is the only place where ModuleRegistry should be imported from.
 */
import { internalModuleRegistry as ModuleRegistry } from './_system/ModuleRegistry';

// Register all modules with their names and source paths.
// The path is used by the build process but ignored by the runtime registry.
ModuleRegistry.register(
    'AssetLoader',
    'src/modules/asset/loader/AssetLoader.ts',
);
ModuleRegistry.register(
    'AssetConverter',
    'src/modules/asset/converter/AssetConverter.ts',
);
ModuleRegistry.register(
    'AssetExporter',
    'src/modules/asset/exporter/AssetExporter.ts',
);
ModuleRegistry.register('ARSystem', 'src/modules/ar/ARSystem.ts');
ModuleRegistry.register(
    'MediaCreator',
    'src/modules/mediacreator/MediaCreator.ts',
);
ModuleRegistry.register('SystemInfo', 'src/modules/systeminfo/SystemInfo.ts');

// Re-export the ModuleRegistry as the only public access point
export { ModuleRegistry };
