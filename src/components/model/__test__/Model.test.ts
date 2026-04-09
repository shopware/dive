import { DIVEModel } from '../Model.ts';
import { DIVEScene } from '../../../engine/scene/Scene.ts';
import {
    Vector3,
    Box3,
    Mesh,
    MeshStandardMaterial,
    type Texture,
    Object3D,
} from 'three/webgpu';
import { DIVENode } from '../../node/Node.ts';
import { type MaterialSchema } from '../../../types/schema/MaterialSchema.ts';
import { BoundingBox } from '../../boundingbox/BoundingBox.ts';

// ============================================================================
// Isolated Three.js Mocks for DIVEModel tests
// ============================================================================

// Mock for Raycaster.intersectObjects - exposed for test assertions
const RaycasterIntersectObjectMock = vi.fn().mockReturnValue([]);

vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three')>();

    // Vector3 mock with essential methods
    const MockVector3 = vi.fn(function (this: any, x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.set = vi.fn((x: number, y: number, z: number) => {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        });
        this.copy = vi.fn((v: any) => {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            return this;
        });
        this.clone = vi.fn(() => new MockVector3(this.x, this.y, this.z));
        this.add = vi.fn((v: any) => {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        });
        return this;
    });

    // Box3 mock for bounding box operations
    const MockBox3 = vi.fn(function (this: any) {
        this.min = new MockVector3(Infinity, Infinity, Infinity);
        this.max = new MockVector3(-Infinity, -Infinity, -Infinity);
        this.expandByObject = vi.fn(() => this);
        this.setFromObject = vi.fn(() => this);
        this.getCenter = vi.fn(() => new MockVector3());
        this.makeEmpty = vi.fn(() => this);
        return this;
    });

    // MeshStandardMaterial mock with material properties
    const MockMeshStandardMaterial = vi.fn(function (this: any) {
        this.color = { set: vi.fn() };
        this.roughness = 1;
        this.metalness = 0;
        this.vertexColors = false;
        this.map = undefined;
        this.normalMap = undefined;
        this.roughnessMap = undefined;
        this.metalnessMap = undefined;
        return this;
    });

    // Mesh mock - needs isMesh, userData, layers, material
    const MockMesh = vi.fn(function (this: any) {
        this.isMesh = true;
        this.userData = {};
        this.layers = { mask: 0 };
        this.material = new MockMeshStandardMaterial();
        this.castShadow = false;
        this.receiveShadow = false;
        return this;
    });

    // Object3D mock - needs traverse, children, position, quaternion, scale, userData, layers
    const MockObject3D = vi.fn(function (this: any) {
        this.children = [];
        this.userData = {};
        this.layers = { mask: 0 };
        this.castShadow = false;
        this.receiveShadow = false;
        this.position = new MockVector3();
        this.quaternion = { copy: vi.fn() };
        this.scale = { x: 1, y: 1, z: 1, copy: vi.fn() };
        this.traverse = vi.fn((callback: (child: any) => void) => {
            callback(this);
            this.children.forEach((child: any) => {
                callback(child);
            });
        });
        this.add = vi.fn((...children: any[]) => {
            this.children.push(...children);
            return this;
        });
        this.clear = vi.fn(() => {
            this.children = [];
            return this;
        });
        this.updateWorldMatrix = vi.fn();
        this.getWorldPosition = vi.fn((target: any) => {
            target.x = this.position.x;
            target.y = this.position.y;
            target.z = this.position.z;
            return target;
        });
        return this;
    });

    // Raycaster mock for dropIt()
    const MockRaycaster = vi.fn(function (this: any) {
        this.layers = { mask: 0 };
        this.intersectObjects = RaycasterIntersectObjectMock;
        return this;
    });

    return {
        ...actual,
        Vector3: MockVector3,
        Box3: MockBox3,
        Mesh: MockMesh,
        MeshStandardMaterial: MockMeshStandardMaterial,
        Object3D: MockObject3D,
        Raycaster: MockRaycaster,
    };
});

