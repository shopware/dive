import { Box3, Color, Object3D } from "three";
import DIVEAmbientLight from "../../light/AmbientLight.ts";
import DIVEPointLight from "../../light/PointLight.ts";
import DIVESceneLight from "../../light/SceneLight.ts";
import { DIVEModel } from "../../model/Model.ts";
import { DIVELoadingManager } from "../../loadingmanager/LoadingManager.ts";
import { DIVECommunication } from "../../com/Communication.ts";
import { DIVEPrimitive } from "../../primitive/Primitive.ts";

import { type DIVEScene } from "../Scene.ts";
import { type TransformControls } from "three/examples/jsm/controls/TransformControls";
import { type COMLight, type COMModel, type COMEntity, type COMPrimitive } from "../../com/types.ts";

/**
 * A basic scene node to hold grid, floor and all lower level roots.
 *
 * @module
 */

export class DIVERoot extends Object3D {
    private loadingManager: DIVELoadingManager;


    constructor() {
        super();
        this.name = "Root";

        this.loadingManager = new DIVELoadingManager();
    }

    public ComputeSceneBB(): Box3 {
        const bb = new Box3();
        this.traverse((object: Object3D) => {
            if ('isObject3D' in object) {
                bb.expandByObject(object);
            }
        });
        return bb;
    }

    public GetSceneObject(object: Partial<COMEntity>): Object3D | undefined {
        if (object.id === undefined) {
            console.warn('Root.GetSceneObject: object.id is undefined');
            return undefined;
        }
        return this.children.find(object3D => object3D.userData.id === object.id);
    }

    public AddSceneObject(object: COMEntity): void {
        switch (object.entityType) {
            case "pov": {
                break;
            }
            case "light": {
                this.updateLight(object as COMLight);
                break;
            }
            case "model": {
                this.updateModel(object as COMModel);
                break;
            }
            case "primitive": {
                this.updatePrimitive(object as COMPrimitive);
                break;
            }
        }
    }

    public UpdateSceneObject(object: Partial<COMEntity>): void {
        switch (object.entityType) {
            case "pov": {
                break;
            }
            case "light": {
                this.updateLight(object as COMLight);
                break;
            }
            case "model": {
                this.updateModel(object as COMModel);
                break;
            }
            case "primitive": {
                this.updatePrimitive(object as COMPrimitive);
                break;
            }
        }
    }

    public DeleteSceneObject(object: Partial<COMEntity>): void {
        switch (object.entityType) {
            case "pov": {
                break;
            }
            case "light": {
                this.deleteLight(object as COMLight);
                break;
            }
            case "model": {
                this.deleteModel(object as COMModel);
                break;
            }
            case "primitive": {
                this.deletePrimitive(object as COMPrimitive);
                break;
            }
        }
    }

    public PlaceOnFloor(object: Partial<COMEntity>): void {
        switch (object.entityType) {
            case "pov":
            case "light": {
                break;
            }
            case "model":
            case "primitive": {
                this.placeOnFloor(object);
                break;
            }
        }
    }

    private updateLight(light: Partial<COMLight>): void {
        // update scene here for light
        if (light.id === undefined) {
            console.warn(`LightRoot.UpdateLight: light.id is undefined`)
            return;
        }

        let sceneObject = this.GetSceneObject(light);
        if (!sceneObject) {
            switch (light.type) {
                case 'scene': {
                    sceneObject = new DIVESceneLight();
                    break;
                }
                case 'ambient': {
                    sceneObject = new DIVEAmbientLight();
                    break;
                }
                case 'point': {
                    sceneObject = new DIVEPointLight();
                    break;
                }
                default: {
                    console.warn(`LightRoot.UpdateLight: Unknown light type: ${light.type}`);
                    return;
                }
            }
            sceneObject.userData.id = light.id;
            this.add(sceneObject);
        }

        if (light.name !== undefined && light.name !== null) sceneObject.name = light.name;
        if (light.position !== undefined && light.position !== null) sceneObject.position.set(light.position.x, light.position.y, light.position.z);
        if (light.intensity !== undefined && light.intensity !== null) (sceneObject as (DIVEAmbientLight | DIVEPointLight)).SetIntensity(light.intensity);
        if (light.enabled !== undefined && light.enabled !== null) (sceneObject as (DIVEAmbientLight | DIVEPointLight)).SetEnabled(light.enabled);
        if (light.color !== undefined && light.color !== null) (sceneObject as (DIVEAmbientLight | DIVEPointLight)).SetColor(new Color(light.color));
        if (light.visible !== undefined && light.visible !== null) (sceneObject as (DIVEAmbientLight | DIVEPointLight)).visible = light.visible;
    }

