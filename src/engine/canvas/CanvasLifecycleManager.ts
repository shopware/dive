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
    private _healthyCanvasPromise =
        new DIVEDeferredPromise<DIVECanvasLayout | null>();

    constructor(
        canvas: HTMLCanvasElement,
        private _onResize: ResizeHandler,
    ) {
        this._canvas = canvas;

        this._resizeObserver = new ResizeObserver(() => {
            if (this._disposed || !this._canvas.parentElement) return;

            const parentRect =
                this._canvas.parentElement.getBoundingClientRect() ?? {
                    width: 0,
                    height: 0,
                };

            const parentLayout = {
                width: Math.max(
                    parentRect.width,
                    this._canvas.parentElement.clientWidth,
                ),
                height: Math.max(
                    parentRect.height,
                    this._canvas.parentElement.clientHeight,
                ),
            };

            if (parentLayout.width > 0 && parentLayout.height > 0) {
                this._applyResize(parentLayout.width, parentLayout.height);
                this._healthyCanvasPromise.resolve(parentLayout);

                this._resizeObserver.disconnect();
            }
        });
    }

    public tick(): void {
        if (this._disposed) {
            return;
        }
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._canvas = canvas;
        this._width = 0;
        this._height = 0;
        this._resizeObserver.disconnect();
        this._healthyCanvasPromise.resolve(null);
        this._healthyCanvasPromise.reset();
    }

    public async waitForHealthyCanvas(
        canvas: HTMLCanvasElement = this._canvas,
        signal?: AbortSignal,
    ): Promise<DIVECanvasLayout | null> {
        if (signal?.aborted || canvas !== this._canvas) {
            return null;
        }

        if (this._disposed) {
            return Promise.reject(
                new Error('DIVECanvasLifecycleManager is disposed.'),
            );
        }

        const healthyCanvasPromise = this._healthyCanvasPromise.promise;

        if (!signal) {
            return await healthyCanvasPromise;
        }

        return await new Promise((resolve) => {
            const onAbort = (): void => {
                signal.removeEventListener('abort', onAbort);
                resolve(null);
            };

            signal.addEventListener('abort', onAbort, { once: true });

            void healthyCanvasPromise.then((layout) => {
                signal.removeEventListener('abort', onAbort);

                if (
                    this._disposed ||
                    signal.aborted ||
                    canvas !== this._canvas
                ) {
                    resolve(null);
                    return;
                }

                resolve(layout);
            });
        });
    }

    public dispose(): void {
        this._disposed = true;
        this._healthyCanvasPromise.resolve(null);
        this._resizeObserver.disconnect();
    }

    private _applyResize(width: number, height: number): void {
        if (width === this._width && height === this._height) {
            return;
        }

        this._width = width;
        this._height = height;
        this._onResize(width, height);
    }
}
