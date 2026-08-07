import { type Texture } from 'three/webgpu';

/**
 * Surface properties of a model or primitive.
 *
 * Both carry this as a `Partial`, and a patch is merged into what is already
 * there field by field. A nested field can therefore be overwritten but not
 * removed again through an update.
 *
 * The `null` on the texture slots means "no texture", not "unchanged".
 */
export type DIVEMaterial = {
    vertexColors: boolean;
    color: string | number;
    /** The base colour texture. */
    map: Texture | null;
    normalMap: Texture | null;
    roughness: number;
    roughnessMap: Texture | null;
    metalness: number;
    metalnessMap: Texture | null;
};
