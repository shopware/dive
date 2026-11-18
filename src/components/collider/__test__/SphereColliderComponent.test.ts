import { Raycaster, Vector3, type Intersection } from 'three/webgpu';
import { SphereColliderComponent } from '../SphereColliderComponent.ts';
import { type ColliderIntersection } from '../../../engine/collider/ColliderComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { PRODUCT_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

describe('dive/collider/SphereColliderComponent', () => {
    let collider: SphereColliderComponent;
    let node: DIVENode;

    beforeEach(() => {
        collider = new SphereColliderComponent();
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

    describe('construction', () => {
        it('should start as a unit-diameter sphere around the origin', () => {
            expect(collider.getCenter(new Vector3()).toArray()).toEqual([
                0, 0, 0,
            ]);
            expect(collider.radius).toBe(0.5);
            expect(collider.isEmpty()).toBe(false);
        });

        it('should contribute nothing to the scene graph', () => {
            expect(collider.contributions).toHaveLength(0);
            expect(node.children).toHaveLength(0);
        });
    });

    describe('set', () => {
        it('should size the sphere from centre and radius', () => {
            collider.set({ x: 1, y: 2, z: 3 }, 4);

            expect(collider.getCenter(new Vector3()).toArray()).toEqual([
                1, 2, 3,
            ]);
            expect(collider.radius).toBe(4);
        });

        it('should take the radius on its own', () => {
            collider.radius = 2;

            expect(collider.radius).toBe(2);
            expect(cast([0, 0, 10])[0].distance).toBeCloseTo(8);
        });
    });

    describe('raycast', () => {
        it('should report the entry point on the sphere', () => {
            const [hit] = cast([0, 0, 10]);

            expect(hit.point.toArray()).toEqual([0, 0, 0.5]);
            expect(hit.distance).toBeCloseTo(9.5);
        });

        it('should miss beside the sphere', () => {
            expect(cast([0.6, 0, 10])).toHaveLength(0);
        });

        it('should miss where a box of the same size would be hit', () => {
            // inside the bounding box, outside the sphere
            expect(cast([0.45, 0.45, 10])).toHaveLength(0);
        });

        it('should report the owner node and itself', () => {
            const [hit] = cast([0, 0, 10]);

            expect(hit.object).toBe(node);
            expect(hit.collider).toBe(collider);
        });

        it('should push only one hit, the nearest', () => {
            expect(cast([0, 0, 10])).toHaveLength(1);
        });

        it('should be hit from inside, where the ray leaves it', () => {
            const [hit] = cast([0, 0, 0]);

            expect(hit.point.z).toBeCloseTo(-0.5);
            expect(hit.distance).toBeCloseTo(0.5);
        });

        it('should follow the owner position', () => {
            node.position.set(10, 0, 0);

            expect(cast([0, 0, 10])).toHaveLength(0);
            expect(cast([10, 0, 10])[0].point.toArray()).toEqual([10, 0, 0.5]);
        });

        it('should follow the owner rotation with an offset centre', () => {
            collider.set({ x: 2, y: 0, z: 0 }, 0.5);

            expect(cast([0, 2, 10])).toHaveLength(0);

            node.rotation.set(0, 0, Math.PI / 2);
            expect(cast([0, 2, 10])).toHaveLength(1);
        });

        it('should follow the owner scale, measuring the distance in world space', () => {
            node.scale.set(4, 4, 4);

            const [hit] = cast([0, 0, 10]);
            expect(hit.point.z).toBeCloseTo(2);
            expect(hit.distance).toBeCloseTo(8);
        });

        it('should never be hit when empty', () => {
            collider.set({ x: 0, y: 0, z: 0 }, -1);

            expect(collider.isEmpty()).toBe(true);
            expect(cast([0, 0, 10])).toHaveLength(0);
            expect(cast([0, 0, 0])).toHaveLength(0);
        });
    });

    describe('copy', () => {
        it('should take over the sphere and the layers', () => {
            collider.set({ x: 1, y: 1, z: 1 }, 2);
            collider.layers.mask = 0b1000;

            const clone = collider.clone();

            expect(clone.getCenter(new Vector3()).toArray()).toEqual([1, 1, 1]);
            expect(clone.radius).toBe(2);
            expect(clone.layers.mask).toBe(0b1000);
        });
    });
});
