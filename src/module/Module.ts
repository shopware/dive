export class DIVEModule<T> {
    constructor(
        private _path: string,
        private _ctor: string,
    ) {}

    private _promise: Promise<T> | null = null;
    private _instance: T | null = null;

    public async get(): Promise<T> {
        // if we already have an instance, return it
        if (this._instance) {
            return Promise.resolve(this._instance);
        }

        // if we already have a loading process ongoing, return the already created promise
        if (this._promise) {
            return this._promise;
        }

        // if we don't have a promise yet, it means that we are not already loading the module
        this._promise = (async () => {
            const module = await import(this._path);

            const ModuleConstructor = module[this._ctor];

            if (!ModuleConstructor) {
                throw new Error(
                    `DIVE: Module class ${this._ctor} not found in ${this._path}`,
                );
            }

            if (typeof ModuleConstructor !== 'function') {
                throw new Error(
                    `DIVE: Module at ${this._path} does not export a valid constructor (${this._ctor} wanted)`,
                );
            }

            this._instance = new ModuleConstructor() as T;
            return this._instance;
        })();

        return this._promise;
    }
}
