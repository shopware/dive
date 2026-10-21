import { DIVEAssetCache } from '../AssetCache.ts';

/** a stand-in value, telling where it was loaded from */
class Thing {
    constructor(public url = '') {}
}

/** a loader whose loads resolve when the test says so */
function deferredLoader() {
    const loads: {
        url: string;
        resolve: () => void;
        reject: (error: Error) => void;
    }[] = [];
    const load = vi.fn(
        (url: string) =>
            new Promise<Thing>((resolve, reject) => {
                loads.push({
                    url,
                    resolve: () => resolve(new Thing(url)),
                    reject,
                });
            }),
    );
    return { load, loads };
}

describe('DIVEAssetCache', () => {
    it('loads a url once for every acquisition and shares the value', async () => {
        const { load, loads } = deferredLoader();
        const cache = new DIVEAssetCache<Thing>(load, vi.fn());

        const first = cache.acquire('a.hdr');
        const second = cache.acquire('a.hdr');
        loads[0].resolve();

        expect(await first).toBe(await second);
        expect(load).toHaveBeenCalledOnce();
    });

    it('frees the value with the last release and loads again afterwards', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const cache = new DIVEAssetCache<Thing>(load, dispose);
        const first = cache.acquire('a.hdr');
        void cache.acquire('a.hdr');
        loads[0].resolve();
        const value = await first;

        cache.release('a.hdr');
        expect(dispose).not.toHaveBeenCalled();
        cache.release('a.hdr');
        expect(dispose).toHaveBeenCalledExactlyOnceWith(value);

        const again = cache.acquire('a.hdr');
        loads[1].resolve();
        expect(await again).not.toBe(value);
        expect(load).toHaveBeenCalledTimes(2);
    });

    it('frees a value that arrives after its last release', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const cache = new DIVEAssetCache<Thing>(load, dispose);
        const acquired = cache.acquire('a.hdr');

        cache.release('a.hdr');
        loads[0].resolve();
        const value = await acquired;

        expect(dispose).toHaveBeenCalledExactlyOnceWith(value);
        void cache.acquire('a.hdr');
        expect(load).toHaveBeenCalledTimes(2);
    });

    it('shares a load still on its way after a release, if acquired again', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const cache = new DIVEAssetCache<Thing>(load, dispose);
        void cache.acquire('a.hdr');

        cache.release('a.hdr');
        const again = cache.acquire('a.hdr');
        loads[0].resolve();
        await again;

        expect(load).toHaveBeenCalledOnce();
        expect(dispose).not.toHaveBeenCalled();
    });

    it('rejects every acquisition of a failed load and loads again on a retry', async () => {
        const { load, loads } = deferredLoader();
        const cache = new DIVEAssetCache<Thing>(load, vi.fn());
        const first = cache.acquire('a.hdr');
        const second = cache.acquire('a.hdr');

        loads[0].reject(new Error('404'));
        await expect(first).rejects.toThrow('404');
        await expect(second).rejects.toThrow('404');

        const retry = cache.acquire('a.hdr');
        loads[1].resolve();
        expect((await retry).url).toBe('a.hdr');
    });

    it('keeps urls apart', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const cache = new DIVEAssetCache<Thing>(load, dispose);
        const a = cache.acquire('a.hdr');
        const b = cache.acquire('b.hdr');
        loads[0].resolve();
        loads[1].resolve();
        const valueA = await a;
        await b;

        cache.release('a.hdr');

        expect(dispose).toHaveBeenCalledExactlyOnceWith(valueA);
    });

    it('loads again after a loader that throws at once', async () => {
        const load = vi
            .fn<(url: string) => Promise<Thing>>()
            .mockImplementationOnce(() => {
                throw new Error('bad url');
            })
            .mockImplementation(async (url) => new Thing(url));
        const cache = new DIVEAssetCache<Thing>(load, vi.fn());

        await expect(cache.acquire('a.hdr')).rejects.toThrow('bad url');

        expect((await cache.acquire('a.hdr')).url).toBe('a.hdr');
    });
});
