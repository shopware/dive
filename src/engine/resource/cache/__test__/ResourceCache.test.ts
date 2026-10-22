import { DIVEResourceCache } from '../ResourceCache.ts';

/** a stand-in value, telling where it was loaded from */
class Thing {
    public disposed = false;
    constructor(public url = '') {}
}

/** a cache whose loads resolve when the test says so */
function deferredCache() {
    const loads: {
        url: string;
        resolve: () => void;
        reject: (error: Error) => void;
    }[] = [];

    const cache = new DIVEResourceCache<Thing>({
        load: (url) =>
            new Promise<Thing>((resolve, reject) => {
                loads.push({
                    url,
                    resolve: () => resolve(new Thing(url)),
                    reject,
                });
            }),
        freeValue: (value) => {
            value.disposed = true;
        },
        copy: {
            make: (value) => new Thing(value.url),
            free: (copy) => {
                copy.disposed = true;
            },
        },
    });
    return { cache, loads };
}

describe('DIVEResourceCache', () => {
    it('loads a url once for every draw', async () => {
        const { cache, loads } = deferredCache();

        const first = cache.draw('a.hdr');
        const second = cache.draw('a.hdr');
        loads[0].resolve();
        const [a, b] = await Promise.all([first, second]);

        expect(loads).toHaveLength(1);
        expect(a).not.toBe(b);
        expect(a.value).not.toBe(b.value);
    });

    it('keeps urls apart', async () => {
        const { cache, loads } = deferredCache();

        const a = cache.draw('a.hdr');
        const b = cache.draw('b.hdr');
        loads.forEach((load) => load.resolve());

        expect((await a).value.url).toBe('a.hdr');
        expect((await b).value.url).toBe('b.hdr');
    });

    it('drops a prototype with its last lease and loads again afterwards', async () => {
        const { cache, loads } = deferredCache();
        const first = cache.draw('a.hdr');
        const second = cache.draw('a.hdr');
        loads[0].resolve();
        const [a, b] = await Promise.all([first, second]);

        a.release();
        expect(a.value.disposed).toBe(true);
        expect(b.value.disposed).toBe(false);
        b.release();
        expect(b.value.disposed).toBe(true);

        const again = cache.draw('a.hdr');
        loads[1].resolve();
        expect((await again).value).not.toBe(a.value);
        expect(loads).toHaveLength(2);
    });

    it('keeps a prototype when one lease is released twice', async () => {
        const { cache, loads } = deferredCache();
        const first = cache.draw('a.hdr');
        const second = cache.draw('a.hdr');
        loads[0].resolve();
        const [a, b] = await Promise.all([first, second]);

        a.release();
        a.release();
        const third = await cache.draw('a.hdr');

        expect(b.value.disposed).toBe(false);
        expect(third.value.disposed).toBe(false);
        expect(loads).toHaveLength(1);
    });

    it('leaves the next prototype of a url alone when a lease of a freed one is released again', async () => {
        const { cache, loads } = deferredCache();
        const drawing = cache.draw('a.hdr');
        loads[0].resolve();
        const old = await drawing;
        old.release();

        const next = cache.draw('a.hdr');
        loads[1].resolve();
        const current = await next;
        old.release();
        const shared = await cache.draw('a.hdr');

        expect(current.value.disposed).toBe(false);
        expect(shared.value.disposed).toBe(false);
        expect(loads).toHaveLength(2);
    });

    it('rejects every draw of a failed load and loads again on a retry', async () => {
        const { cache, loads } = deferredCache();
        const first = cache.draw('a.hdr');
        const second = cache.draw('a.hdr');

        loads[0].reject(new Error('404'));
        await expect(first).rejects.toThrow('404');
        await expect(second).rejects.toThrow('404');

        const retry = cache.draw('a.hdr');
        loads[1].resolve();
        expect((await retry).value.url).toBe('a.hdr');
    });

});
