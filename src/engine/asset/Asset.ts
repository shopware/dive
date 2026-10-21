import { type DIVEAssetCache } from './cache/AssetCache.ts';

/**
 * A loadable resource a DIVE object uses: the value in place and the load on
 * its way.
 *
 * Values come from a cache shared by URL, so the same URL used in several
 * places is loaded once. The asset holds a reference to what it has in place
 * and gives it back once that is replaced, cleared or disposed. Of
 * overlapping requests the last one wins, and a value loaded for a request
 * that was overtaken is given back on arrival.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export class DIVEAsset<T extends object> {
    private _url: string | null = null;
    private _value: T | null = null;
    private _version = 0;

    /** the load serving the newest request; replacing it makes it stale */
    private _pending: {
        url: string;
        done: Promise<void>;
    } | null = null;

    private _disposed = false;

    /**
     * @param _cache - Where values are loaded and shared.
     * @param _onChange - Called whenever the value in place changes.
     */
    constructor(
        private _cache: DIVEAssetCache<T>,
        private _onChange: () => void = () => {},
    ) {}

    /** The URL of the value in place, `null` for none. */
    public get url(): string | null {
        return this._url;
    }

    /** The value in place, `null` for none. */
    public get value(): T | null {
        return this._value;
    }

    /** Counts every change of the value, including to and from none. */
    public get version(): number {
        return this._version;
    }

    /**
     * Puts the value of a URL in place once it has loaded.
     *
     * @param url - The URL.
     * @returns Resolves once the value is in place or was overtaken.
     */
    public async request(url: string): Promise<void> {
        // the url already on its way
        if (this._pending?.url === url) return this._pending.done;

        this._pending = null;
        if (this._url === url) return;

        // registered before the load starts, so a request during it sees it
        const pending = { url, done: Promise.resolve() };
        this._pending = pending;
        pending.done = this._load(pending);
        return pending.done;
    }

    /** Drops the value in place and any load on its way. */
    public clear(): void {
        this._pending = null;
        this._set(null, null);
    }

    /** Gives back the value in place; a load still on its way gives back its own. */
    public dispose(): void {
        this._disposed = true;
        this.clear();
    }

    private async _load(
        pending: NonNullable<DIVEAsset<T>['_pending']>,
    ): Promise<void> {
        let value: T;
        try {
            value = await this._cache.acquire(pending.url);
        } catch (error) {
            // a failed load must not answer the next request for the same url
            if (this._pending === pending) this._pending = null;
            throw error;
        }

        // overtaken by a newer request or by dispose
        if (this._disposed || this._pending !== pending) {
            this._cache.release(pending.url);
            return;
        }

        this._pending = null;
        this._set(pending.url, value);
    }

    private _set(url: string | null, value: T | null): void {
        if (url === this._url) return;

        if (this._url !== null) this._cache.release(this._url);
        this._url = url;
        this._value = value;
        this._version++;
        this._onChange();
    }
}
