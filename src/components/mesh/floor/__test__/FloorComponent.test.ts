import { Color, MeshStandardMaterial } from 'three/webgpu';
import { FloorComponent } from '../FloorComponent.ts';
import { MeshComponent } from '../../../mesh/MeshComponent.ts';
import { DIVENode } from '../../../../engine/node/Node.ts';
import { computeProductBounds } from '../../../../helpers/computeProductBounds/computeProductBounds.ts';
import {
    FLOOR_LAYER_MASK,
    PRODUCT_LAYER_MASK,
} from '../../../../constants/VisibilityLayerMask.ts';

describe('dive/floor/FloorComponent', () => {
    let floor: FloorComponent;

    beforeEach(() => {
        floor = new FloorComponent();
    });

    it('should reuse the mesh component machinery', () => {
        const node = new DIVENode();
        node.addComponent(floor);

        expect(floor).toBeInstanceOf(MeshComponent);
        expect(node.getComponent(MeshComponent)).toBe(floor);
    });

    it('should sit on its own layer, not the product layer', () => {
        /**
         * this single difference is what keeps a 1000x1000 plane out of every
         * bounding box, every export and every pick
         */
        expect(floor.mesh!.layers.mask).toBe(FLOOR_LAYER_MASK);
        expect(floor.mesh!.layers.mask & PRODUCT_LAYER_MASK).toBe(0);
    });

    it('should not contribute to product bounds', () => {
        const node = new DIVENode();
        node.addComponent(floor);

        expect(computeProductBounds(node).isEmpty()).toBe(true);
    });

    it('should receive shadows', () => {
        expect(floor.mesh!.receiveShadow).toBe(true);
    });

    it('should span a large area', () => {
        floor.mesh!.geometry.computeBoundingBox();

        const box = floor.mesh!.geometry.boundingBox!;
        expect(box.max.x - box.min.x).toBeCloseTo(1000);
        expect(box.max.z - box.min.z).toBeCloseTo(1000);
    });

    it('should lie flat at the origin', () => {
        floor.mesh!.geometry.computeBoundingBox();

        const box = floor.mesh!.geometry.boundingBox!;
        expect(box.max.y).toBeCloseTo(0);
        expect(box.min.y).toBeCloseTo(0);
    });

    it('should toggle visibility', () => {
        floor.setVisibility(false);
        expect(floor.visible).toBe(false);

        floor.setVisibility(true);
        expect(floor.visible).toBe(true);
    });

    it('should set the colour from a number', () => {
        floor.setColor(0xff0000);

        expect(
            (floor.material as MeshStandardMaterial).color.getHexString(),
        ).toBe('ff0000');
    });

    it('should set the colour from a string', () => {
        floor.setColor('#00ff00');

        expect(
            (floor.material as MeshStandardMaterial).color.getHexString(),
        ).toBe('00ff00');
    });

    it('should accept a Color instance', () => {
        floor.setColor(new Color(0x0000ff));

        expect(
            (floor.material as MeshStandardMaterial).color.getHexString(),
        ).toBe('0000ff');
    });

    it('should be constructible with no arguments', () => {
        expect(() => new FloorComponent().clone()).not.toThrow();
    });

    it('should carry colour and visibility along to a clone', () => {
        // the floor's material never comes from setMaterial, so the base copies
        // nothing and this has to be its own override
        floor.setColor(0x123456);
        floor.setVisibility(false);

        const copy = floor.clone();

        expect(
            (copy.material as MeshStandardMaterial).color.getHexString(),
        ).toBe('123456');
        expect(copy.visible).toBe(false);
    });
});
