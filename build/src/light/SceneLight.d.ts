import { Color, Object3D } from 'three';
/**
 * A complex scene light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * @module
 */
export default class DIVESceneLight extends Object3D {
    readonly isDIVELight: true;
    readonly isDIVESceneLight: true;
    private _hemiLight;
    private _dirLight;
    constructor();
    SetColor(color: Color): void;
    SetIntensity(intensity: number): void;
    SetEnabled(enabled: boolean): void;
}
