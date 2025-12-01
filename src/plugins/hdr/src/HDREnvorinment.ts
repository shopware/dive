import {
    ACESFilmicToneMapping,
    CubeCamera,
    EquirectangularReflectionMapping,
    Mesh,
    MeshBasicMaterial,
    PMREMGenerator,
    Scene,
    SRGBColorSpace,
    Texture,
    WebGLCubeRenderTarget,
    WebGLRenderTarget,
    WebGLRenderer,
    BackSide,
    SphereGeometry,
    NoToneMapping,
    LinearSRGBColorSpace,
    HalfFloatType,
} from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { HDREnvironmentSettings } from '../types/index.ts';

export const HDREnvironmentDefaultSettings: HDREnvironmentSettings = {
    enabled: true,
    imageUrl: undefined,
    useAsBackground: true,
    globalEnvIntensity: 1,
    exposure: 1,
    rotateY: 0,
    replaceLights: true,
};

/**
 * Manages an image-based lighting setup with optional Y-rotation.
 *
 * Rotation is achieved by rendering the equirect HDR to a skybox that is
 * rotated around Y, capturing it into a cubemap with CubeCamera, and then
 * generating a PMREM for scene.environment.
 */
export class HDREnvironment {
    private originalBackground: typeof Scene.prototype.background = null;
    private isBackgroundReplaced = false;

    private renderer: WebGLRenderer;
    private scene: Scene;
    private pmrem: PMREMGenerator;
    private currentEnvRT: WebGLRenderTarget | null = null;
    private currentBackgroundCube: WebGLCubeRenderTarget | null = null;
    private sourceImage: Promise<Texture> | null = null;
    private originalLights: { visible: boolean }[] = [];
    private options: HDREnvironmentSettings;

    constructor(
        renderer: WebGLRenderer,
        scene: Scene,
        options: HDREnvironmentSettings = {},
    ) {
        this.renderer = renderer;
        this.scene = scene;
        this.pmrem = new PMREMGenerator(renderer);
        this.options = options;

        if (this.options.imageUrl) {
            this.sourceImage = new RGBELoader().loadAsync(
                this.options.imageUrl,
            );
        }

        if (this.options.enabled) {
            this.enable();
        }
    }

    public async enable(opts?: Partial<HDREnvironmentSettings>): Promise<void> {
        this.options = { ...this.options, enabled: true, ...opts };
        if (!this.options.imageUrl) return;

        this.renderer.outputColorSpace = SRGBColorSpace;
        this.renderer.toneMapping = ACESFilmicToneMapping;
        if (this.options.exposure != null)
            this.renderer.toneMappingExposure = this.options.exposure;

        if (!this.sourceImage) {
            this.sourceImage = new RGBELoader().loadAsync(
                this.options.imageUrl,
            );
        }

        const image = await this.sourceImage;
        // apply mapping for visual background
        image.mapping = EquirectangularReflectionMapping;

        // Handle background logic
        if (this.options.useAsBackground) {
            // If we are not yet replacing the background, save the current one
            if (!this.isBackgroundReplaced) {
                this.originalBackground = this.scene.background;
                this.isBackgroundReplaced = true;
            }
            this.scene.background = image;
        } else {
            // If we were replacing the background, restore the original one
            if (this.isBackgroundReplaced) {
                this.scene.background = this.originalBackground;
                this.isBackgroundReplaced = false;
            }
        }

        if (this.options.rotateY) {
            await this.applyRotationAndSetEnvironment(this.options.rotateY);
        } else {
            // Create PMREM directly from the equirectangular source for environment lighting
            const pmremRT = this.pmrem.fromEquirectangular(image);
            this.cleanupEnv();
            this.currentEnvRT = pmremRT;
            this.scene.environment = pmremRT.texture;
        }

        // apply per-material intensity
        this.applyEnvIntensity(
            this.scene,
            this.options.globalEnvIntensity ?? 1.0,
        );

        if (this.options.replaceLights) this.disableExistingLights();
    }

    public async setImageUrl(url: string): Promise<void> {
        this.options.imageUrl = url;
        this.sourceImage = null;
        if (this.options.enabled) {
            await this.enable();
        }
    }

    public async setRotationY(radians: number): Promise<void> {
        this.options.rotateY = radians;
        if (!this.sourceImage) return;
        await this.applyRotationAndSetEnvironment(radians);
    }

    public setExposure(exposure: number): void {
        this.options.exposure = exposure;
        this.renderer.toneMappingExposure = exposure;
    }

    public setGlobalEnvIntensity(intensity: number): void {
        this.options.globalEnvIntensity = intensity;
        this.applyEnvIntensity(this.scene, intensity);
    }

