/** @internal */
/**
 * @internal
 * Handles the dynamic importing and caching of module classes.
 * This class is responsible for:
 * 1. Resolving the build path for a module
 * 2. Dynamically importing the module class
 * 3. Caching the imported class to avoid multiple imports
 */
export declare class ModuleImporter<T extends new (...args: unknown[]) => unknown> {
    private _name;
    private _promise;
    private _importFn;
    constructor(_name: keyof ModuleClasses);
    /**
     * @internal
     * Get the module class, importing it if not already cached.
     * @returns A Promise that resolves to the module's class constructor.
     */
    getClass(): Promise<T>;
}
