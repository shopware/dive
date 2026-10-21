import { type Texture } from 'three/webgpu';
import { DIVEAsset } from '../Asset.ts';
import { DIVEAssetCache } from '../cache/AssetCache.ts';
import { loadEquirectangularImage } from './loadEquirectangularImage.ts';

/** every texture asset's images, so a url is loaded once however often used */
const equirectangularImages = new DIVEAssetCache<Texture>(
    loadEquirectangularImage,
    (texture) => texture.dispose(),
);

/**
 * A texture asset, loaded from a URL as an equirectangular image. Texture
 * assets requesting the same URL share one texture.
 *
 * Not to be confused with three's `TextureSource`, which is the pixel data
 * behind `texture.source`; this is the texture a DIVE object uses.
 */
export class TextureAsset extends DIVEAsset<Texture> {
    /**
     * @param onChange - Called whenever the texture in place changes.
     */
    constructor(onChange?: () => void) {
        super(equirectangularImages, onChange);
    }
}
