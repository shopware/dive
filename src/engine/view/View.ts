import {
    DIVEPerspectiveCamera,
    DIVERenderer,
    DIVERendererSettings,
    DIVEResizeManager,
    DIVEScene,
    DIVETicker,
} from '@shopware-ag/dive';
import { MathUtils } from 'three';

export class DIVEView implements DIVETicker {
    public readonly isDIVEView: true = true;

    public readonly uuid: string = MathUtils.generateUUID();

    private _renderer: DIVERenderer;
    private _resizeManager: DIVEResizeManager;

    constructor(
        private _scene: DIVEScene,
        private _camera: DIVEPerspectiveCamera,
        private _settings: Partial<DIVERendererSettings>,
    ) {
        this._renderer = new DIVERenderer(
            this._scene,
            this._camera,
            this._settings,
        );

        this._resizeManager = new DIVEResizeManager(
            this._renderer,
            this._camera,
        );
    }

    public get renderer(): DIVERenderer {
        return this._renderer;
    }

    public get camera(): DIVEPerspectiveCamera {
        return this._camera;
    }

    public get canvas(): HTMLCanvasElement {
        return this._renderer.canvas;
    }

    public tick(): void {
        this._renderer.render();
    }

    public dispose(): void {
        this._resizeManager.dispose();
        this._renderer.dispose();
    }

    public onResize(width: number, height: number): void {
        this._renderer.onResize(width, height);
        this._camera.onResize(width, height);
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        this._renderer.setCanvas(canvas);
        this.onResize(canvas.clientWidth, canvas.clientHeight);
    }
}
