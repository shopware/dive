import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three')>();
    return { ...actual };
});
import { DIVEView } from '../View.ts';
import { DIVEScene } from '../../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../../camera/PerspectiveCamera.ts';
import { DIVERenderer } from '../../renderer/Renderer.ts';
import { DIVEResizeManager } from '../../resize/ResizeManager.ts';

// Mock dependencies
const mockRenderer = {
    render: vi.fn(),
    onResize: vi.fn(),
    dispose: vi.fn(),
    setCanvas: vi.fn(),
    canvas: {
        clientWidth: 800,
        clientHeight: 600,
        parentElement: document.createElement('div'),
    },
};

const mockResizeManager = {
    dispose: vi.fn(),
    setCanvas: vi.fn(),
};

const mockCamera = {
    onResize: vi.fn(),
    layers: {
        mask: 0,
    },
    position: { x: 0, y: 0, z: 0 },
    quaternion: { x: 0, y: 0, z: 0, w: 1 },
    up: { x: 0, y: 1, z: 0 },
    zoom: 1,
    aspect: 1,
    fov: 70,
    near: 0.1,
    far: 1000,
    updateProjectionMatrix: vi.fn(),
};

const mockScene = {
    add: vi.fn(),
    remove: vi.fn(),
    children: [],
    background: {},
    root: {
        floor: {
            setVisibility: vi.fn(),
        },
    },
    grid: {
        setVisibility: vi.fn(),
    },
    setBackground: vi.fn(),
};

// Mock the dependencies
vi.mock('../../renderer/Renderer.ts');
vi.mock('../../resize/ResizeManager.ts');
vi.mock('../../camera/PerspectiveCamera.ts');
vi.mock('../../scene/Scene.ts');

