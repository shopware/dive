import { Chunk } from '../chunk/Chunk.ts';

class AssetCacheClass {
    private _cache: Map<string, Chunk<object>> = new Map();

    public create<T extends object>(
        key: string,
        parse: (arrayBuffer: ArrayBuffer) => Promise<T>,
    ): Chunk<T> {
        const chunk = new Chunk<T>(key, parse);
        this._cache.set(key, chunk as unknown as Chunk<object>);
        return chunk;
    }

    public write(key: string, chunk: Chunk<object>): void {
        this._cache.set(key, chunk);
    }

    public read(key: string): Chunk<object> | null {
        return this._cache.get(key) ?? null;
    }

    public delete(key: string): void {
        this._cache.delete(key);
    }

    public clear(): void {
        this._cache.clear();
    }
}

export const AssetCache = new AssetCacheClass();
