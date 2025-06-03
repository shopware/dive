import { Object3D } from 'three';
import { DIVEScene } from '../../engine/scene/Scene.ts';
/**
 * Find the scene object of an object.
 *
 * @param object - The object to find the scene of.
 * @returns The scene object.
 */
export declare const findSceneRecursive: (object: Object3D) => DIVEScene;
