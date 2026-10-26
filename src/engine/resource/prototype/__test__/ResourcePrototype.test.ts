import {
    DIVEResourcePrototype,
    type DIVEResourceKind,
} from '../ResourcePrototype.ts';

/** a stand-in value, telling where it was loaded from and what it copies */
class Thing {
    public disposed = false;
    constructor(
        public url = '',
        public original: Thing | null = null,
    ) {}
}

/** a kind whose loads resolve when the test says so, lending copies unless told to share */
function deferredKind({ share = false } = {}) {
    const loads: {
        resolve: () => void;
        reject: (error: Error) => void;
    }[] = [];

    const kind: DIVEResourceKind<Thing> = {
        load: vi.fn(
            (url: string) =>
                new Promise<Thing>((resolve, reject) => {
                    loads.push({
                        resolve: () => resolve(new Thing(url)),
                        reject,
                    });
                }),
        ),
        freeValue: vi.fn((value: Thing) => {
            value.disposed = true;
        }),
        copy: share
            ? undefined
            : {
                  make: (value: Thing) => new Thing(value.url, value),
                  free: vi.fn((copy: Thing) => {
                      copy.disposed = true;
                  }),
              },
    };
    return { kind, loads };
}

/** a prototype whose load resolves when the test says so */
class DeferredPrototype extends DIVEResourcePrototype<Thing> {
    public loads: ReturnType<typeof deferredKind>['loads'];
    public kind: DIVEResourceKind<Thing>;

    constructor(url: string, onIdle?: () => void, deferred = deferredKind()) {
        super(url, deferred.kind, onIdle);
        this.loads = deferred.loads;
        this.kind = deferred.kind;
    }
}

/** how often anything was freed, copies and the loaded data alike */
const frees = (prototype: DeferredPrototype): number =>
    vi.mocked(prototype.kind.freeValue).mock.calls.length +
    (prototype.kind.copy
        ? vi.mocked(prototype.kind.copy.free).mock.calls.length
        : 0);

/** a prototype with two leases drawn and loaded */
async function drawnTwice(onIdle?: () => void) {
    const prototype = new DeferredPrototype('a.hdr', onIdle);
    const first = prototype.draw();
    const second = prototype.draw();
    prototype.loads[0].resolve();
    const [a, b] = await Promise.all([first, second]);
    return { prototype, a, b };
}

