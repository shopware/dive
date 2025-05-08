import { Box3, Color, Object3D } from 'three';
import { DIVEAmbientLight } from '../light/AmbientLight.ts';
import { DIVEPointLight } from '../light/PointLight.ts';
import { DIVESceneLight } from '../light/SceneLight.ts';
import { DIVEModel } from '../model/Model.ts';
import { DIVEPrimitive } from '../primitive/Primitive.ts';

import { type DIVEScene } from '../../engine/scene/Scene.ts';
import { type TransformControls } from 'three/examples/jsm/controls/TransformControls.ts';
import {
    type COMLight,
    type COMModel,
    type COMEntity,
    type COMPrimitive,
    type COMGroup,
    type COMEntityType,
    COMMinimal,
    COMPartial,
} from '../../modules/state/types/index.ts';
import { DIVELight, type DIVESceneObject } from '../../types/index.ts';
import { DIVEGroup } from '../group/Group.ts';
import { getModule } from '../../modules/ModuleRegistry.ts';
import { DIVEFloor } from '../floor/Floor.ts';

/**
 * A basic scene node to hold grid, floor and all lower level roots.
 *
 * @module
 */

export class DIVERoot extends Object3D {
    readonly isDIVERoot: true = true;

    public get floor(): DIVEFloor {
        return this._floor;
    }

    private _floor: DIVEFloor;

    private _assetLoader:
        | import('../../modules/asset/loader/AssetLoader.ts').AssetLoader
        | null = null;

    private async _getAssetLoader(): Promise<
        import('../../modules/asset/loader/AssetLoader.ts').AssetLoader
    > {
        if (!this._assetLoader) {
            this._assetLoader = new (await getModule('AssetLoader'))();
        }
        return this._assetLoader;
    }

    constructor() {
        super();
        this.name = 'Root';

        this._floor = new DIVEFloor();
        this.add(this._floor);
    }

    public computeSceneBB(): Box3 {
        const bb = new Box3();
        this.children.forEach((object) => {
            if ('isDIVEFloor' in object) return;
            object.traverse((child) => {
                if ('isObject3D' in child) {
                    bb.expandByObject(child);
                }
            });
        });
        return bb;
    }

    public getSceneObject<E extends COMEntityType>(
        object: Partial<COMEntity> & { id: string; entityType: E },
    ): DIVESceneObject<E> | undefined {
        let foundObject: DIVESceneObject<E> | undefined;
        this.traverse((object3D) => {
            if (foundObject) return;
            if (object3D.userData.id === object.id) {
                foundObject = object3D as DIVESceneObject<E>;
            }
        });
        return foundObject;
    }

    public addSceneObject(object: COMEntity): void {
        switch (object.entityType) {
            case 'pov': {
                break;
            }
            case 'light': {
                this.updateLight(object as COMLight);
                break;
            }
            case 'model': {
                this.updateModel(object);
                break;
            }
            case 'primitive': {
                this.updatePrimitive(object);
                break;
            }
            case 'group': {
                this.updateGroup(object);
                break;
            }
            default: {
                throw new Error(
                    `DIVERoot.addSceneObject: Unknown entity type: ${(object as unknown as COMEntity).entityType}`,
                );
            }
        }
    }

    public updateSceneObject(object: COMPartial): void {
        switch (object.entityType) {
            case 'pov': {
                break;
            }
            case 'light': {
                this.updateLight(object);
                break;
            }
            case 'model': {
                this.updateModel(object);
                break;
            }
            case 'primitive': {
                this.updatePrimitive(object);
                break;
            }
            case 'group': {
                this.updateGroup(object);
                break;
            }
            default: {
                throw new Error(
                    `DIVERoot.updateSceneObject: Unknown entity type: ${(object as unknown as COMEntity).entityType}`,
                );
            }
        }
    }

