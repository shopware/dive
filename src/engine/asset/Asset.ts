/**
 * A loadable resource a DIVE object uses: the value in place, the load on
 * its way, and whether the value is the asset's to dispose.
 *
 * A value passed in is borrowed and never disposed, one loaded from a URL is
 * owned. Of overlapping requests the last one wins, and a value loaded for a
 * request that was overtaken is disposed on arrival. What a URL turns into
 * and how a value is freed is up to the loader and disposer passed in.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export class DIVEAsset<T extends object> {
    private _origin: string | T | null = null;
    private _value: T | null = null;
    private _owned = false;
    private _version = 0;

    /** the load serving the newest request; replacing it makes it stale */
    private _pending: {
        origin: string;
        done: Promise<void>;
    } | null = null;

    private _disposed = false;

    /**
     * @param _loader - Turns a URL into a value the asset then owns.
     * @param _disposer - Frees an owned value.
     * @param _onChange - Called whenever the value in place changes.
     */
    constructor(
        private _loader: (url: string) => Promise<T>,
        private _disposer: (value: T) => void,
        private _onChange: () => void = () => {},
    ) {}

    /** What the value in place came from: its URL or itself, `null` for none. */
    public get origin(): string | T | null {
        return this._origin;
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
     * Puts a value in place. One from a URL replaces the current one only
     * once it has loaded.
     *
     * @param origin - A URL, or a value to borrow.
     * @returns Resolves once the value is in place or was overtaken.
     */
    public async request(origin: string | T): Promise<void> {
        // the url already on its way
        if (this._pending?.origin === origin) return this._pending.done;

        this._pending = null;
        if (this._origin === origin) return;

        if (typeof origin !== 'string') {
            this._set(origin, origin, false);
            return;
        }

        // registered before the load starts, so a request during it sees it
        const pending = { origin, done: Promise.resolve() };
        this._pending = pending;
        pending.done = this._load(pending);
        return pending.done;
    }

    /** Drops the value in place and any load on its way. */
    public clear(): void {
        this._pending = null;
        this._set(null, null, false);
    }

    /** Frees an owned value; a load still on its way frees its own. */
    public dispose(): void {
        this._disposed = true;
        this._pending = null;
        if (this._owned && this._value) this._disposer(this._value);
        this._owned = false;
    }

    private async _load(
        pending: NonNullable<DIVEAsset<T>['_pending']>,
    ): Promise<void> {
        let value: T;
        try {
            value = await this._loader(pending.origin);
        } catch (error) {
            // a failed load must not answer the next request for the same url
            if (this._pending === pending) this._pending = null;
            throw error;
        }

        // overtaken by a newer request or by dispose
        if (this._disposed || this._pending !== pending) {
            this._disposer(value);
            return;
        }

        this._pending = null;
        this._set(pending.origin, value, true);
    }

    private _set(
        origin: string | T | null,
        value: T | null,
        owned: boolean,
    ): void {
        if (value === this._value) return;

        if (this._owned && this._value) this._disposer(this._value);
        this._origin = origin;
        this._value = value;
        this._owned = owned;
        this._version++;
        this._onChange();
    }
}
