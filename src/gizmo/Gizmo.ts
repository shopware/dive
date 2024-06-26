import { Euler, Object3D, Vector3 } from "three";
import { DIVERotateGizmo } from "./rotate/RotateGizmo";
import { DIVETranslateGizmo } from "./translate/TranslateGizmo";
import DIVEOrbitControls from "../controls/OrbitControls";
import { DIVEScaleGizmo } from "./scale/ScaleGizmo";
import { DIVEGizmoPlane as DIVEGizmoPlane } from "./plane/GizmoPlane";
import { DIVESelectable } from "../interface/Selectable";

export type DIVEGizmoMode = ('translate' | 'rotate' | 'scale');

export type DIVEGizmoAxis = 'x' | 'y' | 'z';

export class DIVEGizmo extends Object3D {
    private _mode: DIVEGizmoMode[];
    public get mode(): DIVEGizmoMode[] {
        return this._mode;
    }
    public set mode(value: DIVEGizmoMode[]) {
        this._mode = value;
        this.assemble();
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

    // attachment stuff
    private _object: (Object3D & DIVESelectable) | null;
    public get object(): (Object3D & DIVESelectable) | null {
        return this._object;
    }

    public set object(value: (Object3D & DIVESelectable) | null) {
        this._object = value;
        this.assemble();
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

        this._object = null;
    }

    public onHover(mode: DIVEGizmoMode, axis: DIVEGizmoAxis, value: boolean): void {
        if (!value) return;
        this._gizmoPlane.assemble(mode, axis);
    }

    public onChange(position?: Vector3, rotation?: Euler, scale?: Vector3): void {
        if (this.object === null) return;

        if (position) {
            this.position.copy(position);
            this.object.position.copy(position);
        }

        if (rotation) {
            this.object.rotation.copy(rotation);
        }

        if (scale) {
            this.object.scale.copy(scale);
        }
    }

    private assemble(): void {
        // clear all children
        this._gizmoNode.clear();
        this._gizmoPlane.clear();

        // reset all gizmos
        this._translateGizmo.reset();
        this._rotateGizmo.reset();
        this._scaleGizmo.reset();

        // check for object
        if (this.object === null) return;

        // add gizmos
        if (this._mode.includes('translate')) {
            this._gizmoNode.add(this._translateGizmo);
        }

        if (this._mode.includes('rotate')) {
            this._gizmoNode.add(this._rotateGizmo);
        }

        if (this._mode.includes('scale')) {
            this._gizmoNode.add(this._scaleGizmo);
        }

        // add plane for raycasting properly while dragging
        this.add(this._gizmoPlane);
    }
}