/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Color, PMREMGenerator as PMREMGeneratorOriginal } from 'three/webgpu';
import { DIVEScene } from '../../scene/Scene.ts';
import { DIVERenderer } from '../../renderer/Renderer.ts';
import { DIVEEnvironment } from '../Environment.ts';

const loaders = vi.hoisted(() => {
    const state = { pending: 0 };

    /** a texture per load, named after its url */
    const loader = () =>
        vi.fn(async (url: string) => {
            state.pending++;
            try {
                const texture = new (await import('three/webgpu')).Texture();
                texture.name = url;
                vi.spyOn(texture, 'dispose');
                return texture;
            } finally {
                state.pending--;
            }
        });

    return { state, hdr: loader(), exr: loader(), texture: loader() };
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
        WebGPURenderer: vi.fn(function (this: any, settings: any = {}) {
            this.domElement = settings.canvas ?? {};
            this.initialized = false;
            this.init = vi.fn(async () => {
                this.initialized = true;
            });
            this.render = vi.fn();
            this.setSize = vi.fn();
            this.setPixelRatio = vi.fn();
            this.dispose = vi.fn();
            this.backend = { extensions: { extensions: {} } };
            this.shadowMap = { enabled: false, type: 0 };
            this.toneMapping = actual.NoToneMapping;
            this.outputColorSpace = actual.LinearSRGBColorSpace;
        }),
        PMREMGenerator: vi.fn(function (this: any, renderer: unknown) {
            this.renderer = renderer;
            this.dispose = vi.fn();
            /** a target per bake, telling which renderer made it */
            this.fromCubemap = vi.fn(() => {
                const texture = new actual.Texture();
                texture.userData.renderer = renderer;
                vi.spyOn(texture, 'dispose');
                return { texture, dispose: vi.fn() };
            });
        }),
        CubeRenderTarget: vi.fn(function (this: any) {
            this.texture = new actual.Texture();
            this.dispose = vi.fn();
        }),
        CubeCamera: vi.fn(function (this: any) {
            this.update = vi.fn();
        }),
    };
});

const PMREMGenerator = PMREMGeneratorOriginal as any;

/** what the renderer baked, across every renderer */
const baked = (): unknown[] =>
    PMREMGenerator.mock.instances.flatMap((pmrem: any) =>
        pmrem.fromCubemap.mock.calls.map((call: any[]) => call[0]),
    );

/** a scene, an initialized renderer drawing it, and its environment */
async function setUp(
    settings?: ConstructorParameters<typeof DIVEScene>[0],
): Promise<{
    scene: DIVEScene;
    renderer: DIVERenderer;
    environment: DIVEEnvironment;
}> {
    const scene = new DIVEScene(settings);
    const renderer = new DIVERenderer(scene, { camera: {} } as never);
    await renderer.initAsync();
    await scene.setImageBasedLight({});
    return { scene, renderer, environment: renderer.environment };
}

/** lets every pending load, and what waits for it, settle */
async function settle(): Promise<void> {
    await vi.waitFor(() => expect(loaders.state.pending).toBe(0));
    await new Promise((resolve) => setTimeout(resolve));
}

