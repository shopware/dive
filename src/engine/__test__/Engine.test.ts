import { DIVEEngine, EngineDefaultSettings } from '../Engine.ts';
import {
    DIVEPerspectiveCamera,
    DIVEPerspectiveCameraDefaultSettings,
} from '../camera/PerspectiveCamera.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVEResizeManager } from '../resize/ResizeManager.ts';
import { DIVEClock } from '../clock/Clock.ts';

// Add proper typing for Jest mocks
const mockScene = {} as unknown as DIVEScene;
const mockPerspectiveCamera = {} as unknown as DIVEPerspectiveCamera;
const mockClock = {
    start: vi.fn(),
    stop: vi.fn(),
    dispose: vi.fn(),
    setRenderer: vi.fn(),
    addTicker: vi.fn(),
} as unknown as DIVEClock;
const mockRenderPipeline = {
    dispose: vi.fn(),
} as unknown as DIVERenderer;
const mockResizeManager = {
    dispose: vi.fn(),
} as unknown as DIVEResizeManager;

vi.mock('../camera/PerspectiveCamera', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('../camera/PerspectiveCamera.ts')>();
    return {
        ...actual,
        DIVEPerspectiveCamera: vi.fn(function (this: any) {
            return mockPerspectiveCamera;
        }),
    };
});

vi.mock('../renderer/Renderer', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('../renderer/Renderer.ts')>();
    return {
        ...actual,
        DIVERenderPipeline: vi.fn(function (this: any) {
            return mockRenderPipeline;
        }),
    };
});

vi.mock('../scene/Scene', () => {
    return {
        DIVEScene: vi.fn(function (this: any) {
            return mockScene;
        }),
    };
});

vi.mock('../resize/ResizeManager', () => {
    return {
        DIVEResizeManager: vi.fn(function (this: any) {
            return mockResizeManager;
        }),
    };
});

vi.mock('../clock/Clock', () => {
    return {
        DIVEClock: vi.fn(function (this: any) {
            return mockClock;
        }),
    };
});

describe('DIVEEngine', () => {
    let engine: DIVEEngine;

    beforeEach(() => {
        vi.clearAllMocks();
        engine = new DIVEEngine();
    });

    it('should instantiate with default settings', () => {
        expect(engine).toBeDefined();
        expect(DIVEPerspectiveCamera).toHaveBeenCalledWith(
            expect.objectContaining({
                ...EngineDefaultSettings,
                ...DIVEPerspectiveCameraDefaultSettings,
            }),
        );
        expect(DIVERenderer).toHaveBeenCalled();
        expect(DIVEScene).toHaveBeenCalled();
        expect(DIVEResizeManager).toHaveBeenCalled();
        expect(DIVEClock).toHaveBeenCalled();
    });

    it('should instantiate with custom settings', () => {
        const customSettings = {
            autoStart: false,
            displayAxes: true,
            perspectiveCamera: {
                fov: 45,
                near: 0.5,
                far: 2000,
            },
        };
        engine = new DIVEEngine(customSettings);
        expect(engine).toBeDefined();
        expect(DIVEPerspectiveCamera).toHaveBeenCalledWith(
            expect.objectContaining(customSettings),
        );
    });

    it('should provide access to components', () => {
        expect(engine.renderer).toBeDefined();
        expect(engine.scene).toBeDefined();
        expect(engine.camera).toBeDefined();
        expect(engine.clock).toBeDefined();

        // Verify the getters return the correct instances
        expect(engine.scene).toBe(mockScene);
        expect(engine.camera).toBe(mockPerspectiveCamera);
        expect(engine.clock).toBe(mockClock);
        expect(engine.renderer).toBe(mockRenderPipeline);
    });

    it('should start and stop the engine', () => {
        engine.start();
        expect(mockClock.start).toHaveBeenCalled();
        engine.stop();
        expect(mockClock.stop).toHaveBeenCalled();
    });

    it('should dispose all components', () => {
        engine.dispose();

        expect(mockClock.dispose).toHaveBeenCalled();
        expect(mockResizeManager.dispose).toHaveBeenCalled();
        expect(mockRenderPipeline.dispose).toHaveBeenCalled();
    });
});
