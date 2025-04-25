import { Matrix4, OrthographicCamera } from 'three';
import { DIVERenderer } from '../../engine/renderer/Renderer';
import { DIVEScene } from '../../engine/scene/Scene';
import { DIVEOrbitController } from '../controller/orbit/OrbitController';
import { DIVERenderPipeline } from '../../engine/pipeline/RenderPipeline';
/**
 * Shows the scene axes in the bottom left corner of the screen.
 *
 * @module
 */
export declare class DIVEAxisCamera extends OrthographicCamera {
    private axesHelper;
    private _renderer;
    private _pipeline;
    private _scene;
    private _controller;
    private _restoreViewport;
    constructor(renderer: DIVERenderer, pipeline: DIVERenderPipeline, scene: DIVEScene, controller: DIVEOrbitController);
    Dispose(): void;
    SetFromCameraMatrix(matrix: Matrix4): void;
    private _postRenderCallback;
}
