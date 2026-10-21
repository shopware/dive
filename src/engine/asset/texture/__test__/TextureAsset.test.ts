import {
    EquirectangularReflectionMapping,
    NoColorSpace,
    SRGBColorSpace,
} from 'three/webgpu';
import { TextureAsset } from '../TextureAsset.ts';

/** one mock per loader, so a wrong loader choice cannot pass */
const loaders = vi.hoisted(() => {
    const loader = (kind: string) =>
        vi.fn(async (url: string) => {
            const texture = new (await import('three/webgpu')).Texture();
            texture.name = url;
            texture.userData.loader = kind;
            vi.spyOn(texture, 'dispose');
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

/** every asset a test made, given back after it so the shared cache empties */
const assets: TextureAsset[] = [];

function track(asset = new TextureAsset()) {
    assets.push(asset);
    return asset;
}

async function load(url: string) {
    const asset = track();
    await asset.request(url);
    return asset.value!;
}

afterEach(() => {
    assets.splice(0).forEach((asset) => asset.dispose());
    Object.values(loaders).forEach((loader) => loader.mockClear());
});

describe('TextureAsset', () => {
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

    it('disposes the texture it loaded', async () => {
        const asset = new TextureAsset();
        await asset.request('studio.hdr');
        const texture = asset.value!;

        asset.dispose();

        expect(texture.dispose).toHaveBeenCalledOnce();
    });

    it('shares one texture between assets requesting the same url', async () => {
        const light = track();
        const background = track();

        await Promise.all([
            light.request('studio.hdr'),
            background.request('studio.hdr'),
        ]);
        const texture = light.value!;

        expect(loaders.hdr).toHaveBeenCalledOnce();
        expect(background.value).toBe(texture);

        light.clear();
        expect(texture.dispose).not.toHaveBeenCalled();
        background.clear();
        expect(texture.dispose).toHaveBeenCalledOnce();
    });

    it('reports changes to the callback', async () => {
        const onChange = vi.fn();
        const asset = track(new TextureAsset(onChange));

        await asset.request('studio.hdr');

        expect(onChange).toHaveBeenCalledOnce();
    });
});
