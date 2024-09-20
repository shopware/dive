import { Object3D, Vector3, type Vector3Like } from "three";
import { type DIVEMoveable } from "../interface/Moveable";
import { type DIVESelectable } from "../interface/Selectable";
import { type DIVESceneObject } from "../types";

export class DIVEGroup extends Object3D implements DIVESelectable, DIVEMoveable {
    public isSelectable: true = true;
    public isMoveable: true = true;

    constructor() {
        super();
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

    public AddObject(object: DIVESceneObject): this {
        this.attach(object);
        return this;
    }
}