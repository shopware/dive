import { Vector3Like } from 'three';
export default interface GENERATE_MEDIA {
    DESCRIPTION: 'Generates a screenshot, stores it in a Blob and writes the URL into the payload.';
    PAYLOAD: ({
        position: Vector3Like;
        target: Vector3Like;
    } | {
        id: string;
    }) & {
        width: number;
        height: number;
        dataUri: string;
    };
    RETURN: boolean;
}
