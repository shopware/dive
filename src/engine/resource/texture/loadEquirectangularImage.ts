import {
    EquirectangularReflectionMapping,
    SRGBColorSpace,
    TextureLoader,
    type Texture,
} from 'three/webgpu';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

/**
 * Loads an equirectangular image, picking the loader by file extension.
 *
 * `.hdr` and `.exr` stay linear, everything else goes through the texture
 * loader and is tagged sRGB. The extension is read from the path only, so a
 * query or hash does not hide it. The caller owns the result.
 *
 * @param url - Where the image lives.
 * @returns The texture, mapped as an equirectangular image.
 */
export async function loadEquirectangularImage(url: string): Promise<Texture> {
    const extension = /\.([a-z0-9]+)$/i
        .exec(url.split(/[?#]/)[0])?.[1]
        ?.toLowerCase();

    let texture: Texture;
    if (extension === 'hdr') {
        texture = await new HDRLoader().loadAsync(url);
    } else if (extension === 'exr') {
        texture = await new EXRLoader().loadAsync(url);
    } else {
        texture = await new TextureLoader().loadAsync(url);
        texture.colorSpace = SRGBColorSpace;
    }

    texture.mapping = EquirectangularReflectionMapping;
    return texture;
}
