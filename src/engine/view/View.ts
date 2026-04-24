import { MathUtils } from 'three/webgpu';
import { DIVETicker } from '../clock/Clock.ts';
import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
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
                    return;
                }

                try {
                    console.log('[DIVEView] waiting for healthy canvas');
                    await this._canvasLifecycleManager.waitForHealthyCanvas();
                } catch (error) {
                    console.error(
                        'DIVEView.initAsync: Failed to wait for healthy canvas.',
                        error,
                    );
                    return;
                }

                if (signal.aborted) {
                    return;
                }

                console.log('[DIVEView] initializing renderer');
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
        this._camera.onResize(width, height);
    }

    public async setCanvas(canvas: HTMLCanvasElement): Promise<void> {
        console.log('[DIVEView] Canvas changed, rebinding renderer');
        const shouldReinitialize =
            this._renderer.initialized || this._initPromise?.pending;
        console.log(
            '[DIVEView] this._renderer.initialized ',
            this._renderer.initialized,
        );
        console.log(
            '[DIVEView] this._initPromise?.pending ',
            this._initPromise?.pending,
        );

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
