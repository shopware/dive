import { DIVEEngine, EngineDefaultSettings } from '../Engine.ts';
import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderPipeline } from '../renderer/Renderer.ts';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVEResizeManager } from '../resize/ResizeManager.ts';
import { DIVEClock } from '../clock/Clock.ts';

// Add proper typing for Jest mocks
const MockDIVEScene = DIVEScene as jest.MockedClass<typeof DIVEScene>;
const MockDIVEPerspectiveCamera = DIVEPerspectiveCamera as jest.MockedClass<
    typeof DIVEPerspectiveCamera
>;
const MockDIVEClock = DIVEClock as jest.MockedClass<typeof DIVEClock>;
const MockDIVERenderPipeline = DIVERenderPipeline as jest.MockedClass<
    typeof DIVERenderPipeline
>;

jest.mock('../camera/PerspectiveCamera.ts', () => {
    return {
        DIVEPerspectiveCamera: jest.fn(),
    };
});

jest.mock('../renderer/Renderer.ts', () => {
    return {
        DIVERenderPipeline: jest.fn(function () {
            this.dispose = jest.fn();
            return this;
        }),
    };
});

jest.mock('../scene/Scene.ts', () => {
    return {
        DIVEScene: jest.fn(function () {
            return this;
        }),
    };
});

jest.mock('../resize/ResizeManager.ts', () => {
    return {
        DIVEResizeManager: jest.fn(function () {
            this.dispose = jest.fn();
            return this;
        }),
    };
});

jest.mock('../clock/Clock.ts', () => {
    return {
        DIVEClock: jest.fn(function () {
            this.addTicker = jest.fn();
            this.start = jest.fn();
            this.stop = jest.fn();
            this.dispose = jest.fn();
            this.setRenderer = jest.fn();
            return this;
        }),
    };
});

describe('DIVEEngine', () => {
    let engine: DIVEEngine;

    beforeEach(() => {
        jest.clearAllMocks();
        engine = new DIVEEngine();
    });

    it('should instantiate with default settings', () => {
        expect(engine).toBeDefined();
        expect(DIVEPerspectiveCamera).toHaveBeenCalledWith(
            EngineDefaultSettings.perspectiveCamera,
        );
        expect(DIVERenderPipeline).toHaveBeenCalled();
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
            customSettings.perspectiveCamera,
        );
    });

    it('should provide access to components', () => {
        expect(engine.renderer).toBeDefined();
        expect(engine.scene).toBeDefined();
        expect(engine.camera).toBeDefined();
        expect(engine.clock).toBeDefined();

        // Verify the getters return the correct instances
        expect(engine.scene).toBe(MockDIVEScene.mock.instances[0]);
        expect(engine.camera).toBe(MockDIVEPerspectiveCamera.mock.instances[0]);
        expect(engine.clock).toBe(MockDIVEClock.mock.instances[0]);
        expect(engine.renderer).toBe(MockDIVERenderPipeline.mock.instances[0]);
    });

    it('should start and stop the engine', () => {
        const clock = (DIVEClock as jest.Mock).mock.instances[0];
        engine.start();
        expect(clock.start).toHaveBeenCalled();
        engine.stop();
        expect(clock.stop).toHaveBeenCalled();
    });

    it('should dispose all components', () => {
        const clock = (DIVEClock as jest.Mock).mock.instances[0];
        const resizeManager = (DIVEResizeManager as jest.Mock).mock
            .instances[0];
        const renderer = (DIVERenderPipeline as jest.Mock).mock.instances[0];

        engine.dispose();

        expect(clock.dispose).toHaveBeenCalled();
        expect(resizeManager.dispose).toHaveBeenCalled();
        expect(renderer.dispose).toHaveBeenCalled();
    });
});
