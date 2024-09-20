import { PRODUCT_LAYER_MASK } from "../constant/VisibilityLayerMask.ts";
import { Color, DirectionalLight, HemisphereLight, Object3D } from "three";

/**
 * A complex scene light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * @module
 */

export default class DIVESceneLight extends Object3D {
    readonly isDIVELight: true = true;
    readonly isDIVESceneLight: true = true;

    private _hemiLight: HemisphereLight;
    private _dirLight: DirectionalLight;

    constructor() {
        super();

        this.name = 'DIVESceneLight';

        this._hemiLight = new HemisphereLight(0xffffff, 0xffffff, 2);
        this._hemiLight.layers.mask = PRODUCT_LAYER_MASK;
        this._hemiLight.position.set(0, 50, 0);
        this.add(this._hemiLight);

        this._dirLight = new DirectionalLight(0xffffff, 3);
        this._dirLight.layers.mask = PRODUCT_LAYER_MASK;
        this._dirLight.position.set(1, 1.75, 1);
        this._dirLight.position.multiplyScalar(30);
        this._dirLight.castShadow = true;

        this._dirLight.shadow.mapSize.width = 2048;
        this._dirLight.shadow.mapSize.height = 2048;

        const d = 5;

        this._dirLight.shadow.camera.left = - d;
        this._dirLight.shadow.camera.right = d;
        this._dirLight.shadow.camera.top = d;
        this._dirLight.shadow.camera.bottom = - d;

        this._dirLight.shadow.camera.far = 3500;
        this.add(this._dirLight);
    }

    public SetColor(color: Color): void {
        this._hemiLight.color = color;
        this._dirLight.color = color;
    }

    public SetIntensity(intensity: number): void {
        this._hemiLight.intensity = intensity * 2;
        this._dirLight.intensity = intensity * 3;
    }

    public SetEnabled(enabled: boolean): void {
        this._hemiLight.visible = enabled;
        this._dirLight.visible = enabled;
    }
}