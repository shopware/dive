export declare class DIVEModule<T> {
    private _path;
    private _ctor;
    constructor(_path: string, _ctor: string);
    private _promise;
    private _instance;
    get(): Promise<T>;
}
