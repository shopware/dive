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
    let resizeObserverCallbacks: Array<
        (entries: ResizeObserverEntry[]) => void
    >;

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
        resizeObserverCallbacks = [];

        vi.stubGlobal(
            'ResizeObserver',
            vi.fn().mockImplementation((callback) => {
                resizeObserverCallbacks.push(callback);
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
        vi.stubGlobal(
            'setInterval',
            globalThis.window?.setInterval?.bind(globalThis.window) ??
                globalThis.setInterval,
        );
        vi.stubGlobal(
            'clearInterval',
            globalThis.window?.clearInterval?.bind(globalThis.window) ??
                globalThis.clearInterval,
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

        resizeObserverCallbacks[0]?.([
            {
                contentRect: {
                    width: 0,
                    height: 0,
                },
            } as ResizeObserverEntry,
        ]);

        expect(onResize).not.toHaveBeenCalled();

        resizeObserverCallbacks[0]?.([
            {
                contentRect: {
                    width: 1024,
                    height: 768,
                },
            } as ResizeObserverEntry,
        ]);

        expect(onResize).toHaveBeenCalledWith(1024, 768);
    });

    it('falls back to zero layout when getBoundingClientRect is unavailable', () => {
        const canvas = createCanvas(0, 0);
        Object.defineProperty(canvas, 'getBoundingClientRect', {
            value: undefined,
            configurable: true,
        });

        manager = new DIVECanvasLifecycleManager(canvas, onResize);

        expect(onResize).not.toHaveBeenCalled();
    });

    it('deduplicates repeated resize events with identical dimensions', () => {
        const canvas = createCanvas(800, 600);

        manager = new DIVECanvasLifecycleManager(canvas, onResize);

        expect(onResize).toHaveBeenCalledTimes(1);

        resizeObserverCallbacks[0]?.([
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
        const waitObserverCallback = resizeObserverCallbacks[1];

        width = 800;
        height = 600;
        waitObserverCallback?.([
            {
                contentRect: {
                    width,
                    height,
                },
            } as ResizeObserverEntry,
        ]);

        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
    });

    it('returns the direct layout immediately once the canvas is already renderable', async () => {
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(800, 600, parent);
        const queuedAnimationFrames: FrameRequestCallback[] = [];
        parent.appendChild(canvas);
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) => {
                queuedAnimationFrames.push(callback);
                return queuedAnimationFrames.length;
            }),
        );

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
        expect(queuedAnimationFrames).toHaveLength(0);
    });

    it('resolves with null when waiting on a canvas that gets replaced', async () => {
        const firstCanvas = createCanvas(0, 0);
        const secondCanvas = createCanvas(800, 600);

        manager = new DIVECanvasLifecycleManager(firstCanvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(firstCanvas);

        manager.setCanvas(secondCanvas);

        await expect(waitPromise).resolves.toBeNull();
    });

    it('resolves immediately with null when waiting after dispose', async () => {
        const canvas = createCanvas(0, 0);

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        manager.dispose();

        await expect(
            manager.waitForRenderableCanvas(canvas),
        ).resolves.toBeNull();
    });

    it('resolves with null when the signal is already aborted before the stability frame wait starts', async () => {
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(0, 0, parent);
        const abortController = new AbortController();
        const queuedAnimationFrames: FrameRequestCallback[] = [];

        parent.appendChild(canvas);
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) => {
                queuedAnimationFrames.push(callback);
                return queuedAnimationFrames.length;
            }),
        );

        abortController.abort();
        manager = new DIVECanvasLifecycleManager(canvas, onResize);

        await expect(
            manager.waitForRenderableCanvas(canvas, abortController.signal),
        ).resolves.toBeNull();
        expect(queuedAnimationFrames).toHaveLength(0);
    });

    it('resolves with null when the signal flips to aborted exactly before the next frame helper runs', async () => {
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(0, 0, parent);
        const queuedAnimationFrames: FrameRequestCallback[] = [];
        let abortedReads = 0;
        const signal = {
            get aborted() {
                abortedReads += 1;
                return abortedReads >= 2;
            },
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        } as unknown as AbortSignal;

        parent.appendChild(canvas);
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) => {
                queuedAnimationFrames.push(callback);
                return queuedAnimationFrames.length;
            }),
        );

        manager = new DIVECanvasLifecycleManager(canvas, onResize);

        await expect(
            manager.waitForRenderableCanvas(canvas, signal),
        ).resolves.toBeNull();
        expect(queuedAnimationFrames).toHaveLength(0);
    });

    it('resolves waiting with null when the abort signal fires', async () => {
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(0, 0, parent);
        const abortController = new AbortController();

        parent.appendChild(canvas);
        manager = new DIVECanvasLifecycleManager(canvas, onResize);

        const waitPromise = manager.waitForRenderableCanvas(
            canvas,
            abortController.signal,
        );

        abortController.abort();

        await expect(waitPromise).resolves.toBeNull();
    });

    it('aborts through the outer wait listener after registration and ignores a later second finish attempt', async () => {
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(0, 0, parent);
        const abortController = new AbortController();
        const queuedAnimationFrames: FrameRequestCallback[] = [];
        let abortListener: (() => void) | undefined;
        const originalAddEventListener =
            abortController.signal.addEventListener.bind(
                abortController.signal,
            );

        vi.spyOn(abortController.signal, 'addEventListener').mockImplementation(
            ((
                type: string,
                listener: EventListenerOrEventListenerObject,
                options?: AddEventListenerOptions,
            ) => {
                abortListener = listener as () => void;
                return originalAddEventListener(
                    type,
                    listener as EventListener,
                    options,
                );
            }) as typeof abortController.signal.addEventListener,
        );

        parent.appendChild(canvas);
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) => {
                queuedAnimationFrames.push(callback);
                return queuedAnimationFrames.length;
            }),
        );

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(
            canvas,
            abortController.signal,
        );

        const initialFrame = queuedAnimationFrames.shift();
        initialFrame?.(performance.now());

        for (let attempt = 0; attempt < 5; attempt += 1) {
            if (resizeObserverCallbacks.length >= 2) {
                break;
            }

            await Promise.resolve();
        }

        expect(abortListener).toBeDefined();
        abortController.abort();
        abortListener?.();

        await expect(waitPromise).resolves.toBeNull();
    });

    it('removes abort listeners again after a non-aborted stability frame', async () => {
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(0, 0, parent);
        const abortController = new AbortController();
        const removeEventListenerSpy = vi.spyOn(
            abortController.signal,
            'removeEventListener',
        );
        const queuedAnimationFrames: FrameRequestCallback[] = [];

        parent.appendChild(canvas);
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) => {
                queuedAnimationFrames.push(callback);
                return queuedAnimationFrames.length;
            }),
        );

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(
            canvas,
            abortController.signal,
        );

        const initialFrame = queuedAnimationFrames.shift();
        initialFrame?.(performance.now());
        await Promise.resolve();

        manager.dispose();
        const tickFrame = queuedAnimationFrames.shift();
        tickFrame?.(performance.now());

        await expect(waitPromise).resolves.toBeNull();
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'abort',
            expect.any(Function),
        );
    });

    it('ignores zero-sized updates after a renderable canvas was already measured', () => {
        const canvas = createCanvas(800, 600);

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        expect(onResize).toHaveBeenCalledWith(800, 600);

        resizeObserverCallbacks[0]?.([
            {
                contentRect: {
                    width: 0,
                    height: 0,
                },
            } as ResizeObserverEntry,
        ]);

        expect(onResize).toHaveBeenCalledTimes(1);
    });

    it('keeps waiting on a detached zero-sized canvas until it is disposed', async () => {
        const canvas = createCanvas(0, 0, null);
        const queuedAnimationFrames: FrameRequestCallback[] = [];
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) => {
                queuedAnimationFrames.push(callback);
                return queuedAnimationFrames.length;
            }),
        );

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas();
        manager.dispose();

        await expect(waitPromise).resolves.toBeNull();
    });

    it('resolves immediately for a canvas with a usable layout', async () => {
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(800, 600, parent);
        const queuedAnimationFrames: FrameRequestCallback[] = [];
        parent.appendChild(canvas);
        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) => {
                queuedAnimationFrames.push(callback);
                return queuedAnimationFrames.length;
            }),
        );

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        await expect(manager.waitForRenderableCanvas()).resolves.toEqual({
            width: 800,
            height: 600,
        });
        expect(queuedAnimationFrames).toHaveLength(0);
    });

    it('resolves waiting with null after dispose', async () => {
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(0, 0, parent);
        parent.appendChild(canvas);

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        manager.dispose();
        resizeObserverCallbacks.at(-1)?.([
            {
                contentRect: {
                    width: 800,
                    height: 600,
                },
            } as ResizeObserverEntry,
        ]);

        await expect(waitPromise).resolves.toBeNull();
    });

    it('handles a canvas detaching between wait verification frames', async () => {
        vi.useFakeTimers();
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(0, 0, parent);

        parent.appendChild(canvas);

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        Object.defineProperty(canvas, 'parentElement', {
            value: null,
            writable: true,
        });
        Object.defineProperty(canvas, 'isConnected', {
            value: false,
            configurable: true,
        });

        await vi.advanceTimersByTimeAsync(0);
        manager.dispose();
        await vi.advanceTimersByTimeAsync(16);

        await expect(waitPromise).resolves.toBeNull();
        vi.useRealTimers();
    });

    it('ignores concurrent wait verifications while one verification is already pending', async () => {
        const parent = document.createElement('div');
        document.body.appendChild(parent);
        const canvas = createCanvas(0, 0, parent);
        let width = 0;
        let height = 0;
        const queuedAnimationFrames: FrameRequestCallback[] = [];
        const originalRequestAnimationFrame = global.requestAnimationFrame;

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

        vi.stubGlobal(
            'requestAnimationFrame',
            vi.fn((callback: FrameRequestCallback) => {
                queuedAnimationFrames.push(callback);
                return queuedAnimationFrames.length;
            }),
        );

        manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);
        const initialFrame = queuedAnimationFrames.shift();
        initialFrame?.(performance.now());
        for (let attempt = 0; attempt < 5; attempt += 1) {
            if (resizeObserverCallbacks.length >= 2) {
                break;
            }

            await Promise.resolve();
        }

        expect(resizeObserverCallbacks).toHaveLength(2);
        const waitObserver = resizeObserverCallbacks.at(-1);

        const baselineQueuedFrames = queuedAnimationFrames.length;

        waitObserver?.([
            {
                contentRect: {
                    width,
                    height,
                },
            } as ResizeObserverEntry,
        ]);
        await Promise.resolve();

        expect(queuedAnimationFrames).toHaveLength(baselineQueuedFrames);

        width = 800;
        height = 600;

        waitObserver?.([
            {
                contentRect: {
                    width,
                    height,
                },
            } as ResizeObserverEntry,
        ]);
        await Promise.resolve();

        expect(queuedAnimationFrames).toHaveLength(baselineQueuedFrames);

        for (const callback of queuedAnimationFrames.splice(0)) {
            callback(performance.now());
        }

        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
        vi.stubGlobal('requestAnimationFrame', originalRequestAnimationFrame);
    });
});
