/**
 * The loaded data for one URL, which resources are drawn from.
 *
 * It loads once, however many resources are drawn, and hands each resource a
 * copy of its own. It counts the copies drawn and is freed with the last
 * release. A failed load is not kept, so the next draw loads again.
 *
 * A released copy is freed at once. Copies may share data with the loaded
 * value (a texture clone shares its pixels), so that value is freed only with
 * the last release.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export abstract class DIVEResourcePrototype<T extends object> {
    private _count = 0;
    private _loading: Promise<T> | null = null;
    private _value: T | null = null;

    /** the copies drawn and not yet released */
    private _copies = new Set<T>();

    private _freed = false;

    /**
     * @param url - Where the data is loaded from.
     */
    constructor(public readonly url: string) {}

    /** How many copies are drawn or on their way. */
    public get count(): number {
        return this._count;
    }

    /** Whether the last release has freed it. */
    public get freed(): boolean {
        return this._freed;
    }

    /**
     * Draws a copy, loading the data unless it is loading or loaded already.
     *
     * @returns The copy. Each one that resolves is to be released once.
     */
    public async draw(): Promise<T> {
        if (this._freed) {
            throw new Error(`DIVEResourcePrototype: ${this.url} is freed.`);
        }

        this._count++;
        const loading = (this._loading ??= this._load());

        let value: T;
        try {
            value = await loading;
        } catch (error) {
            this._count--;
            // a failed load must not answer the next draw
            if (this._loading === loading) this._loading = null;
            throw error;
        }

        const copy = this.copy(value);
        this._copies.add(copy);
        return copy;
    }

    /**
     * Gives back a copy taken with {@link draw} and frees it. The last one
     * frees the loaded data too.
     *
     * @param copy - The copy.
     */
    public release(copy: T): void {
        if (!this._copies.delete(copy)) return;

        this._count--;
        this.free(copy);
        if (this._count > 0) return;

        this._freed = true;
        if (this._value) this.free(this._value);
        this._value = null;
        this._loading = null;
    }

    /**
     * Loads the data of a URL.
     *
     * @param url - The URL.
     */
    protected abstract load(url: string): Promise<T>;

    /**
     * Makes a copy for one resource.
     *
     * @param value - The loaded data.
     */
    protected abstract copy(value: T): T;

    /**
     * Frees a copy or the loaded data.
     *
     * @param value - What to free.
     */
    protected abstract free(value: T): void;

    /** loads, rejecting rather than throwing when the load throws at once */
    private async _load(): Promise<T> {
        const value = await this.load(this.url);
        this._value = value;
        return value;
    }
}
