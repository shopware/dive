import { Vector3Like } from 'three';
import { COMBaseEntity } from './COMBaseEntity';
export type COMGroup = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    bbVisible?: boolean;
};
