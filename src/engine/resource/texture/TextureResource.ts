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

/** every texture resource's prototypes, so a url is loaded once however often used */
const textureResourcePrototypes = new DIVEResourceCache(textureResourceKind);

/**
 * An equirectangular image a DIVE object uses, requested by URL.
 *
 * Texture resources requesting the same URL load it once and share one
 * `Texture`, which is disposed once the last of them lets go.
 */
export class TextureResource extends DIVEResource<Texture> {
    /**
     * @param cache - Where the prototypes are kept; by default the one every
     * texture resource shares.
     */
    constructor(cache: DIVEResourceCache<Texture> = textureResourcePrototypes) {
        super(cache);
    }
}
