/** @internal */

import { ModuleConstructors } from '..';

declare global {
    interface ModuleClasses {}
}

// Declare the global variable injected by the build process
declare const __MODULE_BUILD_PATHS__: Record<keyof ModuleClasses, string>;

/**
 * @internal
 * Handles the dynamic importing and caching of module classes.
 * This class is responsible for:
 * 1. Resolving the build path for a module
 * 2. Dynamically importing the module class
 * 3. Caching the imported class to avoid multiple imports
 */
export class ModuleImporter<Id extends keyof ModuleClasses> {
    private _promise: Promise<ModuleConstructors[Id]> | null = null;
    private _importFn: () => Promise<ModuleConstructors[Id]>;

    constructor(private _name: Id) {
        this._importFn = async (): Promise<ModuleConstructors[Id]> => {
            // Get the correct build path from the injected map
            const importPath = __MODULE_BUILD_PATHS__[this._name];

            if (!importPath) {
                // This should theoretically not happen if build process is correct
                throw new Error(
                    `Build path for module ${this._name} not found in __MODULE_BUILD_PATHS__. Build configuration issue?`,
                );
            }

            try {
                // Perform the dynamic import using the path from the map
                const module = await import(/* @vite-ignore */ importPath);
                if (!module[this._name]) {
                    throw new Error(
                        `Module class ${this._name} not found in dynamically imported module: ${importPath}`,
                    );
                }
                return module[this._name] as ModuleConstructors[Id];
            } catch (err) {
                throw new Error(
                    `Failed to dynamically import module ${this._name} from path ${importPath}: ${err instanceof Error ? err.message : String(err)}`,
                );
            }
        };
    }

    /**
     * @internal
     * Get the module class, importing it if not already cached.
     * @returns A Promise that resolves to the module's class constructor.
     */
    public async import(): Promise<ModuleConstructors[Id]> {
        if (!this._promise) {
            this._promise = this._importFn();
        }

        return this._promise;
    }
}
