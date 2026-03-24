/**
 * @jest-environment jsdom
 */

import { DIVERenderer, DIVERendererDefaultSettings } from '../Renderer.ts';
import { DIVEScene } from '../../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../../camera/PerspectiveCamera.ts';
import { vi } from 'vitest';
import { WebGLRenderer as WebGLRendererOriginal } from 'three';

vi.mock('three', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three')>();
    return {
        ...actual,
        WebGLRenderer: vi.fn(function (this: {
            domElement: {
                clientWidth: number;
                clientHeight: number;
                style: { position: string };
                parentElement: typeof this.domElement;
            };
            setSize: ReturnType<typeof vi.fn>;
            render: ReturnType<typeof vi.fn>;
            compile: ReturnType<typeof vi.fn>;
            dispose: ReturnType<typeof vi.fn>;
            setPixelRatio: ReturnType<typeof vi.fn>;
            setAnimationLoop: ReturnType<typeof vi.fn>;
            shadowMap: { enabled: boolean; type: number };
            debug: { checkShaderErrors: boolean };
        }) {
            const dom = {
                clientWidth: 800,
                clientHeight: 600,
                style: { position: 'absolute' },
            } as typeof this.domElement;
            dom.parentElement = dom;
            this.domElement = dom;
            this.setSize = vi.fn();
            this.setPixelRatio = vi.fn();
            this.render = vi.fn();
            this.compile = vi.fn();
            this.setAnimationLoop = vi.fn();
            this.shadowMap = { enabled: false, type: 0 };
            this.debug = { checkShaderErrors: true };
            this.dispose = vi.fn();
            return this;
        }),
    };
});

vi.mock('../../environment/Environment.ts', () => ({
    DIVEEnvironment: vi.fn(function (this: {
        dispose: ReturnType<typeof vi.fn>;
        setRenderer: ReturnType<typeof vi.fn>;
    }) {
        this.dispose = vi.fn();
        this.setRenderer = vi.fn();
        return this;
    }),
}));

// cast to any so we can call .mock on the mocked WebGLRenderer
const WebGLRenderer = WebGLRendererOriginal as any;

describe('DIVERenderPipeline', () => {
    let renderer: DIVERenderer;
    let scene: DIVEScene;
    let camera: DIVEPerspectiveCamera;

    beforeEach(() => {
        vi.clearAllMocks();
        scene = new DIVEScene();
        camera = new DIVEPerspectiveCamera();
        renderer = new DIVERenderer(scene, camera);
    });

    it('should instantiate with default settings', () => {
        expect(renderer).toBeDefined();
        expect(WebGLRenderer).toHaveBeenCalledWith(
            expect.objectContaining({
                antialias: DIVERendererDefaultSettings.antialias,
                alpha: DIVERendererDefaultSettings.alpha,
                powerPreference: DIVERendererDefaultSettings.powerPreference,
                precision: DIVERendererDefaultSettings.precision,
                stencil: DIVERendererDefaultSettings.stencil,
                depth: DIVERendererDefaultSettings.depth,
                logarithmicDepthBuffer:
                    DIVERendererDefaultSettings.logarithmicDepthBuffer,
            }),
        );
    });

    it('should instantiate with custom settings', () => {
        const customSettings = {
            antialias: false,
            alpha: false,
            powerPreference: 'low-power' as const,
            precision: 'mediump' as const,
            stencil: true,
            depth: false,
            logarithmicDepthBuffer: true,
        };
        renderer = new DIVERenderer(scene, camera, customSettings);
        expect(WebGLRenderer).toHaveBeenCalledWith(
            expect.objectContaining(customSettings),
        );
    });

    it('should provide access to domElement', () => {
        expect(renderer.webglrenderer.domElement).toBeDefined();
    });

    it('should set domElement', () => {
        const newCanvas = document.createElement('canvas');
        renderer.webglrenderer.domElement = newCanvas;
        const mockInstance = WebGLRenderer.mock.results[0].value;
        expect(mockInstance.domElement).toBe(newCanvas);
    });

    it('should provide access to webglrenderer', () => {
        const mockInstance = WebGLRenderer.mock.results[0].value;
        expect(renderer.webglrenderer).toBe(mockInstance);
    });

    it('should render scene and camera', () => {
        renderer.render();
        const mockInstance = WebGLRenderer.mock.results[0].value;
        expect(mockInstance.render).toHaveBeenCalledWith(scene, camera);
    });

    it('should handle resize', () => {
        const width = 800;
        const height = 600;
        renderer.onResize(width, height);
        const mockInstance = WebGLRenderer.mock.results[0].value;
        expect(mockInstance.setSize).toHaveBeenCalledWith(width, height);
    });

    it('should dispose WebGLRenderer', () => {
        renderer.dispose();
        const mockInstance = WebGLRenderer.mock.results[0].value;
        expect(mockInstance.dispose).toHaveBeenCalled();
    });
});
