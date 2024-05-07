import { Vector3Like } from "three";

export default interface SET_CAMERA_TRANSFORM {
    'PAYLOAD': {
        position: Vector3Like,
        target: Vector3Like,
    },
    'RETURN': boolean,
};
