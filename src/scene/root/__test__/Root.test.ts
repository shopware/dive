import { DIVERoot } from '../Root';
import {
    type COMPrimitive,
    type COMLight,
    type COMModel,
    type COMPov,
    type COMEntity,
    type COMGeometry,
    type COMGroup,
    type COMEntityType,
} from '../../../com/types';
import { type DIVEScene } from '../../Scene';
import { DIVECommunication } from '../../../com/Communication';
import { type DIVESceneObject } from '../../../types';
import { Object3D } from 'three';

jest.mock('../../../modules', () => ({
    ModuleRegistry: {
        get: jest.fn().mockResolvedValue(
            class {
                constructor() {
                    return {
                        load: jest.fn().mockResolvedValue({}),
                    };
                }
            },
        ),
    },
}));

jest.mock('../../../com/Communication.ts', () => {
    return {
        DIVECommunication: {
            get: jest.fn(() => {
                return {
                    PerformAction: jest.fn(),
                };
            }),
        },
    };
});

jest.mock('../../../primitive/floor/Floor', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.removeFromParent = jest.fn();
        this.updateMatrixWorld = jest.fn();
        return this;
    });
});

jest.mock('../../../grid/Grid', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.removeFromParent = jest.fn();
        this.updateMatrixWorld = jest.fn();
        return this;
    });
});

jest.mock('../../../light/AmbientLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        };
        this.parent = {
            attach: jest.fn(),
        };
        this.attach = jest.fn();
        this.applyMatrix4 = jest.fn();
        this.updateWorldMatrix = jest.fn();
        this.children = [];
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        };
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../light/PointLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        };
        this.parent = {
            attach: jest.fn(),
        };
        this.attach = jest.fn();
        this.applyMatrix4 = jest.fn();
        this.updateWorldMatrix = jest.fn();
        this.children = [];
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        };
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../light/SceneLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        };
        this.parent = {
            attach: jest.fn(),
        };
        this.attach = jest.fn();
        this.applyMatrix4 = jest.fn();
        this.updateWorldMatrix = jest.fn();
        this.children = [];
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        };
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../model/Model.ts', () => {
    return {
        DIVEModel: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.parent = {
                attach: jest.fn(),
            };
            this.attach = jest.fn();
            this.applyMatrix4 = jest.fn();
            this.updateWorldMatrix = jest.fn();
            this.children = [];
            this.SetModel = jest.fn();
            this.SetPosition = jest.fn();
            this.SetRotation = jest.fn();
            this.SetScale = jest.fn();
            this.SetVisibility = jest.fn();
            this.SetMaterial = jest.fn();
            this.PlaceOnFloor = jest.fn();
            this.removeFromParent = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../../primitive/Primitive.ts', () => {
    return {
        DIVEPrimitive: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.parent = {
                attach: jest.fn(),
            };
            this.attach = jest.fn();
            this.applyMatrix4 = jest.fn();
            this.updateWorldMatrix = jest.fn();
            this.children = [];
            this.SetGeometry = jest.fn();
            this.SetMaterial = jest.fn();
            this.SetPosition = jest.fn();
            this.SetRotation = jest.fn();
            this.SetScale = jest.fn();
            this.SetVisibility = jest.fn();
            this.PlaceOnFloor = jest.fn();
            this.removeFromParent = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../../group/Group.ts', () => {
    return {
        DIVEGroup: jest.fn(function () {
            this.isDIVEGroup = true;
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.parent = {
                attach: jest.fn(),
            };
            this.attach = jest.fn();
            this.applyMatrix4 = jest.fn();
            this.updateWorldMatrix = jest.fn();
            this.children = [];
            this.SetGeometry = jest.fn();
            this.SetMaterial = jest.fn();
            this.SetPosition = jest.fn();
            this.SetRotation = jest.fn();
            this.SetScale = jest.fn();
            this.SetVisibility = jest.fn();
            this.SetLinesVisibility = jest.fn();
            this.PlaceOnFloor = jest.fn();
            this.removeFromParent = jest.fn();
            return this;
        }),
    };
});

