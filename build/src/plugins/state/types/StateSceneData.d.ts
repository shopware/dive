import { Vector3Like } from 'three';
import { GroupSchema, LightSchema, ModelSchema, PovSchema, PrimitiveSchema } from '../../../index.ts';
export type StateSceneData = {
    name: string;
    mediaItem: null;
    backgroundColor: string;
    floorEnabled: boolean;
    floorColor: string;
    userCamera: {
        position: Vector3Like;
        target: Vector3Like;
    };
    spotmarks: object[];
    lights: LightSchema[];
    objects: ModelSchema[];
    cameras: PovSchema[];
    primitives: PrimitiveSchema[];
    groups: GroupSchema[];
};
