import { Vector3Like } from "three";

export default interface GENERATE_MEDIA {
    'PAYLOAD': ({
        position: Vector3Like,
        target: Vector3Like,
    } | {
        id: string,
    }) & {
        width: number, // image width in pixels
        height: number, // image height in pixels
        dataUri: string
    },
    'RETURN': boolean,
}