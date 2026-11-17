import {
    BoxGeometry,
    DoubleSide,
    Group,
    Mesh,
    MeshStandardMaterial,
    PlaneGeometry,
    Raycaster,
    Vector3,
    type Intersection,
    type Object3D,
} from 'three/webgpu';
import { ModelComponent } from '../../mesh/model/ModelComponent.ts';
import { FloorComponent } from '../../mesh/floor/FloorComponent.ts';
import { MeshColliderComponent } from '../MeshColliderComponent.ts';
import { type ColliderIntersection } from '../ColliderComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { PrimitiveComponent } from '../../mesh/primitive/PrimitiveComponent.ts';
import { PRODUCT_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

describe('dive/collider/MeshColliderComponent', () => {
    let collider: MeshColliderComponent;
    let node: DIVENode;

    beforeEach(() => {
        collider = new MeshColliderComponent();
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

    /** a front-sided 2 m plane facing +Z, at the given position */
    const plane = (x: number, y: number, z: number): Mesh => {
        const mesh = new Mesh(
            new PlaneGeometry(2, 2),
            new MeshStandardMaterial(),
        );
        mesh.position.set(x, y, z);
        return mesh;
    };

    /** a thin chair leg, 0.5 m high, standing at `x` */
    const leg = (x: number): Mesh => {
        const mesh = new Mesh(
            new BoxGeometry(0.05, 0.5, 0.05),
            new MeshStandardMaterial(),
        );
        mesh.position.set(x, 0.25, 0);
        return mesh;
    };

    /** wraps root nodes the way the loader returns a glTF scene */
    const gltf = (...roots: Object3D[]): Group => {
        const scene = new Group();
        scene.add(...roots);
        return scene;
    };

    /** a 1 m cube primitive on the collider's node */
    const addCube = (): PrimitiveComponent => {
        const primitive = node.addComponent(new PrimitiveComponent());
        primitive.setGeometry({
            name: 'box',
            width: 1,
            height: 1,
            depth: 1,
        });
        return primitive;
    };

    describe('raycast', () => {
        it('should report the point on the surface of a primitive', () => {
            addCube();

            const [hit] = cast([0, 0.5, 10]);

            expect(hit.point.z).toBeCloseTo(0.5);
            expect(hit.distance).toBeCloseTo(9.5);
            expect(hit.object).toBe(node);
            expect(hit.collider).toBe(collider);
        });

        it('should miss beside the surfaces', () => {
            addCube();

            expect(cast([2, 0.5, 10])).toHaveLength(0);
        });

        it('should never be hit without meshes', () => {
            expect(cast([0, 0.5, 10])).toHaveLength(0);
        });

        it('should push only one hit, the nearest, however many triangles the ray crosses', () => {
            addCube();
            const model = node.addComponent(new ModelComponent());
            model.setFromGLTF(gltf(plane(0, 0, -3)));

            const hits = cast([0, 0.5, 10]);

            expect(hits).toHaveLength(1);
            expect(hits[0].distance).toBeCloseTo(9.5);
        });

        it('should test only meshes on the product layer', () => {
            node.addComponent(new FloorComponent());

            expect(cast([3, 10, 0], [0, -1, 0])).toHaveLength(0);
        });

        it('should hit a finished asset load without a refresh', () => {
            const model = node.addComponent(new ModelComponent());
            expect(cast([0, 0, 10])).toHaveLength(0);

            const root = new Group();
            root.add(plane(0, 0, 1));
            model.setFromGLTF(gltf(root));

            expect(cast([0, 0, 10])[0].distance).toBeCloseTo(9);
        });

        it('should hit a swapped primitive geometry without a refresh', () => {
            const primitive = addCube();
            expect(cast([0, 1.5, 10])).toHaveLength(0);

            primitive.setGeometry({
                name: 'box',
                width: 1,
                height: 2,
                depth: 1,
            });

            expect(cast([0, 1.5, 10])).toHaveLength(1);
        });

        it('should not test the meshes of child nodes', () => {
            const child = new DIVENode();
            const primitive = child.addComponent(new PrimitiveComponent());
            primitive.setGeometry({
                name: 'box',
                width: 1,
                height: 1,
                depth: 1,
            });
            node.add(child);

            expect(cast([0, 0.5, 10])).toHaveLength(0);
        });

        it('should honour a front-sided material, hit from behind', () => {
            const model = node.addComponent(new ModelComponent());
            model.setFromGLTF(gltf(plane(0, 0, 0)));

            expect(cast([0, 0, -10], [0, 0, 1])).toHaveLength(0);
        });

        it('should hit a double-sided surface from behind', () => {
            const model = node.addComponent(new ModelComponent());
            const surface = plane(0, 0, 0);
            (surface.material as MeshStandardMaterial).side = DoubleSide;
            model.setFromGLTF(gltf(surface));

            expect(cast([0, 0, -10], [0, 0, 1])[0].distance).toBeCloseTo(10);
        });

        it('should miss through a gap in the model', () => {
            const model = node.addComponent(new ModelComponent());
            const chair = new Group();
            chair.add(leg(-0.4), leg(0.4));
            model.setFromGLTF(gltf(chair));

            expect(cast([0.4, 0.25, 10])).toHaveLength(1);
            expect(cast([0, 0.25, 10])).toHaveLength(0);
        });

        it('should follow the owner transform', () => {
            addCube();
            node.position.set(10, 0, 0);

            expect(cast([0, 0.5, 10])).toHaveLength(0);
            expect(cast([10, 0.5, 10])[0].point.x).toBeCloseTo(10);
        });
    });

    describe('copy', () => {
        it('should clone into a collider that tests its own owner', () => {
            addCube();
            const clone = collider.clone();

            expect(clone).toBeInstanceOf(MeshColliderComponent);
            expect(clone.layers.mask).toBe(collider.layers.mask);
        });
    });
});
