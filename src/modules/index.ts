/**
 * Central export point for the module system.
 * This is the only place where ModuleRegistry should be imported from.
 */

import { ModuleImporter } from './_system/ModuleImporter';

/** @internal */
export type ModuleConstructors = {
    [K in keyof ModuleClasses]: K extends keyof ModuleClasses
        ? ModuleClasses[K] extends { new (...args: infer P): infer R }
            ? new (...args: P) => R
            : new (...args: unknown[]) => ModuleClasses[K]
        : never;
};

/**
 * @internal
 * Helper type to get the instance type of a module
 */
export type ModuleInstance<Id extends keyof ModuleClasses> = InstanceType<
    ModuleClasses[Id]
>;

// Re-export the ModuleRegistry as the only public access point
export { ModuleImporter };
