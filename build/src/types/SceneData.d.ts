import { Vector3Like } from 'three';
import { COMGroup, COMLight, COMModel, COMPov, COMPrimitive } from '../dive';
export type DIVESceneData = {
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
    lights: COMLight[];
    objects: COMModel[];
    cameras: COMPov[];
    primitives: COMPrimitive[];
    groups: COMGroup[];
};
