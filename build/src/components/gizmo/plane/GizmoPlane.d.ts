import { Mesh, Object3D } from 'three';
import { DIVEGizmoAxis, DIVEGizmoMode } from '../Gizmo.ts';
export declare class DIVEGizmoPlane extends Object3D {
    private _meshX;
    get XPlane(): Mesh;
    private _meshY;
    get YPlane(): Mesh;
    private _meshZ;
    get ZPlane(): Mesh;
    constructor();
    assemble(mode: DIVEGizmoMode, axis: DIVEGizmoAxis): void;
}
