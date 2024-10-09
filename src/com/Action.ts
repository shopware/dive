import { DIVECommunication, DIVECommunication_exposed } from "./Communication";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfDIVECommunication_exposed(object: any): object is DIVECommunication_exposed {
    return 'renderer' in object
        && 'scene' in object
        && 'controller' in object
        && 'toolbox' in object
        && 'mediaGenerator' in object
        && 'registered' in object;
}

export abstract class Action {

    protected _com: DIVECommunication_exposed;

    constructor(com: DIVECommunication) {

        if (!(instanceOfDIVECommunication_exposed(com))) {

            throw new Error('Invalid Communication object while creating Action!');

        }

        this._com = com;

    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract execute(): any;

    public abstract undo(): void;

}