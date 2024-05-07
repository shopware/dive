import { Vector3Like } from "three";

export default interface MOVE_CAMERA {
    'PAYLOAD': {
        position: Vector3Like,
        target: Vector3Like,
        locked: boolean,
        duration: number,
    } | {
        id: string,
        locked: boolean,
        duration: number
    },
    'RETURN': boolean,
};