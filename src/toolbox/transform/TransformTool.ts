import { DIVEBaseTool } from "../BaseTool.ts";
import { DIVEScene } from "../../scene/Scene.ts";
import DIVEOrbitControls from "../../controls/OrbitControls.ts";
import { TransformControls } from "three/examples/jsm/Addons";
import { type DIVEMoveable } from "../../interface/Moveable.ts";

export const isTransformTool = (tool: DIVEBaseTool): tool is DIVETransformTool => {
    return (tool as DIVETransformTool).isTransformTool !== undefined;
}

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
    readonly isTransformTool: boolean = true;

    protected _gizmo: TransformControls;

    constructor(scene: DIVEScene, controller: DIVEOrbitControls) {
        super(scene, controller);
        this.name = "DIVETransformTool";

        this._gizmo = new TransformControls(this._controller.object, this._controller.domElement);
        this._gizmo.mode = 'translate';

        this._gizmo.addEventListener('mouseDown', () => {
            controller.enabled = false;
        });

        this._gizmo.addEventListener('mouseUp', () => {
            controller.enabled = true;
        });

        this._gizmo.addEventListener('objectChange', () => {
            if (!this._gizmo.object) return;
            if (!('isMoveable' in this._gizmo.object)) return;
            if (!('onMove' in this._gizmo.object)) return;
            (this._gizmo.object as DIVEMoveable).onMove!();
        });

        scene.add(this._gizmo);
    }

    public Activate(): void { }

    public SetGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void {
        this._gizmo.mode = mode;
    }

    public SetGizmoVisibility(active: boolean): void {
        const contains = this._scene.children.includes(this._gizmo);
        if (active && !contains) {
            this._scene.add(this._gizmo);
        } else if (!active && contains) {
            this._scene.remove(this._gizmo);
        }
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