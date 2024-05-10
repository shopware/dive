/**
 * Interface for objects that can be rotated in the scene.
 *
 * @module
 */

export interface DIVERotatable {
    isRotatable: true;
    onRotate?: () => void;
}