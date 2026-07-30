import {
    CubeCamera,
    EquirectangularReflectionMapping,
    Mesh,
    MeshBasicMaterial,
    PMREMGenerator,
    Scene,
    Texture,
    CubeRenderTarget,
    RenderTarget,
    WebGPURenderer,
    BackSide,
    SphereGeometry,
    NoToneMapping,
    LinearSRGBColorSpace,
    HalfFloatType,
} from 'three/webgpu';
import { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
import defaultEnvUrl from '../../../assets/maps/env/default.hdr?url';
import { DIVEAbortablePromise } from '../promise/abortable/AbortablePromise.ts';

export type DIVEEnvironmentSettings = {
    /**
     * Whether to enable the image-based lighting.
     *
     * @default true
     */
    enabled: boolean;
    /**
     * The URL of the HDR image.
     *
     * @default defaultEnvUrl from assets/maps/env/default.hdr
     */
    imageUrl: string;
    /**
     * Whether to use the HDR image as a background image.
     *
     * @default false
     */
    useAsBackground: boolean;
    /**
     * The intensity of the environment lighting.
     *
     * @default 1
     */
    globalEnvIntensity: number;
    /**
     * The exposure of the HDR image.
     *
     * @default 1
     */
    exposure: number;
    /**
     * The rotation of the HDR image in radians.
     *
     * @default 0
     */
    rotateY: number;
    /**
     * Whether to replace the existing lights (can be restored via `restoreLights`).
     *
     * @default false
     */
    replaceLights?: boolean;
};

export const DIVEEnvironmentDefaultSettings: DIVEEnvironmentSettings = {
    enabled: true,
    imageUrl: defaultEnvUrl,
    useAsBackground: false,
    rotateY: 0,
    globalEnvIntensity: 1.0, // deprecated
    exposure: 1.0, // deprecated
    replaceLights: false, // deprecated
};

/**
 * Manages an image-based lighting setup with optional Y-rotation.
 *
 * Rotation is achieved by rendering the equirect HDR to a skybox that is
 * rotated around Y, capturing it into a cubemap with CubeCamera, and then
 * generating a PMREM for scene.environment.
 */
export class DIVEEnvironment {
    // The background to put back once the HDR is no longer used as one.
    private originalBackground: typeof Scene.prototype.background = null;

    // The background this environment last put on the scene itself.
    private installedBackground: typeof Scene.prototype.background = null;

    private _webgpurenderer: WebGPURenderer;
    private scene: Scene;
    private pmrem: PMREMGenerator;
    private currentEnvRT: RenderTarget | null = null;
    private currentBackgroundCube: CubeRenderTarget | null = null;
    private sourceImage: Texture | null = null;
    private options: DIVEEnvironmentSettings;
    private _loadPromise: Promise<void>;
    private _initPromise: DIVEAbortablePromise<void> | null = null;
    private _sourceImageLoadId = 0;
    private _initRequested = false;
    private _disposed = false;

    constructor(
        renderer: WebGPURenderer,
        scene: Scene,
        options: Partial<DIVEEnvironmentSettings> = {},
    ) {
        this._webgpurenderer = renderer;
        this.scene = scene;

        this.pmrem = new PMREMGenerator(renderer);
        this.options = {
            ...DIVEEnvironmentDefaultSettings,
            ...options,
        };

        this._loadPromise = this._loadSourceImage(this.options.imageUrl);
    }

    public async initAsync(): Promise<void> {
        this._initRequested = true;

        if (!this._initPromise) {
            this._initPromise = new DIVEAbortablePromise<void>(
                async (signal) => {
                    await this._loadPromise;

                    if (
                        signal.aborted ||
                        this._disposed ||
                        !this._webgpurenderer.initialized
                    )
                        return;

                    this.update();
                },
            );
        }

        return this._initPromise;
    }

    /**
     * Disposes the environment.
     */
    public dispose(): void {
        this._disposed = true;
        this.pmrem.dispose();
        this.sourceImage?.dispose();
        this.sourceImage = null;
        this.clearEnvironment();
    }

    /**
     * Whether `scene.background` is still the one this environment installed.
     *
     * A foreign value means something else has changed the background in the
     * meantime, which makes it the value to restore instead.
     */
    private ownsSceneBackground(): boolean {
        return (
            this.installedBackground !== null &&
            this.scene.background === this.installedBackground
        );
    }

    private clearEnvironment(): void {
        this.scene.environment = null;

        // never revert a background that was not put there by this environment
        if (this.ownsSceneBackground()) {
            this.scene.background = this.originalBackground;
            this.installedBackground = null;
        }

        if (this.currentEnvRT) {
            this.currentEnvRT.texture.dispose();
            this.currentEnvRT.dispose();
            this.currentEnvRT = null;
        }
        if (this.currentBackgroundCube) {
            this.currentBackgroundCube.texture.dispose();
            this.currentBackgroundCube.dispose();
            this.currentBackgroundCube = null;
        }
    }

    /**
     * Updates the environment.
     *
     * - Creates a sky scene with a large inward-facing sphere with equirectangular mapping for correct UVs.
     * - Renders the equirect HDR to a cubemap with CubeCamera.
     * - Generates a PMREM from the cubemap.
     * - Updates the scene environment with the PMREM.
     * - Handles background image replacement logic.
     * - Early-returns if the source image is not loaded.
     */
    public update(): void {
        if (!this._webgpurenderer.initialized) return;

        // a background we did not install belongs to someone else and is the one
        // to restore, so it has to be picked up before it gets overwritten
        if (!this.ownsSceneBackground()) {
            this.originalBackground = this.scene.background;
        }

        if (!this.sourceImage) {
            this.clearEnvironment();
            return;
        }

        // Build an offscreen sky scene to render the equirect HDR with rotation
        const skyScene = new Scene();

        // Use a large inward-facing sphere with equirectangular mapping for correct UVs
        const skyGeo = new SphereGeometry(10, 60, 40);
        const skyMat = new MeshBasicMaterial({
            map: this.sourceImage,
            side: BackSide,
        });
        const skyMesh = new Mesh(skyGeo, skyMat);
        skyMesh.scale.set(1, 1, -1);
        skyMesh.rotation.y = this.options.rotateY ?? 0;
        skyScene.add(skyMesh);

        const oldToneMapping = this._webgpurenderer.toneMapping;
        const oldOutputCS = this._webgpurenderer.outputColorSpace;
        this._webgpurenderer.toneMapping = NoToneMapping;
        this._webgpurenderer.outputColorSpace = LinearSRGBColorSpace;

        const cubeRT = new CubeRenderTarget(1024, {
            type: HalfFloatType,
        });
        const cubeCamera = new CubeCamera(0.1, 1000, cubeRT);

        // Position at origin; IBL is direction-only
        cubeCamera.update(this._webgpurenderer, skyScene);

        // restore renderer state
        this._webgpurenderer.toneMapping = oldToneMapping;
        this._webgpurenderer.outputColorSpace = oldOutputCS;

        // PMREM from cubemap
        const pmremRT = this.pmrem.fromCubemap(cubeRT.texture);

        if (this.currentEnvRT) {
            this.currentEnvRT.texture.dispose();
            this.currentEnvRT.dispose();
            this.currentEnvRT = null;
        }
        if (this.currentBackgroundCube) {
            this.currentBackgroundCube.texture.dispose();
            this.currentBackgroundCube.dispose();
            this.currentBackgroundCube = null;
        }

        this.currentEnvRT = pmremRT;
        this.scene.environment = pmremRT.texture;

        // keep unfiltered capture as background (matches HDRLoader brightness)
        if (this.options.useAsBackground) {
            this.scene.background = cubeRT.texture;
            this.installedBackground = cubeRT.texture;
            this.currentBackgroundCube = cubeRT;
        } else {
            this.scene.background = this.originalBackground;
            this.installedBackground = null;
            // We created a cubeRT but are not using it as background.
            // We should dispose it if we don't store it in currentBackgroundCube.
            // But we used it for PMREM. Can we dispose it now?
            // pmrem.fromCubemap uses it.
            // If we don't store it, we should dispose it to avoid leak.
            cubeRT.texture.dispose();
            cubeRT.dispose();
        }
    }

    /**
     * Sets the renderer and rebinds the PMREM generator. Use this only when rebuilding the renderer.
     *
     * @param renderer - The renderer.
     */
    public setRenderer(renderer: WebGPURenderer): void {
        this.pmrem.dispose();
        this._webgpurenderer = renderer;
        this.pmrem = new PMREMGenerator(renderer);

        this._initPromise?.abort();
        this._initPromise = null;
    }

    /**
     * Sets the URL of the HDR image.
     *
     * @param url - The URL of the HDR image. If null, the default environment image will be used.
     */
    public async setImageUrl(url: string | null): Promise<void> {
        this.options.imageUrl = url ?? defaultEnvUrl;

        this._loadPromise = this._loadSourceImage(this.options.imageUrl);
        await this._loadPromise;

        if (this._initRequested && this._webgpurenderer.initialized) {
            this.update();
        }
    }

    /**
     * Sets the rotation of the HDR image in radians.
     *
     * @param radians - The rotation of the HDR image in radians.
     */
    public setRotationY(radians: number): void {
        this.options.rotateY = radians;
        this.update();
    }

    /**
     * Sets whether to use the HDR image as a background.
     * @param useAsBackground - Whether to use the HDR image as a background.
     */
    public setUseAsBackground(useAsBackground: boolean): void {
        this.options.useAsBackground = useAsBackground;
        this.update();
    }

    /**
     * Loads equirectangular HDR image from URL.
     * Sets the mapping to EquirectangularReflectionMapping.
     *
     * @param url - The URL of the HDR image.
     * @returns The loaded equirectangular HDR texture.
     */
    private async loadHDRImage(url: string): Promise<Texture> {
        const image = await new HDRLoader().loadAsync(url);
        image.mapping = EquirectangularReflectionMapping;
        return image;
    }

    private async _loadSourceImage(url: string): Promise<void> {
        const loadId = ++this._sourceImageLoadId;
        const image = await this.loadHDRImage(url);

        if (this._disposed || loadId !== this._sourceImageLoadId) {
            image.dispose();
            return;
        }

        this.sourceImage?.dispose();
        this.sourceImage = image;
    }
}
