import {
    Box3Helper,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Object3D,
} from 'three/webgpu';
import { BoundsComponent } from '../BoundsComponent.ts';
import { DIVENode } from '../../node/Node.ts';
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

describe('dive/bounds/BoundsComponent', () => {
    it('should declare no capability brands', () => {
        // the old BoundingBox extended DIVENode and inherited isSelectable,
        // which made it terminate the findInterface walk and get selected
        // instead of the object it was measuring
        const bounds = new BoundsComponent();

        expect('isSelectable' in bounds).toBe(false);
        expect('isMovable' in bounds).toBe(false);
        expect('isDIVENode' in bounds).toBe(false);
    });

    it('should keep its helpers on the helper layer and hidden', () => {
        const bounds = new BoundsComponent();

        expect(bounds.children).toHaveLength(2);
        bounds.children.forEach((helper) => {
            expect(helper.layers.mask).toBe(HELPER_LAYER_MASK);
            expect(helper.visible).toBe(false);
        });
    });

    it('should be constructible with no arguments', () => {
        // the old class required a target and therefore threw on clone()
        expect(() => new BoundsComponent().clone()).not.toThrow();
    });

    it('should measure an explicit target', () => {
        const bounds = new BoundsComponent().setTarget(createCube());

        expect(bounds.box.min.x).toBeCloseTo(-1);
        expect(bounds.size.x).toBeCloseTo(2);
        expect(bounds.center.length()).toBeCloseTo(0);
        expect(bounds.radius).toBeGreaterThan(0);
        expect(bounds.sphere.radius).toBe(bounds.radius);
    });

    it('should measure a list of targets', () => {
        const near = createCube();
        const far = createCube();
        far.position.set(10, 0, 0);

        const bounds = new BoundsComponent().setTarget([near, far]);

        expect(bounds.box.min.x).toBeCloseTo(-1);
        expect(bounds.box.max.x).toBeCloseTo(11);
    });

    it('should default to measuring its owner', () => {
        const node = new DIVENode();
        node.add(createCube());
        const bounds = node.addComponent(new BoundsComponent());

        bounds.setTarget();

        expect(bounds.size.x).toBeCloseTo(2);
    });

    it('should produce an empty box with no target and no owner', () => {
        const bounds = new BoundsComponent().setTarget();

        expect(bounds.box.isEmpty()).toBe(true);
    });

    it('should ignore its own helper geometry', () => {
        // the old implementation unioned its own sphere helper into the result
        const node = new DIVENode();
        node.add(createCube());
        const bounds = node.addComponent(new BoundsComponent());

        bounds.setBoxHelperVisible(true);
        bounds.setSphereHelperVisible(true);
        bounds.setTarget();

        expect(bounds.size.x).toBeCloseTo(2);
    });

    it('should reset between measurements', () => {
        const bounds = new BoundsComponent();

        bounds.setTarget(createCube(10));
        bounds.setTarget(createCube(2));

        expect(bounds.size.x).toBeCloseTo(2);
    });

    it('should toggle the helpers', () => {
        const bounds = new BoundsComponent();

        bounds.setBoxHelperVisible(true);
        bounds.setSphereHelperVisible(true);
        expect(bounds.children.every((helper) => helper.visible)).toBe(true);

        bounds.setBoxHelperVisible(false);
        bounds.setSphereHelperVisible(false);
        expect(bounds.children.every((helper) => !helper.visible)).toBe(true);
    });

    it('should set the helper colour', () => {
        const bounds = new BoundsComponent();

        bounds.setHelperColor(0xff0000);

        const helper = bounds.children[0] as Box3Helper;
        expect(
            (helper.material as MeshBasicMaterial).color.getHexString(),
        ).toBe('ff0000');
    });

    it('should scale the sphere helper to the measured radius', () => {
        const bounds = new BoundsComponent().setTarget(createCube(4));

        const sphereHelper = bounds.children[1];
        expect(sphereHelper.scale.x).toBeCloseTo(bounds.radius);
    });

    it('should skip targets without product geometry', () => {
        const bounds = new BoundsComponent().setTarget(new Object3D());

        expect(bounds.box.isEmpty()).toBe(true);
    });

    it('should dispose its helpers', () => {
        const bounds = new BoundsComponent();
        const sphereHelper = bounds.children[1] as Mesh;
        const geometry = vi.spyOn(sphereHelper.geometry, 'dispose');

        bounds.dispose();

        expect(geometry).toHaveBeenCalled();
    });
});
