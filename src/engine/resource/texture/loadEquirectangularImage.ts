import {
    EquirectangularReflectionMapping,
    SRGBColorSpace,
    TextureLoader,
    type Texture,
} from 'three/webgpu';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

/**
 * Loads an equirectangular image, picking the loader by file extension, or by
 * content for a `data:` URL, which has none (the bundled default HDR is one).
 *
 * `.hdr` and `.exr` stay linear, everything else goes through the texture
 * loader and is tagged sRGB. The extension is read from the path only, so a
 * query or hash does not hide it. The caller owns the result.
 *
 * @param url - Where the image lives.
 * @returns The texture, mapped as an equirectangular image.
 */
export async function loadEquirectangularImage(url: string): Promise<Texture> {
    const format = imageFormat(url);

    let texture: Texture;
    if (format === 'hdr') {
        texture = await new HDRLoader().loadAsync(url);
    } else if (format === 'exr') {
        texture = await new EXRLoader().loadAsync(url);
    } else {
        texture = await new TextureLoader().loadAsync(url);
        texture.colorSpace = SRGBColorSpace;
    }

    texture.mapping = EquirectangularReflectionMapping;
    return texture;
}

/** `hdr`, `exr` or anything else, from the extension or a data url's content */
function imageFormat(url: string): string | undefined {
    if (/^data:/i.test(url)) return dataImageFormat(url);

    return /\.([a-z0-9]+)$/i.exec(url.split(/[?#]/)[0])?.[1]?.toLowerCase();
}

/** reads the magic bytes of a base64 data url, since its mime type is often generic */
function dataImageFormat(url: string): string | undefined {
    const match = /^data:[^,]*;base64,([A-Za-z0-9+/=]{0,16})/i.exec(url);
    if (!match) return undefined;

    let head: string;
    try {
        head = atob(match[1].slice(0, match[1].length - (match[1].length % 4)));
    } catch {
        return undefined;
    }

    if (head.startsWith('#?RADIANCE') || head.startsWith('#?RGBE'))
        return 'hdr';
    if (head.startsWith('\x76\x2f\x31\x01')) return 'exr';
    return undefined;
}
