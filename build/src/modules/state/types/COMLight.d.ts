import { Vector3Like } from 'three';
import { COMBaseEntity } from './COMBaseEntity.ts';
import { COMEntity } from './COMEntity.ts';
export declare function isCOMLight(entity: COMEntity): entity is COMLight;
export type COMLight = COMBaseEntity & {
    type: 'ambient' | 'point' | 'scene';
    intensity: number;
    color: string | number;
    enabled: boolean;
    position?: Vector3Like;
    rotation?: Vector3Like;
};
