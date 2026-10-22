/**
 * One draw from a resource prototype: the value lent and its way back.
 *
 * Each lease is its own object, also when several carry the same value, and
 * releases once: a second {@link release} does nothing. Works with `using`.
 *
 * @typeParam T - The value, e.g. a texture.
 */
export class DIVEResourceLease<T extends object> implements Disposable {
    private _released = false;

    /**
     * @param value - What the lease lends.
     * @param _onRelease - Gives it back, called once.
     */
    constructor(
        public readonly value: T,
        private _onRelease: () => void,
    ) {}

    /** Whether it was given back. */
    public get released(): boolean {
        return this._released;
    }

    /** Gives the value back to its prototype. */
    public release(): void {
        if (this._released) return;

        this._released = true;
        this._onRelease();
    }

    public [Symbol.dispose](): void {
        this.release();
    }
}
