/**
 * Interface for objects that can be hovered in the scene.
 *
 * @module
 */

import { Object3D, Vector3 } from "three";

type DragEvent = {
    dragStart: Vector3;
    dragEnd: Vector3;
    dragDelta: Vector3;
}

export interface DIVEDraggable {
    isDraggable: true;
    onDragStart?: (e: DragEvent) => void;
    onDrag?: (e: DragEvent) => void;
    onDragEnd?: (e: DragEvent) => void;
}

export const isDraggable = (object: Object3D): object is Object3D & DIVEDraggable => {
    return 'isDraggable' in object;
};