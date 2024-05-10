import { AmbientLight, Color } from 'three';
import { PRODUCT_LAYER_MASK } from '../constant/VisibilityLayerMask';

/**
 * A basic ambient light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * @module
 */

export default class DIVEAmbientLight extends AmbientLight {
    constructor() {
        super(0xffffff, 1);
        this.layers.mask = PRODUCT_LAYER_MASK;
    }

    public SetColor(color: Color): void {
        this.color = color;
    }

    public SetIntensity(intensity: number): void {
        this.intensity = intensity;
    }

    public SetEnabled(enabled: boolean): void {
        this.visible = enabled;
    }
}
