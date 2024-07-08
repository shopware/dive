/**
 * Interface for objects that can be hovered in the scene.
 *
 * @module
 */

import { type Object3D, type Intersection } from "three";

export interface DIVEHoverable {
    isHoverable: true;
    onPointerEnter?: (i: Intersection) => void;
    onPointerOver?: (i: Intersection) => void;
    onPointerLeave?: () => void;
}

export const isHoverable = (object: Object3D): object is Object3D & DIVEHoverable => {
    return 'isHoverable' in object;
};

export const findHoverableInterface = (child: Object3D): (Object3D & DIVEHoverable) | undefined => {
    if (child === undefined) return undefined;

    if (child.parent === null) {
        // in this case it is the scene itself
        return undefined;
    }

    if (isHoverable(child)) {
        return child as (Object3D & DIVEHoverable);
    }

    return findHoverableInterface(child.parent);
}