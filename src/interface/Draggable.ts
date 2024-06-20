/**
 * Interface for objects that can be hovered in the scene.
 *
 * @module
 */

import { Object3D, Vector3 } from "three";

export type DraggableEvent = {
    dragStart: Vector3;
    dragCurrent: Vector3;
    dragEnd: Vector3;
    dragDelta: Vector3;
}

export interface DIVEDraggable {
    isDraggable: true;
    onDragStart?: (e: DraggableEvent) => void;
    onDrag?: (e: DraggableEvent) => void;
    onDragEnd?: (e: DraggableEvent) => void;
}

export const isDraggable = (object: Object3D): object is Object3D & DIVEDraggable => {
    return 'isDraggable' in object;
};