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
import { type DIVEMaterial } from '../../../types/material/DIVEMaterial.ts';
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

        // the EventDispatcher half of Object3D, which the entities now use to
        // report about themselves
        this._listeners = {};
        this.addEventListener = vi.fn((type: string, listener: any) => {
            (this._listeners[type] ??= []).push(listener);
        });
        this.removeEventListener = vi.fn((type: string, listener: any) => {
            this._listeners[type] = (this._listeners[type] ?? []).filter(
                (entry: any) => entry !== listener,
            );
        });
        this.dispatchEvent = vi.fn((event: any) => {
            (this._listeners[event.type] ?? []).forEach((listener: any) =>
                listener({ ...event, target: this }),
            );
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

    it('should set material', () => {
        // apply invalid material should not crash
        expect(() => model.setMaterial({} as DIVEMaterial)).not.toThrow();
        expect(model['_material']).not.toBeNull();

        expect(() =>
            model.setMaterial({
                color: 0xffffff,
                roughness: 0,
                metalness: 1,
            } as DIVEMaterial),
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
            } as DIVEMaterial),
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
        model.setMaterial({ roughness: 0.5 } as DIVEMaterial);
        expect(() => model.setFromGLTF(object)).not.toThrow();
        expect(
            (model['_mesh']?.material as MeshStandardMaterial).roughness,
        ).toBe(0.5);
    });

    it('should set material to model when model already set before', () => {
        model.setFromGLTF(object);
        expect(() =>
            model.setMaterial({ roughness: 0.5 } as DIVEMaterial),
        ).not.toThrow();
        expect(
            (model['_mesh']?.material as MeshStandardMaterial).roughness,
        ).toBe(0.5);
    });

    it('should handle setMaterial with null material and mesh', () => {
        // Test with null material and mesh
        (model['_material'] as unknown) = null;
        (model['_mesh'] as unknown) = null;
        expect(() =>
            model.setMaterial({ roughness: 0.5 } as DIVEMaterial),
        ).not.toThrow();

        // Verify new material was created
        expect(model['_material']).toBeInstanceOf(MeshStandardMaterial);
        expect((model['_material'] as MeshStandardMaterial).roughness).toBe(
            0.5,
        );
    });

    it('should load model from URL', async () => {
        const mockGltf = new Object3D();
        mockGltf.children.push(new Mesh());
        mockLoad.mockResolvedValue(mockGltf);

        model.userData.id = 'test-id';
        const onLoad = vi.fn();
        model.addEventListener('object-load', onLoad);

        const result = await model.setFromURL('https://example.com/model.glb');

        expect(mockLoad).toHaveBeenCalledWith('https://example.com/model.glb');
        expect(result).toBe(model);

        expect(onLoad).toHaveBeenCalledTimes(1);
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
});
