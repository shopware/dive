import {
    BasicShadowMap,
    PCFShadowMap,
    PCFSoftShadowMap,
    WebGLRenderer,
} from 'three';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';

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
    }

    public get webglrenderer(): WebGLRenderer {
        return this._webglrenderer;
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        // dispose old renderer
        this._webglrenderer.dispose();

        // create new renderer with canvas
        this._settings.canvas = canvas;
        this._webglrenderer = new WebGLRenderer(this._settings);
    }

    public render(): void {
        this._webglrenderer.render(this._scene, this._camera);
    }

    public onResize(width: number, height: number): void {
        this._webglrenderer.setSize(width, height, false);
    }

    public dispose(): void {
        this._webglrenderer.dispose();
    }
}
