/**
 * @internal
 * This module contains the internal module registry implementation.
 * Do not import directly - use the central export from 'src/modules/index.ts' instead.
 */
declare global {
    interface ModuleClasses {
    }
}
/** @internal */
declare class ModuleRegistryClass {
    private static _instance;
    private _modules;
    private constructor();
    static get instance(): ModuleRegistryClass;
    /**
     * Register a module
     * @internal
     */
    register<Id extends keyof ModuleClasses>(name: Id): void;
    /**
     * Get a singleton instance of the module
     * @internal
     */
    get<Id extends keyof ModuleClasses>(name: Id): Promise<ModuleClasses[Id]>;
}
/** @internal */
export declare const internalModuleRegistry: ModuleRegistryClass;
export {};
