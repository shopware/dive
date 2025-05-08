import { DIVERoot } from '../Root.ts';
import {
    type COMPrimitive,
    type COMLight,
    type COMModel,
    type COMPov,
    type COMEntity,
    type COMGroup,
    type COMEntityType,
} from '../../../modules/state/types/index.ts';
import { Object3D, Vector3, Box3 } from 'three';
import { DIVEGroup } from '../../group/Group.ts';
import { type DIVEModel } from '../../model/Model.ts';
import { type DIVEPrimitive } from '../../primitive/Primitive.ts';

vi.mock('../../../modules/ModuleRegistry', () => ({
    getModule: vi.fn((moduleName: string) => {
        if (moduleName === 'State') {
            return Promise.resolve({
                get: vi.fn().mockReturnValue({
                    performAction: vi.fn(),
                }),
            });
        }
        return Promise.resolve(
            class {
                load = vi.fn().mockResolvedValue({});
            },
        );
    }),
}));

vi.mock('../../../modules/state/State', () => {
    return {
        State: {
            get: vi.fn(() => {
                return {
                    performAction: vi.fn(),
                };
            }),
        },
    };
});

vi.mock('../../floor/Floor', () => {
    return {
        DIVEFloor: vi.fn(function (this: any) {
            this.isDIVEFloor = true;
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.removeFromParent = vi.fn();
            this.userData = {
                id: undefined,
            };
            return this;
        }),
    };
});

vi.mock('../../grid/Grid', () => {
    return {
        DIVEGrid: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.removeFromParent = vi.fn();
            this.updateMatrixWorld = vi.fn();
            return this;
        }),
    };
});

vi.mock('../../light/AmbientLight', () => {
    return {
        DIVEAmbientLight: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.position = new Vector3();
            this.attach = vi.fn();
            this.applyMatrix4 = vi.fn();
            this.updateWorldMatrix = vi.fn();
            this.children = [];
            this.setIntensity = vi.fn();
            this.setEnabled = vi.fn();
            this.setColor = vi.fn();
            this.userData = {
                id: undefined,
            };
            this.removeFromParent = vi.fn();
            return this;
        }),
    };
});

vi.mock('../../light/PointLight', () => {
    return {
        DIVEPointLight: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.position = new Vector3();
            this.attach = vi.fn();
            this.applyMatrix4 = vi.fn();
            this.updateWorldMatrix = vi.fn();
            this.children = [];
            this.setIntensity = vi.fn();
            this.setEnabled = vi.fn();
            this.setColor = vi.fn();
            this.userData = {
                id: undefined,
            };
            this.removeFromParent = vi.fn();
            return this;
        }),
    };
});

vi.mock('../../light/SceneLight', () => {
    return {
        DIVESceneLight: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.position = new Vector3();
            this.attach = vi.fn();
            this.applyMatrix4 = vi.fn();
            this.updateWorldMatrix = vi.fn();
            this.children = [];
            this.setIntensity = vi.fn();
            this.setEnabled = vi.fn();
            this.setColor = vi.fn();
            this.userData = {
                id: undefined,
            };
            this.removeFromParent = vi.fn();
            return this;
        }),
    };
});

vi.mock('../../model/Model', () => {
    return {
        DIVEModel: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.userData = {
                id: undefined,
            };
            this.attach = vi.fn();
            this.applyMatrix4 = vi.fn();
            this.updateWorldMatrix = vi.fn();
            this.children = [];
            this.setFromGLTF = vi.fn();
            this.SetPosition = vi.fn();
            this.SetRotation = vi.fn();
            this.SetScale = vi.fn();
            this.setVisibility = vi.fn();
            this.setMaterial = vi.fn();
            this.placeOnFloor = vi.fn();
            this.removeFromParent = vi.fn();
            this.position = new Vector3();
            return this;
        }),
    };
});

vi.mock('../../primitive/Primitive', () => {
    return {
        DIVEPrimitive: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.userData = {
                id: undefined,
            };
            this.attach = vi.fn();
            this.applyMatrix4 = vi.fn();
            this.updateWorldMatrix = vi.fn();
            this.children = [];
            this.SetGeometry = vi.fn();
            this.setMaterial = vi.fn();
            this.SetPosition = vi.fn();
            this.SetRotation = vi.fn();
            this.SetScale = vi.fn();
            this.setVisibility = vi.fn();
            this.placeOnFloor = vi.fn();
            this.removeFromParent = vi.fn();
            this.position = new Vector3();
            return this;
        }),
    };
});

