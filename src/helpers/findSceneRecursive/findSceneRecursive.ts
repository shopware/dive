import { type Object3D } from 'three/webgpu';
import { type DIVEScene } from '../../engine/scene/Scene.ts';

/**
 * Find the scene an object belongs to.
 *
 * Returns `null` for a detached subtree. Objects are routinely built before
 * they are added to the scene -- entity prefabs are assembled and only then
 * handed to the root -- so "no scene yet" is an ordinary state, not an error.
 *
 * @param object - The object to find the scene of.
 * @returns The scene, or `null` when the object is not (yet) in one.
 */
export const findSceneRecursive = (
    object: Object3D | null | undefined,
): DIVEScene | null => {
    let current: Object3D | null = object ?? null;

    while (current) {
        if ('isDIVEScene' in current) return current as unknown as DIVEScene;
        current = current.parent;
    }

    return null;
};
