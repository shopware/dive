import { Action } from "../Action";
import { type DIVECommunication } from "../Communication";
import { type COMEntity } from "../types";

export class UpdateObjectAction extends Action {

    private _object: Partial<COMEntity> & { id: string };

    constructor(com: DIVECommunication, object: Partial<COMEntity> & { id: string }) {

        super(com);

        this._object = object;

        if (this._object.parent === undefined) {

            this._object.parent = null;

        }

    }

    public execute(): boolean {

        const object = this._com.registered.get(this._object.id);

        if (!object) {

            return false;

        }

        this._com.registered.set(this._object.id, { ...object, ...this._object });

        const updatedObject = this._com.registered.get(this._object.id)!;

        this._com.scene.UpdateSceneObject({ ...this._object, id: updatedObject.id, entityType: updatedObject.entityType });

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