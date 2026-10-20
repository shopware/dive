import { Color, EquirectangularReflectionMapping, Texture } from 'three/webgpu';
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

/** a scene without an image based light, so only background loads count */
const createScene = (
    settings?: ConstructorParameters<typeof DIVEScene>[0],
): DIVEScene => new DIVEScene({ imageBasedLight: null, ...settings });

describe('DIVEScene background', () => {
    beforeEach(() => {
        loaders.hdr.mockClear();
        loaders.exr.mockClear();
        loaders.texture.mockClear();
    });

    it('shows an image from a URL as an equirectangular background', async () => {
        const scene = createScene();

        await scene.setBackground({ image: 'panorama.jpg', rotation: 1 });

        const background = scene.background as Texture;
        expect(background).toBeInstanceOf(Texture);
        expect(background.name).toBe('panorama.jpg');
        expect(background.userData.loader).toBe('texture');
        expect(background.mapping).toBe(EquirectangularReflectionMapping);
        expect(scene.backgroundRotation.y).toBe(1);
        expect(scene.getBackground()).toEqual({
            type: 'image',
            image: 'panorama.jpg',
            rotation: 1,
            texture: background,
        });
    });

    it('shows a colour', async () => {
        const scene = createScene();

        await scene.setBackground('#ff0000');

        expect((scene.background as Color).getHex()).toBe(0xff0000);
        expect(scene.getBackground()).toEqual({
            type: 'color',
            color: new Color(0xff0000),
        });
    });

    it.each([null, 'transparent'] as const)(
        'is transparent with %s',
        async (value) => {
            const scene = createScene({ background: '#ff0000' });

            await scene.setBackground(value);

            expect(scene.background).toBeNull();
            expect(scene.getBackground()).toBeNull();
        },
    );

    it('rotates an image without loading it again', async () => {
        const scene = createScene();
        await scene.setBackground({ image: 'panorama.jpg' });
        const texture = scene.background as Texture;
        expect(scene.backgroundRotation.y).toBe(0);

        await scene.setBackground({ image: 'panorama.jpg', rotation: 2 });

        expect(scene.background).toBe(texture);
        expect(scene.backgroundRotation.y).toBe(2);
        expect(scene.getBackground()).toMatchObject({ rotation: 2 });
        expect(texture.dispose).not.toHaveBeenCalled();
        expect(loaders.texture).toHaveBeenCalledTimes(1);
    });

    it('applies the newest rotation to an image still on its way', async () => {
        const scene = createScene();
        const slow = deferred<Texture>();
        loaders.texture.mockImplementationOnce(() => slow.promise);

        const first = scene.setBackground({ image: 'panorama.jpg' });
        const second = scene.setBackground({
            image: 'panorama.jpg',
            rotation: 2,
        });
        slow.resolve(new Texture());
        await Promise.all([first, second]);

        expect(scene.backgroundRotation.y).toBe(2);
        expect(loaders.texture).toHaveBeenCalledTimes(1);
    });

    it('keeps the previous background until a new image has loaded', async () => {
        const scene = createScene({ background: '#ff0000' });
        const slow = deferred<Texture>();
        loaders.texture.mockImplementationOnce(() => slow.promise);

        const pending = scene.setBackground({ image: 'panorama.jpg' });

        expect((scene.background as Color).getHex()).toBe(0xff0000);

        slow.resolve(new Texture());
        await pending;

        expect(scene.getBackground()?.type).toBe('image');
    });

    it('lets the last of overlapping images win and disposes the stale one', async () => {
        const scene = createScene();
        const slow = deferred<Texture>();
        loaders.texture.mockImplementationOnce(() => slow.promise);

        const first = scene.setBackground({ image: 'slow.jpg' });
        const second = scene.setBackground({ image: 'fast.jpg' });
        await second;
        const stale = new Texture();
        vi.spyOn(stale, 'dispose');
        slow.resolve(stale);
        await first;

        expect((scene.background as Texture).name).toBe('fast.jpg');
        expect(stale.dispose).toHaveBeenCalled();
    });

    it('lets a later colour win over an image still on its way', async () => {
        const scene = createScene();
        const slow = deferred<Texture>();
        loaders.texture.mockImplementationOnce(() => slow.promise);

        const pending = scene.setBackground({ image: 'panorama.jpg' });
        await scene.setBackground('#00ff00');
        const stale = new Texture();
        vi.spyOn(stale, 'dispose');
        slow.resolve(stale);
        await pending;

        expect((scene.background as Color).getHex()).toBe(0x00ff00);
        expect(stale.dispose).toHaveBeenCalled();
    });

    it('lets a later rotation of the shown image win over a pending one', async () => {
        const scene = createScene();
        await scene.setBackground({ image: 'a.jpg' });
        const shown = scene.background;
        const slow = deferred<Texture>();
        loaders.texture.mockImplementationOnce(() => slow.promise);

        const pending = scene.setBackground({ image: 'b.jpg' });
        await scene.setBackground({ image: 'a.jpg', rotation: 1 });
        slow.resolve(new Texture());
        await pending;

        expect(scene.background).toBe(shown);
        expect(scene.backgroundRotation.y).toBe(1);
    });

    it('disposes a loaded image on replace and on scene dispose', async () => {
        const scene = createScene();
        await scene.setBackground({ image: 'a.jpg' });
        const replaced = scene.background as Texture;

        await scene.setBackground({ image: 'b.jpg' });
        const current = scene.background as Texture;

        expect(replaced.dispose).toHaveBeenCalled();
        expect(current.dispose).not.toHaveBeenCalled();

        scene.dispose();

        expect(current.dispose).toHaveBeenCalled();
    });

    it('disposes a loaded image when a colour replaces it', async () => {
        const scene = createScene();
        await scene.setBackground({ image: 'a.jpg' });
        const replaced = scene.background as Texture;

        await scene.setBackground(null);

        expect(replaced.dispose).toHaveBeenCalled();
    });

    it('borrows a texture passed in and never disposes it', async () => {
        const borrowed = new Texture();
        vi.spyOn(borrowed, 'dispose');
        const scene = createScene();

        await scene.setBackground({ image: borrowed, rotation: 1 });

        expect(scene.background).toBe(borrowed);
        expect(scene.getBackground()).toMatchObject({
            image: borrowed,
            texture: borrowed,
        });
        expect(loaders.texture).not.toHaveBeenCalled();

        await scene.setBackground('#ffffff');
        await scene.setBackground({ image: borrowed });
        scene.dispose();

        expect(borrowed.dispose).not.toHaveBeenCalled();
    });

    it('disposes an image that arrives after the scene was disposed', async () => {
        const scene = createScene();
        const slow = deferred<Texture>();
        loaders.texture.mockImplementationOnce(() => slow.promise);
        const pending = scene.setBackground({ image: 'a.jpg' });

        scene.dispose();
        const late = new Texture();
        vi.spyOn(late, 'dispose');
        slow.resolve(late);
        await pending;

        expect(late.dispose).toHaveBeenCalled();
    });

    it('disposes an image requested after the scene was disposed', async () => {
        const scene = createScene();
        scene.dispose();

        await scene.setBackground({ image: 'a.jpg' });

        expect(scene.background).toBeNull();
        const [result] = loaders.texture.mock.results;
        expect((await result.value).dispose).toHaveBeenCalled();
    });

    it('loads the image with the loader its extension calls for', async () => {
        const scene = createScene();

        await scene.setBackground({ image: 'a.exr' });

        expect((scene.background as Texture).userData.loader).toBe('exr');
    });

    describe('settings', () => {
        it('is transparent by default', () => {
            const scene = createScene();

            expect(scene.background).toBeNull();
            expect(scene.getBackground()).toBeNull();
        });

        it('takes an image from the settings', async () => {
            const borrowed = new Texture();
            const scene = createScene({
                background: { image: borrowed, rotation: 1 },
            });
            await scene.setBackground({ image: borrowed, rotation: 1 });

            expect(scene.background).toBe(borrowed);
            expect(scene.backgroundRotation.y).toBe(1);
        });

        it('still takes the deprecated backgroundColor', () => {
            const scene = createScene({ backgroundColor: '#0000ff' });

            expect((scene.background as Color).getHex()).toBe(0x0000ff);
        });

        it.each([
            ['a colour', '#00ff00', 0x00ff00],
            ['null', null, null],
        ] as const)(
            'prefers background over backgroundColor with %s',
            (_, background, expected) => {
                const scene = createScene({
                    background,
                    backgroundColor: '#0000ff',
                });

                expect(
                    (scene.background as Color | null)?.getHex() ?? null,
                ).toBe(expected);
            },
        );
    });
});

function deferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((resolver) => {
        resolve = resolver;
    });

    return { promise, resolve };
}
