import { DIVECommunication } from '../Communication';
import '../types';
import '../actions';
import '../actions/camera/movecamera';
import '../actions/camera/resetcamera';
import '../actions/camera/setcameralayer';
import '../actions/camera/setcameratransform';
import '../actions/camera/zoomcamera';
import '../actions/media/generatemedia';
import '../actions/object/addobject';
import '../actions/object/deleteobject';
import '../actions/object/getallobjects';
import '../actions/object/getobjects';
import '../actions/object/selectobject';
import '../actions/object/updateobject';
import '../actions/object/model/modelloaded';
import '../actions/object/model/placeonfloor';
import '../actions/scene/getallscenedata';
import '../actions/scene/setbackground';
import '../actions/scene/updatescene';
import '../actions/toolbox/select/setgizmomode';
import '../actions/toolbox/transform/setgizmovisible';
import '../actions/camera/getcameratransform';
import type { DIVEScene } from '../../scene/Scene';
import type DIVEToolbox from '../../toolbox/Toolbox';
import type DIVEOrbitControls from '../../controls/OrbitControls';
import { type DIVERenderer } from '../../renderer/Renderer';
import { type COMGroup, type COMEntity, type COMEntityType, type COMLight, type COMModel, type COMPov, type COMPrimitive } from '../types';
import { type DIVESceneObject } from '../../types';

jest.mock('three/src/math/MathUtils', () => {
    return {
        generateUUID: jest.fn().mockReturnValue('uuid'),
    }
});

jest.mock('../../mediacreator/MediaCreator', () => {
    return {
        DIVEMediaCreator: jest.fn(function () {
            this.GenerateMedia = jest.fn();

            return this;
        }),
    }
});

jest.mock('../../toolbox/select/SelectTool', () => {
    return {
        isSelectTool: jest.fn().mockReturnValue(true),
        DIVESelectTool: jest.fn().mockImplementation(() => {
            return {
                AttachGizmo: jest.fn(),
                DetachGizmo: jest.fn(),
            };
        }),
    }
});

const mockRenderer = {
    render: jest.fn(),
    OnResize: jest.fn(),
} as unknown as DIVERenderer;

const mockScene = {
    SetBackground: jest.fn(),
    AddSceneObject: jest.fn(),
    UpdateSceneObject: jest.fn(),
    DeleteSceneObject: jest.fn(),
    PlaceOnFloor: jest.fn(),
    GetSceneObject: jest.fn().mockReturnValue({
        attach: jest.fn(),
        DropIt: jest.fn(),
    }),
    background: {
        getHexString: jest.fn().mockReturnValue('ffffff'),
    },
    Root: {
        attach: jest.fn(),
    },
    Floor: {
        isFloor: true,
        visible: true,
        material: {
            color: {
                getHexString: jest.fn().mockReturnValue('ffffff'),
            },
        },
        SetVisibility: jest.fn(),
        SetColor: jest.fn(),
    },
    Grid: {
        SetVisibility: jest.fn(),
    },
    ComputeSceneBB: jest.fn(),
} as unknown as DIVEScene;

const mockController = {
    enableDamping: true,
    dampingFactor: 0.25,
    enableZoom: true,
    enablePan: true,
    minPolarAngle: 0,
    maxPolarAngle: Math.PI,
    minDistance: 0,
    maxDistance: Infinity,
    rotateSpeed: 0.5,
    panSpeed: 0.5,
    zoomSpeed: 0.5,
    keyPanSpeed: 0.5,
    screenSpacePanning: true,
    autoRotate: false,
    autoRotateSpeed: 2.0,
    enableKeys: true,
    keys: {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40,
    },
    mouseButtons: {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2,
    },
    target: {
        x: 4,
        y: 5,
        z: 6,
        set: jest.fn(),
        clone: jest.fn().mockReturnValue({ x: 4, y: 5, z: 6 }),
        copy: jest.fn(),
    },
    update: jest.fn(),
    dispose: jest.fn(),
    ZoomIn: jest.fn(),
    ZoomOut: jest.fn(),
    object: {
        position: {
            x: 1,
            y: 2,
            z: 3,
            clone: jest.fn().mockReturnValue({ x: 1, y: 2, z: 3 }),
            copy: jest.fn(),
        },
        quaternion: {
            x: 1,
            y: 2,
            z: 3,
            w: 4,
            clone: jest.fn().mockReturnValue({ x: 1, y: 2, z: 3, w: 4 }),
            copy: jest.fn(),
        },
        SetCameraLayer: jest.fn(),
        OnResize: jest.fn(),
        layers: {
            mask: 1,
        },
    },
    MoveTo: jest.fn(),
    RevertLast: jest.fn(),
    ComputeEncompassingView: jest.fn().mockReturnValue({
        position: { x: 1, y: 2, z: 3 },
        target: { x: 4, y: 5, z: 6 }
    }),
} as unknown as DIVEOrbitControls;

