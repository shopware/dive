import { Vector3Like } from "three";

export default interface COMPUTE_ENCOMPASSING_VIEW {
    'PAYLOAD': object,
    'RETURN': {
        position: Vector3Like,
        target: Vector3Like
    },
};
