import { Color, Object3D } from 'three';
import { DIVESelectable } from '../../index.ts';
/**
 * A basic ambient light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * @module
 */
export declare class DIVEAmbientLight extends Object3D implements DIVESelectable {
    readonly isDIVELight: true;
    readonly isDIVEAmbientLight: true;
    readonly isSelectable: true;
    private _light;
    constructor();
    setColor(color: Color): void;
    setIntensity(intensity: number): void;
    setEnabled(enabled: boolean): void;
}
