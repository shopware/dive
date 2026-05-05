import { describe, expect, it, vi } from 'vitest';
import { DIVEDeferredPromise } from '../DeferredPromise.ts';

describe('DIVEDeferredPromise', () => {
    it('should be directly awaitable when manually resolved', async () => {
        const deferred = new DIVEDeferredPromise<string>();

        deferred.resolve('ready');

        await expect(deferred).resolves.toBe('ready');
        expect(deferred.settled).toBe(true);
        expect(deferred.pending).toBe(false);
    });

    it('should be directly rejectable', async () => {
        const error = new Error('failed');
        const deferred = new DIVEDeferredPromise<string>();

        deferred.reject(error);

        await expect(deferred).rejects.toThrow(error);
        expect(deferred.settled).toBe(true);
        expect(deferred.pending).toBe(false);
    });

    it('should expose the native then, catch, and finally promise API', async () => {
        const deferred = new DIVEDeferredPromise<string>();
        const onFinally = vi.fn();

        const chained = deferred
            .then((value) => value.toUpperCase())
            .finally(onFinally);

        deferred.resolve('ready');

        await expect(chained).resolves.toBe('READY');
        expect(onFinally).toHaveBeenCalledTimes(1);
    });

    it('should not expose a promise getter', () => {
        const deferred = new DIVEDeferredPromise<string>();

        expect('promise' in deferred).toBe(false);
    });

    it('should ignore resolve and reject calls after it has settled', async () => {
        const deferred = new DIVEDeferredPromise<string>();

        deferred.resolve('first');
        deferred.resolve('second');
        deferred.reject(new Error('failed'));

        await expect(deferred).resolves.toBe('first');
    });

    it('should reset to a fresh pending promise API on the same wrapper', async () => {
        const deferred = new DIVEDeferredPromise<string>();
        const firstThen = deferred.then((value) => value);

        deferred.resolve('first');
        await expect(firstThen).resolves.toBe('first');

        const resetResult = deferred.reset();
        const secondThen = deferred.then((value) => value);

        expect(resetResult).toBe(deferred);
        expect(deferred.pending).toBe(true);
        expect(deferred.settled).toBe(false);

        deferred.resolve('second');
        await expect(secondThen).resolves.toBe('second');
    });

    it('should resolve promise-like values', async () => {
        const deferred = new DIVEDeferredPromise<string>();

        deferred.resolve(Promise.resolve('ready'));

        await expect(deferred).resolves.toBe('ready');
    });

    it('should route catch handlers through the wrapped promise', async () => {
        const deferred = new DIVEDeferredPromise<string>();
        const handled = deferred.catch((error: unknown) => {
            if (error instanceof Error) {
                return error.message;
            }

            return 'unknown';
        });

        deferred.reject(new Error('failed'));

        await expect(handled).resolves.toBe('failed');
    });

    it('should route finally handlers through the wrapped promise', async () => {
        const deferred = new DIVEDeferredPromise<string>();
        const onFinally = vi.fn();
        const handled = deferred.finally(onFinally);

        deferred.resolve('ready');

        await expect(handled).resolves.toBe('ready');
        expect(onFinally).toHaveBeenCalledTimes(1);
    });
});
