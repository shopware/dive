import { DIVEResizeManager } from '../ResizeManager.ts';
import { DIVERenderer } from '../../renderer/Renderer.ts';
import { DIVEPerspectiveCamera } from '../../camera/PerspectiveCamera.ts';
import { DIVEScene } from '../../scene/Scene.ts';

vi.mock('../../renderer/Renderer', () => {
    return {
        DIVERenderer: vi.fn(function (this: any) {
            return {
                canvas: {
                    parentElement: document.createElement('div'),
                    getBoundingClientRect: vi.fn().mockReturnValue({
                        width: 100,
                        height: 100,
                    }),
                },
                render: vi.fn(),
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
    let mockResizeObserver: ReturnType<typeof vi.fn>;
    let mockObserve: ReturnType<typeof vi.fn>;
    let mockDisconnect: ReturnType<typeof vi.fn>;

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
        Object.defineProperty(renderer.canvas, 'parentElement', {
            value: document.createElement('div'),
            writable: true,
        });

        resizeManager = new DIVEResizeManager(renderer, camera);
        vi.mocked(renderer.onResize).mockClear();
        vi.mocked(renderer.render).mockClear();
        vi.mocked(camera.onResize).mockClear();
    });

    it('should instantiate with components', () => {
        expect(resizeManager).toBeDefined();
        expect(mockResizeObserver).toHaveBeenCalled();
    });

    it('should observe canvas parent element', () => {
        expect(mockObserve).toHaveBeenCalledWith(renderer.canvas.parentElement);
    });

    it('should handle resize events', () => {
        const callback = mockResizeObserver.mock.calls[0][0];

        const width = 800;
        const height = 600;
        callback([{ contentRect: { width, height } }]);

        expect(camera.onResize).toHaveBeenCalledWith(width, height);
        expect(renderer.onResize).toHaveBeenCalledWith(width, height);
        expect(renderer.render).toHaveBeenCalled();
    });

    it('should not trigger resize if dimensions are the same', () => {
        const callback = mockResizeObserver.mock.calls[0][0];

        const width = 800;
        const height = 600;

        // First call
        callback([{ contentRect: { width, height } }]);

        // Second call with same dimensions
        callback([{ contentRect: { width, height } }]);

        expect(camera.onResize).toHaveBeenCalledTimes(1);
        expect(renderer.onResize).toHaveBeenCalledTimes(1);
        expect(renderer.render).toHaveBeenCalledTimes(1);
    });

    it('should dispose by disconnecting observer', () => {
        resizeManager.dispose();
        expect(mockDisconnect).toHaveBeenCalled();
    });

    it('should handle case when parent element is not immediately available', () => {
        // Clear previous instance
        resizeManager.dispose();

        // Mock parent element as null initially
        Object.defineProperty(renderer.canvas, 'parentElement', {
            value: null,
            writable: true,
        });

        // Mock setInterval
        vi.useFakeTimers();
        const mockSetInterval = vi.spyOn(global, 'setInterval');
        const mockClearInterval = vi.spyOn(global, 'clearInterval');

        // Create new instance
        resizeManager = new DIVEResizeManager(renderer, camera);

        // Verify setInterval was called
        expect(mockSetInterval).toHaveBeenCalled();

        // Simulate parent element becoming available
        Object.defineProperty(renderer.canvas, 'parentElement', {
            value: document.createElement('div'),
            writable: true,
        });

        // Fast-forward timers
        vi.advanceTimersByTime(16);

        // Verify observe was called with parent element
        expect(mockObserve).toHaveBeenCalledWith(renderer.canvas.parentElement);

        // Verify interval was cleared
        expect(mockClearInterval).toHaveBeenCalled();

        // Cleanup
        vi.useRealTimers();
    });

    it('should skip immediate resize when the canvas has no layout yet', () => {
        const zeroCanvas = document.createElement('canvas');

        Object.defineProperty(zeroCanvas, 'clientWidth', {
            value: 0,
            configurable: true,
        });
        Object.defineProperty(zeroCanvas, 'clientHeight', {
            value: 0,
            configurable: true,
        });
        zeroCanvas.getBoundingClientRect = vi.fn(() => ({
            width: 0,
            height: 0,
        })) as any;
        Object.defineProperty(zeroCanvas, 'parentElement', {
            value: document.createElement('div'),
            writable: true,
        });

        resizeManager.setCanvas(zeroCanvas);

        expect(camera.onResize).not.toHaveBeenCalled();
        expect(renderer.onResize).not.toHaveBeenCalled();
        expect(renderer.render).not.toHaveBeenCalled();
    });
});
