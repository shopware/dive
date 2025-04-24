import { DIVEEngine, EngineDefaultSettings } from '../Engine.ts';
import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVERenderPipeline } from '../pipeline/RenderPipeline.ts';
import { DIVEResizeManager } from '../resize/ResizeManager.ts';
import { DIVEClock } from '../clock/Clock.ts';

jest.mock('../camera/PerspectiveCamera.ts', () => {
    return {
        DIVEPerspectiveCamera: jest.fn(),
    };
});

jest.mock('../renderer/Renderer.ts', () => {
    return {
        DIVERenderer: jest.fn(function () {
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

jest.mock('../pipeline/RenderPipeline.ts', () => {
    return {
        DIVERenderPipeline: jest.fn(function () {
            this.dispose = jest.fn();
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
        expect(DIVERenderer).toHaveBeenCalled();
        expect(DIVEScene).toHaveBeenCalled();
        expect(DIVERenderPipeline).toHaveBeenCalled();
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
        expect(engine.scene).toBeDefined();
        expect(engine.camera).toBeDefined();
        expect(engine.renderer).toBeDefined();
        expect(engine.pipeline).toBeDefined();
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
        const pipeline = (DIVERenderPipeline as jest.Mock).mock.instances[0];
        const renderer = (DIVERenderer as jest.Mock).mock.instances[0];

        engine.dispose();

        expect(clock.dispose).toHaveBeenCalled();
        expect(resizeManager.dispose).toHaveBeenCalled();
        expect(pipeline.dispose).toHaveBeenCalled();
        expect(renderer.dispose).toHaveBeenCalled();
    });
});
