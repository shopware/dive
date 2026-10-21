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

    private _useAsBackground = false;

    /** the background to go back to once the image is no longer shown */
    private _backgroundBefore: DIVEBackground = null;

    /** the newest image request made here */
    private _imageLoad: Promise<void> = Promise.resolve();

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
            this._reportFailure(scene.setImageBasedLight(null));
        } else if (options.imageUrl !== undefined) {
            this._imageLoad = this._reportFailure(
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
     * Does nothing, the scene owns everything forwarded to it.
     *
     * @deprecated The renderer frees what it baked itself.
     */
    public dispose(): void {}

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
        this._imageLoad = this._scene.setImageBasedLight({ image: url });

        const loads = [this._imageLoad];
        if (this._useAsBackground) loads.push(this._showImage());
        await Promise.all(loads);
    }

    /**
     * Rotates the image based light, and the background if it is an image.
     *
     * @param radians - The rotation around Y.
     * @deprecated Use `scene.setImageBasedLight({ rotation })` and
     * `scene.setBackground({ image, rotation })`.
     */
    public setRotationY(radians: number): void {
        // a rotation alone would turn a light that is off back on
        if (this._scene.imageBasedLight) {
            this._reportFailure(
                this._scene.setImageBasedLight({ rotation: radians }),
            );
        }

        const background = this._scene.getBackground();
        if (background?.type === 'image') {
            this._reportFailure(
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
            this._reportFailure(this._showImage());
            return;
        }

        this._reportFailure(
            this._scene.setBackground(
                toBackgroundSettings(this._backgroundBefore),
            ),
        );
    }

    /** puts the light's image on the background, which shares its load */
    private async _showImage(): Promise<void> {
        const light = this._scene.imageBasedLight;
        if (!light) return;

        await this._scene.setBackground({
            image: light.image ?? defaultEnvUrl,
            rotation: light.rotation,
        });
    }

    /** logs a failure nobody awaits and settles either way */
    private _reportFailure(promise: Promise<void>): Promise<void> {
        return promise.catch((error: unknown) => {
            console.error('DIVEEnvironment: forwarding failed', error);
        });
    }
}

/** the settings that request the given background again */
function toBackgroundSettings(
    background: DIVEBackground,
): DIVEBackgroundSettings {
    if (background === null) return null;
    if (background.type === 'color') return background.color;
    return { image: background.image, rotation: background.rotation };
}
