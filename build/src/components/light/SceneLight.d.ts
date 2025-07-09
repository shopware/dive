import { DIVESelectable } from '../../index.ts';
import { Color, Object3D } from 'three';
/**
 * A complex scene light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * @module
 */
export declare class DIVESceneLight extends Object3D implements DIVESelectable {
    readonly isDIVELight: true;
    readonly isDIVESceneLight: true;
    readonly isSelectable: true;
    private _hemiLight;
    private _dirLight;
    constructor();
    setColor(color: Color): void;
    setIntensity(intensity: number): void;
    setEnabled(enabled: boolean): void;
}
