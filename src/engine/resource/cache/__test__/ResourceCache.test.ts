import { DIVEResourceCache } from '../ResourceCache.ts';

/** a stand-in value, telling where it was loaded from */
class Thing {
    public disposed = false;
    constructor(public url = '') {}
}

/** a cache whose loads resolve when the test says so */
function deferredCache({ keep }: { keep?: number } = {}) {
    const loads: {
        url: string;
        resolve: () => void;
        reject: (error: Error) => void;
    }[] = [];

    const cache = new DIVEResourceCache<Thing>(
        {
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
        },
        keep === undefined ? undefined : { keep },
    );
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

    describe('keeping released prototypes', () => {
        /** draws a url, loads it and returns its lease */
        async function loaded(
            { cache, loads }: ReturnType<typeof deferredCache>,
            url: string,
        ) {
            const drawing = cache.draw(url);
            loads.at(-1)!.resolve();
            return drawing;
        }

        /** switches a → b → a the way a user does: the next drawn before the last released */
        async function switchBack(deferred: ReturnType<typeof deferredCache>) {
            const a = await loaded(deferred, 'a.hdr');
            const b = await loaded(deferred, 'b.hdr');
            a.release();
            const drawing = deferred.cache.draw('a.hdr');
            if (deferred.loads.length > 2) deferred.loads[2].resolve();
            const again = await drawing;
            b.release();
            return again;
        }

        it('loads a → b → a twice without keeping', async () => {
            const deferred = deferredCache();

            await switchBack(deferred);

            expect(deferred.loads.map((load) => load.url)).toEqual([
                'a.hdr',
                'b.hdr',
                'a.hdr',
            ]);
        });

        it('loads a → b → a once while keeping one', async () => {
            const deferred = deferredCache({ keep: 1 });

            const again = await switchBack(deferred);

            expect(deferred.loads.map((load) => load.url)).toEqual([
                'a.hdr',
                'b.hdr',
            ]);
            expect(again.value.url).toBe('a.hdr');
            expect(again.value.disposed).toBe(false);
        });

        it('keeps the loaded data of a released url unfreed and lends it again', async () => {
            const freeValue = vi.fn();
            const cache = new DIVEResourceCache<Thing>(
                { load: async (url) => new Thing(url), freeValue },
                { keep: 1 },
            );
            const a = await cache.draw('a.hdr');

            a.release();
            const again = await cache.draw('a.hdr');

            expect(freeValue).not.toHaveBeenCalled();
            expect(again.value).toBe(a.value);
        });

        it('frees the least recently released one when another enters a full list', async () => {
            const freeValue = vi.fn();
            const cache = new DIVEResourceCache<Thing>(
                { load: async (url) => new Thing(url), freeValue },
                { keep: 1 },
            );

            const a = await cache.draw('a.hdr');
            a.release();
            expect(freeValue).not.toHaveBeenCalled();

            (await cache.draw('b.hdr')).release();

            expect(freeValue).toHaveBeenCalledOnce();
            expect(freeValue).toHaveBeenCalledWith(a.value);
        });

        it('loads an evicted url again', async () => {
            const deferred = deferredCache({ keep: 1 });

            (await loaded(deferred, 'a.hdr')).release();
            (await loaded(deferred, 'b.hdr')).release();
            (await loaded(deferred, 'a.hdr')).release();

            expect(deferred.loads).toHaveLength(3);
        });

        it('evicts by when a url was last released, not first loaded', async () => {
            const load = vi.fn(async (url: string) => new Thing(url));
            const cache = new DIVEResourceCache<Thing>(
                { load, freeValue: () => {} },
                { keep: 2 },
            );

            (await cache.draw('a.hdr')).release();
            (await cache.draw('b.hdr')).release();
            (await cache.draw('a.hdr')).release();
            (await cache.draw('c.hdr')).release();
            (await cache.draw('a.hdr')).release();
            (await cache.draw('b.hdr')).release();

            expect(load.mock.calls.map(([url]) => url)).toEqual([
                'a.hdr',
                'b.hdr',
                'c.hdr',
                'b.hdr',
            ]);
        });

        it('keeps nothing of a failed load', async () => {
            const { cache, loads } = deferredCache({ keep: 1 });
            const failing = cache.draw('a.hdr');
            loads[0].reject(new Error('404'));
            await expect(failing).rejects.toThrow('404');

            const retry = cache.draw('a.hdr');
            loads[1].resolve();

            expect((await retry).value.url).toBe('a.hdr');
            expect(loads).toHaveLength(2);
        });

        it('frees every kept prototype on trim and loads them again afterwards', async () => {
            const freeValue = vi.fn();
            const load = vi.fn(async (url: string) => new Thing(url));
            const cache = new DIVEResourceCache<Thing>(
                { load, freeValue },
                { keep: 2 },
            );
            (await cache.draw('a.hdr')).release();
            (await cache.draw('b.hdr')).release();

            cache.trim();
            expect(freeValue).toHaveBeenCalledTimes(2);
            (await cache.draw('a.hdr')).release();

            expect(load).toHaveBeenCalledTimes(3);
        });

        it('leaves prototypes in use alone on trim', async () => {
            const freeValue = vi.fn();
            const load = vi.fn(async (url: string) => new Thing(url));
            const cache = new DIVEResourceCache<Thing>(
                { load, freeValue },
                { keep: 2 },
            );
            const held = await cache.draw('a.hdr');

            cache.trim();
            const shared = await cache.draw('a.hdr');

            expect(freeValue).not.toHaveBeenCalled();
            expect(shared.value).toBe(held.value);
            expect(load).toHaveBeenCalledOnce();
        });
    });

    describe('urls', () => {
        it('loads relative, ./-prefixed and absolute forms of one file once', async () => {
            const { cache, loads } = deferredCache();
            const absolute = new URL('hdri/a.hdr', document.baseURI).href;

            const drawn = Promise.all([
                cache.draw('hdri/a.hdr'),
                cache.draw('./hdri/a.hdr'),
                cache.draw(absolute),
            ]);
            loads[0].resolve();
            await drawn;

            expect(loads).toHaveLength(1);
        });

        it('loads from the url the first draw passed', async () => {
            const { cache, loads } = deferredCache();

            const drawn = cache.draw('./hdri/a.hdr');
            loads[0].resolve();

            expect((await drawn).value.url).toBe('./hdri/a.hdr');
        });

        it('keeps data and blob urls as they are', async () => {
            const { cache, loads } = deferredCache();
            const data = 'data:image/png;base64,AAAA';
            const blob = 'blob:http://localhost/1234';

            cache.draw(data);
            cache.draw(blob);

            expect(loads.map((load) => load.url)).toEqual([data, blob]);
        });

        it('keys a url it cannot resolve by the string itself', async () => {
            const { cache, loads } = deferredCache();

            const first = cache.draw('http://[');
            const second = cache.draw('http://[');
            loads[0].resolve();
            await Promise.all([first, second]);

            expect(loads).toHaveLength(1);
        });
    });
});
