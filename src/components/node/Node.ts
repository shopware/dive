import { Box3, Object3D, Vector3, type Vector3Like } from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';

import { DIVEMovable } from '../../interfaces/Movable.ts';
import { DIVESelectable } from '../../interfaces/Selectable.ts';
import { type TransformControls } from 'three/examples/jsm/controls/TransformControls.ts';
import { type DIVEGroup } from '../group/Group.ts';
import { type DIVEEntityEventMap } from '../../types/events/index.ts';

export class DIVENode
    extends Object3D<DIVEEntityEventMap>
    implements DIVESelectable, DIVEMovable
{
    readonly isSelectable: true = true;
    readonly isMovable: true = true;
    readonly isDIVENode: true = true;

    public gizmo: TransformControls | null = null;

    protected _positionWorldBuffer: Vector3;
    protected _boundingBox: Box3;

    constructor() {
        super();

        this.layers.mask = PRODUCT_LAYER_MASK;

        this._positionWorldBuffer = new Vector3();
        this._boundingBox = new Box3();
    }

    public setPosition(position: Vector3Like): void {
        // if there is no parent, the object will be attached later and keep it's world position
        if (!this.parent) {
            this.position.set(position.x, position.y, position.z);
            return;
        }

        // if we have a parent, we have to calculate the position in the parent's coordinate system to keep the world position
        const newPosition = new Vector3(position.x, position.y, position.z);
        this.position.copy(this.parent.worldToLocal(newPosition));

        if ('isDIVEGroup' in this.parent) {
            (this.parent as unknown as DIVEGroup).updateLineTo(this);
        }
    }

    public setRotation(rotation: Vector3Like): void {
        this.rotation.set(rotation.x, rotation.y, rotation.z);
    }

    public setScale(scale: Vector3Like): void {
        this.scale.set(scale.x, scale.y, scale.z);
    }

    public setVisibility(visible: boolean): void {
        this.visible = visible;
    }

    public setToWorldOrigin(): void {
        this.position.set(0, 0, 0);
        this.onMove();
    }

    /**
     * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
     */
    public onMove(): void {
        this.dispatchEvent({
            type: 'object-transform',
            position: this.getWorldPosition(this._positionWorldBuffer),
            rotation: this.rotation,
            scale: this.scale,
        });
    }

    public onSelect(): void {
        this.dispatchEvent({ type: 'object-select' });
    }

    public onDeselect(): void {
        this.dispatchEvent({ type: 'object-deselect' });
    }
}
