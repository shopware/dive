import { Matrix4, Vector4, Color, Material } from 'three/webgpu';
import { OrientationDisplay } from '../OrientationDisplay.ts';
import {
    type DIVECameraComponent,
    DIVERenderer,
    DIVEScene,
    COORDINATE_LAYER_MASK,
} from '@shopware-ag/dive';

// jsdom has no 2D canvas context, so the axes labels cannot rasterize their text
vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);

const mockScene = {
    add: vi.fn(),
    remove: vi.fn(),
    background: null,
} as unknown as DIVEScene;

// the axes follow the main camera's world matrix, which is where its orientation
// lives now that the camera sits on a node
const mockCameraComponent = {
    camera: { matrixWorld: new Matrix4() },
} as unknown as DIVECameraComponent;

const mockCanvas = document.createElement('canvas');
Object.defineProperty(mockCanvas, 'clientHeight', {
    value: 600,
    configurable: true,
});

const mockRenderer = {
    render: vi.fn(),
    canvas: mockCanvas,
    webgpurenderer: {
        initialized: true,
        getViewport: vi.fn((viewport: Vector4) => viewport.set(0, 0, 800, 600)),
        setViewport: vi.fn(),
        render: vi.fn(),
        autoClear: true,
    },
} as unknown as DIVERenderer;

describe('OrientationDisplay', () => {
    let orientationDisplay: OrientationDisplay;

    beforeEach(() => {
        vi.clearAllMocks();
        (mockRenderer.webgpurenderer as any).initialized = true;
        (mockRenderer.webgpurenderer as any).domElement = mockCanvas;
        mockRenderer.webgpurenderer.autoClear = true;
        orientationDisplay = new OrientationDisplay(
            mockRenderer,
            mockScene,
            mockCameraComponent,
        );
    });

    describe('constructor', () => {
        it('should initialize with correct properties', () => {
            expect(orientationDisplay).toBeInstanceOf(OrientationDisplay);
            expect(orientationDisplay['_orthographicCamera'].layers.mask).toBe(
                COORDINATE_LAYER_MASK,
            );
            expect(mockScene.add).toHaveBeenCalledWith(
                orientationDisplay['_orthographicCamera'],
            );
            expect(mockScene.add).toHaveBeenCalledWith(
                orientationDisplay['_axes'],
            );
        });

        it('should create axes instance', () => {
            expect(orientationDisplay['_axes']).toBeDefined();
        });
    });

    describe('dispose', () => {
        it('should clean up resources', () => {
            orientationDisplay.dispose();
            expect(mockScene.remove).toHaveBeenCalledWith(
                orientationDisplay['_axes'],
            );
            expect(mockScene.remove).toHaveBeenCalledWith(
                orientationDisplay['_orthographicCamera'],
            );
        });

        it('should not throw when called multiple times', () => {
            expect(() => {
                orientationDisplay.dispose();
                orientationDisplay.dispose();
            }).not.toThrow();
        });
    });

    describe('tick', () => {
        it('should not render when renderer is not initialized', () => {
            (mockRenderer.webgpurenderer as any).initialized = false;

            orientationDisplay.tick();

            expect(mockRenderer.webgpurenderer.render).not.toHaveBeenCalled();
        });

        it('should render when renderer is initialized', () => {
            const originalBackground = new Color(0x000000);
            mockScene.background = originalBackground;

            orientationDisplay.tick();

            expect(
                mockRenderer.webgpurenderer.getViewport,
            ).toHaveBeenCalledWith(orientationDisplay['_restoreViewport']);
            expect(
                mockRenderer.webgpurenderer.setViewport,
            ).toHaveBeenCalledWith(0, 450, 150, 150);
            expect(mockRenderer.webgpurenderer.render).toHaveBeenCalledWith(
                mockScene,
                orientationDisplay['_orthographicCamera'],
            );
            expect(
                mockRenderer.webgpurenderer.setViewport,
            ).toHaveBeenCalledWith(orientationDisplay['_restoreViewport']);
            expect(mockScene.background).toBe(originalBackground);
        });

        it('should handle viewport and rendering correctly', () => {
            const originalBackground = new Color(0x000000);
            mockScene.background = originalBackground;

            orientationDisplay.tick();

            expect(
                mockRenderer.webgpurenderer.getViewport,
            ).toHaveBeenCalledWith(orientationDisplay['_restoreViewport']);
            expect(
                mockRenderer.webgpurenderer.setViewport,
            ).toHaveBeenCalledWith(0, 450, 150, 150);
            expect(mockRenderer.webgpurenderer.render).toHaveBeenCalledWith(
                mockScene,
                orientationDisplay['_orthographicCamera'],
            );
            expect(
                mockRenderer.webgpurenderer.setViewport,
            ).toHaveBeenCalledWith(orientationDisplay['_restoreViewport']);
            expect(mockScene.background).toBe(originalBackground);
        });

        it('should handle null background', () => {
            mockScene.background = null;

            orientationDisplay.tick();

            expect(mockScene.background).toBeNull();
        });

        it('should call setFromCameraMatrix on axes with camera matrix', () => {
            const setFromCameraMatrixSpy = vi.spyOn(
                orientationDisplay['_axes'],
                'setFromCameraMatrix',
            );

            orientationDisplay.tick();

            // the world matrix: the camera's own local one is identity, because it
            // sits at its node's transform
            expect(setFromCameraMatrixSpy).toHaveBeenCalledWith(
                mockCameraComponent.camera.matrixWorld,
            );
        });

        it('should restore the previous autoClear property', () => {
            mockRenderer.webgpurenderer.autoClear = false;

            orientationDisplay.tick();

            expect(mockRenderer.webgpurenderer.autoClear).toBe(false);
        });

        it('should fall back to the stored viewport height when canvas height is unavailable', () => {
            (mockRenderer.webgpurenderer as any).domElement =
                undefined as unknown as HTMLCanvasElement;

            orientationDisplay.tick();

            expect(
                mockRenderer.webgpurenderer.setViewport,
            ).toHaveBeenCalledWith(0, 450, 150, 150);
        });
    });
});
