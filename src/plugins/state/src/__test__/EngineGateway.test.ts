import { EngineGateway } from '../EngineGateway.ts';
import {
    detachTransformControls,
    DIVERoot,
    DIVEGeometryType,
    type DIVE,
} from '@shopware-ag/dive';
import { type State } from '../State.ts';
import { type DIVESceneObject } from '@shopware-ag/dive';
import {
    LightSchema,
    ModelSchema,
    EntitySchema,
    PrimitiveSchema,
    GroupSchema,
    CameraSchema,
    EntityTypeSchema,
} from '../../types/index.ts';
import { Color, Object3D, Vector3 } from 'three/webgpu';

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
        this.addEventListener = vi.fn();
        this.removeEventListener = vi.fn();
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

vi.mock('../../../../components/floor/Floor', () => {
    return {
        DIVEFloor: vi.fn(function (this: any) {
            this.isDIVEFloor = true;
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.addEventListener = vi.fn();
            this.removeEventListener = vi.fn();
            this.removeFromParent = vi.fn();
            this.userData = {
                id: undefined,
            };
            return this;
        }),
    };
});

vi.mock('../../../../components/grid/Grid', () => {
    return {
        DIVEGrid: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.addEventListener = vi.fn();
            this.removeEventListener = vi.fn();
            this.removeFromParent = vi.fn();
            this.updateMatrixWorld = vi.fn();
            return this;
        }),
    };
});

