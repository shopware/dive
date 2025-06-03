/**
 * Central export point for the module system.
 * This is the only place where ModuleRegistry should be imported from.
 */

const ModuleRegistry = {
    AnimationSystem: async () =>
        (await import('@shopware-ag/dive/animation')).AnimationSystem,
    ARSystem: async () => (await import('@shopware-ag/dive/ar')).ARSystem,
    AssetConverter: async () =>
        (await import('@shopware-ag/dive/assetconverter')).AssetConverter,
    AssetExporter: async () =>
        (await import('@shopware-ag/dive/assetexporter')).AssetExporter,
    AssetLoader: async () =>
        (await import('@shopware-ag/dive/assetloader')).AssetLoader,
    MediaCreator: async () =>
        (await import('@shopware-ag/dive/mediacreator')).MediaCreator,
    State: async () => (await import('@shopware-ag/dive/state')).State,
    Toolbox: async () => (await import('@shopware-ag/dive/toolbox')).Toolbox,
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
