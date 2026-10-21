import { DIVEAsset } from '../Asset.ts';
import { DIVEAssetCache } from '../cache/AssetCache.ts';

/** a stand-in value, telling where it was loaded from */
class Thing {
    constructor(public url = '') {}
}

/** a cache whose loads resolve when the test says so */
function deferredCache() {
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
    const dispose = vi.fn();
    const cache = new DIVEAssetCache<Thing>(load, dispose);
    return { cache, load, loads, dispose };
}

/** an asset with a.hdr loaded and in place */
async function loaded(
    cache: DIVEAssetCache<Thing>,
    loads: { resolve: () => void }[],
) {
    const asset = new DIVEAsset<Thing>(cache);
    const done = asset.request('a.hdr');
    loads[loads.length - 1].resolve();
    await done;
    return asset;
}

describe('DIVEAsset', () => {
    it('keeps the previous value until a url has loaded', async () => {
        const { cache, loads } = deferredCache();
        const asset = await loaded(cache, loads);
        const previous = asset.value;

        const done = asset.request('b.hdr');
        expect(asset.value).toBe(previous);
        expect(asset.url).toBe('a.hdr');

        loads[1].resolve();
        await done;
        expect(asset.value?.url).toBe('b.hdr');
        expect(asset.url).toBe('b.hdr');
        expect(asset.version).toBe(2);
    });

    it('frees the value it replaced, unless someone else holds it', async () => {
        const { cache, loads, dispose } = deferredCache();
        const asset = await loaded(cache, loads);
        const other = await loaded(cache, loads);
        const shared = asset.value;

        const first = asset.request('b.hdr');
        loads[1].resolve();
        await first;
        expect(dispose).not.toHaveBeenCalled();

        const second = other.request('b.hdr');
        await second;
        expect(dispose).toHaveBeenCalledExactlyOnceWith(shared);
    });

    it('shares the value with another asset requesting the same url', async () => {
        const { cache, load, loads } = deferredCache();
        const light = new DIVEAsset<Thing>(cache);
        const background = new DIVEAsset<Thing>(cache);

        const done = Promise.all([
            light.request('a.hdr'),
            background.request('a.hdr'),
        ]);
        loads[0].resolve();
        await done;

        expect(load).toHaveBeenCalledOnce();
        expect(light.value).toBe(background.value);
    });

    it('lets the last request win and frees an overtaken load on arrival', async () => {
        const { cache, loads, dispose } = deferredCache();
        const asset = new DIVEAsset<Thing>(cache);

        const first = asset.request('a.hdr');
        const second = asset.request('b.hdr');
        loads[1].resolve();
        await second;
        loads[0].resolve();
        await first;

        expect(asset.value?.url).toBe('b.hdr');
        expect(dispose).toHaveBeenCalledOnce();
        expect(dispose.mock.calls[0][0].url).toBe('a.hdr');
    });

    it('answers a request for the url on its way with the same load', async () => {
        const { cache, load, loads } = deferredCache();
        const asset = new DIVEAsset<Thing>(cache);

        const first = asset.request('a.hdr');
        const second = asset.request('a.hdr');
        loads[0].resolve();
        await Promise.all([first, second]);

        expect(load).toHaveBeenCalledOnce();
        expect(asset.version).toBe(1);
    });

    it('does not reload the url in place', async () => {
        const { cache, load, loads } = deferredCache();
        const asset = await loaded(cache, loads);

        await asset.request('a.hdr');

        expect(load).toHaveBeenCalledOnce();
        expect(asset.version).toBe(1);
    });

    it('drops a load on its way when the url in place is requested again', async () => {
        const { cache, loads, dispose } = deferredCache();
        const asset = await loaded(cache, loads);
        const inPlace = asset.value;

        const done = asset.request('b.hdr');
        await asset.request('a.hdr');
        loads[1].resolve();
        await done;

        expect(asset.value).toBe(inPlace);
        expect(asset.version).toBe(1);
        expect(dispose).toHaveBeenCalledOnce();
        expect(dispose.mock.calls[0][0].url).toBe('b.hdr');
    });

    it('rejects a failed load and loads again on a retry', async () => {
        const { cache, load, loads } = deferredCache();
        const asset = new DIVEAsset<Thing>(cache);

        const failed = asset.request('a.hdr');
        loads[0].reject(new Error('404'));
        await expect(failed).rejects.toThrow('404');

        const retry = asset.request('a.hdr');
        loads[1].resolve();
        await retry;

        expect(load).toHaveBeenCalledTimes(2);
        expect(asset.value?.url).toBe('a.hdr');
    });

    it('reports every change of the value', async () => {
        const { cache, loads } = deferredCache();
        const onChange = vi.fn();
        const asset = new DIVEAsset<Thing>(cache, onChange);

        const done = asset.request('a.hdr');
        loads[0].resolve();
        await done;
        asset.clear();
        asset.clear();

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(asset.version).toBe(2);
    });

    it('clears the value and frees it', async () => {
        const { cache, loads, dispose } = deferredCache();
        const asset = await loaded(cache, loads);
        const value = asset.value;

        asset.clear();

        expect(asset.value).toBeNull();
        expect(asset.url).toBeNull();
        expect(dispose).toHaveBeenCalledExactlyOnceWith(value);
    });

    it('drops a load on its way when cleared', async () => {
        const { cache, loads, dispose } = deferredCache();
        const asset = new DIVEAsset<Thing>(cache);

        const done = asset.request('a.hdr');
        asset.clear();
        loads[0].resolve();
        await done;

        expect(asset.value).toBeNull();
        expect(dispose).toHaveBeenCalledOnce();
    });

    it('frees its value on dispose', async () => {
        const { cache, loads, dispose } = deferredCache();
        const asset = await loaded(cache, loads);
        const value = asset.value;

        asset.dispose();

        expect(dispose).toHaveBeenCalledExactlyOnceWith(value);
    });

    it('frees a load that arrives after dispose', async () => {
        const { cache, loads, dispose } = deferredCache();
        const asset = new DIVEAsset<Thing>(cache);

        const done = asset.request('a.hdr');
        asset.dispose();
        loads[0].resolve();
        await done;

        expect(dispose).toHaveBeenCalledOnce();
        expect(asset.value).toBeNull();
    });
});
