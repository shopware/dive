import { MathUtils, OrthographicCamera, Vector4 } from 'three/webgpu';
import {
    type DIVECameraComponent,
    type DIVERenderer,
    DIVETicker,
    DIVEScene,
    COORDINATE_LAYER_MASK,
} from '@shopware-ag/dive';
import { OrientationDisplayAxes } from './axes/Axes.ts';

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
        private _renderer: DIVERenderer,
        private _scene: DIVEScene,
        private _cameraComponent: DIVECameraComponent,
    ) {
        this._orthographicCamera = new OrthographicCamera(
            -1,
            1,
            1,
            -1,
            0.1,
            100,
        );
        this._orthographicCamera.name = 'OrientationDisplayCamera';
        this._orthographicCamera.layers.mask = COORDINATE_LAYER_MASK;
        this._scene.add(this._orthographicCamera);

        this._axes = new OrientationDisplayAxes();
        this._axes.name = 'OrientationDisplayAxes';
        this._scene.add(this._axes);
    }

    public tick(): void {
        if (!this._renderer.webgpurenderer.initialized) return;

        // save current background reference and set it to transparent
        const restoreBackground = this._scene.background ?? null;
        const restoreAutoClear = this._renderer.webgpurenderer.autoClear;
        this._scene.background = null;

        // save current viewport and set it to desired size
        this._renderer.webgpurenderer.getViewport(this._restoreViewport);
        const canvasHeight =
            this._renderer.webgpurenderer.domElement?.clientHeight ??
            this._restoreViewport.w;

        this._renderer.webgpurenderer.setViewport(
            0,
            Math.max(0, canvasHeight - 150),
            150,
            150,
        );
        this._renderer.webgpurenderer.autoClear = false;

        // set axes rotation to camera rotation

        /**
         * matrixWorld, not matrix: the camera sits at its node's transform, so its
         * own local matrix is identity and carries no orientation at all
         */
        this._axes.setFromCameraMatrix(
            this._cameraComponent.camera.matrixWorld,
        );

        // render scene to orthographic camera
        this._renderer.webgpurenderer.render(
            this._scene,
            this._orthographicCamera,
        );

        // restore viewport and background
        this._renderer.webgpurenderer.setViewport(this._restoreViewport);
        this._renderer.webgpurenderer.autoClear = restoreAutoClear;
        this._scene.background = restoreBackground;
    }

    public dispose(): void {
        this._scene.remove(this._axes);
        this._scene.remove(this._orthographicCamera);
    }
}
