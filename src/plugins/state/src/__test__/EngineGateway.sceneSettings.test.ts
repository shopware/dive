import { Texture } from 'three/webgpu';
import {
    DIVEImageBasedLightDefaultSettings,
    DIVEScene,
    type DIVE,
} from '@shopware-ag/dive';
import { EngineGateway } from '../EngineGateway.ts';

/**
 * A real scene, so what is read back is what the scene recorded. Only the
 * image loaders are replaced: each load hands out a texture named after its
 * url.
 */
const loadAsync = vi.hoisted(() =>
    vi.fn(async (url: string) => {
        const texture = new (await import('three/webgpu')).Texture();
        texture.name = url;
        return texture;
    }),
);

vi.mock('three/examples/jsm/loaders/HDRLoader.js', () => ({
    HDRLoader: vi.fn(function (this: any) {
        this.loadAsync = loadAsync;
    }),
}));

vi.mock('three/examples/jsm/loaders/EXRLoader.js', () => ({
    EXRLoader: vi.fn(function (this: any) {
        this.loadAsync = loadAsync;
    }),
}));

vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three/webgpu')>();

    return {
        ...actual,
        TextureLoader: vi.fn(function (this: any) {
            this.loadAsync = loadAsync;
        }),
    };
});

/** holds back the next load until the returned function is called */
const holdNextLoad = (): (() => void) => {
    let release!: () => void;
    const released = new Promise<void>((resolve) => (release = resolve));
    loadAsync.mockImplementationOnce(async (url: string) => {
        await released;
        const texture = new (await import('three/webgpu')).Texture();
        texture.name = url;
        return texture;
    });
    return release;
};

const makeGateway = (
    settings?: ConstructorParameters<typeof DIVEScene>[0],
): { gateway: EngineGateway; scene: DIVEScene } => {
    const scene = new DIVEScene(settings);
    const gateway = new EngineGateway({ scene } as unknown as DIVE);
    return { gateway, scene };
};