vi.mock('@shopware-ag/dive/state', () => ({
    State: {
        get: vi.fn().mockReturnValue({
            performAction: vi.fn(),
        }),
    },
}));

// Mock for AssetLoader
const mockLoad = vi.fn();
vi.mock('@shopware-ag/dive/assetloader', () => ({
    AssetLoader: vi.fn().mockImplementation(() => ({
        load: mockLoad,
    })),
}));

// ============================================================================
// Test Setup
// ============================================================================

const object = new Object3D();
object.children.push(new Mesh());

let model: DIVEModel;

describe('dive/model/DIVEModel', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        RaycasterIntersectObjectMock.mockClear();
        model = new DIVEModel();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(model).toBeDefined();
    });

    it('should set model', () => {
        expect(() => model.setFromGLTF(object)).not.toThrow();
    });

    it('should place on floor', async () => {
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        model.setFromGLTF(object);

        const com = State.get('id')!;
        const spyperformAction = vi.spyOn(com, 'performAction');

        model.userData.id = 'something';
        model.position.set(0, 4, 0);

        (Box3 as any).mockImplementationOnce(function (this: any) {
            this.min = new Vector3(0, -2, 0);
            (this.max = new Vector3(0, 2, 0)),
                (this.getCenter = vi.fn(() => new Vector3()));
            this.expandByObject = vi.fn(() => this);
            this.setFromObject = vi.fn(() => this);
            return this;
        });

        const scene = {
            parent: null,
            root: {
                children: [
                    model,
                ],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        model.parent = scene.root;

        vi.spyOn(DIVENode.prototype, 'setPosition').mockImplementationOnce(
            () => {},
        );
        const onMoveSpy = vi
            .spyOn(model, 'onMove')
            .mockImplementation(() => {});
        model.placeOnFloor();
        await new Promise(setImmediate);
        expect(spyperformAction).toHaveBeenCalledWith(
            'UPDATE_OBJECT',
            expect.objectContaining({
                position: expect.objectContaining({
                    y: 6,
                }),
            }),
        );
        expect(onMoveSpy).toHaveBeenCalledTimes(1);
    });

    it('should drop it', async () => {
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        const spyOnMove = vi
            .spyOn(model, 'onMove')
            .mockImplementation(() => {});

        const size = {
            x: 1,
            y: 1,
            z: 1,
        };

        model.userData.id = 'something';
        model.setFromGLTF(object);
        model.position.set(0, 6, 0);

        const hitObject = new Mesh();
        RaycasterIntersectObjectMock.mockReturnValue([
            {
                object: hitObject,
            },
        ]);

        // prepare Box3 mocks AFTER mesh construction (mesh constructor creates its own Box3)
        (Box3 as any)
            .mockImplementationOnce(function (this: any) {
                (this.min = new Vector3(
                    -size.x / 2,
                    -size.y / 2,
                    -size.z / 2,
                )).add(model.position);
                (this.max = new Vector3(
                    size.x / 2,
                    size.y / 2,
                    size.z / 2,
                )).add(model.position);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            })
            .mockImplementationOnce(function (this: any) {
                this.min = new Vector3(0, 0, 0);
                this.max = new Vector3(0, 2, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            });

        const scene = {
            parent: null,
            root: {
                children: [
                    model,
                ],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        // ensure worldToLocal exists and is identity so setPosition works
        (scene.root as any).worldToLocal = (v: Vector3) => v;

        // test when parent is not set
        console.warn = vi.fn();
        expect(() => model.dropIt()).not.toThrow();
        expect(console.warn).toHaveBeenCalledTimes(1);

        model.parent = scene.root;

        // first drop with movement
        const com = State.get('id')!;
        const spyPerform = vi.spyOn(com, 'performAction');
        expect(() => model.dropIt()).not.toThrow();
        await new Promise(setImmediate);
        expect(spyPerform).toHaveBeenCalledWith(
            'UPDATE_OBJECT',
            expect.objectContaining({
                position: expect.objectContaining({ y: 2.5 }),
            }),
        );
        expect(spyOnMove).toHaveBeenCalledTimes(1);

        // second drop with zero delta -> no move
        (Box3 as any)
            .mockImplementationOnce(function (this: any) {
                // use updated position (2.5) to compute model box
                const size = { x: 1, y: 1, z: 1 };
                (this.min = new Vector3(
                    -size.x / 2,
                    -size.y / 2,
                    -size.z / 2,
                )).add(model.position);
                (this.max = new Vector3(
                    size.x / 2,
                    size.y / 2,
                    size.z / 2,
                )).add(model.position);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            })
            .mockImplementationOnce(function (this: any) {
                // target box with top exactly at current model bottom -> delta 0
                this.min = new Vector3(0, 0, 0);
                this.max = new Vector3(0, model.position.y - 0.5, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            });
        expect(() => model.dropIt()).not.toThrow();
        expect(spyOnMove).toHaveBeenCalledTimes(1);

        // alter position so onMove will be called again
        model.position.y = 2;
        // mock boxes for third drop with positive delta -> move again
        (Box3 as any)
            .mockImplementationOnce(function (this: any) {
                const size = { x: 1, y: 1, z: 1 };
                (this.min = new Vector3(
                    -size.x / 2,
                    -size.y / 2,
                    -size.z / 2,
                )).add(model.position);
                (this.max = new Vector3(
                    size.x / 2,
                    size.y / 2,
                    size.z / 2,
                )).add(model.position);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            })
            .mockImplementationOnce(function (this: any) {
                this.min = new Vector3(0, 0, 0);
                this.max = new Vector3(0, 2, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            });
        vi.spyOn(State, 'get').mockReturnValueOnce(undefined as any);
        expect(() => model.dropIt()).not.toThrow();
        expect(spyOnMove).toHaveBeenCalledTimes(2);
    });

    it('should set material', () => {
        // apply invalid material should not crash
        expect(() => model.setMaterial({} as MaterialSchema)).not.toThrow();
        expect(model['_material']).not.toBeNull();

        expect(() =>
            model.setMaterial({
                color: 0xffffff,
                roughness: 0,
                metalness: 1,
            } as MaterialSchema),
        ).not.toThrow();
        expect((model['_material'] as MeshStandardMaterial).roughness).toBe(0);
        expect(
            (model['_material'] as MeshStandardMaterial).roughnessMap,
        ).toBeUndefined();
        expect((model['_material'] as MeshStandardMaterial).metalness).toBe(1);
        expect(
            (model['_material'] as MeshStandardMaterial).metalnessMap,
        ).toBeUndefined();

        expect(() =>
            model.setMaterial({
                color: 0xff00ff,
                vertexColors: true,
                map: 'This_Is_A_Texture' as unknown as Texture,
                normalMap: 'This_Is_A_Texture' as unknown as Texture,
                roughness: 0,
                roughnessMap: 'This_Is_A_Texture' as unknown as Texture,
                metalness: 1,
                metalnessMap: 'This_Is_A_Texture' as unknown as Texture,
            } as MaterialSchema),
        ).not.toThrow();
        expect((model['_material'] as MeshStandardMaterial).roughness).toBe(1);
        expect(
            (model['_material'] as MeshStandardMaterial).roughnessMap,
        ).toBeDefined();
        expect((model['_material'] as MeshStandardMaterial).metalness).toBe(1);
        expect(
            (model['_material'] as MeshStandardMaterial).metalnessMap,
        ).toBeDefined();
    });

    it('should set model material when material already set before', () => {
        model.setMaterial({ roughness: 0.5 } as MaterialSchema);
        expect(() => model.setFromGLTF(object)).not.toThrow();
        expect(
            (model['_mesh']?.material as MeshStandardMaterial).roughness,
        ).toBe(0.5);
    });

    it('should set material to model when model already set before', () => {
        model.setFromGLTF(object);
        expect(() =>
            model.setMaterial({ roughness: 0.5 } as MaterialSchema),
        ).not.toThrow();
        expect(
            (model['_mesh']?.material as MeshStandardMaterial).roughness,
        ).toBe(0.5);
    });

    it('should handle placeOnFloor with no mesh or geometry', () => {
        model.userData.id = 'something';
        expect(() => model.placeOnFloor()).not.toThrow();

        // Set mesh but no geometry
        model['_mesh'] = new Mesh();
        expect(() => model.placeOnFloor()).not.toThrow();
    });

    it('should handle placeOnFloor when position does not change', async () => {
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        model.setFromGLTF(object);
        model.userData.id = 'something';

        // Make Box3 report min.y = 0 so delta = 0 -> no change
        (Box3 as any).mockImplementationOnce(function (this: any) {
            this.min = new Vector3(0, 0, 0);
            this.max = new Vector3(0, 0, 0);
            this.getCenter = vi.fn(() => new Vector3());
            this.expandByObject = vi.fn(() => this);
            return this;
        });

        const com = State.get('id')!;
        const spyperformAction = vi.spyOn(com, 'performAction');
        const onMoveSpy = vi
            .spyOn(model, 'onMove')
            .mockImplementation(() => {});

        model.placeOnFloor();
        expect(spyperformAction).not.toHaveBeenCalled();
        expect(onMoveSpy).not.toHaveBeenCalled();
    });

    it('should handle setMaterial with null material and mesh', () => {
        // Test with null material and mesh
        (model['_material'] as unknown) = null;
        (model['_mesh'] as unknown) = null;
        expect(() =>
            model.setMaterial({ roughness: 0.5 } as MaterialSchema),
        ).not.toThrow();

        // Verify new material was created
        expect(model['_material']).toBeInstanceOf(MeshStandardMaterial);
        expect((model['_material'] as MeshStandardMaterial).roughness).toBe(
            0.5,
        );
    });

    it('should load model from URL', async () => {
        const State = await import('@shopware-ag/dive/state').then(
            ({ State }) => State,
        );

        const mockGltf = new Object3D();
        mockGltf.children.push(new Mesh());
        mockLoad.mockResolvedValue(mockGltf);

        model.userData.id = 'test-id';

        const result = await model.setFromURL('https://example.com/model.glb');

        expect(mockLoad).toHaveBeenCalledWith('https://example.com/model.glb');
        expect(result).toBe(model);

        // Wait for the dynamic import and action
        await new Promise(setImmediate);

        const com = State.get('test-id')!;
        expect(com.performAction).toHaveBeenCalledWith('MODEL_LOADED', {
            id: 'test-id',
        });
    });

    it('should reuse existing asset loader on subsequent calls', async () => {
        const mockGltf = new Object3D();
        mockLoad.mockResolvedValue(mockGltf);

        model.userData.id = 'test-id';

        // First call creates the asset loader
        await model.setFromURL('https://example.com/model1.glb');

        // Second call should reuse the same asset loader
        await model.setFromURL('https://example.com/model2.glb');

        // AssetLoader should only be instantiated once (via the mock)
        const { AssetLoader } = await import('@shopware-ag/dive/assetloader');
        expect(AssetLoader).toHaveBeenCalledTimes(1);
    });

    it('should detect semantic root with isDIVEModel in userData', () => {
        // Create an object with a child that has isDIVEModel = true
        const gltf = new Object3D();
        const semanticRoot = new Object3D();
        semanticRoot.userData.isDIVEModel = true;
        semanticRoot.position.set(1, 2, 3);

        // Add a mesh as child of semantic root
        const mesh = new Mesh();
        semanticRoot.children.push(mesh);

        gltf.children.push(semanticRoot);

        // Make traverse call the callback on gltf and its children
        (gltf as any).traverse = vi.fn((callback: (child: any) => void) => {
            callback(gltf);
            callback(semanticRoot);
            callback(mesh);
        });

        model.setFromGLTF(gltf);

        // The model should have copied position from semanticRoot, not gltf
        expect(model.position.copy).toHaveBeenCalledWith(semanticRoot.position);
    });

    it('should call placeOnFloor when dropIt has no intersections', async () => {
        model.userData.id = 'something';
        model.setFromGLTF(object);

        // Set up parent for dropIt
        const scene = {
            parent: null,
            root: {
                children: [model],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        model.parent = scene.root;

        // Mock raycaster to return no intersections
        RaycasterIntersectObjectMock.mockReturnValue([]);

        // Spy on placeOnFloor
        const placeOnFloorSpy = vi
            .spyOn(model, 'placeOnFloor')
            .mockImplementation(() => {});

        model.dropIt();

        expect(placeOnFloorSpy).toHaveBeenCalledTimes(1);
    });

    it('should skip BoundingBox children in placeOnFloor', async () => {
        model.setFromGLTF(object);
        model.userData.id = 'something';

        // Create a mock object that is an instance of BoundingBox
        const mockBoundingBox = Object.create(BoundingBox.prototype);
        model.children.push(mockBoundingBox);

        // Mock Box3 to report a delta
        (Box3 as any).mockImplementationOnce(function (this: any) {
            this.min = new Vector3(0, -1, 0);
            this.max = new Vector3(0, 1, 0);
            this.getCenter = vi.fn(() => new Vector3());
            this.expandByObject = vi.fn(() => this);
            return this;
        });

        const scene = {
            parent: null,
            root: {
                children: [model],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        model.parent = scene.root;

        vi.spyOn(DIVENode.prototype, 'setPosition').mockImplementationOnce(
            () => {},
        );
        vi.spyOn(model, 'onMove').mockImplementation(() => {});

        // Should not throw - BoundingBox is skipped
        expect(() => model.placeOnFloor()).not.toThrow();
    });

    it('should skip BoundingBox children in dropIt', async () => {
        model.setFromGLTF(object);
        model.userData.id = 'something';

        // Create a mock object that is an instance of BoundingBox
        const mockBoundingBox = Object.create(BoundingBox.prototype);
        model.children.push(mockBoundingBox);

        const scene = {
            parent: null,
            root: {
                children: [model],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        model.parent = scene.root;

        // Mock no intersections to trigger placeOnFloor path
        RaycasterIntersectObjectMock.mockReturnValue([]);

        const placeOnFloorSpy = vi
            .spyOn(model, 'placeOnFloor')
            .mockImplementation(() => {});

        // Should not throw - BoundingBox is skipped
        expect(() => model.dropIt()).not.toThrow();
        expect(placeOnFloorSpy).toHaveBeenCalled();
    });

    it('should not move in dropIt when position unchanged after delta', async () => {
        model.setFromGLTF(object);
        model.userData.id = 'something';
        model.position.set(0, 2, 0);

        const scene = {
            parent: null,
            root: {
                children: [model],
            },
        } as unknown as DIVEScene;
        scene.root.parent = scene;
        model.parent = scene.root;

        const hitObject = new Mesh();
        RaycasterIntersectObjectMock.mockReturnValue([{ object: hitObject }]);

        // Set up Box3 mocks so that delta equals 0 (targetBox.max.y - box.min.y = 0)
        (Box3 as any)
            .mockImplementationOnce(function (this: any) {
                // Model's bounding box: min.y = 2 (same as position)
                this.min = new Vector3(0, 2, 0);
                this.max = new Vector3(0, 3, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            })
            .mockImplementationOnce(function (this: any) {
                // Target object's bounding box: max.y = 2 so delta = 2 - 2 = 0
                this.min = new Vector3(0, 0, 0);
                this.max = new Vector3(0, 2, 0);
                this.getCenter = vi.fn(() => new Vector3());
                this.expandByObject = vi.fn(() => this);
                this.setFromObject = vi.fn(() => this);
                return this;
            });

        const onMoveSpy = vi
            .spyOn(model, 'onMove')
            .mockImplementation(() => {});

        model.dropIt();

        // onMove should not be called since delta is 0
        expect(onMoveSpy).not.toHaveBeenCalled();
    });
});
