import { Sprite, SpriteMaterial } from 'three/webgpu';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { ImageComponentBase } from '../image/ImageComponentBase.ts';

/**
 * An image drawn as a billboard: it always faces the camera.
 *
 * Its size is in metres, so it shrinks with distance like the content around
 * it. A white image takes on the colour as is, which is how one icon serves in
 * every tint.
 *
 * It sits on {@link HELPER_LAYER_MASK}: an editing aid, kept out of the live
 * view, bounds, exports and picking. A node that should be clickable through
 * its sprite needs a collider of the same size.
 *
 * The image is taken by URL. Every sprite showing one URL shares one loaded
 * texture; {@link dispose} gives it back.
 *
 * @module
 */
export class SpriteComponent extends ImageComponentBase<Sprite> {
    readonly isSpriteComponent: true = true;

    constructor() {
        // the size stays in metres, so the sprite shrinks with distance
        const sprite = new Sprite(
            new SpriteMaterial({ sizeAttenuation: true, transparent: true }),
        );
        sprite.name = 'Sprite';
        sprite.layers.mask = HELPER_LAYER_MASK;

        super(sprite);

        this.name = 'SpriteComponent';
    }

    /** The sprite the image is drawn on. */
    public get sprite(): Sprite {
        return this._object;
    }
}
