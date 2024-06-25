import { Object3D, Vector3 } from "three";
import { DIVERotateGizmo } from "./rotate/RotateGizmo";
import { DIVETranslateGizmo } from "./translate/TranslateGizmo";
import DIVEOrbitControls from "../controls/OrbitControls";
import { DIVEScaleGizmo } from "./scale/ScaleGizmo";
import { DIVEGizmoPlane as DIVEGizmoPlane } from "./plane/GizmoPlane";

export type DIVEGizmoMode = ('translate' | 'rotate' | 'scale');

export type DIVEGizmoAxis = 'x' | 'y' | 'z';

export class DIVEGizmo extends Object3D {
    private _mode: DIVEGizmoMode[];
    public get mode(): DIVEGizmoMode[] {
        return this._mode;
    }
    public set mode(value: DIVEGizmoMode[]) {
        this._mode = value;
        this.updateMode();
    }

    private _gizmoNode: Object3D;
    public get gizmoNode(): Object3D {
        return this._gizmoNode;
    }
    private _translateGizmo: DIVETranslateGizmo;
    private _rotateGizmo: DIVERotateGizmo;
    private _scaleGizmo: DIVEScaleGizmo;

    private _gizmoPlane: DIVEGizmoPlane;
    public get gizmoPlane(): DIVEGizmoPlane {
        return this._gizmoPlane;
    }

    constructor(controller: DIVEOrbitControls) {
        super();
        this.name = "DIVEGizmo";

        controller.addEventListener('change', () => {
            const size = controller.getDistance() / 2.5;
            this.scale.set(size, size, size);
        });

        this._mode = [];

        this._gizmoNode = new Object3D();
        this.add(this._gizmoNode);

        this._translateGizmo = new DIVETranslateGizmo(controller);
        this._rotateGizmo = new DIVERotateGizmo(controller);
        this._scaleGizmo = new DIVEScaleGizmo(controller);

        this._gizmoPlane = new DIVEGizmoPlane();
        this._gizmoPlane.visible = false;

        this.updateMode();
    }

    public onHover(mode: DIVEGizmoMode, axis: DIVEGizmoAxis, value: boolean): void {
        switch (mode) {
            case 'translate':
                if (!value) break;
                this._gizmoPlane.onHover(axis);
                break;
        }

    }

    public onChange(position: Vector3): void {
        this.position.copy(position);
    }

    private updateMode(): void {
        this._gizmoNode.clear();
        if (this._mode.includes('translate')) {
            this._gizmoNode.add(this._translateGizmo);
        }
        if (this._mode.includes('rotate')) {
            this._gizmoNode.add(this._rotateGizmo);
        }
        if (this._mode.includes('scale')) {
            this._gizmoNode.add(this._scaleGizmo);
        }
        this.add(this._gizmoPlane);
    }
}