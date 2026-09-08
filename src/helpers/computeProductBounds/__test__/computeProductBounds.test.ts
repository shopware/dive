import {
    Box3,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Object3D,
} from 'three/webgpu';
import { computeProductBounds } from '../computeProductBounds.ts';
import {
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

const createCube = (layerMask = PRODUCT_LAYER_MASK): Mesh => {
    const mesh = new Mesh(new BoxGeometry(2, 2, 2), new MeshBasicMaterial());
    mesh.layers.mask = layerMask;
    return mesh;
};

describe('dive/helper/computeProductBounds', () => {
    it('should return an empty box for an object without geometry', () => {
        const bounds = computeProductBounds(new Object3D());

        expect(bounds.isEmpty()).toBe(true);
    });

    it('should measure a single mesh', () => {
        const bounds = computeProductBounds(createCube());

        expect(bounds.min.x).toBeCloseTo(-1);
        expect(bounds.max.z).toBeCloseTo(1);
    });

    it('should apply world transforms', () => {
        const parent = new Object3D();
        parent.position.set(5, 0, 0);
        parent.add(createCube());

        const bounds = computeProductBounds(parent);

        expect(bounds.min.x).toBeCloseTo(4);
        expect(bounds.max.x).toBeCloseTo(6);
    });

    it('should account for scale', () => {
        const cube = createCube();
        cube.scale.set(2, 1, 1);

        const bounds = computeProductBounds(cube);

        expect(bounds.min.x).toBeCloseTo(-2);
        expect(bounds.max.x).toBeCloseTo(2);
    });

    it('should skip geometry outside the product layer', () => {
        const parent = new Object3D();
        const helper = createCube(HELPER_LAYER_MASK);
        helper.position.set(50, 0, 0);
        parent.add(createCube(), helper);

        const bounds = computeProductBounds(parent);

        expect(bounds.max.x).toBeCloseTo(1);
    });

    it('should return an empty box when only non-product geometry is present', () => {
        const bounds = computeProductBounds(createCube(HELPER_LAYER_MASK));

        expect(bounds.isEmpty()).toBe(true);
    });

    it('should write into a provided target box', () => {
        const target = new Box3();

        const bounds = computeProductBounds(createCube(), target);

        expect(bounds).toBe(target);
        expect(target.max.x).toBeCloseTo(1);
    });

    it('should reset a reused target box', () => {
        const target = new Box3();

        computeProductBounds(createCube(), target);
        // second pass over an object with no geometry must clear the box
        computeProductBounds(new Object3D(), target);

        expect(target.isEmpty()).toBe(true);
    });

    it('should compute the geometry bounding box when it is missing', () => {
        const cube = createCube();
        cube.geometry.boundingBox = null;

        const bounds = computeProductBounds(cube);

        expect(cube.geometry.boundingBox).not.toBeNull();
        expect(bounds.max.x).toBeCloseTo(1);
    });

    it('should union nested product meshes', () => {
        const parent = new Object3D();
        const far = createCube();
        far.position.set(10, 0, 0);
        const wrapper = new Object3D();
        wrapper.add(far);
        parent.add(createCube(), wrapper);

        const bounds = computeProductBounds(parent);

        expect(bounds.min.x).toBeCloseTo(-1);
        expect(bounds.max.x).toBeCloseTo(11);
    });
});
