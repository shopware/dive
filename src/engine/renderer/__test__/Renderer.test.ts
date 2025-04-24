import { WebGLRenderer } from 'three';
import { DIVERenderer, DIVERendererDefaultSettings } from '../Renderer.ts';
import { DIVEScene } from '../../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../../camera/PerspectiveCamera.ts';

jest.mock('three', () => ({
    WebGLRenderer: jest.fn().mockImplementation(() => ({
        domElement: document.createElement('canvas'),
        render: jest.fn(),
        setSize: jest.fn(),
        dispose: jest.fn(),
    })),
}));

describe('DIVERenderer', () => {
    let renderer: DIVERenderer;
    let scene: DIVEScene;
    let camera: DIVEPerspectiveCamera;

    beforeEach(() => {
        jest.clearAllMocks();
        renderer = new DIVERenderer();
        scene = {} as DIVEScene;
        camera = {} as DIVEPerspectiveCamera;
    });

    it('should instantiate with default settings', () => {
        expect(renderer).toBeDefined();
        expect(WebGLRenderer).toHaveBeenCalledWith({
            antialias: DIVERendererDefaultSettings.antialias,
            alpha: DIVERendererDefaultSettings.alpha,
            powerPreference: DIVERendererDefaultSettings.powerPreference,
            precision: DIVERendererDefaultSettings.precision,
            stencil: DIVERendererDefaultSettings.stencil,
            depth: DIVERendererDefaultSettings.depth,
            logarithmicDepthBuffer:
                DIVERendererDefaultSettings.logarithmicDepthBuffer,
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
        renderer = new DIVERenderer(customSettings);
        expect(WebGLRenderer).toHaveBeenCalledWith(customSettings);
    });

    it('should provide access to domElement', () => {
        expect(renderer.domElement).toBeDefined();
        expect(renderer.domElement).toBeInstanceOf(HTMLCanvasElement);
    });

    it('should set domElement', () => {
        const newCanvas = document.createElement('canvas');
        renderer.domElement = newCanvas;
        const mockInstance = (WebGLRenderer as jest.Mock).mock.results[0].value;
        expect(mockInstance.domElement).toBe(newCanvas);
    });

    it('should provide access to webglrenderer', () => {
        const mockInstance = (WebGLRenderer as jest.Mock).mock.results[0].value;
        expect(renderer.webglrenderer).toBe(mockInstance);
    });

    it('should render scene and camera', () => {
        renderer.render(scene, camera);
        expect(WebGLRenderer).toHaveBeenCalled();
        const mockInstance = (WebGLRenderer as jest.Mock).mock.results[0].value;
        expect(mockInstance.render).toHaveBeenCalledWith(scene, camera);
    });

    it('should handle resize', () => {
        const width = 800;
        const height = 600;
        renderer.onResize(width, height);
        const mockInstance = (WebGLRenderer as jest.Mock).mock.results[0].value;
        expect(mockInstance.setSize).toHaveBeenCalledWith(width, height, false);
    });

    it('should dispose WebGLRenderer', () => {
        renderer.dispose();
        const mockInstance = (WebGLRenderer as jest.Mock).mock.results[0].value;
        expect(mockInstance.dispose).toHaveBeenCalled();
    });
});
