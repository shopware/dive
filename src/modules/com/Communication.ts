import { generateUUID } from 'three/src/math/MathUtils';
import { isSelectTool } from '../../modules/toolbox/select/SelectTool.ts';
import { merge } from 'lodash';

// type imports
import { type Color, type MeshStandardMaterial } from 'three';
import {
    type COMLight,
    type COMModel,
    type COMEntity,
    type COMPov,
    type COMPrimitive,
    type COMGroup,
} from './types';
import { type DIVEToolbox } from '../../modules/toolbox/Toolbox';
import { type DIVEOrbitController } from '../../modules/controller/orbit/OrbitController';
import { type DIVEModel } from '../../components/model/Model.ts';
import { type DIVESelectable } from '../../interfaces/Selectable.ts';
import { Actions } from './actions/index.ts';
import { ModuleImporter } from '../index.ts';
import { DIVEEngine } from '../../engine/Engine.ts';
import {
    ActionDependencies,
    ActionDeps,
    ActionPayload,
    ActionReturn,
} from './actions/types.ts';

type EventListener<Action extends keyof Actions> = (
    payload: Actions[Action]['PAYLOAD'],
) => void;

type Unsubscribe = () => boolean;

/**
 * Main class for communicating with DIVE.
 *
 * You can subscribe to actions and perform them from outside and inside DIVE.
 *
 * ```ts
 * import { DIVE } from "@shopware-ag/dive";
 *
 * const dive = new DIVE();
 *
 * dive.Communication.Subscribe('GET_ALL_SCENE_DATA', () => {
 *  // do something
 * });
 *
 * dive.Communication.PerformAction('GET_ALL_SCENE_DATA', {});
 * ```
 *
 * @module
 */

export class DIVECommunication {
    private static __instances: DIVECommunication[] = [];

    public static get(id: string): DIVECommunication | undefined {
        const fromComID = this.__instances.find(
            (instance) => instance.id === id,
        );
        if (fromComID) return fromComID;
        return this.__instances.find((instance) =>
            Array.from(instance.registered.values()).find(
                (object) => object.id === id,
            ),
        );
    }

    private _id: string;
    public get id(): string {
        return this._id;
    }

    private engine: DIVEEngine;
    private controller: DIVEOrbitController;
    private toolbox: DIVEToolbox;

    // modules
    private _mediaCreator: ModuleImporter<'MediaCreator'>;
    private _arSystem: ModuleImporter<'ARSystem'>;
    private _assetExporter: ModuleImporter<'AssetExporter'>;

    private registered: Map<string, COMEntity> = new Map();

    private listeners: Map<keyof Actions, EventListener<keyof Actions>[]> =
        new Map();

    constructor(
        engine: DIVEEngine,
        controller: DIVEOrbitController,
        toolbox: DIVEToolbox,
    ) {
        this._id = generateUUID();
        this.engine = engine;
        this.controller = controller;
        this.toolbox = toolbox;

        this._mediaCreator = new ModuleImporter<'MediaCreator'>(
            'src/modules/mediacreator/MediaCreator.ts',
        );

        this._arSystem = new ModuleImporter<'ARSystem'>(
            'src/modules/ar/ARSystem.ts',
        );

        this._assetExporter = new ModuleImporter<'AssetExporter'>(
            'src/modules/asset/exporter/AssetExporter.ts',
        );

        DIVECommunication.__instances.push(this);
    }

    public DestroyInstance(): boolean {
        const existingIndex = DIVECommunication.__instances.findIndex(
            (entry) => entry.id === this.id,
        );
        if (existingIndex === -1) return false;
        DIVECommunication.__instances.splice(existingIndex, 1);
        return true;
    }

