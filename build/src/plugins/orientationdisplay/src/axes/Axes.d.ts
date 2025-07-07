import { Matrix4, Object3D } from 'three';
export declare class OrientationDisplayAxes extends Object3D {
    private _axesHelper;
    constructor();
    setFromCameraMatrix(matrix: Matrix4): void;
}
