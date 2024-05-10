/**
 * Interface for objects that can be scaled in the scene.
 *
 * @module
 */

export interface DIVEScalable {
    isScalable: true;
    onScale?: () => void;
}