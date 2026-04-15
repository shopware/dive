type ResizeHandler = (width: number, height: number) => void;

export type DIVECanvasLayout = {
    width: number;
    height: number;
};

const hasRenderableSize = (width: number, height: number): boolean =>
    width >= 1 && height >= 1;

const nextFrame = (): Promise<void> =>
    new Promise((resolve) => requestAnimationFrame(() => resolve()));

const getCanvasLayout = (canvas: HTMLCanvasElement): DIVECanvasLayout => {
    const rect = canvas.getBoundingClientRect?.() ?? {
        width: 0,
        height: 0,
    };

    return {
        width: Math.max(rect.width, canvas.clientWidth),
        height: Math.max(rect.height, canvas.clientHeight),
    };
};

const isRenderableCanvas = (canvas: HTMLCanvasElement): boolean => {
    if (!canvas.isConnected) {
        return false;
    }

    const { width, height } = getCanvasLayout(canvas);

    return hasRenderableSize(width, height);
};

const nextParentObservationInterval = (
    canvas: HTMLCanvasElement,
    observeParent: (parent: HTMLElement) => void,
): ReturnType<typeof setInterval> =>
    setInterval(() => {
        if (canvas.parentElement) {
            observeParent(canvas.parentElement);
        }
    }, 16);

export class DIVECanvasLifecycleManager {
    public readonly isDIVECanvasLifecycleManager: true = true;

    private _resizeObserver: ResizeObserver;
    private _width: number = 0;
    private _height: number = 0;
    private _canvas: HTMLCanvasElement;
    private _disposed: boolean = false;
    private _parentObservationInterval: ReturnType<typeof setInterval> | null =
        null;

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

        this._observeCanvas();
        this._syncCanvasSize();
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._canvas = canvas;
        this._disconnectParentObservation();
        this._resizeObserver.disconnect();
        this._observeCanvas();
        this._syncCanvasSize();
    }

    public async waitForRenderableCanvas(
        canvas: HTMLCanvasElement = this._canvas,
    ): Promise<DIVECanvasLayout | null> {
        const getStableLayout = async (): Promise<DIVECanvasLayout | null> => {
            if (
                this._disposed ||
                canvas !== this._canvas ||
                !isRenderableCanvas(canvas)
            ) {
                return null;
            }

            await nextFrame();

            if (
                this._disposed ||
                canvas !== this._canvas ||
                !isRenderableCanvas(canvas)
            ) {
                return null;
            }

            return getCanvasLayout(canvas);
        };

        const immediateLayout = await getStableLayout();

        if (immediateLayout) {
            return immediateLayout;
        }

        return new Promise((resolve) => {
            let settled = false;
            let verifyScheduled = false;
            let observedParent: HTMLElement | null = null;
            let rafId: number | null = null;

            const finish = (layout: DIVECanvasLayout | null): void => {
                settled = true;
                resizeObserver.disconnect();

                if (rafId !== null) {
                    cancelAnimationFrame(rafId);
                }

                resolve(layout);
            };

            const observeParent = (): void => {
                if (
                    !canvas.parentElement ||
                    observedParent === canvas.parentElement
                ) {
                    return;
                }

                observedParent = canvas.parentElement;
                resizeObserver.observe(observedParent);
            };

            const verify = async (): Promise<void> => {
                if (settled || verifyScheduled) {
                    return;
                }

                verifyScheduled = true;

                try {
                    if (this._disposed || canvas !== this._canvas) {
                        finish(null);
                        return;
                    }

                    observeParent();

                    const stableLayout = await getStableLayout();

                    if (stableLayout) {
                        finish(stableLayout);
                    }
                } finally {
                    verifyScheduled = false;
                }
            };

            const resizeObserver = new ResizeObserver(() => {
                observeParent();
                void verify();
            });

            resizeObserver.observe(canvas);
            observeParent();

            const tick = (): void => {
                if (settled) {
                    return;
                }

                observeParent();
                void verify();
                rafId = requestAnimationFrame(tick);
            };

            tick();
        });
    }

    public dispose(): void {
        this._disposed = true;
        this._disconnectParentObservation();
        this._resizeObserver.disconnect();
    }

    private _observeCanvas(): void {
        const canvas = this._canvas;

        if (canvas.parentElement) {
            this._resizeObserver.observe(canvas.parentElement);
            return;
        }

        this._parentObservationInterval = nextParentObservationInterval(
            canvas,
            (parent) => {
                this._resizeObserver.observe(parent);
                this._disconnectParentObservation();
            },
        );
    }

    private _disconnectParentObservation(): void {
        if (this._parentObservationInterval === null) {
            return;
        }

        clearInterval(this._parentObservationInterval);
        this._parentObservationInterval = null;
    }

    private _syncCanvasSize(): void {
        const canvas = this._canvas;
        const { width, height } = getCanvasLayout(canvas);
        this._applyResize(width, height);
    }

    private _applyResize(width: number, height: number): void {
        if (width === this._width && height === this._height) {
            return;
        }

        this._width = width;
        this._height = height;

        if (!hasRenderableSize(width, height)) {
            return;
        }

        this._onResize(width, height);
    }
}
