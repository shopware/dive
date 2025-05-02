/**
 * Central export point for the module system.
 * This is the only place where ModuleRegistry should be imported from.
 */

const moduleRegistry = {
    AnimationSystem: async () =>
        (await import('./animation/AnimationSystem.ts')).AnimationSystem,
    ARSystem: async () => (await import('./ar/ARSystem.ts')).ARSystem,
    AssetConverter: async () =>
        (await import('./asset/converter/AssetConverter.ts')).AssetConverter,
    AssetExporter: async () =>
        (await import('./asset/exporter/AssetExporter.ts')).AssetExporter,
    AssetLoader: async () =>
        (await import('./asset/loader/AssetLoader.ts')).AssetLoader,
    MediaCreator: async () =>
        (await import('./mediacreator/MediaCreator.ts')).MediaCreator,
    State: async () => (await import('./state/State.ts')).State,
    Toolbox: async () => (await import('./toolbox/Toolbox.ts')).Toolbox,
} as const;

type ModuleRegistry = typeof moduleRegistry;
type ModuleName = keyof ModuleRegistry;
type ModuleType<T extends keyof ModuleRegistry> =
    ReturnType<ModuleRegistry[T]> extends Promise<infer U> ? U : never;

export const getModule = async <T extends ModuleName>(
    moduleName: T,
): Promise<ModuleType<T>> => {
    return (await moduleRegistry[moduleName]()) as ModuleType<T>;
};
