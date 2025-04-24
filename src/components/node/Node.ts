import { Box3, Object3D, Vector3, type Vector3Like } from 'three';
import { PRODUCT_LAYER_MASK } from '../../constant/VisibilityLayerMask';
import { DIVECommunication } from '../../com/Communication';

import { DIVEMovable } from '../../interface/Movable';
import { DIVESelectable } from '../../interface/Selectable';
import { type TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { type DIVEGroup } from '../group/Group';
import { applyMixins } from '../../helper/applyMixins/applyMixins';

export class DIVENode extends applyMixins(Object3D, [
    DIVESelectable,
    DIVEMovable,
]) {
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

    public SetPosition(position: Vector3Like): void {
        // if there is no parent, the object will be attached later and keep it's world position
        if (!this.parent) {
            this.position.set(position.x, position.y, position.z);
            return;
        }

        // if we have a parent, we have to calculate the position in the parent's coordinate system to keep the world position
        const newPosition = new Vector3(position.x, position.y, position.z);
        this.position.copy(this.parent.worldToLocal(newPosition));

        if ('isDIVEGroup' in this.parent) {
            (this.parent as unknown as DIVEGroup).UpdateLineTo(this);
        }
    }

    public SetRotation(rotation: Vector3Like): void {
        this.rotation.set(rotation.x, rotation.y, rotation.z);
    }

    public SetScale(scale: Vector3Like): void {
        this.scale.set(scale.x, scale.y, scale.z);
    }

    public SetVisibility(visible: boolean): void {
        this.visible = visible;
    }

    public SetToWorldOrigin(): void {
        this.position.set(0, 0, 0);
        DIVECommunication.get(this.userData.id)?.PerformAction(
            'UPDATE_OBJECT',
            {
                id: this.userData.id,
                position: this.getWorldPosition(this._positionWorldBuffer),
                rotation: this.rotation,
                scale: this.scale,
            },
        );
    }

    /**
     * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
     */
    public onMove(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction(
            'UPDATE_OBJECT',
            {
                id: this.userData.id,
                position: this.getWorldPosition(this._positionWorldBuffer),
                rotation: this.rotation,
                scale: this.scale,
            },
        );
    }

    public onSelect(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction(
            'SELECT_OBJECT',
            { id: this.userData.id },
        );
    }

    public onDeselect(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction(
            'DESELECT_OBJECT',
            { id: this.userData.id },
        );
    }
}
