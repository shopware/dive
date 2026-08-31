import { type Object3D } from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';

/**
 * Decides whether an object's geometry counts as real content.
 *
 * This is the single answer to "should this be measured, snapped against or
 * exported?". It is a plain layer test on purpose: the visibility layers already
 * encode exactly this distinction -- `PRODUCT` is real geometry, while `UI`
 * handles, `HELPER` visualisations and the `FLOOR` ground plane are not. Adding
 * a component or helper therefore never requires touching the call sites, only
 * picking the right layer.
 *
 * Note this deliberately ignores `visible`, matching the previous behaviour:
 * hiding an object does not shrink the scene bounds.
 *
 * @param object - The object to test.
 */
export function contributesToBounds(object: Object3D): boolean {
    return (object.layers.mask & PRODUCT_LAYER_MASK) !== 0;
}
