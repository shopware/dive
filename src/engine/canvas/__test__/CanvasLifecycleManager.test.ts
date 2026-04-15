/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DIVECanvasLifecycleManager } from '../CanvasLifecycleManager.ts';

type CanvasState = {
    width: number;
    height: number;
    parent: HTMLElement | null;
};

describe('DIVECanvasLifecycleManager', () => {
    let onResize: ReturnType<typeof vi.fn>;
    let mockObserve: ReturnType<typeof vi.fn>;
    let mockDisconnect: ReturnType<typeof vi.fn>;
    let resizeObserverCallbacks: Array<
        (entries: ResizeObserverEntry[]) => void
    >;

    const advanceBootstrap = async (ticks = 1): Promise<void> => {
        await vi.advanceTimersByTimeAsync(16 * ticks);
    };

    const createResizeEntry = (
        width: number,
        height: number,
    ): ResizeObserverEntry[] =>
        [
            {
                contentRect: {
                    width,
                    height,
                },
            } as ResizeObserverEntry,
        ];

    const createCanvas = (
        width: number,
        height: number,
        parent: HTMLElement | null = document.createElement('div'),
    ): { canvas: HTMLCanvasElement; state: CanvasState } => {
        const canvas = document.createElement('canvas');
        const state: CanvasState = {
            width,
            height,
            parent,
        };

        Object.defineProperty(canvas, 'clientWidth', {
            get: () => state.width,
            configurable: true,
        });
        Object.defineProperty(canvas, 'clientHeight', {
            get: () => state.height,
            configurable: true,
        });
        Object.defineProperty(canvas, 'parentElement', {
            get: () => state.parent,
            configurable: true,
        });
        Object.defineProperty(canvas, 'isConnected', {
            get: () => state.parent !== null,
            configurable: true,
        });

        canvas.getBoundingClientRect = vi.fn(() => ({
            width: state.width,
            height: state.height,
            top: 0,
            left: 0,
            right: state.width,
            bottom: state.height,
            x: 0,
            y: 0,
            toJSON: () => ({}),
        })) as any;

        return {
            canvas,
            state,
        };
    };

    beforeEach(() => {
        vi.useFakeTimers();
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
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it('attaches the resize observer only after two stable bootstrap polls', async () => {
        const { canvas } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        expect(mockObserve).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(1);
        expect(mockObserve).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(1);
        expect(mockObserve).toHaveBeenCalledWith(canvas);
        expect(mockObserve).toHaveBeenCalledWith(canvas.parentElement);
        expect(onResize).toHaveBeenCalledWith(800, 600);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
    });

    it('resets bootstrap stabilization when the parent changes before observation attaches', async () => {
        const firstParent = document.createElement('div');
        const secondParent = document.createElement('div');
        const { canvas, state } = createCanvas(800, 600, firstParent);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        await advanceBootstrap(1);
        state.parent = secondParent;

        await advanceBootstrap(1);
        expect(mockObserve).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(1);
        expect(mockObserve).toHaveBeenCalledWith(canvas);
        expect(mockObserve).toHaveBeenCalledWith(secondParent);
        expect(onResize).toHaveBeenCalledWith(800, 600);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
    });

    it('waits for a parent and a stable renderable layout before bootstrapping', async () => {
        const { canvas, state } = createCanvas(0, 0, null);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        await advanceBootstrap(2);
        expect(mockObserve).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();

        state.parent = document.createElement('div');
        state.width = 1024;
        state.height = 768;

        await advanceBootstrap(1);
        expect(mockObserve).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(1);
        expect(mockObserve).toHaveBeenCalledWith(canvas);
        expect(mockObserve).toHaveBeenCalledWith(state.parent);
        expect(onResize).toHaveBeenCalledWith(1024, 768);
        await expect(waitPromise).resolves.toEqual({ width: 1024, height: 768 });
    });

    it('clears pending stabilization when a renderable layout drops back to zero', async () => {
        const { canvas, state } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        await advanceBootstrap(1);

        state.width = 0;
        state.height = 0;

        await advanceBootstrap(1);
        expect(mockObserve).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();

        state.width = 800;
        state.height = 600;

        await advanceBootstrap(1);
        expect(mockObserve).not.toHaveBeenCalled();

        await advanceBootstrap(1);
        expect(mockObserve).toHaveBeenCalledWith(canvas);
        expect(mockObserve).toHaveBeenCalledWith(state.parent);
        expect(onResize).toHaveBeenCalledWith(800, 600);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
    });

    it('falls back to client sizes when getBoundingClientRect is unavailable', async () => {
        const { canvas } = createCanvas(320, 240);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        Object.defineProperty(canvas, 'getBoundingClientRect', {
            value: undefined,
            configurable: true,
        });

        await advanceBootstrap(2);
        expect(onResize).toHaveBeenCalledWith(320, 240);
        await expect(waitPromise).resolves.toEqual({ width: 320, height: 240 });
    });

    it('deduplicates observer resizes and ignores non-renderable observer updates', async () => {
        const { canvas } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);
        await advanceBootstrap(2);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });

        expect(onResize).toHaveBeenCalledTimes(1);

        resizeObserverCallbacks[0]?.(createResizeEntry(800, 600));
        expect(onResize).toHaveBeenCalledTimes(1);

        resizeObserverCallbacks[0]?.(createResizeEntry(0, 0));
        expect(onResize).toHaveBeenCalledTimes(1);

        resizeObserverCallbacks[0]?.(createResizeEntry(1200, 900));
        expect(onResize).toHaveBeenCalledTimes(2);
        expect(onResize).toHaveBeenLastCalledWith(1200, 900);
    });

    it('restarts bootstrap and re-emits the initial resize when switching to an equally sized canvas', async () => {
        const first = createCanvas(800, 600);
        const second = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(first.canvas, onResize);
        const firstWait = manager.waitForRenderableCanvas(first.canvas);

        await advanceBootstrap(2);
        await expect(firstWait).resolves.toEqual({ width: 800, height: 600 });
        vi.mocked(onResize).mockClear();
        vi.mocked(mockObserve).mockClear();

        manager.setCanvas(second.canvas);
        const secondWait = manager.waitForRenderableCanvas(second.canvas);

        expect(mockDisconnect).toHaveBeenCalledTimes(1);
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(1);
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(1);
        expect(mockObserve).toHaveBeenCalledWith(second.canvas);
        expect(mockObserve).toHaveBeenCalledWith(second.state.parent);
        expect(onResize).toHaveBeenCalledWith(800, 600);
        await expect(secondWait).resolves.toEqual({ width: 800, height: 600 });
    });

    it('waitForRenderableCanvas resolves after bootstrap completes and then returns direct layouts', async () => {
        const { canvas, state } = createCanvas(0, 0);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        state.width = 800;
        state.height = 600;

        await advanceBootstrap(1);
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(1);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
        await expect(manager.waitForRenderableCanvas(canvas)).resolves.toEqual({
            width: 800,
            height: 600,
        });
    });

    it('starts a new bootstrap when a previously ready canvas loses its parent', async () => {
        const { canvas, state } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const firstWait = manager.waitForRenderableCanvas(canvas);

        await advanceBootstrap(2);
        await expect(firstWait).resolves.toEqual({ width: 800, height: 600 });

        state.parent = null;
        const waitPromise = manager.waitForRenderableCanvas(canvas);

        await advanceBootstrap(1);
        expect(mockObserve).toHaveBeenCalledTimes(2);

        state.parent = document.createElement('div');

        await advanceBootstrap(2);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
    });

    it('returns null immediately for an aborted signal, a replaced canvas, or a disposed manager', async () => {
        const first = createCanvas(800, 600);
        const second = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(first.canvas, onResize);
        const aborted = new AbortController();

        aborted.abort();

        await expect(
            manager.waitForRenderableCanvas(first.canvas, aborted.signal),
        ).resolves.toBeNull();
        await expect(manager.waitForRenderableCanvas(second.canvas)).resolves.toBeNull();

        manager.dispose();

        await expect(manager.waitForRenderableCanvas(first.canvas)).resolves.toBeNull();
    });

    it('aborts an individual waiter without stopping the shared bootstrap', async () => {
        const { canvas, state } = createCanvas(0, 0);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const abortController = new AbortController();
        const addEventListenerSpy = vi.spyOn(
            abortController.signal,
            'addEventListener',
        );
        const removeEventListenerSpy = vi.spyOn(
            abortController.signal,
            'removeEventListener',
        );

        const waitPromise = manager.waitForRenderableCanvas(
            canvas,
            abortController.signal,
        );

        abortController.abort();
        await expect(waitPromise).resolves.toBeNull();

        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'abort',
            expect.any(Function),
            { once: true },
        );
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'abort',
            expect.any(Function),
        );

        state.width = 640;
        state.height = 480;

        await advanceBootstrap(2);
        expect(onResize).toHaveBeenCalledWith(640, 480);
    });

    it('resolves signaled waits successfully and falls back to null when no ready layout remains', async () => {
        const { canvas, state } = createCanvas(0, 0);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const abortController = new AbortController();
        const removeEventListenerSpy = vi.spyOn(
            abortController.signal,
            'removeEventListener',
        );

        const waitPromise = manager.waitForRenderableCanvas(
            canvas,
            abortController.signal,
        );

        state.width = 500;
        state.height = 400;

        await advanceBootstrap(2);
        await expect(waitPromise).resolves.toEqual({ width: 500, height: 400 });
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'abort',
            expect.any(Function),
        );

        state.width = 0;
        state.height = 0;

        (manager as any)._bootstrapPromise = Promise.resolve(null);

        await expect(manager.waitForRenderableCanvas(canvas)).resolves.toBeNull();
    });

    it('returns null from the private wait path when the provided signal is already aborted during an active bootstrap', async () => {
        const { canvas } = createCanvas(0, 0);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const abortController = new AbortController();
        const pendingBootstrap = manager.waitForRenderableCanvas(canvas);

        abortController.abort();

        await expect(
            manager.waitForRenderableCanvas(canvas, abortController.signal),
        ).resolves.toBeNull();

        manager.dispose();
        await expect(pendingBootstrap).resolves.toBeNull();
    });

    it('returns null from the inlined bootstrap wait when the abort signal flips on the second read', async () => {
        const { canvas } = createCanvas(0, 0);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const pendingBootstrap = manager.waitForRenderableCanvas(canvas);
        let abortedReads = 0;
        const signal = {
            get aborted() {
                abortedReads += 1;
                return abortedReads >= 2;
            },
        } as AbortSignal;

        await expect(manager.waitForRenderableCanvas(canvas, signal)).resolves.toBeNull();

        manager.dispose();
        await expect(pendingBootstrap).resolves.toBeNull();
    });

    it('resolves pending waits with null when the canvas is replaced or disposed mid-bootstrap', async () => {
        const first = createCanvas(0, 0);
        const second = createCanvas(800, 600);

        const manager = new DIVECanvasLifecycleManager(first.canvas, onResize);
        const replaceWait = manager.waitForRenderableCanvas(first.canvas);

        manager.setCanvas(second.canvas);
        await expect(replaceWait).resolves.toBeNull();

        const disposeWait = manager.waitForRenderableCanvas(second.canvas);
        manager.dispose();
        await expect(disposeWait).resolves.toBeNull();
        expect(mockDisconnect).toHaveBeenCalledTimes(2);
    });

    it('does not create duplicate bootstrap intervals and ignores observe requests after disposal', async () => {
        const { canvas } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');

        const firstWait = manager.waitForRenderableCanvas(canvas);
        const secondWait = manager.waitForRenderableCanvas(canvas);

        expect(setIntervalSpy).toHaveBeenCalledTimes(1);

        await advanceBootstrap(2);
        await expect(firstWait).resolves.toEqual({ width: 800, height: 600 });
        await expect(secondWait).resolves.toEqual({ width: 800, height: 600 });

        manager.dispose();
        await expect(manager.waitForRenderableCanvas(canvas)).resolves.toBeNull();
        expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    });

    it('handles an internal disposed flip during the bootstrap interval and can resolve direct layout fallbacks', async () => {
        const { canvas } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const pendingBootstrap = manager.waitForRenderableCanvas(canvas);

        (manager as any)._disposed = true;
        await advanceBootstrap(1);
        await expect(pendingBootstrap).resolves.toBeNull();

        (manager as any)._disposed = false;
        (manager as any)._observedParent = canvas.parentElement;
        await expect(manager.waitForRenderableCanvas(canvas)).resolves.toEqual({
            width: 800,
            height: 600,
        });

        (manager as any)._completeBootstrap(null);
    });

    it('returns null from the inline ready-layout fallback when the canvas is observed but still zero-sized', async () => {
        const { canvas, state } = createCanvas(0, 0);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        let storedBootstrapPromise: Promise<null> | null = null;

        (manager as any)._observedParent = state.parent;
        Object.defineProperty(manager as any, '_bootstrapPromise', {
            get: () => storedBootstrapPromise,
            set: (value: Promise<null>) => {
                storedBootstrapPromise = Promise.resolve(null);
                void value;
            },
            configurable: true,
        });

        await expect(manager.waitForRenderableCanvas(canvas)).resolves.toBeNull();
    });
});
