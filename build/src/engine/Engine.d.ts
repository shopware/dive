import { DIVERenderer, DIVERendererSettings } from './renderer/Renderer.ts';
import { DIVEScene } from './scene/Scene.ts';
import { DIVEPerspectiveCamera, DIVEPerspectiveCameraSettings } from './camera/PerspectiveCamera.ts';
export type EngineSettings = {
    autoResize: boolean;
    autoStart: boolean;
    displayAxes: boolean;
    renderer: Partial<DIVERendererSettings>;
    perspectiveCamera: Partial<DIVEPerspectiveCameraSettings>;
};
export declare const EngineDefaultSettings: EngineSettings;
export declare class Engine {
    get renderer(): DIVERenderer;
    get scene(): DIVEScene;
    get perspectiveCamera(): DIVEPerspectiveCamera;
    private _renderer;
    private _scene;
    private _perspectiveCamera;
    private _settings;
    private _resizeObserverId;
    private _width;
    private _height;
    constructor(settings?: Partial<EngineSettings>);
    /**
     * Disposes the engine.
     * @internal
     */
    dispose(): void;
    onResize(width: number, height: number): void;
    private _addResizeObserver;
    private _removeResizeObserver;
}
