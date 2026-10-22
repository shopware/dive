import { DIVEResourcePrototype } from '../ResourcePrototype.ts';

/** a stand-in value, telling where it was loaded from and what it copies */
class Thing {
    public disposed = false;
    constructor(
        public url = '',
        public original: Thing | null = null,
    ) {}
}

/** a prototype whose load resolves when the test says so */
class DeferredPrototype extends DIVEResourcePrototype<Thing> {
    public loads: {
        resolve: () => void;
        reject: (error: Error) => void;
    }[] = [];

    protected load(url: string): Promise<Thing> {
        return new Promise<Thing>((resolve, reject) => {
            this.loads.push({ resolve: () => resolve(new Thing(url)), reject });
        });
    }

    protected copy(value: Thing): Thing {
        return new Thing(value.url, value);
    }

    protected free(value: Thing): void {
        value.disposed = true;
    }
}

describe('DIVEResourcePrototype', () => {
    it('loads once and draws a copy of its own for every resource', async () => {
        const prototype = new DeferredPrototype('a.hdr');

        const first = prototype.draw();
        const second = prototype.draw();
        prototype.loads[0].resolve();
        const [a, b] = await Promise.all([first, second]);

        expect(prototype.loads).toHaveLength(1);
        expect(a).not.toBe(b);
        expect(a.original).toBe(b.original);
        expect(a.url).toBe('a.hdr');
        expect(prototype.count).toBe(2);
    });

    it('frees nothing while a copy is still drawn', async () => {
        const prototype = new DeferredPrototype('a.hdr');
        const first = prototype.draw();
        const second = prototype.draw();
        prototype.loads[0].resolve();
        const [a, b] = await Promise.all([first, second]);

        prototype.release(a);

        expect(a.disposed).toBe(false);
        expect(b.disposed).toBe(false);
        expect(a.original!.disposed).toBe(false);
        expect(prototype.freed).toBe(false);
    });

    it('frees every copy and the loaded data with the last release', async () => {
        const prototype = new DeferredPrototype('a.hdr');
        const first = prototype.draw();
        const second = prototype.draw();
        prototype.loads[0].resolve();
        const [a, b] = await Promise.all([first, second]);

        prototype.release(a);
        prototype.release(b);

        expect(a.disposed).toBe(true);
        expect(b.disposed).toBe(true);
        expect(a.original!.disposed).toBe(true);
        expect(prototype.freed).toBe(true);
        expect(prototype.count).toBe(0);
    });

    it('hands a released copy to the next draw instead of making another', async () => {
        const prototype = new DeferredPrototype('a.hdr');
        const holder = prototype.draw();
        const first = prototype.draw();
        prototype.loads[0].resolve();
        await holder;
        const released = await first;

        prototype.release(released);
        const next = await prototype.draw();

        expect(next).toBe(released);
        expect(next.disposed).toBe(false);
    });

    it('ignores a release of something it did not draw', async () => {
        const prototype = new DeferredPrototype('a.hdr');
        const drawing = prototype.draw();
        prototype.loads[0].resolve();
        const copy = await drawing;

        prototype.release(new Thing('a.hdr'));
        prototype.release(copy);
        prototype.release(copy);

        expect(prototype.count).toBe(0);
    });

    it('rejects every draw of a failed load and loads again on the next', async () => {
        const prototype = new DeferredPrototype('a.hdr');
        const first = prototype.draw();
        const second = prototype.draw();

        prototype.loads[0].reject(new Error('404'));
        await expect(first).rejects.toThrow('404');
        await expect(second).rejects.toThrow('404');
        expect(prototype.count).toBe(0);

        const retry = prototype.draw();
        prototype.loads[1].resolve();

        expect((await retry).url).toBe('a.hdr');
    });

    it('rejects a load that throws at once', async () => {
        class Throwing extends DeferredPrototype {
            protected load(): Promise<Thing> {
                throw new Error('bad url');
            }
        }
        const prototype = new Throwing('a.hdr');

        await expect(prototype.draw()).rejects.toThrow('bad url');
        expect(prototype.count).toBe(0);
    });

    it('draws nothing once freed', async () => {
        const prototype = new DeferredPrototype('a.hdr');
        const drawing = prototype.draw();
        prototype.loads[0].resolve();
        prototype.release(await drawing);

        await expect(prototype.draw()).rejects.toThrow('freed');
    });
});
