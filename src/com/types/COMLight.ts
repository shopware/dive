import { type Vector3Like } from "three";
import { type COMBaseEntity } from "./COMBaseEntity";

export type COMLight = COMBaseEntity & {
    type: 'ambient' | 'point' | 'scene';
    intensity: number;
    color: string | number;
    enabled: boolean;
    position: Vector3Like;
};