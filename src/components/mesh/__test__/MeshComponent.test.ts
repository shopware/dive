import {
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    Object3D,
} from 'three/webgpu';
import { MeshComponent } from '../MeshComponent.ts';
import { DIVENode } from '../../node/Node.ts';
import { HELPER_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

const loadAsset = vi.fn();

vi.mock('@shopware-ag/dive/assetloader', () => ({
    AssetLoader: vi.fn(function (this: Record<string, unknown>) {
        this.load = loadAsset;
        return this;
    }),
}));

/** A glTF-shaped hierarchy: a root wrapper holding one mesh. */
const makeGltf = (): Object3D => {
    const root = new Object3D();
    root.position.set(1, 2, 3);
    root.add(new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial()));
    return root;
};

describe('dive/mesh/MeshComponent', () => {
    let node: DIVENode;
    let mesh: MeshComponent;

    beforeEach(() => {
        vi.clearAllMocks();
        node = new DIVENode();
        mesh = node.addComponent(new MeshComponent());
    });

    it('should take the content as its own children', () => {
        mesh.setFromGLTF(makeGltf());

        // the content must NOT land in the node's children
        expect(mesh.children.length).toBeGreaterThan(0);
        expect(node.children).toEqual([mesh]);
    });

    it('should survive an asset load with other components attached', () => {
        // the bug that made this design necessary: DIVEModel.setFromGLTF called
        // this.clear() on the node and wiped every attached component
        const sibling = node.addComponent(new MeshComponent());

        mesh.setFromGLTF(makeGltf());

        expect(node.components).toContain(sibling);
        expect(node.components).toContain(mesh);
    });

    it('should hand the root transform to the node', () => {
        mesh.setFromGLTF(makeGltf());

        expect(node.position.x).toBe(1);
        expect(node.position.z).toBe(3);
        // the component itself stays at its owner's transform
        expect(mesh.position.lengthSq()).toBe(0);
    });

    it('should find the first mesh and its material', () => {
        mesh.setFromGLTF(makeGltf());

        expect(mesh.mesh).toBeInstanceOf(Mesh);
        expect(mesh.material).toBeInstanceOf(MeshStandardMaterial);
    });

    it('should adopt the owner layer for the content', () => {
        node.layers.mask = HELPER_LAYER_MASK;

        mesh.setFromGLTF(makeGltf());

        expect(mesh.children[0].layers.mask).toBe(HELPER_LAYER_MASK);
    });

    it('should replace previous content on a second load', () => {
        mesh.setFromGLTF(makeGltf());
        const first = mesh.children[0];

        mesh.setFromGLTF(makeGltf());

        expect(mesh.children).not.toContain(first);
    });

    it('should honour a semantic root marker', () => {
        const gltf = new Object3D();
        const semantic = new Object3D();
        semantic.userData.isDIVEModel = true;
        semantic.position.set(7, 0, 0);
        semantic.add(new Mesh(new BoxGeometry(), new MeshStandardMaterial()));
        gltf.add(semantic);

        mesh.setFromGLTF(gltf);

        expect(node.position.x).toBe(7);
    });

    it('should work without an owner', () => {
        const detached = new MeshComponent();

        expect(() => detached.setFromGLTF(makeGltf())).not.toThrow();
    });

    describe('setFromURL', () => {
        it('should load and report on the owner', async () => {
            loadAsset.mockResolvedValue(makeGltf());
            const onLoad = vi.fn();
            node.addEventListener('object-load', onLoad);

            await mesh.setFromURL('a.glb');

            expect(loadAsset).toHaveBeenCalledWith('a.glb');
            expect(onLoad).toHaveBeenCalledTimes(1);
        });

        it('should reuse the loader across calls', async () => {
            loadAsset.mockResolvedValue(makeGltf());

            await mesh.setFromURL('a.glb');
            await mesh.setFromURL('b.glb');

            const { AssetLoader } =
                await import('@shopware-ag/dive/assetloader');
            expect(AssetLoader).toHaveBeenCalledTimes(1);
        });
    });

    describe('setMaterial', () => {
        it('should create a material when there is none', () => {
            mesh.setMaterial({ color: 0xff0000 });

            expect(mesh.material?.color.getHexString()).toBe('ff0000');
        });

        it('should apply every supported property', () => {
            const map = {} as never;

            mesh.setMaterial({
                vertexColors: true,
                color: 0x00ff00,
                map,
                normalMap: map,
                roughness: 0.25,
                metalness: 0.5,
            });

            expect(mesh.material?.vertexColors).toBe(true);
            expect(mesh.material?.roughness).toBe(0.25);
            expect(mesh.material?.metalness).toBe(0.5);
        });

        it('should neutralise roughness and metalness when maps are set', () => {
            const map = {} as never;

            mesh.setMaterial({
                roughness: 0.1,
                roughnessMap: map,
                metalness: 0.1,
                metalnessMap: map,
            });

            expect(mesh.material?.roughness).toBe(1);
            expect(mesh.material?.metalness).toBe(1);
        });

        it('should keep the scalar when the map is null', () => {
            mesh.setMaterial({
                roughness: 0.3,
                roughnessMap: null,
                metalness: 0.3,
                metalnessMap: null,
            });

            expect(mesh.material?.roughness).toBe(0.3);
            expect(mesh.material?.metalness).toBe(0.3);
        });

        it('should push the material onto existing content', () => {
            mesh.setFromGLTF(makeGltf());

            mesh.setMaterial({ color: 0x0000ff });

            expect(mesh.mesh?.material).toBe(mesh.material);
        });
    });

    it('should dispose its geometry and material', () => {
        mesh.setFromGLTF(makeGltf());
        const geometry = vi.spyOn(mesh.mesh!.geometry, 'dispose');

        mesh.dispose();

        expect(geometry).toHaveBeenCalled();
    });
});
