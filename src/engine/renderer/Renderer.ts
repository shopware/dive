import {
    ACESFilmicToneMapping,
    BasicShadowMap,
    PCFShadowMap,
    PCFSoftShadowMap,
    SRGBColorSpace,
    WebGLRenderer,
} from 'three';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVEEnvironment } from '../environment/Environment.ts';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';

export type DIVERendererSettings = {
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
     * @default true
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
};

export const DIVERendererDefaultSettings: Required<DIVERendererSettings> = {
    canvas: undefined,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance',
    precision: 'highp',
    stencil: false,
    depth: true,
    logarithmicDepthBuffer: true,
    shadows: true,
    shadowQuality: 'high',
};

/**
 * A changed version of the WebGLRenderer.
 *
 * Has to be started manually by calling StartRenderer().
 *
 * @module
 */

export class DIVERenderer {
    public readonly isDIVERenderer: true = true;

    private _webglrenderer: WebGLRenderer;
    private _composer: EffectComposer;
    private _environment: DIVEEnvironment;

    private _settings: DIVERendererSettings;

    constructor(
        private _scene: DIVEScene,
        private _camera: DIVEPerspectiveCamera,
        settings?: Partial<DIVERendererSettings>,
    ) {
        this._settings = {
            ...DIVERendererDefaultSettings,
            ...(settings ?? {}),
        };

        this._webglrenderer = this._createWebGLRenderer();

        this._composer = this._createComposer(this._webglrenderer);

        this._environment = new DIVEEnvironment(
            this._webglrenderer,
            this._scene,
        );
    }

    public get webglrenderer(): WebGLRenderer {
        return this._webglrenderer;
    }

    public get environment(): DIVEEnvironment {
        return this._environment;
    }

    public get canvas(): HTMLCanvasElement {
        return this._webglrenderer.domElement;
    }

    public render(): void {
        this._composer.render();
    }

    public onResize(width: number, height: number): void {
        this._composer.setSize(width, height);
        this._webglrenderer.setSize(width, height, false);
    }

    public dispose(): void {
        this._environment.dispose();
        this._composer.dispose();
        this._webglrenderer.dispose();
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        // dispose old renderer and hdr environment
        this._composer.dispose();
        this._webglrenderer.dispose();

        // create new renderer with canvas
        this._settings.canvas = canvas;
        this._webglrenderer = this._createWebGLRenderer();
        this._composer = this._createComposer(this._webglrenderer);
        this._environment.setRenderer(this._webglrenderer);
    }

    private _createWebGLRenderer(): WebGLRenderer {
        const renderer = new WebGLRenderer(this._settings);
        renderer.shadowMap.enabled = this._settings.shadows;
        renderer.shadowMap.type =
            this._settings.shadowQuality === 'high'
                ? PCFSoftShadowMap
                : this._settings.shadowQuality === 'medium'
                  ? PCFShadowMap
                  : BasicShadowMap;
        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.outputColorSpace = SRGBColorSpace;
        renderer.toneMapping = ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        return renderer;
    }

    private _createComposer(renderer: WebGLRenderer): EffectComposer {
        const composer = new EffectComposer(renderer);
        composer.setPixelRatio(window.devicePixelRatio);

        // render pass with temporal anti aliasing
        const renderPass = new TAARenderPass(this._scene, this._camera);
        renderPass.enabled = true;
        renderPass.sampleLevel = 3;
        composer.addPass(renderPass);

        // output pass for color space conversion and tone mapping
        composer.addPass(new OutputPass());

        return composer;
    }
}

/**
 * @deprecated Use `import { DIVERenderer } from '@shopware-ag/dive'` instead.
 */
export const DIVERenderPipeline = DIVERenderer;
