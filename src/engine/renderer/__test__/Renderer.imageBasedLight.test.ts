/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
    PMREMGenerator as PMREMGeneratorOriginal,
    Texture,
} from 'three/webgpu';
import { DIVEScene } from '../../scene/Scene.ts';
import { DIVERenderer } from '../Renderer.ts';

const loaders = vi.hoisted(() => {
    /** a texture per load, named after its url */
    const loader = () =>
        vi.fn(async (url: string) => {
            const texture = new (await import('three/webgpu')).Texture();
            texture.name = url;
            vi.spyOn(texture, 'dispose');
            return texture;
        });

    return { hdr: loader(), exr: loader(), texture: loader() };
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

/** how many bakes happened, across every renderer */
const bakes = (): number =>
    PMREMGenerator.mock.instances.reduce(
        (sum: number, pmrem: any) => sum + pmrem.fromCubemap.mock.calls.length,
        0,
    );

/** a scene and an initialized renderer drawing it */
async function setUp(
    settings?: ConstructorParameters<typeof DIVEScene>[0],
): Promise<{ scene: DIVEScene; renderer: DIVERenderer }> {
    const scene = new DIVEScene(settings);
    const renderer = new DIVERenderer(scene, { camera: {} } as never);
    await renderer.initAsync();
    return { scene, renderer };
}

describe('DIVERenderer image based light', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('bakes the default HDR into the scene environment', async () => {
        const { scene, renderer } = await setUp();
        await scene.setImageBasedLight({});

        renderer.tick();

        expect(loaders.hdr).toHaveBeenCalledTimes(1);
        expect(bakes()).toBe(1);
        expect(scene.environment).toBeInstanceOf(Texture);
        expect(scene.environment).toBe(
            PMREMGenerator.mock.instances[0].fromCubemap.mock.results[0].value
                .texture,
        );
    });

    it('clears the scene environment for null', async () => {
        const { scene, renderer } = await setUp();
        await scene.setImageBasedLight({});
        renderer.tick();
        const baked = scene.environment!;

        await scene.setImageBasedLight(null);
        renderer.tick();

        expect(scene.environment).toBeNull();
        expect(baked.dispose).toHaveBeenCalled();
    });

    it('bakes nothing for a scene without a light', async () => {
        const { scene, renderer } = await setUp({ imageBasedLight: null });

        renderer.tick();

        expect(scene.environment).toBeNull();
        expect(bakes()).toBe(0);
    });

    it('rotates and dims the light without a rebake', async () => {
        const { scene, renderer } = await setUp();
        await scene.setImageBasedLight({});
        renderer.tick();
        const baked = scene.environment;

        await scene.setImageBasedLight({ rotation: 1.5, intensity: 0.25 });
        renderer.tick();

        expect(bakes()).toBe(1);
        expect(scene.environment).toBe(baked);
        expect(scene.environmentRotation.y).toBe(1.5);
        expect(scene.environmentIntensity).toBe(0.25);
    });

    it('rebakes once for a new image and frees the bake before', async () => {
        const { scene, renderer } = await setUp();
        await scene.setImageBasedLight({});
        renderer.tick();
        const before = scene.environment!;

        await scene.setImageBasedLight({ image: 'studio.hdr' });
        renderer.tick();
        renderer.tick();

        expect(bakes()).toBe(2);
        expect(scene.environment).not.toBe(before);
        expect(before.dispose).toHaveBeenCalled();
    });

    it('bakes once for several changes within one frame', async () => {
        const { scene, renderer } = await setUp();
        await scene.setImageBasedLight({});
        renderer.tick();
        const studio = new Texture();

        await scene.setImageBasedLight({ image: 'a.hdr' });
        await scene.setImageBasedLight({ image: studio, rotation: 2 });
        await scene.setImageBasedLight({ intensity: 3 });
        renderer.tick();

        expect(bakes()).toBe(2);
        expect(scene.environmentRotation.y).toBe(2);
        expect(scene.environmentIntensity).toBe(3);
    });

    it('bakes nothing before the renderer is initialized', async () => {
        const scene = new DIVEScene();
        const renderer = new DIVERenderer(scene, { camera: {} } as never);
        await scene.setImageBasedLight({});

        renderer.tick();

        expect(bakes()).toBe(0);
        expect(scene.environment).toBeNull();
    });

    it('rebakes on the new renderer after a canvas swap', async () => {
        const { scene, renderer } = await setUp();
        await scene.setImageBasedLight({});
        renderer.tick();
        const first = renderer.webgpurenderer;
        const before = scene.environment!;

        renderer.setCanvas(document.createElement('canvas'));
        await renderer.initAsync();
        renderer.tick();

        // freed while the renderer that made it was still there
        expect(
            (before.dispose as any).mock.invocationCallOrder[0],
        ).toBeLessThan((first.dispose as any).mock.invocationCallOrder[0]);
        expect(bakes()).toBe(2);
        expect(scene.environment!.userData.renderer).toBe(
            renderer.webgpurenderer,
        );
    });

    it('frees its bake on dispose', async () => {
        const { scene, renderer } = await setUp();
        await scene.setImageBasedLight({});
        renderer.tick();
        const baked = scene.environment!;

        renderer.dispose();

        expect(baked.dispose).toHaveBeenCalled();
        expect(scene.environment).toBeNull();
    });
});
