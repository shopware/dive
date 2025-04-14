/** @internal */
export declare class Module<T extends new (...args: unknown[]) => unknown> {
    private _name;
    private _promise;
    private _instance;
    private _importFn;
    constructor(_name: keyof ModuleClasses);
    /**
     * Get or create a singleton instance of the module
     * @internal
     */
    getInstance(): Promise<InstanceType<T>>;
}
