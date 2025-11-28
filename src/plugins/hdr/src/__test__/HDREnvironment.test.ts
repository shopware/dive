/**
 * @jest-environment jsdom
 */

import { vi, describe, it, expect, beforeEach } from 'vitest';
import {
    WebGLRenderer,
    Scene,
    SRGBColorSpace,
    ACESFilmicToneMapping,
} from 'three';
import { HDREnvironment } from '../HDREnvorinment.ts';

vi.mock('three');
vi.mock('three/examples/jsm/loaders/RGBELoader.js');

describe('HDREnvironment', () => {
    let renderer: any;
    let scene: any;

    beforeEach(() => {
        renderer = new WebGLRenderer();
        scene = new Scene();
        scene.traverse = vi.fn((cb: (o: any) => void) => {
            // walk a couple of fake objects with materials to test intensity
            cb({
                material: { envMapIntensity: 0, needsUpdate: false, map: {} },
            });
            cb({
                material: [{ envMapIntensity: 0, needsUpdate: false, map: {} }],
            });
        });
    });

    it('does nothing when enabled without imageUrl', async () => {
        const env = new HDREnvironment(renderer, scene, { enabled: true });
        await Promise.resolve();
        expect(scene.environment).toBeUndefined();
    });

    it('enables IBL with equirect source and sets background', async () => {
        const env = new HDREnvironment(renderer, scene, {
            enabled: true,
            imageUrl: 'hdr.hdr',
            useAsBackground: true,
            replaceLights: false,
        });
        await env.enable();

        expect(renderer.toneMapping).toBe(ACESFilmicToneMapping);
        expect(renderer.outputColorSpace).toBe(SRGBColorSpace);
        expect(scene.background).toBeDefined();
        expect(scene.environment).toBeDefined();
    });

    it('applies rotation path via CubeCamera and PMREM when rotateY provided', async () => {
        const env = new HDREnvironment(renderer, scene, {
            enabled: true,
            imageUrl: 'hdr.hdr',
            rotateY: Math.PI * 0.5,
            useAsBackground: true,
            replaceLights: false,
        });
        await env.enable();

        expect(scene.environment).toBeDefined();
        expect(scene.background).toBeDefined();
    });

    it('updates exposure on renderer', async () => {
        const env = new HDREnvironment(renderer, scene, {
            enabled: true,
            imageUrl: 'hdr.hdr',
            exposure: 1.25,
        });
        await env.enable();
        env.setExposure(2.0);
        expect(renderer.toneMappingExposure).toBe(2.0);
    });

    it('updates global environment intensity across materials', async () => {
        const env = new HDREnvironment(renderer, scene, {
            enabled: true,
            imageUrl: 'hdr.hdr',
        });
        await env.enable();
        env.setGlobalEnvIntensity(0.4);
        // ensure traverse was used to update materials
        expect(scene.traverse).toHaveBeenCalled();
    });

    it('can set image URL after construction and re-enable', async () => {
        const env = new HDREnvironment(renderer, scene, { enabled: true });
        await env.setImageUrl('later.hdr');
        expect(scene.environment).toBeDefined();
    });

    it('disables environment and restores lights', async () => {
        const light = { isLight: true, visible: true };
        scene.traverse = vi.fn((cb: (o: any) => void) => cb(light));

        const env = new HDREnvironment(renderer, scene, {
            enabled: true,
            imageUrl: 'hdr.hdr',
            replaceLights: true,
        });
        await env.enable();
        // light should have been hidden
        expect(light.visible).toBe(false);
        env.disable();
        expect(scene.environment).toBeNull();
        expect(light.visible).toBe(true);
    });

    it('disposes resources and clears source image', async () => {
        const env = new HDREnvironment(renderer, scene, {
            enabled: true,
            imageUrl: 'hdr.hdr',
        });
        await env.enable();
        await env.dispose();
        // After dispose the scene env should be null from disable()
        expect(scene.environment).toBeNull();
    });

    it('setRotationY returns early when no source image (122-125)', async () => {
        const env = new HDREnvironment(renderer, scene, { enabled: true });
        const spy = vi.spyOn(
            HDREnvironment.prototype as any,
            'applyRotationAndSetEnvironment',
        );
        await env.setRotationY(0.7);
        expect((env as any).options.rotateY).toBe(0.7);
        expect(spy).not.toHaveBeenCalled();
        spy.mockRestore();
    });

    it('setRotationY triggers rotation when image is loaded (122-125)', async () => {
        const env = new HDREnvironment(renderer, scene, {
            enabled: true,
            imageUrl: 'hdr.hdr',
        });
        await env.enable();
        const spy = vi.spyOn(
            HDREnvironment.prototype as any,
            'applyRotationAndSetEnvironment',
        );
        await env.setRotationY(1.23);
        expect(spy).toHaveBeenCalledWith(1.23);
        spy.mockRestore();
    });

    it('disposes previous background cube on subsequent rotations (199-201)', async () => {
        const env = new HDREnvironment(renderer, scene, {
            enabled: true,
            imageUrl: 'hdr.hdr',
            rotateY: 0.1,
            useAsBackground: true,
        });
        await env.enable();

        const firstCube = (env as any).currentBackgroundCube;
        expect(firstCube).toBeDefined();
        const texDispose = firstCube.texture.dispose as any;
        const rtDispose = firstCube.dispose as any;

        await env.enable();
        expect(texDispose).toHaveBeenCalled();
        expect(rtDispose).toHaveBeenCalled();
    });

    it('disposes intermediate cubemap when not using background (213-215)', async () => {
        const env = new HDREnvironment(renderer, scene, {
            enabled: true,
            imageUrl: 'hdr.hdr',
            rotateY: 0.5,
            useAsBackground: false,
        });

        // capture current instances count, then expect the next one to be disposed
        const { WebGLCubeRenderTarget } = await import('three');
        const baseLen = (WebGLCubeRenderTarget as any).mock.instances.length;

        await env.enable();

        const created = (WebGLCubeRenderTarget as any).mock.instances[baseLen];
        expect(created.texture.dispose).toHaveBeenCalled();
        expect(created.dispose).toHaveBeenCalled();
    });

    it('sets material.map.colorSpace to SRGBColorSpace (242-243)', async () => {
        const matObj = {
            material: {
                envMapIntensity: 0,
                needsUpdate: false,
                map: { colorSpace: 'foo' },
            },
        };
        scene.traverse = vi.fn((cb: (o: any) => void) => cb(matObj));

        const env = new HDREnvironment(renderer, scene, {
            enabled: true,
            imageUrl: 'hdr.hdr',
        });
        await env.enable();

        expect(matObj.material.map.colorSpace).toBe(SRGBColorSpace);
    });
});
