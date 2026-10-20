import {
    BackSide,
    CubeCamera,
    CubeRenderTarget,
    HalfFloatType,
    LinearSRGBColorSpace,
    Mesh,
    MeshBasicMaterial,
    NoToneMapping,
    PMREMGenerator,
    type RenderTarget,
    Scene,
    SphereGeometry,
    type Texture,
    type WebGPURenderer,
} from 'three/webgpu';

/**
 * Turns an equirectangular image into what `scene.environment` needs: a cube
 * capture, then a PMREM from it. Keeps the newest bake and frees the one
 * before.
 */
export class ImageBasedLightBaker {
    private _pmrem: PMREMGenerator | null = null;
    private _target: RenderTarget | null = null;

    constructor(private _renderer: WebGPURenderer) {}

    /**
     * Bakes the image, or frees the last bake for `null`.
     *
     * @param image - The equirectangular image.
     * @returns The texture to put on `scene.environment`.
     */
    public bake(image: Texture | null): Texture | null {
        this.release();
        if (!image) return null;

        // an inward-facing sphere, mirrored along Z to match the cube's lookup
        const sky = new Scene();
        const geometry = new SphereGeometry(10, 60, 40);
        const material = new MeshBasicMaterial({ map: image, side: BackSide });
        const mesh = new Mesh(geometry, material);
        mesh.scale.set(1, 1, -1);
        sky.add(mesh);

        const toneMapping = this._renderer.toneMapping;
        const outputColorSpace = this._renderer.outputColorSpace;
        this._renderer.toneMapping = NoToneMapping;
        this._renderer.outputColorSpace = LinearSRGBColorSpace;

        const cube = new CubeRenderTarget(1024, { type: HalfFloatType });
        new CubeCamera(0.1, 1000, cube).update(this._renderer, sky);

        this._renderer.toneMapping = toneMapping;
        this._renderer.outputColorSpace = outputColorSpace;

        this._pmrem ??= new PMREMGenerator(this._renderer);
        this._target = this._pmrem.fromCubemap(cube.texture);

        cube.texture.dispose();
        cube.dispose();
        geometry.dispose();
        material.dispose();

        return this._target.texture;
    }

    /** whether the texture is the current bake */
    public owns(texture: Texture | null): boolean {
        return this._target !== null && texture === this._target.texture;
    }

    /** frees the current bake */
    public release(): void {
        this._target?.texture.dispose();
        this._target?.dispose();
        this._target = null;
    }

    public dispose(): void {
        this.release();
        this._pmrem?.dispose();
        this._pmrem = null;
    }
}
