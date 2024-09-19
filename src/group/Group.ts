import { Object3D } from "three";
import { type DIVEMoveable } from "../interface/Moveable";
import { type DIVESelectable } from "../interface/Selectable";
import { type DIVESceneObject } from "../types";

export class DIVEGroup extends Object3D implements DIVESelectable, DIVEMoveable {
    public isSelectable: true = true;
    public isMoveable: true = true;

    constructor() {
        super();
    }

    public AddObject(object: DIVESceneObject): this {
        this.attach(object);
        return this;
    }
}