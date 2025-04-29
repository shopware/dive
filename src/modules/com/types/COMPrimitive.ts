import { type Vector3Like } from 'three';
import { type COMBaseEntity } from './COMBaseEntity';
import { type COMGeometry } from './COMGeometry';
import { type COMMaterial } from './COMMaterial';
import { type COMEntity } from './COMEntity';
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
