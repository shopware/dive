import { type Texture } from 'three/webgpu';
import { DIVEResourcePrototype } from '../prototype/ResourcePrototype.ts';
import { loadEquirectangularImage } from './loadEquirectangularImage.ts';

/**
 * An equirectangular image loaded once for one URL. Each resource draws a
 * clone, which shares the pixel data with it.
 *
 * Not to be confused with three's `TextureSource`, which is the pixel data
 * behind `texture.source`.
 */
export class TextureResourcePrototype extends DIVEResourcePrototype<Texture> {
    protected load(url: string): Promise<Texture> {
        return loadEquirectangularImage(url);
    }

    protected copy(texture: Texture): Texture {
        return texture.clone();
    }

    protected free(texture: Texture): void {
        texture.dispose();
    }
}
