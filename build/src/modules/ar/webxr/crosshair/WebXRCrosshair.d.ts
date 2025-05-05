import { Mesh, Object3D } from 'three';
export declare class DIVEWebXRCrosshair extends Object3D {
    set mesh(mesh: Mesh | undefined);
    constructor(mesh?: Mesh);
    UseDefaultMesh(): void;
    UpdateFromPose(pose: XRPose): void;
}
