import { DIVEResourceLease } from '../lease/ResourceLease.ts';

/**
 * How resources of one kind are loaded, lent and freed.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export type DIVEResourceKind<T extends object> = {
    /**
     * Loads the data of a URL.
     *
     * @param url - The URL.
     */
    load(url: string): Promise<T>;
    /**
     * Frees the loaded data, once its prototype is freed.
     *
     * @param value - The loaded data.
     */
    freeValue(value: T): void;
    /**
     * What each lease gets in place of the loaded data, and how it is freed
     * once that lease is released. Left out, every lease shares the loaded
     * data itself.
     */
    copy?: {
        make(value: T): T;
        free(copy: T): void;
    };
};

/**
 * The loaded data for one URL, which resources are drawn from.
 *
 * It loads once, however many resources are drawn, and lends each draw the
 * loaded data or, where its kind says so, a copy of its own, through a lease.
 * It counts the leases and says when the last one is released; whoever made
 * it then keeps it for later draws or {@link free}s it. A copy is freed with
 * its lease. A failed load is not kept, so the next draw loads again.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export class DIVEResourcePrototype<T extends object> {
    private _count = 0;
    private _loading: Promise<T> | null = null;
    private _value: T | null = null;

    private _freed = false;

    /**
     * @param url - Where the data is loaded from.
     * @param _kind - How the data is loaded, lent and freed.
     * @param _onIdle - Called each time the last lease is released.
     */
    constructor(
        public readonly url: string,
        private _kind: DIVEResourceKind<T>,
        private _onIdle?: () => void,
    ) {}

    /** How many leases are held or on their way. */
    public get count(): number {
        return this._count;
    }

    /** Whether it was freed. */
    public get freed(): boolean {
        return this._freed;
    }

    /**
     * Draws a lease, loading the data unless it is loading or loaded already.
     *
     * @returns The lease, to be released once it is no longer used.
     */
    public async draw(): Promise<DIVEResourceLease<T>> {
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

        const lent = this._kind.copy ? this._kind.copy.make(value) : value;
        return new DIVEResourceLease(lent, () => this._release(lent));
    }

    /**
     * Frees the loaded data; it draws nothing afterwards.
     *
     * @throws While a lease is held or on its way.
     */
    public free(): void {
        if (this._count > 0) {
            throw new Error(`DIVEResourcePrototype: ${this.url} is in use.`);
        }
        if (this._freed) return;

        this._freed = true;
        if (this._value) this._kind.freeValue(this._value);
        this._value = null;
        this._loading = null;
    }

    /** frees what a released lease got, and says so with the last */
    private _release(lent: T): void {
        this._count--;
        if (lent !== this._value) this._kind.copy?.free(lent);
        if (this._count === 0) this._onIdle?.();
    }

    /** loads, rejecting rather than throwing when the load throws at once */
    private async _load(): Promise<T> {
        const value = await this._kind.load(this.url);
        this._value = value;
        return value;
    }
}
