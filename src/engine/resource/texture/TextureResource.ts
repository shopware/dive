import { type Texture } from 'three/webgpu';
import { DIVEResource } from '../Resource.ts';
import { DIVEResourceCache } from '../cache/ResourceCache.ts';
import { type DIVEResourceKind } from '../prototype/ResourcePrototype.ts';
import { loadEquirectangularImage } from './loadEquirectangularImage.ts';

/**
 * Equirectangular images, lent as they are: no user changes a texture, and
 * three uploads the pixels once per `Texture` object.
 */
export const textureResourceKind: DIVEResourceKind<Texture> = {
    load: loadEquirectangularImage,
    freeValue: (texture) => texture.dispose(),
};

/**
 * The prototypes every texture resource shares by default, so a URL is loaded
 * once however often it is used. It keeps the two images let go of last, so
 * switching back to one does not load it again.
 */
export const textureResourceCache = new DIVEResourceCache(textureResourceKind, {
    keep: 2,
});

/**
 * An equirectangular image a DIVE object uses, requested by URL.
 *
 * Texture resources requesting the same URL load it once and share one
 * `Texture`, which is disposed once the last of them lets go and it is no
 * longer among the images their cache keeps.
 */
export class TextureResource extends DIVEResource<Texture> {
    /**
     * @param cache - Where the prototypes are kept; by default the one every
     * texture resource shares.
     */
    constructor(cache: DIVEResourceCache<Texture> = textureResourceCache) {
        super(cache);
    }
}
