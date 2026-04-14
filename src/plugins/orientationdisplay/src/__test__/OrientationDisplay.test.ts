import { Matrix4, Vector4, Color, Material } from 'three/webgpu';
import { OrientationDisplay } from '../OrientationDisplay.ts';
import {
    DIVERenderer,
    DIVEScene,
    COORDINATE_LAYER_MASK,
    DIVEPerspectiveCamera,
} from '@shopware-ag/dive';

vi.mock('three-spritetext', async () => {
    const { Object3D } = await vi.importActual<typeof import('three')>('three');

    class MockSpriteText extends Object3D {
        constructor(
            _text: string,
            _textHeight?: number,
            _color?: string | number,
        ) {
            super();
        }
    }

    return {
        default: MockSpriteText,
    };
});

const mockScene = {
    add: vi.fn(),
    remove: vi.fn(),
    background: null,
} as unknown as DIVEScene;

const mockCamera = {
    matrix: new Matrix4(),
} as unknown as DIVEPerspectiveCamera;

const mockCanvas = document.createElement('canvas');
Object.defineProperty(mockCanvas, 'clientHeight', {
    value: 600,
    configurable: true,
});

const mockRenderer = {
    render: vi.fn(),
    canvas: mockCanvas,
    webgpurenderer: {
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
        mockRenderer.webgpurenderer.autoClear = true;
        orientationDisplay = new OrientationDisplay(
            mockRenderer,
            mockScene,
            mockCamera,
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

            expect(setFromCameraMatrixSpy).toHaveBeenCalledWith(
                mockCamera.matrix,
            );
        });

        it('should restore the previous autoClear property', () => {
            mockRenderer.webgpurenderer.autoClear = false;

            orientationDisplay.tick();

            expect(mockRenderer.webgpurenderer.autoClear).toBe(false);
        });

        it('should fall back to the stored viewport height when canvas height is unavailable', () => {
            mockRenderer.webgpurenderer.domElement =
                undefined as unknown as HTMLCanvasElement;

            orientationDisplay.tick();

            expect(
                mockRenderer.webgpurenderer.setViewport,
            ).toHaveBeenCalledWith(0, 450, 150, 150);
        });
    });
});
