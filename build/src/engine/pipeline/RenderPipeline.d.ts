import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVERenderer, DIVERendererSettings } from '../renderer/Renderer.ts';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVETicker } from '../clock/Clock.ts';
export type DIVEPipelineStep = (deltaTime: number) => void;
export type DIVERenderPipelineSettings = {
    renderer: Partial<DIVERendererSettings>;
};
export declare const DIVERenderPipelineDefaultSettings: DIVERenderPipelineSettings;
export declare class DIVERenderPipeline implements DIVETicker {
    private _renderer;
    private _scene;
    private _camera;
    private _preRenderSteps;
    private _postRenderSteps;
    constructor(_renderer: DIVERenderer, _scene: DIVEScene, _camera: DIVEPerspectiveCamera);
    get renderer(): DIVERenderer;
    get scene(): DIVEScene;
    get camera(): DIVEPerspectiveCamera;
    addPreRenderStep(step: DIVEPipelineStep): void;
    removePreRenderStep(step: DIVEPipelineStep): void;
    addPostRenderStep(step: DIVEPipelineStep): void;
    removePostRenderStep(step: DIVEPipelineStep): void;
    tick(deltaTime: number): void;
    dispose(): void;
}
