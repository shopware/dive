import { Vector3Like } from 'three';
import { COMMaterial } from './COMMaterial.ts';
import { COMBaseEntity } from './COMBaseEntity.ts';
import { COMEntity } from './COMEntity.ts';
export declare function isCOMModel(entity: COMEntity): entity is COMModel;
export type COMModel = COMBaseEntity & {
    uri: string;
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    loaded: boolean;
    material?: Partial<COMMaterial>;
};
