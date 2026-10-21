import { type Texture } from 'three/webgpu';
import { DIVEAsset } from '../Asset.ts';
import { loadEquirectangularImage } from './loadEquirectangularImage.ts';

/**
 * A texture asset, loaded from a URL as an equirectangular image or given as
 * a ready texture.
 *
 * Not to be confused with three's `TextureSource`, which is the pixel data
 * behind `texture.source`; this is the texture a DIVE object uses.
 */
export class TextureAsset extends DIVEAsset<Texture> {
    /**
     * @param onChange - Called whenever the texture in place changes.
     */
    constructor(onChange?: () => void) {
        super(
            loadEquirectangularImage,
            (texture) => texture.dispose(),
            onChange,
        );
    }
}
