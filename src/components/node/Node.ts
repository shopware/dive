import { Box3, Object3D, Vector3, type Vector3Like } from 'three';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { State } from '../../modules/state/State.ts';

import { DIVEMovable } from '../../interfaces/Movable.ts';
import { DIVESelectable } from '../../interfaces/Selectable.ts';
import { type TransformControls } from 'three/examples/jsm/controls/TransformControls.ts';
import { type DIVEGroup } from '../group/Group.ts';
import { applyMixins } from '../../helpers/applyMixins/applyMixins.ts';

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
        State.get(this.userData.id)?.performAction('UPDATE_OBJECT', {
            id: this.userData.id,
            position: this.getWorldPosition(this._positionWorldBuffer),
            rotation: this.rotation,
            scale: this.scale,
        });
    }

    /**
     * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
     */
    public onMove(): void {
        State.get(this.userData.id)?.performAction('UPDATE_OBJECT', {
            id: this.userData.id,
            position: this.getWorldPosition(this._positionWorldBuffer),
            rotation: this.rotation,
            scale: this.scale,
        });
    }

    public onSelect(): void {
        State.get(this.userData.id)?.performAction('SELECT_OBJECT', {
            id: this.userData.id,
        });
    }

    public onDeselect(): void {
        State.get(this.userData.id)?.performAction('DESELECT_OBJECT', {
            id: this.userData.id,
        });
    }
}
