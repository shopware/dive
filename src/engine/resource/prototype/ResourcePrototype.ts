/**
 * The loaded data for one URL, which resources are drawn from.
 *
 * It loads once, however many resources are drawn, and hands each resource a
 * copy of its own. It counts the copies drawn and is freed with the last
 * release. A failed load is not kept, so the next draw loads again.
 *
 * A released copy is kept for the next draw rather than freed, and every copy
 * is freed together with the loaded data. Copies may share data with it (a
 * texture clone shares its pixels), so nothing is freed while any copy is
 * still in use.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export abstract class DIVEResourcePrototype<T extends object> {
    private _count = 0;
    private _loading: Promise<T> | null = null;
    private _value: T | null = null;

    /** every copy made, drawn or not */
    private _copies = new Set<T>();

    /** copies released and waiting for the next draw */
    private _idle: T[] = [];

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

        const reused = this._idle.pop();
        if (reused) return reused;

        const copy = this.copy(value);
        this._copies.add(copy);
        return copy;
    }

    /**
     * Gives back a copy taken with {@link draw}. The last one frees every
     * copy and the loaded data.
     *
     * @param copy - The copy.
     */
    public release(copy: T): void {
        if (!this._copies.has(copy) || this._idle.includes(copy)) return;

        this._count--;
        this._idle.push(copy);
        if (this._count > 0) return;

        this._freed = true;
        this._copies.forEach((each) => this.free(each));
        if (this._value) this.free(this._value);
        this._copies.clear();
        this._idle = [];
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
