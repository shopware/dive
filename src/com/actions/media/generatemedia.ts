import { Vector3Like } from "three";

export default interface GENERATE_MEDIA {
    'PAYLOAD': ({
        position: Vector3Like,
        target: Vector3Like,
    } | {
        id: string,
    }) & {
        width: number,
        height: number,
        dataUri: string
    },
    'RETURN': boolean,
}