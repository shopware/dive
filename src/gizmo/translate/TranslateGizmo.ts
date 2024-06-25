import { Object3D, Vector3 } from "three";
import { AxesColorBlue, AxesColorGreen, AxesColorRed } from "../../constant/AxisHelperColors";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { DIVEAxisHandle } from "../handles/AxisHandle";
import { DIVEGizmo, DIVEGizmoAxis } from "../Gizmo";
import { DraggableEvent } from "../../toolbox/BaseTool";

export class DIVETranslateGizmo extends Object3D {
    private _controller: DIVEOrbitControls;

    constructor(controller: DIVEOrbitControls) {
        super();

        this.name = "DIVETranslateGizmo";

        this._controller = controller;

        this.add(new DIVEAxisHandle('x', 1, new Vector3(1, 0, 0), AxesColorRed));
        this.add(new DIVEAxisHandle('y', 1, new Vector3(0, 1, 0), AxesColorGreen));
        this.add(new DIVEAxisHandle('z', 1, new Vector3(0, 0, 1), AxesColorBlue));
    }

    public getHandle(axis: DIVEGizmoAxis): DIVEAxisHandle {
        switch (axis) {
            case 'x':
                return this.children[0] as DIVEAxisHandle;
            case 'y':
                return this.children[1] as DIVEAxisHandle;
            case 'z':
                return this.children[2] as DIVEAxisHandle;
        }
    }

    public onHoverAxis(axis: DIVEGizmoAxis, value: boolean): void {
        // console.log('translate: axis hovered', axis);
        if (!this.parent) return;
        if (!this.parent.parent) return;
        (this.parent.parent as DIVEGizmo).onHover('translate', axis, value);
    }


    private startPos: Vector3 = new Vector3();
    public onAxisDragStart(): void {
        // console.log('translate: axis drag start', axis);
        this._controller.enabled = false;

        if (!this.parent) return;
        if (!this.parent.parent) return;
        this.startPos.copy(this.parent.parent.position.clone());
    }

    public onAxisDrag(axis: DIVEAxisHandle, e: DraggableEvent): void {
        // console.log('translate: axis drag start', axis);

        if (!this.parent) return;
        if (!this.parent.parent) return;
        if ('onChange' in this.parent.parent) {
            // const forward = this.parent.parent.position.clone().add
            const delta = e.dragDelta.clone().projectOnVector(axis.forwardVector);
            console.log('delta', delta, 'result', this.startPos.clone().add(delta));
            (this.parent.parent as DIVEGizmo).onChange(this.startPos.clone().add(delta));
        }

    }

    public onAxisDragEnd(): void {
        // console.log('translate: axis drag', axis);
        this._controller.enabled = true;
        this.startPos.set(0, 0, 0);
    }

}