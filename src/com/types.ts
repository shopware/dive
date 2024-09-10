import { Vector3Like } from "three";

type COMBaseEntity = {
    id: string;
    name: string;
    entityType: 'pov' | 'light' | 'model' | 'primitive';
    visible: boolean;
}
export type COMPov = COMBaseEntity & {
    position: Vector3Like;
    target: Vector3Like;
    locked?: boolean;
};

export type COMLight = COMBaseEntity & {
    type: 'ambient' | 'point' | 'scene';
    intensity: number;
    color: string | number;
    enabled: boolean;
    position?: Vector3Like;
};

export type COMModel = COMBaseEntity & {
    uri: string;
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    loaded: boolean;
};

export type COMPrimitive = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    geometry: {
        name: string
        width: number;
        height: number;
        depth: number;
    };
};

export type COMEntity = COMPov | COMLight | COMModel | COMPrimitive;
