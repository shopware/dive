import {
    Box3,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Object3D,
} from 'three/webgpu';
import { DIVERoot } from '../Root.ts';
import { FloorComponent } from '../../../../components/mesh/floor/FloorComponent.ts';
import {
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
    UI_LAYER_MASK,
} from '../../../../constants/VisibilityLayerMask.ts';

/**
 * Uses real three: `computeSceneBB` now measures actual geometry through
 * `computeProductBounds`, so a hand-rolled `Object3D` mock cannot exercise it.
 * The previous version of these tests only asserted `instanceof Box3`, which
 * held regardless of what the box contained.
 */

/** A 1x1x1 cube on the given layer, centred on its own origin. */
const createCube = (layerMask: number): Mesh => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial());
    mesh.layers.mask = layerMask;
    return mesh;
};

describe('dive/engine/DIVERoot', () => {
    let root: DIVERoot;

    beforeEach(() => {
        root = new DIVERoot();
    });

    describe('constructor', () => {
        it('should initialize with correct properties', () => {
            expect(root.isDIVERoot).toBe(true);
            expect(root.name).toBe('Root');
            expect(root.floor).toBeInstanceOf(FloorComponent);
        });
    });

    describe('computeSceneBB', () => {
        it('should return an empty box for a scene holding only the floor', () => {
            const bb = root.computeSceneBB();

            expect(bb).toBeInstanceOf(Box3);
            // the floor is on its own layer, so it must not inflate the box
            expect(bb.isEmpty()).toBe(true);
        });

        it('should measure product geometry', () => {
            root.add(createCube(PRODUCT_LAYER_MASK));
            root.updateMatrixWorld(true);

            const bb = root.computeSceneBB();

            expect(bb.min.x).toBeCloseTo(-0.5);
            expect(bb.max.y).toBeCloseTo(0.5);
        });

        it('should union multiple product objects', () => {
            const first = createCube(PRODUCT_LAYER_MASK);
            const second = createCube(PRODUCT_LAYER_MASK);
            second.position.set(4, 0, 0);
            root.add(first, second);
            root.updateMatrixWorld(true);

            const bb = root.computeSceneBB();

            expect(bb.min.x).toBeCloseTo(-0.5);
            expect(bb.max.x).toBeCloseTo(4.5);
        });

        it('should exclude helper and ui geometry', () => {
            const helper = createCube(HELPER_LAYER_MASK);
            helper.position.set(100, 0, 0);
            const handle = createCube(UI_LAYER_MASK);
            handle.position.set(-100, 0, 0);
            root.add(helper, handle, createCube(PRODUCT_LAYER_MASK));
            root.updateMatrixWorld(true);

            const bb = root.computeSceneBB();

            expect(bb.min.x).toBeCloseTo(-0.5);
            expect(bb.max.x).toBeCloseTo(0.5);
        });

        it('should measure product geometry nested inside plain objects', () => {
            const wrapper = new Object3D();
            wrapper.position.set(0, 3, 0);
            wrapper.add(createCube(PRODUCT_LAYER_MASK));
            root.add(wrapper);
            root.updateMatrixWorld(true);

            const bb = root.computeSceneBB();

            expect(bb.min.y).toBeCloseTo(2.5);
            expect(bb.max.y).toBeCloseTo(3.5);
        });

        it('should respect the root transform', () => {
            root.add(createCube(PRODUCT_LAYER_MASK));
            root.position.set(10, 0, 0);
            root.updateMatrixWorld(true);

            const bb = root.computeSceneBB();

            expect(bb.min.x).toBeCloseTo(9.5);
            expect(bb.max.x).toBeCloseTo(10.5);
        });
    });
});
