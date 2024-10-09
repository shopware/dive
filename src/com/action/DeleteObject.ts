import { Action } from "../Action";
import { type DIVECommunication } from "../Communication";
import { type COMEntity } from "../types";

export class DeleteObjectAction extends Action {

    private _object: COMEntity | null;

    constructor(com: DIVECommunication, object: Partial<COMEntity> & { id: string }) {

        super(com);

        const registeredObject = this._com.registered.get(object.id);

        if (!registeredObject) {

            this._object = null;

            return;

        }

        this._object = registeredObject;

        if (this._object.parent === undefined) {

            this._object.parent = null;

        }

    }

    public execute(): boolean {

        if (!this._object) {

            return false;

        }

        const deletedObject = this._com.registered.get(this._object.id);

        if (!deletedObject) {

            return true;

        }

        this._com.registered.delete(this._object.id);

        this._com.scene.DeleteSceneObject(deletedObject);

        return true;

    }

    public undo(): boolean {

        if (!this._object) {

            return false;

        }

        this._com.registered.set(this._object.id, this._object);

        this._com.scene.DeleteSceneObject(this._object);

        return true;

    }

}