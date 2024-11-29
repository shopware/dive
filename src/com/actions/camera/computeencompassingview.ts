import { Vector3Like } from 'three';

export default interface COMPUTE_ENCOMPASSING_VIEW {
    DESCRIPTION: 'Calculates the camera position and target to view the whole scene. (experimental)';
    PAYLOAD: object;
    RETURN: {
        position: Vector3Like;
        target: Vector3Like;
    };
}
