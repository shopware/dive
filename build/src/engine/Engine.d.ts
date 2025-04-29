import { DIVEScene } from './scene/Scene.ts';
import { DIVEPerspectiveCamera, DIVEPerspectiveCameraSettings } from './camera/PerspectiveCamera.ts';
import { DIVERenderPipeline, DIVERenderPipelineSettings } from './renderer/Renderer.ts';
import { DIVEClock } from './clock/Clock.ts';
export type EngineSettings = {
    /** Whether the engine should start automatically after initialization */
    autoStart: boolean;
    /** Whether to display coordinate axes in the scene */
    displayAxes: boolean;
    /** Settings for the perspective camera */
    perspectiveCamera: Partial<DIVEPerspectiveCameraSettings>;
    /** Settings for the render pipeline */
    renderer: Partial<DIVERenderPipelineSettings>;
};
export declare const EngineDefaultSettings: Required<EngineSettings>;
export declare class DIVEEngine {
    private _renderer;
    private _scene;
    private _camera;
    private _resizeManager;
    private _clock;
    private _settings;
    constructor(settings?: Partial<EngineSettings>);
    get scene(): DIVEScene;
    get camera(): DIVEPerspectiveCamera;
    get renderer(): DIVERenderPipeline;
    get clock(): DIVEClock;
    start(): void;
    stop(): void;
    dispose(): void;
}
