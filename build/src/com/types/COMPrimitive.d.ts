import { Vector3Like } from 'three';
import { COMBaseEntity } from './COMBaseEntity';
import { COMGeometry } from './COMGeometry';
import { COMMaterial } from './COMMaterial';
export type COMPrimitive = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    geometry: COMGeometry;
    material?: Partial<COMMaterial>;
};
