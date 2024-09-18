import { type Vector3Like } from "three";
import { type COMBaseEntity } from "./COMBaseEntity";

export type COMPov = COMBaseEntity & {
    position: Vector3Like;
    target: Vector3Like;
    locked?: boolean;
};