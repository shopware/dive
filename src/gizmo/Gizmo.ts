import { Object3D } from "three";
import { DIVERotateGizmo } from "./rotate/RotateGizmo";
import { DIVETranslateGizmo } from "./translate/TranslateGizmo";
import DIVEOrbitControls from "../controls/OrbitControls";
import { DIVEScaleGizmo } from "./scale/ScaleGizmo";
import { DIVEGizmoPlane } from "./plane/GizmoPlane";

export type DIVEGizmoMode = ('translate' | 'rotate' | 'scale');

export type DIVEGizmoAxis = 'x' | 'y' | 'z';

export class DIVEGizmo extends Object3D {
    private controller: DIVEOrbitControls;

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

        this.controller = controller;

        this._mode = [];

        this._gizmoNode = new Object3D();
        this.add(this._gizmoNode);

        this._translateGizmo = new DIVETranslateGizmo(controller);
        this._rotateGizmo = new DIVERotateGizmo(controller);
        this._scaleGizmo = new DIVEScaleGizmo(controller);

        this._gizmoPlane = new DIVEGizmoPlane();
        console.log('gizmoPlane:', this._gizmoPlane.rotation);

        this.updateMode();
    }

    public onHover(mode: DIVEGizmoMode): void {
        switch (mode) {
            case 'translate':
                const camQuat = this.controller.object.quaternion.clone();
                this._gizmoPlane.quaternion.copy(camQuat);
                break;
        }

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