/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
    BasicShadowMap,
    LinearToneMapping,
    PCFShadowMap,
    PCFSoftShadowMap,
    SRGBColorSpace,
    WebGPURenderer as WebGPURendererOriginal,
} from 'three/webgpu';
import { DIVEEnvironment } from '../../environment/Environment.ts';
import { DIVERenderer, DIVERendererDefaultSettings } from '../Renderer.ts';

vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three/webgpu')>();

    return {
        ...actual,
        WebGPURenderer: vi.fn(function (this: any, settings: any = {}) {
            const domElement =
                settings.canvas ??
                ({
                    clientWidth: 800,
                    clientHeight: 600,
                    style: { position: 'absolute' },
                } as HTMLCanvasElement);

            if (!settings.canvas) {
                (domElement as any).parentElement = domElement;
            }

            this.domElement = domElement;
            this.settings = settings;
            this.initialized = false;
            this.setSize = vi.fn();
            this.setPixelRatio = vi.fn();
            this.render = vi.fn();
            this.dispose = vi.fn();
            this.init = vi.fn(async () => {
                this.initialized = true;
            });
            this.shadowMap = { enabled: false, type: 0 };
            this.outputColorSpace = actual.LinearSRGBColorSpace;
            this.toneMapping = actual.NoToneMapping;
            this.toneMappingExposure = 0;
            return this;
        }),
    };
});

vi.mock('../../environment/Environment.ts', () => ({
    DIVEEnvironment: vi.fn(function (this: any) {
        this.dispose = vi.fn();
        this.setRenderer = vi.fn();
        this.init = vi.fn(async () => {});
        return this;
    }),
}));

const WebGPURenderer = WebGPURendererOriginal as any;
const MockedDIVEEnvironment = DIVEEnvironment as any;

describe('DIVERenderPipeline', () => {
    let renderer: DIVERenderer;
    let scene: any;
    let camera: any;

    beforeEach(() => {
        vi.clearAllMocks();
        scene = { isScene: true };
        camera = { isCamera: true };
        renderer = new DIVERenderer(scene, camera);
    });

    it('should instantiate with default settings', () => {
        const instance = WebGPURenderer.mock.results[0].value;

        expect(renderer).toBeDefined();
        expect(WebGPURenderer).toHaveBeenCalledWith(
            expect.objectContaining({
                antialias: DIVERendererDefaultSettings.antialias,
                alpha: DIVERendererDefaultSettings.alpha,
                powerPreference: DIVERendererDefaultSettings.powerPreference,
                precision: DIVERendererDefaultSettings.precision,
                stencil: DIVERendererDefaultSettings.stencil,
                depth: DIVERendererDefaultSettings.depth,
                logarithmicDepthBuffer:
                    DIVERendererDefaultSettings.logarithmicDepthBuffer,
                shadows: DIVERendererDefaultSettings.shadows,
                shadowQuality: DIVERendererDefaultSettings.shadowQuality,
            }),
        );
        expect(instance.shadowMap.enabled).toBe(true);
        expect(instance.shadowMap.type).toBe(PCFSoftShadowMap);
        expect(instance.setPixelRatio).toHaveBeenCalledWith(
            window.devicePixelRatio,
        );
        expect(instance.outputColorSpace).toBe(SRGBColorSpace);
        expect(instance.toneMapping).toBe(LinearToneMapping);
        expect(MockedDIVEEnvironment).toHaveBeenCalledWith(instance, scene);
    });

    it('should instantiate with custom settings', () => {
        const customSettings = {
            antialias: false,
            alpha: false,
            powerPreference: 'low-power' as const,
            precision: 'mediump' as const,
            stencil: true,
            depth: false,
            logarithmicDepthBuffer: false,
            shadows: false,
            shadowQuality: 'low' as const,
        };

        renderer = new DIVERenderer(scene, camera, customSettings);
        const instance = WebGPURenderer.mock.results.at(-1)?.value;

        expect(WebGPURenderer).toHaveBeenLastCalledWith(
            expect.objectContaining(customSettings),
        );
        expect(instance.shadowMap.enabled).toBe(false);
        expect(instance.shadowMap.type).toBe(BasicShadowMap);
    });

    it('should expose the current renderer and canvas', () => {
        const instance = WebGPURenderer.mock.results[0].value;

        expect(renderer.webgpurenderer).toBe(instance);
        expect(renderer.webglrenderer).toBe(instance);
        expect(renderer.canvas).toBe(instance.domElement);
    });

    it('should initialize renderer and environment', async () => {
        const instance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;

        await renderer.init();

        expect(instance.init).toHaveBeenCalled();
        expect(environment.init).toHaveBeenCalled();
        expect(renderer.initialized).toBe(true);
    });

    it('should render only after initialization', () => {
        const instance = WebGPURenderer.mock.results[0].value;

        renderer.render();
        expect(instance.render).not.toHaveBeenCalled();

        instance.initialized = true;
        renderer.render();
        expect(instance.render).toHaveBeenCalledWith(scene, camera);
    });

    it('should handle resize', () => {
        const instance = WebGPURenderer.mock.results[0].value;

        renderer.onResize(800, 600);

        expect(instance.setSize).toHaveBeenCalledWith(800, 600);
    });

    it('should recreate the renderer when setting a canvas', () => {
        const firstInstance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;
        const newCanvas = document.createElement('canvas');

        renderer.setCanvas(newCanvas);

        const secondInstance = WebGPURenderer.mock.results.at(-1)?.value;
        expect(firstInstance.dispose).toHaveBeenCalled();
        expect(WebGPURenderer).toHaveBeenLastCalledWith(
            expect.objectContaining({ canvas: newCanvas }),
        );
        expect(environment.setRenderer).toHaveBeenCalledWith(secondInstance);
        expect(renderer.canvas).toBe(secondInstance.domElement);
    });

    it('should reinitialize after canvas swap when the previous renderer was active', () => {
        const firstInstance = WebGPURenderer.mock.results[0].value;
        const newCanvas = document.createElement('canvas');

        firstInstance.initialized = true;

        renderer.setCanvas(newCanvas);

        const secondInstance = WebGPURenderer.mock.results.at(-1)?.value;
        expect(secondInstance.init).toHaveBeenCalled();
    });

    it('should dispose environment and renderer', () => {
        const instance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;

        renderer.dispose();

        expect(environment.dispose).toHaveBeenCalled();
        expect(instance.dispose).toHaveBeenCalled();
    });

    it('should map medium shadow quality to PCFShadowMap', () => {
        renderer = new DIVERenderer(scene, camera, {
            shadowQuality: 'medium',
        });

        const instance = WebGPURenderer.mock.results.at(-1)?.value;

        expect(instance.shadowMap.type).toBe(PCFShadowMap);
    });
});
