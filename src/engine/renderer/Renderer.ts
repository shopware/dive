import {
    ACESFilmicToneMapping,
    BasicShadowMap,
    PCFShadowMap,
    PCFSoftShadowMap,
    WebGLRenderer,
    WebGLRenderTarget,
    LinearFilter,
    RGBAFormat,
    Vector2,
} from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import {
    LuminanceShader,
    DownsampleShader,
} from './shaders/LuminanceShaders.ts';

export type DIVERenderPipelineSettings = {
    /**
     * The canvas to render to. When undefined, the canvas will be created automatically and reachable via the `diveInstance.canvas` property.
     *
     * @default undefined
     */
    canvas: HTMLCanvasElement | undefined;
    /**
     * Whether to enable antialiasing
     *
     * @default true
     */
    antialias: boolean;
    /** Whether to enable alpha channel */
    alpha: boolean;
    /**
     * Power preference for the WebGL context
     *
     * @default 'high-performance'
     */
    powerPreference: 'high-performance' | 'low-power';
    /**
     * Precision of the shader
     *
     * @default 'highp'
     */
    precision: 'highp' | 'mediump' | 'lowp';
    /**
     * Whether to enable stencil buffer
     *
     * @default false
     */
    stencil: boolean;
    /**
     * Whether to enable depth buffer
     *
     * @default true
     */
    depth: boolean;
    /**
     * Whether to use logarithmic depth buffer
     *
     * @default false
     */
    logarithmicDepthBuffer: boolean;
    /**
     * Whether to enable shadows
     *
     * @default true
     */
    shadows: boolean;

    /**
     * The quality of the shadows
     *
     * @default 'high'
     */
    shadowQuality: 'high' | 'medium' | 'low';

    /**
     * Whether to enable auto exposure
     *
     * @default false
     */
    autoExposure: boolean;
};

export const DIVERenderPipelineDefaultSettings: Required<DIVERenderPipelineSettings> =
    {
        canvas: undefined,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        precision: 'highp',
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false,
        shadows: true,
        shadowQuality: 'high',
        autoExposure: false,
    };

/**
 * A changed version of the WebGLRenderer.
 *
 * Has to be started manually by calling StartRenderer().
 *
 * @module
 */

export class DIVERenderPipeline {
    private _webglrenderer: WebGLRenderer;
    private _settings: DIVERenderPipelineSettings;
    private _composer: EffectComposer | undefined;

    // For auto exposure
    private _luminanceComposer: EffectComposer | undefined;
    private _currentLuminance: number = 0;

    constructor(
        private _scene: DIVEScene,
        private _camera: DIVEPerspectiveCamera,
        settings?: Partial<DIVERenderPipelineSettings>,
    ) {
        this._settings = {
            ...DIVERenderPipelineDefaultSettings,
            ...(settings ?? {}),
        };

        this._webglrenderer = new WebGLRenderer(this._settings);
        this._webglrenderer.shadowMap.enabled = this._settings.shadows;
        this._webglrenderer.shadowMap.type =
            this._settings.shadowQuality === 'high'
                ? PCFSoftShadowMap
                : this._settings.shadowQuality === 'medium'
                  ? PCFShadowMap
                  : BasicShadowMap;

        this._webglrenderer.toneMapping = ACESFilmicToneMapping;
        this._webglrenderer.toneMappingExposure = 1.0;

        if (this._settings.autoExposure) {
            this.setupAutoExposure();
        }
    }

    private setupAutoExposure(): void {
        // Main composer
        this._composer = new EffectComposer(this._webglrenderer);
        this._composer.addPass(new RenderPass(this._scene, this._camera));
        const outputPass = new OutputPass();
        this._composer.addPass(outputPass);

        // Luminance composer
        const size = new Vector2(256, 256);
        const luminanceRenderTarget = new WebGLRenderTarget(size.x, size.y, {
            minFilter: LinearFilter,
            magFilter: LinearFilter,
            format: RGBAFormat,
        });

        this._luminanceComposer = new EffectComposer(
            this._webglrenderer,
            luminanceRenderTarget,
        );
        this._luminanceComposer.addPass(
            new RenderPass(this._scene, this._camera),
        );

        const luminancePass = new ShaderPass(LuminanceShader);
        this._luminanceComposer.addPass(luminancePass);

        const currentSize = size.clone();
        while (currentSize.x > 1 || currentSize.y > 1) {
            currentSize.x = Math.max(1, Math.floor(currentSize.x / 2));
            currentSize.y = Math.max(1, Math.floor(currentSize.y / 2));

            const downsamplePass = new ShaderPass(DownsampleShader);
            downsamplePass.uniforms['texelSize'] = {
                value: new Vector2(1.0 / currentSize.x, 1.0 / currentSize.y),
            };
            this._luminanceComposer.addPass(downsamplePass);
        }
    }

    public get webglrenderer(): WebGLRenderer {
        return this._webglrenderer;
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        // dispose old renderer
        this._webglrenderer.dispose();
        if (this._composer) {
            this._composer.dispose();
        }

        // create new renderer with canvas
        this._settings.canvas = canvas;
        this._webglrenderer = new WebGLRenderer(this._settings);

        if (this._settings.autoExposure) {
            this.setupAutoExposure();
        }
    }

    public render(): void {
        if (
            this._composer &&
            this._luminanceComposer &&
            this._settings.autoExposure
        ) {
            // Calculate luminance
            this._luminanceComposer.render();

            // Read luminance
            const pixel = new Uint8Array(4);
            this._webglrenderer.readRenderTargetPixels(
                this._luminanceComposer.renderTarget2,
                0,
                0,
                1,
                1,
                pixel,
            );
            this._currentLuminance = pixel[0] / 255;

            // Adapt exposure
            const targetExposure = 0.5 / (this._currentLuminance + 1e-6);
            this._webglrenderer.toneMappingExposure =
                this._webglrenderer.toneMappingExposure * 0.9 +
                targetExposure * 0.1;

            // Render final scene
            this._composer.render();
            return;
        }

        this._webglrenderer.render(this._scene, this._camera);
    }

    public onResize(width: number, height: number): void {
        this._webglrenderer.setSize(width, height, false);
        if (this._composer) {
            this._composer.setSize(width, height);
        }
        if (this._luminanceComposer) {
            this._luminanceComposer.setSize(width, height);
        }
    }

    public dispose(): void {
        this._webglrenderer.dispose();
        if (this._composer) {
            this._composer.dispose();
        }
        if (this._luminanceComposer) {
            this._luminanceComposer.dispose();
        }
    }
}
