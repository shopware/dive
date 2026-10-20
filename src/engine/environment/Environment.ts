import { type WebGPURenderer } from 'three/webgpu';
import defaultEnvUrl from '../../../assets/maps/env/default.hdr?url';
import {
    type DIVEBackground,
    type DIVEBackgroundSettings,
    type DIVEScene,
} from '../scene/Scene.ts';

/**
 * @deprecated Use `scene.setImageBasedLight` and `scene.setBackground`.
 */
export type DIVEEnvironmentSettings = {
    /**
     * Whether to enable the image-based lighting.
     *
     * @default true
     * @deprecated Use `scene.setImageBasedLight(null)` to turn it off.
     */
    enabled: boolean;
    /**
     * The URL of the HDR image.
     *
     * @default defaultEnvUrl from assets/maps/env/default.hdr
     * @deprecated Use `scene.setImageBasedLight({ image })`.
     */
    imageUrl: string;
    /**
     * Whether to use the HDR image as a background image.
     *
     * @default false
     * @deprecated Use `scene.setBackground({ image, rotation })`.
     */
    useAsBackground: boolean;
    /**
     * The rotation of the HDR image in radians.
     *
     * @default 0
     * @deprecated Use `scene.setImageBasedLight({ rotation })`.
     */
    rotateY: number;
};

/**
 * @deprecated Use `DIVEImageBasedLightDefaultSettings`.
 */
export const DIVEEnvironmentDefaultSettings: DIVEEnvironmentSettings = {
    enabled: true,
    imageUrl: defaultEnvUrl,
    useAsBackground: false,
    rotateY: 0,
};

/**
 * The old way to set the image based light and to show its image as the
 * background. Only forwards to the scene, which the renderer bakes from.
 *
 * @deprecated Use `scene.setImageBasedLight` and `scene.setBackground`.
 */
export class DIVEEnvironment {
    private _scene: DIVEScene;

    private _enabled = true;
    private _useAsBackground = false;

    /** the background to go back to once the image is no longer shown */
    private _backgroundBefore: DIVEBackground = null;

    /** the newest image request made here */
    private _imageLoad: Promise<void> = Promise.resolve();

    private _disposed = false;

    /**
     * @param _renderer - Unused; the renderer bakes from the scene itself.
     * @param scene - The scene to forward to.
     * @param options - Applied to the scene; what is left out stays as the
     * scene has it.
     */
    constructor(
        _renderer: WebGPURenderer,
        scene: DIVEScene,
        options: Partial<DIVEEnvironmentSettings> = {},
    ) {
        this._scene = scene;

        if (options.enabled === false) {
            this._enabled = false;
            this._forward(scene.setImageBasedLight(null));
        } else if (options.imageUrl !== undefined) {
            this._imageLoad = this._forward(
                scene.setImageBasedLight({ image: options.imageUrl }),
            );
        }
        if (options.rotateY !== undefined) this.setRotationY(options.rotateY);
        if (options.useAsBackground) this.setUseAsBackground(true);
    }

    /**
     * Resolves once the image requested here has loaded.
     *
     * @deprecated The renderer applies the scene's image based light itself.
     */
    public async initAsync(): Promise<void> {
        await this._imageLoad;
    }

    /**
     * Stops what is still pending from reaching the scene.
     *
     * @deprecated The renderer frees what it baked itself.
     */
    public dispose(): void {
        this._disposed = true;
    }

    /**
     * Does nothing, the renderer applies changes on its next frame.
     *
     * @deprecated The renderer applies the scene's image based light itself.
     */
    public update(): void {}

    /**
     * Does nothing, the renderer rebakes on a new canvas itself.
     *
     * @deprecated The renderer rebakes on a new canvas itself.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public setRenderer(_renderer: WebGPURenderer): void {}

    /**
     * Sets the image of the image based light, and of the background while
     * the image is used as one.
     *
     * @param url - The URL of the image, `null` for the default HDR.
     * @deprecated Use `scene.setImageBasedLight({ image })`.
     */
    public async setImageUrl(url: string | null): Promise<void> {
        this._enabled = true;
        this._imageLoad = this._forward(
            this._scene.setImageBasedLight({ image: url ?? defaultEnvUrl }),
        );
        await this._imageLoad;

        if (this._useAsBackground) await this._showImage();
    }

    /**
     * Rotates the image based light, and the background if it is an image.
     *
     * @param radians - The rotation around Y.
     * @deprecated Use `scene.setImageBasedLight({ rotation })` and
     * `scene.setBackground({ image, rotation })`.
     */
    public setRotationY(radians: number): void {
        if (this._enabled) {
            this._forward(
                this._scene.setImageBasedLight({ rotation: radians }),
            );
        }

        const background = this._scene.getBackground();
        if (background?.type === 'image') {
            this._forward(
                this._scene.setBackground({
                    image: background.image,
                    rotation: radians,
                }),
            );
        }
    }

    /**
     * Shows the image of the image based light as the background, or goes
     * back to the background from before.
     *
     * @param useAsBackground - Whether to show the image.
     * @deprecated Use `scene.setBackground({ image, rotation })`.
     */
    public setUseAsBackground(useAsBackground: boolean): void {
        if (useAsBackground === this._useAsBackground) return;
        this._useAsBackground = useAsBackground;

        if (useAsBackground) {
            this._backgroundBefore = this._scene.getBackground();
            this._forward(this._showImage());
            return;
        }

        this._forward(
            this._scene.setBackground(toSettings(this._backgroundBefore)),
        );
    }

    /** puts the light's image on the background, once it has loaded */
    private async _showImage(): Promise<void> {
        if (!this._enabled) return;

        // resolves with the image on its way, or at once with the recorded one
        await this._scene.setImageBasedLight({});

        const light = this._scene.imageBasedLight;
        if (this._disposed || !this._useAsBackground || !light?.texture) {
            return;
        }

        // the light's texture, borrowed, so the image is loaded only once
        await this._scene.setBackground({
            image: light.texture,
            rotation: light.rotation,
        });
    }

    /** reports a failure nobody awaits; a caller who awaits still gets it */
    private _forward(promise: Promise<void>): Promise<void> {
        promise.catch((error: unknown) => {
            console.error('DIVEEnvironment: forwarding failed', error);
        });
        return promise;
    }
}

/** the settings that record the given background again */
function toSettings(background: DIVEBackground): DIVEBackgroundSettings {
    if (background === null) return null;
    if (background.type === 'color') return background.color;
    return { image: background.image, rotation: background.rotation };
}
