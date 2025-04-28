import { type Vector3Like } from 'three';
import { type COMBaseEntity } from './COMBaseEntity';
import { type COMEntity } from './COMEntity';

export function isCOMGroup(entity: COMEntity): entity is COMGroup {
    return entity.entityType === 'group';
}

export type COMGroup = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    bbVisible?: boolean;
};
