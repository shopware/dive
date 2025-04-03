import { Vector3Like } from 'three';
export default interface MOVE_CAMERA {
    DESCRIPTION: 'Moves the camera to a new position and target.';
    PAYLOAD: {
        position: Vector3Like;
        target: Vector3Like;
        locked: boolean;
        duration: number;
    } | {
        id: string;
        locked: boolean;
        duration: number;
    };
    RETURN: boolean;
}
