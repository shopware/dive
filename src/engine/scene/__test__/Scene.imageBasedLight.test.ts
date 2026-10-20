import {
    EquirectangularReflectionMapping,
    SRGBColorSpace,
    Texture,
} from 'three/webgpu';
import { DIVEScene } from '../Scene.ts';

const loaders = vi.hoisted(() => {
    /** a texture per load, telling which loader made it from which url */
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

describe('DIVEScene image based light', () => {
    beforeEach(() => {
        loaders.hdr.mockClear();
        loaders.exr.mockClear();
        loaders.texture.mockClear();
    });

    it('is lit by the bundled default HDR without any setting', async () => {
        const scene = new DIVEScene();
        await scene.setImageBasedLight({});

        const light = scene.imageBasedLight!;
        expect(light.image).toMatch(/default\.hdr/);
        expect(light.texture).toBeInstanceOf(Texture);
        expect(light.texture!.name).toBe(light.image);
        expect(light.rotation).toBe(0);
        expect(light.intensity).toBe(1);
        expect(loaders.hdr).toHaveBeenCalledTimes(1);
    });

    it('takes the light from the DIVE settings', async () => {
        const scene = new DIVEScene({
            imageBasedLight: { image: 'studio.hdr', intensity: 2 },
        });
        await scene.setImageBasedLight({});

        expect(scene.imageBasedLight).toMatchObject({
            image: 'studio.hdr',
            rotation: 0,
            intensity: 2,
        });
    });

    it('has no light with null, in the settings or later', async () => {
        const unlit = new DIVEScene({ imageBasedLight: null });
        expect(unlit.imageBasedLight).toBeNull();
        expect(loaders.hdr).not.toHaveBeenCalled();

        const scene = new DIVEScene();
        await scene.setImageBasedLight({});
        const texture = scene.imageBasedLight!.texture!;

        await scene.setImageBasedLight(null);

        expect(scene.imageBasedLight).toBeNull();
        expect(texture.dispose).toHaveBeenCalled();
    });

    it('keeps the fields a call leaves out', async () => {
        const scene = new DIVEScene();
        await scene.setImageBasedLight({ image: 'a.hdr', rotation: 1 });
        const texture = scene.imageBasedLight!.texture;

        await scene.setImageBasedLight({ intensity: 3 });

        expect(scene.imageBasedLight).toMatchObject({
            image: 'a.hdr',
            rotation: 1,
            intensity: 3,
        });
        expect(scene.imageBasedLight!.texture).toBe(texture);
    });

    it('starts from the defaults again after null', async () => {
        const scene = new DIVEScene();
        await scene.setImageBasedLight({ image: 'a.hdr', rotation: 1 });
        await scene.setImageBasedLight(null);

        await scene.setImageBasedLight({ intensity: 3 });

        expect(scene.imageBasedLight!.image).toMatch(/default\.hdr/);
        expect(scene.imageBasedLight!.rotation).toBe(0);
        expect(scene.imageBasedLight!.intensity).toBe(3);
    });

    it('lets the last of overlapping calls win and disposes the stale image', async () => {
        const scene = new DIVEScene();
        await scene.setImageBasedLight({});

        const slow = deferred<Texture>();
        loaders.hdr.mockImplementationOnce(() => slow.promise);
        const first = scene.setImageBasedLight({ image: 'slow.hdr' });
        const second = scene.setImageBasedLight({ image: 'fast.hdr' });

        await second;
        const stale = new Texture();
        vi.spyOn(stale, 'dispose');
        slow.resolve(stale);
        await first;

        expect(scene.imageBasedLight!.image).toBe('fast.hdr');
        expect(scene.imageBasedLight!.texture!.name).toBe('fast.hdr');
        expect(stale.dispose).toHaveBeenCalled();
    });

    it('lets a later null win over a load still on its way', async () => {
        const scene = new DIVEScene({ imageBasedLight: null });

        const pending = scene.setImageBasedLight({ image: 'a.hdr' });
        await scene.setImageBasedLight(null);
        await pending;

        expect(scene.imageBasedLight).toBeNull();
    });

    it('applies rotation and intensity before a pending image arrives', async () => {
        const scene = new DIVEScene();
        await scene.setImageBasedLight({});

        const slow = deferred<Texture>();
        loaders.hdr.mockImplementationOnce(() => slow.promise);
        const pending = scene.setImageBasedLight({ image: 'slow.hdr' });
        const rotated = scene.setImageBasedLight({ rotation: 2 });

        expect(scene.imageBasedLight!.rotation).toBe(2);
        expect(scene.imageBasedLight!.image).toMatch(/default\.hdr/);

        slow.resolve(new Texture());
        await Promise.all([pending, rotated]);

        expect(scene.imageBasedLight).toMatchObject({
            image: 'slow.hdr',
            rotation: 2,
        });
    });

    it('borrows a texture passed in and never disposes it', async () => {
        const borrowed = new Texture();
        vi.spyOn(borrowed, 'dispose');
        const scene = new DIVEScene({ imageBasedLight: { image: borrowed } });
        await scene.setImageBasedLight({});

        expect(scene.imageBasedLight!.texture).toBe(borrowed);

        await scene.setImageBasedLight({ image: 'a.hdr' });
        await scene.setImageBasedLight({ image: borrowed });
        scene.dispose();

        expect(borrowed.dispose).not.toHaveBeenCalled();
    });

    it('disposes a loaded image on replace and on scene dispose', async () => {
        const scene = new DIVEScene();
        await scene.setImageBasedLight({ image: 'a.hdr' });
        const replaced = scene.imageBasedLight!.texture!;

        await scene.setImageBasedLight({ image: 'b.hdr' });
        const current = scene.imageBasedLight!.texture!;

        expect(replaced.dispose).toHaveBeenCalled();
        expect(current.dispose).not.toHaveBeenCalled();

        scene.dispose();

        expect(current.dispose).toHaveBeenCalled();
    });

    it('disposes an image that arrives after the scene was disposed', async () => {
        const scene = new DIVEScene({ imageBasedLight: null });
        const slow = deferred<Texture>();
        loaders.hdr.mockImplementationOnce(() => slow.promise);
        const pending = scene.setImageBasedLight({ image: 'a.hdr' });

        scene.dispose();
        const late = new Texture();
        vi.spyOn(late, 'dispose');
        slow.resolve(late);
        await pending;

        expect(late.dispose).toHaveBeenCalled();
    });

    it.each([
        ['a.hdr', 'hdr'],
        ['a.HDR?v=2', 'hdr'],
        ['a.exr', 'exr'],
        ['a.jpg', 'texture'],
        ['a.png', 'texture'],
        ['a.webp#x', 'texture'],
    ] as const)('loads %s with the %s loader', async (url, loader) => {
        const scene = new DIVEScene({ imageBasedLight: null });
        await scene.setImageBasedLight({ image: url });

        const texture = scene.imageBasedLight!.texture!;
        expect(texture.userData.loader).toBe(loader);
        expect(texture.name).toBe(url);
        expect(texture.mapping).toBe(EquirectangularReflectionMapping);
    });

    it('tags images from the texture loader as sRGB', async () => {
        const scene = new DIVEScene({ imageBasedLight: null });

        await scene.setImageBasedLight({ image: 'a.jpg' });
        expect(scene.imageBasedLight!.texture!.colorSpace).toBe(SRGBColorSpace);

        await scene.setImageBasedLight({ image: 'a.hdr' });
        expect(scene.imageBasedLight!.texture!.colorSpace).not.toBe(
            SRGBColorSpace,
        );
    });

    it('signals an image change, but not a rotation or intensity change', async () => {
        const scene = new DIVEScene();
        await scene.setImageBasedLight({});
        let version = scene.imageBasedLightImageVersion;

        await scene.setImageBasedLight({ rotation: 1, intensity: 2 });
        expect(scene.imageBasedLightImageVersion).toBe(version);

        await scene.setImageBasedLight({ image: 'a.hdr' });
        expect(scene.imageBasedLightImageVersion).not.toBe(version);
        version = scene.imageBasedLightImageVersion;

        await scene.setImageBasedLight(null);
        expect(scene.imageBasedLightImageVersion).not.toBe(version);
    });
});

function deferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((resolver) => {
        resolve = resolver;
    });

    return { promise, resolve };
}
