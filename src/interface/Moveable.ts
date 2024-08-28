import { Object3D } from "three";

/**
 * Interface for objects that can be moved in the scene.
 *
 * @module
 */

export interface DIVEMoveable {
    isMoveable: true;
    onMove?: () => void;
}

export const isMoveable = (object: Object3D): object is Object3D & DIVEMoveable => {
    return 'isMoveable' in object;
};

export const findMoveableInterface = (child: Object3D): (Object3D & DIVEMoveable) | undefined => {
    if (child === undefined) return undefined;

    if (child.parent === null) {
        // in this case it is the scene itself
        return undefined;
    }

    if (isMoveable(child)) {
        return child as (Object3D & DIVEMoveable);
    }

    return findMoveableInterface(child.parent);
}