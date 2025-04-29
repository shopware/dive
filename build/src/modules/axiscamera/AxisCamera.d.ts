import { Matrix4, OrthographicCamera } from 'three';
import { DIVERenderPipeline } from '../../engine/renderer/Renderer';
import { DIVETicker } from '../../engine/clock/Clock';
import { DIVEScene } from '../../engine/scene/Scene';
import { DIVEPerspectiveCamera } from '../../engine/camera/PerspectiveCamera';
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
    Dispose(): void;
    SetFromCameraMatrix(matrix: Matrix4): void;
}
