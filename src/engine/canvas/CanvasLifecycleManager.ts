import { DIVEDeferredPromise } from '../promise/deferred/DeferredPromise.ts';

type ResizeHandler = (width: number, height: number) => void;

export type DIVECanvasLayout = {
    width: number;
    height: number;
};

export class DIVECanvasLifecycleManager {
    public readonly isDIVECanvasLifecycleManager: true = true;

    private _resizeObserver: ResizeObserver;
    private _width: number = 0;
    private _height: number = 0;
    private _canvas: HTMLCanvasElement;
    private _disposed: boolean = false;

    // is true initially but is set to false as soon as canvas has a parent
    private _pollCanvasParent: boolean = true;

    private _healthyCanvasPromise =
        new DIVEDeferredPromise<DIVECanvasLayout | null>();

    constructor(
        canvas: HTMLCanvasElement,
        private _onResize: ResizeHandler,
    ) {
        this._canvas = canvas;

        this._resizeObserver = new ResizeObserver((entries) => {
            if (this._disposed) return;

            entries.forEach((entry) => {
                console.log(
                    '[DIVECanvasLifecycleManager] ResizeObserver detected parent resize',
                );
                if (entry.target !== this._canvas.parentElement) return;

                const box = entry.borderBoxSize?.[0];
                const width = box?.inlineSize ?? entry.contentRect.width;
                const height = box?.blockSize ?? entry.contentRect.height;

                if (width > 0 && height > 0) {
                    console.log(
                        '[DIVECanvasLifecycleManager] Layout is healthy, applying resize',
                        { width, height },
                    );
                    this._applyResize(width, height);
                    this._healthyCanvasPromise.resolve({ width, height });
                }
            });
        });

        if (this._canvas.parentElement) {
            this._resizeObserver.observe(this._canvas.parentElement);
            this._pollCanvasParent = false;
        }
    }

    public tick(): void {
        if (this._disposed) {
            return;
        }

        if (this._pollCanvasParent) {
            if (this._canvas.parentElement) {
                this._resizeObserver.observe(this._canvas.parentElement);
                this._pollCanvasParent = false;
            }
        }
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._canvas = canvas;
        this._width = 0;
        this._height = 0;
        this._resizeObserver.disconnect();
        this._pollCanvasParent = true;

        if (this._canvas.parentElement) {
            console.log(
                '[DIVECanvasLifecycleManager] Canvas parent detected, observing for resize',
            );
            this._resizeObserver.observe(this._canvas.parentElement);
            this._pollCanvasParent = false;
        }
    }

    public async waitForHealthyCanvas(): Promise<DIVECanvasLayout | null> {
        if (this._disposed) {
            return Promise.reject(
                new Error('DIVECanvasLifecycleManager is disposed.'),
            );
        }

        return this._healthyCanvasPromise;
    }

    public dispose(): void {
        this._disposed = true;
        this._resizeObserver.disconnect();
    }

    private _applyResize(width: number, height: number): void {
        console.log('[DIVECanvasLifecycleManager] Applying resize', {
            width,
            height,
        });

        if (width === this._width && height === this._height) {
            return;
        }

        this._width = width;
        this._height = height;
        this._onResize(width, height);
    }
}
