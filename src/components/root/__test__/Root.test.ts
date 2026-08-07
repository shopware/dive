import { DIVERoot } from '../Root.ts';
import {
    LightSchema,
    ModelSchema,
    EntitySchema,
    PrimitiveSchema,
    GroupSchema,
    CameraSchema,
    EntityTypeSchema,
    DIVEGeometryType,
} from '@shopware-ag/dive';
import { Object3D, Vector3, Box3 } from 'three/webgpu';

vi.mock('three/webgpu', async () => {
    const actual =
        await vi.importActual<typeof import('three/webgpu')>('three/webgpu');

    const Object3D = vi.fn(function (this: any) {
        this.isObject3D = true;
        this.children = [];
        this.parent = null;
        this.name = '';
        this.userData = {};
        this.visible = true;
        this.layers = { mask: 0 };
        this.position = new actual.Vector3();
        this.rotation = new actual.Euler();
        this.quaternion = new actual.Quaternion();
        this.scale = new actual.Vector3(1, 1, 1);
        this.add = vi.fn((...objects: any[]) => {
            objects.forEach((object) => {
                this.children.push(object);
                if (object && typeof object === 'object') {
                    object.parent = this;
                }
            });
            return this;
        });
        this.attach = vi.fn((object: any) => {
            this.children.push(object);
            if (object && typeof object === 'object') {
                object.parent = this;
            }
            return this;
        });
        this.remove = vi.fn((object: any) => {
            this.children = this.children.filter(
                (child: any) => child !== object,
            );
            if (object && typeof object === 'object') {
                object.parent = null;
            }
            return this;
        });
        this.removeFromParent = vi.fn(() => {
            this.parent?.remove?.(this);
        });
        this.dispatchEvent = vi.fn();
        this.updateWorldMatrix = vi.fn();
        this.applyMatrix4 = vi.fn();
        this.worldToLocal = vi.fn((vector: any) => vector);
        this.traverse = vi.fn((callback: (object: any) => void) => {
            callback(this);
            this.children.forEach((child: any) => {
                if (child?.traverse && child !== this) {
                    child.traverse(callback);
                } else {
                    callback(child);
                }
            });
        });
        return this;
    });

    return {
        ...actual,
        Object3D,
    };
});

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
            this.name = '';
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
            this.name = '';
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
            this.name = '';
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
            this.setPosition = vi.fn();
            this.setRotation = vi.fn();
            this.setScale = vi.fn();
            this.setVisibility = vi.fn();
            this.setMaterial = vi.fn();
            this.placeOnFloor = vi.fn();
            this.removeFromParent = vi.fn();
            this.position = new Vector3();
            this.setFromURL = vi.fn().mockResolvedValue(void 0);
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
            this.setGeometry = vi.fn();
            this.setMaterial = vi.fn();
            this.setPosition = vi.fn();
            this.setRotation = vi.fn();
            this.setScale = vi.fn();
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
            this.setGeometry = vi.fn();
            this.setMaterial = vi.fn();
            this.setPosition = vi.fn();
            this.setRotation = vi.fn();
            this.setScale = vi.fn();
            this.setVisibility = vi.fn();
            this.setLinesVisibility = vi.fn();
            this.placeOnFloor = vi.fn();
            this.removeFromParent = vi.fn();
            this.position = new Vector3();
            this.members = [];
            return this;
        }),
    };
});

const spyConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('components/root/DIVERoot', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        spyConsoleWarn.mockRestore();
    });

    describe('constructor', () => {
        it('should initialize with correct properties', () => {
            const root = new DIVERoot();
            expect(root.isDIVERoot).toBe(true);
            expect(root.name).toBe('Root');
            expect(root.floor).toBeDefined();
        });
    });

    describe('computeSceneBB', () => {
        it('should compute bounding box for scene objects', () => {
            const mockObject = new Object3D();
            mockObject.position.set(1, 2, 3);

            Object3D.prototype.traverse = vi.fn((callback) =>
                callback(mockObject as Object3D),
            );

            const root = new DIVERoot();
            const bb = root.computeSceneBB();
            expect(bb).toBeDefined();
            expect(bb).toBeInstanceOf(Box3);
        });

        it('should handle empty scene', () => {
            Object3D.prototype.traverse = vi.fn((callback) => {});

            const root = new DIVERoot();
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

            const root = new DIVERoot();
            root.children = [mockObject1, mockObject2];

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

            const root = new DIVERoot();
            root.add(mockObject);

            const found = root.getSceneObject({
                id: 'test-id',
                entityType: 'model',
            });
            expect(found).toBeDefined();
        });

        it('should return undefined for non-existent id', () => {
            const root = new DIVERoot();
            const found = root.getSceneObject({
                id: 'non-existent',
                entityType: 'model',
            });
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
            const result = root.getSceneObject({
                id: 'test-id',
                entityType: 'model',
            });
            expect(result).toBe(mockObject);
        });

        it('should return undefined when object is not found', () => {
            const root = new DIVERoot();
            const result = root.getSceneObject({
                id: 'non-existent-id',
                entityType: 'model',
            });
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

            const result = root.getSceneObject({
                id: 'test-id',
                entityType: 'model',
            });
            expect(result).toBe(mockObject1);
            expect(traverseCount).toBe(1);
        });
    });

    describe('addSceneObject', () => {
        it('should add different types of lights', async () => {
            const sceneLightData: LightSchema = {
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

            const ambientLightData: LightSchema = {
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

            const pointLightData: LightSchema = {
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

            const unknownLightData: LightSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(sceneLightData);
            await root.addSceneObject(ambientLightData);
            await root.addSceneObject(pointLightData);
            await expect(root.addSceneObject(unknownLightData)).rejects.toThrow(
                'DIVERoot.addSceneObject: Unknown light type: unknown',
            );

            const sceneLight = root.getSceneObject(sceneLightData);
            const ambientLight = root.getSceneObject(ambientLightData);
            const pointLight = root.getSceneObject(pointLightData);
            const unknownLight = root.getSceneObject(unknownLightData);

            expect(sceneLight).toBeDefined();
            expect(ambientLight).toBeDefined();
            expect(pointLight).toBeDefined();
            expect(unknownLight).toBeUndefined();
        });

        it('should update all light properties', async () => {
            const lightData: LightSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(lightData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();

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

        it('should update all model properties', async () => {
            const modelData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
            expect(model).toBeDefined();
            expect(model?.name).toBe('Test Model');
            expect(model?.setPosition).toHaveBeenCalledWith(modelData.position);
            expect(model?.setRotation).toHaveBeenCalledWith(modelData.rotation);
            expect(model?.setScale).toHaveBeenCalledWith(modelData.scale);
            expect(model?.setVisibility).toHaveBeenCalledWith(
                modelData.visible,
            );
            expect(model?.setMaterial).toHaveBeenCalledWith(modelData.material);
        });

        it('should update all primitive properties', async () => {
            const primitiveData: PrimitiveSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(primitiveData);
            const primitive = root.getSceneObject(primitiveData);
            expect(primitive).toBeDefined();
            expect(primitive?.name).toBe('Test Primitive');
            expect(primitive?.setGeometry).toHaveBeenCalledWith(
                primitiveData.geometry,
            );
            expect(primitive?.setPosition).toHaveBeenCalledWith(
                primitiveData.position,
            );
            expect(primitive?.setRotation).toHaveBeenCalledWith(
                primitiveData.rotation,
            );
            expect(primitive?.setScale).toHaveBeenCalledWith(
                primitiveData.scale,
            );
            expect(primitive?.setVisibility).toHaveBeenCalledWith(
                primitiveData.visible,
            );
            expect(primitive?.setMaterial).toHaveBeenCalledWith(
                primitiveData.material,
            );
        });

        it('should update all group properties', async () => {
            const groupData: GroupSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(groupData);
            const group = root.getSceneObject(groupData);
            expect(group).toBeDefined();
            expect(group?.name).toBe('Test Group');
            expect(group?.setPosition).toHaveBeenCalledWith(groupData.position);
            expect(group?.setRotation).toHaveBeenCalledWith(groupData.rotation);
            expect(group?.setScale).toHaveBeenCalledWith(groupData.scale);
            expect(group?.setVisibility).toHaveBeenCalledWith(
                groupData.visible,
            );
            expect(group?.setLinesVisibility).toHaveBeenCalledWith(
                groupData.bbVisible,
            );
        });

        it('should add a model object', async () => {
            const modelData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
            expect(model).toBeDefined();
            expect(model?.userData.uri).toBe('test.glb');
            expect(model?.userData.id).toBe('model-1');
        });

        it('should add a primitive object', async () => {
            const primitiveData: PrimitiveSchema = {
                id: 'primitive-1',
                entityType: 'primitive',
                name: 'Test Primitive',
                visible: true,
                geometry: { name: 'box', width: 1, height: 1, depth: 1 },
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const root = new DIVERoot();
            await root.addSceneObject(primitiveData);
            const primitive = root.getSceneObject(primitiveData);
            expect(primitive).toBeDefined();
            expect(primitive?.userData.id).toBe('primitive-1');
        });

        it('should add a group object', async () => {
            const groupData: GroupSchema = {
                id: 'group-1',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const root = new DIVERoot();
            await root.addSceneObject(groupData);
            const group = root.getSceneObject(groupData);
            expect(group).toBeDefined();
            expect(group?.userData.id).toBe('group-1');
        });

        it('should handle CAMERA objects', async () => {
            const cameraData: CameraSchema = {
                id: 'camera-1',
                entityType: 'camera',
                name: 'Test Camera',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                target: { x: 0, y: 0, z: 0 },
            };

            const root = new DIVERoot();
            await root.addSceneObject(cameraData);
            // CAMERA objects are not added to the scene
            const camera = root.getSceneObject(cameraData);
            expect(camera).toBeUndefined();
        });

        it('should warn for unknown entity type', async () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as EntityTypeSchema,
                name: 'Unknown',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            } as unknown as EntitySchema;

            const root = new DIVERoot();
            await expect(root.addSceneObject(unknownData)).rejects.toThrow(
                'DIVERoot.addSceneObject: Unknown entity type: unknown',
            );
        });

        it('should warn and return the existing object when adding a duplicate id', async () => {
            const modelData: ModelSchema = {
                id: 'model-duplicate',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
            };

            const root = new DIVERoot();
            const firstObject = await root.addSceneObject(modelData);
            const duplicateObject = await root.addSceneObject(modelData);

            expect(duplicateObject).toBe(firstObject);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.addSceneObject: Scene object with id model-duplicate already exists',
            );
        });
    });

    describe('updateSceneObject', () => {
        it('should update existing object properties', async () => {
            const modelData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
            expect(model).toBeDefined();

            const updatedData = {
                ...modelData,
                position: { x: 2, y: 3, z: 4 },
            };

            await root.updateSceneObject(updatedData);
            expect(model?.setPosition).toHaveBeenCalledWith(
                updatedData.position,
            );
        });

        it('should update existing light properties', async () => {
            const lightData: LightSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(lightData);
            const light = root.getSceneObject(lightData);
            expect(light).toBeDefined();

            const updatedData = {
                ...lightData,
                intensity: 2.0,
                color: '#ff0000',
            };

            await root.updateSceneObject(updatedData);
            expect((light as any).setIntensity).toHaveBeenCalledWith(2.0);
            expect((light as any).setColor).toHaveBeenCalled();
        });

        it('should update existing primitive properties', async () => {
            const primitiveData: PrimitiveSchema = {
                id: 'primitive-1',
                entityType: 'primitive',
                name: 'Test Primitive',
                visible: true,
                geometry: { name: 'box', width: 1, height: 1, depth: 1 },
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const root = new DIVERoot();
            await root.addSceneObject(primitiveData);
            const primitive = root.getSceneObject(primitiveData);
            expect(primitive).toBeDefined();

            const updatedData = {
                ...primitiveData,
                geometry: {
                    name: 'box' as DIVEGeometryType,
                    width: 2,
                    height: 2,
                    depth: 2,
                },
            };

            await root.updateSceneObject(updatedData);
            expect((primitive as any).setGeometry).toHaveBeenCalledWith(
                updatedData.geometry,
            );
        });

        it('should update existing group properties', async () => {
            const groupData: GroupSchema = {
                id: 'group-1',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const root = new DIVERoot();
            await root.addSceneObject(groupData);
            const group = root.getSceneObject(groupData);
            expect(group).toBeDefined();

            const updatedData = {
                ...groupData,
                visible: false,
                bbVisible: true,
            };

            await root.updateSceneObject(updatedData);
            expect((group as any).setVisibility).toHaveBeenCalledWith(false);
            expect((group as any).setLinesVisibility).toHaveBeenCalledWith(
                true,
            );
        });

        it('should handle update of non-existent object', async () => {
            const nonExistentData = {
                id: 'non-existent',
                entityType: 'model' as EntityTypeSchema,
                name: 'Non Existent',
                visible: true,
            };

            const root = new DIVERoot();
            await root.updateSceneObject(nonExistentData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.updateSceneObject: Scene object with id non-existent does not exist',
            );
        });

        it('should handle CAMERA update', async () => {
            const cameraData = {
                id: 'camera-1',
                entityType: 'camera' as EntityTypeSchema,
                name: 'Test CAMERA',
                visible: true,
            };

            const root = new DIVERoot();
            await root.updateSceneObject(cameraData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.updateSceneObject: Scene object with id camera-1 does not exist',
            );
        });

        it('should no-op when updating a found CAMERA object', async () => {
            const cameraData = {
                id: 'camera-1',
                entityType: 'camera' as EntityTypeSchema,
                name: 'Test CAMERA',
                visible: true,
            };

            const root = new DIVERoot();
            const cameraObject = new Object3D();
            cameraObject.userData.id = cameraData.id;
            root.add(cameraObject);

            await root.updateSceneObject(cameraData);

            expect(spyConsoleWarn).not.toHaveBeenCalled();
            expect(root.getSceneObject(cameraData)).toBe(cameraObject);
        });

        it('should warn for unknown entity type in update', async () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as EntityTypeSchema,
                name: 'Unknown',
            };

            const root = new DIVERoot();
            await root.updateSceneObject(unknownData);
            expect(spyConsoleWarn).toHaveBeenCalled();
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.updateSceneObject: Scene object with id unknown does not exist',
            );
        });

        it('should throw for unknown entity type when the object exists', async () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as EntityTypeSchema,
                name: 'Unknown',
            };

            const root = new DIVERoot();
            const existingObject = new Object3D();
            existingObject.userData.id = unknownData.id;
            root.add(existingObject);

            await expect(root.updateSceneObject(unknownData)).rejects.toThrow(
                'DIVERoot.updateSceneObject: Unknown entity type: unknown',
            );
        });
    });

    describe('deleteSceneObject', () => {
        it('should remove object from scene', async () => {
            const modelData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(modelData);
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
                entityType: 'model' as EntityTypeSchema,
                name: 'Non Existent',
                visible: true,
            };

            const root = new DIVERoot();
            root.deleteSceneObject(nonExistentData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.deleteSceneObject: Object with id non-existent not found',
            );
        });

        it('should handle CAMERA deletion', () => {
            const cameraData: CameraSchema = {
                id: 'camera-1',
                entityType: 'camera',
                name: 'Test CAMERA',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                target: { x: 0, y: 0, z: 0 },
            };

            const root = new DIVERoot();
            root.deleteSceneObject(cameraData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.deleteSceneObject: Object with id camera-1 not found',
            );
        });

        it('should no-op when deleting a found CAMERA object', () => {
            const cameraData: CameraSchema = {
                id: 'camera-1',
                entityType: 'camera',
                name: 'Test CAMERA',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                target: { x: 0, y: 0, z: 0 },
            };

            const root = new DIVERoot();
            const cameraObject = new Object3D();
            cameraObject.userData.id = cameraData.id;
            root.add(cameraObject);

            root.deleteSceneObject(cameraData);

            expect(spyConsoleWarn).not.toHaveBeenCalled();
            expect(root.getSceneObject(cameraData)).toBe(cameraObject);
        });

        it('should warn for unknown entity type in deletion', () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as EntityTypeSchema,
                name: 'Unknown',
            };

            const root = new DIVERoot();
            root.children = [
                {
                    userData: {
                        id: 'unknown',
                    },
                } as any,
            ];
            expect(() => root.deleteSceneObject(unknownData as any)).toThrow(
                'DIVERoot.deleteSceneObject: Unknown entity type: unknown',
            );
        });

        it('should handle group member detachment', async () => {
            const groupData: GroupSchema = {
                id: 'group-1',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const memberData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(groupData);
            await root.addSceneObject(memberData);

            const group = root.getSceneObject(groupData);
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

        it('should handle transform controls detachment', async () => {
            const modelData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
            expect(model).toBeDefined();

            if (model) {
                model.parent = root;
                root.parent = mockScene;
            }

            root.deleteSceneObject(modelData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
        });

        it('should handle primitive deletion', async () => {
            const primitiveData: PrimitiveSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(primitiveData);
            const primitive = root.getSceneObject(primitiveData);
            expect(primitive).toBeDefined();

            if (primitive) {
                primitive.parent = root;
                root.parent = mockScene;
            }

            root.deleteSceneObject(primitiveData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
        });

        it('should handle group deletion with transform controls', async () => {
            const groupData: GroupSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(groupData);
            const group = root.getSceneObject(groupData);
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

    describe('_setParent', () => {
        it('should set parent-child relationship', async () => {
            const parentData: GroupSchema = {
                id: 'parent-1',
                entityType: 'group',
                name: 'Parent Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const childData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(parentData);
            await root.addSceneObject(childData);

            const parent = root.getSceneObject(parentData);
            const child = root.getSceneObject(childData);

            expect(parent).toBeDefined();
            expect(child).toBeDefined();
            expect(parent?.attach).toHaveBeenCalled();
        });

        it('should attach to root when parent is null', async () => {
            const childData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(childData);
            const child = root.getSceneObject(childData);
            expect(child).toBeDefined();
            expect(root.attach).toHaveBeenCalled();
        });

        it('should handle non-existent parent', async () => {
            const childData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(childData);
            const child = root.getSceneObject(childData);
            expect(child).toBeDefined();
            // When parent doesn't exist, the object should remain where it is
            expect(root.attach).not.toHaveBeenCalled();
        });

        it('should handle non-existent object', async () => {
            const modelData: ModelSchema = {
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

            const root = new DIVERoot();
            // Don't add the object to the scene
            await root.updateSceneObject(modelData);
            expect(root.attach).not.toHaveBeenCalled();
        });
    });

    describe('_updateLight', () => {
        it('should handle light with undefined properties', async () => {
            const lightData: Partial<LightSchema> & {
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

            const root = new DIVERoot();
            await root.addSceneObject(lightData as LightSchema);
            const light = root.getSceneObject(lightData);
            expect(light).toBeDefined();
        });

        it('should only touch the fields a patch carries', async () => {
            const root = new DIVERoot();
            await root.addSceneObject({
                id: 'light-1',
                entityType: 'light',
                type: 'point',
                name: 'Lamp',
                intensity: 2,
            } as LightSchema);

            const light = root.getSceneObject({
                id: 'light-1',
                entityType: 'light',
            }) as any;
            light.setIntensity.mockClear();
            light.setColor.mockClear();
            light.setEnabled.mockClear();

            await root.updateSceneObject({
                id: 'light-1',
                entityType: 'light',
                name: 'Renamed',
            });

            expect(light.name).toBe('Renamed');
            // absent means unchanged, so no other setter runs
            expect(light.setIntensity).not.toHaveBeenCalled();
            expect(light.setColor).not.toHaveBeenCalled();
            expect(light.setEnabled).not.toHaveBeenCalled();
        });
    });

    describe('model asset loading', () => {
        const addModel = async (root: DIVERoot, uri: string): Promise<any> => {
            await root.addSceneObject({
                id: 'model-1',
                entityType: 'model',
                name: 'M',
                uri,
            } as ModelSchema);

            return root.getSceneObject({
                id: 'model-1',
                entityType: 'model',
            }) as any;
        };

        it('should load the asset when the model is added', async () => {
            const root = new DIVERoot();
            const model = await addModel(root, 'a.glb');

            expect(model.setFromURL).toHaveBeenCalledWith('a.glb');
            expect(model.userData.uri).toBe('a.glb');
        });

        it('should not fetch the asset again when the uri is unchanged', async () => {
            const root = new DIVERoot();
            const model = await addModel(root, 'a.glb');
            model.setFromURL.mockClear();

            await root.updateSceneObject({
                id: 'model-1',
                entityType: 'model',
                uri: 'a.glb',
                position: { x: 1, y: 2, z: 3 },
            });

            expect(model.setFromURL).not.toHaveBeenCalled();
            // the rest of the patch still applies
            expect(model.setPosition).toHaveBeenCalledWith({
                x: 1,
                y: 2,
                z: 3,
            });
        });

        it('should fetch the asset when the uri changed', async () => {
            const root = new DIVERoot();
            const model = await addModel(root, 'a.glb');
            model.setFromURL.mockClear();

            await root.updateSceneObject({
                id: 'model-1',
                entityType: 'model',
                uri: 'b.glb',
            });

            expect(model.setFromURL).toHaveBeenCalledWith('b.glb');
            expect(model.userData.uri).toBe('b.glb');
        });
    });

    describe('_deleteLight', () => {
        it('should handle light with transform controls', async () => {
            const lightData: LightSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(lightData);
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
            const lightData: LightSchema = {
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

            const root = new DIVERoot();
            root.deleteSceneObject(lightData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.deleteSceneObject: Object with id non-existent-light not found',
            );
        });
    });

    describe('_deleteGroup', () => {
        it('should handle group with transform controls and members', async () => {
            const groupData: GroupSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(groupData);
            const group = root.getSceneObject(groupData);
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
            const groupData: GroupSchema = {
                id: 'non-existent-group',
                entityType: 'group',
                name: 'Test Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const root = new DIVERoot();
            root.deleteSceneObject(groupData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.deleteSceneObject: Object with id non-existent-group not found',
            );
        });
    });

    describe('_setParent', () => {
        it('should handle object with null parentId', async () => {
            const modelData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
            expect(model).toBeDefined();
            expect(root.attach).toHaveBeenCalled();
        });

        it('should handle object with non-existent parent', async () => {
            const modelData: ModelSchema = {
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

            const root = new DIVERoot();
            await root.addSceneObject(modelData);
            const model = root.getSceneObject(modelData);
            expect(model).toBeDefined();
            expect(root.attach).not.toHaveBeenCalled();
        });
    });

    describe('_updateModel', () => {
        it('should handle model with undefined properties', async () => {
            const modelData: Partial<ModelSchema> & {
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

            const root = new DIVERoot();
            await root.addSceneObject(modelData as ModelSchema);
            const model = root.getSceneObject(modelData);
            expect(model).toBeDefined();
        });

        it('should handle model with null properties', async () => {
            const modelData: Partial<ModelSchema> & {
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

            const root = new DIVERoot();
            await root.addSceneObject(modelData as ModelSchema);
            const model = root.getSceneObject(modelData);
            expect(model).toBeDefined();
        });
    });

    describe('_updatePrimitive', () => {
        it('should handle primitive with undefined properties', async () => {
            const primitiveData: Partial<PrimitiveSchema> & {
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

            const root = new DIVERoot();
            await root.addSceneObject(primitiveData as PrimitiveSchema);
            const primitive = root.getSceneObject(primitiveData);
            expect(primitive).toBeDefined();
        });

        it('should handle primitive with null properties', async () => {
            const primitiveData: Partial<PrimitiveSchema> & {
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

            const root = new DIVERoot();
            await root.addSceneObject(primitiveData as PrimitiveSchema);
            const primitive = root.getSceneObject(primitiveData);
            expect(primitive).toBeDefined();
        });
    });

    describe('_deletePrimitive', () => {
        it('should handle non-existent primitive', () => {
            const primitiveData: PrimitiveSchema = {
                id: 'non-existent-primitive',
                entityType: 'primitive',
                name: 'Test Primitive',
                visible: true,
                geometry: { name: 'box', width: 1, height: 1, depth: 1 },
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            };

            const root = new DIVERoot();
            root.deleteSceneObject(primitiveData);
            expect(spyConsoleWarn).toHaveBeenCalled();
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'DIVERoot.deleteSceneObject: Object with id non-existent-primitive not found',
            );
        });
    });

    describe('_findScene', () => {
        it('should find scene from object hierarchy', () => {
            const mockScene = new Object3D();
            mockScene.name = 'Scene';
            const mockParent = new Object3D();
            mockParent.name = 'Parent';
            const mockChild = new Object3D();
            mockChild.name = 'Child';

            mockChild.parent = mockParent;
            mockParent.parent = mockScene;

            const root = new DIVERoot();
            const result = root['_findScene'](mockChild);
            expect(result).toBe(mockScene);
        });

        it('should return object itself if it has no parent', () => {
            const mockObject = new Object3D();
            mockObject.name = 'Object';
            mockObject.parent = null;

            const root = new DIVERoot();
            const result = root['_findScene'](mockObject);
            expect(result).toBe(mockObject);
        });
    });

    describe('_detachTransformControls', () => {
        it('should detach transform controls from object', () => {
            const mockObject = new Object3D();
            const mockTransformControls = Object.assign(new Object3D(), {
                isTransformControls: true,
                detach: vi.fn(),
            });

            const mockScene = new Object3D();
            mockScene.children = [mockTransformControls];
            mockObject.parent = mockScene;

            const root = new DIVERoot();
            root['_detachTransformControls'](mockObject);
            expect(mockTransformControls.detach).toHaveBeenCalled();
        });

        it('should detach controls from transform control helper roots', () => {
            const mockObject = new Object3D();
            const detach = vi.fn();
            const mockHelperRoot = Object.assign(new Object3D(), {
                isTransformControlsRoot: true,
                controls: {
                    detach,
                },
            });

            const mockScene = new Object3D();
            mockScene.children = [mockHelperRoot];
            mockObject.parent = mockScene;

            const root = new DIVERoot();
            root['_detachTransformControls'](mockObject);
            expect(detach).toHaveBeenCalled();
        });

        it('should handle object without transform controls', () => {
            const mockObject = new Object3D();
            const mockScene = new Object3D();
            mockScene.children = [];
            mockObject.parent = mockScene;

            const root = new DIVERoot();
            root['_detachTransformControls'](mockObject);
            // No error should be thrown
        });
    });
});