describe('DIVEResourcePrototype', () => {
    it('loads once and lends every draw a copy of its own', async () => {
        const { prototype, a, b } = await drawnTwice();

        expect(prototype.loads).toHaveLength(1);
        expect(a).not.toBe(b);
        expect(a.value).not.toBe(b.value);
        expect(a.value.original).toBe(b.value.original);
        expect(a.value.url).toBe('a.hdr');
        expect(prototype.count).toBe(2);
    });

    it('frees only the copy whose lease is released while another is held', async () => {
        const { prototype, a, b } = await drawnTwice();

        a.release();

        expect(a.value.disposed).toBe(true);
        expect(b.value.disposed).toBe(false);
        expect(a.value.original!.disposed).toBe(false);
        expect(prototype.freed).toBe(false);
        expect(prototype.count).toBe(1);
    });

    it('says when the last lease is released and keeps the loaded data', async () => {
        const onIdle = vi.fn();
        const { prototype, a, b } = await drawnTwice(onIdle);

        a.release();
        expect(onIdle).not.toHaveBeenCalled();
        b.release();

        expect(b.value.disposed).toBe(true);
        expect(a.value.original!.disposed).toBe(false);
        expect(prototype.freed).toBe(false);
        expect(prototype.count).toBe(0);
        expect(onIdle).toHaveBeenCalledOnce();
    });

    it('lends the kept data again after its last lease without loading', async () => {
        const onIdle = vi.fn();
        const { prototype, a, b } = await drawnTwice(onIdle);
        a.release();
        b.release();

        const again = await prototype.draw();
        again.release();

        expect(again.value.original).toBe(a.value.original);
        expect(prototype.loads).toHaveLength(1);
        expect(onIdle).toHaveBeenCalledTimes(2);
    });

    it('frees the loaded data on free', async () => {
        const { prototype, a, b } = await drawnTwice();
        a.release();
        b.release();

        prototype.free();
        prototype.free();

        expect(a.value.original!.disposed).toBe(true);
        expect(prototype.kind.freeValue).toHaveBeenCalledOnce();
        expect(prototype.freed).toBe(true);
    });

    it('refuses to free while a lease is held', async () => {
        const { prototype, a } = await drawnTwice();
        a.release();

        expect(() => prototype.free()).toThrow('in use');
        expect(a.value.original!.disposed).toBe(false);
        expect(prototype.freed).toBe(false);
    });

    it('releases a lease once however often it is released', async () => {
        const { prototype, a } = await drawnTwice();

        a.release();
        a.release();
        a[Symbol.dispose]();

        expect(frees(prototype)).toBe(1);
        expect(prototype.count).toBe(1);
        expect(prototype.freed).toBe(false);
    });

    it('frees nothing again when a lease is released after the prototype was freed', async () => {
        const onIdle = vi.fn();
        const { prototype, a, b } = await drawnTwice(onIdle);
        a.release();
        b.release();
        prototype.free();
        const freed = frees(prototype);

        b.release();
        a.release();

        expect(frees(prototype)).toBe(freed);
        expect(prototype.count).toBe(0);
        expect(onIdle).toHaveBeenCalledOnce();
    });

    it('releases a lease at the end of a using block', async () => {
        const onIdle = vi.fn();
        const prototype = new DeferredPrototype('a.hdr', onIdle);
        const drawing = prototype.draw();
        prototype.loads[0].resolve();

        {
            using lease = await drawing;
            expect(lease.value.disposed).toBe(false);
        }

        expect(onIdle).toHaveBeenCalledOnce();
    });

    it('frees a released copy at once and lends a fresh one next', async () => {
        const { prototype, a, b } = await drawnTwice();

        a.release();
        const next = await prototype.draw();

        expect(a.value.disposed).toBe(true);
        expect(b.value.disposed).toBe(false);
        expect(next.value).not.toBe(a.value);
        expect(next.value.disposed).toBe(false);
        expect(prototype.loads).toHaveLength(1);
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

        expect((await retry).value.url).toBe('a.hdr');
    });

    it('rejects a load that throws at once', async () => {
        const prototype = new DeferredPrototype('a.hdr');
        vi.mocked(prototype.kind.load).mockImplementation(() => {
            throw new Error('bad url');
        });

        await expect(prototype.draw()).rejects.toThrow('bad url');
        expect(prototype.count).toBe(0);
    });

    describe('sharing the loaded data', () => {
        /** a prototype lending the loaded data itself, with two leases drawn */
        async function sharedTwice() {
            const prototype = new DeferredPrototype(
                'a.hdr',
                undefined,
                deferredKind({ share: true }),
            );
            const first = prototype.draw();
            const second = prototype.draw();
            prototype.loads[0].resolve();
            const [a, b] = await Promise.all([first, second]);
            return { prototype, a, b };
        }

        it('lends every draw the loaded data itself on a lease of its own', async () => {
            const { prototype, a, b } = await sharedTwice();

            expect(a).not.toBe(b);
            expect(a.value).toBe(b.value);
            expect(a.value.original).toBeNull();
            expect(prototype.loads).toHaveLength(1);
        });

        it('frees the loaded data only on free, not with a lease', async () => {
            const { prototype, a, b } = await sharedTwice();

            a.release();
            b.release();
            b.release();
            expect(b.value.disposed).toBe(false);
            expect(prototype.kind.freeValue).not.toHaveBeenCalled();

            prototype.free();
            expect(prototype.kind.freeValue).toHaveBeenCalledOnce();
            expect(b.value.disposed).toBe(true);
        });

        it('lends the same data again to a draw while another lease holds it', async () => {
            const { prototype, a, b } = await sharedTwice();

            a.release();
            const again = await prototype.draw();

            expect(again.value).toBe(b.value);
            expect(again.value.disposed).toBe(false);
        });
    });

    it('draws nothing once freed', async () => {
        const prototype = new DeferredPrototype('a.hdr');
        const drawing = prototype.draw();
        prototype.loads[0].resolve();
        (await drawing).release();
        prototype.free();

        await expect(prototype.draw()).rejects.toThrow('freed');
    });
});
