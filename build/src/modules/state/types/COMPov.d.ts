import { Vector3Like } from 'three';
import { COMBaseEntity } from './COMBaseEntity';
import { COMEntity } from './COMEntity';
export declare function isCOMPov(entity: COMEntity): entity is COMPov;
export type COMPov = COMBaseEntity & {
    position: Vector3Like;
    target: Vector3Like;
    locked?: boolean;
};
