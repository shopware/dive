import {
    Sprite,
    SpriteMaterial,
    type Color,
    type ColorRepresentation,
} from 'three/webgpu';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../../engine/component/Component.ts';
import { ImageResource } from '../../engine/resource/image/ImageResource.ts';

/**
 * An image drawn as a billboard: it always faces the camera.
 *
 * Its size is in metres, so it shrinks with distance like the content around
 * it. A white image takes on the colour as is, which is how one icon serves in
 * every tint.
 *
 * It sits on {@link HELPER_LAYER_MASK}: an editing aid, kept out of the live
 * view, bounds, exports and picking. A node that should be clickable through
 * its sprite needs a collider of the same size.
 *
 * The image is taken by URL. Every sprite showing one URL shares one loaded
 * texture; {@link dispose} gives it back.
 *
 * @module
 */
export class SpriteComponent extends DIVEComponent {
    readonly isSpriteComponent: true = true;

    private _sprite: Sprite;
    private _image: string | null = null;
    private _texture = new ImageResource();

    constructor() {
        super();

        this.name = 'SpriteComponent';

        // the size stays in metres, so the sprite shrinks with distance
        this._sprite = new Sprite(
            new SpriteMaterial({ sizeAttenuation: true, transparent: true }),
        );
        this._sprite.name = 'Sprite';
        this._sprite.layers.mask = HELPER_LAYER_MASK;

        this.contribute(this._sprite);
    }

    /** The sprite the image is drawn on. */
    public get sprite(): Sprite {
        return this._sprite;
    }

    /** The URL of the image asked for, `null` for none. */
    public get image(): string | null {
        return this._image;
    }

    /** The colour the image is multiplied with. */
    public get color(): Color {
        return this._sprite.material.color;
    }

    /** How opaque the sprite is, from 0 to 1. */
    public get opacity(): number {
        return this._sprite.material.opacity;
    }

    /** The width in metres. */
    public get width(): number {
        return this._sprite.scale.x;
    }

    /** The height in metres. */
    public get height(): number {
        return this._sprite.scale.y;
    }

    /**
     * Shows the image of a URL. The previous one stays until the new one has
     * loaded.
     *
     * @param url - The URL of the image, or `null` for none.
     * @returns Resolves once the image is shown, or was overtaken by a newer
     * call.
     */
    public async setImage(url: string | null): Promise<this> {
        this._image = url;

        if (url === null) {
            this._texture.clear();
        } else {
            await this._texture.request(url);
        }

        this._showImage();

        return this;
    }

    /**
     * @param color - The colour the image is multiplied with; a white image
     * takes it on as is.
     */
    public setColor(color: ColorRepresentation): this {
        this._sprite.material.color.set(color);

        return this;
    }

    /**
     * @param opacity - How opaque the sprite is, from 0 to 1.
     */
    public setOpacity(opacity: number): this {
        this._sprite.material.opacity = opacity;

        return this;
    }

    /**
     * @param width - The width in metres.
     * @param height - The height in metres.
     */
    public setSize(width: number, height: number): this {
        this._sprite.scale.set(width, height, 1);

        return this;
    }

    /**
     * Requests the source's image again, which shares its texture. To wait
     * for it, await `setImage(copy.image)`.
     *
     * @param source - The component to copy from.
     */
    public copy(source: this): this {
        super.copy(source);

        this.setColor(source.color);
        this.setOpacity(source.opacity);
        this.setSize(source.width, source.height);
        this.setImage(source.image).catch((error: unknown) => {
            // nobody awaits a copy, so this is the only report
            console.error('SpriteComponent: image failed', error);
        });

        return this;
    }

    /** Frees the material and gives back its image. */
    public dispose(): void {
        this._texture.dispose();
        this._sprite.material.dispose();
    }

    private _showImage(): void {
        const material = this._sprite.material;
        if (material.map === this._texture.value) return;

        material.map = this._texture.value;
        material.needsUpdate = true;
    }
}
