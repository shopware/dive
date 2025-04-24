/** @internal */

declare global {
    interface ModuleClasses {}
}

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

/**
 * @internal
 * Handles the dynamic importing and caching of module classes.
 * This class is responsible for:
 * 1. Dynamically importing the module class
 * 2. Caching the imported class to avoid multiple imports
 */
export class ModuleImporter<Id extends keyof ModuleClasses> {
    private _promise: Promise<ModuleConstructors[Id]> | null = null;
    private _instance: ModuleInstance<Id> | null = null;
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

    /**
     * @internal
     * Get an instance of the module class, importing it if not already cached.
     * @returns A Promise that resolves to an instance of the module's class.
     */
    public async instantiate(
        ...args: ConstructorParameters<ModuleConstructors[Id]>
    ): Promise<ModuleInstance<Id>> {
        if (this._instance !== null) {
            return Promise.resolve(this._instance);
        }

        const module = await this.import();
        this._instance = new (module as new (
            ...args: ConstructorParameters<ModuleConstructors[Id]>
        ) => ModuleInstance<Id>)(...args);
        return this._instance;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _dynamicImport(path: string): any {
        return import(/* @vite-ignore */ path);
    }
}
