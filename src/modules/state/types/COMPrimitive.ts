import { type Vector3Like } from 'three';
import { type COMBaseEntity } from './COMBaseEntity.ts';
import { type COMGeometry } from './COMGeometry.ts';
import { type COMMaterial } from './COMMaterial.ts';
import { type COMEntity } from './COMEntity.ts';
export function isCOMPrimitive(entity: COMEntity): entity is COMPrimitive {
    return entity.entityType === 'primitive';
}

export type COMPrimitive = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    geometry: COMGeometry;
    material?: Partial<COMMaterial>;
};
