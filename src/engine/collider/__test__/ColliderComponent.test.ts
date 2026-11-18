import { Raycaster, Vector3, type Intersection } from 'three/webgpu';
import {
    ColliderComponent,
    type ColliderHit,
    type ColliderIntersection,
} from '../ColliderComponent.ts';
import { DIVENode } from '../../node/Node.ts';
import {
    PRODUCT_LAYER_MASK,
    PROXY_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

/** a collider that is hit wherever the ray is, at a fixed distance */
class FixedCollider extends ColliderComponent {
    public distance = 5;

    protected intersectRay(raycaster: Raycaster): ColliderHit | null {
        return {
            distance: this.distance,
            point: raycaster.ray.at(this.distance, new Vector3()),
        };
    }
}

describe('dive/collider/ColliderComponent', () => {
    let collider: FixedCollider;
    let node: DIVENode;
    let raycaster: Raycaster;

    beforeEach(() => {
        collider = new FixedCollider();
        node = new DIVENode();
        node.addComponent(collider);
        raycaster = new Raycaster(new Vector3(0, 0, 10), new Vector3(0, 0, -1));
        raycaster.layers.mask = PRODUCT_LAYER_MASK;
    });

    const cast = (): ColliderIntersection[] => {
        const intersects: Intersection[] = [];
        collider.raycast(raycaster, intersects);
        return intersects as ColliderIntersection[];
    };

    describe('outline', () => {
        it('should draw nothing for a collider that does not outline itself', () => {
            const target: number[] = [];

            collider.outline(target);

            expect(target).toEqual([]);
        });
    });

    describe('layers', () => {
        it('should default to the product layer', () => {
            expect(collider.layers.mask).toBe(PRODUCT_LAYER_MASK);
        });

        it('should not be hit by a raycaster on other layers', () => {
            raycaster.layers.mask = PROXY_LAYER_MASK;

            expect(cast()).toHaveLength(0);
        });

        it('should be hit once its layers match the raycaster', () => {
            raycaster.layers.mask = PROXY_LAYER_MASK;
            collider.layers.mask = PROXY_LAYER_MASK;

            expect(cast()).toHaveLength(1);
        });

        it('should be copied', () => {
            collider.layers.mask = PROXY_LAYER_MASK;

            expect(collider.clone().layers.mask).toBe(PROXY_LAYER_MASK);
        });
    });

    describe('raycast', () => {
        it('should report the owner node as object, and itself', () => {
            const [hit] = cast();

            expect(hit.object).toBe(node);
            expect(hit.collider).toBe(collider);
            expect(hit.distance).toBe(5);
            expect(hit.point.toArray()).toEqual([0, 0, 5]);
        });

        it('should append to what is already there', () => {
            const intersects: Intersection[] = [cast()[0]];
            collider.raycast(raycaster, intersects);

            expect(intersects).toHaveLength(2);
        });

        it('should report nothing outside near and far', () => {
            raycaster.near = 6;
            expect(cast()).toHaveLength(0);

            raycaster.near = 0;
            raycaster.far = 4;
            expect(cast()).toHaveLength(0);
        });

        it('should report nothing while detached', () => {
            node.removeComponent(collider);

            expect(cast()).toHaveLength(0);
        });
    });
});
