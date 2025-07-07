import { AmbientLight, Color, Object3D } from 'three';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVESelectable } from '@shopware-ag/dive';

/**
 * A basic ambient light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * @module
 */

export class DIVEAmbientLight extends Object3D implements DIVESelectable {
    readonly isDIVELight: true = true;
    readonly isDIVEAmbientLight: true = true;
    readonly isSelectable: true = true;

    private _light: AmbientLight;

    constructor() {
        super();

        this.name = 'DIVEAmbientLight';

        this._light = new AmbientLight(0xffffff, 1);
        this._light.layers.mask = PRODUCT_LAYER_MASK;
        this.add(this._light);
    }

    public setColor(color: Color): void {
        this._light.color = color;
    }

    public setIntensity(intensity: number): void {
        this._light.intensity = intensity;
    }

    public setEnabled(enabled: boolean): void {
        this._light.visible = enabled;
    }
}
