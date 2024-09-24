import { type Texture } from "three";

export type COMMaterial = {
    vertexColors: boolean;
    color: string | number;
    map: Texture | null;
    normalMap: Texture | null;
    roughness: number;
    roughnessMap: Texture | null;
    metalness: number;
    metalnessMap: Texture | null;
}