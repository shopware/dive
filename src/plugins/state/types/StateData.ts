import type { Vector3Like } from 'three/webgpu';
import {
    GroupSchema,
    LightSchema,
    ModelSchema,
    CameraSchema,
    PrimitiveSchema,
} from './index.ts';

export type StateData = {
    // scene data
    name: string;
    backgroundColor: string;
    floorEnabled: boolean;
    floorColor: string;

    // scene content
    spotmarks: object[];
    lights: LightSchema[];
    objects: ModelSchema[];
    cameras: CameraSchema[];
    primitives: PrimitiveSchema[];
    groups: GroupSchema[];

    // user data
    userCamera: {
        position: Vector3Like;
        target: Vector3Like;
    };
};
