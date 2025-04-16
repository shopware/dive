/**
 * @internal
 * This module contains the internal module registry implementation.
 * Do not import directly - use the central export from 'src/modules/index.ts' instead.
 */
declare global {
    interface ModuleClasses {
    }
}
/**
 * @internal
 * Helper type to get the instance type of a module
 */
export type ModuleInstance<Id extends keyof ModuleClasses> = InstanceType<ModuleClasses[Id]>;
/** @internal */
type ModuleConstructors = {
    [K in keyof ModuleClasses]: K extends keyof ModuleClasses ? ModuleClasses[K] extends {
        new (...args: infer P): infer R;
    } ? new (...args: P) => R : new (...args: unknown[]) => ModuleClasses[K] : never;
};
/**
 * @internal
 * The ModuleRegistryClass is a singleton that manages the registration and retrieval of modules.
 * It provides a type-safe way to:
 * 1. Register modules by their name
 * 2. Retrieve module classes for instantiation
 *
 * The registry maintains a map of module names to ModuleImporter instances, which handle the actual
 * dynamic importing of module classes.
 */
declare class ModuleRegistryClass {
    private static _instance;
    private _modules;
    private constructor();
    /**
     * @internal
     * Get the singleton instance of the ModuleRegistryClass.
     * This ensures that there is only one registry throughout the application.
     */
    static get instance(): ModuleRegistryClass;
    /**
     * @internal
     * Register a module by its name.
     * This creates a new ModuleImporter instance that will handle the dynamic importing of the module class.
     *
     * @param name - The name of the module to register. Must be a key of ModuleClasses.
     * @throws Error if the module name is not a valid key of ModuleClasses.
     * @example
     * ```typescript
     * ModuleRegistry.register('MyModule');
     * ```
     */
    register<Id extends keyof ModuleClasses>(name: Id): void;
    /**
     * @internal
     * Get the class constructor for a registered module.
     * This will dynamically import the module if it hasn't been imported yet.
     *
     * @param name - The name of the module to get. Must be a key of ModuleClasses.
     * @returns A Promise that resolves to the module's class constructor.
     * @throws Error if the module is not registered.
     * @example
     * ```typescript
     * const ModuleClass = await ModuleRegistry.get('MyModule');
     * const instance = new ModuleClass();
     * ```
     */
    get<Id extends keyof ModuleClasses>(name: Id): Promise<ModuleConstructors[Id]>;
}
/** @internal */
export declare const internalModuleRegistry: ModuleRegistryClass;
export {};
