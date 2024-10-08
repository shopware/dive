import { Vector3Like } from "three";
import { COMLight, COMModel, COMPov } from "../../types";

type SceneData = {
    name: string,
    mediaItem: null,
    backgroundColor: string,
    floorEnabled: boolean,
    floorColor: string,
    userCamera: {
        position: Vector3Like,
        target: Vector3Like,
    },
    spotmarks: object[],
    lights: COMLight[],
    objects: COMModel[],
    cameras: COMPov[],,
    primitives: COMPrimitive[];
};

export default interface GET_ALL_SCENE_DATA {
    'PAYLOAD': object,
    'RETURN': SceneData,
};
