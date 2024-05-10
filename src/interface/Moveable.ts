import type { TransformControls } from "three/examples/jsm/Addons.js";

/**
 * Interface for objects that can be moved in the scene.
 *
 * @module
 */

export interface DIVEMoveable {
    isMoveable: true;
    gizmo: TransformControls | null;
    onMove?: () => void;
}