vi.mock('../../group/Group', () => {
    return {
        DIVEGroup: vi.fn(function (this: any) {
            this.isDIVEGroup = true;
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.userData = {
                id: undefined,
            };
            this.attach = vi.fn();
            this.applyMatrix4 = vi.fn();
            this.updateWorldMatrix = vi.fn();
            this.children = [];
            this.SetGeometry = vi.fn();
            this.setMaterial = vi.fn();
            this.SetPosition = vi.fn();
            this.SetRotation = vi.fn();
            this.SetScale = vi.fn();
            this.setVisibility = vi.fn();
            this.SetLinesVisibility = vi.fn();
            this.placeOnFloor = vi.fn();
            this.removeFromParent = vi.fn();
            this.position = new Vector3();
            this.members = [];
            return this;
        }),
    };
});

let root: DIVERoot;
let spyConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('components/root/DIVERoot', () => {
    beforeEach(() => {
        root = new DIVERoot();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
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

        it('should initialize asset loader via _getAssetLoader()', async () => {
            const loader = await (root as any)._getAssetLoader();
            // loader is instance of our fake class and has a load method
            expect(loader.load).toBeDefined();
        });
    });

    describe('computeSceneBB', () => {
        it('should compute bounding box for scene objects', () => {
            const mockObject = new Object3D();
            mockObject.position.set(1, 2, 3);

            Object3D.prototype.traverse = vi.fn((callback) =>
                callback(mockObject as Object3D),
            );

            const bb = root.computeSceneBB();
            expect(bb).toBeDefined();
            expect(bb).toBeInstanceOf(Box3);
        });

        it('should handle empty scene', () => {
            Object3D.prototype.traverse = vi.fn((callback) => {});
            const bb = root.computeSceneBB();
            expect(bb).toBeDefined();
            expect(bb).toBeInstanceOf(Box3);
        });

        it('should handle multiple objects', () => {
            const mockObject1 = new Object3D();
            mockObject1.position.set(1, 2, 3);
            mockObject1.traverse = vi.fn((callback) => callback(mockObject1));

            const mockObject2 = new Object3D();
            mockObject2.position.set(4, 5, 6);
            mockObject2.traverse = vi.fn((callback) => callback(mockObject2));

            root.children = [
                mockObject1,
                mockObject2,
            ];

            const bb = root.computeSceneBB();
            expect(bb).toBeDefined();
            expect(bb).toBeInstanceOf(Box3);
            expect(mockObject1.traverse).toHaveBeenCalled();
            expect(mockObject2.traverse).toHaveBeenCalled();
        });
    });

    describe('getSceneObject', () => {
        it('should find object by id', () => {
            const mockObject = new Object3D();
            mockObject.userData = { id: 'test-id' };
            root.add(mockObject);

            const found = root.getSceneObject({ id: 'test-id' });
            expect(found).toBeDefined();
        });

        it('should return undefined for non-existent id', () => {
            const found = root.getSceneObject({ id: 'non-existent' });
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
            const result = root.getSceneObject({ id: 'test-id' });
            expect(result).toBe(mockObject);
        });

        it('should return undefined when object is not found', () => {
            const root = new DIVERoot();
            const result = root.getSceneObject({ id: 'non-existent-id' });
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
                updateMatrix: vi.fn(),
                updateMatrixWorld: vi.fn(),
                updateWorldMatrix: vi.fn(),
                traverse: vi.fn(),
                traverseVisible: vi.fn(),
                traverseAncestors: vi.fn(),
                addEventListener: vi.fn(),
                hasEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            };
            const mockObject2 = { ...mockObject1, id: 'obj2', uuid: 'uuid2' };

            let traverseCount = 0;
            root.traverse = vi.fn((callback) => {
                traverseCount++;
                callback(mockObject1 as any);
                callback(mockObject2 as any);
            });

            const result = root.getSceneObject({ id: 'test-id' });
            expect(result).toBe(mockObject1);
            expect(traverseCount).toBe(1);
        });
    });

    describe('addSceneObject', () => {
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

            root.addSceneObject(sceneLightData);
            root.addSceneObject(ambientLightData);
            root.addSceneObject(pointLightData);
            root.addSceneObject(unknownLightData);

            const sceneLight = root.getSceneObject(sceneLightData);
            const ambientLight = root.getSceneObject(ambientLightData);
            const pointLight = root.getSceneObject(pointLightData);
            const unknownLight = root.getSceneObject(unknownLightData);

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

            root.addSceneObject(lightData);
            const light = root.getSceneObject(lightData);
            expect(light).toBeDefined();
            expect(light?.name).toBe('Test Light');
            expect(light?.position.x).toBe(1);
            expect(light?.position.y).toBe(2);
            expect(light?.position.z).toBe(3);
            expect((light as any).setIntensity).toHaveBeenCalledWith(1.0);
            expect((light as any).setEnabled).toHaveBeenCalledWith(true);
            expect((light as any).setColor).toHaveBeenCalled();
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

            root.addSceneObject(modelData);
            const model = root.getSceneObject<DIVEModel>(modelData);
            expect(model).toBeDefined();
            expect(model?.name).toBe('Test Model');
            expect(model?.SetPosition).toHaveBeenCalledWith(modelData.position);
            expect(model?.SetRotation).toHaveBeenCalledWith(modelData.rotation);
            expect(model?.SetScale).toHaveBeenCalledWith(modelData.scale);
            expect(model?.setVisibility).toHaveBeenCalledWith(
                modelData.visible,
            );
            expect(model?.setMaterial).toHaveBeenCalledWith(modelData.material);
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

            root.addSceneObject(primitiveData);
            const primitive = root.getSceneObject<DIVEPrimitive>(primitiveData);
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
            expect(primitive?.setVisibility).toHaveBeenCalledWith(
                primitiveData.visible,
            );
            expect(primitive?.setMaterial).toHaveBeenCalledWith(
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

            root.addSceneObject(groupData);
            const group = root.getSceneObject<DIVEGroup>(groupData);
            expect(group).toBeDefined();
            expect(group?.name).toBe('Test Group');
            expect(group?.SetPosition).toHaveBeenCalledWith(groupData.position);
            expect(group?.SetRotation).toHaveBeenCalledWith(groupData.rotation);
            expect(group?.SetScale).toHaveBeenCalledWith(groupData.scale);
            expect(group?.setVisibility).toHaveBeenCalledWith(
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

            root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
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

            root.addSceneObject(primitiveData);
            const primitive = root.getSceneObject(primitiveData);
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

            root.addSceneObject(groupData);
            const group = root.getSceneObject(groupData);
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

            root.addSceneObject(povData);
            // POV objects are not added to the scene
            const pov = root.getSceneObject(povData);
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

            root.addSceneObject(unknownData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.addSceneObject: Unknown entity type: unknown',
            );
        });
    });

    describe('updateSceneObject', () => {
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

            root.addSceneObject(modelData);
            const model = root.getSceneObject<DIVEModel>(modelData);
            expect(model).toBeDefined();

            const updatedData = {
                ...modelData,
                position: { x: 2, y: 3, z: 4 },
            };

            root.updateSceneObject(updatedData);
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

            root.addSceneObject(lightData);
            const light = root.getSceneObject(lightData);
            expect(light).toBeDefined();

            const updatedData = {
                ...lightData,
                intensity: 2.0,
                color: '#ff0000',
            };

            root.updateSceneObject(updatedData);
            expect((light as any).setIntensity).toHaveBeenCalledWith(2.0);
            expect((light as any).setColor).toHaveBeenCalled();
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

            root.addSceneObject(primitiveData);
            const primitive = root.getSceneObject(primitiveData);
            expect(primitive).toBeDefined();

            const updatedData = {
                ...primitiveData,
                geometry: { name: 'box', width: 2, height: 2, depth: 2 },
            };

            root.updateSceneObject(updatedData);
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

            root.addSceneObject(groupData);
            const group = root.getSceneObject(groupData);
            expect(group).toBeDefined();

            const updatedData = {
                ...groupData,
                visible: false,
                bbVisible: true,
            };

            root.updateSceneObject(updatedData);
            expect((group as any).setVisibility).toHaveBeenCalledWith(false);
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
            root.updateSceneObject(nonExistentData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();
        });

        it('should handle POV update', () => {
            const povData = {
                id: 'pov-1',
                entityType: 'pov' as COMEntityType,
                name: 'Test POV',
                visible: true,
            };
            root.updateSceneObject(povData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();
        });

        it('should warn for unknown entity type in update', () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as COMEntityType,
                name: 'Unknown',
            };
            root.updateSceneObject(unknownData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.updateSceneObject: Unknown entity type: unknown',
            );
        });
    });

    describe('deleteSceneObject', () => {
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

            root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
            expect(model).toBeDefined();

            if (model) {
                model.parent = root;
                root.children = [model];
            }

            root.deleteSceneObject(modelData);
            const deletedModel = root.getSceneObject(modelData);
            expect(deletedModel).toBeUndefined();
        });

        it('should warn when trying to delete non-existent object', () => {
            const nonExistentData = {
                id: 'non-existent',
                entityType: 'model' as COMEntityType,
                name: 'Non Existent',
                visible: true,
            };
            root.deleteSceneObject(nonExistentData);
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

            root.deleteSceneObject(povData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();
        });

        it('should warn for unknown entity type in deletion', () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as COMEntityType,
                name: 'Unknown',
            };
            root.deleteSceneObject(unknownData as any);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.deleteSceneObject: Unknown entity type: unknown',
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

            root.addSceneObject(groupData);
            root.addSceneObject(memberData);

            const group = root.getSceneObject<DIVEGroup>(groupData);
            const member = root.getSceneObject(memberData);

            expect(group).toBeDefined();
            expect(member).toBeDefined();

            if (group && member) {
                (group as any).members = [member];
                group.parent = root;
            }

            root.deleteSceneObject(groupData);
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
                detach: vi.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];

            root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
            expect(model).toBeDefined();

            if (model) {
                model.parent = root;
                root.parent = mockScene;
            }

            root.deleteSceneObject(modelData);
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
                detach: vi.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];

            root.addSceneObject(primitiveData);
            const primitive = root.getSceneObject(primitiveData);
            expect(primitive).toBeDefined();

            if (primitive) {
                primitive.parent = root;
                root.parent = mockScene;
            }

            root.deleteSceneObject(primitiveData);
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
                detach: vi.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];

            root.addSceneObject(groupData);
            const group = root.getSceneObject<DIVEGroup>(groupData);
            expect(group).toBeDefined();

            if (group) {
                group.parent = root;
                root.parent = mockScene;
                (group as any).members = [new Object3D()];
            }

            root.deleteSceneObject(groupData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
            expect(root.attach).toHaveBeenCalled();
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

            root.addSceneObject(parentData);
            root.addSceneObject(childData);

            const parent = root.getSceneObject(parentData);
            const child = root.getSceneObject(childData);

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

            root.addSceneObject(childData);
            const child = root.getSceneObject(childData);
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

            root.addSceneObject(childData);
            const child = root.getSceneObject(childData);
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
            root.updateSceneObject(modelData);
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

            root.addSceneObject(lightData as COMLight);
            const light = root.getSceneObject(lightData);
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

            root.addSceneObject(lightData as COMLight);
            const light = root.getSceneObject(lightData);
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
                detach: vi.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];

            root.addSceneObject(lightData);
            const light = root.getSceneObject(lightData);
            expect(light).toBeDefined();

            if (light) {
                light.parent = root;
                root.parent = mockScene;
            }

            root.deleteSceneObject(lightData);
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

            root.deleteSceneObject(lightData);
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
                detach: vi.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];

            root.addSceneObject(groupData);
            const group = root.getSceneObject<DIVEGroup>(groupData);
            expect(group).toBeDefined();

            if (group) {
                group.parent = root;
                root.parent = mockScene;
                (group as any).members = [new Object3D()];
            }

            root.deleteSceneObject(groupData);
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

            root.deleteSceneObject(groupData);
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

            root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
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

            root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
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

            root.addSceneObject(modelData as COMModel);
            const model = root.getSceneObject(modelData);
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

            root.addSceneObject(modelData as COMModel);
            const model = root.getSceneObject(modelData);
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

            root.addSceneObject(primitiveData as COMPrimitive);
            const primitive = root.getSceneObject(primitiveData);
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

            root.addSceneObject(primitiveData as COMPrimitive);
            const primitive = root.getSceneObject(primitiveData);
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

            root.deleteSceneObject(primitiveData);
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
                detach: vi.fn(),
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

    describe('bubble errors from getModule in _getAssetLoader()', () => {
        it('should bubble errors from getModule in _getAssetLoader()', async () => {
            const error = new Error('Failed to load');
            // make getModule reject on next call
            const moduleIndexTsFile = await import(
                '../../../modules/ModuleRegistry.ts'
            );
            vi.spyOn(moduleIndexTsFile, 'getModule').mockRejectedValueOnce(
                error,
            );
            await expect((root as any)._getAssetLoader()).rejects.toThrow(
                'Failed to load',
            );
        });
    });
});
