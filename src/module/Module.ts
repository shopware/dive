/** @internal */
// Define the base interface that modules will augment
declare global {
    interface ModuleClasses {}
}

type ModuleId = keyof ModuleClasses;

interface ModuleInfo {
    path: string;
}

/** @internal */
class Module<T extends new (...args: unknown[]) => unknown> {
    private _promise: Promise<T> | null = null;
    private _instance: InstanceType<T> | null = null;

    constructor(private _importFn: () => Promise<T>) {}

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
        this._instance = new ModuleClass() as InstanceType<T>;
        return this._instance;
    }
}

/** @internal */
class ModuleRegistryClass {
    private static _instance = new ModuleRegistryClass();
    private _modules = new Map<
        ModuleId,
        Module<new (...args: unknown[]) => unknown>
    >();
    private _moduleInfo = new Map<ModuleId, ModuleInfo>();

    private constructor() {}

    public static get instance(): ModuleRegistryClass {
        return this._instance;
    }

    /**
     * Get all registered module paths for build configuration
     */
    public getBuildConfig(): Record<string, string> {
        const entries: Record<string, string> = {};

        this._moduleInfo.forEach((info, id) => {
            entries[id] = info.path;
        });

        return entries;
    }

    /**
     * Register a module
     * @internal
     */
    public register<Id extends ModuleId>(name: Id, path: string): void {
        const importFn = async (): Promise<
            new (...args: unknown[]) => ModuleClasses[Id]
        > => {
            // Convert the path to a relative import path
            const relativePath = path.startsWith('src/')
                ? `../../${path}` // Relative to module directory
                : path;

            const module = await import(/* @vite-ignore */ relativePath);
            return module[name] as new (
                ...args: unknown[]
            ) => ModuleClasses[Id];
        };

        this._modules.set(name, new Module(importFn));
        this._moduleInfo.set(name, { path });
    }

    /**
     * Get a singleton instance of the module
     * @internal
     */
    public async getInstance<Id extends ModuleId>(
        name: Id,
    ): Promise<ModuleClasses[Id]> {
        const module = this._modules.get(name);
        if (!module) {
            throw new Error(`Module '${name}' not registered`);
        }
        return module.getInstance() as Promise<ModuleClasses[Id]>;
    }
}

// Internal singleton instance
const internalModules = ModuleRegistryClass.instance;
export { internalModules as Modules };
