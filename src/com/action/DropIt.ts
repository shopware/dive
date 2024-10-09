import { Action } from "../Action";
import { type Vector3Like } from "three";
import { type DIVEModel } from "../../model/Model";
import { type DIVEPrimitive } from "../../primitive/Primitive";
import { type DIVECommunication } from "../Communication";
import { type COMEntity } from "../types";

export class DropItAction extends Action {

    private _object: COMEntity | null;

    private _originalPosition: Vector3Like | null;

    constructor(com: DIVECommunication, object: Partial<COMEntity> & { id: string }) {

        super(com);

        const registeredObject = this._com.registered.get(object.id);

        if (!registeredObject) {

            this._object = null;

            this._originalPosition = null;

            return;

        }

        this._object = registeredObject;

        this._originalPosition = { ...this._object.position };

    }

    public execute(): boolean {

        if (!this._object) {

            return false;

        }

        const sceneObject = this._com.scene.GetSceneObject<DIVEModel | DIVEPrimitive>(this._object);

        if (!sceneObject) {

            return false;

        }

        sceneObject.DropIt();

        return true;

    }

    public undo(): boolean {

        if (!this._object) {

            return false;

        }

        if (!this._originalPosition) {

            return false;

        }

        const sceneObject = this._com.scene.GetSceneObject<DIVEModel | DIVEPrimitive>(this._object);

        if (!sceneObject) {

            return false;

        }

        sceneObject.SetPosition(this._originalPosition);

        return true;

    }

}