import { Object3D } from "three";
import { DIVEMoveable } from "../interface/Moveable";
import { DIVESelectable } from "../interface/Selectable";

export class DIVEGroup extends Object3D implements DIVESelectable, DIVEMoveable {
    public isSelectable: true = true;
    public isMoveable: true = true;

    constructor() {
        super();
    }

    // public AttachObject()
}