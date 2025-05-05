import { Color, Object3D } from 'three';
import { DIVEMovable } from '../../interfaces/Movable.ts';
import { DIVESelectable } from '../../interfaces/Selectable.ts';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.ts';
/**
 * A basic point light.
 *
 * Can change the color, intensity, and visibility of the light.
 *
 * Can be moved and selected.
 *
 * @module
 */
export declare class DIVEPointLight extends Object3D implements DIVESelectable, DIVEMovable {
    readonly isDIVELight: true;
    readonly isDIVEPointLight: true;
    readonly isMovable: true;
    readonly isSelectable: true;
    gizmo: TransformControls | null;
    private light;
    private mesh;
    constructor();
    SetColor(color: Color): void;
    SetIntensity(intensity: number): void;
    SetEnabled(enabled: boolean): void;
    onMove(): void;
    onSelect(): void;
    onDeselect(): void;
}
