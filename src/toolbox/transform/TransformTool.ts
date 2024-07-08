import DIVEBaseTool from "../BaseTool.ts";
import DIVEScene from "../../scene/Scene.ts";
import DIVEOrbitControls from "../../controls/OrbitControls.ts";
import { TransformControls } from "three/examples/jsm/Addons";

export interface DIVEObjectEventMap {
    select: object
}

/**
 * A Tool to select and move objects in the scene.
 *
 * Objects have to implement the DIVESelectable interface to be selectable and DIVEMoveable to be moveable.
 *
 * @module
 */

export default class DIVETransformTool extends DIVEBaseTool {
    protected _gizmo: TransformControls;

    constructor(scene: DIVEScene, controller: DIVEOrbitControls) {
        super(scene, controller);
        this.name = "DIVETransformTool";

        this._gizmo = new TransformControls(this._controller.object, this._controller.domElement);
        this._gizmo.mode = 'translate';

        scene.add(this._gizmo);
    }

    public Activate(): void { }

    public SetGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void {
        this._gizmo.mode = mode;
    }

    // public onPointerDown(e: PointerEvent): void {
    //     super.onPointerDown(e);

    //     // if (this._hovered) {
    //     //     this._dragRaycastOnObjects = this._gizmo.gizmoPlane.children;
    //     // }
    // }

    // protected raycast(): Intersection[] {
    //     return super.raycast(this._gizmo.gizmoNode.children);
    // }
}