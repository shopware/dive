import { Matrix4, OrthographicCamera } from 'three';
import { DIVERenderer } from '../renderer/Renderer.ts';
import { DIVEScene } from '../scene/Scene.ts';
import { default as DIVEOrbitControls } from '../controls/OrbitControls.ts';
/**
 * Shows the scene axes in the bottom left corner of the screen.
 *
 * @module
 */
export default class DIVEAxisCamera extends OrthographicCamera {
    private axesHelper;
    private _renderer;
    private _scene;
    private _renderCallbackId;
    constructor(renderer: DIVERenderer, scene: DIVEScene, controls: DIVEOrbitControls);
    Dispose(): void;
    SetFromCameraMatrix(matrix: Matrix4): void;
}
