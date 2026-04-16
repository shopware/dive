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
    private _isCanvasHealthy: boolean = false;
    private _observedParent: HTMLElement | null = null;
    private _pendingStableLayout: DIVECanvasLayout | null = null;
    private _bootstrapPromise: Promise<DIVECanvasLayout | null> | null = null;
    private _resolveBootstrap:
        | ((layout: DIVECanvasLayout | null) => void)
        | null = null;

    constructor(
        canvas: HTMLCanvasElement,
        private _onResize: ResizeHandler,
    ) {
        this._canvas = canvas;

        this._resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;

            if (!this._hasRenderableSize(width, height)) {
                this._width = width;
                this._height = height;
                this._invalidateCanvasHealth();
                return;
            }

            this._applyResize(width, height);
        });
    }

    public tick(): void {
        if (this._disposed) {
            return;
        }

        this._checkCanvasHealth();
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._canvas = canvas;
        this._width = 0;
        this._height = 0;
        this._resizeObserver.disconnect();
        this._isCanvasHealthy = false;
        this._observedParent = null;
        this._pendingStableLayout = null;
        this._resolvePendingWaiters(null);
    }

    public async waitForRenderableCanvas(
        canvas: HTMLCanvasElement = this._canvas,
        signal?: AbortSignal,
    ): Promise<DIVECanvasLayout | null> {
        if (this._disposed || signal?.aborted || canvas !== this._canvas) {
            return null;
        }

        if (
            this._isCanvasHealthy &&
            canvas.parentElement !== null &&
            canvas.parentElement === this._observedParent &&
            this._hasRenderableSize(this._width, this._height)
        ) {
            return {
                width: this._width,
                height: this._height,
            };
        }

        if (!this._bootstrapPromise) {
            this._bootstrapPromise = new Promise((resolve) => {
                this._resolveBootstrap = resolve;
            });
        }

        const bootstrapPromise = this._bootstrapPromise;

        if (!signal) {
            return await bootstrapPromise;
        }

        return await new Promise((resolve) => {
            const onAbort = (): void => {
                signal.removeEventListener('abort', onAbort);
                resolve(null);
            };

            signal.addEventListener('abort', onAbort, { once: true });

            void bootstrapPromise.then((layout) => {
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
        this._isCanvasHealthy = false;
        this._resolvePendingWaiters(null);
        this._resizeObserver.disconnect();
    }

    private _checkCanvasHealth(): void {
        const canvas = this._canvas;
        const parent = canvas.parentElement;

        if (this._isCanvasHealthy) {
            if (
                parent === this._observedParent &&
                this._hasRenderableSize(this._width, this._height)
            ) {
                return;
            }

            this._invalidateCanvasHealth();
        }

        if (!parent) {
            return;
        }

        if (parent !== this._observedParent) {
            this._observedParent = parent;
            this._pendingStableLayout = null;
        }

        const layout = this._getCanvasLayout(canvas);

        if (!this._hasRenderableSize(layout.width, layout.height)) {
            this._pendingStableLayout = null;
            return;
        }

        if (
            this._pendingStableLayout === null ||
            this._pendingStableLayout.width !== layout.width ||
            this._pendingStableLayout.height !== layout.height
        ) {
            this._pendingStableLayout = layout;
            return;
        }

        this._resizeObserver.observe(canvas);
        this._applyResize(layout.width, layout.height);
        this._isCanvasHealthy = true;
        this._resolvePendingWaiters(layout);
    }

    private _applyResize(width: number, height: number): void {
        if (width === this._width && height === this._height) {
            return;
        }

        this._width = width;
        this._height = height;
        this._onResize(width, height);
    }

    private _hasRenderableSize(width: number, height: number): boolean {
        return width >= 1 && height >= 1;
    }

    private _getCanvasLayout(canvas: HTMLCanvasElement): DIVECanvasLayout {
        const rect = canvas.getBoundingClientRect?.() ?? {
            width: 0,
            height: 0,
        };

        return {
            width: Math.max(rect.width, canvas.clientWidth),
            height: Math.max(rect.height, canvas.clientHeight),
        };
    }

    private _invalidateCanvasHealth(): void {
        this._isCanvasHealthy = false;
        this._observedParent = null;
        this._pendingStableLayout = null;
        this._resizeObserver.disconnect();
    }

    private _resolvePendingWaiters(layout: DIVECanvasLayout | null): void {
        this._pendingStableLayout = null;

        const resolveBootstrap = this._resolveBootstrap;

        this._resolveBootstrap = null;
        this._bootstrapPromise = null;

        resolveBootstrap?.(layout);
    }
}
