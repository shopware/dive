/**
 * Interface for objects that can be selected in the scene.
 *
 * @module
 */

import { Object3D } from "three";

export interface DIVESelectable {
    isSelectable: true;
    onSelect?: () => void;
    onDeselect?: () => void;
}

export function isSelectable(object: Object3D): object is Object3D & DIVESelectable {
    return 'isSelectable' in object;
}