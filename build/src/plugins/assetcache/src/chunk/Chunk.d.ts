export declare class Chunk<T extends object> {
    private _uri;
    private _parse;
    private _promise;
    private _resolve;
    private _arrayBuffer;
    private _result;
    private _size;
    private _createdAt;
    private _updatedAt;
    get promise(): Promise<T>;
    get result(): T | null;
    get size(): number;
    get createdAt(): Date;
    get updatedAt(): Date;
    get arrayBuffer(): ArrayBuffer | null;
    constructor(_uri: string, _parse: (arrayBuffer: ArrayBuffer) => Promise<T>);
    fetch(): Promise<T>;
}
