import {
    DIVEResourcePrototype,
    type DIVEResourceKind,
} from '../prototype/ResourcePrototype.ts';
import { type DIVEResourceLease } from '../lease/ResourceLease.ts';

/**
 * Resource prototypes by URL, so a URL is loaded and parsed once however
 * many resources use it, independent of any DIVE instance or scene.
 *
 * Prototypes are keyed by the resolved URL, so relative, `./`-prefixed and
 * absolute forms of one file share one. A prototype is dropped once its last
 * lease has freed it or its load has failed, so the next draw of that URL
 * loads again.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export class DIVEResourceCache<T extends object> {
    private _prototypes = new Map<string, DIVEResourcePrototype<T>>();

    /**
     * @param _kind - How the data is loaded, lent and freed.
     */
    constructor(private _kind: DIVEResourceKind<T>) {}

    /**
     * Draws from the prototype of a URL, making it unless it exists.
     *
     * @param url - The URL.
     * @returns The lease, to be released once it is no longer used.
     */
    public async draw(url: string): Promise<DIVEResourceLease<T>> {
        const key = resolveUrl(url);

        let prototype = this._prototypes.get(key);
        if (!prototype) {
            const made: DIVEResourcePrototype<T> = new DIVEResourcePrototype(
                url,
                this._kind,
                () => this._drop(key, made),
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
