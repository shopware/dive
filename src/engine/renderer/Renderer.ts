import { Camera, WebGLRenderer } from 'three';
import { DIVEScene } from '../scene/Scene.ts';

export type DIVERendererSettings = {
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

export const DIVERendererDefaultSettings: Required<DIVERendererSettings> = {
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

export class DIVERenderer {
    private _webglrenderer: WebGLRenderer;
    private _settings: DIVERendererSettings;

    constructor(settings?: Partial<DIVERendererSettings>) {
        this._settings = {
            ...DIVERendererDefaultSettings,
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

    public get webglrenderer(): WebGLRenderer {
        return this._webglrenderer;
    }

    public get domElement(): HTMLCanvasElement {
        return this._webglrenderer.domElement;
    }

    public set domElement(element: HTMLCanvasElement) {
        this._webglrenderer.domElement = element;
    }

    public render(scene: DIVEScene, camera: Camera): void {
        this._webglrenderer.render(scene, camera);
    }

    public onResize(width: number, height: number): void {
        this._webglrenderer.setSize(width, height, false);
    }

    public dispose(): void {
        this._webglrenderer.dispose();
    }
}