    public PerformAction<Action extends keyof Actions>(
        action: Action,
        payload?: Actions[Action]['PAYLOAD'],
    ): Actions[Action]['RETURN'] {
        let returnValue: Actions[Action]['RETURN'] = false;

        switch (action) {
            case 'START_RENDER': {
                1;
                this.engine.start();
                returnValue = true;
                break;
            }
            case 'GET_ALL_SCENE_DATA': {
                returnValue = this.getAllSceneData(
                    payload as Actions['GET_ALL_SCENE_DATA']['PAYLOAD'],
                );
                break;
            }
            case 'GET_ALL_OBJECTS': {
                returnValue = this.getAllObjects(
                    payload as Actions['GET_ALL_OBJECTS']['PAYLOAD'],
                );
                break;
            }
            case 'GET_OBJECTS': {
                returnValue = this.getObjects(
                    payload as Actions['GET_OBJECTS']['PAYLOAD'],
                );
                break;
            }
            case 'ADD_OBJECT': {
                returnValue = this.addObject(
                    payload as Actions['ADD_OBJECT']['PAYLOAD'],
                );
                break;
            }
            case 'UPDATE_OBJECT': {
                returnValue = this.updateObject(
                    payload as Actions['UPDATE_OBJECT']['PAYLOAD'],
                );
                break;
            }
            case 'DELETE_OBJECT': {
                returnValue = this.deleteObject(
                    payload as Actions['DELETE_OBJECT']['PAYLOAD'],
                );
                break;
            }
            case 'SELECT_OBJECT': {
                returnValue = this.selectObject(
                    payload as Actions['SELECT_OBJECT']['PAYLOAD'],
                );
                break;
            }
            case 'DESELECT_OBJECT': {
                returnValue = this.deselectObject(
                    payload as Actions['DESELECT_OBJECT']['PAYLOAD'],
                );
                break;
            }
            case 'SET_BACKGROUND': {
                returnValue = this.setBackground(
                    payload as Actions['SET_BACKGROUND']['PAYLOAD'],
                );
                break;
            }
            case 'DROP_IT': {
                returnValue = this.dropIt(
                    payload as Actions['DROP_IT']['PAYLOAD'],
                );
                break;
            }
            case 'PLACE_ON_FLOOR': {
                returnValue = this.placeOnFloor(
                    payload as Actions['PLACE_ON_FLOOR']['PAYLOAD'],
                );
                break;
            }
            case 'SET_CAMERA_TRANSFORM': {
                returnValue = this.setCameraTransform(
                    payload as Actions['SET_CAMERA_TRANSFORM']['PAYLOAD'],
                );
                break;
            }
            case 'GET_CAMERA_TRANSFORM': {
                returnValue = this.getCameraTransform(
                    payload as Actions['GET_CAMERA_TRANSFORM']['PAYLOAD'],
                );
                break;
            }
            case 'MOVE_CAMERA': {
                returnValue = this.moveCamera(
                    payload as Actions['MOVE_CAMERA']['PAYLOAD'],
                );
                break;
            }
            case 'RESET_CAMERA': {
                returnValue = this.resetCamera(
                    payload as Actions['RESET_CAMERA']['PAYLOAD'],
                );
                break;
            }
            case 'COMPUTE_ENCOMPASSING_VIEW': {
                returnValue = this.computeEncompassingView(
                    payload as Actions['COMPUTE_ENCOMPASSING_VIEW']['PAYLOAD'],
                );
                break;
            }
            case 'SET_CAMERA_LAYER': {
                returnValue = this.setCameraLayer(
                    payload as Actions['SET_CAMERA_LAYER']['PAYLOAD'],
                );
                break;
            }
            case 'ZOOM_CAMERA': {
                returnValue = this.zoomCamera(
                    payload as Actions['ZOOM_CAMERA']['PAYLOAD'],
                );
                break;
            }
            case 'SET_GIZMO_MODE': {
                returnValue = this.setGizmoMode(
                    payload as Actions['SET_GIZMO_MODE']['PAYLOAD'],
                );
                break;
            }
            case 'SET_GIZMO_VISIBILITY': {
                returnValue = this.setGizmoVisibility(
                    payload as Actions['SET_GIZMO_VISIBILITY']['PAYLOAD'],
                );
                break;
            }
            case 'SET_GIZMO_SCALE_LINKED': {
                returnValue = this.setGizmoScaleLinked(
                    payload as Actions['SET_GIZMO_SCALE_LINKED']['PAYLOAD'],
                );
                break;
            }
            case 'USE_TOOL': {
                returnValue = this.useTool(
                    payload as Actions['USE_TOOL']['PAYLOAD'],
                );
                break;
            }
            case 'MODEL_LOADED': {
                returnValue = this.modelLoaded(
                    payload as Actions['MODEL_LOADED']['PAYLOAD'],
                );
                break;
            }
            case 'UPDATE_SCENE': {
                returnValue = this.updateScene(
                    payload as Actions['UPDATE_SCENE']['PAYLOAD'],
                );
                break;
            }
            case 'GENERATE_MEDIA': {
                returnValue = this.generateMedia(
                    payload as Actions['GENERATE_MEDIA']['PAYLOAD'],
                );
                break;
            }
            case 'SET_PARENT': {
                returnValue = this.setParent(
                    payload as Actions['SET_PARENT']['PAYLOAD'],
                );
                break;
            }
            case 'EXPORT_SCENE': {
                returnValue = this.exportScene(
                    payload as Actions['EXPORT_SCENE']['PAYLOAD'],
                );
                break;
            }
            case 'LAUNCH_AR': {
                const { uri, options } =
                    payload as Actions['LAUNCH_AR']['PAYLOAD'];
                returnValue = new Promise<void>((resolve, reject) => {
                    this._arSystem
                        .instantiate()
                        .then((arSystem) => {
                            resolve(arSystem.launch(uri, options));
                        })
                        .catch(reject);
                });
                break;
            }
            default: {
                console.warn(
                    `DIVECommunication.PerformAction: has been executed with unknown Action type ${action}`,
                );
            }
        }

        this.dispatch(action, payload);

        return returnValue;
    }

