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

// interface ModuleInfo { // No longer needed to store path here
//     path: string;
// }

/** @internal */
class ModuleRegistryClass {
    private static _instance = new ModuleRegistryClass();
    // Map now only stores Module instances, keyed by name
    private _modules = new Map<
        keyof ModuleClasses,
        Module<new (...args: unknown[]) => unknown>
    >();
    // private _moduleInfo = new Map<keyof ModuleClasses, ModuleInfo>(); // Removed _moduleInfo

    private constructor() {}

    public static get instance(): ModuleRegistryClass {
        return this._instance;
    }

    /**
     * Get all registered module paths for build configuration
     * @internal
     */
    // public getBuildConfig(): Record<string, string> { // Removed getBuildConfig
    //     const entries: Record<string, string> = {};
    //
    //     this._moduleInfo.forEach((info, id) => {
    //         entries[id] = info.path;
    //     });
    //
    //     return entries;
    // }

    /**
     * Register a module
     * @internal
     */
    // Path argument is only used by the build plugin now
    public register<Id extends keyof ModuleClasses>(
        name: Id,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _path: string, // Re-add path param for signature compatibility, marked unused
    ): void {
        if (this._modules.has(name)) {
            console.warn(
                `Module '${name}' is already registered. Overwriting.`,
            );
        }
        // Pass only the name to the Module constructor
        this._modules.set(name, new Module(name));
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
