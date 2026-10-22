import {
    DIVEResourcePrototype,
    type DIVEResourceKind,
} from '../prototype/ResourcePrototype.ts';
import { type DIVEResourceLease } from '../lease/ResourceLease.ts';

/**
 * Options of a {@link DIVEResourceCache}.
 */
export type DIVEResourceCacheOptions = {
    /**
     * How many prototypes no lease holds any more are kept for a later draw,
     * the least recently released one freed first. `0` frees them at once.
     */
    keep?: number;
};

/**
 * Resource prototypes by URL, so a URL is loaded and parsed once however
 * many resources use it, independent of any DIVE instance or scene.
 *
 * Prototypes are keyed by the resolved URL, so relative, `./`-prefixed and
 * absolute forms of one file share one. Once its last lease is released, a
 * prototype is kept, up to `keep` of them, and a draw of its URL lends the
 * loaded data again without loading; a prototype pushed out of that list, or
 * released while nothing is kept, is freed and dropped, so the next draw of
 * that URL loads again. A failed load is never kept.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export class DIVEResourceCache<T extends object> {
    private _prototypes = new Map<string, DIVEResourcePrototype<T>>();

    /** released prototypes by key, least recently released first */
    private _kept = new Map<string, DIVEResourcePrototype<T>>();

    private _keep: number;

    /**
     * @param _kind - How the data is loaded, lent and freed.
     * @param options - How many released prototypes are kept.
     */
    constructor(
        private _kind: DIVEResourceKind<T>,
        { keep = 0 }: DIVEResourceCacheOptions = {},
    ) {
        this._keep = keep;
    }

    /**
     * Draws from the prototype of a URL, making it unless it exists.
     *
     * @param url - The URL.
     * @returns The lease, to be released once it is no longer used.
     */
    public async draw(url: string): Promise<DIVEResourceLease<T>> {
        const key = resolveUrl(url);
        this._kept.delete(key);

        let prototype = this._prototypes.get(key);
        if (!prototype) {
            const made: DIVEResourcePrototype<T> = new DIVEResourcePrototype(
                url,
                this._kind,
                () => this._idle(key, made),
            );
            this._prototypes.set(key, made);
            prototype = made;
        }

        try {
            return await prototype.draw();
        } catch (error) {
            // a failed load must not answer the next draw
            if (prototype.count === 0) this._drop(key, prototype);
            throw error;
        }
    }

    /**
     * Frees and drops every kept prototype; prototypes in use stay.
     */
    public trim(): void {
        for (const [key, prototype] of this._kept) this._free(key, prototype);
    }

    /** keeps a prototype its last lease left, freeing the oldest kept beyond the limit */
    private _idle(key: string, prototype: DIVEResourcePrototype<T>): void {
        this._kept.set(key, prototype);
        for (const [oldest, kept] of this._kept) {
            if (this._kept.size <= this._keep) break;
            this._free(oldest, kept);
        }
    }

    /** frees a prototype no lease holds and drops it */
    private _free(key: string, prototype: DIVEResourcePrototype<T>): void {
        this._kept.delete(key);
        this._drop(key, prototype);
        prototype.free();
    }

    /** drops a prototype, unless a newer one took its key */
    private _drop(key: string, prototype: DIVEResourcePrototype<T>): void {
        if (this._prototypes.get(key) === prototype) {
            this._prototypes.delete(key);
        }
    }
}

/**
 * The absolute form of a URL, or the URL itself where it cannot be resolved,
 * e.g. outside a document. `data:` and `blob:` URLs are left as they are.
 */
function resolveUrl(url: string): string {
    if (/^(data|blob):/i.test(url)) return url;

    try {
        return new URL(url, document.baseURI).href;
    } catch {
        return url;
    }
}
