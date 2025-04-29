import { DIVERoot } from '../Root';
import {
    type COMPrimitive,
    type COMLight,
    type COMModel,
    type COMPov,
    type COMEntity,
    type COMGroup,
    type COMEntityType,
} from '../../../modules/state/types';
import { State } from '../../../modules/state/State';
import { Object3D, Vector3, Box3 } from 'three';
import { DIVEGroup } from '../../group/Group';
import { type DIVEModel } from '../../model/Model';
import { type DIVEPrimitive } from '../../primitive/Primitive';
import { AssetLoader } from '../../../modules/asset/loader/AssetLoader';
import { ModuleImporter } from '../../../modules';

jest.mock('../../../modules/index.ts', () => {
    return {
        ModuleImporter: jest.fn(function () {
            this.instantiate = jest.fn().mockResolvedValue({
                load: jest.fn().mockResolvedValue({}),
            });
            return this;
        }),
    };
});

jest.mock('../../../modules/state/State.ts', () => {
    return {
        State: {
            get: jest.fn(() => {
                return {
                    performAction: jest.fn(),
                };
            }),
        },
    };
});

jest.mock('../../floor/Floor', () => {
    return {
        DIVEFloor: jest.fn(function () {
            this.isDIVEFloor = true;
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.removeFromParent = jest.fn();
            this.userData = {
                id: undefined,
            };
            return this;
        }),
    };
});

jest.mock('../../grid/Grid', () => {
    return {
        DIVEGrid: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.removeFromParent = jest.fn();
            this.updateMatrixWorld = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../light/AmbientLight.ts', () => {
    return {
        DIVEAmbientLight: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.position = new Vector3();
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
        }),
    };
});

jest.mock('../../light/PointLight.ts', () => {
    return {
        DIVEPointLight: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.position = new Vector3();
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
        }),
    };
});

jest.mock('../../light/SceneLight.ts', () => {
    return {
        DIVESceneLight: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.position = new Vector3();
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
        }),
    };
});

jest.mock('../../model/Model.ts', () => {
    return {
        DIVEModel: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
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
            this.position = new Vector3();
            return this;
        }),
    };
});

jest.mock('../../primitive/Primitive.ts', () => {
    return {
        DIVEPrimitive: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
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
            this.position = new Vector3();
            return this;
        }),
    };
});

jest.mock('../../group/Group.ts', () => {
    return {
        DIVEGroup: jest.fn(function () {
            this.isDIVEGroup = true;
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
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
            this.position = new Vector3();
            this.members = [];
            return this;
        }),
    };
});

