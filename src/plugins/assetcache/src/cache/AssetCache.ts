import { Chunk } from '../chunk/Chunk.ts';

class AssetCacheClass {
    private _cache: Map<string, Chunk> = new Map();

    public get(): Map<string, Chunk> {
        return this._cache;
    }

    public create(key: string): Chunk {
        const chunk = new Chunk(key);
        this._cache.set(key, chunk);
        return chunk;
    }

    public write(key: string, chunk: Chunk): void {
        this._cache.set(key, chunk);
    }

    public read(key: string): Chunk | null {
        return this._cache.get(key) ?? null;
    }

    public delete(...keys: string[]): void {
        keys.forEach((key) => {
            this._cache.delete(key);
        });
    }

    public clear(): void {
        this._cache.clear();
    }
}

// Global symbol key
const ASSET_CACHE_SYMBOL = Symbol.for('@shopware-ag/dive/assetcache');

// Interface for global scope
interface GlobalWithAssetCache {
    [ASSET_CACHE_SYMBOL]?: AssetCacheClass;
}

// One AssetCache instance across all framework versions
const globalScope = globalThis as GlobalWithAssetCache;
if (!globalScope[ASSET_CACHE_SYMBOL]) {
    globalScope[ASSET_CACHE_SYMBOL] = new AssetCacheClass();
}

// Instance export
export const AssetCache: AssetCacheClass = globalScope[ASSET_CACHE_SYMBOL]!;
