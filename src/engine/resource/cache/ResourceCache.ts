import { type DIVEResourcePrototype } from '../prototype/ResourcePrototype.ts';

/**
 * Resource prototypes by URL, so a URL is loaded and parsed once however
 * many resources use it, independent of any DIVE instance or scene.
 *
 * A prototype is dropped with its last release or a failed load, so the
 * next draw of that URL loads again.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export class DIVEResourceCache<T extends object> {
    private _prototypes = new Map<string, DIVEResourcePrototype<T>>();

    /**
     * @param _create - Makes the prototype for a URL.
     */
    constructor(private _create: (url: string) => DIVEResourcePrototype<T>) {}

    /**
     * Draws a copy from the prototype of a URL, making it unless it exists.
     *
     * @param url - The URL.
     * @returns The copy. Each one that resolves is to be released once.
     */
    public async draw(url: string): Promise<T> {
        let prototype = this._prototypes.get(url);
        if (!prototype) {
            prototype = this._create(url);
            this._prototypes.set(url, prototype);
        }

        try {
            return await prototype.draw();
        } catch (error) {
            this._drop(prototype);
            throw error;
        }
    }

    /**
     * Gives back a copy taken with {@link draw}.
     *
     * @param url - The URL it was drawn for.
     * @param copy - The copy.
     */
    public release(url: string, copy: T): void {
        const prototype = this._prototypes.get(url);
        if (!prototype) return;

        prototype.release(copy);
        this._drop(prototype);
    }

    /** drops a prototype nothing is drawn from any more */
    private _drop(prototype: DIVEResourcePrototype<T>): void {
        if (prototype.count > 0) return;
        if (this._prototypes.get(prototype.url) === prototype) {
            this._prototypes.delete(prototype.url);
        }
    }
}
