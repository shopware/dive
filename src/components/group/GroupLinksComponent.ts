import { Vector3, type Object3D } from 'three/webgpu';
import { DIVEComponent } from '../component/Component.ts';
import {
    MultiLineComponent,
    type DIVELineHandle,
} from '../line/MultiLineComponent.ts';
import { type DIVENode } from '../node/Node.ts';

const ORIGIN = new Vector3();

/**
 * Keeps a line running from the owner to each of its child nodes.
 *
 * This is the "group" behaviour: it watches membership and decides when a line
 * has to change. The drawing itself belongs to {@link MultiLineComponent}, which
 * this component drives and knows nothing about nodes.
 *
 * Attach it to a node to make its grouping visible. It brings its own
 * `MultiLineComponent` along if the node does not already have one, so callers
 * only ever deal with this one component.
 *
 * @module
 */
export class GroupLinksComponent extends DIVEComponent {
    readonly isGroupLinksComponent: true = true;

    /** Which line belongs to which member. */
    private _handles: Map<Object3D, DIVELineHandle> = new Map();

    private _lines: MultiLineComponent | null = null;
    /** Whether this component created the line component and thus owns it. */
    private _ownsLines: boolean = false;

    private _onChildAdded = (event: { child: Object3D }): void => {
        if ('isDIVENode' in event.child) this._track(event.child);
    };

    private _onChildRemoved = (event: { child: Object3D }): void => {
        this._untrack(event.child);
    };

    constructor() {
        super();

        this.name = 'GroupLinksComponent';
    }

    /** The line component doing the drawing. */
    public get lines(): MultiLineComponent | null {
        return this._lines;
    }

    protected onAttach(owner: DIVENode): void {
        const existing = owner.getComponent(MultiLineComponent);
        this._ownsLines = !existing;
        this._lines = existing ?? owner.addComponent(new MultiLineComponent());

        owner.addEventListener('childadded', this._onChildAdded);
        owner.addEventListener('childremoved', this._onChildRemoved);

        // the node may already have children when this is attached
        owner.nodes.forEach((node) => this._track(node));
    }

    protected onDetach(previousOwner: DIVENode): void {
        previousOwner.removeEventListener('childadded', this._onChildAdded);
        previousOwner.removeEventListener('childremoved', this._onChildRemoved);

        this._handles.forEach((handle) => this._lines?.removeLine(handle));
        this._handles.clear();

        // only take the line component down if it was ours to begin with
        if (this._ownsLines && this._lines) {
            previousOwner.removeComponent(this._lines);
            this._lines.dispose();
        }

        this._lines = null;
        this._ownsLines = false;
    }

    /**
     * Redraws the line to a member after it moved.
     *
     * Called by the owner when one of its child nodes is transformed.
     */
    public onChildNodeTransform(node: DIVENode): void {
        this.updateLineTo(node);
    }

    /**
     * Shows or hides links.
     *
     * @param visible - Whether the links should be drawn.
     * @param object - Restricts the change to the link for this member.
     */
    public setVisible(visible: boolean, object?: Object3D): void {
        if (object) {
            const handle = this._handles.get(object);
            if (handle === undefined) return;

            this._lines?.setLineVisible(handle, visible);
            return;
        }

        this._lines?.setVisible(visible);
    }

    /**
     * Redraws the link to a member.
     *
     * @param object - The member whose link should be refreshed.
     */
    public updateLineTo(object: Object3D): void {
        const handle = this._handles.get(object);
        if (handle === undefined) return;

        this._lines?.setLine(handle, ORIGIN, object.position);
    }

    /** How many members currently have a link. */
    public get linkCount(): number {
        return this._handles.size;
    }

    private _track(object: Object3D): void {
        if (this._handles.has(object) || !this._lines) return;

        this._handles.set(object, this._lines.addLine(ORIGIN, object.position));
    }

    private _untrack(object: Object3D): void {
        const handle = this._handles.get(object);
        if (handle === undefined) return;

        this._handles.delete(object);
        this._lines?.removeLine(handle);
    }
}
