/**
 * @internal
 * This module contains the internal module registry implementation.
 * Do not import directly - use the central export from 'src/modules/index.ts' instead.
 */

import { ModuleImporter } from './ModuleImporter';
// Define the base interface that modules will augment
declare global {
    interface ModuleClasses {}
}

/**
 * @internal
 * Helper type to get the instance type of a module
 */
export type ModuleInstance<Id extends keyof ModuleClasses> = InstanceType<
    ModuleClasses[Id]
>;

/** @internal */
type ModuleConstructors = {
    [K in keyof ModuleClasses]: K extends keyof ModuleClasses
        ? ModuleClasses[K] extends { new (...args: infer P): infer R }
            ? new (...args: P) => R
            : new (...args: unknown[]) => ModuleClasses[K]
        : never;
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
class ModuleRegistryClass {
    private static _instance = new ModuleRegistryClass();
    // Map stores ModuleImporter instances, keyed by name
    private _modules = new Map<
        keyof ModuleClasses,
        ModuleImporter<new (...args: unknown[]) => unknown>
    >();

    private constructor() {}

    /**
     * @internal
     * Get the singleton instance of the ModuleRegistryClass.
     * This ensures that there is only one registry throughout the application.
     */
    public static get instance(): ModuleRegistryClass {
        return this._instance;
    }

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
    public register<Id extends keyof ModuleClasses>(name: Id): void {
        if (this._modules.has(name)) {
            console.warn(
                `Module '${name}' is already registered. Overwriting.`,
            );
        }
        this._modules.set(name, new ModuleImporter(name));
    }

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
    public async get<Id extends keyof ModuleClasses>(
        name: Id,
    ): Promise<ModuleConstructors[Id]> {
        const module = this._modules.get(name);
        if (!module) {
            throw new Error(`Module '${name}' not registered`);
        }
        return module.getClass() as Promise<ModuleConstructors[Id]>;
    }
}

// Internal singleton instance
/** @internal */
export const internalModuleRegistry = ModuleRegistryClass.instance;
