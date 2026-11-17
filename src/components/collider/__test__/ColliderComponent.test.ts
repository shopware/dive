import { Raycaster, Vector3, type MeshBasicMaterial } from 'three/webgpu';
import { ColliderComponent } from '../ColliderComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { PROXY_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

describe('dive/collider/ColliderComponent', () => {
    let collider: ColliderComponent;

    beforeEach(() => {
        collider = new ColliderComponent();
    });

    const material = (): MeshBasicMaterial =>
        collider.mesh.material as MeshBasicMaterial;

    /** casts along -Z through (x, y) onto a node holding the collider */
    const hits = (node: DIVENode, x: number, y: number): boolean => {
        node.updateMatrixWorld(true);
        const raycaster = new Raycaster(
            new Vector3(x, y, 10),
            new Vector3(0, 0, -1),
        );
        raycaster.layers.mask = PROXY_LAYER_MASK;

        return raycaster.intersectObject(node, true).length > 0;
    };

    describe('construction', () => {
        it('should start as a unit box around the origin', () => {
            expect(collider.getCenter(new Vector3()).toArray()).toEqual([
                0, 0, 0,
            ]);
            expect(collider.getSize(new Vector3()).toArray()).toEqual([
                1, 1, 1,
            ]);
        });

        it('should be a proxy, invisible through its material', () => {
            expect(collider.mesh.layers.mask).toBe(PROXY_LAYER_MASK);
            expect(material().visible).toBe(false);
            expect(collider.mesh.visible).toBe(true);
        });

        it('should contribute its mesh to the owner', () => {
            const node = new DIVENode();
            node.addComponent(collider);

            expect(node.children).toContain(collider.mesh);
        });
    });

    describe('set', () => {
        it('should place the mesh over the box', () => {
            collider.set({ x: 0, y: 0, z: 0 }, { x: 2, y: 4, z: 6 });

            expect(collider.mesh.position.toArray()).toEqual([1, 2, 3]);
            expect(collider.mesh.scale.toArray()).toEqual([2, 4, 6]);
        });

        it('should keep a flat box hittable', () => {
            collider.set({ x: -1, y: -1, z: 0 }, { x: 1, y: 1, z: 0 });

            expect(collider.mesh.scale.z).toBeGreaterThan(0);

            const node = new DIVENode();
            node.addComponent(collider);
            expect(hits(node, 0, 0)).toBe(true);
        });

        it('should hide the mesh for an empty box', () => {
            collider.set(
                { x: Infinity, y: Infinity, z: Infinity },
                { x: -Infinity, y: -Infinity, z: -Infinity },
            );

            expect(collider.isEmpty()).toBe(true);
            expect(collider.mesh.visible).toBe(false);
        });

        it('should show the mesh again for a box that is not empty', () => {
            collider.set({ x: 1, y: 1, z: 1 }, { x: -1, y: -1, z: -1 });
            collider.set({ x: -1, y: -1, z: -1 }, { x: 1, y: 1, z: 1 });

            expect(collider.mesh.visible).toBe(true);
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
            expect(collider.mesh.position.toArray()).toEqual([1, 0, 0]);
        });
    });

    describe('picking', () => {
        it('should be hit inside the box and missed outside, in the owner space', () => {
            const node = new DIVENode();
            node.position.set(10, 0, 0);
            node.addComponent(collider);

            expect(hits(node, 10, 0)).toBe(true);
            expect(hits(node, 0, 0)).toBe(false);
        });
    });

    describe('copy', () => {
        it('should take over the box', () => {
            collider.set({ x: 0, y: 0, z: 0 }, { x: 2, y: 2, z: 2 });

            const clone = collider.clone();

            expect(clone.getSize(new Vector3()).toArray()).toEqual([2, 2, 2]);
            expect(clone.mesh).not.toBe(collider.mesh);
            expect(clone.mesh.position.toArray()).toEqual([1, 1, 1]);
        });
    });

    describe('dispose', () => {
        it('should dispose geometry and material', () => {
            const geometry = vi.spyOn(collider.mesh.geometry, 'dispose');
            const materialDispose = vi.spyOn(material(), 'dispose');

            collider.dispose();

            expect(geometry).toHaveBeenCalled();
            expect(materialDispose).toHaveBeenCalled();
        });
    });
});
