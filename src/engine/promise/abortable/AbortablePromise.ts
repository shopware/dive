export class DIVEAbortablePromise<T> implements Promise<T> {
    public readonly isDIVEAbortablePromise: true = true;
    public readonly [Symbol.toStringTag]: string = 'Promise';

    private _abortController = new AbortController();
    private _promise: Promise<T>;
    private _settled: boolean = false;

    constructor(private _executor: (signal: AbortSignal) => Promise<T>) {
        this._promise = this._execute(this._abortController.signal).finally(
            () => {
                this._settled = true;
            },
        );
    }

    public get signal(): AbortSignal {
        return this._abortController.signal;
    }

    public get pending(): boolean {
        return !this._settled;
    }

    public get settled(): boolean {
        return this._settled;
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

    public abort(reason?: unknown): void {
        this._abortController.abort(reason);
    }

    private _execute(signal: AbortSignal): Promise<T> {
        try {
            return Promise.resolve(this._executor(signal));
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
