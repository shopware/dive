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
    it('should create a fresh signal when the promise starts', async () => {
        const signals: AbortSignal[] = [];
        const promise = new DIVEAbortablePromise(async (signal) => {
            signals.push(signal);
            return 'done';
        });

        await expect(promise.run()).resolves.toBe('done');

        expect(signals[0]).toBeInstanceOf(AbortSignal);
        expect(signals[0]?.aborted).toBe(false);
        expect(promise.hasRun).toBe(true);
        expect(promise.pending).toBe(false);
    });

    it('should reuse the current promise until it is cleared', async () => {
        const executor = vi.fn(async () => 'done');
        const promise = new DIVEAbortablePromise(executor);

        const firstRun = promise.run();
        const secondRun = promise.run();

        expect(secondRun).toBe(firstRun);
        await firstRun;

        expect(promise.run()).toBe(firstRun);
        expect(executor).toHaveBeenCalledTimes(1);
    });

    it('should abort the current signal and create a new controller on the next run', () => {
        const signals: AbortSignal[] = [];
        const promise = new DIVEAbortablePromise(async (signal) => {
            signals.push(signal);
            return await new Promise<void>(() => {});
        });

        void promise.run();
        promise.abort();
        void promise.run();

        expect(signals[0]?.aborted).toBe(true);
        expect(signals[1]).toBeInstanceOf(AbortSignal);
        expect(signals[1]).not.toBe(signals[0]);
        expect(signals[1]?.aborted).toBe(false);
    });

    it('should clear the cached promise without aborting the previous signal', () => {
        const signals: AbortSignal[] = [];
        const promise = new DIVEAbortablePromise(async (signal) => {
            signals.push(signal);
            return 'done';
        });

        const firstRun = promise.run();
        promise.clear();
        const secondRun = promise.run();

        expect(secondRun).not.toBe(firstRun);
        expect(signals[0]?.aborted).toBe(false);
        expect(signals[1]).not.toBe(signals[0]);
    });

    it('should keep a newer run active when an aborted older run settles later', async () => {
        const firstDeferred = createDeferred<string>();
        const secondDeferred = createDeferred<string>();
        let callCount = 0;

        const promise = new DIVEAbortablePromise(async () => {
            callCount += 1;
            return await (callCount === 1
                ? firstDeferred.promise
                : secondDeferred.promise);
        });

        const firstRun = promise.run();
        promise.abort();
        const secondRun = promise.run();

        firstDeferred.resolve('first');
        await firstRun;

        expect(promise.promise).toBe(secondRun);
        expect(promise.pending).toBe(true);

        secondDeferred.resolve('second');
        await secondRun;

        expect(promise.pending).toBe(false);
    });

    it('should expose synchronous executor failures through the promise', async () => {
        const error = new Error('failed');
        const promise = new DIVEAbortablePromise<string>(() => {
            throw error;
        });

        await expect(promise.run()).rejects.toThrow(error);
        expect(promise.pending).toBe(false);
    });
});
