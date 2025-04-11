/** @internal */
export class Module<T extends new (...args: unknown[]) => unknown> {
    private _promise: Promise<T> | null = null;
    private _instance: InstanceType<T> | null = null;
    private _importFn: () => Promise<T>;

    constructor(
        private _name: keyof ModuleClasses,
        private _path: string,
    ) {
        this._importFn = async (): Promise<T> => {
            const importPath = this.getImportPath(this._path);
            const module = await import(/* @vite-ignore */ importPath);
            if (!module[this._name]) {
                throw new Error(
                    `Module ${this._name} not found in ${importPath}`,
                );
            }
            return module[this._name] as T;
        };
    }

    /**
     * Get or create a singleton instance of the module
     * @internal
     */
    public async getInstance(): Promise<InstanceType<T>> {
        if (this._instance !== null) {
            return this._instance;
        }

        if (!this._promise) {
            this._promise = this._importFn();
        }

        try {
            const ModuleClass = await this._promise;
            this._instance = new ModuleClass() as InstanceType<T>;
            return this._instance;
        } catch (error) {
            throw new Error(
                `Failed to instantiate module ${this._name}: ${error instanceof Error ? error.message : String(error)}`,
            );
        }
    }

    /**
     * Converts a module path to a relative import path for Vite
     * This is needed because Vite requires relative paths for dynamic imports
     * @internal
     */
    private getImportPath(path: string): string {
        // If it's already a relative path, use it as is
        if (path.startsWith('./') || path.startsWith('../')) {
            return path;
        }

        // For absolute paths (starting with src/), convert to relative
        if (path.startsWith('src/')) {
            // Calculate the relative path from the current file location
            // This assumes the Module.ts file is in src/modules/registry/module/
            return `../../../${path}`;
        }

        // For node_modules or other special paths, use as is
        return path;
    }
}
