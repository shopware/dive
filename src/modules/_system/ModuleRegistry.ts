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

/** @internal */
class ModuleRegistryClass {
    private static _instance = new ModuleRegistryClass();
    // Map stores Module instances, keyed by name
    private _modules = new Map<
        keyof ModuleClasses,
        Module<new (...args: unknown[]) => unknown>
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
     * Get the module class
     * @internal
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
