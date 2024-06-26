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

    private _startScale: Vector3 = new Vector3();

    constructor(controller: DIVEOrbitControls) {
        super();

        this.name = "DIVEScaleGizmo";

        this.children = [];

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

    public onHoverAxis(axis: DIVEGizmoAxis, value: boolean): void {
        if (!this.parent) return;
        if (!this.parent.parent) return;
        (this.parent.parent as DIVEGizmo).onHover('translate', axis, value);
    }

    public onAxisDragStart(): void {
        this._controller.enabled = false;

        if (!this.parent) return;
        if (!this.parent.parent) return;

        const object = (this.parent.parent as DIVEGizmo).object;
        if (!object) return;

        this._startScale.copy(object.scale.clone());
    }

    public onAxisDrag(axis: DIVEScaleHandle, e: DraggableEvent): void {
        if (!this.parent) return;
        if (!this.parent.parent) return;
        if ('onChange' in this.parent.parent) {
            const delta = e.dragDelta.clone().projectOnVector(axis.forwardVector);
            (this.parent.parent as DIVEGizmo).onChange(undefined, undefined, this._startScale.clone().add(delta));
        }
    }

    public onAxisDragEnd(): void {
        this._controller.enabled = true;
        this._startScale.set(0, 0, 0);
    }
}