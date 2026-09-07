import {
    BoxGeometry,
    Matrix4,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    Quaternion,
    Vector3,
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

/**
 * What the asset loader hands over: `gltf.scene`.
 *
 * An identity Group whose children are the file's own root nodes -- that is how
 * GLTFLoader builds it, and a scene cannot carry a transform of its own.
 *
 * @param roots - How many root nodes the file has. One is the ordinary case for a
 * single-object export; several means there is no one transform to lift.
 */
const makeGltf = (roots = 1): Object3D => {
    const scene = new Object3D();

    for (let index = 0; index < roots; index++) {
        const fileRoot = new Object3D();
        fileRoot.name = `root-${index}`;
        fileRoot.position.set(1 + index, 2, 3);
        fileRoot.add(
            new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial()),
        );
        scene.add(fileRoot);
    }

    return scene;
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

    it('should take every root of the file as content', () => {
        // every glTF is treated the same: a scene has no transform of its own, so
        // its root nodes and their placements are what the model is made of
        model.setFromGLTF(makeGltf(2));

        expect(model.children.map((child) => child.name)).toEqual([
            'root-0',
            'root-1',
        ]);
        expect(model.children[0].position.toArray()).toEqual([1, 2, 3]);
    });

    it('should treat a single-root file no differently', () => {
        // lifting one root's transform would put an exporter's axis conversion in
        // front of the user as a rotation they never set
        model.setFromGLTF(makeGltf());

        expect(model.children).toHaveLength(1);
        expect(model.children[0].position.toArray()).toEqual([1, 2, 3]);
        expect(node.position.lengthSq()).toBe(0);
    });

    it('should keep a marked transform root as content', () => {
        // DIVE's own save format writes one, and the side that wrote it is the
        // side that recognises it -- dropping it here would discard its transform
        const gltf = new Object3D();
        const marked = new Object3D();
        marked.name = 'TransformRoot';
        marked.userData.isDIVEModel = true;
        marked.position.set(4, 5, 6);
        marked.add(new Mesh(new BoxGeometry(), new MeshStandardMaterial()));
        gltf.add(marked);

        model.setFromGLTF(gltf);

        expect(model.children).toHaveLength(1);
        expect(model.children[0].name).toBe('TransformRoot');
        expect(model.children[0].position.toArray()).toEqual([4, 5, 6]);
        expect(model.children[0].userData.isDIVEModel).toBe(true);
    });

    it('should move nothing by itself', () => {
        // not the node, and not the component: a placement belongs to whoever owns
        // the entity, and writing it here shifted every other component on the node
        const sibling = node.addComponent(new ModelComponent());
        model.setFromGLTF(makeGltf());

        expect(node.position.lengthSq()).toBe(0);
        expect(model.position.lengthSq()).toBe(0);
        expect(sibling.position.lengthSq()).toBe(0);
    });

    it('should keep the animations of a load with no owner', () => {
        // they used to sit inside the `isAttached` branch and vanish silently
        const gltf = makeGltf();
        gltf.animations = ['clip'] as never;
        const detached = new ModelComponent();

        detached.setFromGLTF(gltf);

        expect(detached.animations).toEqual(['clip']);
    });

    it('should not put the animations on the node', () => {
        // they belong to the asset, and the mixer is handed a root and its clips
        // separately -- so there is no reason for them to sit anywhere else
        const gltf = makeGltf();
        gltf.animations = ['clip'] as never;

        model.setFromGLTF(gltf);

        expect(model.animations).toEqual(['clip']);
        expect(node.animations).toEqual([]);
    });

    it('should take the animations along to another node', () => {
        const gltf = makeGltf();
        gltf.animations = ['clip'] as never;
        model.setFromGLTF(gltf);

        new DIVENode().addComponent(model);

        expect(model.animations).toEqual(['clip']);
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
