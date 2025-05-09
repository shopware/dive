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

    public addSceneObject(object: COMEntity): DIVESceneObject | undefined {
        let sceneObject = this.getSceneObject(object);
        if (sceneObject) {
            console.warn(
                `DIVERoot.addSceneObject: Scene object with id ${object.id} already exists`,
            );
            return sceneObject;
        }

        switch (object.entityType) {
            case 'pov': {
                break;
            }
            case 'light': {
                switch (object.type) {
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
                            `DIVERoot.addSceneObject: Unknown light type: ${(object as unknown as COMLight).type}`,
                        );
                    }
                }

                sceneObject.name = object.name;
                sceneObject.userData.id = object.id;
                this.add(sceneObject);
                this._updateLight(sceneObject as DIVELight, object);
                break;
            }
            case 'model': {
                sceneObject = new DIVEModel();
                sceneObject.name = object.name;
                sceneObject.userData.id = object.id;
                sceneObject.userData.uri = object.uri;
                this.add(sceneObject);
                this._updateModel(sceneObject as DIVEModel, object);
                break;
            }
            case 'primitive': {
                sceneObject = new DIVEPrimitive();
                sceneObject.name = object.name;
                sceneObject.userData.id = object.id;
                this.add(sceneObject);
                this._updatePrimitive(sceneObject as DIVEPrimitive, object);
                break;
            }
            case 'group': {
                sceneObject = new DIVEGroup();
                sceneObject.name = object.name;
                sceneObject.userData.id = object.id;
                this.add(sceneObject);
                this._updateGroup(sceneObject as DIVEGroup, object);
                break;
            }
            default: {
                throw new Error(
                    `DIVERoot.addSceneObject: Unknown entity type: ${(object as unknown as COMEntity).entityType}`,
                );
            }
        }

        return sceneObject;
    }

    public updateSceneObject(object: COMPartial): void {
        const sceneObject = this.getSceneObject(object);
        if (!sceneObject) {
            console.warn(
                `DIVERoot.updateSceneObject: Scene object with id ${object.id} does not exist`,
            );
            return;
        }

        switch (object.entityType) {
            case 'pov': {
                break;
            }
            case 'light': {
                this._updateLight(sceneObject as DIVELight, object);
                break;
            }
            case 'model': {
                this._updateModel(sceneObject as DIVEModel, object);
                break;
            }
            case 'primitive': {
                this._updatePrimitive(sceneObject as DIVEPrimitive, object);
                break;
            }
            case 'group': {
                this._updateGroup(sceneObject as DIVEGroup, object);
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
        const sceneObject = this.getSceneObject(object);
        if (!sceneObject) {
            console.warn(
                `DIVERoot.deleteSceneObject: Object with id ${object.id} not found`,
            );
            return;
        }

        switch (object.entityType) {
            case 'pov': {
                break;
            }
            case 'light': {
                this._deleteLight(sceneObject as DIVELight);
                break;
            }
            case 'model': {
                this._deleteModel(sceneObject as DIVEModel);
                break;
            }
            case 'primitive': {
                this._deletePrimitive(sceneObject as DIVEPrimitive);
                break;
            }
            case 'group': {
                this._deleteGroup(sceneObject as DIVEGroup);
                break;
            }
            default: {
                throw new Error(
                    `DIVERoot.deleteSceneObject: Unknown entity type: ${(object as unknown as COMEntity).entityType}`,
                );
            }
        }
    }

    private _updateLight(
        sceneObject: DIVELight,
        props: COMPartial<COMLight>,
    ): void {
        if (props.name !== undefined && props.name !== null)
            sceneObject.name = props.name;
        if (props.position !== undefined && props.position !== null)
            sceneObject.position.set(
                props.position.x,
                props.position.y,
                props.position.z,
            );
        if (props.intensity !== undefined && props.intensity !== null)
            sceneObject.setIntensity(props.intensity);
        if (props.enabled !== undefined && props.enabled !== null)
            sceneObject.setEnabled(props.enabled);
        if (props.color !== undefined && props.color !== null)
            sceneObject.setColor(new Color(props.color));
        if (props.visible !== undefined && props.visible !== null)
            sceneObject.visible = props.visible;
        if (props.parentId !== undefined)
            this._setParent({ ...props, parentId: props.parentId });
    }

    private _updateModel(
        sceneObject: DIVEModel,
        model: COMPartial<COMModel>,
    ): void {
        if (model.uri !== undefined) sceneObject.setFromURL(model.uri);
        if (model.name !== undefined) sceneObject.name = model.name;
        if (model.position !== undefined)
            sceneObject.setPosition(model.position);
        if (model.rotation !== undefined)
            sceneObject.setRotation(model.rotation);
        if (model.scale !== undefined) sceneObject.setScale(model.scale);
        if (model.visible !== undefined)
            sceneObject.setVisibility(model.visible);
        if (model.material !== undefined)
            sceneObject.setMaterial(model.material);
        if (model.parentId !== undefined)
            this._setParent({ ...model, parentId: model.parentId });
    }

    private _updatePrimitive(
        sceneObject: DIVEPrimitive,
        primitive: COMPartial<COMPrimitive>,
    ): void {
        if (primitive.name !== undefined) sceneObject.name = primitive.name;
        if (primitive.geometry !== undefined)
            (sceneObject as DIVEPrimitive).setGeometry(primitive.geometry);
        if (primitive.position !== undefined)
            (sceneObject as DIVEPrimitive).setPosition(primitive.position);
        if (primitive.rotation !== undefined)
            (sceneObject as DIVEPrimitive).setRotation(primitive.rotation);
        if (primitive.scale !== undefined)
            (sceneObject as DIVEPrimitive).setScale(primitive.scale);
        if (primitive.visible !== undefined)
            (sceneObject as DIVEPrimitive).setVisibility(primitive.visible);
        if (primitive.material !== undefined)
            (sceneObject as DIVEPrimitive).setMaterial(primitive.material);
        if (primitive.parentId !== undefined)
            this._setParent({ ...primitive, parentId: primitive.parentId });
    }

    private _updateGroup(
        sceneObject: DIVEGroup,
        props: COMPartial<COMGroup>,
    ): void {
        if (props.name !== undefined) sceneObject.name = props.name;
        if (props.position !== undefined)
            (sceneObject as DIVEGroup).setPosition(props.position);
        if (props.rotation !== undefined)
            (sceneObject as DIVEGroup).setRotation(props.rotation);
        if (props.scale !== undefined)
            (sceneObject as DIVEGroup).setScale(props.scale);
        if (props.visible !== undefined)
            (sceneObject as DIVEGroup).setVisibility(props.visible);
        if (props.bbVisible !== undefined)
            (sceneObject as DIVEGroup).setLinesVisibility(props.bbVisible);
        if (props.parentId !== undefined)
            this._setParent({ ...props, parentId: props.parentId });
    }

    private _deleteLight(sceneObject: DIVELight): void {
        this._detachTransformControls(sceneObject);

        sceneObject.parent!.remove(sceneObject);
    }

    private _deleteModel(sceneObject: DIVEModel): void {
        this._detachTransformControls(sceneObject);

        sceneObject.parent!.remove(sceneObject);
    }

    private _deletePrimitive(sceneObject: DIVEPrimitive): void {
        this._detachTransformControls(sceneObject);

        sceneObject.parent!.remove(sceneObject);
    }

    private _deleteGroup(sceneObject: DIVEGroup): void {
        this._detachTransformControls(sceneObject);

        for (let i = sceneObject.members.length - 1; i >= 0; i--) {
            this.attach(sceneObject.members[i]);
        }

        sceneObject.parent!.remove(sceneObject);
    }

    private _setParent(
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

    private _detachTransformControls(object: Object3D): void {
        // this is only neccessary due to using the old TransformControls instead of the new DIVEGizmo
        this._findScene(object).children.find((object) => {
            if ('isTransformControls' in object) {
                (object as TransformControls).detach();
            }
        });
    }

    private _findScene(object: Object3D): DIVEScene {
        if (object.parent !== null) {
            return this._findScene(object.parent);
        }
        return object as DIVEScene;
    }
}
