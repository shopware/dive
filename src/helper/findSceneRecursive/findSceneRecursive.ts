import type { Object3D } from 'three';
import type DIVEScene from '../../scene/Scene';

/**
 * Find the scene object of an object.
 *
 * @param object - The object to find the scene of.
 * @returns The scene object.
 */

export const findSceneRecursive = (object: Object3D): DIVEScene => {
    if (object.parent) {
        return findSceneRecursive(object.parent);
    }
    return object as DIVEScene;
}