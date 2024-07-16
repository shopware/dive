import { AxesHelper, Color, Material, Matrix4, OrthographicCamera, Vector4 } from "three";
import SpriteText from "three-spritetext";
import { COORDINATE_LAYER_MASK } from "../constant/VisibilityLayerMask.ts";
import { AxesColorRed, AxesColorGreen, AxesColorBlue, AxesColorRedLetter, AxesColorGreenLetter, AxesColorBlueLetter } from "../constant/AxisHelperColors.ts";
import DIVERenderer from "../renderer/Renderer.ts";
import DIVEScene from "../scene/Scene.ts";
import DIVEOrbitControls from "../controls/OrbitControls.ts";

/**
 * Shows the scene axes in the bottom left corner of the screen.
 *
 * @module
 */

export default class DIVEAxisCamera extends OrthographicCamera {
    private axesHelper: AxesHelper;

    private _renderer: DIVERenderer;
    private _scene: DIVEScene;

    private _renderCallbackId: string;

    constructor(renderer: DIVERenderer, scene: DIVEScene, controls: DIVEOrbitControls) {
        super(-1, 1, 1, -1, 0.1, 100);

        this.layers.mask = COORDINATE_LAYER_MASK;

        this.axesHelper = new AxesHelper(0.5);
        this.axesHelper.layers.mask = COORDINATE_LAYER_MASK;
        (this.axesHelper.material as Material).depthTest = false; // always draw
        this.axesHelper.position.set(0, 0, -1);

        this.axesHelper.setColors(
            new Color(AxesColorRed),
            new Color(AxesColorGreen),
            new Color(AxesColorBlue)
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
        this._scene = scene;
        this._scene.add(this);

        const restoreViewport = new Vector4();

        this._renderCallbackId = renderer.AddPostRenderCallback(() => {
            const restoreBackground = scene.background;
            scene.background = null;

            renderer.getViewport(restoreViewport);
            renderer.setViewport(0, 0, 150, 150);
            renderer.autoClear = false;

            this.SetFromCameraMatrix(controls.object.matrix);

            renderer.render(scene, this);

            renderer.setViewport(restoreViewport);
            renderer.autoClear = true;

            scene.background = restoreBackground;
        });
    }

    public Dispose(): void {
        this._renderer.RemovePostRenderCallback(this._renderCallbackId);
        this._scene.remove(this);
    }

    public SetFromCameraMatrix(matrix: Matrix4): void {
        this.axesHelper.rotation.setFromRotationMatrix(new Matrix4().extractRotation(matrix).invert());
    }
}