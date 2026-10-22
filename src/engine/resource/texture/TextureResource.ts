import { type Texture } from 'three/webgpu';
import { DIVEResource } from '../Resource.ts';
import { DIVEResourceCache } from '../cache/ResourceCache.ts';
import { TextureResourcePrototype } from './TextureResourcePrototype.ts';

/** every texture resource's prototypes, so a url is loaded once however often used */
const textureResourcePrototypes = new DIVEResourceCache<Texture>(
    (url) => new TextureResourcePrototype(url),
);

/**
 * An equirectangular image a DIVE object uses, requested by URL.
 *
 * Its texture is a clone of its own, drawn from the URL's
 * {@link TextureResourcePrototype}, so texture resources requesting the same
 * URL load it once and share the pixel data.
 */
export class TextureResource extends DIVEResource<Texture> {
    constructor() {
        super(textureResourcePrototypes);
    }
}
