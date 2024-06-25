import { Euler, Object3D, Vector3 } from "three";
import { AxesColorBlue, AxesColorGreen, AxesColorRed } from "../../constant/AxisHelperColors";
import DIVEOrbitControls from "../../controls/OrbitControls";
import { DIVERadialHandle } from "../handles/RadialHandle";
import { DIVEGizmo, DIVEGizmoAxis } from "../Gizmo";
import { DraggableEvent } from "../../toolbox/BaseTool";
import { DIVEMath } from "../../math";

export class DIVERotateGizmo extends Object3D {
    private _controller: DIVEOrbitControls;

    private startRot: Euler = new Euler();

    constructor(controller: DIVEOrbitControls) {
        super();

        this.name = "DIVERotateGizmo";

        this._controller = controller;

        controller.addEventListener('change', () => {
            const size = controller.getDistance() / 2.5;
            this.scale.set(size, size, size);
        })

        this.add(new DIVERadialHandle('x', Math.PI * 2, new Vector3(1, 0, 0), AxesColorRed));
        this.add(new DIVERadialHandle('y', Math.PI * 2, new Vector3(0, 1, 0), AxesColorGreen));
        this.add(new DIVERadialHandle('z', Math.PI * 2, new Vector3(0, 0, 1), AxesColorBlue));
    }
    public getHandle(axis: DIVEGizmoAxis): DIVERadialHandle {
        switch (axis) {
            case 'x':
                return this.children[0] as DIVERadialHandle;
            case 'y':
                return this.children[1] as DIVERadialHandle;
            case 'z':
                return this.children[2] as DIVERadialHandle;
        }
    }

    public onHoverAxis(axis: DIVEGizmoAxis, value: boolean): void {
        if (!this.parent) return;
        if (!this.parent.parent) return;
        (this.parent.parent as DIVEGizmo).onHover('rotate', axis, value);
    }

    public onAxisDragStart(): void {
        this._controller.enabled = false;

        if (!this.parent) return;
        if (!this.parent.parent) return;

        const object = (this.parent.parent as DIVEGizmo).object;
        if (!object) return;

        this.startRot.copy(object.rotation.clone());
    }

    public onAxisDrag(axis: DIVERadialHandle, e: DraggableEvent): void {
        if (!this.parent) return;
        if (!this.parent.parent) return;
        if ('onChange' in this.parent.parent) {
            const currentVector = e.dragCurrent.clone().sub(this.parent.parent.position).normalize();
            const startVector = e.dragStart.clone().sub(this.parent.parent.position).normalize();
            const signedAngle = DIVEMath.signedAngleTo(startVector, currentVector, axis.forwardVector);
            const euler = new Euler(
                this.startRot.x + axis.forwardVector.x * signedAngle,
                this.startRot.y + axis.forwardVector.y * signedAngle,
                this.startRot.z + axis.forwardVector.z * signedAngle,
            );
            (this.parent.parent as DIVEGizmo).onChange(undefined, euler);
        }
    }

    public onAxisDragEnd(): void {
        this._controller.enabled = true;
        this.startRot.set(0, 0, 0);
    }
}