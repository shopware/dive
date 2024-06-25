/**
 * Interface for objects that can be hovered in the scene.
 *
 * @module
 */

import { Object3D } from "three";
import { DraggableEvent } from "../toolbox/BaseTool";

export interface DIVEDraggable {
    isDraggable: true;
    onDragStart?: (e: DraggableEvent) => void;
    onDrag?: (e: DraggableEvent) => void;
    onDragEnd?: (e: DraggableEvent) => void;
}

export const isDraggable = (object: Object3D): object is Object3D & DIVEDraggable => {
    return 'isDraggable' in object;
};