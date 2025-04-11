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
class ModuleRegistryClass {
    private static _instance = new ModuleRegistryClass();
    // Map now only stores Module instances, keyed by name
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
     * Get a singleton instance of the module
     * @internal
     */
    public async get<Id extends keyof ModuleClasses>(
        name: Id,
    ): Promise<ModuleClasses[Id]> {
        const module = this._modules.get(name);
        if (!module) {
            throw new Error(`Module '${name}' not registered`);
        }
        return module.getInstance() as Promise<ModuleClasses[Id]>;
    }
}

// Internal singleton instance
/** @internal */
export const internalModuleRegistry = ModuleRegistryClass.instance;
