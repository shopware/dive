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

export function findSelectableInterface(child: Object3D): (Object3D & DIVESelectable) | undefined {
    if (child === undefined) return undefined;

    if (child.parent === null) {
        // in this case it is the scene itself
        return undefined;
    }

    if (isSelectable(child)) {
        // in this case it is the Selectable
        return child;
    }

    // search recursively in parent
    return findSelectableInterface(child.parent);
}