import { type Vector3Like } from 'three';
import { type COMBaseEntity } from './COMBaseEntity.ts';
import { type COMEntity } from './COMEntity.ts';

export function isCOMPov(entity: COMEntity): entity is COMPov {
    return entity.entityType === 'pov';
}

export type COMPov = COMBaseEntity & {
    position: Vector3Like;
    target: Vector3Like;
    locked?: boolean;
};