    public Subscribe<Action extends keyof Actions>(
        type: Action,
        listener: EventListener<Action>,
    ): Unsubscribe {
        if (!this.listeners.get(type)) this.listeners.set(type, []);

        // casting to any because of typescript not finding between Action and typeof Actions being equal in this case
        this.listeners
            .get(type)!
            .push(listener as EventListener<keyof Actions>);

        return () => {
            const listenerArray = this.listeners.get(type);
            if (!listenerArray) return false;

            const existingIndex = listenerArray.findIndex(
                (entry) => entry === listener,
            );
            if (existingIndex === -1) return false;

            listenerArray.splice(existingIndex, 1);
            return true;
        };
    }

    private dispatch<Action extends keyof Actions>(
        type: Action,
        payload: Actions[Action]['PAYLOAD'],
    ): void {
        const listenerArray = this.listeners.get(type);
        if (!listenerArray) return;

        listenerArray.forEach((listener) => listener(payload));
    }

    private getAllSceneData(
        payload: Actions['GET_ALL_SCENE_DATA']['PAYLOAD'],
    ): Actions['GET_ALL_SCENE_DATA']['RETURN'] {
        const sceneData = {
            name: this.engine.renderPipeline.scene.name,
            mediaItem: null,
            backgroundColor:
                '#' +
                (
                    this.engine.renderPipeline.scene.background as Color
                ).getHexString(),
            floorEnabled: this.engine.renderPipeline.scene.Root.floor.visible,
            floorColor:
                '#' +
                (
                    this.engine.renderPipeline.scene.Root.floor
                        .material as MeshStandardMaterial
                ).color.getHexString(),
            userCamera: {
                position: this.controller.object.position.clone(),
                target: this.controller.target.clone(),
            },
            spotmarks: [],
            lights: Array.from(this.registered.values()).filter(
                (object) => object.entityType === 'light',
            ) as COMLight[],
            objects: Array.from(this.registered.values()).filter(
                (object) => object.entityType === 'model',
            ) as COMModel[],
            cameras: Array.from(this.registered.values()).filter(
                (object) => object.entityType === 'pov',
            ) as COMPov[],
            primitives: Array.from(this.registered.values()).filter(
                (object) => object.entityType === 'primitive',
            ) as COMPrimitive[],
            groups: Array.from(this.registered.values()).filter(
                (object) => object.entityType === 'group',
            ) as COMGroup[],
        };
        Object.assign(payload, sceneData);
        return sceneData;
    }

