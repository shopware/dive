import { Vector3Like } from 'three';
import { COMMaterial } from './COMMaterial';
import { COMBaseEntity } from './COMBaseEntity';
export type COMModel = COMBaseEntity & {
    uri: string;
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    loaded: boolean;
    material?: Partial<COMMaterial>;
};
