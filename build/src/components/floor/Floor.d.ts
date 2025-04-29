import { ColorRepresentation, Mesh } from 'three';
/**
 * A basic floor geometry.
 *
 * Can change the color and visibility of the floor.
 *
 * @module
 */
export declare class DIVEFloor extends Mesh {
    readonly isDIVEFloor: true;
    constructor();
    SetVisibility(visible: boolean): void;
    SetColor(color: ColorRepresentation): void;
}