describe('DIVEEnvironment', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('is reachable as the renderer environment', async () => {
        const { environment } = await setUp();

        expect(environment).toBeInstanceOf(DIVEEnvironment);
    });

    it('lights the scene with the image from a URL', async () => {
        const { scene, renderer, environment } = await setUp();
        renderer.tick();

        await environment.setImageUrl('studio.hdr');
        renderer.tick();

        expect(scene.imageBasedLight!.image).toBe('studio.hdr');
        expect(scene.environment).not.toBeNull();
        expect(baked()).toHaveLength(2);
    });

    it('goes back to the default HDR for a null URL', async () => {
        const { scene, environment } = await setUp();
        await environment.setImageUrl('studio.hdr');

        await environment.setImageUrl(null);

        expect(scene.imageBasedLight!.image).toMatch(/default\.hdr/);
    });

    it('resolves init once the image asked for has loaded', async () => {
        const { scene, environment } = await setUp();

        environment.setImageUrl('studio.hdr');
        await environment.initAsync();

        expect(scene.imageBasedLight!.image).toBe('studio.hdr');
    });

    it('rotates the light without a rebake', async () => {
        const { scene, renderer, environment } = await setUp();
        renderer.tick();

        environment.setRotationY(1);
        await settle();
        renderer.tick();

        expect(scene.environmentRotation.y).toBe(1);
        expect(baked()).toHaveLength(1);
    });

    it('leaves a colour background alone when rotating', async () => {
        const { scene, environment } = await setUp({
            backgroundColor: '#ff0000',
        });

        environment.setRotationY(1);
        await settle();

        expect(scene.background).toEqual(new Color('#ff0000'));
        expect(scene.backgroundRotation.y).toBe(0);
    });

    it('shows the light image as the background, loaded once', async () => {
        const { scene, environment } = await setUp();
        environment.setRotationY(0.5);

        environment.setUseAsBackground(true);
        await settle();

        expect(scene.background).toBe(scene.imageBasedLight!.texture);
        expect(scene.backgroundRotation.y).toBe(0.5);
        expect(loaders.hdr).toHaveBeenCalledTimes(1);
    });

    it('rotates an image background along with the light', async () => {
        const { scene, environment } = await setUp();
        environment.setUseAsBackground(true);
        await settle();

        environment.setRotationY(2);
        await settle();

        expect(scene.imageBasedLight!.rotation).toBe(2);
        expect(scene.backgroundRotation.y).toBe(2);
    });

    it('follows a new image while used as background', async () => {
        const { scene, environment } = await setUp();
        environment.setUseAsBackground(true);
        await settle();

        await environment.setImageUrl('studio.hdr');

        expect(scene.background).toBe(scene.imageBasedLight!.texture);
        expect((scene.background as any).name).toBe('studio.hdr');
    });

    it('goes back to the colour from before when turned off', async () => {
        const { scene, environment } = await setUp({
            backgroundColor: '#336699',
        });
        environment.setUseAsBackground(true);
        await settle();

        environment.setUseAsBackground(false);
        await settle();

        expect(scene.getBackground()).toEqual({
            type: 'color',
            color: new Color('#336699'),
        });
        expect(scene.backgroundRotation.y).toBe(0);
    });

    it('goes back to transparent when that was the background before', async () => {
        const { scene, environment } = await setUp();
        environment.setUseAsBackground(true);
        await settle();

        environment.setUseAsBackground(false);
        await settle();

        expect(scene.background).toBeNull();
    });

    it('shows the image once it has loaded when turned on early', async () => {
        const scene = new DIVEScene();
        const environment = new DIVERenderer(scene, { camera: {} } as never)
            .environment;

        environment.setUseAsBackground(true);
        await settle();

        expect(scene.imageBasedLight!.texture).not.toBeNull();
        expect(scene.background).toBe(scene.imageBasedLight!.texture);
    });

    it('applies the options it is given and leaves the rest to the scene', async () => {
        const scene = new DIVEScene({ imageBasedLight: { intensity: 2 } });

        new DIVEEnvironment({} as never, scene, {
            imageUrl: 'studio.hdr',
            rotateY: 1,
            useAsBackground: true,
        });
        await settle();

        expect(scene.imageBasedLight).toMatchObject({
            image: 'studio.hdr',
            rotation: 1,
            intensity: 2,
        });
        expect(scene.background).toBe(scene.imageBasedLight!.texture);
    });

    it('turns the light off when disabled', async () => {
        const scene = new DIVEScene();

        new DIVEEnvironment({} as never, scene, { enabled: false });
        await settle();

        expect(scene.imageBasedLight).toBeNull();
    });

    it('changes nothing after dispose', async () => {
        const scene = new DIVEScene();
        const environment = new DIVEEnvironment({} as never, scene);

        environment.setUseAsBackground(true);
        environment.dispose();
        await settle();

        expect(scene.background).toBeNull();
    });
});
