import { type Vector3Like } from 'three';
import { type COMBaseEntity } from './COMBaseEntity.ts';
import { type COMEntity } from './COMEntity.ts';

export function isCOMLight(entity: COMEntity): entity is COMLight {
    return entity.entityType === 'light';
}

export type COMLight = COMBaseEntity & {
    type: 'ambient' | 'point' | 'scene';
    intensity: number;
    color: string | number;
    enabled: boolean;
    position?: Vector3Like;
    rotation?: Vector3Like;
};
