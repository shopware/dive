import { Matrix4, OrthographicCamera } from 'three';
import { DIVERenderPipeline, DIVETicker, DIVEScene, DIVEPerspectiveCamera } from '../../../index.ts';
/**
 * Shows the scene axes in the bottom left corner of the screen.
 *
 * @module
 */
export declare class DIVEAxisCamera extends OrthographicCamera implements DIVETicker {
    private axesHelper;
    private _renderer;
    private _scene;
    private _camera;
    private _restoreViewport;
    constructor(renderer: DIVERenderPipeline, scene: DIVEScene, camera: DIVEPerspectiveCamera);
    tick(): void;
    dispose(): void;
    setFromCameraMatrix(matrix: Matrix4): void;
}
