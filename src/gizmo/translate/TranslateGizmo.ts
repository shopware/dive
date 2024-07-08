import { Object3D, Vector3 } from "three";
import { AxesColorBlue, AxesColorGreen, AxesColorRed } from "../../constant/AxisHelperColors";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { DIVEAxisHandle } from "../handles/AxisHandle";
import { DIVEGizmo, DIVEGizmoAxis } from "../Gizmo";
import { DraggableEvent } from "../../toolbox/BaseTool";

export class DIVETranslateGizmo extends Object3D {
    private _controller: DIVEOrbitControls;

    public children: DIVEAxisHandle[];

    private _startPos: Vector3 | null;

    constructor(controller: DIVEOrbitControls) {
        super();

        this.name = "DIVETranslateGizmo";

        this.children = [];

        this._startPos = null;

        this._controller = controller;

        this.add(new DIVEAxisHandle('x', 1, new Vector3(1, 0, 0), AxesColorRed));
        this.add(new DIVEAxisHandle('y', 1, new Vector3(0, 1, 0), AxesColorGreen));
        this.add(new DIVEAxisHandle('z', 1, new Vector3(0, 0, 1), AxesColorBlue));
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

    public onHandleHover(handle: DIVEAxisHandle, value: boolean): void {
        // If _startPos is set, it means there is a drag operation in progress.
        // While dragging, we don't want to change the hover state.
        if (this._startPos) return;

        if (!this.parent) return;
        if (!this.parent.parent) return;
        (this.parent.parent as DIVEGizmo).onHover('translate', handle.axis, value);

        this.handleHighlight(handle.axis, value, false);
    }

    public onHandleDragStart(handle: DIVEAxisHandle): void {
        if (!this.parent) return;
        if (!this.parent.parent) return;

        const object = (this.parent.parent as DIVEGizmo).object;
        if (!object) return;

        this._startPos = object.position.clone();
        this.handleHighlight(handle.axis, true, true);
    }

    public onHandleDrag(handle: DIVEAxisHandle, e: DraggableEvent): void {
        if (!this._startPos) return;

        if (!this.parent) return;
        if (!this.parent.parent) return;
        if (!('onChange' in this.parent.parent)) return;

        const delta = e.dragDelta.clone().projectOnVector(handle.forwardVector);
        (this.parent.parent as DIVEGizmo).onChange(this._startPos.clone().add(delta));
    }

    public onHandleDragEnd(handle: DIVEAxisHandle): void {
        this._startPos = null;
        this.handleHighlight(handle.axis, false, false);
    }
}