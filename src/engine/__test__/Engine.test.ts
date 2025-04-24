import { DIVEEngine, EngineSettings } from '../Engine';

const mockCanvasElement = {
    parentElement: {
        clientWidth: 800,
        clientHeight: 600,
    } as HTMLElement,
} as HTMLCanvasElement;

const mockRendererInstance = {
    OnResize: jest.fn(),
    AddPreRenderCallback: jest.fn((callback: () => void) => {
        callback();
        callback();
        mockRendererInstance.domElement = {
            parentElement: undefined,
        } as unknown as HTMLCanvasElement;
        callback();
        return 'resize-observer-id';
    }),
    StartRenderer: jest.fn(),
    RemovePreRenderCallback: jest.fn(),
    dispose: jest.fn(),
    domElement: mockCanvasElement,
};

const mockSceneInstance = {};

const mockCameraInstance = {
    OnResize: jest.fn(),
};

jest.mock('../renderer/Renderer', () => ({
    DIVERenderer: jest.fn().mockImplementation(() => mockRendererInstance),
}));

jest.mock('../scene/Scene', () => ({
    DIVEScene: jest.fn().mockImplementation(() => mockSceneInstance),
}));

jest.mock('../camera/PerspectiveCamera', () => ({
    DIVEPerspectiveCamera: jest
        .fn()
        .mockImplementation(() => mockCameraInstance),
}));

describe('Engine', () => {
    let engine: DIVEEngine;

    beforeEach(() => {
        engine = new DIVEEngine();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('initialization', () => {
        it('should initialize with default settings when no settings are provided', () => {
            expect(engine).toBeDefined();
            expect(engine.renderer).toBeDefined();
            expect(engine.scene).toBeDefined();
            expect(engine.perspectiveCamera).toBeDefined();
        });

        it('should initialize with custom settings when provided', () => {
            const customSettings: Partial<EngineSettings> = {
                autoResize: false,
                autoStart: false,
                displayAxes: true,
            };

            engine = new DIVEEngine(customSettings);
            expect(engine).toBeDefined();
        });
    });

    describe('resize handling', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should handle resize events correctly', () => {
            const width = 1024;
            const height = 768;

            engine.onResize(width, height);

            expect(mockRendererInstance.OnResize).toHaveBeenCalledWith(
                width,
                height,
            );
            expect(mockCameraInstance.OnResize).toHaveBeenCalledWith(
                width,
                height,
            );
        });

        it('should add resize observer when autoResize is true', () => {
            const settings: Partial<EngineSettings> = {
                autoResize: true,
            };

            engine = new DIVEEngine(settings);
            expect(
                mockRendererInstance.AddPreRenderCallback,
            ).toHaveBeenCalled();
        });

        it('should not add resize observer when autoResize is false', () => {
            const settings: Partial<EngineSettings> = {
                autoResize: false,
            };

            engine = new DIVEEngine(settings);
            expect(
                mockRendererInstance.AddPreRenderCallback,
            ).not.toHaveBeenCalled();
        });
    });

    describe('disposal', () => {
        it('should properly dispose of resources', () => {
            engine.dispose();

            expect(
                mockRendererInstance.RemovePreRenderCallback,
            ).toHaveBeenCalledWith('resize-observer-id');
            expect(mockRendererInstance.dispose).toHaveBeenCalled();
        });
    });

    describe('getters', () => {
        it('should return the correct renderer instance', () => {
            expect(engine.renderer).toBe(mockRendererInstance);
        });

        it('should return the correct scene instance', () => {
            expect(engine.scene).toBe(mockSceneInstance);
        });

        it('should return the correct camera instance', () => {
            expect(engine.perspectiveCamera).toBe(mockCameraInstance);
        });
    });
});
