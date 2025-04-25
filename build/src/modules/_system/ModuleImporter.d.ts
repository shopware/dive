/** @internal */
declare global {
    interface ModuleClasses {
    }
}
/** @internal */
export type ModuleConstructors = {
    [K in keyof ModuleClasses]: K extends keyof ModuleClasses ? ModuleClasses[K] extends {
        new (...args: infer P): infer R;
    } ? new (...args: P) => R : new (...args: unknown[]) => ModuleClasses[K] : never;
};
/**
 * @internal
 * Helper type to get the instance type of a module
 */
export type ModuleInstance<Id extends keyof ModuleClasses> = InstanceType<ModuleClasses[Id]>;
/**
 * @internal
 * Handles the dynamic importing and caching of module classes.
 * This class is responsible for:
 * 1. Dynamically importing the module class
 * 2. Caching the imported class to avoid multiple imports
 */
export declare class ModuleImporter<Id extends keyof ModuleClasses> {
    private _path;
    private _promise;
    private _instance;
    private _importFn;
    constructor(_path: string);
    /**
     * @internal
     * Get the module class, importing it if not already cached.
     * @returns A Promise that resolves to the module's class constructor.
     */
    import(): Promise<ModuleConstructors[Id]>;
    /**
     * @internal
     * Get an instance of the module class, importing it if not already cached.
     * @returns A Promise that resolves to an instance of the module's class.
     */
    instantiate(...args: ConstructorParameters<ModuleConstructors[Id]>): Promise<ModuleInstance<Id>>;
    private _dynamicImport;
}
