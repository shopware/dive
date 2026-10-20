import { type Texture } from 'three/webgpu';
import { loadEquirectangularImage } from '../../../helpers/loadEquirectangularImage/loadEquirectangularImage.ts';

/**
 * One equirectangular image a scene uses: the texture in place, the load on
 * its way, and whether the texture is the scene's to dispose.
 *
 * A texture passed in is borrowed, one loaded from a URL is owned. Of
 * overlapping requests the last one wins, and an image loaded for a request
 * that was overtaken is disposed.
 */
export class ImageSlot {
    private _image: string | Texture | null = null;
    private _texture: Texture | null = null;
    private _owned = false;
    private _version = 0;

    /** the load serving the newest request; replacing it makes it stale */
    private _pending: {
        image: string;
        done: Promise<void>;
    } | null = null;

    private _disposed = false;

    /**
     * @param _onChange - Called whenever the texture in place changes.
     */
    constructor(private _onChange: () => void = () => {}) {}

    /** The image the texture in place came from, `null` for none. */
    public get image(): string | Texture | null {
        return this._image;
    }

    public get texture(): Texture | null {
        return this._texture;
    }

    /** Counts every change of the texture, including to and from none. */
    public get version(): number {
        return this._version;
    }

    /**
     * Puts an image in place. One from a URL replaces the current one only
     * once it has loaded.
     *
     * @param image - A URL, or a texture to borrow.
     * @returns Resolves once the image is in place or was overtaken.
     */
    public async request(image: string | Texture): Promise<void> {
        // the image already on its way
        if (this._pending?.image === image) return this._pending.done;

        this._pending = null;
        if (this._image === image) return;

        if (typeof image !== 'string') {
            this._set(image, image, false);
            return;
        }

        // registered before the load starts, so a request during it sees it
        const pending = { image, done: Promise.resolve() };
        this._pending = pending;
        pending.done = this._load(pending);
        return pending.done;
    }

    /** Drops the image in place and any load on its way. */
    public clear(): void {
        this._pending = null;
        this._set(null, null, false);
    }

    /** Frees an owned texture; a load still on its way frees its own. */
    public dispose(): void {
        this._disposed = true;
        this._pending = null;
        if (this._owned) this._texture?.dispose();
        this._owned = false;
    }

    private async _load(
        pending: NonNullable<ImageSlot['_pending']>,
    ): Promise<void> {
        let texture: Texture;
        try {
            texture = await loadEquirectangularImage(pending.image);
        } catch (error) {
            // a failed load must not answer the next request for the same image
            if (this._pending === pending) this._pending = null;
            throw error;
        }

        // overtaken by a newer request or by dispose
        if (this._disposed || this._pending !== pending) {
            texture.dispose();
            return;
        }

        this._pending = null;
        this._set(pending.image, texture, true);
    }

    private _set(
        image: string | Texture | null,
        texture: Texture | null,
        owned: boolean,
    ): void {
        if (texture === this._texture) return;

        if (this._owned) this._texture?.dispose();
        this._image = image;
        this._texture = texture;
        this._owned = owned;
        this._version++;
        this._onChange();
    }
}
