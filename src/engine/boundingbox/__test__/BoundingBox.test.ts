import {
    BoxGeometry,
    MathUtils,
    Mesh,
    MeshBasicMaterial,
    Object3D,
} from 'three/webgpu';
import { BoundingBox } from '../BoundingBox.ts';
import {
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

const createMesh = (
    x = 1,
    y = 1,
    z = 1,
    layerMask = PRODUCT_LAYER_MASK,
): Mesh => {
    const mesh = new Mesh(new BoxGeometry(x, y, z), new MeshBasicMaterial());
    mesh.layers.mask = layerMask;

    return mesh;
};

/** A 2 x 1 x 1 object under a parent, so the parent can be turned. */
const turned = (degrees: number): Object3D => {
    const parent = new Object3D();
    parent.add(createMesh(2, 1, 1));
    parent.rotation.y = MathUtils.degToRad(degrees);

    return parent;
};

describe('dive/engine/BoundingBox', () => {
    it('should start out empty', () => {
        const bounds = new BoundingBox();

        expect(bounds.isEmpty).toBe(true);
        expect(bounds.size.length()).toBe(0);
        expect(bounds.radius).toBe(-1);
    });

    it('should enclose one object', () => {
        const bounds = new BoundingBox().enclose(createMesh(2, 2, 2));

        expect(bounds.size.x).toBeCloseTo(2);
        expect(bounds.center.length()).toBeCloseTo(0);
        expect(bounds.radius).toBeCloseTo(Math.sqrt(3));
    });

    it('should enclose a list of objects', () => {
        const near = createMesh(2, 2, 2);
        const far = createMesh(2, 2, 2);
        far.position.set(10, 0, 0);

        const bounds = new BoundingBox().enclose([near, far]);

        expect(bounds.box.min.x).toBeCloseTo(-1);
        expect(bounds.box.max.x).toBeCloseTo(11);
    });

    it('should enclose everything below what it was given', () => {
        const parent = new Object3D();
        const child = createMesh(2, 2, 2);
        child.position.set(4, 0, 0);
        parent.add(child);

        const bounds = new BoundingBox().enclose(parent);

        expect(bounds.center.x).toBeCloseTo(4);
    });

    it('should count only real geometry', () => {
        // helpers, the ground plane and gizmo handles must never widen a box
        const parent = new Object3D();
        parent.add(createMesh(2, 2, 2));
        const helper = createMesh(20, 20, 20, HELPER_LAYER_MASK);
        parent.add(helper);

        const bounds = new BoundingBox().enclose(parent);

        expect(bounds.size.x).toBeCloseTo(2);
    });

    it('should stay empty when there is nothing to measure', () => {
        const bounds = new BoundingBox().enclose(new Object3D());

        expect(bounds.isEmpty).toBe(true);
        expect(bounds.radius).toBe(-1);
    });

    it('should reset between measurements', () => {
        const bounds = new BoundingBox().enclose(createMesh(10, 10, 10));

        bounds.enclose(createMesh(2, 2, 2));

        expect(bounds.size.x).toBeCloseTo(2);
    });

    describe('world-aligned against oriented', () => {
        it('should enclose the world projection when world-aligned', () => {
            const bounds = new BoundingBox().enclose(turned(45));

            expect(bounds.size.x).toBeCloseTo(2.121, 2);
            expect(bounds.size.z).toBeCloseTo(2.121, 2);
            expect(bounds.frame.equals(bounds.frame.clone().identity())).toBe(
                true,
            );
        });

        it('should hug the object when oriented to it', () => {
            const object = turned(45);

            const bounds = new BoundingBox().encloseOriented(object, object);

            expect(bounds.size.x).toBeCloseTo(2);
            expect(bounds.size.y).toBeCloseTo(1);
            expect(bounds.size.z).toBeCloseTo(1);
        });

        it('should keep the scale in the extents', () => {
            // the frame carries position and rotation only, or `size` would
            // report the geometry's own numbers rather than the size in the scene
            const object = turned(45);
            object.scale.setScalar(0.5);

            const bounds = new BoundingBox().encloseOriented(object, object);

            expect(bounds.size.x).toBeCloseTo(1);
        });

        it('should report the centre in world space either way', () => {
            const object = turned(45);
            object.position.set(3, 0, 0);

            const worldAligned = new BoundingBox().enclose(object);
            const oriented = new BoundingBox().encloseOriented(object, object);

            expect(worldAligned.center.x).toBeCloseTo(3);
            expect(oriented.center.x).toBeCloseTo(3);
        });

        it('should fit a tighter sphere when oriented', () => {
            const object = turned(45);

            const worldAligned = new BoundingBox().enclose(object).radius;
            const oriented = new BoundingBox().encloseOriented(
                object,
                object,
            ).radius;

            expect(oriented).toBeLessThan(worldAligned);
            expect(oriented).toBeCloseTo(Math.sqrt(6) / 2, 3);
        });

        it('should align to a frame other than what it measures', () => {
            // the frame is an argument, not the measured object: a box can be
            // aligned to anything, which is what lets a component use its owner
            const object = turned(0);
            const frame = new Object3D();
            frame.rotation.y = MathUtils.degToRad(90);

            const bounds = new BoundingBox().encloseOriented(object, frame);

            expect(bounds.size.x).toBeCloseTo(1);
            expect(bounds.size.z).toBeCloseTo(2);
        });

        it('should go back to world axes on the next plain enclose', () => {
            const object = turned(45);
            const bounds = new BoundingBox().encloseOriented(object, object);

            bounds.enclose(object);

            expect(bounds.size.x).toBeCloseTo(2.121, 2);
        });
    });

    it('should empty itself on clear', () => {
        const bounds = new BoundingBox().enclose(createMesh(2, 2, 2));

        bounds.clear();

        expect(bounds.isEmpty).toBe(true);
        expect(bounds.center.length()).toBe(0);
        expect(bounds.radius).toBe(-1);
    });
});
