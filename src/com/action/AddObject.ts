import { Action } from "../Action";
import { DIVECommunication } from "../Communication";
import { type COMEntity } from "../types";

export class AddObjectAction extends Action {
    private _object: COMEntity;

    constructor(com: DIVECommunication, object: COMEntity) {

        super(com);

        this._object = object;

        if (this._object.parent === undefined) {

            this._object.parent = null;

        }

    }

    public execute(): boolean {

        if (this._com.registered.get(this._object.id)) {

            return false;

        }

        this._com.registered.set(this._object.id, this._object);

        this._com.scene.AddSceneObject(this._object);

        return true;

    }

    public undo(): boolean {

        if (!this._com.registered.get(this._object.id)) {

            return false;

        }

        this._com.registered.delete(this._object.id);

        this._com.scene.DeleteSceneObject(this._object);

        return true;

    }
}