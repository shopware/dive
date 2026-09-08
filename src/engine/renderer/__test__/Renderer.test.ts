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

/** Records whether disposing killed the canvas context, as three's does. */
const { loseContext } = vi.hoisted(() => ({ loseContext: vi.fn() }));

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

            /**
             * enough of WebGLBackend for what matters, the extension cache and a
             * dispose that ends the canvas's context through it
             */
            const cache: Record<string, unknown> = {};
            this.backend = {
                extensions: {
                    extensions: cache,
                    get: (name: string) => {
                        if (cache[name] === undefined) {
                            cache[name] =
                                name === 'WEBGL_lose_context'
                                    ? { loseContext }
                                    : null;
                        }
                        return cache[name];
                    },
                },
            };
            this.dispose = vi.fn(() => {
                /**
                 * optional, so a test that stands in for "three moved its
                 * internals" can remove them without this throwing instead
                 */
                const extension =
                    this.backend?.extensions?.get('WEBGL_lose_context');
                if (extension) extension.loseContext();
            });
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
        this.initAsync = vi.fn(async () => {});
        return this;
    }),
}));

const WebGPURenderer = WebGPURendererOriginal as any;
const MockedDIVEEnvironment = DIVEEnvironment as any;

describe('DIVERenderPipeline', () => {
    let renderer: DIVERenderer;
    let scene: any;
    let camera: any;
    let cameraComponent: any;

    beforeEach(() => {
        vi.clearAllMocks();
        scene = { isScene: true };
        // the renderer is handed the component and pulls the camera out itself
        camera = { isCamera: true };
        cameraComponent = { camera };
        renderer = new DIVERenderer(scene, cameraComponent);
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

        renderer = new DIVERenderer(scene, cameraComponent, customSettings);
        const instance = WebGPURenderer.mock.results.at(-1)?.value;

        expect(WebGPURenderer).toHaveBeenLastCalledWith(
            expect.objectContaining(customSettings),
        );
        expect(instance.shadowMap.enabled).toBe(false);
        expect(instance.shadowMap.type).toBe(BasicShadowMap);
    });

    it('should create a renderer with a supplied canvas', () => {
        const canvas = document.createElement('canvas');

        renderer = new DIVERenderer(scene, cameraComponent, { canvas });

        expect(WebGPURenderer).toHaveBeenLastCalledWith(
            expect.objectContaining({ canvas }),
        );
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

        await renderer.initAsync();

        expect(instance.init).toHaveBeenCalled();
        expect(environment.initAsync).toHaveBeenCalled();
        expect(renderer.initialized).toBe(true);
    });

    it('should initialize the environment immediately when the renderer is already initialized', async () => {
        const instance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;

        instance.initialized = true;

        await renderer.initAsync();

        expect(instance.init).not.toHaveBeenCalled();
        expect(environment.initAsync).toHaveBeenCalledTimes(1);
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

        const firstInit = renderer.initAsync();
        const secondInit = renderer.initAsync();

        await Promise.resolve();

        expect(instance.init).toHaveBeenCalledTimes(1);
        expect(environment.initAsync).not.toHaveBeenCalled();

        resolveInit?.();
        await Promise.all([firstInit, secondInit]);

        expect(environment.initAsync).toHaveBeenCalledTimes(1);
    });

    it('should render only after initialization', () => {
        const instance = WebGPURenderer.mock.results[0].value;

        renderer.tick();
        expect(instance.render).not.toHaveBeenCalled();

        instance.initialized = true;
        renderer.tick();
        expect(instance.render).toHaveBeenCalledWith(scene, camera);
    });

    it('should render through whichever component is active', () => {
        const instance = WebGPURenderer.mock.results[0].value;
        instance.initialized = true;
        const other = { isCamera: true, other: true };

        renderer.activeCamera = { camera: other } as never;
        renderer.tick();

        expect(instance.render).toHaveBeenCalledWith(scene, other);
    });

    it('should follow a component that swaps its camera', () => {
        /**
         * read per frame rather than unpacked once, so a component that replaces
         * its camera is not left behind
         */
        const instance = WebGPURenderer.mock.results[0].value;
        instance.initialized = true;
        const replacement = { isCamera: true, replacement: true };

        cameraComponent.camera = replacement;
        renderer.tick();

        expect(instance.render).toHaveBeenCalledWith(scene, replacement);
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

    it('should not auto reinitialize after a canvas swap', () => {
        const firstInstance = WebGPURenderer.mock.results[0].value;
        const newCanvas = document.createElement('canvas');

        firstInstance.initialized = true;
        renderer.setCanvas(newCanvas);

        const secondInstance = WebGPURenderer.mock.results.at(-1)?.value;

        expect(secondInstance.init).not.toHaveBeenCalled();
    });

    it('should ignore stale init completions after a canvas swap', async () => {
        const firstInstance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;
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

        const pendingInit = renderer.initAsync();
        renderer.setCanvas(document.createElement('canvas'));

        resolveFirstInit?.();
        await pendingInit;

        expect(environment.initAsync).not.toHaveBeenCalled();
    });

    it('should dispose environment and renderer', () => {
        const instance = WebGPURenderer.mock.results[0].value;
        const environment = MockedDIVEEnvironment.mock.results[0].value;

        renderer.dispose();

        expect(environment.dispose).toHaveBeenCalled();
        expect(instance.dispose).toHaveBeenCalled();
    });

    it('should map medium shadow quality to PCFShadowMap', () => {
        renderer = new DIVERenderer(scene, cameraComponent, {
            shadowQuality: 'medium',
        });

        const instance = WebGPURenderer.mock.results.at(-1)?.value;

        expect(instance.shadowMap.type).toBe(PCFShadowMap);
    });

    describe('the canvas after a dispose', () => {
        it('should leave a supplied canvas usable', () => {
            /**
             * three's dispose ends the canvas's context, not just the renderer's,
             * so every later renderer on that canvas gets the lost one back
             */
            const canvas = document.createElement('canvas');
            renderer = new DIVERenderer(scene, cameraComponent, { canvas });

            renderer.dispose();

            expect(loseContext).not.toHaveBeenCalled();
        });

        it('should keep a canvas it created itself usable too', () => {
            /**
             * no reason to treat it differently, DIVEScene.dispose releases the GPU
             * resources and ending the context only makes the canvas unusable
             */
            renderer = new DIVERenderer(scene, cameraComponent);

            renderer.dispose();

            expect(loseContext).not.toHaveBeenCalled();
        });

        it('should leave the previous canvas usable when swapping to another', () => {
            const first = document.createElement('canvas');
            renderer = new DIVERenderer(scene, cameraComponent, {
                canvas: first,
            });

            renderer.setCanvas(document.createElement('canvas'));

            expect(loseContext).not.toHaveBeenCalled();
        });

        it('should say so when it cannot reach the internals it needs', () => {
            const canvas = document.createElement('canvas');
            renderer = new DIVERenderer(scene, cameraComponent, { canvas });
            // as a three version that moved them would look
            delete (renderer.webgpurenderer as unknown as { backend?: unknown })
                .backend;
            console.warn = vi.fn();

            renderer.dispose();

            expect(console.warn).toHaveBeenCalledWith(
                expect.stringContaining('end this canvas context'),
            );
        });
    });
});
