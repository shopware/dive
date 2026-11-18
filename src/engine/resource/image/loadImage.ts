import { SRGBColorSpace, TextureLoader, type Texture } from 'three/webgpu';

/**
 * Loads a plain image, such as a PNG or an SVG, as an sRGB texture with
 * three's default UV mapping. The caller owns the result.
 *
 * @param url - Where the image lives.
 */
export async function loadImage(url: string): Promise<Texture> {
    const texture = await new TextureLoader().loadAsync(url);
    texture.colorSpace = SRGBColorSpace;

    return texture;
}
