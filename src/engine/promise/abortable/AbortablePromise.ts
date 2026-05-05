type DIVEAbortablePromiseRun<T> = {
    abortController: AbortController;
    promise: Promise<T>;
    settled: boolean;
};

export class DIVEAbortablePromise<T> implements Promise<T> {
    public readonly isDIVEAbortablePromise: true = true;
    public readonly [Symbol.toStringTag]: string = 'Promise';

    private _run: DIVEAbortablePromiseRun<T> | null = null;

    constructor(private _executor: (signal: AbortSignal) => Promise<T>) {}

    public get promise(): Promise<T> | null {
        return this._run?.promise ?? null;
    }

    public get signal(): AbortSignal | null {
        return this._run?.abortController.signal ?? null;
    }

    public get hasRun(): boolean {
        return this._run !== null;
    }

    public get pending(): boolean {
        return this._run !== null && !this._run.settled;
    }

    public run(): Promise<T> {
        if (this._run) {
            return this._run.promise;
        }

        const abortController = new AbortController();
        const promise = this._execute(abortController.signal);
        const run: DIVEAbortablePromiseRun<T> = {
            abortController,
            promise,
            settled: false,
        };

        run.promise = promise.finally(() => {
            run.settled = true;
        });
        this._run = run;

        return run.promise;
    }

    public then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
        onrejected?:
            | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
            | null,
    ): Promise<TResult1 | TResult2> {
        return this.run().then(onfulfilled, onrejected);
    }

    public catch<TResult = never>(
        onrejected?:
            | ((reason: unknown) => TResult | PromiseLike<TResult>)
            | null,
    ): Promise<T | TResult> {
        return this.run().catch(onrejected);
    }

    public finally(onfinally?: (() => void) | null): Promise<T> {
        return this.run().finally(onfinally);
    }

    public abort(reason?: unknown): void {
        this._run?.abortController.abort(reason);
        this.clear();
    }

    public clear(): void {
        this._run = null;
    }

    private _execute(signal: AbortSignal): Promise<T> {
        try {
            return Promise.resolve(this._executor(signal));
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
