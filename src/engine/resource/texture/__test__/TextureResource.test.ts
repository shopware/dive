import { type Texture } from 'three/webgpu';
import { TextureResource } from '../TextureResource.ts';

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

/** every resource a test made, given back after it so the shared cache empties */
const resources: TextureResource[] = [];

function track(resource = new TextureResource()) {
    resources.push(resource);
    return resource;
}

/** listens for the dispose event the renderer frees GPU data on */
function watchDispose(texture: Texture) {
    const disposed = vi.fn();
    texture.addEventListener('dispose', disposed);
    return disposed;
}

afterEach(() => {
    resources.splice(0).forEach((resource) => resource.dispose());
    Object.values(loaders).forEach((loader) => loader.mockClear());
});

describe('TextureResource', () => {
    it('loads a url once for every resource and gives each its own texture', async () => {
        const light = track();
        const background = track();
        const dome = track();

        await Promise.all([
            light.request('studio.hdr'),
            background.request('studio.hdr'),
            dome.request('studio.hdr'),
        ]);

        expect(loaders.hdr).toHaveBeenCalledOnce();
        const textures = new Set([light.value, background.value, dome.value]);
        expect(textures.size).toBe(3);
        expect(light.value!.source).toBe(background.value!.source);
        expect(light.value!.source).toBe(dome.value!.source);
    });

    it('frees a texture at once when given back and the loaded one with the last', async () => {
        const light = track();
        const background = track();
        await Promise.all([
            light.request('studio.hdr'),
            background.request('studio.hdr'),
        ]);
        const loaded = await loaders.hdr.mock.results[0].value;
        const disposedLoaded = watchDispose(loaded);
        const disposedLight = watchDispose(light.value!);
        const disposedBackground = watchDispose(background.value!);

        light.clear();
        expect(disposedLight).toHaveBeenCalledOnce();
        expect(disposedBackground).not.toHaveBeenCalled();
        expect(disposedLoaded).not.toHaveBeenCalled();

        background.clear();
        expect(disposedBackground).toHaveBeenCalledOnce();
        expect(disposedLoaded).toHaveBeenCalledOnce();
    });

    it('gives a resource coming back to a url a fresh texture without loading again', async () => {
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
        expect(light.value).not.toBe(before);
        expect(light.value!.source).toBe(background.value!.source);
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
});
