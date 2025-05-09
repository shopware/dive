import { Euler, Object3D, Vector3 } from 'three';
import { OrbitController } from '../../modules/controller/orbit/OrbitController.ts';
import { DIVEGizmoPlane as DIVEGizmoPlane } from './plane/GizmoPlane.ts';
import { DIVESelectable } from '../../interfaces/Selectable.ts';
export type DIVEGizmoMode = 'translate' | 'rotate' | 'scale';
export type DIVEGizmoAxis = 'x' | 'y' | 'z';
export declare class DIVEGizmo extends Object3D {
    private _mode;
    get mode(): DIVEGizmoMode;
    set mode(value: DIVEGizmoMode);
    set debug(value: boolean);
    private _gizmoNode;
    get gizmoNode(): Object3D;
    private _translateGizmo;
    private _rotateGizmo;
    private _scaleGizmo;
    private _gizmoPlane;
    get gizmoPlane(): DIVEGizmoPlane;
    private _object;
    get object(): (Object3D & DIVESelectable) | null;
    constructor(controller: OrbitController);
    attach(object: Object3D & DIVESelectable): this;
    detach(): this;
    onHover(mode: DIVEGizmoMode, axis: DIVEGizmoAxis, value: boolean): void;
    onChange(position?: Vector3, rotation?: Euler, scale?: Vector3): void;
    private assemble;
}
