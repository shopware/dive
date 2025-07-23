import { DIVEResizeManager } from '../ResizeManager.ts';
import { DIVERenderer } from '../../renderer/Renderer.ts';
import { DIVEPerspectiveCamera } from '../../camera/PerspectiveCamera.ts';
import { DIVEScene } from '../../scene/Scene.ts';

vi.mock('../../renderer/Renderer', () => {
    return {
        DIVERenderPipeline: vi.fn(function (this: any) {
            return {
                webglrenderer: {
                    domElement: document.createElement('canvas'),
                },
                onResize: vi.fn(),
            };
        }),
    };
});

vi.mock('../../scene/Scene', () => {
    return {
        DIVEScene: vi.fn(function (this: any) {
            return {
                onResize: vi.fn(),
            };
        }),
    };
});

vi.mock('../../camera/PerspectiveCamera', () => {
    return {
        DIVEPerspectiveCamera: vi.fn(function (this: any) {
            return {
                onResize: vi.fn(),
            };
        }),
    };
});

vi.mock('../../camera/PerspectiveCamera', () => {
    return {
        DIVEPerspectiveCamera: vi.fn(function (this: any) {
            return {
                onResize: vi.fn(),
            };
        }),
    };
});

describe('DIVEResizeManager', () => {
    let resizeManager: DIVEResizeManager;
    let renderer: DIVERenderer;
    let camera: DIVEPerspectiveCamera;
    let mockResizeObserver: vi.Mock;
    let mockObserve: vi.Mock;
    let mockDisconnect: vi.Mock;

    beforeEach(() => {
        vi.clearAllMocks();
        renderer = new DIVERenderer(
            new DIVEScene(),
            new DIVEPerspectiveCamera(),
        );
        camera = new DIVEPerspectiveCamera();

        // Mock ResizeObserver
        mockObserve = vi.fn();
        mockDisconnect = vi.fn();
        mockResizeObserver = vi.fn().mockImplementation(() => ({
            observe: mockObserve,
            disconnect: mockDisconnect,
        }));
        global.ResizeObserver = mockResizeObserver;

        // Mock canvas parent element
        Object.defineProperty(
            renderer.webglrenderer.domElement,
            'parentElement',
            {
                value: document.createElement('div'),
                writable: true,
            },
        );

        resizeManager = new DIVEResizeManager(renderer, camera);
    });

    it('should instantiate with components', () => {
        expect(resizeManager).toBeDefined();
        expect(mockResizeObserver).toHaveBeenCalled();
    });

    it('should observe canvas parent element', () => {
        expect(mockObserve).toHaveBeenCalledWith(
            renderer.webglrenderer.domElement.parentElement,
        );
    });

    it('should handle resize events', () => {
        const resizeObserver = mockResizeObserver.mock.instances[0];
        const callback = mockResizeObserver.mock.calls[0][0];

        const width = 800;
        const height = 600;
        callback([{ contentRect: { width, height } }]);

        expect(renderer.onResize).toHaveBeenCalledWith(width, height);
        expect(camera.onResize).toHaveBeenCalledWith(width, height);
    });

    it('should not trigger resize if dimensions are the same', () => {
        const resizeObserver = mockResizeObserver.mock.instances[0];
        const callback = mockResizeObserver.mock.calls[0][0];

        const width = 800;
        const height = 600;

        // First call
        callback([{ contentRect: { width, height } }]);

        // Second call with same dimensions
        callback([{ contentRect: { width, height } }]);

        expect(renderer.onResize).toHaveBeenCalledTimes(1);
        expect(camera.onResize).toHaveBeenCalledTimes(1);
    });

    it('should dispose by disconnecting observer', () => {
        resizeManager.dispose();
        expect(mockDisconnect).toHaveBeenCalled();
    });

    it('should handle case when parent element is not immediately available', () => {
        // Clear previous instance
        resizeManager.dispose();

        // Mock parent element as null initially
        Object.defineProperty(
            renderer.webglrenderer.domElement,
            'parentElement',
            {
                value: null,
                writable: true,
            },
        );

        // Mock setInterval
        vi.useFakeTimers();
        const mockSetInterval = vi.spyOn(global, 'setInterval');
        const mockClearInterval = vi.spyOn(global, 'clearInterval');

        // Create new instance
        resizeManager = new DIVEResizeManager(renderer, camera);

        // Verify setInterval was called
        expect(mockSetInterval).toHaveBeenCalled();

        // Simulate parent element becoming available
        Object.defineProperty(
            renderer.webglrenderer.domElement,
            'parentElement',
            {
                value: document.createElement('div'),
                writable: true,
            },
        );

        // Fast-forward timers
        vi.advanceTimersByTime(16);

        // Verify observe was called with parent element
        expect(mockObserve).toHaveBeenCalledWith(
            renderer.webglrenderer.domElement.parentElement,
        );

        // Verify interval was cleared
        expect(mockClearInterval).toHaveBeenCalled();

        // Cleanup
        vi.useRealTimers();
    });
});
