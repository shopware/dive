/** one url: its load, the value once loaded, and how many hold it */
type Entry<T> = { promise: Promise<T>; value: T | null; refs: number };

/**
 * Loaded values shared by URL and counted by reference.
 *
 * Acquiring a URL that is loading or loaded shares that load; releasing the
 * last reference frees the value. What a URL turns into and how a value is
 * freed is up to the loader and disposer passed in.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export class DIVEAssetCache<T extends object> {
    private _entries = new Map<string, Entry<T>>();

    /**
     * @param _loader - Turns a URL into a value.
     * @param _disposer - Frees a value once nothing holds it.
     */
    constructor(
        private _loader: (url: string) => Promise<T>,
        private _disposer: (value: T) => void,
    ) {}

    /**
     * Takes a reference to the value of a URL, loading it unless it is
     * loading or loaded already.
     *
     * @param url - The URL.
     * @returns The value. Each one that resolves is to be released once.
     */
    public acquire(url: string): Promise<T> {
        let entry = this._entries.get(url);
        if (!entry) {
            // registered first, so a load failing at once can drop it
            entry = { value: null, refs: 0 } as unknown as Entry<T>;
            this._entries.set(url, entry);
            entry.promise = this._load(url, entry);
        }

        entry.refs++;
        return entry.promise;
    }

    /**
     * Gives back a reference taken with {@link acquire}. The last one frees
     * the value.
     *
     * @param url - The URL.
     */
    public release(url: string): void {
        const entry = this._entries.get(url);
        if (!entry) return;

        entry.refs--;
        if (entry.refs > 0 || !entry.value) return;

        this._entries.delete(url);
        this._disposer(entry.value);
    }

    private async _load(url: string, entry: Entry<T>): Promise<T> {
        let value: T;
        try {
            value = await this._loader(url);
        } catch (error) {
            // a failed load must not answer the next acquisition
            this._drop(url, entry);
            throw error;
        }

        entry.value = value;

        // released by everyone while it was on its way
        if (entry.refs === 0) {
            this._drop(url, entry);
            this._disposer(value);
        }
        return value;
    }

    private _drop(url: string, entry: Entry<T>): void {
        if (this._entries.get(url) === entry) this._entries.delete(url);
    }
}
