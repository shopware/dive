import {
    AxesHelper,
    Color,
    type Material,
    Matrix4,
    OrthographicCamera,
    Vector4,
} from 'three';
import SpriteText from 'three-spritetext';
import { COORDINATE_LAYER_MASK } from '../../constants/VisibilityLayerMask';
import {
    AxesColorRed,
    AxesColorGreen,
    AxesColorBlue,
    AxesColorRedLetter,
    AxesColorGreenLetter,
    AxesColorBlueLetter,
} from '../../constants/AxisHelperColors';
import { type DIVERenderer } from '../../engine/renderer/Renderer';
import { type DIVEScene } from '../../engine/scene/Scene';
import { type DIVEOrbitController } from '../controller/orbit/OrbitController';
import { DIVERenderPipeline } from '../../engine/pipeline/RenderPipeline';

/**
 * Shows the scene axes in the bottom left corner of the screen.
 *
 * @module
 */

export class DIVEAxisCamera extends OrthographicCamera {
    private axesHelper: AxesHelper;

    private _renderer: DIVERenderer;
    private _pipeline: DIVERenderPipeline;
    private _scene: DIVEScene;
    private _controller: DIVEOrbitController;

    private _restoreViewport: Vector4 = new Vector4();

    constructor(
        renderer: DIVERenderer,
        pipeline: DIVERenderPipeline,
        scene: DIVEScene,
        controller: DIVEOrbitController,
    ) {
        super(-1, 1, 1, -1, 0.1, 100);

        this.layers.mask = COORDINATE_LAYER_MASK;

        this.axesHelper = new AxesHelper(0.5);
        this.axesHelper.layers.mask = COORDINATE_LAYER_MASK;
        (this.axesHelper.material as Material).depthTest = false; // always draw
        this.axesHelper.position.set(0, 0, -1);

        this.axesHelper.setColors(
            new Color(AxesColorRed),
            new Color(AxesColorGreen),
            new Color(AxesColorBlue),
        );

        const x = new SpriteText('X', 0.2, AxesColorRedLetter);
        const y = new SpriteText('Y', 0.2, AxesColorGreenLetter);
        const z = new SpriteText('Z', 0.2, AxesColorBlueLetter);
        x.layers.mask = COORDINATE_LAYER_MASK;
        y.layers.mask = COORDINATE_LAYER_MASK;
        z.layers.mask = COORDINATE_LAYER_MASK;
        x.position.set(0.7, 0, 0);
        y.position.set(0, 0.7, 0);
        z.position.set(0, 0, 0.7);
        this.axesHelper.add(x);
        this.axesHelper.add(y);
        this.axesHelper.add(z);

        this.add(this.axesHelper);

        // attach everything to current scene and render cycle
        this._renderer = renderer;
        this._pipeline = pipeline;
        this._scene = scene;
        this._controller = controller;
        this._scene.add(this);

        this._pipeline.addPostRenderStep(this._postRenderCallback);
    }

    public Dispose(): void {
        this._pipeline.removePostRenderStep(this._postRenderCallback);
        this._scene.remove(this);
    }

    public SetFromCameraMatrix(matrix: Matrix4): void {
        this.axesHelper.rotation.setFromRotationMatrix(
            new Matrix4().extractRotation(matrix).invert(),
        );
    }

    private _postRenderCallback = (): void => {
        const restoreBackground = this._scene.background;
        this._scene.background = null;

        this._renderer.webglrenderer.getViewport(this._restoreViewport);
        this._renderer.webglrenderer.setViewport(0, 0, 150, 150);
        this._renderer.webglrenderer.autoClear = false;

        this.SetFromCameraMatrix(this._controller.object.matrix);

        this._renderer.render(this._scene, this);

        this._renderer.webglrenderer.setViewport(this._restoreViewport);
        this._renderer.webglrenderer.autoClear = true;

        this._scene.background = restoreBackground;
    };
}
