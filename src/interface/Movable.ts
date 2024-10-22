/**
 * Interface for objects that can be moved in the scene.
 *
 * @module
 */

export interface DIVEMovable {
    isMovable: true;
    onMoveStart?: () => void;
    onMove?: () => void;
    onMoveEnd?: () => void;
}