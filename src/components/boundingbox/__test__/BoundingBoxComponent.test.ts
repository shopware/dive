import {
    BoxGeometry,
    LineBasicMaterial,
    MathUtils,
    Mesh,
    MeshBasicMaterial,
    Vector3,
} from 'three/webgpu';
import { BoundingBoxComponent } from '../BoundingBoxComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { PrimitiveComponent } from '../../mesh/primitive/PrimitiveComponent.ts';
import {
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

const createCube = (size = 2, layerMask = PRODUCT_LAYER_MASK): Mesh => {
    const mesh = new Mesh(
        new BoxGeometry(size, size, size),
        new MeshBasicMaterial(),
    );
    mesh.layers.mask = layerMask;
    return mesh;
};

/** A node with geometry and a bounds component, the way a caller builds one. */
const measured = (
    geometry: Mesh = createCube(),
): { node: DIVENode; bounds: BoundingBoxComponent } => {
    const node = new DIVENode();
    node.add(geometry);

    return { node, bounds: node.addComponent(new BoundingBoxComponent()) };
};

describe('dive/boundingbox/BoundingBoxComponent', () => {
    it('should declare no capability brands', () => {
        /**
         * the old BoundingBox inherited isSelectable and got selected instead
         * of the object it was measuring
         */
        const bounds = new BoundingBoxComponent();

        expect('isSelectable' in bounds).toBe(false);
        expect('isMovable' in bounds).toBe(false);
        expect('isDIVENode' in bounds).toBe(false);
    });

    it('should keep its helpers on the helper layer and hidden', () => {
        const bounds = new BoundingBoxComponent();

        /**
         * named rather than indexed out of `children`: the helpers go into the
         * node now, where they sit beside whatever else is attached
         */
        expect(bounds.contributions).toEqual([
            bounds.boxHelper,
            bounds.sphereHelper,
        ]);
        [bounds.boxHelper, bounds.sphereHelper].forEach((helper) => {
            expect(helper.layers.mask).toBe(HELPER_LAYER_MASK);
            expect(helper.visible).toBe(false);
        });
    });

    it('should be constructible with no arguments', () => {
        // the old class required a target and therefore threw on clone()
        expect(() => new BoundingBoxComponent().clone()).not.toThrow();
    });

    it('should measure its owner as soon as it is attached', () => {
        const { bounds } = measured();

        expect(bounds.box.min.x).toBeCloseTo(-1);
        expect(bounds.size.x).toBeCloseTo(2);
        expect(bounds.center.length()).toBeCloseTo(0);
        expect(bounds.radius).toBeGreaterThan(0);
        expect(bounds.sphere.radius).toBe(bounds.radius);
    });

    it('should measure everything under the owner', () => {
        const { node, bounds } = measured();
        const far = createCube();
        far.position.set(10, 0, 0);
        node.add(far);

        bounds.refresh();

        expect(bounds.box.min.x).toBeCloseTo(-1);
        expect(bounds.box.max.x).toBeCloseTo(11);
    });

    it('should follow the owner into the world', () => {
        const { node, bounds } = measured();
        node.position.set(5, 0, 0);

        bounds.refresh();

        expect(bounds.center.x).toBeCloseTo(5);
    });

    it('should produce an empty box with no owner', () => {
        const bounds = new BoundingBoxComponent().refresh();

        expect(bounds.box.isEmpty()).toBe(true);
        expect(bounds.size.length()).toBe(0);
    });

    it('should ignore its own helper geometry', () => {
        // the old implementation unioned its own sphere helper into the result
        const { bounds } = measured();

        bounds.setBoxHelperVisible(true);
        bounds.setSphereHelperVisible(true);
        bounds.refresh();

        expect(bounds.size.x).toBeCloseTo(2);
    });

    it('should reset between measurements', () => {
        const { node, bounds } = measured(createCube(10));

        node.clear();
        node.add(createCube(2));
        bounds.refresh();

        expect(bounds.size.x).toBeCloseTo(2);
    });

    describe('an oriented box', () => {
        /** A 2 x 1 x 1 node, turned 45 degrees around Y. */
        const turned = (): { node: DIVENode; bounds: BoundingBoxComponent } => {
            const mesh = new Mesh(
                new BoxGeometry(2, 1, 1),
                new MeshBasicMaterial(),
            );
            mesh.layers.mask = PRODUCT_LAYER_MASK;

            const result = measured(mesh);
            result.node.rotation.y = MathUtils.degToRad(45);
            result.bounds.refresh();

            return result;
        };

        it('should enclose the world projection when world-aligned', () => {
            const { bounds } = turned();

            expect(bounds.size.x).toBeCloseTo(2.121, 2);
            expect(bounds.size.z).toBeCloseTo(2.121, 2);
        });

        it('should hug the object when oriented', () => {
            const { bounds } = turned();

            bounds.setOriented(true);

            expect(bounds.oriented).toBe(true);
            expect(bounds.size.x).toBeCloseTo(2);
            expect(bounds.size.y).toBeCloseTo(1);
            expect(bounds.size.z).toBeCloseTo(1);
        });

        it('should keep the scale in the extents', () => {
            // the frame carries position and rotation only, so `size` stays the
            // object's size in the scene rather than the geometry's own numbers
            const { node, bounds } = turned();
            node.scale.setScalar(0.5);

            bounds.setOriented(true);

            expect(bounds.size.x).toBeCloseTo(1);
        });

        it('should report the centre in world space either way', () => {
            const { node, bounds } = turned();
            node.position.set(3, 0, 0);

            bounds.refresh();
            const worldAligned = bounds.center.clone();
            bounds.setOriented(true);

            expect(worldAligned.x).toBeCloseTo(3);
            expect(bounds.center.x).toBeCloseTo(3);
        });

        it('should fit a tighter sphere than the world-aligned box', () => {
            const { bounds } = turned();
            const worldAligned = bounds.radius;

            bounds.setOriented(true);

            expect(bounds.radius).toBeLessThan(worldAligned);
            expect(bounds.radius).toBeCloseTo(Math.sqrt(6) / 2, 3);
        });

        it('should draw the box where the object is', () => {
            // the helper hangs in the owner's children, so its own matrix has to
            // cancel the owner's transform and then re-apply the measured frame
            const { node, bounds } = turned();
            node.position.set(3, 0, 0);
            bounds.setOriented(true);
            node.updateMatrixWorld(true);

            const drawn = new Vector3().setFromMatrixPosition(
                bounds.boxHelper.matrixWorld,
            );

            expect(drawn.x).toBeCloseTo(3);
            expect(drawn.y).toBeCloseTo(0);
            expect(drawn.z).toBeCloseTo(0);
        });

        it('should survive a clone', () => {
            const bounds = new BoundingBoxComponent();
            bounds.setOriented(true);

            expect(bounds.clone().oriented).toBe(true);
        });
    });

    it('should toggle the helpers', () => {
        const bounds = new BoundingBoxComponent();

        bounds.setBoxHelperVisible(true);
        bounds.setSphereHelperVisible(true);
        expect(bounds.boxHelper.visible).toBe(true);
        expect(bounds.sphereHelper.visible).toBe(true);

        bounds.setBoxHelperVisible(false);
        bounds.setSphereHelperVisible(false);
        expect(bounds.boxHelper.visible).toBe(false);
        expect(bounds.sphereHelper.visible).toBe(false);
    });

    it('should set the helper colour', () => {
        const bounds = new BoundingBoxComponent();

        bounds.setHelperColor(0xff0000);

        const helper = bounds.boxHelper;
        expect(
            (helper.material as LineBasicMaterial).color.getHexString(),
        ).toBe('ff0000');
    });

    it('should scale the sphere helper to the measured diameter', () => {
        const { bounds } = measured(createCube(4));

        const scale = new Vector3().setFromMatrixScale(
            bounds.sphereHelper.matrix,
        );
        expect(scale.x).toBeCloseTo(bounds.radius * 2);
    });

    it('should skip an owner without product geometry', () => {
        const bounds = new DIVENode().addComponent(new BoundingBoxComponent());

        expect(bounds.box.isEmpty()).toBe(true);
    });

    describe('watching the owner', () => {
        it('should notice a child arriving', () => {
            // how a finished asset load reaches this: the loader contributes the
            // file's roots to the node, which is a childadded on the node
            const { node, bounds } = measured();
            expect(bounds.size.x).toBeCloseTo(2);

            const far = createCube();
            far.position.set(10, 0, 0);
            node.add(far);

            expect(bounds.box.max.x).toBeCloseTo(11);
        });

        it('should notice a child leaving', () => {
            const { node, bounds } = measured();
            const far = createCube();
            far.position.set(10, 0, 0);
            node.add(far);
            expect(bounds.box.max.x).toBeCloseTo(11);

            node.remove(far);

            expect(bounds.box.max.x).toBeCloseTo(1);
        });

        it('should notice a component arriving with geometry', () => {
            const { node, bounds } = measured();
            expect(bounds.size.x).toBeCloseTo(2);

            const primitive = node.addComponent(new PrimitiveComponent());
            primitive.setGeometry({
                name: 'cube',
                width: 8,
                height: 1,
                depth: 1,
            });
            bounds.refresh();

            expect(bounds.size.x).toBeCloseTo(8);
        });

        it('should notice a component leaving', () => {
            const { node, bounds } = measured();
            const primitive = node.addComponent(new PrimitiveComponent());
            primitive.setGeometry({
                name: 'cube',
                width: 8,
                height: 1,
                depth: 1,
            });
            bounds.refresh();
            expect(bounds.size.x).toBeCloseTo(8);

            node.removeComponent(primitive);

            expect(bounds.size.x).toBeCloseTo(2);
        });

        it('should notice the node moving', () => {
            const { node, bounds } = measured();
            // in a tree, because setPosition stays quiet while a node has no
            // parent: there is no world position to report yet
            new DIVENode().add(node);
            expect(bounds.center.x).toBeCloseTo(0);

            node.setPosition({ x: 5, y: 0, z: 0 });

            expect(bounds.center.x).toBeCloseTo(5);
        });

        it('should measure once for a whole subtree, not once per child', () => {
            // a glTF with fifty roots arrives as fifty childadded events, and an
            // event only marks the box stale
            const { node, bounds } = measured();
            const enclose = vi.spyOn(bounds.boundingBox, 'enclose');

            node.add(createCube(), createCube(), createCube());
            void bounds.size;

            expect(enclose).toHaveBeenCalledTimes(1);
        });

        it('should stop watching a node it left', () => {
            const { node, bounds } = measured();
            void bounds.size;

            new DIVENode().addComponent(bounds);
            const far = createCube();
            far.position.set(10, 0, 0);
            node.add(far);

            // the old owner is not its business any more, and the new one is empty
            expect(bounds.box.isEmpty()).toBe(true);
        });

        it('should tick only while something is drawn', () => {
            const { bounds } = measured();

            expect(bounds.tickEnabled).toBe(false);

            bounds.setBoxHelperVisible(true);
            expect(bounds.tickEnabled).toBe(true);

            bounds.setBoxHelperVisible(false);
            expect(bounds.tickEnabled).toBe(false);
        });

        it('should keep a drawn box current from the tick', () => {
            const { node, bounds } = measured();
            new DIVENode().add(node);
            bounds.setBoxHelperVisible(true);

            node.setPosition({ x: 5, y: 0, z: 0 });
            bounds.tick();

            expect(bounds.center.x).toBeCloseTo(5);
        });
    });

    it('should dispose its helpers', () => {
        const bounds = new BoundingBoxComponent();
        const sphereHelper = bounds.sphereHelper;
        const geometry = vi.spyOn(sphereHelper.geometry, 'dispose');

        bounds.dispose();

        expect(geometry).toHaveBeenCalled();
    });

    it('should give a clone its own helpers, not a second pair', () => {
        /**
         * `Object3D.copy` used to add clones of the source children on top of
         * the pair the constructor made
         */
        const source = new BoundingBoxComponent();

        const copy = source.clone();

        expect(copy.contributions).toEqual([copy.boxHelper, copy.sphereHelper]);
        expect(copy.boxHelper).not.toBe(source.boxHelper);
    });

    it('should carry the helper state along to a clone', () => {
        const source = new BoundingBoxComponent();
        source.setHelperColor(0xff0000);
        source.setBoxHelperVisible(true);

        const copy = source.clone();

        expect(
            (copy.boxHelper.material as LineBasicMaterial).color.getHexString(),
        ).toBe('ff0000');
        expect(copy.boxHelper.visible).toBe(true);
        expect(copy.sphereHelper.visible).toBe(false);
        // and therefore ticks, like the source
        expect(copy.tickEnabled).toBe(true);
    });
});