    private getAllObjects(
        payload: Actions['GET_ALL_OBJECTS']['PAYLOAD'],
    ): Actions['GET_ALL_OBJECTS']['RETURN'] {
        Object.assign(payload, this.registered);
        return this.registered;
    }

    private getObjects(
        payload: Actions['GET_OBJECTS']['PAYLOAD'],
    ): Actions['GET_OBJECTS']['RETURN'] {
        if (payload.ids.length === 0) return [];

        const objects: COMEntity[] = [];
        this.registered.forEach((object) => {
            if (!payload.ids.includes(object.id)) return;
            objects.push(object);
        });

        return objects;
    }

    private addObject(
        payload: Actions['ADD_OBJECT']['PAYLOAD'],
    ): Actions['ADD_OBJECT']['RETURN'] {
        if (this.registered.get(payload.id)) return false;

        if (payload.parentId === undefined) payload.parentId = null;

        this.registered.set(payload.id, payload);

        this.engine.renderPipeline.scene.AddSceneObject(payload);

        return true;
    }

    private updateObject(
        payload: Actions['UPDATE_OBJECT']['PAYLOAD'],
    ): Actions['UPDATE_OBJECT']['RETURN'] {
        const objectToUpdate = this.registered.get(payload.id);
        if (!objectToUpdate) return false;

        this.registered.set(payload.id, merge(objectToUpdate, payload));

        const updatedObject = this.registered.get(payload.id)!;
        this.engine.renderPipeline.scene.UpdateSceneObject({
            ...payload,
            id: updatedObject.id,
            entityType: updatedObject.entityType,
        });

        Object.assign(payload, updatedObject);

        return true;
    }

    private deleteObject(
        payload: Actions['DELETE_OBJECT']['PAYLOAD'],
    ): Actions['DELETE_OBJECT']['RETURN'] {
        const deletedObject = this.registered.get(payload.id);
        if (!deletedObject) return false;

        // If the object has a parent, detach it first
        if (deletedObject.parentId) {
            // First detach from parent group
            this.setParent({
                object: { id: deletedObject.id },
                parent: null,
            });
        }

        // If deleting a group, update all children to have no parent
        if (deletedObject.entityType === 'group') {
            this.registered.forEach((object) => {
                if (object.parentId === deletedObject.id) {
                    this.updateObject({
                        id: object.id,
                        parentId: null,
                    });
                }
            });
        }

        // copy object to payload to use later
        Object.assign(payload, deletedObject);

        this.registered.delete(payload.id);

        this.engine.renderPipeline.scene.DeleteSceneObject(deletedObject);

        return true;
    }

    private selectObject(
        payload: Actions['SELECT_OBJECT']['PAYLOAD'],
    ): Actions['SELECT_OBJECT']['RETURN'] {
        const object = this.registered.get(payload.id);
        if (!object) return false;

        const sceneObject =
            this.engine.renderPipeline.scene.GetSceneObject(object);
        if (!sceneObject) return false;

        if (!('isSelectable' in sceneObject)) return false;

        const activeTool = this.toolbox.GetActiveTool();
        if (activeTool && isSelectTool(activeTool)) {
            activeTool.AttachGizmo(sceneObject as DIVESelectable);
        }

        // copy object to payload to use later
        Object.assign(payload, object);

        return true;
    }

