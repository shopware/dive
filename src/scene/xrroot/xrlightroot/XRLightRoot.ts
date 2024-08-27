import { XREstimatedLight } from "three/examples/jsm/webxr/XREstimatedLight";
import { type DIVERenderer } from "../../../renderer/Renderer";
import DIVELightRoot from "../../root/lightroot/LightRoot";
import { Object3D } from "three";
import { type DIVEScene } from "../../Scene";
import { PRODUCT_LAYER_MASK } from "../../../constant/VisibilityLayerMask";

export class DIVEXRLightRoot extends Object3D {
    private _scene: DIVEScene;

    private _xrLight: XREstimatedLight | null;
    private _lightRoot: DIVELightRoot;

    constructor(scene: DIVEScene) {
        super();
        this.name = "XRLightRoot";

        this._scene = scene;

        // placeholder for XR light
        this._xrLight = null;

        // add scene
        this._lightRoot = new DIVELightRoot();
        this._lightRoot.UpdateLight({
            id: 'XRSceneLight',
            entityType: 'light',
            name: 'XRSceneLight',
            type: 'scene',
            color: 0xffffff,
            intensity: 1,
            enabled: true,
            visible: true,
        });
        this.add(this._lightRoot);
    }

    public InitLightEstimation(renderer: DIVERenderer): void {
        if (!this._xrLight) {
            this._xrLight = new XREstimatedLight(renderer, true);
            this._xrLight.layers.mask = PRODUCT_LAYER_MASK;
            this.add(this._xrLight);
        }

        this._xrLight.addEventListener('estimationstart', () => { this.onEstimationStart() });
        this._xrLight.addEventListener('estimationend', () => { this.onEstimationEnd() });
    }

    public DisposeLightEstimation(): void {
        if (!this._xrLight) return;

        this._xrLight.removeEventListener('estimationstart', () => { this.onEstimationStart() });
        this._xrLight.removeEventListener('estimationend', () => { this.onEstimationEnd() });
    }

    private onEstimationStart(): void {
        this._lightRoot.visible = false;

        if (!this._xrLight) return;

        if (this._xrLight.environment) {
            this._scene.environment = this._xrLight.environment;
        }
    }

    private onEstimationEnd(): void {
        this._lightRoot.visible = true;
        this._scene.environment = null;

        if (!this._xrLight) return;
    }
}