    private updateModel(model: Partial<COMModel>): void {
        if (model.id === undefined) {
            console.warn('ModelRoot.UpdateModel: object.id is undefined')
            return;
        }

        let sceneObject = this.children.find(object3D => object3D.userData.id === model.id);
        if (!sceneObject) {
            const created = new DIVEModel();
            sceneObject = created;
            sceneObject.userData.id = model.id;
            this.add(sceneObject);

            if (model.uri !== undefined) {
                this.loadingManager.LoadGLTF(model.uri).then((gltf) => {
                    (sceneObject as DIVEModel).SetModel(gltf);
                    DIVECommunication.get(model.id!)?.PerformAction('MODEL_LOADED', { id: model.id! });
                });
            }
        }

        if (model.position !== undefined) (sceneObject as DIVEModel).SetPosition(model.position);
        if (model.rotation !== undefined) (sceneObject as DIVEModel).SetRotation(model.rotation);
        if (model.scale !== undefined) (sceneObject as DIVEModel).SetScale(model.scale);
        if (model.visible !== undefined) (sceneObject as DIVEModel).SetVisibility(model.visible);
        if (model.material !== undefined) (sceneObject as DIVEModel).SetMaterial(model.material);
    }

    private updatePrimitive(primitive: Partial<COMPrimitive>): void {
        if (primitive.id === undefined) {
            console.warn('PrimitiveRoot.UpdatePrimitive: object.id is undefined')
            return;
        }

        let sceneObject = this.children.find(object3D => object3D.userData.id === primitive.id);
        if (!sceneObject) {
            const created = new DIVEPrimitive();
            sceneObject = created;
            sceneObject.userData.id = primitive.id;
            this.add(sceneObject);
        }

        if (primitive.geometry !== undefined) (sceneObject as DIVEPrimitive).SetGeometry(primitive.geometry);
        if (primitive.position !== undefined) (sceneObject as DIVEPrimitive).SetPosition(primitive.position);
        if (primitive.rotation !== undefined) (sceneObject as DIVEPrimitive).SetRotation(primitive.rotation);
        if (primitive.scale !== undefined) (sceneObject as DIVEPrimitive).SetScale(primitive.scale);
        if (primitive.visible !== undefined) (sceneObject as DIVEPrimitive).SetVisibility(primitive.visible);
        if (primitive.material !== undefined) (sceneObject as DIVEPrimitive).SetMaterial(primitive.material);
    }

    private deleteLight(light: Partial<COMLight>): void {
        if (light.id === undefined) {
            console.warn('LightRoot.DeleteLight: light.id is undefined')
            return;
        }

        const sceneObject = this.children.find(object3D => object3D.userData.id === light.id);
        if (!sceneObject) {
            console.warn(`LightRoot.DeleteLight: Light with id ${light.id} not found`);
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

    private deleteModel(model: Partial<COMModel>): void {
        if (model.id === undefined) {
            console.warn(`ModelRoot.DeleteModel: object.id is undefined`)
            return;
        }

        const sceneObject = this.children.find(object3D => object3D.userData.id === model.id);
        if (!sceneObject) {
            console.warn(`ModelRoot.DeleteModel: Model with id ${model.id} not found`);
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

    private deletePrimitive(primitive: Partial<COMPrimitive>): void {
        if (primitive.id === undefined) {
            console.warn(`PrimitiveRoot.DeletePrimitive: object.id is undefined`)
            return;
        }

        const sceneObject = this.children.find(object3D => object3D.userData.id === primitive.id);
        if (!sceneObject) {
            console.warn(`PrimitiveRoot.DeletePrimitive: Primitive with id ${primitive.id} not found`);
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

    private placeOnFloor(object: Partial<COMEntity>): void {
        if (object.id === undefined) console.warn('Root.placeOnFloor: object.id is undefined');

        const sceneObject = this.children.find(object3D => object3D.userData.id === object.id);
        if (!sceneObject) return;

        (sceneObject as DIVEModel | DIVEPrimitive).PlaceOnFloor();
    }
}
