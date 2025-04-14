import { Color, Object3D } from 'three';
/**
 * A basic ambient light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * @module
 */
export default class DIVEAmbientLight extends Object3D {
    readonly isDIVELight: true;
    readonly isDIVEAmbientLight: true;
    private _light;
    constructor();
    SetColor(color: Color): void;
    SetIntensity(intensity: number): void;
    SetEnabled(enabled: boolean): void;
}
