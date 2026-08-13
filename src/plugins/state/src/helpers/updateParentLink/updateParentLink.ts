import { Vector3 } from 'three/webgpu';
import {
    DIVENode,
    MultiLineComponent,
    type DIVESceneObject,
} from '@shopware-ag/dive';

/** Link lines start at the group's own origin. */
const ORIGIN = new Vector3();

/**
 * Draws the link from a group to one of its members, wherever the member is now.
 *
 * Grouping is a state-level idea: the engine only knows that some node holds a
 * `MultiLineComponent`. So the knowledge that "a member gets a line from its
 * parent's origin" lives here, and the line component stays a plain drawing
 * primitive that watches nothing.
 *
 * Takes the **member**, not the group: it walks up to whatever the parent happens
 * to be, so no caller has to know which group an object is in, or notice when
 * that changes. Does nothing when the parent draws no lines, which is the normal
 * case.
 *
 * Adding and moving are the same call, keyed by the member itself. The gateway
 * used to keep a handle per member and had one method to add, one to remove and
 * one to redraw — and the redraw had to be remembered at four call sites, where
 * it was duly forgotten at one of them. There is nothing left to forget: a move
 * arrives as `object-transform`, and this is idempotent.
 *
 * Only the drawing side lives here. Dropping a link is nobody's decision: the
 * group hears `childremoved` and does it, which is set up where the line
 * component is attached.
 *
 * @param sceneObject - The member whose link should be drawn.
 *
 * @module
 */
export const updateParentLink = (sceneObject: DIVESceneObject): void => {
    const parent = sceneObject.parent;
    if (!parent || !('isDIVENode' in parent)) return;

    (parent as unknown as DIVENode)
        .getComponent(MultiLineComponent)
        ?.setLineFor(sceneObject, ORIGIN, sceneObject.position);
};
