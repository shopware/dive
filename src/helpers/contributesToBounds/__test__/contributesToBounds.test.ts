import { Object3D } from 'three/webgpu';
import { contributesToBounds } from '../contributesToBounds.ts';
import {
    DEFAULT_LAYER_MASK,
    FLOOR_LAYER_MASK,
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
    UI_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

describe('dive/helper/contributesToBounds', () => {
    const on = (mask: number): Object3D => {
        const object = new Object3D();
        object.layers.mask = mask;
        return object;
    };

    it('should accept product geometry', () => {
        expect(contributesToBounds(on(PRODUCT_LAYER_MASK))).toBe(true);
    });

    it('should reject floor, helper, ui and default geometry', () => {
        expect(contributesToBounds(on(FLOOR_LAYER_MASK))).toBe(false);
        expect(contributesToBounds(on(HELPER_LAYER_MASK))).toBe(false);
        expect(contributesToBounds(on(UI_LAYER_MASK))).toBe(false);
        expect(contributesToBounds(on(DEFAULT_LAYER_MASK))).toBe(false);
    });

    it('should accept objects that are on the product layer among others', () => {
        expect(
            contributesToBounds(on(PRODUCT_LAYER_MASK | HELPER_LAYER_MASK)),
        ).toBe(true);
    });

    it('should reject objects on no layer at all', () => {
        expect(contributesToBounds(on(0))).toBe(false);
    });
});
