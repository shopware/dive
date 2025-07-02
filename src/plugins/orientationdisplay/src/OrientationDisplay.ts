import { MathUtils, Vector4 } from 'three';
import {
    type DIVERenderPipeline,
    DIVETicker,
    DIVEScene,
    DIVEPerspectiveCamera,
    COORDINATE_LAYER_MASK,
} from '@shopware-ag/dive';
import { OrientationDisplayAxes } from './axes/Axes.ts';
import { OrthographicCamera } from 'three';

/**
 * Shows the scene axes in the bottom left corner of the screen.
 *
 * @module
 */

export class OrientationDisplay implements DIVETicker {
    public uuid: string = MathUtils.generateUUID();

    private _axes: OrientationDisplayAxes;
    private _orthographicCamera: OrthographicCamera;
    private _restoreViewport: Vector4 = new Vector4();

    constructor(
        private _renderer: DIVERenderPipeline,
        private _scene: DIVEScene,
        private _camera: DIVEPerspectiveCamera,
    ) {
        this._orthographicCamera = new OrthographicCamera(
            -1,
            1,
            1,
            -1,
            0.1,
            100,
        );
        this._orthographicCamera.layers.mask = COORDINATE_LAYER_MASK;
        this._scene.add(this._orthographicCamera);

        this._axes = new OrientationDisplayAxes();
        this._scene.add(this._axes);
    }

    public tick(): void {
        // save current background and set it to transparent
        const restoreBackground = this._scene.background;
        this._scene.background = null;

        // save current viewport and set it to desired size
        this._renderer.webglrenderer.getViewport(this._restoreViewport);
        this._renderer.webglrenderer.setViewport(0, 0, 150, 150);
        this._renderer.webglrenderer.autoClear = false;

        // set axes rotation to camera rotation
        this._axes.setFromCameraMatrix(this._camera.matrix);

        // render scene to orthographic camera
        this._renderer.webglrenderer.render(
            this._scene,
            this._orthographicCamera,
        );

        // restore viewport and background
        this._renderer.webglrenderer.setViewport(this._restoreViewport);
        this._renderer.webglrenderer.autoClear = true;
        this._scene.background = restoreBackground;
    }

    public dispose(): void {
        this._scene.remove(this._axes);
        this._scene.remove(this._orthographicCamera);
    }
}
