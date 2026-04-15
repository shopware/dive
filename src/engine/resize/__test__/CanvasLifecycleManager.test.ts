/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DIVECanvasLifecycleManager } from '../CanvasLifecycleManager.ts';

describe('DIVECanvasLifecycleManager', () => {
    let manager: DIVECanvasLifecycleManager;
    let onResize: ReturnType<typeof vi.fn>;
    let mockObserve: ReturnType<typeof vi.fn>;
    let mockDisconnect: ReturnType<typeof vi.fn>;
    let resizeObserverCallback:
        | ((entries: ResizeObserverEntry[]) => void)
        | undefined;

    const createCanvas = (
        width: number,
        height: number,
        parent: HTMLElement | null = document.createElement('div'),
    ): HTMLCanvasElement => {
        const canvas = document.createElement('canvas');

        Object.defineProperty(canvas, 'clientWidth', {
            value: width,
            configurable: true,
        });
        Object.defineProperty(canvas, 'clientHeight', {
            value: height,
            configurable: true,
        });
        Object.defineProperty(canvas, 'parentElement', {
            value: parent,
            writable: true,
        });
        canvas.getBoundingClientRect = vi.fn(() => ({
            width,
            height,
            top: 0,
            left: 0,
            right: width,
            bottom: height,
            x: 0,
            y: 0,
            toJSON: () => ({}),
        })) as any;

        return canvas;
    };

    beforeEach(() => {
        vi.clearAllMocks();
        onResize = vi.fn();
        mockObserve = vi.fn();
        mockDisconnect = vi.fn();
        resizeObserverCallback = undefined;

        vi.stubGlobal(
            'ResizeObserver',
            vi.fn().mockImplementation((callback) => {
                resizeObserverCallback = callback;
                return {
                    observe: mockObserve,
                    disconnect: mockDisconnect,
                };
            }),
        );
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) =>
                setTimeout(() => callback(performance.now()), 0),
            ),
        );
        vi.stubGlobal(
            'cancelAnimationFrame',
            vi.fn((id: number) => clearTimeout(id)),
        );
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('observes the canvas parent and emits the initial size', () => {
        const canvas = createCanvas(800, 600);

        manager = new DIVECanvasLifecycleManager(canvas, onResize);

        expect(mockObserve).toHaveBeenCalledWith(canvas.parentElement);
        expect(onResize).toHaveBeenCalledWith(800, 600);
    });

    it('ignores zero-sized canvases until a non-zero resize arrives', () => {
        const canvas = createCanvas(0, 0);

        manager = new DIVECanvasLifecycleManager(canvas, onResize);

        expect(onResize).not.toHaveBeenCalled();

        resizeObserverCallback?.([
            {
                contentRect: {
                    width: 0,
                    height: 0,
                },
            } as ResizeObserverEntry,
        ]);

        expect(onResize).not.toHaveBeenCalled();

        resizeObserverCallback?.([
            {
                contentRect: {
                    width: 1024,
                    height: 768,
                },
            } as ResizeObserverEntry,
        ]);

        expect(onResize).toHaveBeenCalledWith(1024, 768);
    });

    it('deduplicates repeated resize events with identical dimensions', () => {
        const canvas = createCanvas(800, 600);

        manager = new DIVECanvasLifecycleManager(canvas, onResize);

        expect(onResize).toHaveBeenCalledTimes(1);

        resizeObserverCallback?.([
            {
                contentRect: {
                    width: 800,
                    height: 600,
                },
            } as ResizeObserverEntry,
        ]);

        expect(onResize).toHaveBeenCalledTimes(1);
    });

    it('can switch to a new canvas and observe its parent', () => {
        const firstCanvas = createCanvas(800, 600);
        const secondCanvas = createCanvas(1920, 1080);

        manager = new DIVECanvasLifecycleManager(firstCanvas, onResize);
        vi.mocked(mockObserve).mockClear();

        manager.setCanvas(secondCanvas);

        expect(mockDisconnect).toHaveBeenCalled();
        expect(mockObserve).toHaveBeenCalledWith(secondCanvas.parentElement);
        expect(onResize).toHaveBeenLastCalledWith(1920, 1080);
    });

    it('waits for a parent element to appear when one is not available immediately', () => {
        vi.useFakeTimers();
        const canvas = createCanvas(800, 600, null);
        const mockSetInterval = vi.spyOn(global, 'setInterval');
        const mockClearInterval = vi.spyOn(global, 'clearInterval');

        manager = new DIVECanvasLifecycleManager(canvas, onResize);

        expect(mockSetInterval).toHaveBeenCalled();

        Object.defineProperty(canvas, 'parentElement', {
            value: document.createElement('div'),
            writable: true,
        });

        vi.advanceTimersByTime(16);

        expect(mockObserve).toHaveBeenCalledWith(canvas.parentElement);
        expect(mockClearInterval).toHaveBeenCalled();

        vi.useRealTimers();
    });

    it('disconnects observers on dispose', () => {
        const canvas = createCanvas(800, 600);

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        manager.dispose();

        expect(mockDisconnect).toHaveBeenCalled();
    });

    it('waits for a connected canvas to reach a stable non-zero layout', async () => {
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(0, 0, parent);
        let width = 0;
        let height = 0;

        Object.defineProperty(canvas, 'clientWidth', {
            get: () => width,
            configurable: true,
        });
        Object.defineProperty(canvas, 'clientHeight', {
            get: () => height,
            configurable: true,
        });
        canvas.getBoundingClientRect = vi.fn(() => ({
            width,
            height,
            top: 0,
            left: 0,
            right: width,
            bottom: height,
            x: 0,
            y: 0,
            toJSON: () => ({}),
        })) as any;
        parent.appendChild(canvas);

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        width = 800;
        height = 600;
        resizeObserverCallback?.([
            {
                contentRect: {
                    width,
                    height,
                },
            } as ResizeObserverEntry,
        ]);

        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
    });

    it('resolves with null when waiting on a canvas that gets replaced', async () => {
        const firstCanvas = createCanvas(0, 0);
        const secondCanvas = createCanvas(800, 600);

        manager = new DIVECanvasLifecycleManager(firstCanvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(firstCanvas);

        manager.setCanvas(secondCanvas);

        await expect(waitPromise).resolves.toBeNull();
    });
});
