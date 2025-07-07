import { Mesh, Object3D } from 'three';
export declare class DIVEWebXRCrosshair extends Object3D {
    set mesh(mesh: Mesh | undefined);
    constructor(mesh?: Mesh);
    useDefaultMesh(): void;
    updateFromPose(pose: XRPose): void;
}
