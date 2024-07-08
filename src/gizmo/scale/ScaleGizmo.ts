import { Object3D, Vector3 } from "three";
import { AxesColorBlue, AxesColorGreen, AxesColorRed } from "../../constant/AxisHelperColors";
import { DIVEHoverable } from "../../interface/Hoverable";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { DIVEScaleHandle } from "../handles/ScaleHandle";
import { DraggableEvent } from "../../toolbox/BaseTool";
import { DIVEGizmoAxis, DIVEGizmo } from "../Gizmo";

export class DIVEScaleGizmo extends Object3D implements DIVEHoverable {
    readonly isHoverable: true = true;

    public children: DIVEScaleHandle[];

    private _controller: DIVEOrbitControls;

    private _startScale: Vector3 | null;

    constructor(controller: DIVEOrbitControls) {
        super();

        this.name = "DIVEScaleGizmo";

        this.children = [];

        this._startScale = null;

        this._controller = controller;

        this.add(new DIVEScaleHandle('x', 1, new Vector3(1, 0, 0), AxesColorRed));
        this.add(new DIVEScaleHandle('y', 1, new Vector3(0, 1, 0), AxesColorGreen));
        this.add(new DIVEScaleHandle('z', 1, new Vector3(0, 0, 1), AxesColorBlue));
    }

    public reset(): void {
        this.children.forEach((child) => {
            child.reset();
        });
    }

    public update(scale: Vector3): void {
        this.children.forEach((child) => {
            child.update(scale);
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

    public onHoverAxis(handle: DIVEScaleHandle, value: boolean): void {
        // If _startScale is set, it means there is a drag operation in progress.
        // While dragging, we don't want to change the hover state.
        if (this._startScale) return;

        if (!this.parent) return;
        if (!this.parent.parent) return;
        (this.parent.parent as DIVEGizmo).onHover('translate', handle.axis, value);

        this.handleHighlight(handle.axis, value, false);
    }

    public onAxisDragStart(handle: DIVEScaleHandle): void {
        if (!this.parent) return;
        if (!this.parent.parent) return;

        const object = (this.parent.parent as DIVEGizmo).object;
        if (!object) return;

        this._startScale = object.scale.clone();
        this.handleHighlight(handle.axis, true, true);
    }

    public onAxisDrag(axis: DIVEScaleHandle, e: DraggableEvent): void {
        if (!this._startScale) return;

        if (!this.parent) return;
        if (!this.parent.parent) return;
        if (!('onChange' in this.parent.parent)) return;

        const delta = e.dragDelta.clone().projectOnVector(axis.forwardVector);
        (this.parent.parent as DIVEGizmo).onChange(undefined, undefined, this._startScale.clone().add(delta));
    }

    public onAxisDragEnd(handle: DIVEScaleHandle): void {
        this._startScale = null;
        this.handleHighlight(handle.axis, false, false);
    }
}