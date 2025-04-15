/**
 * @internal
 * This module contains the internal module registry implementation.
 * Do not import directly - use the central export from 'src/modules/index.ts' instead.
 */

import { Module } from './Module';
// Define the base interface that modules will augment
declare global {
    interface ModuleClasses {}
}

/** @internal */
type ModuleConstructors = {
    [K in keyof ModuleClasses]: K extends keyof ModuleClasses
        ? ModuleClasses[K] extends { new (...args: infer P): infer R }
            ? new (...args: P) => R
            : never
        : never;
};

/** @internal */
class ModuleRegistryClass {
    private static _instance = new ModuleRegistryClass();
    // Map now only stores Module instances, keyed by name
    private _modules = new Map<
        keyof ModuleClasses,
        Module<new (...args: unknown[]) => unknown>
    >();
    // Map to store factory functions
    private _factories = new Map<
        keyof ModuleClasses,
        (ModuleClass: new (...args: unknown[]) => unknown) => unknown
    >();

    private constructor() {}

    public static get instance(): ModuleRegistryClass {
        return this._instance;
    }

    /**
     * Register a module
     * @internal
     */
    public register<Id extends keyof ModuleClasses>(name: Id): void {
        if (this._modules.has(name)) {
            console.warn(
                `Module '${name}' is already registered. Overwriting.`,
            );
        }
        this._modules.set(name, new Module(name));
    }

    /**
     * Set a factory function for a module
     * @internal
     */
    public factorize<Id extends keyof ModuleClasses>(
        name: Id,
        factory: (
            ModuleClass: ModuleConstructors[Id],
        ) => InstanceType<ModuleConstructors[Id]>,
    ): void {
        this._factories.set(
            name,
            factory as (
                ModuleClass: new (...args: unknown[]) => unknown,
            ) => unknown,
        );
    }

    /**
     * Get a singleton instance of the module
     * @internal
     */
    public async get<Id extends keyof ModuleClasses>(
        name: Id,
    ): Promise<InstanceType<ModuleClasses[Id]>> {
        const module = this._modules.get(name);
        if (!module) {
            throw new Error(`Module '${name}' not registered`);
        }
        return module.getInstance(this._factories.get(name)) as Promise<
            InstanceType<ModuleClasses[Id]>
        >;
    }
}

// Internal singleton instance
/** @internal */
export const internalModuleRegistry = ModuleRegistryClass.instance;
