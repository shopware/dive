import { Vector3, type Object3D, type Object3DEventMap } from 'three/webgpu';
import { MultiLineComponent, type DIVENode } from '@shopware-ag/dive';

/** Links start at the group's own origin. */
const ORIGIN = new Vector3();

/**
 * #### GroupLinksComponent
 * draws a line from a group's origin to each of its members.
 *
 * A `MultiLineComponent` of its own type, so the group's links can be told
 * apart from any other line component, like a camera's icon:
 * `getComponent(GroupLinksComponent)` finds only these.
 *
 * It drops a member's link itself when the member leaves, whichever way it
 * goes, because `Object3D.remove` nulls `child.parent` before announcing
 * anything. Drawing and moving a link is {@link updateLinkFor}.
 *
 * @module
 */
export class GroupLinksComponent extends MultiLineComponent {
    constructor() {
        super();
        // dashed, to tell a link from content
        this.setDashPattern(0.05, 0.025);
    }

    /**
     * Draws the link to a member, wherever it is now.
     *
     * Adding and moving are the same call, keyed by the member itself.
     *
     * @param member - A child of the owner.
     */
    public updateLinkFor(member: Object3D): void {
        this.setLineFor(member, ORIGIN, member.position);
    }

    protected onAttach(owner: DIVENode): void {
        super.onAttach(owner);
        owner.addEventListener('childremoved', this._onChildRemoved);
    }

    protected onDetach(previousOwner: DIVENode): void {
        previousOwner.removeEventListener('childremoved', this._onChildRemoved);
        super.onDetach(previousOwner);
    }

    /**
     * also covers re-parenting and contributed content, and removeLineFor with
     * an unknown child does nothing
     */
    private _onChildRemoved = (
        event: Object3DEventMap['childremoved'],
    ): void => {
        this.removeLineFor(event.child);
    };
}
