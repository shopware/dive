import { EngineGateway } from '../EngineGateway.ts';
import {
    detachTransformControls,
    AmbientLightComponent,
    BoundingBoxComponent,
    DirectionalLightComponent,
    DIVELightComponent,
    DIVENode,
    DIVERoot,
    DIVEGeometryType,
    HemisphereLightComponent,
    MultiLineComponent,
    MeshComponent,
    PointLightComponent,
    PrimitiveComponent,
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

/**
 * `three/webgpu` is deliberately NOT mocked. DIVENode and DIVEComponent both
 * rely on real Object3D behaviour -- the `childadded`/`childremoved` and
 * `added`/`removed` events are what keeps the component registry and the tick
 * enrolment in sync -- and a hand-rolled stand-in with `addEventListener:
 * vi.fn()` silently drops all of it.
 */

/**
 * The asset loader is mocked, not the mesh component: model entities now use the
 * real `MeshComponent`, and only the network fetch has to be replaced.
 */
const loadAsset = vi.fn(async () => {
    const { Object3D, Mesh, BoxGeometry, MeshStandardMaterial } =
        await vi.importActual<typeof import('three/webgpu')>('three/webgpu');
    const gltf = new Object3D();
    gltf.add(new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial()));
    return gltf;
});

vi.mock('@shopware-ag/dive/assetloader', () => ({
    AssetLoader: vi.fn(function (this: Record<string, unknown>) {
        this.load = loadAsset;
        return this;
    }),
}));

/**
 * The component mocks below all build on a REAL `Object3D` rather than a
 * hand-rolled object literal. DIVENode keeps its component registry and its tick
 * enrolment in sync through three's own `childadded`/`added` events, and
 * `findEntity` walks the tree with a real `traverse`, so a stand-in without that
 * machinery silently breaks both. The spies are kept so assertions can still
 * observe which setters the gateway called.
 */
/**
 * Puts an object into the gateway's entity registry by hand.
 *
 * For the cases `addEntity` cannot produce -- a camera creates no scene object,
 * an unknown entity type is rejected -- but where the gateway still has to cope
 * with finding something under that id.
 */
const registerRaw = (
    gateway: EngineGateway,
    id: string,
    object: Object3D,
): void => {
    object.userData.id = id;
    gateway.root.add(object);
    (gateway as unknown as { _entities: Map<string, Object3D> })._entities.set(
        id,
        object,
    );
};

/** Compares a three vector/euler by component, sidestepping -0 vs 0. */
const expectVec = (
    actual: { x: number; y: number; z: number } | undefined,
    expected: { x: number; y: number; z: number },
): void => {
    expect(actual?.x).toBeCloseTo(expected.x);
    expect(actual?.y).toBeCloseTo(expected.y);
    expect(actual?.z).toBeCloseTo(expected.z);
};

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

/**
 * Creates an entity and applies its data, which is what `ADD_OBJECT` does.
 *
 * The gateway splits the two so a listener can be attached in between; these
 * tests only care about the result, so they do both at once.
 */
const addEntity = async (
    gateway: EngineGateway,
    entity: EntitySchema,
): Promise<DIVESceneObject | undefined> => {
    const node = gateway.createEntity(entity);
    if (node) await gateway.applyEntity(node, entity);

    return node;
};

const makeGateway = (): EngineGateway => {
    const scene = Object.assign(new Object3D(), {
        root: new DIVERoot(),
        grid: { visible: true, setVisibility: vi.fn() },
        background: new Color(0x000000),
        setBackground: vi.fn(),
    });
    const engine = { scene } as unknown as DIVE;
    return new EngineGateway(engine);
};

