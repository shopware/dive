import { DIVEScene } from './scene/Scene.ts';
import {
    DIVEPerspectiveCamera,
    DIVEPerspectiveCameraDefaultSettings,
    DIVEPerspectiveCameraSettings,
} from './camera/PerspectiveCamera.ts';
import { DIVERenderer } from './renderer/Renderer.ts';
import { DIVEClock } from './clock/Clock.ts';
import {
    DIVERenderPipeline,
    DIVERenderPipelineSettings,
} from './pipeline/RenderPipeline.ts';
import { DIVEResizeManager } from './resize/ResizeManager.ts';

export type EngineSettings = {
    /** Whether the engine should start automatically after initialization */
    autoStart: boolean;
    /** Whether to display coordinate axes in the scene */
    displayAxes: boolean;
    /** Settings for the perspective camera */
    perspectiveCamera: Partial<DIVEPerspectiveCameraSettings>;
    /** Settings for the render pipeline */
    renderPipeline: Partial<DIVERenderPipelineSettings>;
};

export const EngineDefaultSettings: Required<EngineSettings> = {
    autoStart: true,
    displayAxes: false,
    perspectiveCamera: DIVEPerspectiveCameraDefaultSettings,
    renderPipeline: {},
};

export class DIVEEngine {
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _camera: DIVEPerspectiveCamera;
    private _pipeline: DIVERenderPipeline;
    private _resizeManager: DIVEResizeManager;
    private _clock: DIVEClock;

    private _settings: EngineSettings;

    constructor(settings?: Partial<EngineSettings>) {
        this._settings = {
            ...EngineDefaultSettings,
            ...(settings ?? {}),
        };

        this._renderer = new DIVERenderer();
        this._scene = new DIVEScene();
        this._camera = new DIVEPerspectiveCamera(
            this._settings.perspectiveCamera,
        );

        this._pipeline = new DIVERenderPipeline(
            this._renderer,
            this._scene,
            this._camera,
        );
        this._resizeManager = new DIVEResizeManager(
            this._renderer,
            this._camera,
        );

        this._clock = new DIVEClock();
        this._clock.addTicker(this._pipeline);

        if (this._settings.autoStart) {
            this.start();
        }
    }

    public get scene(): DIVEScene {
        return this._scene;
    }

    public get camera(): DIVEPerspectiveCamera {
        return this._camera;
    }

    public get renderer(): DIVERenderer {
        return this._renderer;
    }

    public get pipeline(): DIVERenderPipeline {
        return this._pipeline;
    }

    public start(): void {
        this._clock.start();
    }

    public stop(): void {
        this._clock.stop();
    }

    public dispose(): void {
        this._clock.dispose();
        this._resizeManager.dispose();
        this._pipeline.dispose();
        this._renderer.dispose();
    }
}
