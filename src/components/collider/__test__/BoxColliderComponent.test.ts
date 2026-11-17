import { Raycaster, Vector3, type Intersection } from 'three/webgpu';
import { BoxColliderComponent } from '../BoxColliderComponent.ts';
import { type ColliderIntersection } from '../../../engine/collider/ColliderComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { PRODUCT_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

describe('dive/collider/BoxColliderComponent', () => {
    let collider: BoxColliderComponent;
    let node: DIVENode;

    beforeEach(() => {
        collider = new BoxColliderComponent();
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
        it('should start as a unit box around the origin', () => {
            expect(collider.getCenter(new Vector3()).toArray()).toEqual([
                0, 0, 0,
            ]);
            expect(collider.getSize(new Vector3()).toArray()).toEqual([
                1, 1, 1,
            ]);
            expect(collider.isEmpty()).toBe(false);
        });

        it('should contribute nothing to the scene graph', () => {
            expect(collider.contributions).toHaveLength(0);
            expect(node.children).toHaveLength(0);
            expect('mesh' in collider).toBe(false);
        });
    });

    describe('set', () => {
        it('should size the box from its corners', () => {
            collider.set({ x: 0, y: 0, z: 0 }, { x: 2, y: 4, z: 6 });

            expect(collider.getCenter(new Vector3()).toArray()).toEqual([
                1, 2, 3,
            ]);
            expect(collider.getSize(new Vector3()).toArray()).toEqual([
                2, 4, 6,
            ]);
        });
    });

    describe('setFromCenterAndSize', () => {
        it('should size the box around the centre', () => {
            collider.setFromCenterAndSize(
                { x: 1, y: 0, z: 0 },
                { x: 2, y: 2, z: 2 },
            );

            expect(collider.getCenter(new Vector3()).toArray()).toEqual([
                1, 0, 0,
            ]);
            expect(collider.getSize(new Vector3()).toArray()).toEqual([
                2, 2, 2,
            ]);
        });
    });

    describe('raycast', () => {
        it('should report the entry point on the box', () => {
            const [hit] = cast([0, 0, 10]);

            expect(hit.point.toArray()).toEqual([0, 0, 0.5]);
            expect(hit.distance).toBeCloseTo(9.5);
        });

        it('should miss beside the box', () => {
            expect(cast([2, 0, 10])).toHaveLength(0);
        });

        it('should report the owner node and itself', () => {
            const [hit] = cast([0, 0, 10]);

            expect(hit.object).toBe(node);
            expect(hit.collider).toBe(collider);
        });

        it('should push only one hit, the nearest', () => {
            expect(cast([0, 0, 10])).toHaveLength(1);
        });

        it('should follow the owner position', () => {
            node.position.set(10, 0, 0);

            expect(cast([0, 0, 10])).toHaveLength(0);
            expect(cast([10, 0, 10])[0].point.toArray()).toEqual([10, 0, 0.5]);
        });

        it('should follow the owner rotation', () => {
            collider.set({ x: -2, y: -0.5, z: -0.5 }, { x: 2, y: 0.5, z: 0.5 });

            expect(cast([0, 1.5, 10])).toHaveLength(0);

            node.rotation.set(0, 0, Math.PI / 2);
            expect(cast([0, 1.5, 10])).toHaveLength(1);
        });

        it('should follow the owner scale, measuring the distance in world space', () => {
            node.scale.set(4, 4, 4);

            const [hit] = cast([1.5, 0, 10]);
            expect(hit.point.x).toBeCloseTo(1.5);
            expect(hit.point.z).toBeCloseTo(2);
            expect(hit.distance).toBeCloseTo(8);
        });

        it('should be hit when flat', () => {
            collider.set({ x: -1, y: -1, z: 0 }, { x: 1, y: 1, z: 0 });

            const [hit] = cast([0, 0, 10]);
            expect(hit.distance).toBeCloseTo(10);
        });

        it('should never be hit when empty', () => {
            collider.set(
                { x: Infinity, y: Infinity, z: Infinity },
                { x: -Infinity, y: -Infinity, z: -Infinity },
            );

            expect(collider.isEmpty()).toBe(true);
            expect(cast([0, 0, 10])).toHaveLength(0);
        });
    });

    describe('copy', () => {
        it('should take over the box', () => {
            collider.set({ x: 0, y: 0, z: 0 }, { x: 2, y: 2, z: 2 });

            const clone = collider.clone();

            expect(clone.getSize(new Vector3()).toArray()).toEqual([2, 2, 2]);
            expect(clone.getCenter(new Vector3()).toArray()).toEqual([1, 1, 1]);
        });
    });
});