    private deselectObject(
        payload: Actions['DESELECT_OBJECT']['PAYLOAD'],
    ): Actions['DESELECT_OBJECT']['RETURN'] {
        const object = this.registered.get(payload.id);
        if (!object) return false;

        const sceneObject =
            this.engine.renderPipeline.scene.GetSceneObject(object);
        if (!sceneObject) return false;

        if (!('isSelectable' in sceneObject)) return false;

        const activeTool = this.toolbox.GetActiveTool();
        if (activeTool && isSelectTool(activeTool)) {
            activeTool.DetachGizmo();
        }

        // copy object to payload to use later
        Object.assign(payload, object);

        return true;
    }

    private setBackground(
        payload: Actions['SET_BACKGROUND']['PAYLOAD'],
    ): Actions['SET_BACKGROUND']['RETURN'] {
        this.engine.renderPipeline.scene.SetBackground(payload.color);

        return true;
    }

    private dropIt(
        payload: Actions['DROP_IT']['PAYLOAD'],
    ): Actions['DROP_IT']['RETURN'] {
        const object = this.registered.get(payload.id);
        if (!object) return false;

        const model = this.engine.renderPipeline.scene.GetSceneObject(
            object,
        ) as DIVEModel;
        model.DropIt();

        return true;
    }

    private placeOnFloor(
        payload: Actions['PLACE_ON_FLOOR']['PAYLOAD'],
    ): Actions['PLACE_ON_FLOOR']['RETURN'] {
        const object = this.registered.get(payload.id);
        if (!object) return false;

        this.engine.renderPipeline.scene.PlaceOnFloor(object);

        return true;
    }

    private setCameraTransform(
        payload: Actions['SET_CAMERA_TRANSFORM']['PAYLOAD'],
    ): Actions['SET_CAMERA_TRANSFORM']['RETURN'] {
        this.controller.object.position.copy(payload.position);
        this.controller.target.copy(payload.target);
        this.controller.update();

        return true;
    }

    private getCameraTransform(
        payload: Actions['GET_CAMERA_TRANSFORM']['PAYLOAD'],
    ): Actions['GET_CAMERA_TRANSFORM']['RETURN'] {
        const transform = {
            position: this.controller.object.position.clone(),
            target: this.controller.target.clone(),
        };
        Object.assign(payload, transform);

        return transform;
    }

    private moveCamera(
        payload: Actions['MOVE_CAMERA']['PAYLOAD'],
    ): Actions['MOVE_CAMERA']['RETURN'] {
        let position = { x: 0, y: 0, z: 0 };
        let target = { x: 0, y: 0, z: 0 };
        if ('id' in payload) {
            position = (this.registered.get(payload.id) as COMPov).position;
            target = (this.registered.get(payload.id) as COMPov).target;
        } else {
            position = payload.position;
            target = payload.target;
        }
        this.controller.MoveTo(
            position,
            target,
            payload.duration,
            payload.locked,
        );

        return true;
    }

    private setCameraLayer(
        payload: Actions['SET_CAMERA_LAYER']['PAYLOAD'],
    ): Actions['SET_CAMERA_LAYER']['RETURN'] {
        this.controller.object.setCameraLayer(payload.layer);

        return true;
    }

    private resetCamera(
        payload: Actions['RESET_CAMERA']['PAYLOAD'],
    ): Actions['RESET_CAMERA']['RETURN'] {
        this.controller.RevertLast(payload.duration);

        return true;
    }

    private computeEncompassingView(
        payload: Actions['COMPUTE_ENCOMPASSING_VIEW']['PAYLOAD'],
    ): Actions['COMPUTE_ENCOMPASSING_VIEW']['RETURN'] {
        const sceneBB = this.engine.renderPipeline.scene.ComputeSceneBB();

        const transform = this.controller.ComputeEncompassingView(sceneBB);
        Object.assign(payload, transform);

        return transform;
    }

