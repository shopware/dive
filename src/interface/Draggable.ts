/**
 * Interface for objects that can be hovered in the scene.
 *
 * @module
 */

import { type Object3D } from "three";
import { type DraggableEvent } from "../toolbox/BaseTool";

export interface DIVEDraggable {
    isDraggable: true;
    onDragStart?: (e: DraggableEvent) => void;
    onDrag?: (e: DraggableEvent) => void;
    onDragEnd?: (e: DraggableEvent) => void;
}

export const isDraggable = (object: Object3D): object is Object3D & DIVEDraggable => {
    return 'isDraggable' in object;
};

export const findDraggableInterface = (child: Object3D): (Object3D & DIVEDraggable) | undefined => {
    if (child === undefined) return undefined;

    if (child.parent === null) {
        // in this case it is the scene itself
        return undefined;
    }

    if (isDraggable(child)) {
        return child as (Object3D & DIVEDraggable);
    }

    return findDraggableInterface(child.parent);
}