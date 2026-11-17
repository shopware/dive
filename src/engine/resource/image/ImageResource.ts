import { type Texture } from 'three/webgpu';
import { DIVEResource } from '../Resource.ts';
import { DIVEResourceCache } from '../cache/ResourceCache.ts';
import { type DIVEResourceKind } from '../prototype/ResourcePrototype.ts';
import { loadImage } from './loadImage.ts';

/**
 * Plain images, lent as they are: no user changes a texture, and three
 * uploads the pixels once per `Texture` object.
 *
 * Separate from `textureResourceKind`, which maps every image as an
 * equirectangular environment.
 */
export const imageResourceKind: DIVEResourceKind<Texture> = {
    load: loadImage,
    freeValue: (texture) => texture.dispose(),
};

/**
 * The prototypes every image resource shares by default, so a URL is loaded
 * once however many sprites show it. It keeps the two images let go of last.
 */
export const imageResourceCache = new DIVEResourceCache(imageResourceKind, {
    keep: 2,
});

/**
 * A plain image a DIVE object uses, requested by URL.
 *
 * Image resources requesting the same URL load it once and share one
 * `Texture`, which is disposed once the last of them lets go and it is no
 * longer among the images their cache keeps.
 */
export class ImageResource extends DIVEResource<Texture> {
    /**
     * @param cache - Where the prototypes are kept; by default the one every
     * image resource shares.
     */
    constructor(cache: DIVEResourceCache<Texture> = imageResourceCache) {
        super(cache);
    }
}
