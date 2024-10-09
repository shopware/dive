import { DIVESelectable, isSelectable } from "../../interface/Selectable";
import { isSelectTool } from "../../toolbox/select/SelectTool";
import { Action } from "../Action";
import { type DIVECommunication } from "../Communication";
import { type COMEntity } from "../types";

export class DeselectObjectAction extends Action {

    private _object: COMEntity | null;

    constructor(com: DIVECommunication, object: Partial<COMEntity> & { id: string }) {

        super(com);

        const registeredObject = this._com.registered.get(object.id);

        if (!registeredObject) {

            this._object = null;

            return;

        }

        this._object = registeredObject;

    }

    public execute(): boolean {

        if (!this._object) {

            return false;

        }

        const sceneObject = this._com.scene.GetSceneObject(this._object);

        if (!sceneObject) {

            return false;

        }

        if (!isSelectable(sceneObject)) {

            return false;

        }

        const activeTool = this._com.toolbox.GetActiveTool();

        if (activeTool && isSelectTool(activeTool)) {

            activeTool.DetachGizmo();

        }

        return true;

    }

    public undo(): boolean {

        if (!this._object) {

            return false;

        }

        const sceneObject = this._com.scene.GetSceneObject(this._object);

        if (!sceneObject) {

            return false;

        }

        if (!isSelectable(sceneObject)) {

            return false;

        }

        const activeTool = this._com.toolbox.GetActiveTool();

        if (activeTool && isSelectTool(activeTool)) {

            activeTool.AttachGizmo(sceneObject as DIVESelectable);

        }

        return true;

    }

}