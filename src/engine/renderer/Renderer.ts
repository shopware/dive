import { WebGLRenderer } from 'three';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';

export type DIVERenderPipelineSettings = {
    /** Whether to enable antialiasing */
    antialias: boolean;
    /** Whether to enable alpha channel */
    alpha: boolean;
    /** Power preference for the WebGL context */
    powerPreference: 'high-performance' | 'low-power';
    /** Precision of the shader */
    precision: 'highp' | 'mediump' | 'lowp';
    /** Whether to enable stencil buffer */
    stencil: boolean;
    /** Whether to enable depth buffer */
    depth: boolean;
    /** Whether to use logarithmic depth buffer */
    logarithmicDepthBuffer: boolean;
};

export const DIVERenderPipelineDefaultSettings: Required<DIVERenderPipelineSettings> =
    {
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        precision: 'highp',
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false,
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

        this._webglrenderer = new WebGLRenderer({
            antialias: this._settings.antialias,
            alpha: this._settings.alpha,
            powerPreference: this._settings.powerPreference,
            precision: this._settings.precision,
            stencil: this._settings.stencil,
            depth: this._settings.depth,
            logarithmicDepthBuffer: this._settings.logarithmicDepthBuffer,
        });
    }

    public get scene(): DIVEScene {
        return this._scene;
    }

    public get camera(): DIVEPerspectiveCamera {
        return this._camera;
    }

    public get webglrenderer(): WebGLRenderer {
        return this._webglrenderer;
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
