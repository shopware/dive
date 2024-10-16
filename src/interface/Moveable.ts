/**
 * Interface for objects that can be moved in the scene.
 *
 * @module
 */

export interface DIVEMoveable {
    isMoveable: true;
    onMove?: () => void;
}