let root: DIVERoot;
let spyConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('components/root/DIVERoot', () => {
    beforeEach(() => {
        root = new DIVERoot();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        spyConsoleWarn.mockRestore();
    });

    describe('constructor', () => {
        it('should initialize with correct properties', () => {
            expect(root.isDIVERoot).toBe(true);
            expect(root.name).toBe('Root');
            expect(root.floor).toBeDefined();
        });

        it('should initialize asset loader', async () => {
            const mockLoader = {
                load: jest.fn().mockResolvedValue({}),
            };

            jest.spyOn(root['_assetLoader'], 'instantiate').mockResolvedValue(
                mockLoader as unknown as AssetLoader,
            );

            const newRoot = new DIVERoot();
            await newRoot['_assetLoader'];
        });

        it('should handle asset loader initialization error', async () => {
            // Mock ModuleImporter to reject for this specific test
            const mockError = new Error('Failed to load');
            jest.spyOn(root['_assetLoader'], 'instantiate').mockRejectedValue(
                mockError,
            );

            await expect(root['_assetLoader'].instantiate()).rejects.toThrow(
                'Failed to load',
            );
        });
    });

    describe('ComputeSceneBB', () => {
        it('should compute bounding box for scene objects', () => {
            const mockObject = new Object3D();
            mockObject.position.set(1, 2, 3);

            Object3D.prototype.traverse = jest.fn((callback) =>
                callback(mockObject as Object3D),
            );

            const bb = root.ComputeSceneBB();
            expect(bb).toBeDefined();
            expect(bb).toBeInstanceOf(Box3);
        });

        it('should handle empty scene', () => {
            Object3D.prototype.traverse = jest.fn((callback) => {});
            const bb = root.ComputeSceneBB();
            expect(bb).toBeDefined();
            expect(bb).toBeInstanceOf(Box3);
        });

        it('should handle multiple objects', () => {
            const mockObject1 = new Object3D();
            mockObject1.position.set(1, 2, 3);
            mockObject1.traverse = jest.fn((callback) => callback(mockObject1));

            const mockObject2 = new Object3D();
            mockObject2.position.set(4, 5, 6);
            mockObject2.traverse = jest.fn((callback) => callback(mockObject2));

            root.children = [
                mockObject1,
                mockObject2,
            ];

            const bb = root.ComputeSceneBB();
            expect(bb).toBeDefined();
            expect(bb).toBeInstanceOf(Box3);
            expect(mockObject1.traverse).toHaveBeenCalled();
            expect(mockObject2.traverse).toHaveBeenCalled();
        });
    });

    describe('GetSceneObject', () => {
        it('should find object by id', () => {
            const mockObject = new Object3D();
            mockObject.userData = { id: 'test-id' };
            root.add(mockObject);

            const found = root.GetSceneObject({ id: 'test-id' });
            expect(found).toBeDefined();
        });

        it('should return undefined for non-existent id', () => {
            const found = root.GetSceneObject({ id: 'non-existent' });
            expect(found).toBeUndefined();
        });

        it('should get scene object by id', () => {
            const root = new DIVERoot();
            const mockObject = {
                isObject3D: true,
                userData: {
                    id: 'test-id',
                },
            };
            root.add(mockObject as any);
            const result = root.GetSceneObject({ id: 'test-id' });
            expect(result).toBe(mockObject);
        });

        it('should return undefined when object is not found', () => {
            const root = new DIVERoot();
            const result = root.GetSceneObject({ id: 'non-existent-id' });
            expect(result).toBeUndefined();
        });

        it('should stop traversing when object is found', () => {
            const root = new DIVERoot();
            const mockObject1 = {
                isObject3D: true,
                userData: {
                    id: 'test-id',
                },
                id: 'obj1',
                uuid: 'uuid1',
                name: 'obj1',
                type: 'Object3D',
                parent: null,
                children: [],
                up: { x: 0, y: 1, z: 0 },
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                matrix: { elements: new Float32Array(16) },
                matrixWorld: { elements: new Float32Array(16) },
                matrixAutoUpdate: true,
                matrixWorldNeedsUpdate: false,
                layers: { mask: 1 },
                visible: true,
                castShadow: false,
                receiveShadow: false,
                frustumCulled: true,
                renderOrder: 0,
                animations: [],
                updateMatrix: jest.fn(),
                updateMatrixWorld: jest.fn(),
                updateWorldMatrix: jest.fn(),
                traverse: jest.fn(),
                traverseVisible: jest.fn(),
                traverseAncestors: jest.fn(),
                addEventListener: jest.fn(),
                hasEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            };
            const mockObject2 = { ...mockObject1, id: 'obj2', uuid: 'uuid2' };

            let traverseCount = 0;
            root.traverse = jest.fn((callback) => {
                traverseCount++;
                callback(mockObject1 as any);
                callback(mockObject2 as any);
            });

            const result = root.GetSceneObject({ id: 'test-id' });
            expect(result).toBe(mockObject1);
            expect(traverseCount).toBe(1);
        });
    });

    describe('AddSceneObject', () => {
        it('should add different types of lights', () => {
            const sceneLightData: COMLight = {
                id: 'scene-light-1',
                entityType: 'light',
                type: 'scene',
                name: 'Test Scene Light',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                intensity: 1.0,
                enabled: true,
                color: '#ffffff',
            };

            const ambientLightData: COMLight = {
                id: 'ambient-light-1',
                entityType: 'light',
                type: 'ambient',
                name: 'Test Ambient Light',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                intensity: 1.0,
                enabled: true,
                color: '#ffffff',
            };

            const pointLightData: COMLight = {
                id: 'point-light-1',
                entityType: 'light',
                type: 'point',
                name: 'Test Point Light',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                intensity: 1.0,
                enabled: true,
                color: '#ffffff',
            };

            const unknownLightData: COMLight = {
                id: 'unknown-light-1',
                entityType: 'light',
                type: 'unknown',
                name: 'Test Unknown Light',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                intensity: 1.0,
                enabled: true,
                color: '#ffffff',
            } as any;

            root.AddSceneObject(sceneLightData);
            root.AddSceneObject(ambientLightData);
            root.AddSceneObject(pointLightData);
            root.AddSceneObject(unknownLightData);

            const sceneLight = root.GetSceneObject(sceneLightData);
            const ambientLight = root.GetSceneObject(ambientLightData);
            const pointLight = root.GetSceneObject(pointLightData);
            const unknownLight = root.GetSceneObject(unknownLightData);

            expect(sceneLight).toBeDefined();
            expect(ambientLight).toBeDefined();
            expect(pointLight).toBeDefined();
            expect(unknownLight).toBeUndefined();
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.updateLight: Unknown light type: unknown',
            );
        });

        it('should update all light properties', () => {
            const lightData: COMLight = {
                id: 'light-1',
                entityType: 'light',
                type: 'point',
                name: 'Test Light',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                intensity: 1.0,
                enabled: true,
                color: '#ffffff',
                parentId: null,
            };

            root.AddSceneObject(lightData);
            const light = root.GetSceneObject(lightData);
            expect(light).toBeDefined();
            expect(light?.name).toBe('Test Light');
            expect(light?.position.x).toBe(1);
            expect(light?.position.y).toBe(2);
            expect(light?.position.z).toBe(3);
            expect((light as any).SetIntensity).toHaveBeenCalledWith(1.0);
            expect((light as any).SetEnabled).toHaveBeenCalledWith(true);
            expect((light as any).SetColor).toHaveBeenCalled();
            expect(light?.visible).toBe(true);
        });

        it('should update all model properties', () => {
            const modelData: COMModel = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
                material: { color: '#ffffff' },
                parentId: null,
            };

            root.AddSceneObject(modelData);
            const model = root.GetSceneObject<DIVEModel>(modelData);
            expect(model).toBeDefined();
            expect(model?.name).toBe('Test Model');
            expect(model?.SetPosition).toHaveBeenCalledWith(modelData.position);
            expect(model?.SetRotation).toHaveBeenCalledWith(modelData.rotation);
            expect(model?.SetScale).toHaveBeenCalledWith(modelData.scale);
            expect(model?.SetVisibility).toHaveBeenCalledWith(
                modelData.visible,
            );
            expect(model?.SetMaterial).toHaveBeenCalledWith(modelData.material);
        });

        it('should update all primitive properties', () => {
            const primitiveData: COMPrimitive = {
                id: 'primitive-1',
                entityType: 'primitive',
                name: 'Test Primitive',
                visible: true,
                geometry: { name: 'box', width: 1, height: 1, depth: 1 },
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                material: { color: '#ffffff' },
                parentId: null,
            };

            root.AddSceneObject(primitiveData);
            const primitive = root.GetSceneObject<DIVEPrimitive>(primitiveData);
            expect(primitive).toBeDefined();
            expect(primitive?.name).toBe('Test Primitive');
            expect(primitive?.SetGeometry).toHaveBeenCalledWith(
                primitiveData.geometry,
            );
            expect(primitive?.SetPosition).toHaveBeenCalledWith(
                primitiveData.position,
            );
            expect(primitive?.SetRotation).toHaveBeenCalledWith(
                primitiveData.rotation,
            );
            expect(primitive?.SetScale).toHaveBeenCalledWith(
                primitiveData.scale,
            );
            expect(primitive?.SetVisibility).toHaveBeenCalledWith(
                primitiveData.visible,
            );
            expect(primitive?.SetMaterial).toHaveBeenCalledWith(
                primitiveData.material,
            );
        });

        it('should update all group properties', () => {
            const groupData: COMGroup = {
                id: 'group-1',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                bbVisible: true,
                parentId: null,
            };

            root.AddSceneObject(groupData);
            const group = root.GetSceneObject<DIVEGroup>(groupData);
            expect(group).toBeDefined();
            expect(group?.name).toBe('Test Group');
            expect(group?.SetPosition).toHaveBeenCalledWith(groupData.position);
            expect(group?.SetRotation).toHaveBeenCalledWith(groupData.rotation);
            expect(group?.SetScale).toHaveBeenCalledWith(groupData.scale);
            expect(group?.SetVisibility).toHaveBeenCalledWith(
                groupData.visible,
            );
            expect(group?.SetLinesVisibility).toHaveBeenCalledWith(
                groupData.bbVisible,
            );
        });

        it('should add a model object', () => {
            const modelData: COMModel = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
            };

            root.AddSceneObject(modelData);
            const model = root.GetSceneObject(modelData);
            expect(model).toBeDefined();
            expect(model?.userData.uri).toBe('test.glb');
            expect(model?.userData.id).toBe('model-1');
        });

        it('should add a primitive object', () => {
            const primitiveData: COMPrimitive = {
                id: 'primitive-1',
                entityType: 'primitive',
                name: 'Test Primitive',
                visible: true,
                geometry: { name: 'box', width: 1, height: 1, depth: 1 },
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            root.AddSceneObject(primitiveData);
            const primitive = root.GetSceneObject(primitiveData);
            expect(primitive).toBeDefined();
            expect(primitive?.userData.id).toBe('primitive-1');
        });

        it('should add a group object', () => {
            const groupData: COMGroup = {
                id: 'group-1',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            root.AddSceneObject(groupData);
            const group = root.GetSceneObject(groupData);
            expect(group).toBeDefined();
            expect(group?.userData.id).toBe('group-1');
        });

        it('should handle POV objects', () => {
            const povData: COMPov = {
                id: 'pov-1',
                entityType: 'pov',
                name: 'Test POV',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                target: { x: 0, y: 0, z: 0 },
            };

            root.AddSceneObject(povData);
            // POV objects are not added to the scene
            const pov = root.GetSceneObject(povData);
            expect(pov).toBeUndefined();
        });

        it('should warn for unknown entity type', () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as COMEntityType,
                name: 'Unknown',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            } as unknown as COMEntity;

            root.AddSceneObject(unknownData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.AddSceneObject: Unknown entity type: unknown',
            );
        });
    });

    describe('UpdateSceneObject', () => {
        it('should update existing object properties', () => {
            const modelData: COMModel = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
            };

            root.AddSceneObject(modelData);
            const model = root.GetSceneObject<DIVEModel>(modelData);
            expect(model).toBeDefined();

            const updatedData = {
                ...modelData,
                position: { x: 2, y: 3, z: 4 },
            };

            root.UpdateSceneObject(updatedData);
            expect(model?.SetPosition).toHaveBeenCalledWith(
                updatedData.position,
            );
        });

        it('should update existing light properties', () => {
            const lightData: COMLight = {
                id: 'light-1',
                entityType: 'light',
                type: 'point',
                name: 'Test Light',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                intensity: 1.0,
                enabled: true,
                color: '#ffffff',
            };

            root.AddSceneObject(lightData);
            const light = root.GetSceneObject(lightData);
            expect(light).toBeDefined();

            const updatedData = {
                ...lightData,
                intensity: 2.0,
                color: '#ff0000',
            };

            root.UpdateSceneObject(updatedData);
            expect((light as any).SetIntensity).toHaveBeenCalledWith(2.0);
            expect((light as any).SetColor).toHaveBeenCalled();
        });

        it('should update existing primitive properties', () => {
            const primitiveData: COMPrimitive = {
                id: 'primitive-1',
                entityType: 'primitive',
                name: 'Test Primitive',
                visible: true,
                geometry: { name: 'box', width: 1, height: 1, depth: 1 },
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            root.AddSceneObject(primitiveData);
            const primitive = root.GetSceneObject(primitiveData);
            expect(primitive).toBeDefined();

            const updatedData = {
                ...primitiveData,
                geometry: { name: 'box', width: 2, height: 2, depth: 2 },
            };

            root.UpdateSceneObject(updatedData);
            expect((primitive as any).SetGeometry).toHaveBeenCalledWith(
                updatedData.geometry,
            );
        });

        it('should update existing group properties', () => {
            const groupData: COMGroup = {
                id: 'group-1',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            root.AddSceneObject(groupData);
            const group = root.GetSceneObject(groupData);
            expect(group).toBeDefined();

            const updatedData = {
                ...groupData,
                visible: false,
                bbVisible: true,
            };

            root.UpdateSceneObject(updatedData);
            expect((group as any).SetVisibility).toHaveBeenCalledWith(false);
            expect((group as any).SetLinesVisibility).toHaveBeenCalledWith(
                true,
            );
        });

        it('should handle update of non-existent object', () => {
            const nonExistentData = {
                id: 'non-existent',
                entityType: 'model' as COMEntityType,
                name: 'Non Existent',
                visible: true,
            };
            root.UpdateSceneObject(nonExistentData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();
        });

        it('should handle POV update', () => {
            const povData = {
                id: 'pov-1',
                entityType: 'pov' as COMEntityType,
                name: 'Test POV',
                visible: true,
            };
            root.UpdateSceneObject(povData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();
        });

        it('should warn for unknown entity type in update', () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as COMEntityType,
                name: 'Unknown',
            };
            root.UpdateSceneObject(unknownData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.UpdateSceneObject: Unknown entity type: unknown',
            );
        });
    });

    describe('DeleteSceneObject', () => {
        it('should remove object from scene', () => {
            const modelData: COMModel = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
            };

            root.AddSceneObject(modelData);
            const model = root.GetSceneObject(modelData);
            expect(model).toBeDefined();

            if (model) {
                model.parent = root;
                root.children = [model];
            }

            root.DeleteSceneObject(modelData);
            const deletedModel = root.GetSceneObject(modelData);
            expect(deletedModel).toBeUndefined();
        });

        it('should warn when trying to delete non-existent object', () => {
            const nonExistentData = {
                id: 'non-existent',
                entityType: 'model' as COMEntityType,
                name: 'Non Existent',
                visible: true,
            };
            root.DeleteSceneObject(nonExistentData);
            expect(spyConsoleWarn).toHaveBeenCalled();
        });

        it('should handle POV deletion', () => {
            const povData: COMPov = {
                id: 'pov-1',
                entityType: 'pov',
                name: 'Test POV',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                target: { x: 0, y: 0, z: 0 },
            };

            root.DeleteSceneObject(povData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();
        });

        it('should warn for unknown entity type in deletion', () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as COMEntityType,
                name: 'Unknown',
            };
            root.DeleteSceneObject(unknownData as any);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.DeleteSceneObject: Unknown entity type: unknown',
            );
        });

        it('should handle group member detachment', () => {
            const groupData: COMGroup = {
                id: 'group-1',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const memberData: COMModel = {
                id: 'member-1',
                entityType: 'model',
                name: 'Test Member',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
                parentId: 'group-1',
            };

            root.AddSceneObject(groupData);
            root.AddSceneObject(memberData);

            const group = root.GetSceneObject<DIVEGroup>(groupData);
            const member = root.GetSceneObject(memberData);

            expect(group).toBeDefined();
            expect(member).toBeDefined();

            if (group && member) {
                (group as any).members = [member];
                group.parent = root;
            }

            root.DeleteSceneObject(groupData);
            expect(root.attach).toHaveBeenCalledWith(member);
        });

        it('should handle transform controls detachment', () => {
            const modelData: COMModel = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
            };

            const mockTransformControls = Object.assign(new Object3D(), {
                isTransformControls: true,
                detach: jest.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];

            root.AddSceneObject(modelData);
            const model = root.GetSceneObject(modelData);
            expect(model).toBeDefined();

            if (model) {
                model.parent = root;
                root.parent = mockScene;
            }

            root.DeleteSceneObject(modelData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
        });

        it('should handle primitive deletion', () => {
            const primitiveData: COMPrimitive = {
                id: 'primitive-1',
                entityType: 'primitive',
                name: 'Test Primitive',
                visible: true,
                geometry: { name: 'box', width: 1, height: 1, depth: 1 },
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const mockTransformControls = Object.assign(new Object3D(), {
                isTransformControls: true,
                detach: jest.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];

            root.AddSceneObject(primitiveData);
            const primitive = root.GetSceneObject(primitiveData);
            expect(primitive).toBeDefined();

            if (primitive) {
                primitive.parent = root;
                root.parent = mockScene;
            }

            root.DeleteSceneObject(primitiveData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
        });

        it('should handle group deletion with transform controls', () => {
            const groupData: COMGroup = {
                id: 'group-1',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const mockTransformControls = Object.assign(new Object3D(), {
                isTransformControls: true,
                detach: jest.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];

            root.AddSceneObject(groupData);
            const group = root.GetSceneObject<DIVEGroup>(groupData);
            expect(group).toBeDefined();

            if (group) {
                group.parent = root;
                root.parent = mockScene;
                (group as any).members = [new Object3D()];
            }

            root.DeleteSceneObject(groupData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
            expect(root.attach).toHaveBeenCalled();
        });
    });

    describe('PlaceOnFloor', () => {
        it('should place model on floor', () => {
            const modelData: COMModel = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
            };

            root.AddSceneObject(modelData);
            const model = root.GetSceneObject<DIVEModel>(modelData);
            expect(model).toBeDefined();

            root.PlaceOnFloor(modelData);
            expect(model?.PlaceOnFloor).toHaveBeenCalled();
        });

        it('should handle placing non-existent object on floor', () => {
            const nonExistentData = {
                id: 'non-existent',
                entityType: 'model' as COMEntityType,
            };
            root.PlaceOnFloor(nonExistentData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();
        });

        it('should handle POV placement', () => {
            const povData: COMPov = {
                id: 'pov-1',
                entityType: 'pov',
                name: 'Test POV',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                target: { x: 0, y: 0, z: 0 },
            };

            root.PlaceOnFloor(povData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();
        });

        it('should warn for unknown entity type in placement', () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as COMEntityType,
                name: 'Unknown',
            };
            root.PlaceOnFloor(unknownData as any);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.PlaceOnFloor: Unknown entity type: unknown',
            );
        });
    });

    describe('setParent', () => {
        it('should set parent-child relationship', () => {
            const parentData: COMGroup = {
                id: 'parent-1',
                entityType: 'group',
                name: 'Parent Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const childData: COMModel = {
                id: 'child-1',
                entityType: 'model',
                name: 'Child Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
                parentId: 'parent-1',
            };

            root.AddSceneObject(parentData);
            root.AddSceneObject(childData);

            const parent = root.GetSceneObject(parentData);
            const child = root.GetSceneObject(childData);

            expect(parent).toBeDefined();
            expect(child).toBeDefined();
            expect(parent?.attach).toHaveBeenCalled();
        });

        it('should attach to root when parent is null', () => {
            const childData: COMModel = {
                id: 'child-1',
                entityType: 'model',
                name: 'Child Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
                parentId: null,
            };

            root.AddSceneObject(childData);
            const child = root.GetSceneObject(childData);
            expect(child).toBeDefined();
            expect(root.attach).toHaveBeenCalled();
        });

        it('should handle non-existent parent', () => {
            const childData: COMModel = {
                id: 'child-1',
                entityType: 'model',
                name: 'Child Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
                parentId: 'non-existent',
            };

            root.AddSceneObject(childData);
            const child = root.GetSceneObject(childData);
            expect(child).toBeDefined();
            // When parent doesn't exist, the object should remain where it is
            expect(root.attach).not.toHaveBeenCalled();
        });

        it('should handle non-existent object', () => {
            const modelData: COMModel = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
                parentId: 'parent-1',
            };

            // Don't add the object to the scene
            root.UpdateSceneObject(modelData);
            expect(root.attach).not.toHaveBeenCalled();
        });
    });

    describe('updateLight', () => {
        it('should handle light with undefined properties', () => {
            const lightData: Partial<COMLight> & {
                id: string;
                entityType: string;
                type: string;
            } = {
                id: 'light-1',
                entityType: 'light',
                type: 'point',
                name: undefined,
                visible: undefined,
                position: undefined,
                intensity: undefined,
                enabled: undefined,
                color: undefined,
            };

            root.AddSceneObject(lightData as COMLight);
            const light = root.GetSceneObject(lightData);
            expect(light).toBeDefined();
        });

        it('should handle light with null properties', () => {
            const lightData: Partial<COMLight> & {
                id: string;
                entityType: string;
                type: string;
            } = {
                id: 'light-1',
                entityType: 'light',
                type: 'point',
                name: null as unknown as string,
                visible: null as unknown as boolean,
                position: null as unknown as {
                    x: number;
                    y: number;
                    z: number;
                },
                intensity: null as unknown as number,
                enabled: null as unknown as boolean,
                color: null as unknown as string,
            };

            root.AddSceneObject(lightData as COMLight);
            const light = root.GetSceneObject(lightData);
            expect(light).toBeDefined();
        });
    });

    describe('deleteLight', () => {
        it('should handle light with transform controls', () => {
            const lightData: COMLight = {
                id: 'light-1',
                entityType: 'light',
                type: 'point',
                name: 'Test Light',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                intensity: 1.0,
                enabled: true,
                color: '#ffffff',
            };

            const mockTransformControls = Object.assign(new Object3D(), {
                isTransformControls: true,
                detach: jest.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];

            root.AddSceneObject(lightData);
            const light = root.GetSceneObject(lightData);
            expect(light).toBeDefined();

            if (light) {
                light.parent = root;
                root.parent = mockScene;
            }

            root.DeleteSceneObject(lightData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
        });

        it('should handle non-existent light', () => {
            const lightData: COMLight = {
                id: 'non-existent-light',
                entityType: 'light',
                type: 'point',
                name: 'Test Light',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                intensity: 1.0,
                enabled: true,
                color: '#ffffff',
            };

            root.DeleteSceneObject(lightData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.deleteLight: Light with id non-existent-light not found',
            );
        });
    });

    describe('deleteGroup', () => {
        it('should handle group with transform controls and members', () => {
            const groupData: COMGroup = {
                id: 'group-1',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const mockTransformControls = Object.assign(new Object3D(), {
                isTransformControls: true,
                detach: jest.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];

            root.AddSceneObject(groupData);
            const group = root.GetSceneObject<DIVEGroup>(groupData);
            expect(group).toBeDefined();

            if (group) {
                group.parent = root;
                root.parent = mockScene;
                (group as any).members = [new Object3D()];
            }

            root.DeleteSceneObject(groupData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
            expect(root.attach).toHaveBeenCalled();
        });

        it('should handle non-existent group', () => {
            const groupData: COMGroup = {
                id: 'non-existent-group',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            root.DeleteSceneObject(groupData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.deleteGroup: Group with id non-existent-group not found',
            );
        });
    });

    describe('setParent', () => {
        it('should handle object with null parentId', () => {
            const modelData: COMModel = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
                parentId: null,
            };

            root.AddSceneObject(modelData);
            const model = root.GetSceneObject(modelData);
            expect(model).toBeDefined();
            expect(root.attach).toHaveBeenCalled();
        });

        it('should handle object with non-existent parent', () => {
            const modelData: COMModel = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
                parentId: 'non-existent',
            };

            root.AddSceneObject(modelData);
            const model = root.GetSceneObject(modelData);
            expect(model).toBeDefined();
            expect(root.attach).not.toHaveBeenCalled();
        });
    });

    describe('updateModel', () => {
        it('should handle model with undefined properties', () => {
            const modelData: Partial<COMModel> & {
                id: string;
                entityType: string;
            } = {
                id: 'model-1',
                entityType: 'model',
                name: null as unknown as string,
                visible: null as unknown as boolean,
                position: null as unknown as {
                    x: number;
                    y: number;
                    z: number;
                },
                rotation: null as unknown as {
                    x: number;
                    y: number;
                    z: number;
                },
                scale: null as unknown as { x: number; y: number; z: number },
                material: null as unknown as { color: string },
            };

            root.AddSceneObject(modelData as COMModel);
            const model = root.GetSceneObject(modelData);
            expect(model).toBeDefined();
        });

        it('should handle model with null properties', () => {
            const modelData: Partial<COMModel> & {
                id: string;
                entityType: string;
            } = {
                id: 'model-1',
                entityType: 'model',
                name: null as unknown as string,
                visible: null as unknown as boolean,
                position: null as unknown as {
                    x: number;
                    y: number;
                    z: number;
                },
                rotation: null as unknown as {
                    x: number;
                    y: number;
                    z: number;
                },
                scale: null as unknown as { x: number; y: number; z: number },
                uri: null as unknown as string,
                loaded: null as unknown as boolean,
                material: null as unknown as { color: string },
            };

            root.AddSceneObject(modelData as COMModel);
            const model = root.GetSceneObject(modelData);
            expect(model).toBeDefined();
        });
    });

    describe('updatePrimitive', () => {
        it('should handle primitive with undefined properties', () => {
            const primitiveData: Partial<COMPrimitive> & {
                id: string;
                entityType: string;
            } = {
                id: 'primitive-1',
                entityType: 'primitive',
                name: undefined,
                visible: undefined,
                position: undefined,
                rotation: undefined,
                scale: undefined,
                geometry: undefined,
                material: undefined,
            };

            root.AddSceneObject(primitiveData as COMPrimitive);
            const primitive = root.GetSceneObject(primitiveData);
            expect(primitive).toBeDefined();
        });

        it('should handle primitive with null properties', () => {
            const primitiveData: Partial<COMPrimitive> & {
                id: string;
                entityType: string;
            } = {
                id: 'primitive-1',
                entityType: 'primitive',
                name: null as unknown as string,
                visible: null as unknown as boolean,
                position: null as unknown as {
                    x: number;
                    y: number;
                    z: number;
                },
                rotation: null as unknown as {
                    x: number;
                    y: number;
                    z: number;
                },
                scale: null as unknown as { x: number; y: number; z: number },
                geometry: null as unknown as {
                    name: 'box';
                    width: number;
                    height: number;
                    depth: number;
                },
                material: null as unknown as { color: string },
            };

            root.AddSceneObject(primitiveData as COMPrimitive);
            const primitive = root.GetSceneObject(primitiveData);
            expect(primitive).toBeDefined();
        });
    });

    describe('deletePrimitive', () => {
        it('should handle non-existent primitive', () => {
            const primitiveData: COMPrimitive = {
                id: 'non-existent-primitive',
                entityType: 'primitive',
                name: 'Test Primitive',
                visible: true,
                geometry: { name: 'box', width: 1, height: 1, depth: 1 },
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            root.DeleteSceneObject(primitiveData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.deletePrimitive: Primitive with id non-existent-primitive not found',
            );
        });
    });

    describe('findScene', () => {
        it('should find scene from object hierarchy', () => {
            const mockScene = new Object3D();
            mockScene.name = 'Scene';
            const mockParent = new Object3D();
            mockParent.name = 'Parent';
            const mockChild = new Object3D();
            mockChild.name = 'Child';

            mockChild.parent = mockParent;
            mockParent.parent = mockScene;

            const result = root['findScene'](mockChild);
            expect(result).toBe(mockScene);
        });

        it('should return object itself if it has no parent', () => {
            const mockObject = new Object3D();
            mockObject.name = 'Object';
            mockObject.parent = null;

            const result = root['findScene'](mockObject);
            expect(result).toBe(mockObject);
        });
    });

    describe('detachTransformControls', () => {
        it('should detach transform controls from object', () => {
            const mockObject = new Object3D();
            const mockTransformControls = Object.assign(new Object3D(), {
                isTransformControls: true,
                detach: jest.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];
            mockObject.parent = mockScene;

            root['detachTransformControls'](mockObject);
            expect(mockTransformControls.detach).toHaveBeenCalled();
        });

        it('should handle object without transform controls', () => {
            const mockObject = new Object3D();
            const mockScene = new Object3D();
            mockScene.children = [];
            mockObject.parent = mockScene;

            root['detachTransformControls'](mockObject);
            // No error should be thrown
        });
    });
});
