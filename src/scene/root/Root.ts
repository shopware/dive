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
import { type COMLight, type COMModel, type COMEntity, type COMPrimitive, type COMGroup } from "../../com/types";
import { type DIVESceneObject } from "../../types";
import { DIVEGroup } from "../../group/Group.ts";

/**
 * A basic scene node to hold grid, floor and all lower level roots.
 *
 * @module
 */

export class DIVERoot extends Object3D {
    readonly isDIVERoot: true = true;

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

    public GetSceneObject<T extends DIVESceneObject>(object: Partial<COMEntity> & { id: string }): T | undefined {
        return this.children.find(object3D => object3D.userData.id === object.id) as T | undefined;
    }

    public AddSceneObject(object: COMEntity): void {
        switch (object.entityType) {
            case "pov": {
                break;
            }
            case "light": {
                this.updateLight(object);
                break;
            }
            case "model": {
                this.updateModel(object);
                break;
            }
            case "primitive": {
                this.updatePrimitive(object);
                break;
            }
            case "group": {
                this.updateGroup(object);
                break;
            }
        }
    }

    public UpdateSceneObject(object: Partial<COMEntity> & { id: string }): void {
        switch (object.entityType) {
            case "pov": {
                break;
            }
            case "light": {
                this.updateLight(object);
                break;
            }
            case "model": {
                this.updateModel(object);
                break;
            }
            case "primitive": {
                this.updatePrimitive(object);
                break;
            }
            case "group": {
                this.updateGroup(object);
                break;
            }
        }
    }

    public DeleteSceneObject(object: Partial<COMEntity> & { id: string }): void {
        switch (object.entityType) {
            case "pov": {
                break;
            }
            case "light": {
                this.deleteLight(object);
                break;
            }
            case "model": {
                this.deleteModel(object);
                break;
            }
            case "primitive": {
                this.deletePrimitive(object);
                break;
            }
            case "group": {
                this.deleteGroup(object);
                break;
            }
        }
    }

