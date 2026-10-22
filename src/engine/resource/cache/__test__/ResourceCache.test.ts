import { DIVEResourceCache } from '../ResourceCache.ts';
import { DIVEResourcePrototype } from '../../prototype/ResourcePrototype.ts';

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

    class DeferredPrototype extends DIVEResourcePrototype<Thing> {
        protected load(url: string): Promise<Thing> {
            return new Promise<Thing>((resolve, reject) => {
                loads.push({
                    url,
                    resolve: () => resolve(new Thing(url)),
                    reject,
                });
            });
        }

        protected copy(value: Thing): Thing {
            return new Thing(value.url);
        }

        protected free(value: Thing): void {
            value.disposed = true;
        }
    }

    const cache = new DIVEResourceCache<Thing>(
        (url) => new DeferredPrototype(url),
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
    });

    it('keeps urls apart', async () => {
        const { cache, loads } = deferredCache();

        const a = cache.draw('a.hdr');
        const b = cache.draw('b.hdr');
        loads.forEach((load) => load.resolve());

        expect((await a).url).toBe('a.hdr');
        expect((await b).url).toBe('b.hdr');
    });

    it('drops a prototype with its last release and loads again afterwards', async () => {
        const { cache, loads } = deferredCache();
        const first = cache.draw('a.hdr');
        const second = cache.draw('a.hdr');
        loads[0].resolve();
        const [a, b] = await Promise.all([first, second]);

        cache.release('a.hdr', a);
        expect(a.disposed).toBe(false);
        cache.release('a.hdr', b);
        expect(a.disposed).toBe(true);
        expect(b.disposed).toBe(true);

        const again = cache.draw('a.hdr');
        loads[1].resolve();
        expect(await again).not.toBe(a);
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
        expect((await retry).url).toBe('a.hdr');
    });

    it('ignores a release for a url it does not hold', () => {
        const { cache } = deferredCache();

        expect(() => cache.release('a.hdr', new Thing())).not.toThrow();
    });
});
