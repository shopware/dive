import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PerspectiveCamera,
    Scene,
} from 'three/webgpu';
import {
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
    UI_LAYER_MASK,
    type DIVEScene,
} from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Toolbox } from '../Toolbox.ts';

/**
 * Deliberately does NOT mock `three/webgpu`: the whole point is to exercise
 * `Toolbox.raycast()` against a real `Raycaster` and a realistically shaped
 * scene graph. Mocking `intersectObjects` to return `[]` is what let the
 * always-empty candidate list go unnoticed.
 *
 * @vitest-environment jsdom
 */

vi.mock('../hover/HoverTool.ts', () => ({
    HoverTool: vi
        .fn()
        .mockImplementation(() => ({ name: 'hover', priority: 20 })),
}));

vi.mock('../select/SelectTool.ts', () => ({
    SelectTool: vi
        .fn()
        .mockImplementation(() => ({ name: 'select', priority: 30 })),
    isSelectTool: vi.fn(),
}));

vi.mock('../transform/TransformTool.ts', () => ({
    TransformTool: vi.fn().mockImplementation(() => ({
        name: 'transform',
        priority: 5,
    })),
    isTransformTool: vi.fn(),
}));

vi.mock('../drag/DragTool.ts', () => ({
    DragTool: vi
        .fn()
        .mockImplementation(() => ({ name: 'drag', priority: 10 })),
}));

const createMockCanvas = () =>
    ({
        clientWidth: 1000,
        clientHeight: 1000,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    }) as unknown as HTMLElement;

const createProductMesh = (): Mesh => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial());
    mesh.layers.mask = PRODUCT_LAYER_MASK;
    return mesh;
};

describe('Toolbox raycast', () => {
    let scene: Scene;
    let root: Object3D;
    let camera: PerspectiveCamera;
    let toolbox: Toolbox;

    /**
     * Aims the shared raycaster at the test mesh. Deliberately asymmetric: any
     * point where the hit lands on x == y (or x == -y) sits on the shared
     * diagonal of the two triangles forming the cube's front face, and gets
     * reported as two intersections at the same distance.
     */
    const aimAtMesh = (): void => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (toolbox as any).updatePointer({ offsetX: 530, offsetY: 460 });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raycast = () => (toolbox as any).raycast();

    beforeEach(() => {
        // Mirrors the real hierarchy: the scene's direct children are plain
        // Object3Ds, never meshes.
        scene = new Scene();
        root = new Object3D();
        root.name = 'Root';
        scene.add(root);

        camera = new PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
        camera.updateMatrixWorld(true);

        const controller = {
            domElement: createMockCanvas(),
            object: { camera },
        } as unknown as OrbitController;

        toolbox = new Toolbox(scene as unknown as DIVEScene, controller);
    });

    afterEach(() => {
        toolbox.dispose();
        vi.clearAllMocks();
    });

    it('should hit a mesh nested under a non-mesh scene child', () => {
        const mesh = createProductMesh();
        root.add(mesh);
        scene.updateMatrixWorld(true);

        aimAtMesh();

        const intersects = raycast();

        expect(intersects).toHaveLength(1);
        expect(intersects[0].object).toBe(mesh);
    });

    it('should hit a mesh nested several levels deep', () => {
        const group = new Object3D();
        const mesh = createProductMesh();
        group.add(mesh);
        root.add(group);
        scene.updateMatrixWorld(true);

        aimAtMesh();

        expect(raycast()[0].object).toBe(mesh);
    });

    it('should not hit a mesh that is hidden itself', () => {
        const mesh = createProductMesh();
        mesh.visible = false;
        root.add(mesh);
        scene.updateMatrixWorld(true);

        aimAtMesh();

        expect(raycast()).toHaveLength(0);
    });

    it('should not hit a visible mesh whose ancestor is hidden', () => {
        const mesh = createProductMesh();
        root.add(mesh);
        root.visible = false;
        scene.updateMatrixWorld(true);

        aimAtMesh();

        expect(raycast()).toHaveLength(0);
    });

    it('should not hit meshes outside the product and ui layers', () => {
        const helper = createProductMesh();
        helper.layers.mask = HELPER_LAYER_MASK;
        root.add(helper);
        scene.updateMatrixWorld(true);

        aimAtMesh();

        expect(raycast()).toHaveLength(0);
    });

    it('should hit ui layer meshes', () => {
        const handle = createProductMesh();
        handle.layers.mask = UI_LAYER_MASK;
        root.add(handle);
        scene.updateMatrixWorld(true);

        aimAtMesh();

        expect(raycast()[0].object).toBe(handle);
    });

    it('should return an empty list when the ray misses everything', () => {
        const mesh = createProductMesh();
        mesh.position.set(1000, 0, 0);
        root.add(mesh);
        scene.updateMatrixWorld(true);

        aimAtMesh();

        expect(raycast()).toHaveLength(0);
    });
});
