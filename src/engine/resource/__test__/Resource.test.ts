import { DIVEResource } from '../Resource.ts';
import { DIVEResourceCache } from '../cache/ResourceCache.ts';
import { DIVEResourcePrototype } from '../prototype/ResourcePrototype.ts';

/** a stand-in value, telling where it was loaded from */
class Thing {
    public disposed = false;
    constructor(
        public url = '',
        public original: Thing | null = null,
    ) {}
}

/** a cache whose loads resolve when the test says so */
function deferredCache() {
    const loads: {
        url: string;
        resolve: () => void;
        reject: (error: Error) => void;
    }[] = [];
    const freed: Thing[] = [];

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
            return new Thing(value.url, value);
        }

        protected free(value: Thing): void {
            value.disposed = true;
            freed.push(value);
        }
    }

    const cache = new DIVEResourceCache<Thing>(
        (url) => new DeferredPrototype(url),
    );
    return { cache, loads, freed };
}

/** a resource with a.hdr loaded and in place */
async function loaded(
    cache: DIVEResourceCache<Thing>,
    loads: { resolve: () => void }[],
) {
    const resource = new DIVEResource<Thing>(cache);
    const done = resource.request('a.hdr');
    loads[loads.length - 1].resolve();
    await done;
    return resource;
}

describe('DIVEResource', () => {
    it('keeps the previous value until a url has loaded', async () => {
        const { cache, loads } = deferredCache();
        const resource = await loaded(cache, loads);
        const previous = resource.value;

        const done = resource.request('b.hdr');
        expect(resource.value).toBe(previous);
        expect(resource.url).toBe('a.hdr');

        loads[1].resolve();
        await done;
        expect(resource.value?.url).toBe('b.hdr');
        expect(resource.url).toBe('b.hdr');
        expect(resource.version).toBe(2);
    });

    it('frees the url it moved away from, unless another resource holds it', async () => {
        const { cache, loads } = deferredCache();
        const resource = await loaded(cache, loads);
        const other = new DIVEResource<Thing>(cache);
        await other.request('a.hdr');
        const prototype = resource.value!.original!;

        const first = resource.request('b.hdr');
        loads[1].resolve();
        await first;
        expect(prototype.disposed).toBe(false);

        await other.request('b.hdr');
        expect(prototype.disposed).toBe(true);
    });

    it('gets its own copy of a url another resource requests as well', async () => {
        const { cache, loads } = deferredCache();
        const light = new DIVEResource<Thing>(cache);
        const background = new DIVEResource<Thing>(cache);

        const done = Promise.all([
            light.request('a.hdr'),
            background.request('a.hdr'),
        ]);
        loads[0].resolve();
        await done;

        expect(loads).toHaveLength(1);
        expect(light.value).not.toBe(background.value);
        expect(light.value!.original).toBe(background.value!.original);
    });

    it('lets the last request win and gives back an overtaken load on arrival', async () => {
        const { cache, loads, freed } = deferredCache();
        const resource = new DIVEResource<Thing>(cache);

        const first = resource.request('a.hdr');
        const second = resource.request('b.hdr');
        loads[1].resolve();
        await second;
        loads[0].resolve();
        await first;

        expect(resource.value?.url).toBe('b.hdr');
        expect(freed.map((thing) => thing.url)).toEqual(['a.hdr', 'a.hdr']);
    });

    it('answers a request for the url on its way with the same load', async () => {
        const { cache, loads } = deferredCache();
        const resource = new DIVEResource<Thing>(cache);

        const first = resource.request('a.hdr');
        const second = resource.request('a.hdr');
        loads[0].resolve();
        await Promise.all([first, second]);

        expect(loads).toHaveLength(1);
        expect(resource.version).toBe(1);
    });

    it('does not reload the url in place', async () => {
        const { cache, loads } = deferredCache();
        const resource = await loaded(cache, loads);

        await resource.request('a.hdr');

        expect(loads).toHaveLength(1);
        expect(resource.version).toBe(1);
    });

    it('drops a load on its way when the url in place is requested again', async () => {
        const { cache, loads, freed } = deferredCache();
        const resource = await loaded(cache, loads);
        const inPlace = resource.value;

        const done = resource.request('b.hdr');
        await resource.request('a.hdr');
        loads[1].resolve();
        await done;

        expect(resource.value).toBe(inPlace);
        expect(resource.version).toBe(1);
        expect(freed.every((thing) => thing.url === 'b.hdr')).toBe(true);
    });

    it('rejects a failed load and loads again on a retry', async () => {
        const { cache, loads } = deferredCache();
        const resource = new DIVEResource<Thing>(cache);

        const failed = resource.request('a.hdr');
        loads[0].reject(new Error('404'));
        await expect(failed).rejects.toThrow('404');

        const retry = resource.request('a.hdr');
        loads[1].resolve();
        await retry;

        expect(loads).toHaveLength(2);
        expect(resource.value?.url).toBe('a.hdr');
    });

    it('keeps the newest request when an overtaken load fails', async () => {
        const { cache, loads } = deferredCache();
        const resource = new DIVEResource<Thing>(cache);

        const failed = resource.request('a.hdr');
        const newest = resource.request('b.hdr');
        loads[0].reject(new Error('404'));
        await expect(failed).rejects.toThrow('404');

        const again = resource.request('b.hdr');
        loads[1].resolve();
        await Promise.all([newest, again]);

        expect(loads).toHaveLength(2);
        expect(resource.value?.url).toBe('b.hdr');
    });

    it('reports every change of the value', async () => {
        const { cache, loads } = deferredCache();
        const onChange = vi.fn();
        const resource = new DIVEResource<Thing>(cache, onChange);

        const done = resource.request('a.hdr');
        loads[0].resolve();
        await done;
        resource.clear();
        resource.clear();

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(resource.version).toBe(2);
    });

    it('clears its copy and gives it back', async () => {
        const { cache, loads } = deferredCache();
        const resource = await loaded(cache, loads);
        const copy = resource.value!;

        resource.clear();

        expect(resource.value).toBeNull();
        expect(resource.url).toBeNull();
        expect(copy.disposed).toBe(true);
        expect(copy.original!.disposed).toBe(true);
    });

    it('drops a load on its way when cleared', async () => {
        const { cache, loads, freed } = deferredCache();
        const resource = new DIVEResource<Thing>(cache);

        const done = resource.request('a.hdr');
        resource.clear();
        loads[0].resolve();
        await done;

        expect(resource.value).toBeNull();
        expect(freed).toHaveLength(2);
    });

    it('gives back its copy on dispose', async () => {
        const { cache, loads } = deferredCache();
        const resource = await loaded(cache, loads);
        const copy = resource.value!;

        resource.dispose();

        expect(copy.disposed).toBe(true);
    });

    it('gives back a load that arrives after dispose', async () => {
        const { cache, loads, freed } = deferredCache();
        const resource = new DIVEResource<Thing>(cache);

        const done = resource.request('a.hdr');
        resource.dispose();
        loads[0].resolve();
        await done;

        expect(freed).toHaveLength(2);
        expect(resource.value).toBeNull();
    });
});
