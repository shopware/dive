import { DIVERenderPipeline, DIVETicker, DIVEScene, DIVEPerspectiveCamera } from '../../../index.ts';
/**
 * Shows the scene axes in the bottom left corner of the screen.
 *
 * @module
 */
export declare class OrientationDisplay implements DIVETicker {
    private _renderer;
    private _scene;
    private _camera;
    uuid: string;
    private _axes;
    private _orthographicCamera;
    private _restoreViewport;
    constructor(_renderer: DIVERenderPipeline, _scene: DIVEScene, _camera: DIVEPerspectiveCamera);
    tick(): void;
    dispose(): void;
}
