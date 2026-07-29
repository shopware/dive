/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DIVECanvasLifecycleManager } from '../CanvasLifecycleManager.ts';

type ResizeCallback = (entries: ResizeObserverEntry[]) => void;

type CanvasFixture = {
    canvas: HTMLCanvasElement;
    parent: HTMLElement | null;
    setParent: (parent: HTMLElement | null) => void;
};

describe('DIVECanvasLifecycleManager', () => {
    let onResize: ReturnType<typeof vi.fn>;
    let mockObserve: ReturnType<typeof vi.fn>;
    let mockDisconnect: ReturnType<typeof vi.fn>;
    let resizeObserverCallbacks: ResizeCallback[];

    const createParent = (): HTMLElement => document.createElement('div');

    const createCanvas = (
        parent: HTMLElement | null = createParent(),
    ): CanvasFixture => {
        const canvas = document.createElement('canvas');
        let currentParent = parent;

        Object.defineProperty(canvas, 'parentElement', {
            get: () => currentParent,
            configurable: true,
        });

        return {
            canvas,
            parent,
            setParent: (nextParent) => {
                currentParent = nextParent;
            },
        };
    };

    const createResizeEntry = (
        target: Element,
        width: number,
        height: number,
        borderBoxSize?: { inlineSize: number; blockSize: number },
    ): ResizeObserverEntry =>
        ({
            target,
            borderBoxSize: borderBoxSize ? [borderBoxSize] : undefined,
            contentRect: {
                width,
                height,
            },
        }) as unknown as ResizeObserverEntry;

    beforeEach(() => {
        vi.clearAllMocks();

        onResize = vi.fn();
        mockObserve = vi.fn();
        mockDisconnect = vi.fn();
        resizeObserverCallbacks = [];

        vi.stubGlobal(
            'ResizeObserver',
            vi.fn().mockImplementation((callback: ResizeCallback) => {
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

    it('observes an existing parent and resolves when the parent reports a renderable layout', async () => {
        const { canvas, parent } = createCanvas();
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForHealthyCanvas();

        expect(mockObserve).toHaveBeenCalledWith(parent);
        expect(mockObserve).not.toHaveBeenCalledWith(canvas);

        resizeObserverCallbacks[0]?.([
            createResizeEntry(parent as HTMLElement, 800, 600),
        ]);

        expect(onResize).toHaveBeenCalledWith(800, 600);
        await expect(waitPromise).resolves.toEqual({
            width: 800,
            height: 600,
        });
    });

    it('uses border box sizes when the observer provides them', async () => {
        const { canvas, parent } = createCanvas();
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const waitPromise = manager.waitForHealthyCanvas();

        resizeObserverCallbacks[0]?.([
            createResizeEntry(parent as HTMLElement, 1, 1, {
                inlineSize: 640,
                blockSize: 480,
            }),
        ]);

        expect(onResize).toHaveBeenCalledWith(640, 480);
        await expect(waitPromise).resolves.toEqual({
            width: 640,
            height: 480,
        });
    });

    it('ignores unrelated targets, zero layouts, duplicate sizes, and disposed observer callbacks', () => {
        const { canvas, parent } = createCanvas();
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);
        const otherParent = createParent();

        resizeObserverCallbacks[0]?.([
            createResizeEntry(otherParent, 800, 600),
            createResizeEntry(parent as HTMLElement, 0, 600),
            createResizeEntry(parent as HTMLElement, 800, 0),
        ]);

        expect(onResize).not.toHaveBeenCalled();

        resizeObserverCallbacks[0]?.([
            createResizeEntry(parent as HTMLElement, 800, 600),
            createResizeEntry(parent as HTMLElement, 800, 600),
        ]);

        expect(onResize).toHaveBeenCalledTimes(1);

        manager.dispose();
        resizeObserverCallbacks[0]?.([
            createResizeEntry(parent as HTMLElement, 1024, 768),
        ]);

        expect(onResize).toHaveBeenCalledTimes(1);
        expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });

    it('polls until a parent is available', () => {
        const fixture = createCanvas(null);
        const manager = new DIVECanvasLifecycleManager(
            fixture.canvas,
            onResize,
        );

        expect(mockObserve).not.toHaveBeenCalled();

        manager.tick();
        expect(mockObserve).not.toHaveBeenCalled();

        const parent = createParent();
        fixture.setParent(parent);

        manager.tick();

        expect(mockObserve).toHaveBeenCalledWith(parent);
        expect(mockObserve).not.toHaveBeenCalledWith(fixture.canvas);
    });

    it('disconnects and observes the replacement canvas parent', () => {
        const first = createCanvas();
        const second = createCanvas();
        const manager = new DIVECanvasLifecycleManager(first.canvas, onResize);

        resizeObserverCallbacks[0]?.([
            createResizeEntry(first.parent as HTMLElement, 800, 600),
        ]);
        vi.mocked(onResize).mockClear();
        vi.mocked(mockObserve).mockClear();

        manager.setCanvas(second.canvas);

        expect(mockDisconnect).toHaveBeenCalledTimes(1);
        expect(mockObserve).toHaveBeenCalledWith(second.parent);

        resizeObserverCallbacks[0]?.([
            createResizeEntry(second.parent as HTMLElement, 800, 600),
        ]);

        expect(onResize).toHaveBeenCalledWith(800, 600);
    });

    it('polls after switching to a parentless canvas', () => {
        const first = createCanvas();
        const second = createCanvas(null);
        const manager = new DIVECanvasLifecycleManager(first.canvas, onResize);

        vi.mocked(mockObserve).mockClear();
        manager.setCanvas(second.canvas);

        expect(mockDisconnect).toHaveBeenCalledTimes(1);
        expect(mockObserve).not.toHaveBeenCalled();

        const parent = createParent();
        second.setParent(parent);
        manager.tick();

        expect(mockObserve).toHaveBeenCalledWith(parent);
    });

    it('ignores tick calls after disposal', () => {
        const fixture = createCanvas(null);
        const manager = new DIVECanvasLifecycleManager(
            fixture.canvas,
            onResize,
        );

        manager.dispose();
        fixture.setParent(createParent());
        manager.tick();

        expect(mockObserve).not.toHaveBeenCalled();
    });

    it('rejects waiters after disposal', async () => {
        const { canvas } = createCanvas();
        const manager = new DIVECanvasLifecycleManager(canvas, onResize);

        manager.dispose();

        await expect(manager.waitForHealthyCanvas()).rejects.toThrow(
            'DIVECanvasLifecycleManager is disposed.',
        );
    });
});
