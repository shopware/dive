import { Vector3Like, QuaternionLike } from 'three/webgpu';

export type OrbitControllerState = {
    target: Vector3Like;
    azimuthalAngle: number;
    polarAngle: number;
    distance: number;
    position: Vector3Like;
    quaternion: QuaternionLike;
};