    public PlaceOnFloor(object: Partial<COMEntity> & { id: string }): void {
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

    private updateLight(light: Partial<COMLight> & { id: string }): void {
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
                    console.warn(`Root.updateLight: Unknown light type: ${light.type}`);
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
        if (light.parent !== undefined) this.setParent({ ...light, parent: light.parent });
    }

    private updateModel(model: Partial<COMModel> & { id: string }): void {
        let sceneObject = this.GetSceneObject<DIVESceneObject>(model);
        if (!sceneObject) {
            const created = new DIVEModel();
            sceneObject = created;
            sceneObject.userData.id = model.id;
            this.add(sceneObject);
        }

        if (model.uri !== undefined) {
            this.loadingManager.LoadGLTF(model.uri).then((gltf) => {
                (sceneObject as DIVEModel).SetModel(gltf);
                DIVECommunication.get(model.id!)?.PerformAction('MODEL_LOADED', { id: model.id! });
            });
        }

        if (model.name !== undefined) sceneObject.name = model.name;
        if (model.position !== undefined) (sceneObject as DIVEModel).SetPosition(model.position);
        if (model.rotation !== undefined) (sceneObject as DIVEModel).SetRotation(model.rotation);
        if (model.scale !== undefined) (sceneObject as DIVEModel).SetScale(model.scale);
        if (model.visible !== undefined) (sceneObject as DIVEModel).SetVisibility(model.visible);
        if (model.material !== undefined) (sceneObject as DIVEModel).SetMaterial(model.material);
        if (model.parent !== undefined) this.setParent({ ...model, parent: model.parent });
    }

    private updatePrimitive(primitive: Partial<COMPrimitive> & { id: string }): void {
        let sceneObject = this.GetSceneObject<DIVESceneObject>(primitive);
        if (!sceneObject) {
            const created = new DIVEPrimitive();
            sceneObject = created;
            sceneObject.userData.id = primitive.id;
            this.add(sceneObject);
        }

        if (primitive.name !== undefined) sceneObject.name = primitive.name;
        if (primitive.geometry !== undefined) (sceneObject as DIVEPrimitive).SetGeometry(primitive.geometry);
        if (primitive.position !== undefined) (sceneObject as DIVEPrimitive).SetPosition(primitive.position);
        if (primitive.rotation !== undefined) (sceneObject as DIVEPrimitive).SetRotation(primitive.rotation);
        if (primitive.scale !== undefined) (sceneObject as DIVEPrimitive).SetScale(primitive.scale);
        if (primitive.visible !== undefined) (sceneObject as DIVEPrimitive).SetVisibility(primitive.visible);
        if (primitive.material !== undefined) (sceneObject as DIVEPrimitive).SetMaterial(primitive.material);
        if (primitive.parent !== undefined) this.setParent({ ...primitive, parent: primitive.parent });
    }

    private updateGroup(group: Partial<COMGroup> & { id: string }): void {
        let sceneObject = this.GetSceneObject<DIVESceneObject>(group);
        if (!sceneObject) {
            const created = new DIVEGroup();
            sceneObject = created;
            sceneObject.userData.id = group.id;
            this.add(sceneObject);
        }

        if (group.name !== undefined) sceneObject.name = group.name;
        if (group.position !== undefined) (sceneObject as DIVEPrimitive).SetPosition(group.position);
        if (group.rotation !== undefined) (sceneObject as DIVEPrimitive).SetRotation(group.rotation);
        if (group.scale !== undefined) (sceneObject as DIVEPrimitive).SetScale(group.scale);
        if (group.visible !== undefined) (sceneObject as DIVEPrimitive).SetVisibility(group.visible);
        if (group.bbVisible !== undefined) (sceneObject as DIVEGroup).SetBoundingBoxVisibility(group.bbVisible);
        if (group.parent !== undefined) this.setParent({ ...group, parent: group.parent });
    }

    private deleteLight(light: Partial<COMLight> & { id: string }): void {
        const sceneObject = this.GetSceneObject(light);
        if (!sceneObject) {
            console.warn(`Root.deleteLight: Light with id ${light.id} not found`);
            return;
        }

        // _______________________________________________________
        // this is only neccessary due to using the old TransformControls instead of the new DIVEGizmo
        const scene = this.findScene(sceneObject);
        scene.children.find((object) => {
            if ('isTransformControls' in object) {
                (object as TransformControls).detach();
            }
        });
        // _______________________________________________________

        this.remove(sceneObject);
    }

    private deleteModel(model: Partial<COMModel> & { id: string }): void {
        const sceneObject = this.GetSceneObject(model);
        if (!sceneObject) {
            console.warn(`Root.deleteModel: Model with id ${model.id} not found`);
            return;
        }

        // _______________________________________________________
        // this is only neccessary due to using the old TransformControls instead of the new DIVEGizmo
        const scene = this.findScene(sceneObject);
        scene.children.find((object) => {
            if ('isTransformControls' in object) {
                (object as TransformControls).detach();
            }
        });
        // _______________________________________________________

        this.remove(sceneObject);
    }

    private deletePrimitive(primitive: Partial<COMPrimitive> & { id: string }): void {
        const sceneObject = this.GetSceneObject(primitive);
        if (!sceneObject) {
            console.warn(`Root.deletePrimitive: Primitive with id ${primitive.id} not found`);
            return;
        }

        // _______________________________________________________
        // this is only neccessary due to using the old TransformControls instead of the new DIVEGizmo
        const scene = this.findScene(sceneObject);
        scene.children.find((object) => {
            if ('isTransformControls' in object) {
                (object as TransformControls).detach();
            }
        });
        // _______________________________________________________

        this.remove(sceneObject);
    }

    private deleteGroup(group: Partial<COMGroup> & { id: string }): void {
        const sceneObject = this.GetSceneObject(group);
        if (!sceneObject) {
            console.warn(`Root.deleteGroup: Group with id ${group.id} not found`);
            return;
        }

        // _______________________________________________________
        // this is only neccessary due to using the old TransformControls instead of the new DIVEGizmo
        const scene = this.findScene(sceneObject);
        scene.children.find((object) => {
            if ('isTransformControls' in object) {
                (object as TransformControls).detach();
            }
        });
        // _______________________________________________________

        for (let i = sceneObject.children.length - 1; i >= 0; i--) {
            this.attach(sceneObject.children[i]);
        }

        sceneObject.parent!.remove(sceneObject);
    }

    private placeOnFloor(object: Partial<COMEntity> & { id: string }): void {
        const sceneObject = this.GetSceneObject(object);
        if (!sceneObject) return;

        (sceneObject as DIVEModel | DIVEPrimitive).PlaceOnFloor();
    }

    private setParent(object: Partial<COMEntity> & { id: string, parent: (Partial<COMEntity> & { id: string }) | null }): void {
        const sceneObject = this.GetSceneObject<DIVESceneObject>(object);
        if (!sceneObject) return;

        if (sceneObject.parent && 'isDIVEGroup' in sceneObject.parent) {
            (sceneObject.parent as DIVEGroup).RemoveObject(sceneObject);
        }

        if (object.parent !== null) {
            const parent = this.GetSceneObject<DIVESceneObject>(object.parent);
            if (!parent) return;

            // attach to new parent (if exists in scene)
            if ('AddObject' in parent) {
                parent.AddObject(sceneObject);
            } else {
                parent.attach(sceneObject);
            }
        } else {
            // attach to root if no parent is found
            this.attach(sceneObject);
        }
    }

    private findScene(object: Object3D): DIVEScene {
        if (object.parent !== null) {
            return this.findScene(object.parent);
        };
        return object as DIVEScene;
    }
}
