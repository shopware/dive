import {
    EquirectangularReflectionMapping,
    NoColorSpace,
    SRGBColorSpace,
    type Texture,
} from 'three/webgpu';
import {
    TextureResource,
    textureResourceCache,
    textureResourceKind,
} from '../TextureResource.ts';
import { DIVEResourceCache } from '../../cache/ResourceCache.ts';

/** one mock per loader, so a wrong loader choice cannot pass */
const loaders = vi.hoisted(() => {
    const loader = (kind: string) =>
        vi.fn(async (url: string) => {
            const texture = new (await import('three/webgpu')).Texture();
            texture.name = url;
            texture.userData.loader = kind;
            return texture;
        });

    return {
        hdr: loader('hdr'),
        exr: loader('exr'),
        texture: loader('texture'),
    };
});

vi.mock('three/examples/jsm/loaders/HDRLoader.js', () => ({
    HDRLoader: vi.fn(function (this: any) {
        this.loadAsync = loaders.hdr;
    }),
}));

vi.mock('three/examples/jsm/loaders/EXRLoader.js', () => ({
    EXRLoader: vi.fn(function (this: any) {
        this.loadAsync = loaders.exr;
    }),
}));

vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three/webgpu')>();

    return {
        ...actual,
        TextureLoader: vi.fn(function (this: any) {
            this.loadAsync = loaders.texture;
        }),
    };
});

/** a cache of each test's own, so no load is shared across tests */
let cache: DIVEResourceCache<Texture>;

beforeEach(() => {
    cache = new DIVEResourceCache(textureResourceKind);
});

/** a resource on the test's cache */
const track = (): TextureResource => new TextureResource(cache);

/** listens for the dispose event the renderer frees GPU data on */
function watchDispose(texture: Texture) {
    const disposed = vi.fn();
    texture.addEventListener('dispose', disposed);
    return disposed;
}

afterEach(() => {
    Object.values(loaders).forEach((loader) => loader.mockClear());
});