describe('plugins/state/EngineGateway scene settings', () => {
    beforeEach(() => {
        loadAsync.mockClear();
    });

    it('reads every property off the scene', async () => {
        const { gateway, scene } = makeGateway({
            background: '#112233',
            displayFloor: false,
            displayGrid: true,
        });
        scene.name = 'Scene';
        scene.root.floor.setColor('#abcdef');
        await scene.setImageBasedLight({});

        expect(gateway.readSceneSettings()).toEqual({
            name: 'Scene',
            background: '#112233',
            backgroundColor: '#112233',
            imageBasedLight: { image: null, rotation: 0, intensity: 1 },
            gridEnabled: true,
            floorEnabled: false,
            floorColor: '#abcdef',
        });
    });

    it('writes every property, grid included', async () => {
        const { gateway } = makeGateway();

        await gateway.applySceneSettings({
            name: 'New',
            gridEnabled: true,
            floorEnabled: true,
            floorColor: 0x00ff00,
        });

        expect(gateway.readSceneSettings()).toMatchObject({
            name: 'New',
            gridEnabled: true,
            floorEnabled: true,
            floorColor: '#00ff00',
        });
    });

    it('leaves out what the patch does not carry', async () => {
        const { gateway } = makeGateway({
            background: '#112233',
            displayFloor: true,
            displayGrid: true,
        });
        const before = gateway.readSceneSettings();

        await gateway.applySceneSettings({ name: 'Only the name' });

        expect(gateway.readSceneSettings()).toEqual({
            ...before,
            name: 'Only the name',
        });
    });

    describe('background', () => {
        it('round-trips a colour and mirrors it into backgroundColor', async () => {
            const { gateway } = makeGateway();

            await gateway.applySceneSettings({ background: '#ff0000' });

            expect(gateway.readSceneSettings()).toMatchObject({
                background: '#ff0000',
                backgroundColor: '#ff0000',
            });
        });

        it.each([null, 'transparent'])(
            'round-trips %s as transparent',
            async (background) => {
                const { gateway } = makeGateway({ background: '#ff0000' });

                await gateway.applySceneSettings({ background });

                expect(gateway.readSceneSettings()).toMatchObject({
                    background: null,
                    backgroundColor: 'transparent',
                });
            },
        );

        it('round-trips an image URL with its rotation', async () => {
            const { gateway } = makeGateway();

            await gateway.applySceneSettings({
                background: { image: 'panorama.jpg', rotation: 1 },
            });

            expect(gateway.readSceneSettings()).toMatchObject({
                background: { image: 'panorama.jpg', rotation: 1 },
                backgroundColor: 'transparent',
            });
        });

        it('exports an image set from a texture as null', async () => {
            const { gateway } = makeGateway({ background: '#ff0000' });

            await gateway.applySceneSettings({
                background: { image: new Texture() },
            });

            expect(gateway.readSceneSettings()).toMatchObject({
                background: null,
                backgroundColor: 'transparent',
            });
        });

        it('still takes the deprecated backgroundColor', async () => {
            const { gateway } = makeGateway();

            await gateway.applySceneSettings({ backgroundColor: 0x00ff00 });

            expect(gateway.readSceneSettings()).toMatchObject({
                background: '#00ff00',
                backgroundColor: '#00ff00',
            });
        });

        it.each([
            ['a colour', '#0000ff', '#0000ff'],
            ['transparent', null, null],
        ])(
            'prefers background over backgroundColor with %s',
            async (_, background, expected) => {
                const { gateway } = makeGateway();

                await gateway.applySceneSettings({
                    background,
                    backgroundColor: '#ff0000',
                });

                expect(gateway.readSceneSettings().background).toBe(expected);
            },
        );
    });

    describe('while an image is loading', () => {
        it('exports the default light before it has loaded', () => {
            holdNextLoad();
            const { gateway } = makeGateway();

            expect(gateway.readSceneSettings().imageBasedLight).toEqual({
                image: null,
                rotation: 0,
                intensity: 1,
            });
        });

        it('exports the requested light during a swap', async () => {
            const { gateway, scene } = makeGateway({
                imageBasedLight: { image: 'old.hdr' },
            });
            await scene.setImageBasedLight({});
            const release = holdNextLoad();

            const swap = gateway.applySceneSettings({
                imageBasedLight: { image: 'new.hdr', rotation: 2 },
            });

            expect(gateway.readSceneSettings().imageBasedLight).toEqual({
                image: 'new.hdr',
                rotation: 2,
                intensity: 1,
            });
            release();
            await swap;
        });

        it('exports the requested background before it has loaded', async () => {
            const { gateway } = makeGateway({ background: '#ff0000' });
            const release = holdNextLoad();

            const load = gateway.applySceneSettings({
                background: { image: 'panorama.jpg', rotation: 1 },
            });

            expect(gateway.readSceneSettings()).toMatchObject({
                background: { image: 'panorama.jpg', rotation: 1 },
                backgroundColor: 'transparent',
            });
            release();
            await load;
        });
    });

    describe('image based light', () => {
        it('round-trips URL, rotation and intensity', async () => {
            const { gateway } = makeGateway();

            await gateway.applySceneSettings({
                imageBasedLight: {
                    image: 'studio.hdr',
                    rotation: 1,
                    intensity: 2,
                },
            });

            expect(gateway.readSceneSettings().imageBasedLight).toEqual({
                image: 'studio.hdr',
                rotation: 1,
                intensity: 2,
            });
        });

        it('round-trips off as null', async () => {
            const { gateway } = makeGateway();

            await gateway.applySceneSettings({ imageBasedLight: null });

            expect(gateway.readSceneSettings().imageBasedLight).toBeNull();
        });

        it('exports a light set from a texture as null', async () => {
            const { gateway } = makeGateway();

            await gateway.applySceneSettings({
                imageBasedLight: { image: new Texture() },
            });

            expect(gateway.readSceneSettings().imageBasedLight).toBeNull();
        });

        it('exports the bundled default HDR without its URL', async () => {
            const { gateway, scene } = makeGateway();
            // the constructor's default load
            await scene.setImageBasedLight({});

            expect(gateway.readSceneSettings().imageBasedLight).toEqual({
                image: null,
                rotation: 0,
                intensity: 1,
            });
        });

        it('restores the bundled default HDR from a null image', async () => {
            const { gateway, scene } = makeGateway({
                imageBasedLight: { image: 'studio.hdr' },
            });

            await gateway.applySceneSettings({
                imageBasedLight: { image: null, rotation: 0, intensity: 1 },
            });

            expect(scene.imageBasedLight?.image).toBe(
                DIVEImageBasedLightDefaultSettings.image,
            );
        });

        it('keeps the image when a patch only rotates', async () => {
            const { gateway } = makeGateway({
                imageBasedLight: { image: 'studio.hdr' },
            });

            await gateway.applySceneSettings({
                imageBasedLight: { rotation: 2 },
            });

            expect(gateway.readSceneSettings().imageBasedLight).toEqual({
                image: 'studio.hdr',
                rotation: 2,
                intensity: 1,
            });
        });

        it('leaves the light alone when the state does not carry it', async () => {
            const { gateway, scene } = makeGateway({
                imageBasedLight: { image: 'studio.hdr' },
            });
            await scene.setImageBasedLight({});

            await gateway.applySceneSettings({ name: 'Renamed' });

            expect(gateway.readSceneSettings().imageBasedLight).toMatchObject({
                image: 'studio.hdr',
            });
        });
    });
});
