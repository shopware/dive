import { Vector3 } from 'three/webgpu';
import {
    DIVENode,
    MultiLineComponent,
    type DIVESceneObject,
} from '@shopware-ag/dive';

/** Link lines start at the group's own origin. */
const ORIGIN = new Vector3();

/** The line component of this object's parent, if it has one. */
const parentLines = (
    sceneObject: DIVESceneObject,
): MultiLineComponent | undefined => {
    const parent = sceneObject.parent;
    if (!parent || !('isDIVENode' in parent)) return undefined;

    return (parent as unknown as DIVENode).getComponent(MultiLineComponent);
};

/**
 * Draws the link from a group to one of its members, wherever the member is now.
 *
 * Grouping is a state-level idea: the engine only knows that some node holds a
 * `MultiLineComponent`. So the knowledge that "a member gets a line from its
 * parent's origin" lives here, and the line component stays a plain drawing
 * primitive that watches nothing.
 *
 * Adding and moving are the same call, keyed by the member itself. The gateway
 * used to keep a handle per member and had one method to add, one to remove and
 * one to redraw — and the redraw had to be remembered at four call sites, where
 * it was duly forgotten at one of them. There is nothing left to forget: a move
 * arrives as `object-transform`, and this is idempotent.
 *
 * Does nothing when the parent draws no lines, which is the normal case.
 *
 * @param sceneObject - The member whose link should be drawn.
 *
 * @module
 */
export const updateParentLink = (sceneObject: DIVESceneObject): void => {
    parentLines(sceneObject)?.setLineFor(
        sceneObject,
        ORIGIN,
        sceneObject.position,
    );
};

/**
 * Drops the link a member has to its current parent.
 *
 * Has to run *before* the member is re-parented: three sets `child.parent` to
 * `null` on removal, so afterwards the old parent — and its line — can no longer
 * be reached.
 *
 * @param sceneObject - The member that is leaving.
 */
export const removeParentLink = (sceneObject: DIVESceneObject): void => {
    parentLines(sceneObject)?.removeLineFor(sceneObject);
};
