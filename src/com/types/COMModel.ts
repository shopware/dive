import { type Vector3Like } from "three";
import { type COMMaterial } from "./COMMaterial";
import { type COMBaseEntity } from "./COMBaseEntity";

export type COMModel = COMBaseEntity & {
    uri: string;
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    loaded: boolean;
    material?: Partial<COMMaterial>;
};