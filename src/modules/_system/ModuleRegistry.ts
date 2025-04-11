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

interface ModuleInfo {
    path: string;
}

/** @internal */
class ModuleRegistryClass {
    private static _instance = new ModuleRegistryClass();
    private _modules = new Map<
        keyof ModuleClasses,
        Module<new (...args: unknown[]) => unknown>
    >();
    private _moduleInfo = new Map<keyof ModuleClasses, ModuleInfo>();

    private constructor() {}

    public static get instance(): ModuleRegistryClass {
        return this._instance;
    }

    /**
     * Get all registered module paths for build configuration
     * @internal
     */
    public getBuildConfig(): Record<string, string> {
        const entries: Record<string, string> = {};

        this._moduleInfo.forEach((info, id) => {
            entries[id] = info.path;
        });

        return entries;
    }

    /**
     * Register a module
     * @internal
     */
    public register<Id extends keyof ModuleClasses>(
        name: Id,
        path: string,
    ): void {
        this._modules.set(name, new Module(name, path));
        this._moduleInfo.set(name, { path });
    }

    /**
     * Get a singleton instance of the module
     * @internal
     */
    public async getInstance<Id extends keyof ModuleClasses>(
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
