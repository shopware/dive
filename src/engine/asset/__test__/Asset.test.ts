import { DIVEAsset } from '../Asset.ts';

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

describe('DIVEAsset', () => {
    it('puts a borrowed value in place synchronously', () => {
        const asset = new DIVEAsset<Thing>(vi.fn(), vi.fn());
        const thing = new Thing();

        void asset.request(thing);

        expect(asset.value).toBe(thing);
        expect(asset.origin).toBe(thing);
        expect(asset.version).toBe(1);
    });

    it('keeps the previous value until a url has loaded, then owns it', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const asset = new DIVEAsset<Thing>(load, dispose);
        const borrowed = new Thing();
        await asset.request(borrowed);

        const done = asset.request('a.hdr');
        expect(asset.value).toBe(borrowed);

        loads[0].resolve();
        await done;
        expect(asset.value?.url).toBe('a.hdr');
        expect(asset.origin).toBe('a.hdr');
        expect(asset.version).toBe(2);
        expect(dispose).not.toHaveBeenCalled();

        const owned = asset.value;
        await asset.request(new Thing());
        expect(dispose).toHaveBeenCalledExactlyOnceWith(owned);
    });

    it('lets the last request win and disposes an overtaken load on arrival', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const asset = new DIVEAsset<Thing>(load, dispose);

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
        const { load, loads } = deferredLoader();
        const asset = new DIVEAsset<Thing>(load, vi.fn());

        const first = asset.request('a.hdr');
        const second = asset.request('a.hdr');
        loads[0].resolve();
        await Promise.all([first, second]);

        expect(load).toHaveBeenCalledOnce();
        expect(asset.version).toBe(1);
    });

    it('does not reload the url in place', async () => {
        const { load, loads } = deferredLoader();
        const asset = new DIVEAsset<Thing>(load, vi.fn());
        const done = asset.request('a.hdr');
        loads[0].resolve();
        await done;

        await asset.request('a.hdr');

        expect(load).toHaveBeenCalledOnce();
        expect(asset.version).toBe(1);
    });

    it('drops a load on its way when the value in place is requested again', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const asset = new DIVEAsset<Thing>(load, dispose);
        const borrowed = new Thing();
        await asset.request(borrowed);

        const done = asset.request('a.hdr');
        await asset.request(borrowed);
        loads[0].resolve();
        await done;

        expect(asset.value).toBe(borrowed);
        expect(asset.version).toBe(1);
        expect(dispose).toHaveBeenCalledOnce();
    });

    it('rejects a failed load and loads again on a retry', async () => {
        const { load, loads } = deferredLoader();
        const asset = new DIVEAsset<Thing>(load, vi.fn());

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
        const onChange = vi.fn();
        const asset = new DIVEAsset<Thing>(vi.fn(), vi.fn(), onChange);

        await asset.request(new Thing());
        asset.clear();
        asset.clear();

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(asset.version).toBe(2);
    });

    it('clears the value, disposing it only when owned', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const asset = new DIVEAsset<Thing>(load, dispose);
        const done = asset.request('a.hdr');
        loads[0].resolve();
        await done;
        const owned = asset.value;

        asset.clear();
        expect(asset.value).toBeNull();
        expect(asset.origin).toBeNull();
        expect(dispose).toHaveBeenCalledExactlyOnceWith(owned);

        await asset.request(new Thing());
        asset.clear();
        expect(dispose).toHaveBeenCalledOnce();
    });

    it('drops a load on its way when cleared', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const asset = new DIVEAsset<Thing>(load, dispose);

        const done = asset.request('a.hdr');
        asset.clear();
        loads[0].resolve();
        await done;

        expect(asset.value).toBeNull();
        expect(dispose).toHaveBeenCalledOnce();
    });

    it('disposes an owned value but never a borrowed one', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const owning = new DIVEAsset<Thing>(load, dispose);
        const done = owning.request('a.hdr');
        loads[0].resolve();
        await done;
        const borrowing = new DIVEAsset<Thing>(vi.fn(), dispose);
        await borrowing.request(new Thing());

        owning.dispose();
        borrowing.dispose();

        expect(dispose).toHaveBeenCalledExactlyOnceWith(owning.value);
    });

    it('disposes a load that arrives after dispose', async () => {
        const { load, loads } = deferredLoader();
        const dispose = vi.fn();
        const asset = new DIVEAsset<Thing>(load, dispose);

        const done = asset.request('a.hdr');
        asset.dispose();
        loads[0].resolve();
        await done;

        expect(dispose).toHaveBeenCalledOnce();
        expect(asset.value).toBeNull();
    });
});
