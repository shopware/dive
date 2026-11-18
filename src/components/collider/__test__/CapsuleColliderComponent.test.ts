import { Raycaster, Vector3, type Intersection } from 'three/webgpu';
import { CapsuleColliderComponent } from '../CapsuleColliderComponent.ts';
import { type ColliderIntersection } from '../../../engine/collider/ColliderComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { PRODUCT_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

describe('dive/collider/CapsuleColliderComponent', () => {
    let collider: CapsuleColliderComponent;
    let node: DIVENode;

    beforeEach(() => {
        collider = new CapsuleColliderComponent();
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

    const expectPoint = (
        hit: ColliderIntersection,
        [x, y, z]: [number, number, number],
    ): void => {
        expect(hit.point.x).toBeCloseTo(x);
        expect(hit.point.y).toBeCloseTo(y);
        expect(hit.point.z).toBeCloseTo(z);
    };

    describe('construction', () => {
        it('should start one metre up the Y axis with a radius of half a metre', () => {
            expect(collider.start.toArray()).toEqual([0, 0, 0]);
            expect(collider.end.toArray()).toEqual([0, 1, 0]);
            expect(collider.radius).toBe(0.5);
            expect(collider.isEmpty()).toBe(false);
        });

        it('should contribute nothing to the scene graph', () => {
            expect(collider.contributions).toHaveLength(0);
            expect(node.children).toHaveLength(0);
        });
    });

    describe('set', () => {
        it('should size the capsule from its end points and radius', () => {
            collider.set({ x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 }, 7);

            expect(collider.start.toArray()).toEqual([1, 2, 3]);
            expect(collider.end.toArray()).toEqual([4, 5, 6]);
            expect(collider.radius).toBe(7);
        });

        it('should take the radius on its own', () => {
            collider.radius = 2;

            expect(cast([0, 0.5, 10])[0].distance).toBeCloseTo(8);
        });

        it('should take end points edited in place', () => {
            collider.end.set(0, 5, 0);

            expectPoint(cast([0, 20, 0], [0, -1, 0])[0], [0, 5.5, 0]);
        });
    });

    describe('raycast', () => {
        it('should report the entry point on the side', () => {
            const [hit] = cast([0, 0.5, 10]);

            expectPoint(hit, [0, 0.5, 0.5]);
            expect(hit.distance).toBeCloseTo(9.5);
        });

        it('should report the entry point on a slanted side', () => {
            const [hit] = cast([10, 0.5, 10], [-1, 0, -1]);
            const side = 0.5 / Math.SQRT2;

            expectPoint(hit, [side, 0.5, side]);
            expect(hit.distance).toBeCloseTo(10 * Math.SQRT2 - 0.5);
        });

        it('should report the entry point on the side for a ray tilted along the axis', () => {
            const [hit] = cast([0, 10, 10], [0, -1, -1]);

            expectPoint(hit, [0, 0.5, 0.5]);
            expect(hit.distance).toBeCloseTo(9.5 * Math.SQRT2);
        });

        it('should miss where only the endless cylinder would be hit', () => {
            // crosses the side's radius above the end point, clear of the cap
            expect(cast([0, 12.6, 10], [0, -1, -1])).toHaveLength(0);
        });

        it('should report the entry point on either cap', () => {
            expectPoint(cast([0, 10, 0], [0, -1, 0])[0], [0, 1.5, 0]);
            expectPoint(cast([0, -10, 0], [0, 1, 0])[0], [0, -0.5, 0]);
        });

        it('should be rounded at the caps', () => {
            // inside the bounding box, outside the cap
            expect(cast([0.4, 1.4, 10])).toHaveLength(0);

            const [hit] = cast([0.3, 1.3, 10]);
            expectPoint(hit, [0.3, 1.3, Math.sqrt(0.25 - 0.18)]);
        });

        it('should miss beside the capsule', () => {
            expect(cast([0.6, 0.5, 10])).toHaveLength(0);
            expect(cast([0, 1.6, 10])).toHaveLength(0);
        });

        it('should report the owner node and itself', () => {
            const [hit] = cast([0, 0.5, 10]);

            expect(hit.object).toBe(node);
            expect(hit.collider).toBe(collider);
        });

        it('should push only one hit, the nearest', () => {
            expect(cast([0, 10, 0], [0, -1, 0])).toHaveLength(1);
        });

        it('should be hit from inside, where the ray leaves it', () => {
            const [side] = cast([0, 0.5, 0]);
            expectPoint(side, [0, 0.5, -0.5]);
            expect(side.distance).toBeCloseTo(0.5);

            const [cap] = cast([0, 0.5, 0], [0, 1, 0]);
            expectPoint(cap, [0, 1.5, 0]);
            expect(cap.distance).toBeCloseTo(1);
        });

        it('should miss when it lies behind the ray', () => {
            expect(cast([0, 0.5, 10], [0, 0, 1])).toHaveLength(0);
        });

        it('should behave like a sphere when start equals end', () => {
            collider.set({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, 0.5);

            expectPoint(cast([0, 0, 10])[0], [0, 0, 0.5]);
            expect(cast([0.45, 0.45, 10])).toHaveLength(0);
            expectPoint(cast([0, 0, 0])[0], [0, 0, -0.5]);
        });

        it('should never be hit with a negative radius', () => {
            collider.radius = -1;

            expect(collider.isEmpty()).toBe(true);
            expect(cast([0, 0.5, 10])).toHaveLength(0);
            expect(cast([0, 0.5, 0])).toHaveLength(0);
        });

        it('should follow the owner position', () => {
            node.position.set(10, 0, 0);

            expect(cast([0, 0.5, 10])).toHaveLength(0);
            expectPoint(cast([10, 0.5, 10])[0], [10, 0.5, 0.5]);
        });

        it('should follow the owner rotation', () => {
            expect(cast([-0.9, 0, 10])).toHaveLength(0);

            // the axis now runs along -X
            node.rotation.set(0, 0, Math.PI / 2);
            expect(cast([-0.9, 0, 10])).toHaveLength(1);
        });

        it('should follow the owner scale, measuring the distance in world space', () => {
            node.scale.set(4, 4, 4);

            const [hit] = cast([0, 2, 10]);
            expect(hit.point.z).toBeCloseTo(2);
            expect(hit.distance).toBeCloseTo(8);
        });
    });

    describe('copy', () => {
        it('should take over the capsule and the layers', () => {
            collider.set({ x: 1, y: 1, z: 1 }, { x: 2, y: 2, z: 2 }, 3);
            collider.layers.mask = 0b1000;

            const clone = collider.clone();

            expect(clone.start.toArray()).toEqual([1, 1, 1]);
            expect(clone.end.toArray()).toEqual([2, 2, 2]);
            expect(clone.radius).toBe(3);
            expect(clone.layers.mask).toBe(0b1000);
        });

        it('should not share its end points with the source', () => {
            const clone = collider.clone();
            clone.end.set(0, 5, 0);

            expect(collider.end.toArray()).toEqual([0, 1, 0]);
        });
    });
});
