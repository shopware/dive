/** @internal */

// Declare the global variable injected by the build process
declare const __MODULE_BUILD_PATHS__: Record<keyof ModuleClasses, string>;

export class Module<T extends new (...args: unknown[]) => unknown> {
    private _promise: Promise<T> | null = null;
    private _importFn: () => Promise<T>;

    constructor(private _name: keyof ModuleClasses) {
        this._importFn = async (): Promise<T> => {
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
                return module[this._name] as T;
            } catch (err) {
                throw new Error(
                    `Failed to dynamically import module ${this._name} from path ${importPath}: ${err instanceof Error ? err.message : String(err)}`,
                );
            }
        };
    }

    /**
     * Get the module class
     * @internal
     */
    public async getClass(): Promise<T> {
        if (!this._promise) {
            this._promise = this._importFn();
        }

        return this._promise;
    }
}
