import { Vector3Like } from 'three';
export default interface GET_CAMERA_TRANSFORM {
    DESCRIPTION: 'Returns the current camera position and target.';
    PAYLOAD: object;
    RETURN: {
        position: Vector3Like;
        target: Vector3Like;
    };
}
