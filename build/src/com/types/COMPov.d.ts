import { Vector3Like } from 'three';
import { COMBaseEntity } from './COMBaseEntity';
export type COMPov = COMBaseEntity & {
    position: Vector3Like;
    target: Vector3Like;
    locked?: boolean;
};
