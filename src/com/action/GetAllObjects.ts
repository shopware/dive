import { Action } from "../Action";
import { DIVECommunication } from "../Communication";
import { type COMEntity } from "../types";

export class GetAllObjectsAction extends Action {

    constructor(com: DIVECommunication) {

        super(com);

    }

    public execute(): COMEntity[] {

        return Array.from(this._com.registered.values());

    }

    public undo(): COMEntity[] {

        return this.execute();

    }
}