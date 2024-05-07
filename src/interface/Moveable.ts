import type { TransformControls } from "three/examples/jsm/Addons.js";

export interface DIVEMoveable {
    isMoveable: true;
    gizmo: TransformControls | null;
    onMove?: () => void;
}