import {
    Bone,
    BoxGeometry,
    Float32BufferAttribute,
    Group,
    Mesh,
    MeshStandardMaterial,
    PlaneGeometry,
    Raycaster,
    Skeleton,
    SkinnedMesh,
    Uint16BufferAttribute,
    Vector3,
    type Intersection,
    type Object3D,
} from 'three/webgpu';
import { ModelComponent } from '../../mesh/model/ModelComponent.ts';
import { FloorComponent } from '../../mesh/floor/FloorComponent.ts';
import { ConvexColliderComponent } from '../ConvexColliderComponent.ts';
import { type ColliderIntersection } from '../../../engine/collider/ColliderComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { PrimitiveComponent } from '../../mesh/primitive/PrimitiveComponent.ts';
import {
    PRODUCT_LAYER_MASK,
    PROXY_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

describe('dive/collider/ConvexColliderComponent', () => {
    let collider: ConvexColliderComponent;
    let node: DIVENode;

    beforeEach(() => {
        collider = new ConvexColliderComponent();
        node = new DIVENode();
        node.addComponent(collider);
    });

    /** casts from `origin` along `direction` and returns what the collider reports */
    const cast = (
        origin: [number, number, number],
        direction: [number, number, number] = [0, 0, -1],
    ): ColliderIntersection[] => {
        node.updateMatrixWorld(true);
        const raycaster = new Raycaster(
            new Vector3(...origin),
            new Vector3(...direction).normalize(),
        );
        raycaster.layers.mask = PRODUCT_LAYER_MASK;
        const intersects: Intersection[] = [];
        collider.raycast(raycaster, intersects);

        return intersects as ColliderIntersection[];
    };

    /** a 1 m cube primitive on the collider's node, standing on its origin */
    const addCube = (): PrimitiveComponent => {
        const primitive = node.addComponent(new PrimitiveComponent());
        primitive.setGeometry({ name: 'box', width: 1, height: 1, depth: 1 });
        return primitive;
    };

    /** a 1 m cube mesh centred at (`x`, 0, 0) */
    const cube = (x: number): Mesh => {
        const mesh = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshStandardMaterial(),
        );
        mesh.position.set(x, 0, 0);
        return mesh;
    };

    /** a 2 m plane facing +Z, at the given position */
    const plane = (x: number, y: number, z: number): Mesh => {
        const mesh = new Mesh(
            new PlaneGeometry(2, 2),
            new MeshStandardMaterial(),
        );
        mesh.position.set(x, y, z);
        return mesh;
    };

    /** wraps root nodes the way the loader returns a glTF scene */
    const gltf = (...roots: Object3D[]): Group => {
        const scene = new Group();
        scene.add(...roots);
        return scene;
    };

    describe('raycast', () => {
        it('should report the point on the hull of a primitive', () => {
            addCube();

            const [hit] = cast([0, 0.5, 10]);

            expect(hit.point.z).toBeCloseTo(0.5);
            expect(hit.distance).toBeCloseTo(9.5);
            expect(hit.object).toBe(node);
            expect(hit.collider).toBe(collider);
        });

        it('should miss beside the hull', () => {
            addCube();

            expect(cast([2, 0.5, 10])).toHaveLength(0);
        });

        it('should never be hit without meshes', () => {
            expect(cast([0, 0.5, 10])).toHaveLength(0);
        });

        it('should fill the gap between two parts', () => {
            const model = node.addComponent(new ModelComponent());
            model.setFromGLTF(gltf(cube(-2), cube(2)));

            const [hit] = cast([0, 0, 10]);

            expect(hit.point.z).toBeCloseTo(0.5);
        });

        it('should hit flat content', () => {
            const model = node.addComponent(new ModelComponent());
            model.setFromGLTF(gltf(plane(0, 0, 1)));

            const [hit] = cast([0.5, 0.5, 10]);

            expect(hit.point.z).toBeCloseTo(1);
            expect(hit.distance).toBeCloseTo(9);
        });

        it('should miss beside flat content', () => {
            const model = node.addComponent(new ModelComponent());
            model.setFromGLTF(gltf(plane(0, 0, 1)));

            expect(cast([1.5, 0, 10])).toHaveLength(0);
        });

        it('should report where a ray starting inside leaves', () => {
            addCube();

            const [hit] = cast([0, 0.5, 0]);

            expect(hit.point.z).toBeCloseTo(-0.5);
            expect(hit.distance).toBeCloseTo(0.5);
        });

        it('should follow the owner and the parts placed inside the asset', () => {
            const model = node.addComponent(new ModelComponent());
            const part = new Group();
            part.position.set(0, 0, -1);
            part.scale.setScalar(2);
            part.add(cube(0));
            model.setFromGLTF(gltf(part));
            node.position.set(5, 0, 0);

            const [hit] = cast([5, 0, 10]);

            // the part's 2 m cube ends at z 0
            expect(hit.point.z).toBeCloseTo(0);
            expect(cast([7.5, 0, 10])).toHaveLength(0);
        });

        it('should take a skinned mesh in its bind pose', () => {
            const geometry = new BoxGeometry(1, 1, 1);
            const count = geometry.getAttribute('position').count;
            geometry.setAttribute(
                'skinIndex',
                new Uint16BufferAttribute(new Array(count * 4).fill(0), 4),
            );
            geometry.setAttribute(
                'skinWeight',
                new Float32BufferAttribute(
                    new Array(count).fill([1, 0, 0, 0]).flat(),
                    4,
                ),
            );
            const mesh = new SkinnedMesh(geometry, new MeshStandardMaterial());
            const bone = new Bone();
            mesh.add(bone);
            mesh.bind(new Skeleton([bone]));
            bone.position.set(0, 0, -10);
            const model = node.addComponent(new ModelComponent());
            model.setFromGLTF(gltf(mesh));

            expect(cast([0, 0, 10])[0].point.z).toBeCloseTo(0.5);
        });

        it('should test only meshes on the product layer', () => {
            node.addComponent(new FloorComponent());

            expect(cast([3, 10, 0], [0, -1, 0])).toHaveLength(0);
        });

        it('should leave out a hidden mesh', () => {
            const model = node.addComponent(new ModelComponent());
            const hidden = cube(2);
            hidden.visible = false;
            model.setFromGLTF(gltf(cube(-2), hidden));

            expect(cast([0, 0, 10])).toHaveLength(0);
        });

        it('should not take the meshes of child nodes', () => {
            const child = new DIVENode();
            child
                .addComponent(new PrimitiveComponent())
                .setGeometry({ name: 'box', width: 1, height: 1, depth: 1 });
            node.add(child);

            expect(cast([0, 0.5, 10])).toHaveLength(0);
        });

        it('should be hit only by raycasts on its layers', () => {
            addCube();
            collider.layers.mask = PROXY_LAYER_MASK;

            expect(cast([0, 0.5, 10])).toHaveLength(0);
        });
    });

    describe('rebuilding', () => {
        it('should take a finished asset load without a refresh', () => {
            const model = node.addComponent(new ModelComponent());
            expect(cast([0, 0, 10])).toHaveLength(0);

            model.setFromGLTF(gltf(cube(0)));

            expect(cast([0, 0, 10])[0].point.z).toBeCloseTo(0.5);
        });

        it('should drop the content of a removed component', () => {
            const primitive = addCube();
            expect(cast([0, 0.5, 10])).toHaveLength(1);

            node.removeComponent(primitive);

            expect(cast([0, 0.5, 10])).toHaveLength(0);
        });

        it('should take an edit nothing announces after refresh', () => {
            const primitive = addCube();
            expect(cast([0, 1.5, 10])).toHaveLength(0);
            primitive.setGeometry({
                name: 'box',
                width: 1,
                height: 2,
                depth: 1,
            });

            collider.refresh();

            expect(cast([0, 1.5, 10])).toHaveLength(1);
        });

        it('should become empty when a refresh finds no meshes', () => {
            const model = node.addComponent(new ModelComponent());
            const part = cube(0);
            model.setFromGLTF(gltf(part));
            expect(cast([0, 0, 10])).toHaveLength(1);

            part.visible = false;
            collider.refresh();

            expect(cast([0, 0, 10])).toHaveLength(0);
        });

        it('should wrap the meshes of its new owner after a move', () => {
            addCube();
            expect(cast([0, 0.5, 10])).toHaveLength(1);

            const other = new DIVENode();
            other.addComponent(collider);
            node = other;

            expect(cast([0, 0.5, 10])).toHaveLength(0);
        });
    });

    describe('copy', () => {
        it('should carry the layers and wrap the meshes of its own owner', () => {
            addCube();
            collider.layers.mask = PROXY_LAYER_MASK;

            const clone = collider.clone();
            const other = new DIVENode();
            other.addComponent(clone);
            other.updateMatrixWorld(true);
            const raycaster = new Raycaster(
                new Vector3(0, 0.5, 10),
                new Vector3(0, 0, -1),
            );
            raycaster.layers.mask = PROXY_LAYER_MASK;
            const intersects: Intersection[] = [];
            clone.raycast(raycaster, intersects);

            expect(clone.layers.mask).toBe(PROXY_LAYER_MASK);
            expect(intersects).toHaveLength(0);
        });
    });
});
