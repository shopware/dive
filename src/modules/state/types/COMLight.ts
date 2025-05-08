import { type Vector3Like } from 'three';
import { type COMBaseEntity } from './COMBaseEntity.ts';
import { type COMEntity } from './COMEntity.ts';

export function isCOMLight(entity: COMEntity): entity is COMLight {
    return entity.entityType === 'light';
}

export type COMBaseLight = COMBaseEntity & {
    type: LightType;
    intensity: number;
    color: string | number;
    enabled: boolean;
    position?: Vector3Like;
    rotation?: Vector3Like;
};

export type COMAmbientLight = COMBaseLight & {
    entityType: 'light';
    type: 'ambient';
};

export type COMPointLight = COMBaseLight & {
    entityType: 'light';
    type: 'point';
    position: Vector3Like;
};

export type COMSceneLight = COMBaseLight & {
    entityType: 'light';
    type: 'scene';
};

type LightType = 'ambient' | 'point' | 'scene';

export type COMLight = COMAmbientLight | COMPointLight | COMSceneLight;
