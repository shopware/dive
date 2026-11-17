import { describe, expect, it, vi } from 'vitest';
import {
    EquirectangularReflectionMapping,
    SRGBColorSpace,
    UVMapping,
    type Texture,
} from 'three/webgpu';
import {
    ImageResource,
    imageResourceCache,
    imageResourceKind,
} from '../ImageResource.ts';
import { DIVEResourceCache } from '../../cache/ResourceCache.ts';

const loader = vi.hoisted(() =>
    vi.fn(async (url: string) => {
        const texture = new (await import('three/webgpu')).Texture();
        texture.name = url;
        return texture;
    }),
);

vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three/webgpu')>();

    return {
        ...actual,
        TextureLoader: vi.fn(function (this: any) {
            this.loadAsync = loader;
        }),
    };
});

/** a cache of each test's own, so no load is shared across tests */
let cache: DIVEResourceCache<Texture>;

beforeEach(() => {
    cache = new DIVEResourceCache(imageResourceKind);
});

afterEach(() => {
    loader.mockClear();
});

describe('ImageResource', () => {
    it('loads a url once and gives every resource the same texture', async () => {
        const one = new ImageResource(cache);
        const other = new ImageResource(cache);

        await Promise.all([one.request('bulb.svg'), other.request('bulb.svg')]);

        expect(loader).toHaveBeenCalledTimes(1);
        expect(one.value).not.toBeNull();
        expect(other.value).toBe(one.value);
    });

    it('disposes the texture once the last resource lets go', async () => {
        const one = new ImageResource(cache);
        const other = new ImageResource(cache);
        await Promise.all([one.request('bulb.svg'), other.request('bulb.svg')]);
        const disposed = vi.fn();
        one.value!.addEventListener('dispose', disposed);

        one.dispose();
        expect(disposed).not.toHaveBeenCalled();

        other.dispose();
        expect(disposed).toHaveBeenCalledTimes(1);
    });

    it('shares the module-level cache when given none', async () => {
        const one = new ImageResource();
        const other = new ImageResource();
        await Promise.all([one.request('bulb.svg'), other.request('bulb.svg')]);

        expect(other.value).toBe(one.value);

        one.dispose();
        other.dispose();
        imageResourceCache.trim();
    });

    describe('loading', () => {
        it('loads through the texture loader as an sRGB image', async () => {
            const texture = await imageResourceKind.load('bulb.svg');

            expect(loader).toHaveBeenCalledWith('bulb.svg');
            expect(texture.colorSpace).toBe(SRGBColorSpace);
        });

        it('keeps the plain uv mapping, not an equirectangular one', async () => {
            const texture = await imageResourceKind.load('bulb.svg');

            expect(texture.mapping).toBe(UVMapping);
            expect(texture.mapping).not.toBe(EquirectangularReflectionMapping);
        });
    });
});
