import {
    BufferGeometry,
    Line,
    LineDashedMaterial,
    Object3D,
    Vector3,
} from 'three/webgpu';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../component/Component.ts';
import { type DIVENode } from '../node/Node.ts';

/**
 * Draws a dashed line from the owner's origin to each of its child nodes.
 *
 * Attach this to a node to turn it into a "group": the links are what makes the
 * grouping visible, and the membership itself is just the node's children.
 *
 * Keeps its lines as its own children on the helper layer, so they render but
 * never count towards bounds, exports or picking. The previous implementation
 * kept two index-parallel arrays on `DIVEGroup` and put the lines straight into
 * the group's `children`, where they inflated every bounding box.
 *
 * @module
 */
export class MemberLinksComponent extends DIVEComponent {
    readonly isMemberLinksComponent: true = true;

    private _links: Map<Object3D, Line> = new Map();
    private _visible: boolean = true;

    private _onChildAdded = (event: { child: Object3D }): void => {
        if ('isDIVENode' in event.child) this._addLink(event.child);
    };

    private _onChildRemoved = (event: { child: Object3D }): void => {
        this._removeLink(event.child);
    };

    constructor() {
        super();

        this.name = 'MemberLinksComponent';
    }

    protected onAttach(owner: DIVENode): void {
        owner.addEventListener('childadded', this._onChildAdded);
        owner.addEventListener('childremoved', this._onChildRemoved);

        // the node may already have children when this is attached
        owner.nodes.forEach((node) => this._addLink(node));
    }

    protected onDetach(previousOwner: DIVENode): void {
        previousOwner.removeEventListener('childadded', this._onChildAdded);
        previousOwner.removeEventListener('childremoved', this._onChildRemoved);

        this._clearLinks();
    }

    public onChildNodeTransform(node: DIVENode): void {
        this.updateLinkTo(node);
    }

    /**
     * Shows or hides the links.
     *
     * @param visible - Whether the links should be drawn.
     * @param object - Restricts the change to the link for this member.
     */
    public setVisible(visible: boolean, object?: Object3D): void {
        if (object) {
            const line = this._links.get(object);
            if (line) line.visible = visible;
            return;
        }

        this._visible = visible;
        this._links.forEach((line) => {
            line.visible = visible;
        });
    }

    /**
     * Redraws the link to a member after it moved.
     *
     * @param object - The member whose link should be refreshed.
     */
    public updateLinkTo(object: Object3D): void {
        const line = this._links.get(object);
        if (!line) return;

        line.geometry.setFromPoints([
            new Vector3(0, 0, 0),
            object.position.clone(),
        ]);
        line.computeLineDistances();
    }

    public dispose(): void {
        this._clearLinks();
    }

    private _addLink(object: Object3D): void {
        if (this._links.has(object)) return;

        const line = new Line(
            new BufferGeometry(),
            new LineDashedMaterial({
                color: 0x666666,
                dashSize: 0.05,
                gapSize: 0.025,
            }),
        );
        line.layers.mask = HELPER_LAYER_MASK;
        line.visible = this._visible;

        this._links.set(object, line);
        this.add(line);

        this.updateLinkTo(object);
    }

    private _removeLink(object: Object3D): void {
        const line = this._links.get(object);
        if (!line) return;

        this._links.delete(object);
        this.remove(line);
        this._disposeLine(line);
    }

    private _clearLinks(): void {
        this._links.forEach((line) => {
            this.remove(line);
            this._disposeLine(line);
        });
        this._links.clear();
    }

    private _disposeLine(line: Line): void {
        line.geometry.dispose();
        (line.material as LineDashedMaterial).dispose();
    }
}
