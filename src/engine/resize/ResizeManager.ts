import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderPipeline } from '../renderer/Renderer.ts';

export class DIVEResizeManager {
    private _resizeObserver: ResizeObserver;
    private _width: number = 0;
    private _height: number = 0;

    constructor(renderer: DIVERenderPipeline, camera: DIVEPerspectiveCamera) {
        this._resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (width === this._width && height === this._height) continue;

                renderer.onResize(width, height);
                camera.onResize(width, height);
                this._width = width;
                this._height = height;
            }
        });

        this._observeCanvas(renderer.webglrenderer.domElement);
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._resizeObserver.disconnect();
        this._observeCanvas(canvas);
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
