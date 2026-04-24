/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
    Color,
    CubeRenderTarget as CubeRenderTargetOriginal,
    Scene,
    WebGPURenderer,
} from 'three/webgpu';
import { DIVEEnvironment } from '../Environment.ts';

vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three/webgpu')>();

    return {
        ...actual,
        WebGPURenderer: vi.fn(function (this: any) {
            this.initialized = true;
            this.toneMapping = actual.NoToneMapping;
            this.outputColorSpace = actual.LinearSRGBColorSpace;
            this.render = vi.fn();
            this.init = vi.fn(async () => {});
            this.dispose = vi.fn();
            return this;
        }),
        CubeRenderTarget: vi.fn(function (this: any) {
            this.texture = {
                dispose: vi.fn(),
            };
            this.dispose = vi.fn();
            return this;
        }),
        CubeCamera: vi.fn(function (this: any, _near: number, _far: number) {
            this.update = vi.fn();
            return this;
        }),
        PMREMGenerator: vi.fn(function (this: any) {
            this.dispose = vi.fn();
            this.fromCubemap = vi.fn(() => ({
                texture: {
                    dispose: vi.fn(),
                },
                dispose: vi.fn(),
            }));
            return this;
        }),
    };
});

vi.mock('three/examples/jsm/loaders/HDRLoader.js', () => ({
    HDRLoader: vi.fn(function (this: any) {
        this.loadAsync = vi.fn(async () => ({
            mapping: undefined,
            dispose: vi.fn(),
            colorSpace: 'srgb',
        }));
        return this;
    }),
}));

const CubeRenderTarget = CubeRenderTargetOriginal as any;
const createDeferred = <T>() => {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((resolver) => {
        resolve = resolver;
    });

    return {
        promise,
        resolve,
    };
};

