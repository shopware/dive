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

const setCanvasLayout = (
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
): void => {
    Object.defineProperty(canvas, 'clientWidth', {
        value: width,
        configurable: true,
    });
    Object.defineProperty(canvas, 'clientHeight', {
        value: height,
        configurable: true,
    });
    canvas.getBoundingClientRect = vi.fn(() => ({
        width,
        height,
        top: 0,
        left: 0,
        right: width,
        bottom: height,
        x: 0,
        y: 0,
        toJSON: () => ({}),
    })) as any;
};

const attachCanvas = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
    document.body.appendChild(canvas);
    return canvas;
};

describe('DIVERenderPipeline', () => {
    let renderer: DIVERenderer;
    let scene: any;
    let camera: any;
    let resizeObserverCallback:
        | ((entries: ResizeObserverEntry[]) => void)
        | undefined;
    let mockObserve: ReturnType<typeof vi.fn>;
    let mockDisconnect: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.clearAllMocks();
        scene = { isScene: true };
        camera = { isCamera: true };
        mockObserve = vi.fn();
        mockDisconnect = vi.fn();
        resizeObserverCallback = undefined;
        vi.stubGlobal(
            'ResizeObserver',
            vi.fn().mockImplementation((callback) => {
                resizeObserverCallback = callback;
                return {
                    observe: mockObserve,
                    disconnect: mockDisconnect,
                };
            }),
        );
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) =>
                setTimeout(() => callback(performance.now()), 0),
            ),
        );
        vi.stubGlobal(
            'cancelAnimationFrame',
            vi.fn((id: number) => clearTimeout(id)),
        );
        renderer = new DIVERenderer(scene, camera);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        document.body.innerHTML = '';
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
        expect(renderer.canvas).toBe(instance.domElement);
    });

    it('should expose the environment instance', () => {
        const environment = MockedDIVEEnvironment.mock.results[0].value;

        expect(renderer.environment).toBe(environment);
    });

    it('should initialize renderer and environment', async () => {
        const instance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;

        await renderer.init();

        expect(instance.init).toHaveBeenCalled();
        expect(environment.init).toHaveBeenCalled();
        expect(renderer.initialized).toBe(true);
    });

    it('should initialize the environment immediately when the renderer is already initialized', async () => {
        const instance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;

        instance.initialized = true;

        await renderer.init();

        expect(instance.init).not.toHaveBeenCalled();
        expect(environment.init).toHaveBeenCalledTimes(1);
    });

    it('should reuse the pending init when init is called twice concurrently', async () => {
        const instance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;
        let resolveInit: (() => void) | undefined;

        instance.init = vi.fn(
            () =>
                new Promise<void>((resolve) => {
                    resolveInit = () => {
                        instance.initialized = true;
                        resolve();
                    };
                }),
        );

        const firstInit = renderer.init();
        const secondInit = renderer.init();

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(instance.init).toHaveBeenCalledTimes(1);
        expect(environment.init).not.toHaveBeenCalled();

        resolveInit?.();
        await Promise.all([
            firstInit,
            secondInit,
        ]);

        expect(environment.init).toHaveBeenCalledTimes(1);
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

    it('should swap the environment to the new renderer before disposing the previous renderer', () => {
        const firstInstance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;
        const newCanvas = document.createElement('canvas');

        renderer.setCanvas(newCanvas);

        expect(environment.setRenderer).toHaveBeenCalledTimes(1);
        expect(firstInstance.dispose).toHaveBeenCalledTimes(1);
        expect(
            environment.setRenderer.mock.invocationCallOrder[0],
        ).toBeLessThan(firstInstance.dispose.mock.invocationCallOrder[0]);
    });

    it('should reinitialize after canvas swap when the previous renderer was active', async () => {
        const firstInstance = WebGPURenderer.mock.results[0].value;
        const newCanvas = attachCanvas(document.createElement('canvas'));
        setCanvasLayout(newCanvas, 1920, 1080);

        firstInstance.initialized = true;

        renderer.setCanvas(newCanvas);

        const secondInstance = WebGPURenderer.mock.results.at(-1)?.value;
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(secondInstance.init).toHaveBeenCalled();
    });

    it('should ignore stale init completions after a canvas swap', async () => {
        const firstInstance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;
        const newCanvas = attachCanvas(document.createElement('canvas'));
        setCanvasLayout(newCanvas, 1920, 1080);
        let resolveFirstInit: (() => void) | undefined;

        firstInstance.init = vi.fn(
            () =>
                new Promise<void>((resolve) => {
                    resolveFirstInit = () => {
                        firstInstance.initialized = true;
                        resolve();
                    };
                }),
        );

        const pendingInit = renderer.init();
        renderer.setCanvas(newCanvas);

        const secondInstance = WebGPURenderer.mock.results.at(-1)?.value;
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(secondInstance.init).toHaveBeenCalledTimes(1);

        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(environment.init).toHaveBeenCalledTimes(1);

        resolveFirstInit?.();
        await pendingInit;

        expect(environment.init).toHaveBeenCalledTimes(1);
    });

    it('should wait for a supplied canvas to receive layout before initializing', async () => {
        const canvas = attachCanvas(document.createElement('canvas'));
        let width = 0;
        let height = 0;

        Object.defineProperty(canvas, 'clientWidth', {
            get: () => width,
            configurable: true,
        });
        Object.defineProperty(canvas, 'clientHeight', {
            get: () => height,
            configurable: true,
        });
        canvas.getBoundingClientRect = vi.fn(() => ({
            width,
            height,
            top: 0,
            left: 0,
            right: width,
            bottom: height,
            x: 0,
            y: 0,
            toJSON: () => ({}),
        })) as any;

        renderer = new DIVERenderer(scene, camera, { canvas });
        const instance = WebGPURenderer.mock.results.at(-1)?.value;
        const initPromise = renderer.init();

        expect(instance.init).not.toHaveBeenCalled();

        width = 800;
        height = 600;
        resizeObserverCallback?.([
            {
                contentRect: {
                    width,
                    height,
                },
            } as ResizeObserverEntry,
        ]);

        await initPromise;

        expect(instance.init).toHaveBeenCalledTimes(1);
        expect(instance.setSize).toHaveBeenCalledWith(800, 600);
        expect(mockObserve).toHaveBeenCalled();
        expect(mockDisconnect).toHaveBeenCalled();
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
