type ModuleId = keyof ModuleClasses;

/** @internal */
export class Module<T extends new (...args: unknown[]) => unknown> {
    private _promise: Promise<T> | null = null;
    private _instance: InstanceType<T> | null = null;
    private _importFn: () => Promise<T>;
    constructor(
        private _name: ModuleId,
        private _path: string,
    ) {
        this._importFn = async (): Promise<T> => {
            const relativePath = this.getImportPath(this._path);
            const module = await import(/* @vite-ignore */ relativePath);
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
        const ModuleClass = await this._promise;
        if (!ModuleClass) {
            throw new Error(`Failed to import module ${this._name}`);
        }
        this._instance = new ModuleClass() as InstanceType<T>;
        return this._instance;
    }

    /**
     * Convert a module path to a relative import path if needed
     * @internal
     */
    private getImportPath(path: string): string {
        return path.startsWith('src/') ? `../../../../${path}` : path;
    }
}
