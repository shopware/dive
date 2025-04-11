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

        // For absolute paths starting with src/modules/, convert to a relative build path
        if (path.startsWith('src/modules/')) {
            // Extract just the filename (without extension) from the original source path
            const filename = path.split('/').pop()?.replace(/\.ts$/, '') || '';
            if (!filename) {
                console.error(
                    `[ModuleRegistry] Could not extract filename from path: ${path}`,
                );
                // Return something that will likely fail, but prevents crashing here
                return `invalid-module-path-${path}`;
            }
            // Use a path relative to the built file executing this import.
            // Assuming the executing code is in `build/` and modules are in `build/modules/`
            // Explicitly add the .mjs extension for ES Module resolution.
            return `./modules/${filename}.mjs`;
        }

        // For other paths (e.g., node_modules, though unlikely here), use as is
        console.warn(
            `[ModuleRegistry] Unexpected path format for dynamic import: ${path}`,
        );
        return path;
    }
}
