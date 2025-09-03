import { Vector3Like } from 'three';
import { QuaternionLike } from 'three';

export type OrbitControllerState = {
    target: Vector3Like;
    azimuthalAngle: number;
    polarAngle: number;
    distance: number;
    position: Vector3Like;
    quaternion: QuaternionLike;
};
