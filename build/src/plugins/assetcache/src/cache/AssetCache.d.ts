import { Chunk } from '../chunk/Chunk.ts';
declare class AssetCacheClass {
    private _cache;
    create<T extends object>(key: string, parse: (arrayBuffer: ArrayBuffer) => Promise<T>): Chunk<T>;
    write(key: string, chunk: Chunk<object>): void;
    read(key: string): Chunk<object> | null;
    delete(key: string): void;
    clear(): void;
}
export declare const AssetCache: AssetCacheClass;
export {};
