export declare class Chunk {
    private _uri;
    private _promise;
    private _resolve;
    private _arrayBuffer;
    private _size;
    private _createdAt;
    private _updatedAt;
    get promise(): Promise<ArrayBuffer>;
    get size(): number;
    get createdAt(): Date;
    get updatedAt(): Date;
    get arrayBuffer(): ArrayBuffer | null;
    constructor(_uri: string);
    load(): Promise<ArrayBuffer>;
}
