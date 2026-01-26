import { type Vector3 } from 'three';

/**
 * Event data passed to DIVEDraggable callbacks during drag operations.
 *
 * @module
 */
export type DraggableEvent = {
    /** World position where the drag started */
    dragStart: Vector3;

    /** Current world position during drag */
    dragCurrent: Vector3;

    /** World position where the drag ended (same as dragCurrent during drag) */
    dragEnd: Vector3;

    /** Vector from dragStart to dragCurrent */
    dragDelta: Vector3;
};
