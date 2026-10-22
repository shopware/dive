import {
    EquirectangularReflectionMapping,
    NoColorSpace,
    SRGBColorSpace,
    type Texture,
} from 'three/webgpu';
import { TextureResourcePrototype } from '../TextureResourcePrototype.ts';

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

/** listens for the dispose event the renderer frees GPU data on */
function watchDispose(texture: Texture) {
    const disposed = vi.fn();
    texture.addEventListener('dispose', disposed);
    return disposed;
}

async function load(url: string) {
    const prototype = new TextureResourcePrototype(url);
    const copy = await prototype.draw();
    prototype.release(copy);
    return copy;
}

afterEach(() => {
    Object.values(loaders).forEach((loader) => loader.mockClear());
});

describe('TextureResourcePrototype', () => {
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

    it('tags only non-linear images as sRGB', async () => {
        expect((await load('studio.jpg')).colorSpace).toBe(SRGBColorSpace);
        expect((await load('studio.hdr')).colorSpace).toBe(NoColorSpace);
        expect((await load('studio.exr')).colorSpace).toBe(NoColorSpace);
    });

    it('maps every image as equirectangular', async () => {
        for (const url of ['a.hdr', 'a.exr', 'a.jpg']) {
            expect((await load(url)).mapping).toBe(
                EquirectangularReflectionMapping,
            );
        }
    });

    it('draws clones that share the pixel data', async () => {
        const prototype = new TextureResourcePrototype('studio.hdr');

        const [a, b] = await Promise.all([prototype.draw(), prototype.draw()]);

        expect(loaders.hdr).toHaveBeenCalledOnce();
        expect(a).not.toBe(b);
        expect(a.source).toBe(b.source);
    });

    it('disposes no texture sharing the pixel data while a clone is drawn', async () => {
        const prototype = new TextureResourcePrototype('studio.hdr');
        const [a, b] = await Promise.all([prototype.draw(), prototype.draw()]);
        const disposedA = watchDispose(a);
        const disposedB = watchDispose(b);

        prototype.release(a);

        expect(disposedA).not.toHaveBeenCalled();
        expect(disposedB).not.toHaveBeenCalled();

        prototype.release(b);

        expect(disposedA).toHaveBeenCalledOnce();
        expect(disposedB).toHaveBeenCalledOnce();
    });
});
