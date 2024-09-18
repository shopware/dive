import { Actions } from "./actions/index.ts";
import { generateUUID } from 'three/src/math/MathUtils';

// type imports
import { type Color, type MeshStandardMaterial } from "three";
import { type COMLight, type COMModel, type COMEntity, type COMPov } from "./types.ts";
import { type DIVEScene } from "../scene/Scene.ts";
import type DIVEToolbox from "../toolbox/Toolbox.ts";
import type DIVEOrbitControls from "../controls/OrbitControls.ts";
import { type DIVEModel } from "../model/Model.ts";
import { type DIVEMediaCreator } from "../mediacreator/MediaCreator.ts";
import { type DIVERenderer } from "../renderer/Renderer.ts";
import { type DIVESelectable } from "../interface/Selectable.ts";
import { isSelectTool } from "../toolbox/select/SelectTool.ts";

type EventListener<Action extends keyof Actions> = (payload: Actions[Action]['PAYLOAD']) => void;

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
 * }));
 *
 * dive.Communication.PerformAction('GET_ALL_SCENE_DATA', {});
 * ```
 *
 * @module
 */

export class DIVECommunication {
    private static __instances: DIVECommunication[] = [];

    public static get(id: string): DIVECommunication | undefined {
        const fromComID = this.__instances.find((instance) => instance.id === id);
        if (fromComID) return fromComID;
        return this.__instances.find((instance) => Array.from(instance.registered.values()).find((object) => object.id === id));
    }

    private _id: string;
    public get id(): string {
        return this._id;
    }

    private renderer: DIVERenderer;
    private scene: DIVEScene;
    private controller: DIVEOrbitControls;
    private toolbox: DIVEToolbox;

    private _mediaGenerator: DIVEMediaCreator | null;
    private get mediaGenerator(): DIVEMediaCreator {
        if (!this._mediaGenerator) {
            const DIVEMediaCreator = require('../mediacreator/MediaCreator.ts').DIVEMediaCreator as typeof import('../mediacreator/MediaCreator.ts').DIVEMediaCreator;
            this._mediaGenerator = new DIVEMediaCreator(this.renderer, this.scene, this.controller);
        }
        return this._mediaGenerator;
    }

    private registered: Map<string, COMEntity> = new Map();

    // private listeners: { [key: string]: EventListener[] } = {};
    private listeners: Map<keyof Actions, EventListener<keyof Actions>[]> = new Map();

    constructor(renderer: DIVERenderer, scene: DIVEScene, controls: DIVEOrbitControls, toolbox: DIVEToolbox) {
        this._id = generateUUID();
        this.renderer = renderer;
        this.scene = scene;
        this.controller = controls;
        this.toolbox = toolbox;
        this._mediaGenerator = null;

        DIVECommunication.__instances.push(this);
    }

    public DestroyInstance(): boolean {
        const existingIndex = DIVECommunication.__instances.findIndex((entry) => entry.id === this.id);
        if (existingIndex === -1) return false;
        DIVECommunication.__instances.splice(existingIndex, 1);
        return true;
    }

    public PerformAction<Action extends keyof Actions>(action: Action, payload: Actions[Action]['PAYLOAD']): Actions[Action]['RETURN'] {
        let returnValue: Actions[Action]['RETURN'] = false;

        switch (action) {
            case 'GET_ALL_SCENE_DATA': {
                returnValue = this.getAllSceneData(payload as Actions['GET_ALL_SCENE_DATA']['PAYLOAD']);
                break;
            }
            case 'GET_ALL_OBJECTS': {
                returnValue = this.getAllObjects(payload as Actions['GET_ALL_OBJECTS']['PAYLOAD']);
                break;
            }
            case 'GET_OBJECTS': {
                returnValue = this.getObjects(payload as Actions['GET_OBJECTS']['PAYLOAD']);
                break;
            }
            case 'ADD_OBJECT': {
                returnValue = this.addObject(payload as Actions['ADD_OBJECT']['PAYLOAD']);
                break;
            }
            case 'UPDATE_OBJECT': {
                returnValue = this.updateObject(payload as Actions['UPDATE_OBJECT']['PAYLOAD']);
                break;
            }
            case 'DELETE_OBJECT': {
                returnValue = this.deleteObject(payload as Actions['DELETE_OBJECT']['PAYLOAD']);
                break;
            }
            case 'SELECT_OBJECT': {
                returnValue = this.selectObject(payload as Actions['SELECT_OBJECT']['PAYLOAD']);
                break;
            }
            case 'DESELECT_OBJECT': {
                returnValue = this.deselectObject(payload as Actions['DESELECT_OBJECT']['PAYLOAD']);
                break;
            }
            case 'SET_BACKGROUND': {
                returnValue = this.setBackground(payload as Actions['SET_BACKGROUND']['PAYLOAD']);
                break;
            }
            case 'DROP_IT': {
                returnValue = this.dropIt(payload as Actions['DROP_IT']['PAYLOAD']);
                break;
            }
            case 'PLACE_ON_FLOOR': {
                returnValue = this.placeOnFloor(payload as Actions['PLACE_ON_FLOOR']['PAYLOAD']);
                break;
            }
            case 'SET_CAMERA_TRANSFORM': {
                returnValue = this.setCameraTransform(payload as Actions['SET_CAMERA_TRANSFORM']['PAYLOAD']);
                break;
            }
            case 'GET_CAMERA_TRANSFORM': {
                returnValue = this.getCameraTransform(payload as Actions['GET_CAMERA_TRANSFORM']['PAYLOAD']);
                break;
            }
            case 'MOVE_CAMERA': {
                returnValue = this.moveCamera(payload as Actions['MOVE_CAMERA']['PAYLOAD']);
                break;
            }
            case 'RESET_CAMERA': {
                returnValue = this.resetCamera(payload as Actions['RESET_CAMERA']['PAYLOAD']);
                break;
            }
            case 'COMPUTE_ENCOMPASSING_VIEW': {
                returnValue = this.computeEncompassingView(payload as Actions['COMPUTE_ENCOMPASSING_VIEW']['PAYLOAD']);
                break;
            }
            case 'SET_CAMERA_LAYER': {
                returnValue = this.setCameraLayer(payload as Actions['SET_CAMERA_LAYER']['PAYLOAD']);
                break;
            }
            case 'ZOOM_CAMERA': {
                returnValue = this.zoomCamera(payload as Actions['ZOOM_CAMERA']['PAYLOAD']);
                break;
            }
            case 'SET_GIZMO_MODE': {
                returnValue = this.setGizmoMode(payload as Actions['SET_GIZMO_MODE']['PAYLOAD']);
                break;
            }
            case 'SET_GIZMO_VISIBILITY': {
                returnValue = this.setGizmoVisibility(payload as Actions['SET_GIZMO_VISIBILITY']['PAYLOAD']);
                break;
            }
            case 'USE_TOOL': {
                returnValue = this.useTool(payload as Actions['USE_TOOL']['PAYLOAD']);
                break;
            }
            case 'MODEL_LOADED': {
                returnValue = this.modelLoaded(payload as Actions['MODEL_LOADED']['PAYLOAD']);
                break;
            }
            case 'UPDATE_SCENE': {
                returnValue = this.updateScene(payload as Actions['UPDATE_SCENE']['PAYLOAD']);
                break;
            }
            case 'GENERATE_MEDIA': {
                returnValue = this.generateMedia(payload as Actions['GENERATE_MEDIA']['PAYLOAD']);
                break;
            }
        }

        this.dispatch(action, payload);

        return returnValue;
    }

    public Subscribe<Action extends keyof Actions>(type: Action, listener: EventListener<Action>): Unsubscribe {
        if (!this.listeners.get(type)) this.listeners.set(type, []);

        // casting to any because of typescript not finding between Action and typeof Actions being equal in this case
        this.listeners.get(type)!.push(listener as EventListener<keyof Actions>);

        return () => {
            const listenerArray = this.listeners.get(type);
            if (!listenerArray) return false;

            const existingIndex = listenerArray.findIndex((entry) => entry === listener);
            if (existingIndex === -1) return false;

            listenerArray.splice(existingIndex, 1);
            return true;
        };
    }

    private dispatch<Action extends keyof Actions>(type: Action, payload: Actions[Action]['PAYLOAD']): void {
        const listenerArray = this.listeners.get(type);
        if (!listenerArray) return;

        listenerArray.forEach((listener) => listener(payload))
    }

    private getAllSceneData(payload: Actions['GET_ALL_SCENE_DATA']['PAYLOAD']): Actions['GET_ALL_SCENE_DATA']['RETURN'] {
        const sceneData = {
            name: this.scene.name,
            mediaItem: null,
            backgroundColor: '#' + (this.scene.background as Color).getHexString(),
            floorEnabled: this.scene.Floor.visible,
            floorColor: '#' + (this.scene.Floor.material as MeshStandardMaterial).color.getHexString(),
            userCamera: {
                position: this.controller.object.position.clone(),
                target: this.controller.target.clone(),
            },
            spotmarks: [],
            lights: Array.from(this.registered.values()).filter((object) => object.entityType === 'light') as COMLight[],
            objects: Array.from(this.registered.values()).filter((object) => object.entityType === 'model') as COMModel[],
            cameras: Array.from(this.registered.values()).filter((object) => object.entityType === 'pov') as COMPov[],
        };
        Object.assign(payload, sceneData);
        return sceneData;
    }

    private getAllObjects(payload: Actions['GET_ALL_OBJECTS']['PAYLOAD']): Actions['GET_ALL_OBJECTS']['RETURN'] {
        Object.assign(payload, this.registered);
        return this.registered;
    }

    private getObjects(payload: Actions['GET_OBJECTS']['PAYLOAD']): Actions['GET_OBJECTS']['RETURN'] {
        if (payload.ids.length === 0) return [];

        const objects: COMEntity[] = [];
        this.registered.forEach((object) => {
            if (!payload.ids.includes(object.id)) return;
            objects.push(object);
        });

        return objects;
    }

    private addObject(payload: Actions['ADD_OBJECT']['PAYLOAD']): Actions['ADD_OBJECT']['RETURN'] {
        if (this.registered.get(payload.id)) return false;

        this.registered.set(payload.id, payload);

        this.scene.AddSceneObject(payload);

        return true;
    }

    private updateObject(payload: Actions['UPDATE_OBJECT']['PAYLOAD']): Actions['UPDATE_OBJECT']['RETURN'] {
        const objectToUpdate = this.registered.get(payload.id);
        if (!objectToUpdate) return false;

        this.registered.set(payload.id, { ...objectToUpdate, ...payload });

        const updatedObject = this.registered.get(payload.id)!;
        this.scene.UpdateSceneObject(updatedObject);

        Object.assign(payload, updatedObject);

        return true;
    }

    private deleteObject(payload: Actions['DELETE_OBJECT']['PAYLOAD']): Actions['DELETE_OBJECT']['RETURN'] {
        const deletedObject = this.registered.get(payload.id);
        if (!deletedObject) return false;

        // copy object to payload to use later
        Object.assign(payload, deletedObject);

        this.registered.delete(payload.id);

        this.scene.DeleteSceneObject(deletedObject);

        return true;
    }

    private selectObject(payload: Actions['SELECT_OBJECT']['PAYLOAD']): Actions['SELECT_OBJECT']['RETURN'] {
        const object = this.registered.get(payload.id);
        if (!object) return false;

        const sceneObject = this.scene.GetSceneObject(object);
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

    private deselectObject(payload: Actions['DESELECT_OBJECT']['PAYLOAD']): Actions['DESELECT_OBJECT']['RETURN'] {
        const object = this.registered.get(payload.id);
        if (!object) return false;

        const sceneObject = this.scene.GetSceneObject(object);
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

    private setBackground(payload: Actions['SET_BACKGROUND']['PAYLOAD']): Actions['SET_BACKGROUND']['RETURN'] {
        this.scene.SetBackground(payload.color);

        return true;
    }

    private dropIt(payload: Actions['DROP_IT']['PAYLOAD']): Actions['DROP_IT']['RETURN'] {
        const object = this.registered.get(payload.id);
        if (!object) return false;

        const model = this.scene.GetSceneObject(object) as DIVEModel;
        model.DropIt();

        return true;
    }

    private placeOnFloor(payload: Actions['PLACE_ON_FLOOR']['PAYLOAD']): Actions['PLACE_ON_FLOOR']['RETURN'] {
        if (!this.registered.get(payload.id)) return false;

        this.scene.PlaceOnFloor(payload);

        return true;
    }

    private setCameraTransform(payload: Actions['SET_CAMERA_TRANSFORM']['PAYLOAD']): Actions['SET_CAMERA_TRANSFORM']['RETURN'] {
        this.controller.object.position.copy(payload.position);
        this.controller.target.copy(payload.target);
        this.controller.update();

        return true;
    }

    private getCameraTransform(payload: Actions['GET_CAMERA_TRANSFORM']['PAYLOAD']): Actions['GET_CAMERA_TRANSFORM']['RETURN'] {
        const transform = {
            position: this.controller.object.position.clone(),
            target: this.controller.target.clone()
        };
        Object.assign(payload, transform);

        return transform;
    }

    private moveCamera(payload: Actions['MOVE_CAMERA']['PAYLOAD']): Actions['MOVE_CAMERA']['RETURN'] {
        let position = { x: 0, y: 0, z: 0 };
        let target = { x: 0, y: 0, z: 0 };
        if ('id' in payload) {
            position = (this.registered.get(payload.id) as COMPov).position;
            target = (this.registered.get(payload.id) as COMPov).target;
        } else {
            position = payload.position;
            target = payload.target;
        }
        this.controller.MoveTo(position, target, payload.duration, payload.locked);

        return true;
    }

    private setCameraLayer(payload: Actions['SET_CAMERA_LAYER']['PAYLOAD']): Actions['SET_CAMERA_LAYER']['RETURN'] {
        this.controller.object.SetCameraLayer(payload.layer);

        return true;
    }

    private resetCamera(payload: Actions['RESET_CAMERA']['PAYLOAD']): Actions['RESET_CAMERA']['RETURN'] {
        this.controller.RevertLast(payload.duration);

        return true;
    }

    private computeEncompassingView(payload: Actions['COMPUTE_ENCOMPASSING_VIEW']['PAYLOAD']): Actions['COMPUTE_ENCOMPASSING_VIEW']['RETURN'] {
        const sceneBB = this.scene.ComputeSceneBB();

        const transform = this.controller.ComputeEncompassingView(sceneBB);
        Object.assign(payload, transform);

        return transform;
    }

    private zoomCamera(payload: Actions['ZOOM_CAMERA']['PAYLOAD']): Actions['ZOOM_CAMERA']['RETURN'] {
        if (payload.direction === 'IN') this.controller.ZoomIn(payload.by);
        if (payload.direction === 'OUT') this.controller.ZoomOut(payload.by);

        return true;
    }

    private setGizmoMode(payload: Actions['SET_GIZMO_MODE']['PAYLOAD']): Actions['SET_GIZMO_MODE']['RETURN'] {
        this.toolbox.SetGizmoMode(payload.mode);
        return true;
    }

    private setGizmoVisibility(payload: Actions['SET_GIZMO_VISIBILITY']['PAYLOAD']): Actions['SET_GIZMO_VISIBILITY']['RETURN'] {
        this.toolbox.SetGizmoVisibility(payload);
        return payload;
    }

    private useTool(payload: Actions['USE_TOOL']['PAYLOAD']): Actions['USE_TOOL']['RETURN'] {
        this.toolbox.UseTool(payload.tool);
        return true;
    }

    private modelLoaded(payload: Actions['MODEL_LOADED']['PAYLOAD']): Actions['MODEL_LOADED']['RETURN'] {
        (this.registered.get(payload.id) as COMModel).loaded = true;
        return true;
    }

    private updateScene(payload: Actions['UPDATE_SCENE']['PAYLOAD']): Actions['UPDATE_SCENE']['RETURN'] {
        if (payload.name !== undefined) this.scene.name = payload.name;
        if (payload.backgroundColor !== undefined) this.scene.SetBackground(payload.backgroundColor);

        if (payload.gridEnabled !== undefined) this.scene.Grid.SetVisibility(payload.gridEnabled);

        if (payload.floorEnabled !== undefined) this.scene.Floor.SetVisibility(payload.floorEnabled);
        if (payload.floorColor !== undefined) this.scene.Floor.SetColor(payload.floorColor);


        // fill payload with current values
        // TODO optmize this
        payload.name = this.scene.name;
        payload.backgroundColor = '#' + (this.scene.background as Color).getHexString();
        payload.gridEnabled = this.scene.Grid.visible;
        payload.floorEnabled = this.scene.Floor.visible;
        payload.floorColor = '#' + (this.scene.Floor.material as MeshStandardMaterial).color.getHexString();

        return true;
    }

    private generateMedia(payload: Actions['GENERATE_MEDIA']['PAYLOAD']): Actions['GENERATE_MEDIA']['RETURN'] {
        let position = { x: 0, y: 0, z: 0 };
        let target = { x: 0, y: 0, z: 0 };
        if ('id' in payload) {
            position = (this.registered.get(payload.id) as COMPov).position;
            target = (this.registered.get(payload.id) as COMPov).target;
        } else {
            position = payload.position;
            target = payload.target;
        }

        payload.dataUri = this.mediaGenerator.GenerateMedia(position, target, payload.width, payload.height);

        return true;
    }
}

export type { Actions } from './actions/index.ts';
