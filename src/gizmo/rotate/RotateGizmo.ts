import { Euler, Object3D, Vector3 } from "three";
import { AxesColorBlue, AxesColorGreen, AxesColorRed } from "../../constant/AxisHelperColors";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { DIVERadialHandle } from "../handles/RadialHandle";
import { DIVEGizmo, DIVEGizmoAxis } from "../Gizmo";
import { DraggableEvent } from "../../toolbox/BaseTool";
import { DIVEMath } from "../../math";

export class DIVERotateGizmo extends Object3D {
    public children: DIVERadialHandle[];

    private _controller: DIVEOrbitControls;

    private _startRot: Euler | null;

    constructor(controller: DIVEOrbitControls) {
        super();

        this.name = "DIVERotateGizmo";

        this.children = [];

        this._startRot = null;

        this._controller = controller;

        this.add(new DIVERadialHandle('x', 1, Math.PI / 2, new Vector3(1, 0, 0), AxesColorRed));
        this.add(new DIVERadialHandle('y', 1, -Math.PI / 2, new Vector3(0, 1, 0), AxesColorGreen));
        this.add(new DIVERadialHandle('z', 1, Math.PI / 2, new Vector3(0, 0, 1), AxesColorBlue));
    }

    public reset(): void {
        this.children.forEach((child) => {
            child.reset();
        });
    }

    private handleHighlight(axis: DIVEGizmoAxis, value: boolean, dragged: boolean): void {
        // Set highlight state for all handles.
        this.children.forEach((child) => {
            if (dragged) {
                // Dragging has priority when it comes to highlighting.
                child.highlight = child.axis === axis && dragged;
            } else {
                // If nothing is dragged, decide on hovered state.
                child.highlight = child.axis === axis && value;
            }
        });
    }

    public onHandleHover(handle: DIVERadialHandle, value: boolean): void {
        // If _startRot is set, it means there is a drag operation in progress.
        // While dragging, we don't want to change the hover state.
        if (this._startRot) return;

        if (!this.parent) return;
        if (!this.parent.parent) return;
        (this.parent.parent as DIVEGizmo).onHover('rotate', handle.axis, value);

        this.handleHighlight(handle.axis, value, false);
    }

    public onHandleDragStart(handle: DIVERadialHandle): void {
        if (!this.parent) return;
        if (!this.parent.parent) return;

        const object = (this.parent.parent as DIVEGizmo).object;
        if (!object) return;

        this._startRot = object.rotation.clone();
        this.handleHighlight(handle.axis, true, true);
    }

    public onHandleDrag(handle: DIVERadialHandle, e: DraggableEvent): void {
        if (!this._startRot) return;
        if (!this.parent) return;
        if (!this.parent.parent) return;
        if (!('onChange' in this.parent.parent)) return;

        const currentVector = e.dragCurrent.clone().sub(this.parent.parent.position).normalize();
        const startVector = e.dragStart.clone().sub(this.parent.parent.position).normalize();
        const signedAngle = DIVEMath.signedAngleTo(startVector, currentVector, handle.forwardVector);
        const euler = new Euler(
            this._startRot.x + handle.forwardVector.x * signedAngle,
            this._startRot.y + handle.forwardVector.y * signedAngle,
            this._startRot.z + handle.forwardVector.z * signedAngle,
        );
        (this.parent.parent as DIVEGizmo).onChange(undefined, euler);
    }

    public onHandleDragEnd(handle: DIVERadialHandle): void {
        this._startRot = null;
        this.handleHighlight(handle.axis, false, false);
    }
}