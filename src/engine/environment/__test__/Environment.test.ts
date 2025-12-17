/**
 * @jest-environment jsdom
 */

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { WebGLRenderer, Scene, Color } from 'three';
import { DIVEEnvironment } from '../Environment.ts';

vi.mock('three');
vi.mock('three/examples/jsm/loaders/RGBELoader.js');

const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('HDREnvironment', () => {
    let renderer: any;
    let scene: any;

    beforeEach(() => {
        renderer = new WebGLRenderer();
        scene = new Scene();
    });

    it('loads default image when no imageUrl provided', async () => {
        const env = new DIVEEnvironment(renderer, scene, { enabled: true });
        await waitForAsync();
        expect(scene.environment).toBeDefined();
    });

    it('enables IBL with equirect source and sets background', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            useAsBackground: true,
        });

        await waitForAsync();

        expect(scene.background).toBeDefined();
        expect(scene.environment).toBeDefined();
    });

    it('applies rotation path via CubeCamera and PMREM when rotateY provided', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            rotateY: Math.PI * 0.5,
            useAsBackground: true,
        });

        await waitForAsync();

        expect(scene.environment).toBeDefined();
        expect(scene.background).toBeDefined();
    });

    it('can set image URL after construction and re-enable', async () => {
        const env = new DIVEEnvironment(renderer, scene, { enabled: true });
        await env.setImageUrl('later.hdr');
        expect(scene.environment).toBeDefined();
    });

    it('disposes resources and clears source image', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
        });
        await waitForAsync();

        await env.dispose();
        // After dispose the scene env should be null
        expect(scene.environment).toBeNull();
    });

    it('disposes resources including background cube', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            useAsBackground: true,
        });
        await waitForAsync();

        // Check that background cube exists
        expect((env as any).currentBackgroundCube).toBeDefined();

        await env.dispose();

        expect(scene.environment).toBeNull();
        expect((env as any).currentBackgroundCube).toBeNull();
    });

    it('setRotationY updates environment when image is loaded', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
        });
        await waitForAsync();

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
        await waitForAsync();

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
        await waitForAsync();

        // capture current instances count, then expect the next one to be disposed
        const { WebGLCubeRenderTarget } = await import('three');
        const baseLen = (WebGLCubeRenderTarget as any).mock.instances.length;

        env.update();

        const created = (WebGLCubeRenderTarget as any).mock.instances[baseLen];
        expect(created.texture.dispose).toHaveBeenCalled();
        expect(created.dispose).toHaveBeenCalled();
    });

    it('restores original background when background option toggled off', async () => {
        const originalBg = new Color(0xff0000);
        scene.background = originalBg;

        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            useAsBackground: true,
        });
        await waitForAsync();

        // 1. Enable -> replaces background
        expect(scene.background).not.toBe(originalBg);
        expect(scene.background).toBeDefined(); // Should be the texture

        // 2. Toggle useAsBackground off -> restores background
        env.setUseAsBackground(false);
        expect(scene.background).toBe(originalBg);
    });

    it('does not overwrite original background with HDR texture on re-enable', async () => {
        const originalBg = new Color(0x00ff00);
        scene.background = originalBg;

        // constructor saves original background
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
            useAsBackground: true,
        });

        await waitForAsync();

        const hdrBg = scene.background;
        expect(hdrBg).not.toBe(originalBg);

        env.setUseAsBackground(false);

        expect(scene.background).toBe(originalBg);
    });

    it('updates renderer and regenerates PMREM', async () => {
        const env = new DIVEEnvironment(renderer, scene, {
            imageUrl: 'hdr.hdr',
        });
        await waitForAsync();

        const newRenderer = new WebGLRenderer();
        const pmremDisposeSpy = vi.spyOn((env as any).pmrem, 'dispose');

        env.setRenderer(newRenderer);

        expect((env as any).renderer).toBe(newRenderer);
        expect(pmremDisposeSpy).toHaveBeenCalled();
        // It should also trigger update
        expect(scene.environment).toBeDefined();
    });

    it('deprecated methods do not throw', () => {
        const env = new DIVEEnvironment(renderer, scene);
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        expect(() => env.setGlobalEnvIntensity(1)).not.toThrow();
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('deprecated'),
        );

        expect(() => env.setExposure(1)).not.toThrow();
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('deprecated'),
        );

        expect(() => env.disable()).not.toThrow();
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining('deprecated'),
        );

        // enable is async
        expect(async () => await env.enable()).not.toThrow();

        warnSpy.mockRestore();
    });
});
