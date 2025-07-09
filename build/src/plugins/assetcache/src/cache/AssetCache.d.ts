import { Chunk } from '../chunk/Chunk.ts';
declare class AssetCacheClass {
    private _cache;
    get(): Map<string, Chunk>;
    create(key: string): Chunk;
    write(key: string, chunk: Chunk): void;
    read(key: string): Chunk | null;
    delete(...keys: string[]): void;
    clear(): void;
}
export declare const AssetCache: AssetCacheClass;
export {};
