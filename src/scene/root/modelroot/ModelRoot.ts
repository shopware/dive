import { Object3D } from "three";
import { COMModel } from "../../../com/types.ts";
import Model from "../../../model/Model.ts";
import DIVELoadingManager from "../../../loadingmanager/LoadingManager.ts";
import DIVECommunication from "../../../com/Communication.ts";
import { type TransformControls } from "three/examples/jsm/Addons";
import { type DIVEScene } from "../../Scene.ts";

/**
 * A basic scene node to hold all models.
 *
 * @module
 */
export default class DIVEModelRoot extends Object3D {
    private loadingManager: DIVELoadingManager;

    constructor() {
        super();
        this.name = "ModelRoot";

        this.loadingManager = new DIVELoadingManager();
    }

    public GetModel(object: Partial<COMModel>): Object3D | undefined {
        if (object.id === undefined) {
            console.warn('ModelRoot.GetModel: object.id is undefined')
            return undefined;
        }
        return this.children.find(object3D => object3D.userData.id === object.id);
    }

    public UpdateModel(object: Partial<COMModel>): void {
        if (object.id === undefined) {
            console.warn('ModelRoot.UpdateModel: object.id is undefined')
            return;
        }

        let sceneObject = this.children.find(object3D => object3D.userData.id === object.id);
        if (!sceneObject && object.uri !== undefined) {
            const model = new Model();
            sceneObject = model;
            sceneObject.userData.id = object.id;
            this.add(sceneObject);

            this.loadingManager.LoadGLTF(object.uri).then((gltf) => {
                model.SetModel(gltf);
                DIVECommunication.get(object.id!)?.PerformAction('MODEL_LOADED', { id: object.id! });
            });
        }

        if (object.position !== undefined) (sceneObject as Model).SetPosition(object.position);
        if (object.rotation !== undefined) (sceneObject as Model).SetRotation(object.rotation);
        if (object.scale !== undefined) (sceneObject as Model).SetScale(object.scale);
        if (object.visible !== undefined) (sceneObject as Model).SetVisibility(object.visible);
    }

    public DeleteModel(object: Partial<COMModel>): void {
        if (object.id === undefined) {
            console.warn(`ModelRoot.DeleteModel: object.id is undefined`)
            return;
        }

        const sceneObject = this.children.find(object3D => object3D.userData.id === object.id);
        if (!sceneObject) {
            console.warn(`ModelRoot.DeleteModel: Model with id ${object.id} not found`);
            return;
        }

        // _______________________________________________________
        // this is only neccessary due to using the old TransformControls instead of the new DIVEGizmo
        const findScene = (object: Object3D): DIVEScene => {
            if (object.parent !== null) {
                return findScene(object.parent);
            };
            return object as DIVEScene;
        }

        const scene = findScene(sceneObject);
        scene.children.find((object) => {
            if ('isTransformControls' in object) {
                (object as TransformControls).detach();
            }
        });
        // _______________________________________________________

        this.remove(sceneObject);
    }

    public PlaceOnFloor(object: Partial<COMModel>): void {
        if (object.id === undefined) console.warn('ModelRoot.PlaceOnFloor: object.id is undefined');

        const sceneObject = this.children.find(object3D => object3D.userData.id === object.id);
        if (!sceneObject) return;

        (sceneObject as Model).PlaceOnFloor();
    }
}