    public disable(): void {
        this.options.enabled = false;
        this.scene.environment = null;

        if (this.isBackgroundReplaced) {
            this.scene.background = this.originalBackground;
            this.isBackgroundReplaced = false;
        }

        this.restoreLights();
        this.cleanupEnv();
    }

    public async dispose(): Promise<void> {
        this.disable();
        this.pmrem.dispose();
        if (this.sourceImage) {
            (await this.sourceImage).dispose();
            this.sourceImage = null;
        }
    }

    private async applyRotationAndSetEnvironment(
        rotateY: number,
    ): Promise<void> {
        if (!this.sourceImage) return;

        const image = await this.sourceImage;

        // Build an offscreen sky scene to render the equirect HDR with rotation
        const skyScene = new Scene();

        // Use a large inward-facing sphere with equirectangular mapping for correct UVs
        const skyGeo = new SphereGeometry(10, 60, 40);
        image.mapping = EquirectangularReflectionMapping;
        const skyMat = new MeshBasicMaterial({ map: image, side: BackSide });
        const skyMesh = new Mesh(skyGeo, skyMat);
        skyMesh.scale.set(1, 1, -1);
        skyMesh.rotation.y = rotateY;
        skyScene.add(skyMesh);

        const oldToneMapping = this.renderer.toneMapping;
        const oldOutputCS = this.renderer.outputColorSpace;
        this.renderer.toneMapping = NoToneMapping;
        this.renderer.outputColorSpace = LinearSRGBColorSpace;

        const cubeRT = new WebGLCubeRenderTarget(1024, { type: HalfFloatType });
        const cubeCamera = new CubeCamera(0.1, 1000, cubeRT);

        // Position at origin; IBL is direction-only
        cubeCamera.update(this.renderer, skyScene);

        // restore renderer state
        this.renderer.toneMapping = oldToneMapping;
        this.renderer.outputColorSpace = oldOutputCS;

        // PMREM from cubemap
        const pmremRT = this.pmrem.fromCubemap(cubeRT.texture);

        this.cleanupEnv();
        this.currentEnvRT = pmremRT;
        this.scene.environment = pmremRT.texture;

        // keep unfiltered capture as background (matches RGBELoader brightness)
        if (this.options.useAsBackground) {
            this.scene.background = cubeRT.texture;
            // store for cleanup later
            if (this.currentBackgroundCube) {
                this.currentBackgroundCube.texture.dispose();
                this.currentBackgroundCube.dispose();
            }
            this.currentBackgroundCube = cubeRT;
        } else {
            // Cleanup intermediate cubemap when not used for background
            cubeRT.texture.dispose();
            cubeRT.dispose();

            if (this.isBackgroundReplaced) {
                this.scene.background = this.originalBackground;
                this.isBackgroundReplaced = false;
            }
        }

        // Apply per-material env intensity
        this.applyEnvIntensity(
            this.scene,
            this.options.globalEnvIntensity ?? 1.0,
        );
    }

    private applyEnvIntensity(root: Scene, intensity: number): void {
        root.traverse((obj) => {
            const anyObj = obj as { material?: unknown };
            const mat = anyObj.material as unknown as
                | { map?: { colorSpace?: unknown } }
                | Array<{ map?: { colorSpace?: unknown } }>
                | undefined;
            if (!mat) return;
            const mats = Array.isArray(mat) ? mat : [mat];
            for (const m of mats) {
                const materialAny = m as unknown as {
                    envMapIntensity?: number;
                    needsUpdate?: boolean;
                    map?: { colorSpace?: unknown };
                };
                if (materialAny && 'envMapIntensity' in materialAny) {
                    materialAny.envMapIntensity = intensity;
                    materialAny.needsUpdate = true;
                }
                if (
                    materialAny &&
                    materialAny.map &&
                    'colorSpace' in materialAny.map
                ) {
                    materialAny.map.colorSpace = SRGBColorSpace;
                }
            }
        });
    }

    private disableExistingLights(): void {
        const disabled: { visible: boolean }[] = [];
        this.scene.traverse((obj) => {
            const anyObj = obj as unknown as {
                isLight?: boolean;
                visible: boolean;
            };
            if (anyObj.isLight) {
                anyObj.visible = false;
                disabled.push(anyObj);
            }
        });
        // store loosely; only visibility toggled
        this.originalLights = disabled;
    }

    private restoreLights(): void {
        for (const l of this.originalLights) {
            l.visible = true;
        }
        this.originalLights = [];
    }

    private cleanupEnv(): void {
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
}
