import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three')>();
    return { ...actual };
});

import { DIVEView } from '../View.ts';
import { DIVEScene } from '../../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../../camera/PerspectiveCamera.ts';
import { DIVERenderer } from '../../renderer/Renderer.ts';
import {
    DIVECanvasLifecycleManager,
    type DIVECanvasLayout,
} from '../../canvas/CanvasLifecycleManager.ts';

const mockRenderer = {
    initialized: false,
    init: vi.fn(async () => {
        mockRenderer.initialized = true;
    }),
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

const mockCanvasLifecycleManager = {
    dispose: vi.fn(),
    setCanvas: vi.fn(),
    waitForRenderableCanvas: vi.fn<
        (canvas?: HTMLCanvasElement) => Promise<DIVECanvasLayout | null>
    >(async () => ({
        width: 800,
        height: 600,
    })),
};
let lifecycleResizeHandler: ((width: number, height: number) => void) | null =
    null;

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

vi.mock('../../renderer/Renderer.ts');
vi.mock('../../canvas/CanvasLifecycleManager.ts');
vi.mock('../../camera/PerspectiveCamera.ts');
vi.mock('../../scene/Scene.ts');

describe('DIVEView', () => {
    let view: DIVEView;

    beforeEach(() => {
        vi.clearAllMocks();
        lifecycleResizeHandler = null;
        mockRenderer.initialized = false;
        mockRenderer.init.mockImplementation(async () => {
            mockRenderer.initialized = true;
        });
        mockCanvasLifecycleManager.waitForRenderableCanvas.mockResolvedValue({
            width: 800,
            height: 600,
        });

        vi.mocked(DIVERenderer).mockImplementation(() => mockRenderer as any);
        vi.mocked(DIVECanvasLifecycleManager).mockImplementation(
            (_canvas, onResize) => {
                lifecycleResizeHandler = onResize;
                return mockCanvasLifecycleManager as any;
            },
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

        it('should create a canvas lifecycle manager with a resize callback', () => {
            expect(DIVECanvasLifecycleManager).toHaveBeenCalledWith(
                mockRenderer.canvas,
                expect.any(Function),
            );
        });

        it('should initialize with paused state as false', () => {
            expect(view['_paused']).toBe(false);
        });

        it('should route lifecycle resize events through onResize and render', () => {
            lifecycleResizeHandler?.(640, 480);

            expect(mockRenderer.onResize).toHaveBeenCalledWith(640, 480);
            expect(mockCamera.onResize).toHaveBeenCalledWith(640, 480);
            expect(mockRenderer.render).toHaveBeenCalledTimes(1);
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

    describe('init', () => {
        it('should wait for the canvas before initializing the renderer', async () => {
            await view.init();

            expect(
                mockCanvasLifecycleManager.waitForRenderableCanvas,
            ).toHaveBeenCalledWith(mockRenderer.canvas);
            expect(mockRenderer.init).toHaveBeenCalledTimes(1);
        });

        it('should skip renderer initialization if the canvas wait resolves stale', async () => {
            mockCanvasLifecycleManager.waitForRenderableCanvas.mockResolvedValue(
                null,
            );

            await view.init();

            expect(mockRenderer.init).not.toHaveBeenCalled();
        });

        it('should reuse the pending init promise', async () => {
            let resolveInit: (() => void) | undefined;

            mockRenderer.init.mockImplementation(
                () =>
                    new Promise<void>((resolve) => {
                        resolveInit = () => {
                            mockRenderer.initialized = true;
                            resolve();
                        };
                    }),
            );

            const firstInit = view.init();
            const secondInit = view.init();
            await Promise.resolve();

            expect(mockRenderer.init).toHaveBeenCalledTimes(1);

            resolveInit?.();
            await Promise.all([
                firstInit,
                secondInit,
            ]);

            expect(mockRenderer.init).toHaveBeenCalledTimes(1);
        });

        it('should delegate to renderer.init when already initialized', async () => {
            mockRenderer.initialized = true;

            await view.init();

            expect(mockRenderer.init).toHaveBeenCalledTimes(1);
        });

        it('should abort completion when the view is disposed while renderer.init is pending', async () => {
            let resolveInit: (() => void) | undefined;

            mockRenderer.init.mockImplementation(
                () =>
                    new Promise<void>((resolve) => {
                        resolveInit = () => {
                            mockRenderer.initialized = true;
                            resolve();
                        };
                    }),
            );

            const initPromise = view.init();
            view.dispose();

            resolveInit?.();
            await initPromise;

            expect(view['_initPromise']).toBeNull();
        });

        it('should abort completion when renderer.init invalidates the view before it resolves', async () => {
            mockRenderer.init.mockImplementation(async () => {
                mockRenderer.initialized = true;
                view.dispose();
            });

            await view.init();

            expect(view['_initPromise']).toBeNull();
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
        it('should dispose the canvas lifecycle manager and renderer', () => {
            view.dispose();
            expect(mockCanvasLifecycleManager.dispose).toHaveBeenCalledTimes(1);
            expect(mockRenderer.dispose).toHaveBeenCalledTimes(1);
        });
    });

    describe('onResize', () => {
        it('should call renderer and camera onResize with correct dimensions', () => {
            view.onResize(1024, 768);

            expect(mockRenderer.onResize).toHaveBeenCalledWith(1024, 768);
            expect(mockCamera.onResize).toHaveBeenCalledWith(1024, 768);
        });

        it('should handle zero dimensions', () => {
            view.onResize(0, 0);

            expect(mockRenderer.onResize).toHaveBeenCalledWith(0, 0);
            expect(mockCamera.onResize).toHaveBeenCalledWith(0, 0);
        });
    });

    describe('setCanvas', () => {
        it('should set canvas on renderer and canvas lifecycle manager', () => {
            const canvas = document.createElement('canvas');

            view.setCanvas(canvas);

            expect(mockRenderer.setCanvas).toHaveBeenCalledWith(canvas);
            expect(mockCanvasLifecycleManager.setCanvas).toHaveBeenCalledWith(
                canvas,
            );
        });

        it('should not force an immediate onResize when swapping canvases', () => {
            const canvas = document.createElement('canvas');
            const onResizeSpy = vi.spyOn(view, 'onResize');

            view.setCanvas(canvas);

            expect(onResizeSpy).not.toHaveBeenCalled();
        });

        it('should reinitialize after a canvas swap when the renderer was already active', async () => {
            const initSpy = vi.spyOn(view, 'init').mockResolvedValue();
            mockRenderer.initialized = true;

            view.setCanvas(document.createElement('canvas'));

            expect(initSpy).toHaveBeenCalledTimes(1);
        });

        it('should reinitialize after a canvas swap when an init is pending', async () => {
            const initSpy = vi.spyOn(view, 'init').mockResolvedValue();
            view['_initPromise'] = Promise.resolve();

            view.setCanvas(document.createElement('canvas'));

            expect(initSpy).toHaveBeenCalledTimes(1);
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
    });
});