describe('HDREnvironment', () => {
    let renderer: any;
    let scene: Scene;

    beforeEach(() => {
        vi.clearAllMocks();
        renderer = new WebGPURenderer();
        scene = new Scene();
    });

    it('loads default image when no imageUrl provided', async () => {
        const env = new DIVEEnvironment(renderer, scene, { enabled: true });

        await env.initAsync();

        expect(scene.environment).toBeDefined();
    });

    it('reuses the in-flight init promise when init is called twice', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
        });
        const updateSpy = vi.spyOn(env, 'update');
        const deferred = createDeferred<void>();

        (env as any)._loadPromise = deferred.promise;

        const firstInit = env.initAsync();
        const secondInit = env.initAsync();

        expect(updateSpy).not.toHaveBeenCalled();

        deferred.resolve();
        await Promise.all([
            firstInit,
            secondInit,
        ]);

        expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('enables IBL with equirect source and sets background', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            useAsBackground: true,
        });

        await env.initAsync();

        expect(scene.background).toBeDefined();
        expect(scene.environment).toBeDefined();
    });

    it('applies rotation path via CubeCamera and PMREM when rotateY provided', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            rotateY: Math.PI * 0.5,
            useAsBackground: true,
        });

        await env.initAsync();

        expect(scene.environment).toBeDefined();
        expect(scene.background).toBeDefined();
    });

    it('can set image URL after construction and initialize again', async () => {
        const env = new DIVEEnvironment(renderer, scene, { enabled: true });

        await env.initAsync();
        await env.setImageUrl('later.hdr');

        expect(scene.environment).toBeDefined();
    });

    it('does not update during init when the renderer is not initialized', async () => {
        const uninitializedRenderer = new WebGPURenderer();
        uninitializedRenderer.initialized = false;
        const env = new DIVEEnvironment(uninitializedRenderer, scene, {
            imageUrl: 'hdr.hdr',
        });
        const updateSpy = vi.spyOn(env, 'update');

        await env.initAsync();

        expect(updateSpy).not.toHaveBeenCalled();
    });

    it('disposes resources and clears source image', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
        });

        await env.initAsync();
        env.dispose();

        expect(scene.environment).toBeNull();
    });

    it('disposes resources including background cube', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            useAsBackground: true,
        });

        await env.initAsync();

        expect((env as any).currentBackgroundCube).toBeDefined();

        env.dispose();

        expect(scene.environment).toBeNull();
        expect((env as any).currentBackgroundCube).toBeNull();
    });

    it('setRotationY updates environment when image is loaded', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
        });

        await env.initAsync();

        const spy = vi.spyOn(env, 'update');
        env.setRotationY(1.23);

        expect(spy).toHaveBeenCalled();
        expect((env as any).options.rotateY).toBe(1.23);
    });

    it('disposes previous background cube on subsequent rotations', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            rotateY: 0.1,
            useAsBackground: true,
        });

        await env.initAsync();

        const firstCube = (env as any).currentBackgroundCube;
        expect(firstCube).toBeDefined();

        const texDispose = firstCube.texture.dispose as any;
        const rtDispose = firstCube.dispose as any;

        env.update();

        expect(texDispose).toHaveBeenCalled();
        expect(rtDispose).toHaveBeenCalled();
    });

    it('disposes intermediate cubemap when not using background', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            rotateY: 0.5,
            useAsBackground: false,
        });

        await env.initAsync();

        const baseLen = CubeRenderTarget.mock.instances.length;

        env.update();

        const created = CubeRenderTarget.mock.instances[baseLen];
        expect(created.texture.dispose).toHaveBeenCalled();
        expect(created.dispose).toHaveBeenCalled();
    });

    it('clears the environment when the source image is missing', async () => {
        const originalBg = new Color(0x123456);
        scene.background = originalBg;

        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            useAsBackground: true,
        });

        await env.initAsync();

        (env as any).sourceImage = null;
        env.update();

        expect(scene.environment).toBeNull();
        expect(scene.background).toBe(originalBg);
        expect((env as any).currentBackgroundCube).toBeNull();
    });

    it('restores original background when background option toggled off', async () => {
        const originalBg = new Color(0xff0000);
        scene.background = originalBg;

        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            useAsBackground: true,
        });

        await env.initAsync();

        expect(scene.background).not.toBe(originalBg);
        expect(scene.background).toBeDefined();

        env.setUseAsBackground(false);

        expect(scene.background).toBe(originalBg);
    });

    it('does not overwrite original background with HDR texture on re-enable', async () => {
        const originalBg = new Color(0x00ff00);
        scene.background = originalBg;

        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            useAsBackground: true,
        });

        await env.initAsync();

        const hdrBg = scene.background;
        expect(hdrBg).not.toBe(originalBg);

        env.setUseAsBackground(false);
        expect(scene.background).toBe(originalBg);

        env.setUseAsBackground(true);
        expect(scene.background).not.toBe(originalBg);
    });

    it('updates renderer and regenerates PMREM', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
        });

        await env.initAsync();

        const newRenderer = new WebGPURenderer();
        const pmremDisposeSpy = vi.spyOn((env as any).pmrem, 'dispose');

        env.setRenderer(newRenderer);

        expect((env as any).renderer).toBe(newRenderer);
        expect(pmremDisposeSpy).toHaveBeenCalled();
        expect(scene.environment).toBeDefined();
    });

    it('falls back to the default HDR URL when setting a null image URL', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
        });
        const updateSpy = vi.spyOn(env, 'update');

        await env.initAsync();
        await env.setImageUrl(null);

        expect((env as any).options.imageUrl).toBeTruthy();
        expect(updateSpy).toHaveBeenCalled();
    });

    it('disposes stale source images when a newer HDR load replaces them', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
        });
        const firstTexture = {
            mapping: undefined,
            dispose: vi.fn(),
        } as any;
        const secondTexture = {
            mapping: undefined,
            dispose: vi.fn(),
        } as any;
        const firstLoad = createDeferred<any>();
        const secondLoad = createDeferred<any>();

        await env.initAsync();

        vi.spyOn(env as any, 'loadHDRImage')
            .mockImplementationOnce(() => firstLoad.promise)
            .mockImplementationOnce(() => secondLoad.promise);

        const firstUpdate = env.setImageUrl('first.hdr');
        const secondUpdate = env.setImageUrl('second.hdr');

        firstLoad.resolve(firstTexture);
        await Promise.resolve();
        secondLoad.resolve(secondTexture);
        await Promise.all([
            firstUpdate,
            secondUpdate,
        ]);

        expect(firstTexture.dispose).toHaveBeenCalledTimes(1);
        expect((env as any).sourceImage).toBe(secondTexture);
    });
});