describe('TextureResource', () => {
    it('loads a url once and gives every resource the same texture', async () => {
        const light = track();
        const background = track();
        const dome = track();

        await Promise.all([
            light.request('studio.hdr'),
            background.request('studio.hdr'),
            dome.request('studio.hdr'),
        ]);

        expect(loaders.hdr).toHaveBeenCalledOnce();
        expect(light.value).toBe(await loaders.hdr.mock.results[0].value);
        expect(background.value).toBe(light.value);
        expect(dome.value).toBe(light.value);
    });

    it('disposes the texture once, after the last resource lets go', async () => {
        const light = track();
        const background = track();
        await Promise.all([
            light.request('studio.hdr'),
            background.request('studio.hdr'),
        ]);
        const disposed = watchDispose(light.value!);

        light.clear();
        expect(disposed).not.toHaveBeenCalled();

        background.clear();
        background.dispose();
        expect(disposed).toHaveBeenCalledOnce();
    });

    it('gives a resource coming back to a url the same texture without loading again', async () => {
        const light = track();
        const background = track();
        await Promise.all([
            light.request('studio.hdr'),
            background.request('studio.hdr'),
        ]);
        const before = light.value!;

        light.clear();
        await light.request('studio.hdr');

        expect(loaders.hdr).toHaveBeenCalledOnce();
        expect(light.value).toBe(before);
    });

    it('loads again once every resource has given a url back', async () => {
        const first = track();
        await first.request('studio.hdr');
        first.dispose();

        const second = track();
        await second.request('studio.hdr');

        expect(loaders.hdr).toHaveBeenCalledTimes(2);
    });

    it('loads again on a retry after a failed load', async () => {
        loaders.hdr.mockRejectedValueOnce(new Error('404'));
        const light = track();

        await expect(light.request('studio.hdr')).rejects.toThrow('404');
        await light.request('studio.hdr');

        expect(loaders.hdr).toHaveBeenCalledTimes(2);
        expect(light.value?.name).toBe('studio.hdr');
    });

    it('keeps resources on separate caches apart', async () => {
        const own = track();
        const other = new TextureResource(
            new DIVEResourceCache(textureResourceKind),
        );

        await Promise.all([
            own.request('studio.hdr'),
            other.request('studio.hdr'),
        ]);

        expect(loaders.hdr).toHaveBeenCalledTimes(2);
        expect(own.value).not.toBe(other.value);
    });

    it('shares the module-level cache when given none', async () => {
        const light = new TextureResource();
        const background = new TextureResource();

        await Promise.all([
            light.request('shared.hdr'),
            background.request('shared.hdr'),
        ]);

        expect(loaders.hdr).toHaveBeenCalledOnce();
        expect(light.value).toBe(background.value);
        light.dispose();
        background.dispose();
    });

    describe('the default cache', () => {
        /** a resource on the default cache, disposed after the test */
        let resource: TextureResource;

        beforeEach(() => {
            resource = new TextureResource();
        });

        afterEach(() => {
            resource.dispose();
            textureResourceCache.trim();
        });

        it('keeps the last two images let go of, without loading them again', async () => {
            await resource.request('a.hdr');
            const a = resource.value!;
            await resource.request('b.hdr');
            await resource.request('c.hdr');
            const disposed = watchDispose(a);

            await resource.request('a.hdr');

            expect(loaders.hdr).toHaveBeenCalledTimes(3);
            expect(resource.value).toBe(a);
            expect(disposed).not.toHaveBeenCalled();
        });

        it('disposes the least recently let go of once a third is let go of', async () => {
            await resource.request('a.hdr');
            const disposed = watchDispose(resource.value!);
            await resource.request('b.hdr');
            await resource.request('c.hdr');
            expect(disposed).not.toHaveBeenCalled();

            await resource.request('d.hdr');

            expect(disposed).toHaveBeenCalledOnce();
        });
    });

    describe('loading', () => {
        /** the texture a fresh resource gets for a url */
        async function load(url: string): Promise<Texture> {
            const resource = track();
            await resource.request(url);
            return resource.value!;
        }

        it.each([
            ['studio.hdr', 'hdr'],
            ['studio.HDR', 'hdr'],
            ['studio.exr', 'exr'],
            ['studio.jpg', 'texture'],
            ['studio.png', 'texture'],
            ['studio', 'texture'],
        ])('loads %s with the %s loader', async (url, loader) => {
            const texture = await load(url);

            expect(texture.userData.loader).toBe(loader);
            expect(texture.name).toBe(url);
        });

        it('reads the extension without query or hash', async () => {
            expect((await load('studio.hdr?v=2')).userData.loader).toBe('hdr');
            expect((await load('studio.exr#top')).userData.loader).toBe('exr');
            expect((await load('studio.jpg?x=a.hdr')).userData.loader).toBe(
                'texture',
            );
        });

        it('picks the loader of a data url by its content', async () => {
            const base64 = (bytes: string): string => btoa(bytes);
            const radiance = `data:application/octet-stream;base64,${base64('#?RADIANCE\nFORMAT=32-bit_rle_rgbe')}`;
            const rgbe = `data:application/octet-stream;base64,${base64('#?RGBE\n')}`;
            const exr = `data:application/octet-stream;base64,${base64('\x76\x2f\x31\x01\x02\x00')}`;
            const png = `data:image/png;base64,${base64('\x89PNG\r\n')}`;

            expect((await load(radiance)).userData.loader).toBe('hdr');
            expect((await load(rgbe)).userData.loader).toBe('hdr');
            expect((await load(exr)).userData.loader).toBe('exr');
            expect((await load(png)).userData.loader).toBe('texture');
        });

        it('falls back to the texture loader for a data url it cannot read', async () => {
            const plain = 'data:image/svg+xml,%3Csvg%2F%3E';
            const broken = 'data:application/octet-stream;base64,A===';

            expect((await load(plain)).userData.loader).toBe('texture');
            expect((await load(broken)).userData.loader).toBe('texture');
        });

        it('tags only non-linear images as sRGB', async () => {
            expect((await load('a.jpg')).colorSpace).toBe(SRGBColorSpace);
            expect((await load('a.hdr')).colorSpace).toBe(NoColorSpace);
            expect((await load('a.exr')).colorSpace).toBe(NoColorSpace);
        });

        it('maps every image as equirectangular', async () => {
            for (const url of ['b.hdr', 'b.exr', 'b.jpg']) {
                expect((await load(url)).mapping).toBe(
                    EquirectangularReflectionMapping,
                );
            }
        });
    });
});
