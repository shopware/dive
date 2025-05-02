/**
 * @jest-environment jsdom
 */

import {
    DIVERenderPipeline,
    DIVERenderPipelineDefaultSettings,
} from '../Renderer.ts';
import { DIVEScene } from '../../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../../camera/PerspectiveCamera.ts';
import { vi } from 'vitest';
import { WebGLRenderer as WebGLRendererOriginal } from 'three';
// cast to any so we can call .mock on the mocked WebGLRenderer
const WebGLRenderer = WebGLRendererOriginal as any;

// vi.mock('three', async (importOriginal) => {
//     const actual = await importOriginal<typeof import('three')>();
//     return {
//         ...actual,
//         WebGLRenderer: vi.fn().mockImplementation(() => ({
//             setSize: vi.fn(),
//             render: vi.fn(),
//             domElement: document.createElement('canvas'),
//             dispose: vi.fn(),
//         })),
//     };
// });

describe('DIVERenderPipeline', () => {
    let renderer: DIVERenderPipeline;
    let scene: DIVEScene;
    let camera: DIVEPerspectiveCamera;

    beforeEach(() => {
        vi.clearAllMocks();
        scene = new DIVEScene();
        camera = new DIVEPerspectiveCamera();
        renderer = new DIVERenderPipeline(scene, camera);
    });

    it('should instantiate with default settings', () => {
        expect(renderer).toBeDefined();
        expect(WebGLRenderer).toHaveBeenCalledWith({
            antialias: DIVERenderPipelineDefaultSettings.antialias,
            alpha: DIVERenderPipelineDefaultSettings.alpha,
            powerPreference: DIVERenderPipelineDefaultSettings.powerPreference,
            precision: DIVERenderPipelineDefaultSettings.precision,
            stencil: DIVERenderPipelineDefaultSettings.stencil,
            depth: DIVERenderPipelineDefaultSettings.depth,
            logarithmicDepthBuffer:
                DIVERenderPipelineDefaultSettings.logarithmicDepthBuffer,
        });
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
        renderer = new DIVERenderPipeline(scene, camera, customSettings);
        expect(WebGLRenderer).toHaveBeenCalledWith(customSettings);
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
        expect(mockInstance.setSize).toHaveBeenCalledWith(width, height, false);
    });

    it('should dispose WebGLRenderer', () => {
        renderer.dispose();
        const mockInstance = WebGLRenderer.mock.results[0].value;
        expect(mockInstance.dispose).toHaveBeenCalled();
    });
});
