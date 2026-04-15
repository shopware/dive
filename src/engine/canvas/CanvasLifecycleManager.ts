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
    private _bootstrapInterval: ReturnType<typeof setInterval> | null = null;
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
            this._applyResize(width, height);
        });
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._canvas = canvas;
        this._width = 0;
        this._height = 0;
        this._resizeObserver.disconnect();
        this._observedParent = null;
        this._pendingStableLayout = null;
        this._completeBootstrap(null);
    }

    public async waitForRenderableCanvas(
        canvas: HTMLCanvasElement = this._canvas,
        signal?: AbortSignal,
    ): Promise<DIVECanvasLayout | null> {
        if (this._disposed || signal?.aborted || canvas !== this._canvas) {
            return null;
        }

        if (
            !this._bootstrapPromise &&
            canvas === this._canvas &&
            canvas.parentElement !== null &&
            this._observedParent === canvas.parentElement
        ) {
            const layout = this._getCanvasLayout(canvas);

            if (this._hasRenderableSize(layout.width, layout.height)) {
                return layout;
            }
        }

        if (!this._bootstrapPromise) {
            this._bootstrapPromise = new Promise((resolve) => {
                this._resolveBootstrap = resolve;
            });

            this._bootstrapInterval = setInterval(() => {
                if (this._disposed) {
                    this._completeBootstrap(null);
                    return;
                }

                const currentCanvas = this._canvas;
                const parent = currentCanvas.parentElement;

                if (!parent) {
                    this._observedParent = null;
                    this._pendingStableLayout = null;
                    return;
                }

                if (parent !== this._observedParent) {
                    this._observedParent = parent;
                    this._pendingStableLayout = null;
                }

                const layout = this._getCanvasLayout(currentCanvas);

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

                this._resizeObserver.observe(currentCanvas);
                this._resizeObserver.observe(parent);
                this._applyResize(layout.width, layout.height);
                this._completeBootstrap(layout);
            }, 16);
        }

        const bootstrapPromise = this._bootstrapPromise!;

        if (!signal) {
            return await bootstrapPromise;
        }

        if (signal.aborted) {
            return null;
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
        this._completeBootstrap(null);
        this._resizeObserver.disconnect();
    }

    private _applyResize(width: number, height: number): void {
        if (width === this._width && height === this._height) {
            return;
        }

        this._width = width;
        this._height = height;

        if (!this._hasRenderableSize(width, height)) {
            return;
        }

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

    private _completeBootstrap(layout: DIVECanvasLayout | null): void {
        if (this._bootstrapInterval !== null) {
            clearInterval(this._bootstrapInterval);
            this._bootstrapInterval = null;
        }

        this._pendingStableLayout = null;

        const resolveBootstrap = this._resolveBootstrap;

        this._resolveBootstrap = null;
        this._bootstrapPromise = null;

        resolveBootstrap?.(layout);
    }
}