vi.mock('../../../../components/light/AmbientLight', () => {
    return {
        DIVEAmbientLight: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.name = '';
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.addEventListener = vi.fn();
            this.removeEventListener = vi.fn();
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

vi.mock('../../../../components/light/PointLight', () => {
    return {
        DIVEPointLight: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.name = '';
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.addEventListener = vi.fn();
            this.removeEventListener = vi.fn();
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

vi.mock('../../../../components/light/SceneLight', () => {
    return {
        DIVESceneLight: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.name = '';
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.addEventListener = vi.fn();
            this.removeEventListener = vi.fn();
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

vi.mock('../../../../components/model/Model', () => {
    return {
        DIVEModel: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.addEventListener = vi.fn();
            this.removeEventListener = vi.fn();
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

vi.mock('../../../../components/primitive/Primitive', () => {
    return {
        DIVEPrimitive: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.addEventListener = vi.fn();
            this.removeEventListener = vi.fn();
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

vi.mock('../../../../components/group/Group', () => {
    return {
        DIVEGroup: vi.fn(function (this: any) {
            this.isDIVEGroup = true;
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.addEventListener = vi.fn();
            this.removeEventListener = vi.fn();
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
/**
 * A gateway over a bare root, with the State side stubbed out.
 *
 * The mapping is what these tests are about; whether an action fires on top of
 * it is covered where the wiring lives.
 */
/**
 * Every scene class is replaced by a mock above, so what comes back out is a
 * bag of spies rather than a real DIVEModel. Typed loosely on purpose — the
 * narrowing that `getSceneObject` used to do lives in the schema guards now.
 */
type MockedSceneObject = Record<string, any>;

const findEntity = (
    gateway: EngineGateway,
    entity: { id: string; entityType: EntityTypeSchema },
): MockedSceneObject | undefined =>
    gateway.findEntity(entity) as MockedSceneObject | undefined;

const makeGateway = (): EngineGateway => {
    const scene = Object.assign(new Object3D(), {
        root: new DIVERoot(),
        grid: { visible: true, setVisibility: vi.fn() },
        background: new Color(0x000000),
        setBackground: vi.fn(),
    });
    const engine = { scene } as unknown as DIVE;
    const state = { performAction: vi.fn() } as unknown as State;
    return new EngineGateway(engine, state);
};

describe('plugins/state/EngineGateway', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        spyConsoleWarn.mockRestore();
    });

    describe('findEntity', () => {
        it('should find object by id', () => {
            const mockObject = new Object3D();
            mockObject.userData = { id: 'test-id' };

            const gateway = makeGateway();
            gateway.root.add(mockObject);

            const found = findEntity(gateway, {
                id: 'test-id',
                entityType: 'model',
            });
            expect(found).toBeDefined();
        });

        it('should return undefined for non-existent id', () => {
            const gateway = makeGateway();
            const found = findEntity(gateway, {
                id: 'non-existent',
                entityType: 'model',
            });
            expect(found).toBeUndefined();
        });

        it('should get scene object by id', () => {
            const gateway = makeGateway();
            const mockObject = {
                isObject3D: true,
                userData: {
                    id: 'test-id',
                },
            };
            gateway.root.add(mockObject as any);
            const result = findEntity(gateway, {
                id: 'test-id',
                entityType: 'model',
            });
            expect(result).toBe(mockObject);
        });

        it('should return undefined when object is not found', () => {
            const gateway = makeGateway();
            const result = findEntity(gateway, {
                id: 'non-existent-id',
                entityType: 'model',
            });
            expect(result).toBeUndefined();
        });

        it('should stop traversing when object is found', () => {
            const gateway = makeGateway();
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
            gateway.root.traverse = vi.fn((callback) => {
                traverseCount++;
                callback(mockObject1 as any);
                callback(mockObject2 as any);
            });

            const result = findEntity(gateway, {
                id: 'test-id',
                entityType: 'model',
            });
            expect(result).toBe(mockObject1);
            expect(traverseCount).toBe(1);
        });
    });

    describe('addEntity', () => {
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

            const gateway = makeGateway();
            await gateway.addEntity(sceneLightData);
            await gateway.addEntity(ambientLightData);
            await gateway.addEntity(pointLightData);
            await expect(gateway.addEntity(unknownLightData)).rejects.toThrow(
                'EngineGateway.addEntity: Unknown light type: unknown',
            );

            const sceneLight = findEntity(gateway, sceneLightData);
            const ambientLight = findEntity(gateway, ambientLightData);
            const pointLight = findEntity(gateway, pointLightData);
            const unknownLight = findEntity(gateway, unknownLightData);

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

            const gateway = makeGateway();
            await gateway.addEntity(lightData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();

            const light = findEntity(gateway, lightData);
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

            const gateway = makeGateway();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData);
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

            const gateway = makeGateway();
            await gateway.addEntity(primitiveData);
            const primitive = findEntity(gateway, primitiveData);
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

            const gateway = makeGateway();
            await gateway.addEntity(groupData);
            const group = findEntity(gateway, groupData);
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

            const gateway = makeGateway();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData);
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

            const gateway = makeGateway();
            await gateway.addEntity(primitiveData);
            const primitive = findEntity(gateway, primitiveData);
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

            const gateway = makeGateway();
            await gateway.addEntity(groupData);
            const group = findEntity(gateway, groupData);
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

            const gateway = makeGateway();
            await gateway.addEntity(cameraData);
            // CAMERA objects are not added to the scene
            const camera = findEntity(gateway, cameraData);
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

            const gateway = makeGateway();
            await expect(gateway.addEntity(unknownData)).rejects.toThrow(
                'EngineGateway.addEntity: Unknown entity type: unknown',
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

            const gateway = makeGateway();
            const firstObject = await gateway.addEntity(modelData);
            const duplicateObject = await gateway.addEntity(modelData);

            expect(duplicateObject).toBe(firstObject);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway.addEntity: Scene object with id model-duplicate already exists',
            );
        });
    });

    describe('updateEntity', () => {
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

            const gateway = makeGateway();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData);
            expect(model).toBeDefined();

            const updatedData = {
                ...modelData,
                position: { x: 2, y: 3, z: 4 },
            };

            await gateway.updateEntity(updatedData);
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

            const gateway = makeGateway();
            await gateway.addEntity(lightData);
            const light = findEntity(gateway, lightData);
            expect(light).toBeDefined();

            const updatedData = {
                ...lightData,
                intensity: 2.0,
                color: '#ff0000',
            };

            await gateway.updateEntity(updatedData);
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

            const gateway = makeGateway();
            await gateway.addEntity(primitiveData);
            const primitive = findEntity(gateway, primitiveData);
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

            await gateway.updateEntity(updatedData);
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

            const gateway = makeGateway();
            await gateway.addEntity(groupData);
            const group = findEntity(gateway, groupData);
            expect(group).toBeDefined();

            const updatedData = {
                ...groupData,
                visible: false,
                bbVisible: true,
            };

            await gateway.updateEntity(updatedData);
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

            const gateway = makeGateway();
            await gateway.updateEntity(nonExistentData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway.updateEntity: Scene object with id non-existent does not exist',
            );
        });

        it('should handle CAMERA update', async () => {
            const cameraData = {
                id: 'camera-1',
                entityType: 'camera' as EntityTypeSchema,
                name: 'Test CAMERA',
                visible: true,
            };

            const gateway = makeGateway();
            await gateway.updateEntity(cameraData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway.updateEntity: Scene object with id camera-1 does not exist',
            );
        });

        it('should no-op when updating a found CAMERA object', async () => {
            const cameraData = {
                id: 'camera-1',
                entityType: 'camera' as EntityTypeSchema,
                name: 'Test CAMERA',
                visible: true,
            };

            const gateway = makeGateway();
            const cameraObject = new Object3D();
            cameraObject.userData.id = cameraData.id;
            gateway.root.add(cameraObject);

            await gateway.updateEntity(cameraData);

            expect(spyConsoleWarn).not.toHaveBeenCalled();
            expect(findEntity(gateway, cameraData)).toBe(cameraObject);
        });

        it('should warn for unknown entity type in update', async () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as EntityTypeSchema,
                name: 'Unknown',
            };

            const gateway = makeGateway();
            await gateway.updateEntity(unknownData);
            expect(spyConsoleWarn).toHaveBeenCalled();
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway.updateEntity: Scene object with id unknown does not exist',
            );
        });

        it('should throw for unknown entity type when the object exists', async () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as EntityTypeSchema,
                name: 'Unknown',
            };

            const gateway = makeGateway();
            const existingObject = new Object3D();
            existingObject.userData.id = unknownData.id;
            gateway.root.add(existingObject);

            await expect(gateway.updateEntity(unknownData)).rejects.toThrow(
                'EngineGateway.updateEntity: Unknown entity type: unknown',
            );
        });
    });

    describe('removeEntity', () => {
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

            const gateway = makeGateway();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData);
            expect(model).toBeDefined();

            if (model) {
                model.parent = gateway.root;
                gateway.root.children = [model as unknown as Object3D];
            }

            gateway.removeEntity(modelData);
            const deletedModel = findEntity(gateway, modelData);
            expect(deletedModel).toBeUndefined();
        });

        it('should warn when trying to delete non-existent object', () => {
            const nonExistentData = {
                id: 'non-existent',
                entityType: 'model' as EntityTypeSchema,
                name: 'Non Existent',
                visible: true,
            };

            const gateway = makeGateway();
            gateway.removeEntity(nonExistentData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway.removeEntity: Object with id non-existent not found',
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

            const gateway = makeGateway();
            gateway.removeEntity(cameraData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway.removeEntity: Object with id camera-1 not found',
            );
        });

        it('should remove whatever it finds, whatever the entity type says', () => {
            // Removal does not need to know what kind of thing it is holding:
            // it detaches the gizmo and takes the object out. addEntity is the
            // only side that has to map an entity type onto a class, so the
            // second switch that used to sit here was noise — and it made a
            // camera object, once in the scene, impossible to get rid of.
            const cameraData: CameraSchema = {
                id: 'camera-1',
                entityType: 'camera',
                name: 'Test CAMERA',
                visible: true,
                position: { x: 1, y: 2, z: 3 },
                target: { x: 0, y: 0, z: 0 },
            };

            const gateway = makeGateway();
            const cameraObject = new Object3D();
            cameraObject.userData.id = cameraData.id;
            gateway.root.add(cameraObject);

            gateway.removeEntity(cameraData);

            expect(spyConsoleWarn).not.toHaveBeenCalled();
            expect(findEntity(gateway, cameraData)).toBeUndefined();
        });

        it('should remove an object whose entity type it does not recognise', () => {
            const unknownData = {
                id: 'unknown',
                entityType: 'unknown' as EntityTypeSchema,
                name: 'Unknown',
            };

            const gateway = makeGateway();
            const stranger = new Object3D();
            stranger.userData.id = 'unknown';
            gateway.root.add(stranger);

            gateway.removeEntity(unknownData);

            expect(findEntity(gateway, unknownData)).toBeUndefined();
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

            const gateway = makeGateway();
            await gateway.addEntity(groupData);
            await gateway.addEntity(memberData);

            const group = findEntity(gateway, groupData);
            const member = findEntity(gateway, memberData);

            expect(group).toBeDefined();
            expect(member).toBeDefined();

            if (group && member) {
                (group as any).members = [member];
                group.parent = gateway.root;
            }

            gateway.removeEntity(groupData);
            expect(gateway.root.attach).toHaveBeenCalledWith(member);
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

            const mockScene = Object.assign(new Object3D(), {
                isDIVEScene: true,
            });
            mockScene.children = [mockTransformControls];

            const gateway = makeGateway();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData);
            expect(model).toBeDefined();

            if (model) {
                model.parent = gateway.root;
                gateway.root.parent = mockScene;
            }

            gateway.removeEntity(modelData);
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

            const mockScene = Object.assign(new Object3D(), {
                isDIVEScene: true,
            });
            mockScene.children = [mockTransformControls];

            const gateway = makeGateway();
            await gateway.addEntity(primitiveData);
            const primitive = findEntity(gateway, primitiveData);
            expect(primitive).toBeDefined();

            if (primitive) {
                primitive.parent = gateway.root;
                gateway.root.parent = mockScene;
            }

            gateway.removeEntity(primitiveData);
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

            const mockScene = Object.assign(new Object3D(), {
                isDIVEScene: true,
            });
            mockScene.children = [mockTransformControls];

            const gateway = makeGateway();
            await gateway.addEntity(groupData);
            const group = findEntity(gateway, groupData);
            expect(group).toBeDefined();

            if (group) {
                group.parent = gateway.root;
                gateway.root.parent = mockScene;
                (group as any).members = [new Object3D()];
            }

            gateway.removeEntity(groupData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
            expect(gateway.root.attach).toHaveBeenCalled();
        });
    });

    describe('_setParent', () => {
        it('should warn when the entity itself is not in the scene', () => {
            // reachable through a patch that carries a parentId for an id that
            // was never added
            const gateway = makeGateway();

            gateway['_setParent']({
                id: 'ghost',
                entityType: 'model',
                parentId: null,
            });

            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway._setParent: ghost is not in the scene',
            );
        });

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

            const gateway = makeGateway();
            await gateway.addEntity(parentData);
            await gateway.addEntity(childData);

            const parent = findEntity(gateway, parentData);
            const child = findEntity(gateway, childData);

            expect(parent).toBeDefined();
            expect(child).toBeDefined();
            expect(parent?.attach).toHaveBeenCalled();
        });

        it('should attach to gateway when parent is null', async () => {
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

            const gateway = makeGateway();
            await gateway.addEntity(childData);
            const child = findEntity(gateway, childData);
            expect(child).toBeDefined();
            expect(gateway.root.attach).toHaveBeenCalled();
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

            const gateway = makeGateway();
            await gateway.addEntity(childData);
            const child = findEntity(gateway, childData);
            expect(child).toBeDefined();
            // When parent doesn't exist, the object should remain where it is
            expect(gateway.root.attach).not.toHaveBeenCalled();
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

            const gateway = makeGateway();
            // Don't add the object to the scene
            await gateway.updateEntity(modelData);
            expect(gateway.root.attach).not.toHaveBeenCalled();
        });
    });

    describe('_applyLight', () => {
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

            const gateway = makeGateway();
            await gateway.addEntity(lightData as LightSchema);
            const light = findEntity(gateway, lightData);
            expect(light).toBeDefined();
        });

        it('should only touch the fields a patch carries', async () => {
            const gateway = makeGateway();
            await gateway.addEntity({
                id: 'light-1',
                entityType: 'light',
                type: 'point',
                name: 'Lamp',
                intensity: 2,
            } as LightSchema);

            const light = findEntity(gateway, {
                id: 'light-1',
                entityType: 'light',
            }) as any;
            light.setIntensity.mockClear();
            light.setColor.mockClear();
            light.setEnabled.mockClear();

            await gateway.updateEntity({
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
        const addModel = async (
            gateway: EngineGateway,
            uri: string,
        ): Promise<any> => {
            await gateway.addEntity({
                id: 'model-1',
                entityType: 'model',
                name: 'M',
                uri,
            } as ModelSchema);

            return findEntity(gateway, {
                id: 'model-1',
                entityType: 'model',
            }) as any;
        };

        it('should load the asset when the model is added', async () => {
            const gateway = makeGateway();
            const model = await addModel(gateway, 'a.glb');

            expect(model.setFromURL).toHaveBeenCalledWith('a.glb');
            expect(model.userData.uri).toBe('a.glb');
        });

        it('should not fetch the asset again when the uri is unchanged', async () => {
            const gateway = makeGateway();
            const model = await addModel(gateway, 'a.glb');
            model.setFromURL.mockClear();

            await gateway.updateEntity({
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
            const gateway = makeGateway();
            const model = await addModel(gateway, 'a.glb');
            model.setFromURL.mockClear();

            await gateway.updateEntity({
                id: 'model-1',
                entityType: 'model',
                uri: 'b.glb',
            });

            expect(model.setFromURL).toHaveBeenCalledWith('b.glb');
            expect(model.userData.uri).toBe('b.glb');
        });
    });

    describe('removing a light', () => {
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

            const mockScene = Object.assign(new Object3D(), {
                isDIVEScene: true,
            });
            mockScene.children = [mockTransformControls];

            const gateway = makeGateway();
            await gateway.addEntity(lightData);
            const light = findEntity(gateway, lightData);
            expect(light).toBeDefined();

            if (light) {
                light.parent = gateway.root;
                gateway.root.parent = mockScene;
            }

            gateway.removeEntity(lightData);
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

            const gateway = makeGateway();
            gateway.removeEntity(lightData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway.removeEntity: Object with id non-existent-light not found',
            );
        });
    });

    describe('removing a group', () => {
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

            const mockScene = Object.assign(new Object3D(), {
                isDIVEScene: true,
            });
            mockScene.children = [mockTransformControls];

            const gateway = makeGateway();
            await gateway.addEntity(groupData);
            const group = findEntity(gateway, groupData);
            expect(group).toBeDefined();

            if (group) {
                group.parent = gateway.root;
                gateway.root.parent = mockScene;
                (group as any).members = [new Object3D()];
            }

            gateway.removeEntity(groupData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
            expect(gateway.root.attach).toHaveBeenCalled();
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

            const gateway = makeGateway();
            gateway.removeEntity(groupData);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway.removeEntity: Object with id non-existent-group not found',
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

            const gateway = makeGateway();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData);
            expect(model).toBeDefined();
            expect(gateway.root.attach).toHaveBeenCalled();
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

            const gateway = makeGateway();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData);
            expect(model).toBeDefined();
            expect(gateway.root.attach).not.toHaveBeenCalled();
        });
    });

    describe('_applyModel', () => {
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

            const gateway = makeGateway();
            await gateway.addEntity(modelData as ModelSchema);
            const model = findEntity(gateway, modelData);
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

            const gateway = makeGateway();
            await gateway.addEntity(modelData as ModelSchema);
            const model = findEntity(gateway, modelData);
            expect(model).toBeDefined();
        });
    });

    describe('_applyPrimitive', () => {
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

            const gateway = makeGateway();
            await gateway.addEntity(primitiveData as PrimitiveSchema);
            const primitive = findEntity(gateway, primitiveData);
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

            const gateway = makeGateway();
            await gateway.addEntity(primitiveData as PrimitiveSchema);
            const primitive = findEntity(gateway, primitiveData);
            expect(primitive).toBeDefined();
        });
    });

    describe('removing a primitive', () => {
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

            const gateway = makeGateway();
            gateway.removeEntity(primitiveData);
            expect(spyConsoleWarn).toHaveBeenCalled();
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway.removeEntity: Object with id non-existent-primitive not found',
            );
        });
    });

    describe('scene settings', () => {
        // These used to be spelled out three times — in updatescene, setstate
        // and getstate — and had already drifted: setstate never applied
        // gridEnabled.

        const makeSceneGateway = () => {
            const floor = {
                visible: false,
                material: { color: { getHexString: () => 'abcdef' } },
                setVisibility: vi.fn(),
                setColor: vi.fn(),
            };
            const scene = {
                name: 'Scene',
                background: { getHexString: () => '112233' },
                grid: { visible: true, setVisibility: vi.fn() },
                setBackground: vi.fn(),
                root: { floor },
            };
            const gateway = new EngineGateway(
                { scene } as unknown as DIVE,
                { performAction: vi.fn() } as unknown as State,
            );
            return { gateway, scene, floor };
        };

        it('should read every property off the scene', () => {
            const { gateway } = makeSceneGateway();

            expect(gateway.readSceneSettings()).toEqual({
                name: 'Scene',
                backgroundColor: '#112233',
                gridEnabled: true,
                floorEnabled: false,
                floorColor: '#abcdef',
            });
        });

        it('should write every property, grid included', () => {
            const { gateway, scene, floor } = makeSceneGateway();

            gateway.applySceneSettings({
                name: 'New',
                backgroundColor: '#ff0000',
                gridEnabled: false,
                floorEnabled: true,
                floorColor: '#00ff00',
            });

            expect(scene.name).toBe('New');
            expect(scene.setBackground).toHaveBeenCalledWith('#ff0000');
            expect(scene.grid.setVisibility).toHaveBeenCalledWith(false);
            expect(floor.setVisibility).toHaveBeenCalledWith(true);
            expect(floor.setColor).toHaveBeenCalledWith('#00ff00');
        });

        it('should leave out what the patch does not carry', () => {
            const { gateway, scene, floor } = makeSceneGateway();

            gateway.applySceneSettings({ name: 'Only the name' });

            expect(scene.name).toBe('Only the name');
            expect(scene.setBackground).not.toHaveBeenCalled();
            expect(scene.grid.setVisibility).not.toHaveBeenCalled();
            expect(floor.setVisibility).not.toHaveBeenCalled();
            expect(floor.setColor).not.toHaveBeenCalled();
        });

        it('should accept a numeric colour as well as a string', () => {
            const { gateway, scene, floor } = makeSceneGateway();

            gateway.applySceneSettings({
                backgroundColor: 0xff0000,
                floorColor: 0x00ff00,
            });

            expect(scene.setBackground).toHaveBeenCalledWith(0xff0000);
            expect(floor.setColor).toHaveBeenCalledWith(0x00ff00);
        });
    });

    describe('wiring objects to the state', () => {
        const modelData: ModelSchema = {
            id: 'model-1',
            entityType: 'model',
            name: 'M',
            visible: true,
            uri: 'a.glb',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            loaded: false,
            parentId: null,
        };

        /** A gateway whose listeners are the real ones, over a spying State. */
        const makeWired = () => {
            const performAction = vi.fn();
            const gateway = new EngineGateway(
                {
                    scene: { root: new DIVERoot() },
                } as unknown as DIVE,
                { performAction } as unknown as State,
            );
            return { gateway, performAction };
        };

        /** Replays what the object would have dispatched. */
        const fire = (
            object: MockedSceneObject,
            type: string,
            payload: object = {},
        ): void => {
            object.addEventListener.mock.calls
                .filter((call: unknown[]) => call[0] === type)
                .forEach((call: unknown[]) =>
                    (call[1] as (e: object) => void)({ type, ...payload }),
                );
        };

        it('should subscribe before the schema is applied', async () => {
            // applying a model schema awaits setFromURL, and object-load fires
            // in there — listening afterwards would miss it
            const { gateway } = makeWired();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData)!;

            const order = (name: string): number =>
                model[name].mock.invocationCallOrder[0];

            expect(order('addEventListener')).toBeLessThan(order('setFromURL'));
        });

        it('should turn a reported transform into one UPDATE_OBJECT', async () => {
            const { gateway, performAction } = makeWired();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData)!;

            fire(model, 'object-transform', {
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            });

            const updates = performAction.mock.calls.filter(
                (call) => call[0] === 'UPDATE_OBJECT',
            );
            expect(updates).toHaveLength(1);
            expect(updates[0][1]).toEqual({
                id: 'model-1',
                entityType: 'model',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            });
        });

        it('should copy the reported vectors', async () => {
            // the object hands out a scratch buffer it overwrites next frame,
            // and UPDATE_OBJECT merges the payload straight into the registry
            const { gateway, performAction } = makeWired();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData)!;

            const live = { x: 1, y: 2, z: 3 };
            fire(model, 'object-transform', {
                position: live,
                rotation: live,
                scale: live,
            });

            const sent = performAction.mock.calls.find(
                (call) => call[0] === 'UPDATE_OBJECT',
            )![1];
            expect(sent.position).not.toBe(live);

            live.x = 999;
            expect(sent.position.x).toBe(1);
        });

        it('should report a model load', async () => {
            const { gateway, performAction } = makeWired();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData)!;

            fire(model, 'object-load');

            expect(performAction).toHaveBeenCalledWith('MODEL_LOADED', {
                id: 'model-1',
            });
        });

        it('should not select the same object twice', async () => {
            // SELECT_OBJECT runs selectionState.select(), which calls back into
            // onSelect() — without the guard that loops
            const { gateway, performAction } = makeWired();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData)!;

            fire(model, 'object-select');
            fire(model, 'object-select');

            expect(
                performAction.mock.calls.filter(
                    (call) => call[0] === 'SELECT_OBJECT',
                ),
            ).toHaveLength(1);
        });

        it('should deselect only what is actually selected', async () => {
            const { gateway, performAction } = makeWired();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData)!;

            fire(model, 'object-deselect');
            expect(performAction).not.toHaveBeenCalledWith(
                'DESELECT_OBJECT',
                expect.anything(),
            );

            fire(model, 'object-select');
            fire(model, 'object-deselect');
            expect(performAction).toHaveBeenCalledWith('DESELECT_OBJECT', {
                id: 'model-1',
                entityType: 'model',
            });
        });

        it('should allow selecting again after a deselect', async () => {
            const { gateway, performAction } = makeWired();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData)!;

            fire(model, 'object-select');
            fire(model, 'object-deselect');
            fire(model, 'object-select');

            expect(
                performAction.mock.calls.filter(
                    (call) => call[0] === 'SELECT_OBJECT',
                ),
            ).toHaveLength(2);
        });

        it('should stop listening once the object is removed', async () => {
            const { gateway } = makeWired();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData)!;
            model.parent = gateway.root;

            gateway.removeEntity(modelData);

            const removed = model.removeEventListener.mock.calls.map(
                (call: unknown[]) => call[0],
            );
            expect(removed).toEqual(
                expect.arrayContaining([
                    'object-transform',
                    'object-select',
                    'object-deselect',
                    'object-load',
                ]),
            );
        });

        it('should forget the selection when the selected object is removed', async () => {
            // otherwise the id stays in _selectedId and an object added again
            // under the same id could never be selected
            const { gateway, performAction } = makeWired();
            await gateway.addEntity(modelData);
            fire(findEntity(gateway, modelData)!, 'object-select');
            findEntity(gateway, modelData)!.parent = gateway.root;

            gateway.removeEntity(modelData);

            await gateway.addEntity(modelData);
            fire(findEntity(gateway, modelData)!, 'object-select');

            expect(
                performAction.mock.calls.filter(
                    (call) => call[0] === 'SELECT_OBJECT',
                ),
            ).toHaveLength(2);
        });

        it('should drop every subscription on dispose', async () => {
            const { gateway } = makeWired();
            await gateway.addEntity(modelData);
            const model = findEntity(gateway, modelData)!;

            gateway.dispose();

            expect(model.removeEventListener).toHaveBeenCalledTimes(4);
        });

        it('should not wire a camera, because it never enters the scene', async () => {
            const { gateway } = makeWired();

            const result = await gateway.addEntity({
                id: 'camera-1',
                entityType: 'camera',
                name: 'C',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                target: { x: 0, y: 0, z: 0 },
            } as CameraSchema);

            expect(result).toBeUndefined();
        });
    });

    describe('engine control', () => {
        const makeControllable = () => {
            const clock = {
                hasTicker: vi.fn(() => false),
                addTicker: vi.fn(),
            };
            const startAsync = vi.fn().mockResolvedValue(undefined);
            const gateway = new EngineGateway(
                {
                    scene: { root: new DIVERoot() },
                    clock,
                    startAsync,
                } as unknown as DIVE,
                { performAction: vi.fn() } as unknown as State,
            );
            return { gateway, clock, startAsync };
        };

        it('should start the engine', async () => {
            const { gateway, startAsync } = makeControllable();

            await gateway.startRendering();

            expect(startAsync).toHaveBeenCalledTimes(1);
        });

        it('should add a ticker the clock does not have yet', () => {
            const { gateway, clock } = makeControllable();
            const ticker = { tick: vi.fn() };

            gateway.registerTicker(ticker as never);

            expect(clock.addTicker).toHaveBeenCalledWith(ticker);
        });

        it('should not add a ticker twice', () => {
            // MOVE_CAMERA registers the animation system on every call, so the
            // guard is what keeps one ticker from running several times
            const { gateway, clock } = makeControllable();
            clock.hasTicker.mockReturnValue(true);
            const ticker = { tick: vi.fn() };

            gateway.registerTicker(ticker as never);

            expect(clock.addTicker).not.toHaveBeenCalled();
        });
    });
});
