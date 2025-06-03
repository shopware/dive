import { Vector3Like } from 'three';
import { COMBaseEntity } from './COMBaseEntity.ts';
import { COMEntity } from './COMEntity.ts';
export declare function isCOMLight(entity: COMEntity): entity is COMLight;
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
export {};
