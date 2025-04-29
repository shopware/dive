import { type Vector3Like } from 'three';
import { type COMBaseEntity } from './COMBaseEntity';
import { type COMEntity } from './COMEntity';

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
