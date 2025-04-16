import {
    DIVERenderer,
    DIVERendererDefaultSettings,
    DIVERendererSettings,
} from './renderer/Renderer.ts';
import { DIVEScene } from './scene/Scene.ts';
import {
    DIVEPerspectiveCamera,
    DIVEPerspectiveCameraDefaultSettings,
    DIVEPerspectiveCameraSettings,
} from './camera/PerspectiveCamera.ts';

export type EngineSettings = {
    autoResize: boolean;
    autoStart: boolean;
    displayAxes: boolean;
    renderer: Partial<DIVERendererSettings>;
    perspectiveCamera: Partial<DIVEPerspectiveCameraSettings>;
};

export const EngineDefaultSettings: EngineSettings = {
    autoResize: true,
    autoStart: true,
    displayAxes: false,
    renderer: DIVERendererDefaultSettings,
    perspectiveCamera: DIVEPerspectiveCameraDefaultSettings,
};

export class Engine {
    public get renderer(): DIVERenderer {
        return this._renderer;
    }

    public get scene(): DIVEScene {
        return this._scene;
    }

    public get perspectiveCamera(): DIVEPerspectiveCamera {
        return this._perspectiveCamera;
    }

    // vital component members
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _perspectiveCamera: DIVEPerspectiveCamera;

    // descriptive members
    private _settings: EngineSettings;
    private _resizeObserverId: string = '';
    private _width: number = 0;
    private _height: number = 0;

    constructor(settings?: Partial<EngineSettings>) {
        this._settings = {
            ...EngineDefaultSettings,
            ...(settings ?? {}),
        };

        this._renderer = new DIVERenderer(this._settings.renderer);
        this._scene = new DIVEScene();
        this._perspectiveCamera = new DIVEPerspectiveCamera(
            this._settings.perspectiveCamera,
        );

        if (this._settings.autoResize) {
            this._addResizeObserver();
        }

        if (this._settings.autoStart) {
            // when everything is done, start the renderer
            this.renderer.StartRenderer(this.scene, this.perspectiveCamera);
        }
    }

    /**
     * Disposes the engine.
     * @internal
     */
    public dispose(): void {
        this._removeResizeObserver();
        this._renderer.dispose();
    }

    public onResize(width: number, height: number): void {
        // resize renderer
        this.renderer.OnResize(width, height);

        // resize camera
        this.perspectiveCamera.OnResize(width, height);
    }

    private _addResizeObserver(): void {
        this._resizeObserverId = this.renderer.AddPreRenderCallback(() => {
            // check if the canvas is mounted
            const canvasWrapper = this.renderer.domElement.parentElement;
            if (!canvasWrapper) return;

            const { clientWidth, clientHeight } = canvasWrapper;
            if (clientWidth === this._width && clientHeight === this._height)
                return;

            this.onResize(clientWidth, clientHeight);

            this._width = clientWidth;
            this._height = clientHeight;
        });
    }

    private _removeResizeObserver(): void {
        this.renderer.RemovePreRenderCallback(this._resizeObserverId);
    }
}
