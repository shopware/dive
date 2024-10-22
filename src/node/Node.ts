import { Box3, Object3D, type Vector3Like } from "three";
import { PRODUCT_LAYER_MASK } from "../constant/VisibilityLayerMask";
import { DIVECommunication } from "../com/Communication";

import { type DIVEMovable } from "../interface/Movable";
import { type DIVESelectable } from "../interface/Selectable";
import { type TransformControls } from "three/examples/jsm/controls/TransformControls";
import { type DIVEGroup } from "../group/Group";

export class DIVENode extends Object3D implements DIVESelectable, DIVEMovable {
    readonly isDIVENode: true = true;
    readonly isSelectable: true = true;
    readonly isMovable: true = true;

    public gizmo: TransformControls | null = null;

    protected _boundingBox: Box3;

    constructor() {
        super();

        this.layers.mask = PRODUCT_LAYER_MASK;

        this._boundingBox = new Box3();
    }

    public SetPosition(position: Vector3Like): void {
        this.position.set(position.x, position.y, position.z);
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
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }

    public onMove(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });

        if (this.parent && 'isDIVEGroup' in this.parent) {
            (this.parent as unknown as DIVEGroup).UpdateLineTo(this);
        }
    }

    public onSelect(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('SELECT_OBJECT', { id: this.userData.id });
    }

    public onDeselect(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('DESELECT_OBJECT', { id: this.userData.id });
    }
}