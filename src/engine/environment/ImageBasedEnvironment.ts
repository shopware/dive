import {
    ACESFilmicToneMapping,
    BoxGeometry,
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
} from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export type IBLEnvironmentOptions = {
    enabled?: boolean;
    hdrUrl?: string;
    useAsBackground?: boolean;
    globalEnvIntensity?: number;
    exposure?: number;
    rotateY?: number; // radians
    replaceLights?: boolean;
};

/**
 * Manages an image-based lighting setup with optional Y-rotation.
 *
 * Rotation is achieved by rendering the equirect HDR to a skybox that is
 * rotated around Y, capturing it into a cubemap with CubeCamera, and then
 * generating a PMREM for scene.environment.
 */
export class ImageBasedEnvironment {
    private renderer: WebGLRenderer;
    private scene: Scene;
    private pmrem: PMREMGenerator;
    private currentEnvRT: WebGLRenderTarget | null = null;
    private sourceHDR: Texture | null = null;
    private originalLights: { visible: boolean }[] = [];
    private options: IBLEnvironmentOptions;

    constructor(
        renderer: WebGLRenderer,
        scene: Scene,
        options: IBLEnvironmentOptions = {},
    ) {
        this.renderer = renderer;
        this.scene = scene;
        this.pmrem = new PMREMGenerator(renderer);
        this.options = options;
    }

    public async enable(opts?: Partial<IBLEnvironmentOptions>): Promise<void> {
        this.options = { ...this.options, enabled: true, ...opts };
        if (!this.options.hdrUrl) return;

        this.renderer.outputColorSpace = SRGBColorSpace;
        this.renderer.toneMapping = ACESFilmicToneMapping;
        if (this.options.exposure != null)
            this.renderer.toneMappingExposure = this.options.exposure;

        const hdr = await new RGBELoader().loadAsync(this.options.hdrUrl);
        this.sourceHDR = hdr;

        // Prepare background if requested (unfiltered for visuals only)
        if (this.options.useAsBackground) {
            hdr.mapping = EquirectangularReflectionMapping;
            this.scene.background = hdr;
        }

        await this.applyRotationAndSetEnvironment(this.options.rotateY ?? 0);

        if (this.options.replaceLights) this.disableExistingLights();
    }

    public async setHDR(url: string): Promise<void> {
        this.options.hdrUrl = url;
        if (this.options.enabled) {
            await this.enable();
        }
    }

    public async setRotationY(radians: number): Promise<void> {
        this.options.rotateY = radians;
        if (!this.sourceHDR) return;
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
        this.restoreLights();
        this.cleanupEnv();
    }

    public dispose(): void {
        this.disable();
        this.pmrem.dispose();
        if (this.sourceHDR) {
            this.sourceHDR.dispose();
            this.sourceHDR = null;
        }
    }

    private async applyRotationAndSetEnvironment(
        rotateY: number,
    ): Promise<void> {
        if (!this.sourceHDR) return;

        // Build a skybox scene to render the equirect HDR with rotation
        const skyScene = new Scene();

        const skyGeo = new BoxGeometry(1, 1, 1);
        // Inward-facing by flipping side via negative scale
        const skyMat = new MeshBasicMaterial({ map: this.sourceHDR });
        const skybox = new Mesh(skyGeo, skyMat);
        skybox.scale.set(-1, 1, 1);
        skybox.rotation.y = rotateY;
        skyScene.add(skybox);

        const cubeRT = new WebGLCubeRenderTarget(1024);
        const cubeCamera = new CubeCamera(0.1, 1000, cubeRT);

        // Position at origin; IBL is direction-only
        cubeCamera.update(this.renderer, skyScene);

        // PMREM from cubemap
        const pmremRT = this.pmrem.fromCubemap(cubeRT.texture);

        this.cleanupEnv();
        this.currentEnvRT = pmremRT;
        this.scene.environment = pmremRT.texture;

        // Apply per-material env intensity
        this.applyEnvIntensity(
            this.scene,
            this.options.globalEnvIntensity ?? 1.0,
        );

        // Cleanup intermediate cubemap
        cubeRT.texture.dispose();
        cubeRT.dispose();
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
    }
}
