export class DIVEDeferredPromise<T> implements Promise<T> {
    public readonly isDIVEDeferredPromise: true = true;
    public readonly [Symbol.toStringTag]: string = 'Promise';

    private _promise: Promise<T>;
    private _resolve!: (value: T | PromiseLike<T>) => void;
    private _reject!: (reason?: unknown) => void;
    private _settled: boolean = false;

    constructor() {
        this._promise = this._createPromise();
    }

    public get settled(): boolean {
        return this._settled;
    }

    public get pending(): boolean {
        return !this._settled;
    }

    public then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
        onrejected?:
            | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
            | null,
    ): Promise<TResult1 | TResult2> {
        return this._promise.then(onfulfilled, onrejected);
    }

    public catch<TResult = never>(
        onrejected?:
            | ((reason: unknown) => TResult | PromiseLike<TResult>)
            | null,
    ): Promise<T | TResult> {
        return this._promise.catch(onrejected);
    }

    public finally(onfinally?: (() => void) | null): Promise<T> {
        return this._promise.finally(onfinally);
    }

    public resolve(value: T | PromiseLike<T>): void {
        if (this._settled) {
            return;
        }

        this._settled = true;
        this._resolve(value);
    }

    public reject(reason?: unknown): void {
        if (this._settled) {
            return;
        }

        this._settled = true;
        this._reject(reason);
    }

    public reset(): this {
        this._promise = this._createPromise();
        return this;
    }

    private _createPromise(): Promise<T> {
        this._settled = false;

        return new Promise<T>((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
}
