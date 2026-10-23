import { type DIVEResourceCache } from './cache/ResourceCache.ts';
import { type DIVEResourceLease } from './lease/ResourceLease.ts';

/**
 * What a DIVE object holds of something loaded by URL: a lease on the
 * resource prototype of that URL, and the load on its way.
 *
 * Prototypes are shared by URL, so the same URL used in several places is
 * loaded once. The lease is released once it is replaced, cleared or
 * disposed. Of overlapping requests the last one wins, and a lease drawn for
 * a request that was overtaken is released on arrival.
 *
 * Holding a value puts it nowhere: a user compares it with what three
 * renders from and assigns it there itself, right before rendering.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export class DIVEResource<T extends object> {
    private _url: string | null = null;
    private _lease: DIVEResourceLease<T> | null = null;

    /** the load serving the newest request; replacing it makes it stale */
    private _pending: {
        url: string;
        done: Promise<void>;
    } | null = null;

    private _disposed = false;

    /**
     * @param _cache - Where the prototypes are kept.
     */
    constructor(private _cache: DIVEResourceCache<T>) {}

    /** The URL of the value in place, `null` for none. */
    public get url(): string | null {
        return this._url;
    }

    /** The value in place, `null` for none. */
    public get value(): T | null {
        return this._lease?.value ?? null;
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

    /** Releases the lease in place; a load still on its way releases its own. */
    public dispose(): void {
        this._disposed = true;
        this.clear();
    }

    private async _load(
        pending: NonNullable<DIVEResource<T>['_pending']>,
    ): Promise<void> {
        let lease: DIVEResourceLease<T>;
        try {
            lease = await this._cache.draw(pending.url);
        } catch (error) {
            // a failed load must not answer the next request for the same url
            if (this._pending === pending) this._pending = null;
            throw error;
        }

        // overtaken by a newer request or by dispose
        if (this._disposed || this._pending !== pending) {
            lease.release();
            return;
        }

        this._pending = null;
        this._set(pending.url, lease);
    }

    private _set(url: string | null, lease: DIVEResourceLease<T> | null): void {
        if (url === this._url) return;

        this._lease?.release();
        this._url = url;
        this._lease = lease;
    }
}