let root: DIVERoot;

let spyConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

Object3D.prototype.attach = jest.fn();

describe('DIVE/scene/root/DIVERoot', () => {
    beforeEach(() => {
        root = new DIVERoot();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        spyConsoleWarn.mockRestore();
    });

    it('should instantiate', () => {
        expect(root).toBeDefined();
    });

    it('should ComputeSceneBB', () => {
        const bb = root.ComputeSceneBB();
        expect(bb).toBeDefined();
    });

    it('should get scene object', async () => {
        root.children = [
            {
                userData: {
                    id: 'different_id',
                },
            },
        ] as unknown as DIVESceneObject[];
        expect(root.GetSceneObject({ id: 'test_id' })).toBeUndefined();

        expect(() =>
            root.AddSceneObject({
                id: 'test_id',
                name: 'test',
                entityType: 'primitive',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 1, y: 2, z: 3 },
                scale: { x: 1, y: 2, z: 3 },
                geometry: {} as COMGeometry,
                visible: true,
                parentId: null,
            }),
        ).not.toThrow();
        root.children = [
            {
                userData: {
                    id: 'test_id',
                },
            },
        ] as unknown as DIVESceneObject[];
        expect(root.GetSceneObject({ id: 'test_id' })).toBeDefined();
    });

    it('should add object', () => {
        expect(() =>
            root.AddSceneObject({
                id: 'id',
                name: 'pov',
                entityType: 'pov',
                visible: true,
            } as COMPov),
        ).not.toThrow();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.AddSceneObject({
                id: 'id',
                name: 'light',
                entityType: 'light',
                visible: true,
            } as COMLight),
        ).not.toThrow();
        expect(spyConsoleWarn).toHaveBeenCalled();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.AddSceneObject({
                id: 'id_scene',
                name: 'light',
                entityType: 'light',
                visible: true,
                type: 'scene',
            } as COMLight),
        ).not.toThrow();
        expect(spyConsoleWarn).not.toHaveBeenCalled();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.AddSceneObject({
                id: 'id_ambient',
                name: 'light',
                entityType: 'light',
                visible: true,
                type: 'ambient',
            } as COMLight),
        ).not.toThrow();
        expect(spyConsoleWarn).not.toHaveBeenCalled();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.AddSceneObject({
                id: 'id_point',
                name: 'light',
                entityType: 'light',
                visible: true,
                type: 'point',
                position: { x: 0, y: 0, z: 0 },
                intensity: 1,
                enabled: false,
                color: 0xffffff,
                parentId: 'id',
            } as COMLight),
        ).not.toThrow();
        expect(spyConsoleWarn).not.toHaveBeenCalled();

        expect(() =>
            root.AddSceneObject({
                id: 'id',
                name: 'model',
                entityType: 'model',
                visible: true,
            } as COMModel),
        ).not.toThrow();
        expect(() =>
            root.AddSceneObject({
                id: 'id_uri0',
                name: 'model',
                entityType: 'model',
                visible: true,
                uri: 'uri',
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                material: {},
                parentId: 'id',
            } as COMModel),
        ).not.toThrow();
        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() =>
            root.AddSceneObject({
                id: 'id_uri1',
                name: 'model',
                entityType: 'model',
                visible: true,
                uri: 'uri',
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                material: {},
            } as COMModel),
        ).not.toThrow();

        expect(() =>
            root.AddSceneObject({
                id: 'id0',
                name: 'primitive',
                entityType: 'primitive',
                visible: true,
            } as COMPrimitive),
        ).not.toThrow();
        expect(() =>
            root.AddSceneObject({
                id: 'id1',
                name: 'primitive',
                entityType: 'primitive',
                visible: true,
                material: {},
                parentId: 'id',
            } as COMPrimitive),
        ).not.toThrow();

        expect(() =>
            root.AddSceneObject({
                id: 'id0',
                name: 'Group',
                entityType: 'group',
                visible: true,
            } as COMGroup),
        ).not.toThrow();
        expect(() =>
            root.AddSceneObject({
                id: 'id10',
                name: 'Group',
                entityType: 'group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                bbVisible: true,
                parentId: 'id',
            } as COMGroup),
        ).not.toThrow();
    });

    it('should update object', () => {
        root.children = [
            {
                userData: {
                    id: 'id',
                },
                SetVisibility: jest.fn(),
                parent: root,
                children: [],
            } as unknown as Object3D,
            {
                userData: {
                    id: 'id_groupparent',
                },
                attach: jest.fn(),
                parent: root,
                children: [],
            } as unknown as Object3D,
            {
                userData: {
                    id: 'id_modelparent',
                },
                attach: jest.fn(),
                parent: root,
                children: [],
            } as unknown as Object3D,
            {
                userData: {
                    id: 'id_groupchild',
                },
                SetVisibility: jest.fn(),
                parent: {
                    isDIVEGroup: true,
                    remove: jest.fn(),
                },
                children: [],
            } as unknown as Object3D,
        ];
        expect(() =>
            root.UpdateSceneObject({
                id: 'id',
                name: 'pov',
                entityType: 'pov',
                visible: true,
            } as COMPov),
        ).not.toThrow();
        expect(() =>
            root.UpdateSceneObject({
                id: 'id',
                name: 'light',
                entityType: 'light',
                visible: true,
            } as COMLight),
        ).not.toThrow();
        expect(() =>
            root.UpdateSceneObject({
                id: 'id',
                name: 'model',
                entityType: 'model',
                visible: true,
            } as COMModel),
        ).not.toThrow();
        expect(() =>
            root.UpdateSceneObject({
                id: 'id',
                name: 'primitive',
                entityType: 'primitive',
                visible: true,
            } as COMPrimitive),
        ).not.toThrow();
        expect(() =>
            root.UpdateSceneObject({
                id: 'id',
                name: 'group',
                entityType: 'group',
                visible: true,
            } as COMGroup),
        ).not.toThrow();

        expect(() =>
            root.AddSceneObject({
                id: 'id_groupparent',
                name: 'Group',
                entityType: 'group',
            } as COMGroup),
        ).not.toThrow();
        expect(() =>
            root.UpdateSceneObject({
                id: 'id_groupchild',
                name: 'group',
                entityType: 'group',
                parentId: 'id_groupparent',
            } as COMGroup),
        ).not.toThrow();

        expect(() =>
            root.UpdateSceneObject({
                id: 'id_groupchild',
                name: 'group',
                entityType: 'group',
                parentId: null,
            } as COMGroup),
        ).not.toThrow();
        expect(() =>
            root.UpdateSceneObject({
                id: 'id_groupchild',
                name: 'group',
                entityType: 'group',
                parentId: 'id_modelparent',
            } as COMGroup),
        ).not.toThrow();
        expect(() =>
            root.UpdateSceneObject({
                id: 'id_groupchild',
                name: 'group',
                entityType: 'group',
                parentId: 'does_not_exist',
            } as COMGroup),
        ).not.toThrow();

        jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
        expect(() =>
            root.UpdateSceneObject({
                entityType: 'INVALID' as COMEntityType,
            } as COMPrimitive),
        ).not.toThrow();
        expect(console.warn).toHaveBeenCalled();

        jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
        expect(() =>
            root.UpdateSceneObject({
                entityType: undefined,
            } as unknown as COMPrimitive),
        ).not.toThrow();
        expect(console.warn).toHaveBeenCalled();
    });

    it('should delete object', () => {
        const sceneParent = {
            parent: null,
            remove: jest.fn(),
            children: [
                {
                    isTransformControls: true,
                    detach: jest.fn(),
                },
            ],
        };
        root.parent = sceneParent as unknown as DIVEScene;

        root.children = [
            {
                userData: {
                    id: 'id',
                },
                SetVisibility: jest.fn(),
                parent: root,
                children: [],
            } as unknown as Object3D,
        ];

        spyConsoleWarn.mockClear();
        expect(() =>
            root.DeleteSceneObject({
                id: 'does_not_exist',
                name: 'pov',
                entityType: 'pov',
                visible: true,
            } as COMPov),
        ).not.toThrow();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.DeleteSceneObject({
                id: 'id',
                name: 'pov',
                entityType: 'pov',
                visible: true,
            } as COMPov),
        ).not.toThrow();
        expect(spyConsoleWarn).not.toHaveBeenCalled();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.DeleteSceneObject({
                id: 'does_not_exist',
                name: 'light',
                entityType: 'light',
                visible: true,
                type: 'scene',
            } as COMLight),
        ).not.toThrow();
        expect(spyConsoleWarn).toHaveBeenCalled();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.DeleteSceneObject({
                id: 'id',
                name: 'light',
                entityType: 'light',
                visible: true,
                type: 'scene',
            } as COMLight),
        ).not.toThrow();
        expect(spyConsoleWarn).not.toHaveBeenCalled();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.DeleteSceneObject({
                id: 'does_not_exist',
                name: 'model',
                entityType: 'model',
                visible: true,
            } as COMModel),
        ).not.toThrow();
        expect(spyConsoleWarn).toHaveBeenCalled();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.DeleteSceneObject({
                id: 'id',
                name: 'model',
                entityType: 'model',
                visible: true,
            } as COMModel),
        ).not.toThrow();

        expect(() =>
            root.DeleteSceneObject({
                id: 'does_not_exist',
                name: 'primitive',
                entityType: 'primitive',
                visible: true,
            } as COMPrimitive),
        ).not.toThrow();
        expect(spyConsoleWarn).toHaveBeenCalled();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.DeleteSceneObject({
                id: 'id',
                name: 'primitive',
                entityType: 'primitive',
                visible: true,
            } as COMPrimitive),
        ).not.toThrow();
        expect(spyConsoleWarn).toHaveBeenCalled();

        spyConsoleWarn.mockClear();
        expect(() =>
            root.DeleteSceneObject({
                id: 'does_not_exist',
                name: 'group',
                entityType: 'group',
                visible: true,
            } as COMGroup),
        ).not.toThrow();
        expect(spyConsoleWarn).toHaveBeenCalled();

        spyConsoleWarn.mockClear();
        root['detachTransformControls'] = jest.fn();
        jest.spyOn(root, 'GetSceneObject').mockReturnValueOnce({
            members: [new Object3D()],
            parent: {
                remove: jest.fn(),
            },
        } as unknown as DIVESceneObject);

        expect(() =>
            root.DeleteSceneObject({
                id: 'id',
                name: 'group',
                entityType: 'group',
                visible: true,
            } as COMGroup),
        ).not.toThrow();
        expect(spyConsoleWarn).not.toHaveBeenCalled();

        const firstFind = root.GetSceneObject({ id: 'id' });
        jest.spyOn(root, 'GetSceneObject').mockReturnValueOnce({
            ...firstFind,
            members: [new Object3D()],
            parent: sceneParent,
            children: [
                {
                    isObject3D: true,
                },
            ],
        } as unknown as DIVESceneObject);

        expect(() =>
            root.DeleteSceneObject({
                id: 'id',
                name: 'group',
                entityType: 'group',
                visible: true,
            } as COMGroup),
        ).not.toThrow();

        jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
        expect(() =>
            root.DeleteSceneObject({
                entityType: 'INVALID' as COMEntityType,
            } as COMPrimitive),
        ).not.toThrow();
        expect(console.warn).toHaveBeenCalled();

        jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
        expect(() =>
            root.DeleteSceneObject({
                entityType: undefined,
            } as unknown as COMPrimitive),
        ).not.toThrow();
        expect(console.warn).toHaveBeenCalled();
    });

    it('should place object on floor', () => {
        root.children = [
            {
                userData: {
                    id: 'id',
                },
                SetVisibility: jest.fn(),
                PlaceOnFloor: jest.fn(),
                parent: root,
                children: [],
            } as unknown as Object3D,
        ];

        expect(() =>
            root.PlaceOnFloor({
                id: 'does_not_exist',
                name: 'pov',
                entityType: 'pov',
                visible: true,
            } as COMPov),
        ).not.toThrow();
        expect(() =>
            root.PlaceOnFloor({
                id: 'id',
                name: 'pov',
                entityType: 'pov',
                visible: true,
            } as COMPov),
        ).not.toThrow();

        expect(() =>
            root.PlaceOnFloor({
                id: 'does_not_exist',
                name: 'light',
                entityType: 'light',
                visible: true,
            } as COMLight),
        ).not.toThrow();
        expect(() =>
            root.PlaceOnFloor({
                id: 'id',
                name: 'light',
                entityType: 'light',
                visible: true,
            } as COMLight),
        ).not.toThrow();

        expect(() =>
            root.PlaceOnFloor({
                id: 'does_not_exist',
                name: 'model',
                entityType: 'model',
                visible: true,
            } as COMModel),
        ).not.toThrow();
        expect(() =>
            root.PlaceOnFloor({
                id: 'id',
                name: 'model',
                entityType: 'model',
                visible: true,
            } as COMModel),
        ).not.toThrow();

        expect(() =>
            root.PlaceOnFloor({
                id: 'does_not_exist',
                name: 'primitive',
                entityType: 'primitive',
                visible: true,
            } as COMPrimitive),
        ).not.toThrow();
        expect(() =>
            root.PlaceOnFloor({
                id: 'id',
                name: 'primitive',
                entityType: 'primitive',
                visible: true,
            } as COMPrimitive),
        ).not.toThrow();

        jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
        expect(() =>
            root.PlaceOnFloor({
                entityType: 'INVALID' as COMEntityType,
            } as COMPrimitive),
        ).not.toThrow();
        expect(console.warn).toHaveBeenCalled();

        jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
        expect(() =>
            root.PlaceOnFloor({
                entityType: undefined,
            } as unknown as COMPrimitive),
        ).not.toThrow();
        expect(console.warn).toHaveBeenCalled();
    });

    it('should warn if entity type is invalid while adding object', () => {
        const spy = jest
            .spyOn(console, 'warn')
            .mockImplementationOnce(() => {});
        expect(() =>
            root.AddSceneObject({
                id: 'id',
                name: 'entity',
                entityType: 'INVALID' as COMEntityType,
                visible: true,
            } as COMEntity),
        ).not.toThrow();
        expect(spy).toHaveBeenCalled();
    });

    it('should warn if entity type is invalid while updating object', () => {
        const spy = jest
            .spyOn(console, 'warn')
            .mockImplementationOnce(() => {});
        expect(() =>
            root.UpdateSceneObject({
                id: 'id',
                name: 'entity',
                entityType: 'INVALID' as COMEntityType,
                visible: true,
            } as COMEntity),
        ).not.toThrow();
        expect(spy).toHaveBeenCalled();
    });

    it('should warn if entity type is invalid while deleting object', () => {
        const spy = jest
            .spyOn(console, 'warn')
            .mockImplementationOnce(() => {});
        expect(() =>
            root.DeleteSceneObject({
                id: 'id',
                name: 'entity',
                entityType: 'INVALID' as COMEntityType,
                visible: true,
            } as COMEntity),
        ).not.toThrow();
        expect(spy).toHaveBeenCalled();
    });

    it('should warn if entity type is invalid while placing on floor', () => {
        const spy = jest
            .spyOn(console, 'warn')
            .mockImplementationOnce(() => {});
        expect(() =>
            root.PlaceOnFloor({
                id: 'id',
                name: 'entity',
                entityType: 'INVALID' as COMEntityType,
                visible: true,
            } as COMEntity),
        ).not.toThrow();
        expect(spy).toHaveBeenCalled();
    });
});
