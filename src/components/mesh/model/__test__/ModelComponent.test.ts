import {
    BoxGeometry,
    Mesh,
    MeshStandardMaterial,
    Object3D,
} from 'three/webgpu';
import { ModelComponent } from '../ModelComponent.ts';
import { DIVENode } from '../../../node/Node.ts';
import { HELPER_LAYER_MASK } from '../../../../constants/VisibilityLayerMask.ts';

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

describe('dive/mesh/ModelComponent', () => {
    let node: DIVENode;
    let model: ModelComponent;

    beforeEach(() => {
        vi.clearAllMocks();
        node = new DIVENode();
        model = node.addComponent(new ModelComponent());
    });

    it('should brand and name itself', () => {
        expect(model.isModelComponent).toBe(true);
        expect(model.isMeshComponent).toBe(true);
        expect(model.name).toBe('ModelComponent');
    });

    it('should take the content as its own children', () => {
        model.setFromGLTF(makeGltf());

        // the content must NOT land in the node's children
        expect(model.children.length).toBeGreaterThan(0);
        expect(node.children).toEqual([model]);
    });

    it('should survive an asset load with other components attached', () => {
        // the bug that made this design necessary: DIVEModel.setFromGLTF called
        // this.clear() on the node and wiped every attached component
        const sibling = node.addComponent(new ModelComponent());

        model.setFromGLTF(makeGltf());

        expect(node.components).toContain(sibling);
        expect(node.components).toContain(model);
    });

    it('should hand the root transform to the node', () => {
        model.setFromGLTF(makeGltf());

        expect(node.position.x).toBe(1);
        expect(node.position.z).toBe(3);
        // the component itself stays at its owner's transform
        expect(model.position.lengthSq()).toBe(0);
    });

    it('should find the first mesh and its material', () => {
        model.setFromGLTF(makeGltf());

        expect(model.mesh).toBeInstanceOf(Mesh);
        expect(model.material).toBeInstanceOf(MeshStandardMaterial);
    });

    it('should adopt the owner layer for the content', () => {
        node.layers.mask = HELPER_LAYER_MASK;

        model.setFromGLTF(makeGltf());

        expect(model.children[0].layers.mask).toBe(HELPER_LAYER_MASK);
    });

    it('should replace previous content on a second load', () => {
        model.setFromGLTF(makeGltf());
        const first = model.children[0];

        model.setFromGLTF(makeGltf());

        expect(model.children).not.toContain(first);
    });

    it('should honour a semantic root marker', () => {
        const gltf = new Object3D();
        const semantic = new Object3D();
        semantic.userData.isDIVEModel = true;
        semantic.position.set(7, 0, 0);
        semantic.add(new Mesh(new BoxGeometry(), new MeshStandardMaterial()));
        gltf.add(semantic);

        model.setFromGLTF(gltf);

        expect(node.position.x).toBe(7);
    });

    it('should work without an owner', () => {
        const detached = new ModelComponent();

        expect(() => detached.setFromGLTF(makeGltf())).not.toThrow();
    });

    it('should keep a material that was set before the asset arrived', () => {
        model.setMaterial({ color: 0xff0000 });
        const material = model.material;

        model.setFromGLTF(makeGltf());

        expect(model.material).toBe(material);
        expect(model.mesh?.material).toBe(material);
    });

    it('should push a material onto content that is already there', () => {
        model.setFromGLTF(makeGltf());

        model.setMaterial({ color: 0x0000ff });

        expect(model.mesh?.material).toBe(model.material);
    });

    it('should dispose the geometry it loaded', () => {
        model.setFromGLTF(makeGltf());
        const geometry = vi.spyOn(model.mesh!.geometry, 'dispose');

        model.dispose();

        expect(geometry).toHaveBeenCalled();
    });

    describe('setFromURL', () => {
        it('should load and report on the owner', async () => {
            loadAsset.mockResolvedValue(makeGltf());
            const onLoad = vi.fn();
            node.addEventListener('object-load', onLoad);

            await model.setFromURL('a.glb');

            expect(loadAsset).toHaveBeenCalledWith('a.glb');
            expect(onLoad).toHaveBeenCalledTimes(1);
        });

        it('should reuse the loader across calls', async () => {
            loadAsset.mockResolvedValue(makeGltf());

            await model.setFromURL('a.glb');
            await model.setFromURL('b.glb');

            const { AssetLoader } =
                await import('@shopware-ag/dive/assetloader');
            expect(AssetLoader).toHaveBeenCalledTimes(1);
        });

        it('should say nothing when nobody is listening on a detached load', async () => {
            loadAsset.mockResolvedValue(makeGltf());
            const detached = new ModelComponent();

            await expect(detached.setFromURL('a.glb')).resolves.toBe(detached);
        });
    });
});
