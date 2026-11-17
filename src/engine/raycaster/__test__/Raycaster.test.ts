import {
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    PerspectiveCamera,
    Raycaster,
    Vector2,
    Vector3,
} from 'three/webgpu';
import { DIVERaycaster } from '../Raycaster.ts';
import { DIVENode } from '../../node/Node.ts';
import { DIVEComponent } from '../../component/Component.ts';
import { BoxColliderComponent } from '../../../components/collider/BoxColliderComponent.ts';
import { SphereColliderComponent } from '../../../components/collider/SphereColliderComponent.ts';
import { type ColliderIntersection } from '../../collider/ColliderComponent.ts';
import {
    PRODUCT_LAYER_MASK,
    PROXY_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

/** a node with a unit box collider, centred at `z` on the ray */
const boxNode = (z: number): DIVENode => {
    const node = new DIVENode();
    node.position.set(0, 0, z);
    node.addComponent(new BoxColliderComponent());
    return node;
};

/** contributes whatever it is given to its owner */
class ContributingComponent extends DIVEComponent {
    public give(object: Object3D): void {
        this.contribute(object);
    }
}

describe('dive/raycaster/DIVERaycaster', () => {
    let world: Object3D;
    let raycaster: DIVERaycaster;

    beforeEach(() => {
        world = new Object3D();
        raycaster = new DIVERaycaster(
            new Vector3(0, 0, 10),
            new Vector3(0, 0, -1),
        );
        raycaster.layers.mask = PRODUCT_LAYER_MASK;
    });

    /** updates the world matrices, like a render would, and casts */
    const cast = (
        object: Object3D = world,
        recursive?: boolean,
    ): ColliderIntersection[] => {
        world.updateMatrixWorld(true);
        return raycaster.intersectObject(
            object,
            recursive,
        ) as ColliderIntersection[];
    };

    it('should be a three raycaster', () => {
        expect(raycaster).toBeInstanceOf(Raycaster);
        expect(raycaster.isDIVERaycaster).toBe(true);
    });

    describe('intersectObject', () => {
        it('should return the owner node of a hit collider', () => {
            const node = boxNode(0);
            world.add(node);

            const hits = cast();

            expect(hits).toHaveLength(1);
            expect(hits[0].object).toBe(node);
            expect(hits[0].distance).toBeCloseTo(9.5);
        });

        it('should report the collider that was hit', () => {
            const node = boxNode(0);
            world.add(node);

            expect(cast()[0].collider).toBe(
                node.getComponent(BoxColliderComponent),
            );
        });

        it('should return nothing when the ray misses', () => {
            const node = boxNode(0);
            node.position.x = 5;
            world.add(node);

            expect(cast()).toEqual([]);
        });

        it('should sort the hits by distance, nearest first', () => {
            const far = boxNode(-4);
            const near = boxNode(4);
            const middle = boxNode(0);
            world.add(far, near, middle);

            expect(cast().map((hit) => hit.object)).toEqual([
                near,
                middle,
                far,
            ]);
        });

        it('should report one hit per collider', () => {
            const node = boxNode(0);
            node.addComponent(new SphereColliderComponent());
            world.add(node);

            const hits = cast();

            expect(hits).toHaveLength(2);
            expect(hits.map((hit) => hit.collider)).toEqual([
                node.getComponent(BoxColliderComponent),
                node.getComponent(SphereColliderComponent),
            ]);
        });

        it('should accept a single node', () => {
            const node = boxNode(0);
            world.add(node, boxNode(4));

            expect(cast(node).map((hit) => hit.object)).toEqual([node]);
        });

        it('should walk down through nested nodes', () => {
            const parent = new DIVENode();
            const child = boxNode(0);
            parent.add(child);
            world.add(parent);

            expect(cast().map((hit) => hit.object)).toEqual([child]);
        });

        it('should not walk into plain three content below the given object', () => {
            const plain = new Object3D();
            plain.add(boxNode(0));
            world.add(plain);

            expect(cast()).toEqual([]);
        });

        it('should always enter the given object, even when it is no node', () => {
            const plain = new Object3D();
            const node = boxNode(0);
            plain.add(node);
            world.add(plain);

            expect(cast(plain).map((hit) => hit.object)).toEqual([node]);
        });

        it('should test only the given object when not recursive', () => {
            const node = boxNode(0);
            node.add(boxNode(4));
            world.add(node);

            expect(cast(node, false).map((hit) => hit.object)).toEqual([node]);
            expect(cast(world, false)).toEqual([]);
        });

        it('should never call the raycast of a mesh', () => {
            const node = boxNode(0);
            const mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial());
            mesh.layers.mask = PRODUCT_LAYER_MASK;
            const raycast = vi.spyOn(Mesh.prototype, 'raycast');
            node.add(mesh);
            world.add(mesh.clone(), node);

            const hits = cast();

            expect(raycast).not.toHaveBeenCalled();
            expect(hits.map((hit) => hit.object)).toEqual([node]);
        });

        it('should skip what a component contributed', () => {
            const owner = new DIVENode();
            const component = new ContributingComponent();
            owner.addComponent(component);
            const contributed = boxNode(0);
            component.give(contributed);
            world.add(owner);

            expect(cast()).toEqual([]);
        });

        it('should not return a hidden node', () => {
            const node = boxNode(0);
            node.setVisibility(false);
            world.add(node);

            expect(cast()).toEqual([]);
        });

        it('should not enter a hidden subtree', () => {
            const group = new DIVENode();
            group.add(boxNode(0));
            group.visible = false;
            world.add(group);

            expect(cast()).toEqual([]);
        });

        it('should append to and return the given target', () => {
            world.add(boxNode(0));
            world.updateMatrixWorld(true);
            const target: ColliderIntersection[] = [];

            const hits = raycaster.intersectObject(world, true, target);

            expect(hits).toBe(target);
            expect(target).toHaveLength(1);
        });
    });

    describe('intersectObjects', () => {
        it('should merge the hits of every object, sorted by distance', () => {
            const far = boxNode(-4);
            const near = boxNode(4);
            world.add(far, near);
            world.updateMatrixWorld(true);

            const hits = raycaster.intersectObjects([far, near]);

            expect(hits.map((hit) => hit.object)).toEqual([near, far]);
        });

        it('should walk down unless told otherwise', () => {
            const parent = new DIVENode();
            const child = boxNode(0);
            parent.add(child);
            world.add(parent);
            world.updateMatrixWorld(true);

            expect(
                raycaster.intersectObjects([parent]).map((hit) => hit.object),
            ).toEqual([child]);
            expect(raycaster.intersectObjects([parent], false)).toEqual([]);
        });

        it('should append to and return the given target', () => {
            world.add(boxNode(0));
            world.updateMatrixWorld(true);
            const target: ColliderIntersection[] = [];

            expect(raycaster.intersectObjects([world], true, target)).toBe(
                target,
            );
            expect(target).toHaveLength(1);
        });
    });

    describe('three behaviour', () => {
        it('should only hit colliders on its layers', () => {
            const product = boxNode(0);
            const proxy = boxNode(4);
            proxy.requireComponent(BoxColliderComponent).layers.mask =
                PROXY_LAYER_MASK;
            world.add(product, proxy);

            expect(cast().map((hit) => hit.object)).toEqual([product]);

            raycaster.layers.mask = PROXY_LAYER_MASK;
            expect(cast().map((hit) => hit.object)).toEqual([proxy]);
        });

        it('should drop hits outside near and far', () => {
            const near = boxNode(4);
            const middle = boxNode(0);
            const far = boxNode(-4);
            world.add(near, middle, far);
            raycaster.near = 6;
            raycaster.far = 12;

            expect(cast().map((hit) => hit.object)).toEqual([middle]);
        });

        it('should cast through a pixel with setFromCamera', () => {
            const camera = new PerspectiveCamera(50, 1, 0.1, 100);
            camera.position.set(0, 0, 10);
            camera.lookAt(0, 0, 0);
            camera.updateMatrixWorld(true);
            const node = boxNode(0);
            node.position.x = 2;
            world.add(node);
            world.updateMatrixWorld(true);

            // the node's centre, projected into normalized device coordinates
            const ndc = new Vector3(2, 0, 0).project(camera);
            raycaster.setFromCamera(new Vector2(ndc.x, ndc.y), camera);

            expect(cast().map((hit) => hit.object)).toEqual([node]);

            raycaster.setFromCamera(new Vector2(0, 0), camera);
            expect(cast()).toEqual([]);
        });
    });
});
