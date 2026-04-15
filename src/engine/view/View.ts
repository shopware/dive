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
    private _initVersion: number = 0;

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
            (width, height) => {
                this.onResize(width, height);
                this._renderer.render();
            },
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
            await this._renderer.init();
            return;
        }

        if (this._initPromise) {
            return this._initPromise;
        }

        const initVersion = ++this._initVersion;
        const renderer = this._renderer;
        const canvas = renderer.canvas;

        this._initPromise = (async () => {
            const stableLayout =
                await this._canvasLifecycleManager.waitForRenderableCanvas(
                    canvas,
                );

            if (
                stableLayout === null ||
                initVersion !== this._initVersion ||
                renderer !== this._renderer
            ) {
                return;
            }

            await renderer.init();

            if (
                initVersion !== this._initVersion ||
                renderer !== this._renderer
            ) {
                return;
            }
        })().finally(() => {
            if (initVersion === this._initVersion) {
                this._initPromise = null;
            }
        });

        return this._initPromise;
    }

    public dispose(): void {
        this._initVersion += 1;
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

        this._initVersion += 1;
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
}
