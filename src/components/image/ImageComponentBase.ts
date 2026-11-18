import {
    type Color,
    type ColorRepresentation,
    type Material,
    type Object3D,
    type Texture,
} from 'three/webgpu';
import { DIVEComponent } from '../../engine/component/Component.ts';
import { ImageResource } from '../../engine/resource/image/ImageResource.ts';

/** A material an image can be drawn with: tinted, faded and mapped. */
export type ImageMaterial = Material & {
    color: Color;
    map: Texture | null;
};

/**
 * What an image component draws on: a three object with one image material,
 * such as a `Sprite` or a `Mesh` with a basic material.
 */
export type ImageObject<M extends ImageMaterial = ImageMaterial> = Object3D & {
    material: M;
};

/**
 * The shared half of the image components: the image by URL, colour, opacity,
 * size, copying and disposal. A subclass builds the object, passes it to the
 * constructor and applies the size in {@link applySize}.
 *
 * The object has to start at 1 x 1 m, the size reported before
 * {@link setSize} is called.
 *
 * Every component showing one URL shares one loaded texture; {@link dispose}
 * gives it back.
 */
export abstract class ImageComponentBase<
    O extends ImageObject = ImageObject,
> extends DIVEComponent {
    protected readonly _object: O;

    private _image: string | null = null;
    private _width = 1;
    private _height = 1;
    private _texture = new ImageResource();

    /**
     * @param object - What the image is drawn on; it is contributed to the
     * owner.
     */
    constructor(object: O) {
        super();

        this._object = object;
        this.contribute(object);
    }

    /** The URL of the image asked for, `null` for none. */
    public get image(): string | null {
        return this._image;
    }

    /** The colour the image is multiplied with. */
    public get color(): Color {
        return this._object.material.color;
    }

    /** How opaque the image is, from 0 to 1. */
    public get opacity(): number {
        return this._object.material.opacity;
    }

    /** The width in metres. */
    public get width(): number {
        return this._width;
    }

    /** The height in metres. */
    public get height(): number {
        return this._height;
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
        this._object.material.color.set(color);

        return this;
    }

    /**
     * @param opacity - How opaque the image is, from 0 to 1.
     */
    public setOpacity(opacity: number): this {
        this._object.material.opacity = opacity;

        return this;
    }

    /**
     * @param width - The width in metres.
     * @param height - The height in metres.
     */
    public setSize(width: number, height: number): this {
        this._width = width;
        this._height = height;
        this.applySize(width, height);

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
            console.error(`${this.name}: image failed`, error);
        });

        return this;
    }

    /** Frees the material and gives back its image. */
    public dispose(): void {
        this._texture.dispose();
        this._object.material.dispose();
    }

    /**
     * Gives the object its size.
     *
     * @param width - The width in metres.
     * @param height - The height in metres.
     */
    protected abstract applySize(width: number, height: number): void;

    private _showImage(): void {
        const material = this._object.material;
        if (material.map === this._texture.value) return;

        material.map = this._texture.value;
        material.needsUpdate = true;
    }
}
