import { type DIVENode, type DIVESceneObject } from '@shopware-ag/dive';
import { GroupLinksComponent } from '../../components/grouplinks/GroupLinksComponent.ts';

/**
 * Draws the link from a group to one of its members, wherever the member is now.
 *
 * Takes the **member**, not the group: it walks up to whatever the parent happens
 * to be, so no caller has to know which group an object is in, or notice when
 * that changes. Does nothing when the parent has no `GroupLinksComponent`, which
 * is the normal case; another line component on it, like a camera's icon, is
 * left alone.
 *
 * Idempotent, so a move arriving as `object-transform` just calls it again.
 * Dropping a link is the component's own business, see `GroupLinksComponent`.
 *
 * @param sceneObject - The member whose link should be drawn.
 *
 * @module
 */
export const updateParentLink = (sceneObject: DIVESceneObject): void => {
    const parent = sceneObject.parent;
    if (!parent || !('isDIVENode' in parent)) return;

    (parent as unknown as DIVENode)
        .getComponent(GroupLinksComponent)
        ?.updateLinkFor(sceneObject);
};