    private zoomCamera(
        payload: Actions['ZOOM_CAMERA']['PAYLOAD'],
    ): Actions['ZOOM_CAMERA']['RETURN'] {
        if (payload.direction === 'IN') this.controller.ZoomIn(payload.by);
        if (payload.direction === 'OUT') this.controller.ZoomOut(payload.by);

        return true;
    }

    private setGizmoMode(
        payload: Actions['SET_GIZMO_MODE']['PAYLOAD'],
    ): Actions['SET_GIZMO_MODE']['RETURN'] {
        this.toolbox.SetGizmoMode(payload.mode);
        return true;
    }

    private setGizmoVisibility(
        payload: Actions['SET_GIZMO_VISIBILITY']['PAYLOAD'],
    ): Actions['SET_GIZMO_VISIBILITY']['RETURN'] {
        this.toolbox.SetGizmoVisibility(payload);
        return payload;
    }

    private setGizmoScaleLinked(
        payload: Actions['SET_GIZMO_SCALE_LINKED']['PAYLOAD'],
    ): Actions['SET_GIZMO_SCALE_LINKED']['RETURN'] {
        this.toolbox.SetGizmoScaleLinked(payload);
        return payload;
    }

    private useTool(
        payload: Actions['USE_TOOL']['PAYLOAD'],
    ): Actions['USE_TOOL']['RETURN'] {
        this.toolbox.UseTool(payload.tool);
        return true;
    }

    private modelLoaded(
        payload: Actions['MODEL_LOADED']['PAYLOAD'],
    ): Actions['MODEL_LOADED']['RETURN'] {
        (this.registered.get(payload.id) as COMModel).loaded = true;
        return true;
    }

    private updateScene(
        payload: Actions['UPDATE_SCENE']['PAYLOAD'],
    ): Actions['UPDATE_SCENE']['RETURN'] {
        if (payload.name !== undefined)
            this.engine.renderPipeline.scene.name = payload.name;
        if (payload.backgroundColor !== undefined)
            this.engine.renderPipeline.scene.SetBackground(
                payload.backgroundColor,
            );

        if (payload.gridEnabled !== undefined)
            this.engine.renderPipeline.scene.Grid.SetVisibility(
                payload.gridEnabled,
            );

        if (payload.floorEnabled !== undefined)
            this.engine.renderPipeline.scene.Root.floor.SetVisibility(
                payload.floorEnabled,
            );
        if (payload.floorColor !== undefined)
            this.engine.renderPipeline.scene.Root.floor.SetColor(
                payload.floorColor,
            );

        // fill payload with current values
        // TODO optmize this
        payload.name = this.engine.renderPipeline.scene.name;
        payload.backgroundColor =
            '#' +
            (
                this.engine.renderPipeline.scene.background as Color
            ).getHexString();
        payload.gridEnabled = this.engine.renderPipeline.scene.Grid.visible;
        payload.floorEnabled =
            this.engine.renderPipeline.scene.Root.floor.visible;
        payload.floorColor =
            '#' +
            (
                this.engine.renderPipeline.scene.Root.floor
                    .material as MeshStandardMaterial
            ).color.getHexString();

        return true;
    }

    private generateMedia(
        payload: Actions['GENERATE_MEDIA']['PAYLOAD'],
    ): Actions['GENERATE_MEDIA']['RETURN'] {
        let position = { x: 0, y: 0, z: 0 };
        let target = { x: 0, y: 0, z: 0 };
        if ('id' in payload) {
            position = (this.registered.get(payload.id) as COMPov).position;
            target = (this.registered.get(payload.id) as COMPov).target;
        } else {
            position = payload.position;
            target = payload.target;
        }

        return this._mediaCreator
            .instantiate(
                this.engine.renderPipeline,
                this.engine.renderPipeline.scene,
                this.controller,
            )
            .then((mediaCreator) => {
                return mediaCreator.GenerateMedia(
                    position,
                    target,
                    payload.width,
                    payload.height,
                );
            });
    }

