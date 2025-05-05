import { Vector3Like } from 'three';
import { COMBaseEntity } from './COMBaseEntity.ts';
import { COMEntity } from './COMEntity.ts';
export declare function isCOMGroup(entity: COMEntity): entity is COMGroup;
export type COMGroup = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    bbVisible?: boolean;
};
