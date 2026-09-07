import { MathUtils } from 'three/webgpu';
import { DIVETicker } from '../clock/Clock.ts';
import { type DIVECameraComponent } from '../../components/camera/CameraComponent.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';
import { DIVECanvasLifecycleManager } from '../canvas/CanvasLifecycleManager.ts';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVERendererSettings } from '../renderer/Renderer.ts';
import { DIVEAbortablePromise } from '../promise/abortable/AbortablePromise.ts';

export class DIVEView implements DIVETicker {
    public readonly isDIVEView: true = true;

    public readonly uuid: string = MathUtils.generateUUID();

    private _paused: boolean = false;

    private _renderer: DIVERenderer;
    private _canvasLifecycleManager: DIVECanvasLifecycleManager;
    private _initPromise: DIVEAbortablePromise<void> | null = null;

    constructor(
        private _scene: DIVEScene,
        cameraComponent: DIVECameraComponent,
        private _settings: Partial<DIVERendererSettings>,
    ) {
        this._renderer = new DIVERenderer(
            this._scene,
            cameraComponent,
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

    /**
     * What the view looks through.
     *
     * The component and not the camera or its node: everything a consumer needs
     * hangs off it -- `camera` for three, `owner` for the transform, `onResize` and
     * `setCameraLayer` for itself -- so there is one way in rather than three.
     *
     * Read off the renderer rather than kept here. `DIVERenderer.activeCamera` is
     * settable, so a second copy would keep reporting the camera the renderer has
     * already stopped drawing through -- and `onResize` below would resize that
     * stale one.
     */
    public get cameraComponent(): DIVECameraComponent {
        return this._renderer.activeCamera;
    }

    public get canvas(): HTMLCanvasElement {
        return this._renderer.canvas;
    }

    public tick(): void {
        this._canvasLifecycleManager.tick();

        if (!this._paused) {
            this._renderer.tick();
        }
    }

    public async initAsync(): Promise<void> {
        // if not already an init task is running we create one
        if (!this._initPromise) {
            this._initPromise = new DIVEAbortablePromise(async (signal) => {
                if (signal.aborted) {
                    return Promise.reject(
                        new Error('DIVEView initialization aborted'),
                    );
                }

                await this._canvasLifecycleManager.waitForHealthyCanvas();

                if (signal.aborted) {
                    return Promise.reject(
                        new Error('DIVEView initialization aborted'),
                    );
                }

                await this._renderer.initAsync();
            });
        }

        // wait for init task to run
        return this._initPromise;
    }

    public dispose(): void {
        this._initPromise?.abort();
        this._initPromise = null;
        this._canvasLifecycleManager.dispose();
        this._renderer.dispose();
    }

    public onResize(width: number, height: number): void {
        this._renderer.onResize(width, height);
        this.cameraComponent.onResize(width, height);
    }

    public async setCanvas(canvas: HTMLCanvasElement): Promise<void> {
        const shouldReinitialize =
            this._renderer.initialized || this._initPromise?.pending;

        this._initPromise?.abort();
        this._initPromise = null;

        this._canvasLifecycleManager.setCanvas(canvas);
        this._renderer.setCanvas(canvas);

        if (shouldReinitialize) {
            await this.initAsync();
        }
    }

    public pause(): void {
        this._paused = true;
    }

    public resume(): void {
        this._paused = false;
    }

    private _handleCanvasResize = (width: number, height: number): void => {
        this.onResize(width, height);
        this._renderer.tick();
    };
}
