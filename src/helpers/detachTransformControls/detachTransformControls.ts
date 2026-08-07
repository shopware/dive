import { type Object3D } from 'three/webgpu';
import { type TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { findSceneRecursive } from '../findSceneRecursive/findSceneRecursive.ts';

/**
 * Release the gizmo if it is currently holding this object.
 *
 * Only necessary because the old `TransformControls` are still in use instead
 * of `DIVEGizmo`: they keep a reference to their target, so removing the
 * object from the scene without detaching first leaves the gizmo pointing at
 * something that is no longer there.
 *
 * Both shapes are checked because the controls sit under a helper root in
 * newer three versions and directly in the scene in older ones.
 *
 * @param object - The object about to leave the scene.
 */
export const detachTransformControls = (object: Object3D): void => {
    findSceneRecursive(object).children.find((sceneChild) => {
        const helperRoot = sceneChild as Object3D & {
            isTransformControlsRoot?: boolean;
            controls?: TransformControls;
        };
        if (helperRoot.isTransformControlsRoot && helperRoot.controls) {
            helperRoot.controls.detach();
            return true;
        }

        const controls = sceneChild as Object3D & {
            isTransformControls?: boolean;
            detach?: () => void;
        };
        if (controls.isTransformControls && controls.detach) {
            controls.detach();
            return true;
        }

        return false;
    });
};
