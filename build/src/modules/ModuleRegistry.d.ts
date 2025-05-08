/**
 * Central export point for the module system.
 * This is the only place where ModuleRegistry should be imported from.
 */
declare const ModuleRegistry: {
    readonly AnimationSystem: () => Promise<typeof import('./animation/AnimationSystem.ts').AnimationSystem>;
    readonly ARSystem: () => Promise<typeof import('./ar/ARSystem.ts').ARSystem>;
    readonly AssetConverter: () => Promise<typeof import('./asset/converter/AssetConverter.ts').AssetConverter>;
    readonly AssetExporter: () => Promise<typeof import('./asset/exporter/AssetExporter.ts').AssetExporter>;
    readonly AssetLoader: () => Promise<typeof import('./asset/loader/AssetLoader.ts').AssetLoader>;
    readonly MediaCreator: () => Promise<typeof import('./mediacreator/MediaCreator.ts').MediaCreator>;
    readonly State: () => Promise<typeof import('./state/State.ts').State>;
    readonly Toolbox: () => Promise<typeof import('./toolbox/Toolbox.ts').Toolbox>;
};
type ModuleRegistry = typeof ModuleRegistry;
type ModuleName = keyof ModuleRegistry;
type ModuleType<T extends keyof ModuleRegistry> = ReturnType<ModuleRegistry[T]> extends Promise<infer U> ? U : never;
export declare const getModule: <T extends ModuleName>(moduleName: T) => Promise<ModuleType<T>>;
export {};
