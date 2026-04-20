/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DIVECanvasLifecycleManager } from '../CanvasLifecycleManager.ts';

type CanvasState = {
    width: number;
    height: number;
    parent: HTMLElement | null;
    parentWidth: number;
    parentHeight: number;
};

describe('DIVECanvasLifecycleManager', () => {
    let onResize: ReturnType<typeof vi.fn>;
    let mockObserve: ReturnType<typeof vi.fn>;
    let mockDisconnect: ReturnType<typeof vi.fn>;
    let resizeObserverCallbacks: Array<
        (entries: ResizeObserverEntry[]) => void
    >;

    const advanceBootstrap = async (
        manager: DIVECanvasLifecycleManager,
        ticks = 1,
    ): Promise<void> => {
        for (let index = 0; index < ticks; index += 1) {
            manager.tick();
            await Promise.resolve();
        }
    };

    const createResizeEntry = (
        width: number,
        height: number,
    ): ResizeObserverEntry[] => [
        {
            contentRect: {
                width,
                height,
            },
        } as ResizeObserverEntry,
    ];

    const attachParentMetrics = (
        parent: HTMLElement,
        state: CanvasState,
    ): HTMLElement => {
        Object.defineProperty(parent, 'clientWidth', {
            get: () => state.parentWidth,
            configurable: true,
        });
        Object.defineProperty(parent, 'clientHeight', {
            get: () => state.parentHeight,
            configurable: true,
        });
        parent.getBoundingClientRect = vi.fn(() => ({
            width: state.parentWidth,
            height: state.parentHeight,
            top: 0,
            left: 0,
            right: state.parentWidth,
            bottom: state.parentHeight,
            x: 0,
            y: 0,
            toJSON: () => ({}),
        })) as any;

        return parent;
    };

    const createParent = (state: CanvasState): HTMLElement =>
        attachParentMetrics(document.createElement('div'), state);

    const createCanvas = (
        width: number,
        height: number,
        parent: HTMLElement | null = null,
    ): { canvas: HTMLCanvasElement; state: CanvasState } => {
        const canvas = document.createElement('canvas');
        const state: CanvasState = {
            width,
            height,
            parent: null,
            parentWidth: width,
            parentHeight: height,
        };

        state.parent = parent
            ? attachParentMetrics(parent, state)
            : createParent(state);

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
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('waits for a parent and stable layout before resolving', async () => {
        const { canvas, state } = createCanvas(0, 0, null);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 2);
        expect(mockObserve).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();

        state.parent = createParent(state);
        state.width = 1024;
        state.height = 768;
        state.parentWidth = 1024;
        state.parentHeight = 768;

        await advanceBootstrap(manager, 1);
        expect(mockObserve).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(manager, 1);
        expect(mockObserve).toHaveBeenCalledWith(state.parent);
        expect(mockObserve).not.toHaveBeenCalledWith(canvas);
        expect(onResize).toHaveBeenCalledWith(1024, 768);
        await expect(waitPromise).resolves.toEqual({
            width: 1024,
            height: 768,
        });
    });

    it('resets stabilization when the parent changes before the layout is confirmed', async () => {
        const firstParent = document.createElement('div');
        const secondParent = document.createElement('div');
        const { canvas, state } = createCanvas(800, 600, firstParent);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 1);
        state.parent = secondParent;

        await advanceBootstrap(manager, 1);
        expect(mockObserve).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(manager, 1);
        expect(mockObserve).toHaveBeenCalledWith(secondParent);
        expect(mockObserve).not.toHaveBeenCalledWith(canvas);
        expect(onResize).toHaveBeenCalledWith(800, 600);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
    });

    it('clears stabilization when a renderable layout drops back to zero', async () => {
        const { canvas, state } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 1);
        state.width = 0;
        state.height = 0;
        state.parentWidth = 0;
        state.parentHeight = 0;

        await advanceBootstrap(manager, 1);
        expect(mockObserve).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();

        state.width = 800;
        state.height = 600;
        state.parentWidth = 800;
        state.parentHeight = 600;

        await advanceBootstrap(manager, 1);
        expect(mockObserve).not.toHaveBeenCalled();

        await advanceBootstrap(manager, 1);
        expect(mockObserve).toHaveBeenCalledWith(state.parent);
        expect(mockObserve).not.toHaveBeenCalledWith(canvas);
        expect(onResize).toHaveBeenCalledWith(800, 600);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
    });

    it('falls back to client sizes when parent and canvas rect APIs are unavailable', async () => {
        const { canvas, state } = createCanvas(320, 240);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForHealthyCanvas(canvas);

        state.parentWidth = 0;
        state.parentHeight = 0;

        Object.defineProperty(
            state.parent as HTMLElement,
            'getBoundingClientRect',
            {
                value: undefined,
                configurable: true,
            },
        );
        Object.defineProperty(canvas, 'getBoundingClientRect', {
            value: undefined,
            configurable: true,
        });

        await advanceBootstrap(manager, 2);
        expect(onResize).toHaveBeenCalledWith(320, 240);
        await expect(waitPromise).resolves.toEqual({ width: 320, height: 240 });
    });

    it('deduplicates observer resizes and ignores non-renderable observer updates', async () => {
        const { canvas, state } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 2);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
        expect(onResize).toHaveBeenCalledTimes(1);

        resizeObserverCallbacks[0]?.(createResizeEntry(800, 600));
        expect(onResize).toHaveBeenCalledTimes(1);

        state.parentWidth = 0;
        state.parentHeight = 0;
        resizeObserverCallbacks[0]?.(createResizeEntry(0, 0));
        expect(onResize).toHaveBeenCalledTimes(1);

        state.parentWidth = 1200;
        state.parentHeight = 900;
        resizeObserverCallbacks[0]?.(createResizeEntry(1200, 900));
        expect(onResize).toHaveBeenCalledTimes(2);
        expect(onResize).toHaveBeenLastCalledWith(1200, 900);
    });

    it('invalidates a healthy canvas when the observer reports a non-renderable layout', async () => {
        const { canvas, state } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const initialWait = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 2);
        await expect(initialWait).resolves.toEqual({ width: 800, height: 600 });

        vi.mocked(onResize).mockClear();
        vi.mocked(mockDisconnect).mockClear();

        state.width = 0;
        state.height = 0;
        state.parentWidth = 0;
        state.parentHeight = 0;

        resizeObserverCallbacks[0]?.(createResizeEntry(0, 0));

        expect(onResize).not.toHaveBeenCalled();
        expect(mockDisconnect).toHaveBeenCalledTimes(1);

        const waitPromise = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 1);
        expect(onResize).not.toHaveBeenCalled();

        state.width = 800;
        state.height = 600;
        state.parentWidth = 800;
        state.parentHeight = 600;

        await advanceBootstrap(manager, 1);
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(manager, 1);
        expect(onResize).toHaveBeenCalledWith(800, 600);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
    });

    it('restarts bootstrap and re-emits the initial resize when switching to an equally sized canvas', async () => {
        const first = createCanvas(800, 600);
        const second = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(first.canvas, onResize);
        const firstWait = manager.waitForHealthyCanvas(first.canvas);

        await advanceBootstrap(manager, 2);
        await expect(firstWait).resolves.toEqual({ width: 800, height: 600 });

        vi.mocked(onResize).mockClear();
        vi.mocked(mockObserve).mockClear();

        manager.setCanvas(second.canvas);
        const secondWait = manager.waitForHealthyCanvas(second.canvas);

        expect(mockDisconnect).toHaveBeenCalledTimes(1);
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(manager, 1);
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(manager, 1);
        expect(mockObserve).toHaveBeenCalledWith(second.state.parent);
        expect(mockObserve).not.toHaveBeenCalledWith(second.canvas);
        expect(onResize).toHaveBeenCalledWith(800, 600);
        await expect(secondWait).resolves.toEqual({ width: 800, height: 600 });
    });

    it('reacts to parent-only resizes after bootstrap completes', async () => {
        const { canvas, state } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 2);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });

        vi.mocked(onResize).mockClear();

        state.parentWidth = 1024;
        state.parentHeight = 768;
        resizeObserverCallbacks[0]?.(createResizeEntry(1024, 768));

        expect(onResize).toHaveBeenCalledTimes(1);
        expect(onResize).toHaveBeenCalledWith(1024, 768);
    });

    it('returns a direct layout after bootstrap completes', async () => {
        const { canvas, state } = createCanvas(0, 0);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForHealthyCanvas(canvas);

        state.width = 800;
        state.height = 600;

        await advanceBootstrap(manager, 1);
        expect(onResize).not.toHaveBeenCalled();

        await advanceBootstrap(manager, 1);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
        await expect(manager.waitForHealthyCanvas(canvas)).resolves.toEqual({
            width: 800,
            height: 600,
        });
    });

    it('early-returns from tick while the current canvas remains valid', async () => {
        const { canvas } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 2);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });

        vi.mocked(mockObserve).mockClear();
        vi.mocked(mockDisconnect).mockClear();
        vi.mocked(onResize).mockClear();

        manager.tick();

        expect(mockObserve).not.toHaveBeenCalled();
        expect(mockDisconnect).not.toHaveBeenCalled();
        expect(onResize).not.toHaveBeenCalled();
    });

    it('starts a new bootstrap when a previously ready canvas loses its parent', async () => {
        const { canvas, state } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const firstWait = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 2);
        await expect(firstWait).resolves.toEqual({ width: 800, height: 600 });

        state.parent = null;
        const waitPromise = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 1);
        expect(mockObserve).toHaveBeenCalledTimes(1);
        expect(mockDisconnect).toHaveBeenCalledTimes(1);

        state.parent = createParent(state);

        await advanceBootstrap(manager, 2);
        await expect(waitPromise).resolves.toEqual({ width: 800, height: 600 });
    });

    it('shares the pending bootstrap between multiple waiters', async () => {
        const { canvas } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);

        const firstWait = manager.waitForHealthyCanvas(canvas);
        const secondWait = manager.waitForHealthyCanvas(canvas);

        await advanceBootstrap(manager, 2);

        await expect(firstWait).resolves.toEqual({ width: 800, height: 600 });
        await expect(secondWait).resolves.toEqual({ width: 800, height: 600 });
        expect(onResize).toHaveBeenCalledTimes(1);
    });

    it('returns null immediately for an aborted signal, a replaced canvas, or a disposed manager', async () => {
        const first = createCanvas(800, 600);
        const second = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(first.canvas, onResize);
        const aborted = new AbortController();

        aborted.abort();

        await expect(
            manager.waitForHealthyCanvas(first.canvas, aborted.signal),
        ).resolves.toBeNull();
        await expect(
            manager.waitForHealthyCanvas(second.canvas),
        ).resolves.toBeNull();

        manager.dispose();

        await expect(
            manager.waitForHealthyCanvas(first.canvas),
        ).resolves.toBeNull();
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

        const waitPromise = manager.waitForHealthyCanvas(
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

        await advanceBootstrap(manager, 2);
        expect(onResize).toHaveBeenCalledWith(640, 480);
    });

    it('resolves signaled waits successfully when the canvas becomes ready', async () => {
        const { canvas, state } = createCanvas(0, 0);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const abortController = new AbortController();
        const removeEventListenerSpy = vi.spyOn(
            abortController.signal,
            'removeEventListener',
        );

        const waitPromise = manager.waitForHealthyCanvas(
            canvas,
            abortController.signal,
        );

        state.width = 500;
        state.height = 400;

        await advanceBootstrap(manager, 2);
        await expect(waitPromise).resolves.toEqual({ width: 500, height: 400 });
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'abort',
            expect.any(Function),
        );
    });

    it('returns null from the private wait path when the provided signal is already aborted during an active bootstrap', async () => {
        const { canvas } = createCanvas(0, 0);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const abortController = new AbortController();
        const pendingBootstrap = manager.waitForHealthyCanvas(canvas);

        abortController.abort();

        await expect(
            manager.waitForHealthyCanvas(canvas, abortController.signal),
        ).resolves.toBeNull();

        manager.dispose();
        await expect(pendingBootstrap).resolves.toBeNull();
    });

    it('resolves pending waits with null when the canvas is replaced or disposed mid-bootstrap', async () => {
        const first = createCanvas(0, 0);
        const second = createCanvas(800, 600);

        const manager = new DIVECanvasLifecycleManager(first.canvas, onResize);
        const replaceWait = manager.waitForHealthyCanvas(first.canvas);

        manager.setCanvas(second.canvas);
        await expect(replaceWait).resolves.toBeNull();

        const disposeWait = manager.waitForHealthyCanvas(second.canvas);
        manager.dispose();
        await expect(disposeWait).resolves.toBeNull();
        expect(mockDisconnect).toHaveBeenCalledTimes(2);
    });

    it('ignores tick calls before bootstrap starts and after disposal', () => {
        const { canvas } = createCanvas(800, 600);
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);

        expect(() => manager.tick()).not.toThrow();

        manager.dispose();

        expect(() => manager.tick()).not.toThrow();
        expect(onResize).not.toHaveBeenCalled();
    });
});
