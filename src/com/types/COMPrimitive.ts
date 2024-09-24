import { type Vector3Like } from "three";
import { type COMBaseEntity } from "./COMBaseEntity";
import { type COMGeometry } from "./COMGeometry";
import { type COMMaterial } from "./COMMaterial";

export type COMPrimitive = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    geometry: COMGeometry;
    material?: Partial<COMMaterial>;
};