const mockToolBox = {
    UseTool: jest.fn(),
    GetActiveTool: jest.fn().mockReturnValue({
        AttachGizmo: jest.fn(),
        DetachGizmo: jest.fn(),
    }),
    SetGizmoMode: jest.fn(),
    SetGizmoVisibility: jest.fn(),
} as unknown as DIVEToolbox;

let testCom: DIVECommunication;


describe('dive/communication/DIVECommunication', () => {
    beforeEach(() => {
        testCom = new DIVECommunication(mockRenderer, mockScene, mockController, mockToolBox);
    });

    afterEach(() => {
        testCom.DestroyInstance();
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(testCom).toBeDefined();
        expect(DIVECommunication['__instances']).toHaveLength(1);
    });

    it('should get instance', () => {
        expect(testCom).toBeDefined();
        expect(DIVECommunication.get(testCom.id)).toBeDefined();

        testCom.PerformAction('ADD_OBJECT', {
            id: 'someID',
        } as COMModel);
        expect(DIVECommunication.get('someID')).toBeDefined();
    });

    it('should destroy instance', () => {
        expect(testCom).toBeDefined();
        testCom.DestroyInstance();
        expect(DIVECommunication['__instances']).toBeDefined();
        expect(DIVECommunication['__instances']).toHaveLength(0);
    });

    it('should subscribe, listen and unsubscribe from action', () => {
        const listener = jest.fn();
        const unsub = testCom.Subscribe('GET_ALL_OBJECTS', listener);
        expect(unsub).toBeDefined();
        expect(unsub).toBeInstanceOf(Function);
        const objects0 = testCom.PerformAction('GET_ALL_OBJECTS', new Map());
        expect(objects0).toBeDefined();
        expect(objects0.size).toBeDefined();
        expect(objects0.size).toBe(0);
        unsub();
        testCom.PerformAction('GET_ALL_OBJECTS', new Map());
        expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should not unsubscribe twice', () => {
        const unsub = testCom.Subscribe('GET_ALL_OBJECTS', () => { });
        expect(unsub()).toBe(true);
        expect(unsub()).toBe(false);
    });

    it('should not unsubscribe if listener does not exist anymore', () => {
        const unsub = testCom.Subscribe('GET_ALL_OBJECTS', () => { });
        testCom['listeners'].clear();
        expect(unsub()).toBe(false);
    });

    it('should tigger onChange callback', () => {
        const payload = {
            name: 'name',
            entityType: "light",
            id: "ambient00",
            type: "ambient",
            intensity: 0.5,
            color: 'white',
        } as COMLight;
        expect(() => testCom.PerformAction('ADD_OBJECT', payload)).not.toThrow();
    });

    it('should perform action ADD_OBJECT', () => {
        const payload = {
            entityType: "light",
            id: "ambient00",
            type: "ambient",
            intensity: 0.5,
            color: 'white',
        } as COMLight;
        const success = testCom.PerformAction('ADD_OBJECT', payload);
        expect(mockScene.AddSceneObject).toHaveBeenCalledTimes(1);
        expect(success).toBe(true);
    });

    it('should not perform action ADD_OBJECT with same object', () => {
        const payload = {
            entityType: "light",
            id: "ambient00",
            type: "ambient",
            intensity: 0.5,
            color: 'white',
        } as COMLight;
        expect(testCom.PerformAction('ADD_OBJECT', payload)).toBe(true);
        expect(testCom.PerformAction('ADD_OBJECT', payload)).toBe(false);
        expect(mockScene.AddSceneObject).toHaveBeenCalledTimes(1);
    });

    it('should perform action UPDATE_OBJECT with existing oject', () => {
        const payload = {
            entityType: "light",
            id: "ambient00",
            type: "ambient",
            intensity: 0.5,
            color: 'white',
        } as COMLight;

        testCom.PerformAction('ADD_OBJECT', payload);

        const successUpdate = testCom.PerformAction('UPDATE_OBJECT', payload);
        expect(mockScene.UpdateSceneObject).toHaveBeenCalledTimes(1);
        expect(successUpdate).toBe(true);
    });

    it('should perform action UPDATE_OBJECT without existing oject', () => {
        const payload = {
            entityType: "light",
            id: "ambient00",
            type: "ambient",
            intensity: 0.5,
            color: 'white',
        } as COMLight;
        const successUpdate = testCom.PerformAction('UPDATE_OBJECT', payload);
        expect(mockScene.UpdateSceneObject).toHaveBeenCalledTimes(0);
        expect(successUpdate).toBe(false);
    });

    it('should perform action DELETE_OBJECT with existing object', () => {
        const payload = {
            entityType: "light",
            id: "ambient00",
            type: "ambient",
            intensity: 0.5,
            color: 'white',
        } as COMLight;

        testCom.PerformAction('ADD_OBJECT', payload);

        const successDelete = testCom.PerformAction('DELETE_OBJECT', payload);
        expect(mockScene.DeleteSceneObject).toHaveBeenCalledTimes(1);
        expect(successDelete).toBe(true);
    });

    it('should perform action DELETE_OBJECT without existing object', () => {
        const payload = {
            entityType: "light",
            id: "ambient00",
            type: "ambient",
            intensity: 0.5,
            color: 'white',
        } as COMLight;
        const successDelete = testCom.PerformAction('DELETE_OBJECT', payload);
        expect(mockScene.DeleteSceneObject).toHaveBeenCalledTimes(0);
        expect(successDelete).toBe(false);
    });

    it('should perform action SET_BACKGROUND', () => {
        const payload = {
            color: 'white',
        };
        const successSet = testCom.PerformAction('SET_BACKGROUND', payload);
        expect(mockScene.SetBackground).toHaveBeenCalledTimes(1);
        expect(successSet).toBe(true);
    });

    it('should perform action DROP_IT with existing model', () => {
        const payload = {
            entityType: "model",
            id: "model",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.01, y: 0.01, z: 0.01 },

            uri: "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",
        } as COMModel;

        testCom.PerformAction('ADD_OBJECT', payload);

        const placeSpy = jest.spyOn(mockScene, 'GetSceneObject');

        const successPlace = testCom.PerformAction('DROP_IT', payload);
        expect(successPlace).toBe(true);
        expect(placeSpy).toHaveBeenCalledTimes(1);
    });

    it('should perform action DROP_IT without existing model', () => {
        const payload = {
            entityType: "model",
            id: "model",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.01, y: 0.01, z: 0.01 },

            uri: "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",
        };
        const placeSpy = jest.spyOn(mockScene, 'GetSceneObject');

        const successPlace = testCom.PerformAction('DROP_IT', payload);
        expect(successPlace).toBe(false);
        expect(placeSpy).toHaveBeenCalledTimes(0);
    });

    it('should perform action PLACE_ON_FLOOR with existing model', () => {
        const payload = {
            entityType: "model",
            id: "model",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.01, y: 0.01, z: 0.01 },

            uri: "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",
        } as COMModel;

        testCom.PerformAction('ADD_OBJECT', payload);

        const placeSpy = jest.spyOn(mockScene, 'PlaceOnFloor');

        const successPlace = testCom.PerformAction('PLACE_ON_FLOOR', payload);
        expect(successPlace).toBe(true);
        expect(placeSpy).toHaveBeenCalledTimes(1);
    });

    it('should perform action PLACE_ON_FLOOR without existing model', () => {
        const payload = {
            entityType: "model" as COMEntityType,
            id: "model",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.01, y: 0.01, z: 0.01 },

            uri: "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",
        };
        const placeSpy = jest.spyOn(mockScene, 'PlaceOnFloor');

        const successPlace = testCom.PerformAction('PLACE_ON_FLOOR', payload);
        expect(successPlace).toBe(false);
        expect(placeSpy).toHaveBeenCalledTimes(0);
    });

    it('should perform action GET_ALL_OBJECTS', () => {
        const payload = {
            entityType: "model",
            id: "model",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.01, y: 0.01, z: 0.01 },

            uri: "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",
        } as COMModel;

        const objects0 = testCom.PerformAction('GET_ALL_OBJECTS', new Map());
        expect(objects0).toBeDefined();
        expect(objects0.size).toBeDefined();
        expect(objects0.size).toBe(0);

        testCom.PerformAction('ADD_OBJECT', payload);

        const objects1 = testCom.PerformAction('GET_ALL_OBJECTS', new Map());
        expect(objects1).toBeDefined();
        expect(objects1.size).toBeDefined();
        expect(objects1.size).toBe(1);
    });

    it('should perform action MOVE_CAMERA', () => {
        const payload = {
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
            duration: 1000,
            locked: true,
        };
        const successSet = testCom.PerformAction('MOVE_CAMERA', payload);
        const moveToSpy = jest.spyOn(mockController, 'MoveTo');
        expect(moveToSpy).toHaveBeenCalledTimes(1);
        expect(successSet).toBe(true);

        moveToSpy.mockClear();
        testCom.PerformAction('ADD_OBJECT', {
            entityType: "pov",
            id: "pov",
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
        } as COMPov);

        const payloadId = {
            id: 'pov',
            locked: true,
            duration: 1000,
        };
        const successSet1 = testCom.PerformAction('MOVE_CAMERA', payloadId);
        expect(moveToSpy).toHaveBeenCalledTimes(1);
        expect(successSet1).toBe(true);
    });

    it('should perform action RESET_CAMERA', () => {
        const payload = {
            duration: 1000,
        };
        const successSet = testCom.PerformAction('RESET_CAMERA', payload);
        expect(mockController.RevertLast).toHaveBeenCalledTimes(1);
        expect(successSet).toBe(true);
    });

    it('should perform action COMPUTE_ENCOMPASSING_VIEW', () => {
        const payload = {};
        const transform = testCom.PerformAction('COMPUTE_ENCOMPASSING_VIEW', payload);
        expect(transform).toStrictEqual({
            position: { x: 1, y: 2, z: 3 },
            target: { x: 4, y: 5, z: 6 }
        });
        expect(payload).toStrictEqual({
            position: { x: 1, y: 2, z: 3 },
            target: { x: 4, y: 5, z: 6 }
        });
    });

    it('should perform action GET_ALL_SCENE_DATA', () => {
        testCom.PerformAction('ADD_OBJECT', {
            entityType: "pov",
            id: "pov",
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
        } as COMPov);

        testCom.PerformAction('ADD_OBJECT', {
            entityType: "model",
            id: "model",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.01, y: 0.01, z: 0.01 },

            uri: "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",
        } as COMModel);

        testCom.PerformAction('ADD_OBJECT', {
            entityType: "light",
            id: "ambient00",
            type: "ambient",
            intensity: 0.5,
            color: 'white',
        } as COMLight);

        testCom.PerformAction('ADD_OBJECT', {
            entityType: "group",
            id: "group1",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            parent: null,
        } as COMGroup);

        const success = testCom.PerformAction('GET_ALL_SCENE_DATA', {});
        expect(success).toStrictEqual({
            backgroundColor: "#ffffff",
            cameras: [{
                entityType: "pov",
                id: "pov",
                position: { x: 0, y: 0, z: 0 },
                target: { x: 0, y: 0, z: 0 },
                parent: null,
            }],
            floorColor: "#ffffff",
            floorEnabled: true,
            lights: [{
                entityType: "light",
                id: "ambient00",
                type: "ambient",
                intensity: 0.5,
                color: 'white',
                parent: null,
            }],
            mediaItem: null,
            name: undefined,
            objects: [{
                entityType: "model",
                id: "model",
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 0.01, y: 0.01, z: 0.01 },
                parent: null,
                uri: "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",
            }],
            primitives: [],
            spotmarks: [],
            userCamera: {
                position: { x: 1, y: 2, z: 3 },
                target: { x: 4, y: 5, z: 6 },
            },
            groups: [{
                entityType: "group",
                id: "group1",
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                parent: null,
            }],
        });
    });

    it('should perform action GET_OBJECTS', () => {
        const mock0 = {
            entityType: "pov",
            id: "test0",
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
        } as COMPov;
        testCom.PerformAction('ADD_OBJECT', mock0);

        const mock1 = {
            entityType: "pov",
            id: "test1",
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
        } as COMPov;
        testCom.PerformAction('ADD_OBJECT', mock1);

        const successWithoutIds = testCom.PerformAction('GET_OBJECTS', { ids: [] });
        expect(Array.from(successWithoutIds.values())).toStrictEqual([]);

        const successWithIds = testCom.PerformAction('GET_OBJECTS', { ids: ['test1'] });
        expect(Array.from(successWithIds.values())).toStrictEqual([{ entityType: "pov", id: "test1", position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: 0 }, parent: null }]);
    });

    it('should perform action SELECT_OBJECT', () => {
        const success0 = testCom.PerformAction('SELECT_OBJECT', { id: 'test0' });
        expect(success0).toBe(false);

        const mock0 = {
            entityType: "pov",
            id: "test0",
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
        } as COMPov;
        testCom.PerformAction('ADD_OBJECT', mock0);

        jest.spyOn(mockScene, 'GetSceneObject').mockReturnValueOnce(undefined);
        const success1 = testCom.PerformAction('SELECT_OBJECT', { id: 'test0' });
        expect(success1).toBe(false);

        jest.spyOn(mockScene, 'GetSceneObject').mockReturnValueOnce({} as unknown as DIVESceneObject);
        const success2 = testCom.PerformAction('SELECT_OBJECT', { id: 'test0' });
        expect(success2).toBe(false);

        jest.spyOn(mockScene, 'GetSceneObject').mockReturnValueOnce({ isSelectable: true } as unknown as DIVESceneObject);
        const success3 = testCom.PerformAction('SELECT_OBJECT', { id: 'test0' });
        expect(success3).toBe(true);
    });

    it('should perform action DESELECT_OBJECT', () => {
        const success0 = testCom.PerformAction('DESELECT_OBJECT', { id: 'test0' });
        expect(success0).toBe(false);

        const mock0 = {
            entityType: "pov",
            id: "test0",
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
        } as COMPov;
        testCom.PerformAction('ADD_OBJECT', mock0);

        jest.spyOn(mockScene, 'GetSceneObject').mockReturnValueOnce(undefined);
        const success1 = testCom.PerformAction('DESELECT_OBJECT', { id: 'test0' });
        expect(success1).toBe(false);

        jest.spyOn(mockScene, 'GetSceneObject').mockReturnValueOnce({} as unknown as DIVESceneObject);
        const success2 = testCom.PerformAction('DESELECT_OBJECT', { id: 'test0' });
        expect(success2).toBe(false);

        jest.spyOn(mockScene, 'GetSceneObject').mockReturnValueOnce({ isSelectable: true } as unknown as DIVESceneObject);
        const success3 = testCom.PerformAction('DESELECT_OBJECT', { id: 'test0' });
        expect(success3).toBe(true);
    });

    it('should perform action SET_CAMERA_TRANSFORM', () => {
        const success = testCom.PerformAction('SET_CAMERA_TRANSFORM', {
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
        });
        expect(success).toBe(true);
    });

    it('should perform action GET_CAMERA_TRANSFORM', () => {
        const success = testCom.PerformAction('GET_CAMERA_TRANSFORM', {});
        expect(success).toStrictEqual({
            position: { x: 1, y: 2, z: 3 },
            target: { x: 4, y: 5, z: 6 },
        });
    });

    it('should perform action SET_CAMERA_LAYER', () => {
        const success = testCom.PerformAction('SET_CAMERA_LAYER', {
            layer: 'EDITOR',
        });
        expect(success).toBe(true);
    });

    it('should perform action ZOOM_CAMERA', () => {
        const success0 = testCom.PerformAction('ZOOM_CAMERA', {
            direction: 'IN',
            by: 10,
        });
        expect(success0).toBe(true);
        const success1 = testCom.PerformAction('ZOOM_CAMERA', {
            direction: 'OUT',
            by: 10,
        });
        expect(success1).toBe(true);
    });

    it('should perform action SET_GIZMO_MODE', () => {
        const success = testCom.PerformAction('SET_GIZMO_MODE', {
            mode: 'translate',
        });
        expect(success).toBe(true);
    });

    it('should perform action SET_GIZMO_VISIBILITY', () => {
        let visibility = testCom.PerformAction('SET_GIZMO_VISIBILITY', true);
        expect(visibility).toBe(true);

        visibility = testCom.PerformAction('SET_GIZMO_VISIBILITY', false);
        expect(visibility).toBe(false);
    });

    it('should perform action USE_TOOL', () => {
        let success = testCom.PerformAction('USE_TOOL', { tool: 'select' });
        expect(success).toBe(true);

        success = testCom.PerformAction('USE_TOOL', { tool: 'none' });
        expect(success).toBe(true);
    });

    it('should perform action MODEL_LOADED', () => {
        const payload = {
            entityType: "model",
            id: "modelID",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.01, y: 0.01, z: 0.01 },

            uri: "https://threejs.org/examples/models/gltf/LittlestTokyo.glb",
        } as COMModel;
        testCom.PerformAction('ADD_OBJECT', payload);
        const success = testCom.PerformAction('MODEL_LOADED', {
            id: 'modelID',
        });
        expect(success).toBe(true);
    });

    it('should perform action UPDATE_SCENE', () => {
        const success0 = testCom.PerformAction('UPDATE_SCENE', {
            name: 'scene name',
            backgroundColor: 'ffffff',
            floorEnabled: true,
            floorColor: 'ffffff',
            gridEnabled: true,
        });
        expect(success0).toBe(true);

        const success1 = testCom.PerformAction('UPDATE_SCENE', {
            name: undefined,
            backgroundColor: undefined,
            floorEnabled: undefined,
            floorColor: undefined,
            gridEnabled: undefined,
        });
        expect(success1).toBe(true);
    });

    it('should perform action GENERATE_MEDIA', () => {
        const mock1 = {
            entityType: "pov",
            id: "test1",
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
        } as COMPov;
        testCom.PerformAction('ADD_OBJECT', mock1);

        const success0 = testCom.PerformAction('GENERATE_MEDIA', {
            id: 'test1',
            width: 800,
            height: 600,
            dataUri: '',
        });
        expect(success0).toBe(true);

        const success1 = testCom.PerformAction('GENERATE_MEDIA', {
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
            width: 800,
            height: 600,
            dataUri: '',
        });
        expect(success1).toBe(true);
    });

    it('should perform action SET_PARENT', () => {
        const object = {
            id: "object",
        } as COMEntity;
        testCom.PerformAction('ADD_OBJECT', object);

        const objectNotRegistered = {
            id: "objectNotRegistered",
        } as COMEntity;

        const parent0 = {
            id: "parent0",
        } as COMEntity;
        testCom.PerformAction('ADD_OBJECT', parent0);

        const parent1 = {
            id: "parent1",
        } as COMEntity;
        testCom.PerformAction('ADD_OBJECT', parent1);

        const parentNotRegistered = {
            id: "parentNotRegistered",
        } as COMEntity;

        const attachNotRegisteredObject = testCom.PerformAction('SET_PARENT', {
            object: objectNotRegistered,
            parent: null,
        });
        expect(attachNotRegisteredObject).toBe(false);

        jest.spyOn(mockScene, 'GetSceneObject').mockImplementationOnce(() => {
            return undefined;
        })
        const attachNonSceneObject = testCom.PerformAction('SET_PARENT', {
            object: object,
            parent: null,
        });
        expect(attachNonSceneObject).toBe(false);

        const attachToNull = testCom.PerformAction('SET_PARENT', {
            object: object,
            parent: null,
        });
        expect(attachToNull).toBe(true);

        const attachToItself = testCom.PerformAction('SET_PARENT', {
            object: object,
            parent: object,
        });
        expect(attachToItself).toBe(false);

        const attachToNotRegsiteredParent = testCom.PerformAction('SET_PARENT', {
            object: object,
            parent: parentNotRegistered,
        });
        expect(attachToNotRegsiteredParent).toBe(true);

        jest.spyOn(mockScene, 'GetSceneObject').mockImplementationOnce(() => {
            return {
                DropIt: jest.fn(),
                attach: jest.fn(),
            } as unknown as DIVESceneObject;
        }).mockImplementationOnce(() => {
            return undefined;
        });

        const attachtoNonSceneParent = testCom.PerformAction('SET_PARENT', {
            object: object,
            parent: parent1,
        });
        expect(attachtoNonSceneParent).toBe(true);

        const attachToValidParent = testCom.PerformAction('SET_PARENT', {
            object: object,
            parent: parent1,
        });
        expect(attachToValidParent).toBe(true);
    });
});