    private setParent(
        payload: Actions['SET_PARENT']['PAYLOAD'],
    ): Actions['SET_PARENT']['RETURN'] {
        const object = this.registered.get(payload.object.id);
        if (!object) return false;

        const sceneObject =
            this.engine.renderPipeline.scene.GetSceneObject(object);
        if (!sceneObject) return false;

        if (payload.parent === null) {
            // detach from current parent
            this.engine.renderPipeline.scene.Root.attach(sceneObject);
            // Update registration to reflect no parent
            this.updateObject({
                id: object.id,
                parentId: null,
            });
            return true;
        }

        if (payload.object.id === payload.parent.id) {
            // cannot attach object to itself
            return false;
        }

        const parent = this.registered.get(payload.parent.id);
        if (!parent) {
            // detach from current parent
            this.engine.renderPipeline.scene.Root.attach(sceneObject);
            // Update registration to reflect no parent
            this.updateObject({
                id: object.id,
                parentId: null,
            });
            return true;
        }

        // attach to new parent
        const parentObject =
            this.engine.renderPipeline.scene.GetSceneObject(parent);
        if (!parentObject) {
            // detach from current parent
            this.engine.renderPipeline.scene.Root.attach(sceneObject);
            // Update registration to reflect no parent
            this.updateObject({
                id: object.id,
                parentId: null,
            });
            return true;
        }

        // attach to new parent
        parentObject.attach(sceneObject);
        // Update registration to reflect new parent
        this.updateObject({
            id: object.id,
            parentId: parent.id,
        });
        return true;
    }

    private exportScene(
        payload: Actions['EXPORT_SCENE']['PAYLOAD'],
    ): Actions['EXPORT_SCENE']['RETURN'] {
        return this._assetExporter.instantiate().then((assetExporter) => {
            return assetExporter.export(
                this.engine.renderPipeline.scene.Root,
                payload.type,
                {},
            );
        });
    }

    public PerformAction_new<ActionType extends keyof ActionClasses>(
        action: ActionType,
        ...args: ActionPayload<ActionClasses[ActionType]> extends void
            ? []
            : [ActionPayload<ActionClasses[ActionType]>]
    ): ActionReturn<ActionClasses[ActionType]> {
        const ActionClass = Actions[action] as unknown as {
            new (
                payload: ActionPayload<ActionClasses[ActionType]>,
                dependencies: ActionDeps<ActionClasses[ActionType]>,
            ): InstanceType<ActionClasses[ActionType]>;
        };

        // Get only the dependencies this action needs
        const requiredDeps = this.getDependencies<
            ActionDeps<ActionClasses[ActionType]>
        >({} as ActionDeps<ActionClasses[ActionType]>);

        const payload = args[0] as ActionPayload<ActionClasses[ActionType]>;
        const actionInstance = new ActionClass(payload, requiredDeps);

        try {
            return actionInstance.execute() as ActionReturn<
                ActionClasses[ActionType]
            >;
        } catch (error) {
            throw new Error(`Failed to execute ${action}`, { cause: error });
        }
    }

    private getDependencies<D extends Partial<ActionDependencies>>(
        requiredDeps: D,
    ): D {
        const deps: Partial<ActionDependencies> = {};

        // Only load the dependencies that are actually needed
        if ('scene' in requiredDeps) deps.scene = this.engine.scene;
        if ('renderer' in requiredDeps) deps.renderer = this.engine.renderer;
        if ('controller' in requiredDeps) deps.controller = this.controller;
        if ('toolbox' in requiredDeps) deps.toolbox = this.toolbox;
        if ('mediaCreator' in requiredDeps)
            deps.mediaCreator = this._mediaCreator;
        if ('ar' in requiredDeps) {
            deps.ar = this._arSystem;
        }

        return deps as D;
    }
}

export type { Actions } from './actions/index.ts';
