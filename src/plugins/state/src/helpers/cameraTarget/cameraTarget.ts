import { Vector3, type Vector3Like } from 'three/webgpu';
import { type DIVESceneObject } from '@shopware-ag/dive';

/**
 * How far along its own +Z axis each camera node's target sits, in the node's
 * local space.
 *
 * A `WeakMap` rather than `userData`, which `Object3D.copy` and the exporter
 * carry along.
 */
const targetDistances = new WeakMap<DIVESceneObject, number>();

/**
 * Turns a camera node towards a world-space target and remembers how far away
 * it is.
 *
 * The target is stored relative to the node, so it moves, turns and scales with
 * whatever group the camera hangs in.
 *
 * @param node - The camera's node, already at its position.
 * @param target - The world point it looks at.
 */
export const aimCamera = (node: DIVESceneObject, target: Vector3Like): void => {
    const worldTarget = new Vector3(target.x, target.y, target.z);

    /** non-camera objects turn +Z towards the target */
    node.lookAt(worldTarget);
    node.updateWorldMatrix(true, false);

    targetDistances.set(node, node.worldToLocal(worldTarget).z);
};

/**
 * Where a camera node's target is now, in world space.
 *
 * @param node - The camera's node.
 */
export const readCameraTarget = (node: DIVESceneObject): Vector3 => {
    node.updateWorldMatrix(true, false);

    return node.localToWorld(new Vector3(0, 0, targetDistances.get(node) ?? 0));
};
