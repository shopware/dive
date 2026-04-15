import { MathUtils } from 'three/webgpu';
import { DIVETicker } from '../clock/Clock.ts';
import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';
import { DIVECanvasLifecycleManager } from '../canvas/CanvasLifecycleManager.ts';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVERendererSettings } from '../renderer/Renderer.ts';

export class DIVEView implements DIVETicker {
    public readonly isDIVEView: true = true;

    public readonly uuid: string = MathUtils.generateUUID();

    private _paused: boolean = false;

    private _renderer: DIVERenderer;
    private _canvasLifecycleManager: DIVECanvasLifecycleManager;
    private _initPromise: Promise<void> | null = null;
    private _initAbortController: AbortController | null = null;

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

        this._canvasLifecycleManager = new DIVECanvasLifecycleManager(
            this._renderer.canvas,
            this._handleCanvasResize,
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

    public async init(): Promise<void> {
        if (this._renderer.initialized) {
            return this._renderer.init();
        }

        if (!this._initPromise) {
            const renderer = this._renderer;
            const canvas = renderer.canvas;
            const abortController = new AbortController();

            this._initAbortController = abortController;

            this._initPromise = (async () => {
                const stableLayout =
                    await this._canvasLifecycleManager.waitForRenderableCanvas(
                        canvas,
                        abortController.signal,
                    );

                if (
                    stableLayout === null ||
                    abortController.signal.aborted ||
                    renderer !== this._renderer
                ) {
                    return;
                }

                await renderer.init();

                if (
                    abortController.signal.aborted ||
                    renderer !== this._renderer
                ) {
                    return;
                }
            })().finally(() => {
                if (this._initAbortController === abortController) {
                    this._initAbortController = null;
                    this._initPromise = null;
                }
            });
        }

        return this._initPromise;
    }

    public dispose(): void {
        this._abortInit();
        this._initPromise = null;
        this._canvasLifecycleManager.dispose();
        this._renderer.dispose();
    }

    public onResize(width: number, height: number): void {
        this._renderer.onResize(width, height);
        this._camera.onResize(width, height);
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        const shouldReinitialize =
            this._renderer.initialized || this._initPromise !== null;

        this._abortInit();
        this._initPromise = null;
        this._renderer.setCanvas(canvas);
        this._canvasLifecycleManager.setCanvas(canvas);

        if (shouldReinitialize) {
            void this.init();
        }
    }

    // TODO: add methods to individually pause and resume the view
    public pause(): void {
        this._paused = true;
    }

    public resume(): void {
        this._paused = false;
    }

    private _abortInit(): void {
        this._initAbortController?.abort();
        this._initAbortController = null;
    }

    private _handleCanvasResize = (width: number, height: number): void => {
        this.onResize(width, height);
        this._renderer.render();
    };
}
