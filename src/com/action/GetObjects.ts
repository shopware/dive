import { Action } from "../Action";
import { DIVECommunication } from "../Communication";
import { type COMEntity } from "../types";

export class GetObjectsAction extends Action {

    private _objects: (Partial<COMEntity> & { id: string })[];

    constructor(com: DIVECommunication, objects: (Partial<COMEntity> & { id: string })[]) {

        super(com);

        this._objects = objects;

    }

    public execute(): COMEntity[] {

        const array: COMEntity[] = [];

        for (const object of this._objects) {

            const registered = this._com.registered.get(object.id);

            if (!registered) {

                continue;

            }

            array.push(registered);

        }

        return array;

    }

    public undo(): COMEntity[] {

        return this.execute();

    }
}