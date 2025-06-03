/**
 * Central export point for the module system.
 * This is the only place where ModuleRegistry should be imported from.
 */

const ModuleRegistry = {
    AnimationSystem: async () =>
        (await import('./animation/index.ts')).AnimationSystem,
    ARSystem: async () => (await import('./ar/index.ts')).ARSystem,
    AssetConverter: async () =>
        (await import('./assetconverter/index.ts')).AssetConverter,
    AssetExporter: async () =>
        (await import('./assetexporter/index.ts')).AssetExporter,
    AssetLoader: async () =>
        (await import('./assetloader/index.ts')).AssetLoader,
    MediaCreator: async () =>
        (await import('./mediacreator/index.ts')).MediaCreator,
    State: async () => (await import('./state/index.ts')).State,
    Toolbox: async () => (await import('./toolbox/index.ts')).Toolbox,
} as const;

type ModuleRegistry = typeof ModuleRegistry;
type ModuleName = keyof ModuleRegistry;
type ModuleType<T extends keyof ModuleRegistry> =
    ReturnType<ModuleRegistry[T]> extends Promise<infer U> ? U : never;

export const getModule = async <T extends ModuleName>(
    moduleName: T,
): Promise<ModuleType<T>> => {
    return (await ModuleRegistry[moduleName]()) as ModuleType<T>;
};
