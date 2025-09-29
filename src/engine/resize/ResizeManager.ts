import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';

export class DIVEResizeManager {
    public readonly isDIVEResizeManager: true = true;

    private _resizeObserver: ResizeObserver;
    private _width: number = 0;
    private _height: number = 0;

    constructor(
        private _renderer: DIVERenderer,
        private _camera: DIVEPerspectiveCamera,
    ) {
        this._resizeObserver = new ResizeObserver((entries) => {
            // only one entry is expected
            const entry = entries[0];
            const { width, height } = entry.contentRect;
            if (width === this._width && height === this._height) {
                return;
            }

            // Update camera first to ensure correct aspect before drawing
            this._camera.onResize(width, height);
            this._renderer.onResize(width, height);
            this._width = width;
            this._height = height;

            // Draw immediately to avoid a brief transparent frame during rapid resizes
            this._renderer.render();
        });

        this._observeCanvas(this._renderer.canvas);
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._resizeObserver.disconnect();
        this._observeCanvas(canvas);
        const { width, height } = canvas.getBoundingClientRect();
        // Update camera first to ensure correct aspect before drawing
        this._camera.onResize(width, height);
        this._renderer.onResize(width, height);
        this._width = width;
        this._height = height;

        // Draw immediately to avoid a brief transparent frame
        this._renderer.render();
    }

    public dispose(): void {
        this._resizeObserver.disconnect();
    }

    private _observeCanvas(canvas: HTMLCanvasElement): void {
        if (canvas.parentElement) {
            this._resizeObserver.observe(canvas.parentElement);
        } else {
            const interval = setInterval(() => {
                if (canvas.parentElement) {
                    this._resizeObserver.observe(canvas.parentElement);
                    clearInterval(interval);
                }
            }, 16);
        }
    }
}