describe('plugins/state/EngineGateway', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        spyConsoleWarn.mockRestore();
    });

    describe('findEntity', () => {
        it('should find an entity the gateway created', async () => {
            const gateway = makeGateway();
            await addEntity(gateway, {
                id: 'test-id',
                entityType: 'group',
                name: 'G',
                visible: true,
            } as GroupSchema);

            const found = findEntity(gateway, {
                id: 'test-id',
                entityType: 'group',
            });
            expect(found).toBeDefined();
        });

        it('should not find an object that was added to the tree directly', () => {
            /**
             * findEntity is registry-backed rather than a tree walk, so it only
             * reports things the gateway itself turned into entities
             */
            const gateway = makeGateway();
            const stranger = new Object3D();
            stranger.userData.id = 'smuggled';
            gateway.root.add(stranger);

            expect(
                findEntity(gateway, { id: 'smuggled', entityType: 'model' }),
            ).toBeUndefined();
        });

        it('should return undefined for non-existent id', () => {
            const gateway = makeGateway();
            const found = findEntity(gateway, {
                id: 'non-existent',
                entityType: 'model',
            });
            expect(found).toBeUndefined();
        });

        it('should get scene object by id', async () => {
            const gateway = makeGateway();
            const added = await addEntity(gateway, {
                id: 'test-id',
                entityType: 'group',
                name: 'G',
                visible: true,
            } as GroupSchema);

            const result = findEntity(gateway, {
                id: 'test-id',
                entityType: 'group',
            });
            expect(result).toBe(added);
        });

        it('should return undefined when object is not found', () => {
            const gateway = makeGateway();
            const result = findEntity(gateway, {
                id: 'non-existent-id',
                entityType: 'model',
            });
            expect(result).toBeUndefined();
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
            await addEntity(gateway, lightData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();

            const light = findEntity(gateway, lightData);
            expect(light).toBeDefined();
            expect(light?.name).toBe('Test Light');
            expect(light?.position.x).toBe(1);
            expect(light?.position.y).toBe(2);
            expect(light?.position.z).toBe(3);
            expect(light?.visible).toBe(true);

            /**
             * a point light node carries one light component, and the schema
             * values land on the three light it owns
             */
            const component = (light as DIVENode).requireComponent(
                PointLightComponent,
            );
            expect(component.light.intensity).toBe(1.0);
            expect(component.light.visible).toBe(true);
            expect((component.light.color as Color).getHexString()).toBe(
                'ffffff',
            );
        });

        it('should compose a scene light from two light components', () => {
            const gateway = makeGateway();
            const node = gateway['_instantiate']({
                id: 'light-scene',
                entityType: 'light',
                type: 'scene',
                name: 'Scene Light',
                visible: true,
                intensity: 1,
                enabled: true,
                color: '#ffffff',
            } as LightSchema) as DIVENode;

            expect(node.getComponents(DIVELightComponent)).toHaveLength(2);
            expect(node.getComponent(HemisphereLightComponent)).toBeDefined();
            expect(node.getComponent(DirectionalLightComponent)).toBeDefined();
        });

        it('should give an ambient light one ambient component', async () => {
            // the one light type no test had reached through the gateway
            const lightData: LightSchema = {
                id: 'light-ambient',
                entityType: 'light',
                type: 'ambient',
                name: 'Ambient',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                intensity: 0.5,
                enabled: true,
                color: '#ff0000',
                parentId: null,
            };

            const gateway = makeGateway();
            await addEntity(gateway, lightData);
            expect(spyConsoleWarn).not.toHaveBeenCalled();

            const node = findEntity(gateway, lightData) as DIVENode;
            expect(node.getComponents(DIVELightComponent)).toHaveLength(1);

            const component = node.requireComponent(AmbientLightComponent);
            expect(component.light.intensity).toBe(0.5);
            expect((component.light.color as Color).getHexString()).toBe(
                'ff0000',
            );
        });

        it('should apply intensity to every light component with its own factor', () => {
            const gateway = makeGateway();
            const node = gateway['_instantiate']({
                id: 'light-scene',
                entityType: 'light',
                type: 'scene',
            } as LightSchema) as DIVENode;

            gateway['_applyLight'](node, {
                id: 'light-scene',
                entityType: 'light',
                intensity: 2,
            } as never);

            // the factors that used to be hard-coded in DIVESceneLight
            expect(
                node.requireComponent(HemisphereLightComponent).light.intensity,
            ).toBe(4);
            expect(
                node.requireComponent(DirectionalLightComponent).light
                    .intensity,
            ).toBe(6);
        });

        it('should throw when the light type is unknown', () => {
            const gateway = makeGateway();

            expect(() =>
                gateway['_instantiate']({
                    id: 'light-bogus',
                    entityType: 'light',
                    type: 'sunbeam',
                } as unknown as LightSchema),
            ).toThrow(/Unknown light type/);
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
            await addEntity(gateway, modelData);
            const model = findEntity(gateway, modelData);
            expect(model).toBeDefined();
            expect(model?.name).toBe('Test Model');
            expectVec(model?.position, modelData.position);
            expectVec(model?.rotation, modelData.rotation);
            expectVec(model?.scale, modelData.scale);
            expect(model?.visible).toBe(modelData.visible);
            expect(
                model
                    ?.requireComponent(MeshComponent)
                    .material?.color.getHexString(),
            ).toBe('ffffff');
        });

        it('should write the transform after the asset, not before', async () => {
            /**
             * setFromGLTF copies the glTF root's transform onto the node, so a
             * transform written before the asset arrives is thrown away
             */
            const { Object3D } =
                await vi.importActual<typeof import('three/webgpu')>(
                    'three/webgpu',
                );
            const gltf = new Object3D();
            gltf.position.set(9, 9, 9);
            loadAsset.mockResolvedValueOnce(gltf);

            const modelData: ModelSchema = {
                id: 'model-late',
                entityType: 'model',
                name: 'M',
                visible: true,
                uri: 'test.glb',
                position: { x: 1, y: 2, z: 3 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
                parentId: null,
            };

            const gateway = makeGateway();
            await addEntity(gateway, modelData);

            // the schema wins, not the asset
            expectVec(findEntity(gateway, modelData)?.position, {
                x: 1,
                y: 2,
                z: 3,
            });
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
            await addEntity(gateway, primitiveData);
            const primitive = findEntity(gateway, primitiveData);
            expect(primitive).toBeDefined();
            expect(primitive?.name).toBe('Test Primitive');
            expect(
                primitive?.requireComponent(PrimitiveComponent).mesh?.geometry
                    .attributes.position,
            ).toBeDefined();
            expectVec(primitive?.position, primitiveData.position);
            expectVec(primitive?.rotation, primitiveData.rotation);
            expectVec(primitive?.scale, primitiveData.scale);
            expect(primitive?.visible).toBe(primitiveData.visible);
            expect(
                primitive
                    ?.requireComponent(MeshComponent)
                    .material?.color.getHexString(),
            ).toBe('ffffff');
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
                linksVisible: true,
                parentId: null,
            };

            const gateway = makeGateway();
            await addEntity(gateway, groupData);
            const group = findEntity(gateway, groupData);
            expect(group).toBeDefined();
            expect(group?.name).toBe('Test Group');
            expectVec(group?.position, groupData.position);
            expectVec(group?.rotation, groupData.rotation);
            expectVec(group?.scale, groupData.scale);
            expect(group?.visible).toBe(groupData.visible);
            // all member lines share one LineSegments, so one flag covers them
            expect(
                group?.requireComponent(MultiLineComponent).lines.visible,
            ).toBe(groupData.linksVisible);
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
            await addEntity(gateway, modelData);
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
            await addEntity(gateway, primitiveData);
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
            await addEntity(gateway, groupData);
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
            await addEntity(gateway, cameraData);
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
            await expect(addEntity(gateway, unknownData)).rejects.toThrow(
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
            const firstObject = await addEntity(gateway, modelData);
            const duplicateObject = await addEntity(gateway, modelData);

            expect(duplicateObject).toBe(firstObject);
            expect(spyConsoleWarn).toHaveBeenCalledWith(
                'EngineGateway.createEntity: Scene object with id model-duplicate already exists',
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
            await addEntity(gateway, modelData);
            const model = findEntity(gateway, modelData);
            expect(model).toBeDefined();

            const updatedData = {
                ...modelData,
                position: { x: 2, y: 3, z: 4 },
            };

            await gateway.updateEntity(updatedData);
            expectVec(model?.position, updatedData.position);
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
            await addEntity(gateway, lightData);
            const light = findEntity(gateway, lightData);
            expect(light).toBeDefined();

            const updatedData = {
                ...lightData,
                intensity: 2.0,
                color: '#ff0000',
            };

            await gateway.updateEntity(updatedData);

            const component = (light as DIVENode).requireComponent(
                PointLightComponent,
            );
            expect(component.light.intensity).toBe(2.0);
            expect((component.light.color as Color).getHexString()).toBe(
                'ff0000',
            );
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
            await addEntity(gateway, primitiveData);
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
            expect(
                (primitive as DIVENode).requireComponent(PrimitiveComponent)
                    .mesh?.geometry.attributes.position,
            ).toBeDefined();
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
            await addEntity(gateway, groupData);
            const group = findEntity(gateway, groupData);
            expect(group).toBeDefined();

            const updatedData = {
                ...groupData,
                visible: false,
                linksVisible: true,
            };

            await gateway.updateEntity(updatedData);
            expect((group as DIVENode).visible).toBe(false);
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
            registerRaw(gateway, cameraData.id, cameraObject);

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
            registerRaw(gateway, unknownData.id, new Object3D());

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
            await addEntity(gateway, modelData);
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
            registerRaw(gateway, cameraData.id, cameraObject);

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
            await addEntity(gateway, groupData);
            await addEntity(gateway, memberData);

            const group = findEntity(gateway, groupData);
            const member = findEntity(gateway, memberData);

            expect(group).toBeDefined();
            expect(member).toBeDefined();

            if (group && member) {
                (group as any).members = [member];
                group.parent = gateway.root;
            }

            gateway.removeEntity(groupData);
            // members are re-parented to the root rather than deleted with the group
            expect(member!.parent).toBe(gateway.root);
        });

        it('should free the GPU resources its components held', async () => {
            /**
             * unparenting alone leaks: the detached node is out of the graph, so
             * the final Scene.dispose can no longer find it to dispose it
             */
            const modelData: ModelSchema = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
            };

            const gateway = makeGateway();
            await addEntity(gateway, modelData);
            const model = findEntity(gateway, modelData) as unknown as DIVENode;
            const disposals = model.components.map((component) =>
                vi.spyOn(component, 'dispose'),
            );
            expect(disposals.length).toBeGreaterThan(0);

            gateway.removeEntity(modelData);

            disposals.forEach((dispose) => expect(dispose).toHaveBeenCalled());
        });

        it('should free the resources of nodes it takes down with it', async () => {
            /**
             * direct child nodes are re-parented to the root and survive, so what
             * goes down with the entity is whatever hangs below a plain Object3D
             * -- and its components have to be disposed too
             */
            const modelData: ModelSchema = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
            };

            const gateway = makeGateway();
            await addEntity(gateway, modelData);
            const model = findEntity(gateway, modelData) as unknown as DIVENode;

            const wrapper = new Object3D();
            const nested = new DIVENode();
            const nestedComponent = nested.addComponent(
                new BoundingBoxComponent(),
            );
            wrapper.add(nested);
            model.add(wrapper);
            const disposed = vi.spyOn(nestedComponent, 'dispose');

            gateway.removeEntity(modelData);

            expect(disposed).toHaveBeenCalled();
        });

        it('should keep the resources of the child nodes it hands to the root', async () => {
            // they survive the deletion, so disposing them would break them
            const groupData = {
                id: 'group-1',
                entityType: 'group' as const,
                name: 'Test Group',
                visible: true,
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            } as unknown as EntitySchema;

            const gateway = makeGateway();
            await addEntity(gateway, groupData);
            const group = findEntity(gateway, groupData) as unknown as DIVENode;

            const member = new DIVENode();
            const memberComponent = member.addComponent(
                new BoundingBoxComponent(),
            );
            group.add(member);
            const disposed = vi.spyOn(memberComponent, 'dispose');

            gateway.removeEntity(groupData);

            expect(member.parent).toBe(gateway.root);
            expect(disposed).not.toHaveBeenCalled();
        });

        it('should cope with a node that was already unparented', async () => {
            // `parent!.remove(...)` threw on a node someone detached elsewhere
            const modelData: ModelSchema = {
                id: 'model-1',
                entityType: 'model',
                name: 'Test Model',
                visible: true,
                uri: 'test.glb',
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
                loaded: false,
            };

            const gateway = makeGateway();
            await addEntity(gateway, modelData);
            const model = findEntity(gateway, modelData)!;
            model.removeFromParent();

            expect(() => gateway.removeEntity(modelData)).not.toThrow();
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
            await addEntity(gateway, modelData);
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
            await addEntity(gateway, primitiveData);
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
            await addEntity(gateway, groupData);
            const group = findEntity(gateway, groupData);
            expect(group).toBeDefined();

            const member = new DIVENode();
            if (group) {
                gateway.root.parent = mockScene;
                group.add(member);
            }

            gateway.removeEntity(groupData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
            // the member outlives the group at the root
            expect(member.parent).toBe(gateway.root);
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
            await addEntity(gateway, parentData);
            await addEntity(gateway, childData);

            const parent = findEntity(gateway, parentData);
            const child = findEntity(gateway, childData);

            expect(parent).toBeDefined();
            expect(child).toBeDefined();
            expect(child?.parent).toBe(parent);
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
            await addEntity(gateway, childData);
            const child = findEntity(gateway, childData);
            expect(child).toBeDefined();
            expect(child?.parent).toBe(gateway.root);
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
            await addEntity(gateway, childData);
            const child = findEntity(gateway, childData);
            expect(child).toBeDefined();
            // When parent doesn't exist, the object should remain where it is
            expect(child?.parent).toBe(gateway.root);
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
            // nothing to re-parent, so the root gained no model
            expect(
                gateway.root.children.some(
                    (child) => child.userData.id === modelData.id,
                ),
            ).toBe(false);
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
            await addEntity(gateway, lightData as LightSchema);
            const light = findEntity(gateway, lightData);
            expect(light).toBeDefined();
        });

        it('should only touch the fields a patch carries', async () => {
            const gateway = makeGateway();
            await addEntity(gateway, {
                id: 'light-1',
                entityType: 'light',
                type: 'point',
                name: 'Lamp',
                intensity: 2,
            } as LightSchema);

            const light = findEntity(gateway, {
                id: 'light-1',
                entityType: 'light',
            }) as DIVENode;
            const component = light.requireComponent(PointLightComponent);

            const setIntensity = vi.spyOn(component, 'setIntensity');
            const setColor = vi.spyOn(component, 'setColor');
            const setEnabled = vi.spyOn(component, 'setEnabled');

            await gateway.updateEntity({
                id: 'light-1',
                entityType: 'light',
                name: 'Renamed',
            });

            expect(light.name).toBe('Renamed');
            // absent means unchanged, so no other setter runs
            expect(setIntensity).not.toHaveBeenCalled();
            expect(setColor).not.toHaveBeenCalled();
            expect(setEnabled).not.toHaveBeenCalled();
        });
    });

    describe('model asset loading', () => {
        const addModel = async (
            gateway: EngineGateway,
            uri: string,
        ): Promise<any> => {
            await addEntity(gateway, {
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

            expect(loadAsset).toHaveBeenCalledWith('a.glb');
            expect(model.userData.uri).toBe('a.glb');
        });

        it('should not fetch the asset again when the uri is unchanged', async () => {
            const gateway = makeGateway();
            const model = await addModel(gateway, 'a.glb');
            loadAsset.mockClear();

            await gateway.updateEntity({
                id: 'model-1',
                entityType: 'model',
                uri: 'a.glb',
                position: { x: 1, y: 2, z: 3 },
            });

            expect(loadAsset).not.toHaveBeenCalled();
            // the rest of the patch still applies
            expectVec(model.position, { x: 1, y: 2, z: 3 });
        });

        it('should fetch the asset when the uri changed', async () => {
            const gateway = makeGateway();
            const model = await addModel(gateway, 'a.glb');
            loadAsset.mockClear();

            await gateway.updateEntity({
                id: 'model-1',
                entityType: 'model',
                uri: 'b.glb',
            });

            expect(loadAsset).toHaveBeenCalledWith('b.glb');
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
            await addEntity(gateway, lightData);
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
            await addEntity(gateway, groupData);
            const group = findEntity(gateway, groupData);
            expect(group).toBeDefined();

            const member = new DIVENode();
            if (group) {
                gateway.root.parent = mockScene;
                group.add(member);
            }

            gateway.removeEntity(groupData);
            expect(mockTransformControls.detach).toHaveBeenCalled();
            // the member outlives the group at the root
            expect(member.parent).toBe(gateway.root);
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
            await addEntity(gateway, modelData);
            const model = findEntity(gateway, modelData);
            expect(model).toBeDefined();
            expect(model?.parent).toBe(gateway.root);
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
            await addEntity(gateway, modelData);
            const model = findEntity(gateway, modelData);
            expect(model).toBeDefined();
            expect(model?.parent).toBe(gateway.root);
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
            await addEntity(gateway, modelData as ModelSchema);
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
            await addEntity(gateway, modelData as ModelSchema);
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
            await addEntity(gateway, primitiveData as PrimitiveSchema);
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
            await addEntity(gateway, primitiveData as PrimitiveSchema);
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
            const gateway = new EngineGateway({ scene } as unknown as DIVE);
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

    describe('engine control', () => {
        const makeControllable = () => {
            const clock = {
                hasTicker: vi.fn(() => false),
                addTicker: vi.fn(),
            };
            const startAsync = vi.fn().mockResolvedValue(undefined);
            const gateway = new EngineGateway({
                scene: { root: new DIVERoot() },
                clock,
                startAsync,
            } as unknown as DIVE);
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
