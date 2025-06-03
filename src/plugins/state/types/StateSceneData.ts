import type { Vector3Like } from 'three';
import type {
    GroupSchema,
    LightSchema,
    ModelSchema,
    PovSchema,
    PrimitiveSchema,
} from '@shopware-ag/dive';

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
