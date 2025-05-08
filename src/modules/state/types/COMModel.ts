import { type Vector3Like } from 'three';
import { type COMMaterial } from './COMMaterial.ts';
import { type COMBaseEntity } from './COMBaseEntity.ts';
import { type COMEntity } from './COMEntity.ts';

export function isCOMModel(entity: COMEntity): entity is COMModel {
    return entity.entityType === 'model';
}

export type COMModel = COMBaseEntity & {
    entityType: 'model';
    uri: string;
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    loaded: boolean;
    material?: Partial<COMMaterial>;
};
