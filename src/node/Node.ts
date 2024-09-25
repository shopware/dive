import { Box3, Object3D, Vector3, type Vector3Like } from "three";
import { PRODUCT_LAYER_MASK } from "../constant/VisibilityLayerMask";
import { DIVECommunication } from "../com/Communication";

import { type DIVEMoveable } from "../interface/Moveable";
import { type DIVESelectable } from "../interface/Selectable";
import { type TransformControls } from "three/examples/jsm/controls/TransformControls";

export class DIVENode extends Object3D implements DIVESelectable, DIVEMoveable {
    readonly isDIVENode: true = true;
    readonly isSelectable: true = true;
    readonly isMoveable: true = true;

    public gizmo: TransformControls | null = null;

    protected boundingBox: Box3;

    constructor() {
        super();

        this.layers.mask = PRODUCT_LAYER_MASK;

        this.boundingBox = new Box3();
    }

    public SetPosition(position: Vector3Like): void {
        this.position.set(position.x, position.y, position.z);
    }

    public SetRotation(rotation: Vector3Like): void {
        this.rotation.setFromVector3(new Vector3(rotation.x, rotation.y, rotation.z));
    }

    public SetScale(scale: Vector3Like): void {
        this.scale.set(scale.x, scale.y, scale.z);
    }

    public SetVisibility(visible: boolean): void {
        this.traverse((child) => {
            child.visible = visible;
        });
    }

    public SetToWorldOrigin(): void {
        this.position.set(0, 0, 0);
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }

    public onMove(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position, rotation: this.rotation, scale: this.scale });
    }

    public onSelect(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('SELECT_OBJECT', { id: this.userData.id });
    }

    public onDeselect(): void {
        DIVECommunication.get(this.userData.id)?.PerformAction('DESELECT_OBJECT', { id: this.userData.id });
    }
}