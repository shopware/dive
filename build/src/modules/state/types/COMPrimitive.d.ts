import { Vector3Like } from 'three';
import { COMBaseEntity } from './COMBaseEntity.ts';
import { COMGeometry } from './COMGeometry.ts';
import { COMMaterial } from './COMMaterial.ts';
import { COMEntity } from './COMEntity.ts';
export declare function isCOMPrimitive(entity: COMEntity): entity is COMPrimitive;
export type COMPrimitive = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    geometry: COMGeometry;
    material?: Partial<COMMaterial>;
};
