import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';

export class DIVEResizeManager {
    private _resizeObserver: ResizeObserver;
    private _width: number = 0;
    private _height: number = 0;

    constructor(renderer: DIVERenderer, camera: DIVEPerspectiveCamera) {
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

        const canvasWrapper = renderer.domElement.parentElement;
        if (canvasWrapper) {
            this._resizeObserver.observe(canvasWrapper);
        }
    }

    public dispose(): void {
        this._resizeObserver.disconnect();
    }
}
