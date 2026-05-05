import { describe, expect, it, vi } from 'vitest';
import { DIVEAbortablePromise } from '../AbortablePromise.ts';

const createDeferred = <T>() => {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((promiseResolve) => {
        resolve = promiseResolve;
    });

    return {
        promise,
        resolve,
    };
};

describe('DIVEAbortablePromise', () => {
    it('should start the executor immediately after construction', () => {
        const executor = vi.fn(async () => 'done');

        const promise = new DIVEAbortablePromise(executor);

        expect(executor).toHaveBeenCalledTimes(1);
        expect(promise.pending).toBe(true);
    });

    it('should be directly awaitable', async () => {
        const promise = new DIVEAbortablePromise(async () => 'done');

        await expect(promise).resolves.toBe('done');
        expect(promise.pending).toBe(false);
        expect(promise.settled).toBe(true);
    });

    it('should expose the native then, catch, and finally promise API', async () => {
        const onFinally = vi.fn();
        const promise = new DIVEAbortablePromise(async () => 'ready');

        const chained = promise
            .then((value) => value.toUpperCase())
            .finally(onFinally);

        await expect(chained).resolves.toBe('READY');
        expect(onFinally).toHaveBeenCalledTimes(1);
    });

    it('should create a fresh signal for each instance', () => {
        const signals: AbortSignal[] = [];

        const firstPromise = new DIVEAbortablePromise(async (signal) => {
            signals.push(signal);
            return await new Promise<void>(() => {});
        });

        firstPromise.abort();

        new DIVEAbortablePromise(async (signal) => {
            signals.push(signal);
        });

        expect(signals[0]?.aborted).toBe(true);
        expect(signals[1]).toBeInstanceOf(AbortSignal);
        expect(signals[1]).not.toBe(signals[0]);
        expect(signals[1]?.aborted).toBe(false);
    });

    it('should abort the current signal', () => {
        let signal: AbortSignal | undefined;
        const promise = new DIVEAbortablePromise(async (abortSignal) => {
            signal = abortSignal;
            return await new Promise<void>(() => {});
        });

        promise.abort();

        expect(signal?.aborted).toBe(true);
    });

    it('should keep the same started promise for multiple awaiters', async () => {
        const deferred = createDeferred<string>();
        const executor = vi.fn(async () => await deferred.promise);
        const promise = new DIVEAbortablePromise(executor);

        const firstThen = promise.then((value) => value);
        const secondThen = promise.then((value) => value);

        expect(executor).toHaveBeenCalledTimes(1);

        deferred.resolve('done');

        await expect(firstThen).resolves.toBe('done');
        await expect(secondThen).resolves.toBe('done');
        expect(executor).toHaveBeenCalledTimes(1);
    });

    it('should expose synchronous executor failures through the promise API', async () => {
        const error = new Error('failed');
        const promise = new DIVEAbortablePromise<string>(() => {
            throw error;
        });

        await expect(promise).rejects.toThrow(error);
        expect(promise.pending).toBe(false);
        expect(promise.settled).toBe(true);
    });

    it('should route catch handlers through the wrapped promise', async () => {
        const promise = new DIVEAbortablePromise<string>(() => {
            throw new Error('failed');
        });
        const handled = promise.catch((error: unknown) => {
            if (error instanceof Error) {
                return error.message;
            }

            return 'unknown';
        });

        await expect(handled).resolves.toBe('failed');
    });

    it('should route finally handlers through the wrapped promise', async () => {
        const onFinally = vi.fn();
        const promise = new DIVEAbortablePromise(async () => 'ready');

        await expect(promise.finally(onFinally)).resolves.toBe('ready');
        expect(onFinally).toHaveBeenCalledTimes(1);
    });
});