    public deleteSceneObject(object: COMMinimal<COMEntity>): void {
        switch (object.entityType) {
            case 'pov': {
                break;
            }
            case 'light': {
                this.deleteLight(object);
                break;
            }
            case 'model': {
                this.deleteModel(object);
                break;
            }
            case 'primitive': {
                this.deletePrimitive(object);
                break;
            }
            case 'group': {
                this.deleteGroup(object);
                break;
            }
            default: {
                throw new Error(
                    `DIVERoot.deleteSceneObject: Unknown entity type: ${(object as unknown as COMEntity).entityType}`,
                );
            }
        }
    }

    public addLight(light: COMPartial<COMLight>): DIVELight {
        let sceneObject = this.getSceneObject(light);
        if (sceneObject) {
            console.warn(
                `DIVERoot.addModel: Model with id ${light.id} already exists`,
            );
            return sceneObject;
        }

        switch (light.type) {
            case 'scene': {
                light.type;
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
                throw new Error(
                    `DIVERoot.addLight: Unknown light type: ${(light as unknown as COMLight).type}`,
                );
            }
        }
        sceneObject.userData.id = light.id;
        this.add(sceneObject);

        return sceneObject;
    }

    private updateLight(light: COMPartial<COMLight>): void {
        let sceneObject = this.getSceneObject(light);
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
                    throw new Error(
                        `DIVERoot.updateLight: Unknown light type: ${(light as unknown as COMLight).type}`,
                    );
                }
            }
            sceneObject.userData.id = light.id;
            this.add(sceneObject);
        }

        if (light.name !== undefined && light.name !== null)
            sceneObject.name = light.name;
        if (light.position !== undefined && light.position !== null)
            sceneObject.position.set(
                light.position.x,
                light.position.y,
                light.position.z,
            );
        if (light.intensity !== undefined && light.intensity !== null)
            sceneObject.setIntensity(light.intensity);
        if (light.enabled !== undefined && light.enabled !== null)
            sceneObject.setEnabled(light.enabled);
        if (light.color !== undefined && light.color !== null)
            sceneObject.setColor(new Color(light.color));
        if (light.visible !== undefined && light.visible !== null)
            sceneObject.visible = light.visible;
        if (light.parentId !== undefined)
            this.setParent({ ...light, parentId: light.parentId });
    }

    public addModel(
        model: Partial<COMModel> & { id: string; entityType: 'model' },
    ): DIVEModel {
        let sceneObject = this.getSceneObject(model);
        if (sceneObject) {
            console.warn(
                `DIVERoot.addModel: Model with id ${model.id} already exists`,
            );
            return sceneObject;
        }
        const created = new DIVEModel();
        sceneObject = created;
        sceneObject.userData.id = model.id;
        sceneObject.userData.uri = model.uri;
        this.add(sceneObject);

        return sceneObject;
    }

    private updateModel(model: COMPartial<COMModel>): void {
        const sceneObject = this.getSceneObject(model);
        if (!sceneObject) {
            return;
        }

        if (model.uri !== undefined) sceneObject.setFromURL(model.uri);
        if (model.name !== undefined) sceneObject.name = model.name;
        if (model.position !== undefined)
            sceneObject.SetPosition(model.position);
        if (model.rotation !== undefined)
            sceneObject.SetRotation(model.rotation);
        if (model.scale !== undefined) sceneObject.SetScale(model.scale);
        if (model.visible !== undefined)
            sceneObject.setVisibility(model.visible);
        if (model.material !== undefined)
            sceneObject.setMaterial(model.material);
        if (model.parentId !== undefined)
            this.setParent({ ...model, parentId: model.parentId });
    }

    private updatePrimitive(primitive: COMPartial<COMPrimitive>): void {
        let sceneObject = this.getSceneObject(primitive);
        if (!sceneObject) {
            const created = new DIVEPrimitive();
            sceneObject = created;
            sceneObject.userData.id = primitive.id;
            this.add(sceneObject);
        }

        if (primitive.name !== undefined) sceneObject.name = primitive.name;
        if (primitive.geometry !== undefined)
            (sceneObject as DIVEPrimitive).SetGeometry(primitive.geometry);
        if (primitive.position !== undefined)
            (sceneObject as DIVEPrimitive).SetPosition(primitive.position);
        if (primitive.rotation !== undefined)
            (sceneObject as DIVEPrimitive).SetRotation(primitive.rotation);
        if (primitive.scale !== undefined)
            (sceneObject as DIVEPrimitive).SetScale(primitive.scale);
        if (primitive.visible !== undefined)
            (sceneObject as DIVEPrimitive).setVisibility(primitive.visible);
        if (primitive.material !== undefined)
            (sceneObject as DIVEPrimitive).setMaterial(primitive.material);
        if (primitive.parentId !== undefined)
            this.setParent({ ...primitive, parentId: primitive.parentId });
    }

    private updateGroup(group: COMPartial<COMGroup>): void {
        let sceneObject = this.getSceneObject(group);
        if (!sceneObject) {
            const created = new DIVEGroup();
            sceneObject = created;
            sceneObject.userData.id = group.id;
            this.add(sceneObject);
        }

        if (group.name !== undefined) sceneObject.name = group.name;
        if (group.position !== undefined)
            (sceneObject as DIVEGroup).SetPosition(group.position);
        if (group.rotation !== undefined)
            (sceneObject as DIVEGroup).SetRotation(group.rotation);
        if (group.scale !== undefined)
            (sceneObject as DIVEGroup).SetScale(group.scale);
        if (group.visible !== undefined)
            (sceneObject as DIVEGroup).setVisibility(group.visible);
        if (group.bbVisible !== undefined)
            (sceneObject as DIVEGroup).SetLinesVisibility(group.bbVisible);
        if (group.parentId !== undefined)
            this.setParent({ ...group, parentId: group.parentId });
    }

    private deleteLight(light: COMMinimal<COMLight>): void {
        const sceneObject = this.getSceneObject(light);
        if (!sceneObject) {
            console.warn(
                `DIVERoot.deleteLight: Light with id ${light.id} not found`,
            );
            return;
        }

        this.detachTransformControls(sceneObject);

        sceneObject.parent!.remove(sceneObject);
    }

    private deleteModel(model: COMMinimal<COMModel>): void {
        const sceneObject = this.getSceneObject(model);
        if (!sceneObject) {
            console.warn(
                `DIVERoot.deleteModel: Model with id ${model.id} not found`,
            );
            return;
        }

        this.detachTransformControls(sceneObject);

        sceneObject.parent!.remove(sceneObject);
    }

    private deletePrimitive(primitive: COMMinimal<COMPrimitive>): void {
        const sceneObject = this.getSceneObject(primitive);
        if (!sceneObject) {
            console.warn(
                `DIVERoot.deletePrimitive: Primitive with id ${primitive.id} not found`,
            );
            return;
        }

        this.detachTransformControls(sceneObject);

        sceneObject.parent!.remove(sceneObject);
    }

    private deleteGroup(group: COMMinimal<COMGroup>): void {
        const sceneObject = this.getSceneObject(group);
        if (!sceneObject) {
            console.warn(
                `DIVERoot.deleteGroup: Group with id ${group.id} not found`,
            );
            return;
        }

        this.detachTransformControls(sceneObject);

        for (let i = sceneObject.members.length - 1; i >= 0; i--) {
            this.attach(sceneObject.members[i]);
        }

        sceneObject.parent!.remove(sceneObject);
    }

    private setParent(
        object: COMMinimal<COMEntity> & {
            parentId: string | null;
        },
    ): void {
        const sceneObject = this.getSceneObject(object)!;

        if (object.parentId !== null) {
            const parent = this.getSceneObject({
                id: object.parentId,
                entityType: object.entityType,
            });
            if (!parent) return;

            // attach to new parent (if exists in scene)
            parent.attach(sceneObject);
        } else {
            // attach to root if no parent is found
            this.attach(sceneObject);
        }
    }

    private detachTransformControls(object: Object3D): void {
        // this is only neccessary due to using the old TransformControls instead of the new DIVEGizmo
        this.findScene(object).children.find((object) => {
            if ('isTransformControls' in object) {
                (object as TransformControls).detach();
            }
        });
    }

    private findScene(object: Object3D): DIVEScene {
        if (object.parent !== null) {
            return this.findScene(object.parent);
        }
        return object as DIVEScene;
    }
}
