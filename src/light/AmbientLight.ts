import { AmbientLight, Color, Object3D } from 'three';
import { PRODUCT_LAYER_MASK } from '../constant/VisibilityLayerMask';

/**
 * A basic ambient light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * @module
 */

export default class DIVEAmbientLight extends Object3D {
    private _light: AmbientLight;

    constructor() {
        super();

        this.name = 'DIVEAmbientLight';

        this._light = new AmbientLight(0xffffff, 1);
        this._light.layers.mask = PRODUCT_LAYER_MASK;
        this.add(this._light);
    }

    public SetColor(color: Color): void {
        this._light.color = color;
    }

    public SetIntensity(intensity: number): void {
        this._light.intensity = intensity;
    }

    public SetEnabled(enabled: boolean): void {
        this._light.visible = enabled;
    }
}
