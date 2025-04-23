/** @internal */

import { ModuleConstructors } from '..';

declare global {
    interface ModuleClasses {}
}

/**
 * @internal
 * Handles the dynamic importing and caching of module classes.
 * This class is responsible for:
 * 1. Dynamically importing the module class
 * 2. Caching the imported class to avoid multiple imports
 */
export class ModuleImporter<Id extends keyof ModuleClasses> {
    private _promise: Promise<ModuleConstructors[Id]> | null = null;
    private _importFn: () => Promise<ModuleConstructors[Id]>;

    constructor(private _path: string) {
        this._importFn = async (): Promise<ModuleConstructors[Id]> => {
            try {
                // Perform the dynamic import using the path
                const module = await this._dynamicImport(this._path);
                const moduleName = Object.keys(module)[0];

                if (!moduleName || !module[moduleName]) {
                    throw new Error(
                        `Module class not found in dynamically imported module: ${this._path}`,
                    );
                }
                return module[moduleName] as ModuleConstructors[Id];
            } catch (err) {
                throw new Error(
                    `Failed to dynamically import module from path ${this._path}: ${err instanceof Error ? err.message : String(err)}`,
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _dynamicImport(path: string): any {
        return import(/* @vite-ignore */ path);
    }
}