describe('DIVEView', () => {
    let view: DIVEView;

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup mock implementations
        vi.mocked(DIVERenderer).mockImplementation(() => mockRenderer as any);
        vi.mocked(DIVEResizeManager).mockImplementation(
            () => mockResizeManager as any,
        );
        vi.mocked(DIVEPerspectiveCamera).mockImplementation(
            () => mockCamera as any,
        );
        vi.mocked(DIVEScene).mockImplementation(() => mockScene as any);

        const scene = new DIVEScene();
        const camera = new DIVEPerspectiveCamera();
        view = new DIVEView(scene, camera, {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('constructor', () => {
        it('should instantiate with correct properties', () => {
            expect(view).toBeDefined();
            expect(view.isDIVEView).toBe(true);
            expect(view.uuid).toBeDefined();
        });

        it('should create renderer with correct parameters', () => {
            expect(DIVERenderer).toHaveBeenCalled();
        });

        it('should create resize manager with correct parameters', () => {
            expect(DIVEResizeManager).toHaveBeenCalled();
        });

        it('should initialize with paused state as false', () => {
            expect(view['_paused']).toBe(false);
        });
    });

    describe('properties', () => {
        it('should return renderer', () => {
            expect(view.renderer).toBe(mockRenderer);
        });

        it('should return camera', () => {
            expect(view.camera).toBe(mockCamera);
        });

        it('should return canvas from renderer', () => {
            expect(view.canvas).toBe(mockRenderer.canvas);
        });
    });

    describe('tick', () => {
        it('should call renderer.render when not paused', () => {
            view.tick();
            expect(mockRenderer.render).toHaveBeenCalledTimes(1);
        });

        it('should not call renderer.render when paused', () => {
            view.pause();
            view.tick();
            expect(mockRenderer.render).not.toHaveBeenCalled();
        });

        it('should resume rendering after being paused', () => {
            view.pause();
            view.tick();
            expect(mockRenderer.render).not.toHaveBeenCalled();

            view.resume();
            view.tick();
            expect(mockRenderer.render).toHaveBeenCalledTimes(1);
        });
    });

    describe('dispose', () => {
        it('should dispose resize manager and renderer', () => {
            view.dispose();
            expect(mockResizeManager.dispose).toHaveBeenCalledTimes(1);
            expect(mockRenderer.dispose).toHaveBeenCalledTimes(1);
        });
    });

    describe('onResize', () => {
        it('should call renderer and camera onResize with correct dimensions', () => {
            const width = 1024;
            const height = 768;

            view.onResize(width, height);

            expect(mockRenderer.onResize).toHaveBeenCalledWith(width, height);
            expect(mockCamera.onResize).toHaveBeenCalledWith(width, height);
        });

        it('should handle zero dimensions', () => {
            view.onResize(0, 0);

            expect(mockRenderer.onResize).toHaveBeenCalledWith(0, 0);
            expect(mockCamera.onResize).toHaveBeenCalledWith(0, 0);
        });
    });

    describe('setCanvas', () => {
        it('should set canvas on renderer and resize manager', () => {
            const canvas = document.createElement('canvas');
            Object.defineProperty(canvas, 'clientWidth', {
                value: 1920,
                writable: false,
            });
            Object.defineProperty(canvas, 'clientHeight', {
                value: 1080,
                writable: false,
            });

            view.setCanvas(canvas);

            expect(mockRenderer.setCanvas).toHaveBeenCalledWith(canvas);
            expect(mockResizeManager.setCanvas).toHaveBeenCalledWith(canvas);
        });

        it('should call onResize with canvas dimensions', () => {
            const canvas = document.createElement('canvas');
            Object.defineProperty(canvas, 'clientWidth', {
                value: 1920,
                writable: false,
            });
            Object.defineProperty(canvas, 'clientHeight', {
                value: 1080,
                writable: false,
            });

            // Update the mock renderer's canvas dimensions to match the test canvas
            mockRenderer.canvas.clientWidth = 1920;
            mockRenderer.canvas.clientHeight = 1080;

            const onResizeSpy = vi.spyOn(view, 'onResize');

            view.setCanvas(canvas);

            expect(onResizeSpy).toHaveBeenCalledWith(1920, 1080);
        });
    });

    describe('pause and resume', () => {
        it('should pause the view', () => {
            expect(view['_paused']).toBe(false);

            view.pause();

            expect(view['_paused']).toBe(true);
        });

        it('should resume the view', () => {
            view.pause();
            expect(view['_paused']).toBe(true);

            view.resume();

            expect(view['_paused']).toBe(false);
        });

        it('should allow multiple pause/resume cycles', () => {
            view.pause();
            expect(view['_paused']).toBe(true);

            view.resume();
            expect(view['_paused']).toBe(false);

            view.pause();
            expect(view['_paused']).toBe(true);

            view.resume();
            expect(view['_paused']).toBe(false);
        });
    });

    describe('edge cases', () => {
        it('should handle undefined settings in constructor', () => {
            const scene = new DIVEScene();
            const camera = new DIVEPerspectiveCamera();
            const viewWithUndefinedSettings = new DIVEView(
                scene,
                camera,
                undefined as any,
            );
            expect(viewWithUndefinedSettings).toBeDefined();
        });

        it('should handle empty settings object in constructor', () => {
            const scene = new DIVEScene();
            const camera = new DIVEPerspectiveCamera();
            const viewWithEmptySettings = new DIVEView(scene, camera, {});
            expect(viewWithEmptySettings).toBeDefined();
        });

        it('should handle multiple dispose calls', () => {
            view.dispose();
            view.dispose();

            expect(mockResizeManager.dispose).toHaveBeenCalledTimes(2);
            expect(mockRenderer.dispose).toHaveBeenCalledTimes(2);
        });
    });

    describe('integration scenarios', () => {
        it('should handle full lifecycle: create, pause, resume, resize, dispose', () => {
            // Create
            expect(view).toBeDefined();

            // Pause
            view.pause();
            view.tick();
            expect(mockRenderer.render).not.toHaveBeenCalled();

            // Resume
            view.resume();
            view.tick();
            expect(mockRenderer.render).toHaveBeenCalledTimes(1);

            // Resize
            view.onResize(1920, 1080);
            expect(mockRenderer.onResize).toHaveBeenCalledWith(1920, 1080);
            expect(mockCamera.onResize).toHaveBeenCalledWith(1920, 1080);

            // Dispose
            view.dispose();
            expect(mockResizeManager.dispose).toHaveBeenCalledTimes(1);
            expect(mockRenderer.dispose).toHaveBeenCalledTimes(1);
        });

        it('should handle canvas replacement scenario', () => {
            const canvas1 = document.createElement('canvas');
            Object.defineProperty(canvas1, 'clientWidth', {
                value: 800,
                writable: false,
            });
            Object.defineProperty(canvas1, 'clientHeight', {
                value: 600,
                writable: false,
            });

            const canvas2 = document.createElement('canvas');
            Object.defineProperty(canvas2, 'clientWidth', {
                value: 1920,
                writable: false,
            });
            Object.defineProperty(canvas2, 'clientHeight', {
                value: 1080,
                writable: false,
            });

            view.setCanvas(canvas1);
            expect(mockRenderer.setCanvas).toHaveBeenCalledWith(canvas1);
            expect(mockResizeManager.setCanvas).toHaveBeenCalledWith(canvas1);

            view.setCanvas(canvas2);
            expect(mockRenderer.setCanvas).toHaveBeenCalledWith(canvas2);
            expect(mockResizeManager.setCanvas).toHaveBeenCalledWith(canvas2);
        });
    });
});
