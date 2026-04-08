import { MathUtils } from 'three/webgpu';
import { DIVETicker } from '../clock/Clock.ts';
import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';
import { DIVEResizeManager } from '../resize/ResizeManager.ts';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVERendererSettings } from '../renderer/Renderer.ts';

export class DIVEView implements DIVETicker {
    public readonly isDIVEView: true = true;

    public readonly uuid: string = MathUtils.generateUUID();

    private _paused: boolean = false;

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
        if (this._paused) return;
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
        this._resizeManager.setCanvas(canvas);
        this.onResize(
            this._renderer.canvas.clientWidth,
            this._renderer.canvas.clientHeight,
        );
    }

    // TODO: add methods to individually pause and resume the view
    public pause(): void {
        this._paused = true;
    }

    public resume(): void {
        this._paused = false;
    }
}
