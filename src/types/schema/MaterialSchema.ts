import { type Texture } from 'three/webgpu';

export type MaterialSchema = {
    vertexColors: boolean;
    color: string | number;
    map: Texture | null;
    normalMap: Texture | null;
    roughness: number;
    roughnessMap: Texture | null;
    metalness: number;
    metalnessMap: Texture | null;
};
