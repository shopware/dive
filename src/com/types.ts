import { type Texture, type Vector3Like } from "three";

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
    material?: COMMaterial;
};

export type COMGeometry = {
    name: string
    width: number;
    height: number;
    depth: number;
}

export type COMMaterial = {
    color: string | number;
    roughness: number;
    roughnessMap?: Texture;
    metalness: number;
    metalnessMap?: Texture;
}

export type COMPrimitive = COMBaseEntity & {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
    geometry: COMGeometry;
    material: COMMaterial;
};

export type COMEntity = COMPov | COMLight | COMModel | COMPrimitive;
