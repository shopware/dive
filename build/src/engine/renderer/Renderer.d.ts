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
export declare const DIVERendererDefaultSettings: Required<DIVERendererSettings>;
/**
 * A changed version of the WebGLRenderer.
 *
 * Has to be started manually by calling StartRenderer().
 *
 * @module
 */
export declare class DIVERenderer {
    private _webglrenderer;
    private _settings;
    constructor(settings?: Partial<DIVERendererSettings>);
    get webglrenderer(): WebGLRenderer;
    get domElement(): HTMLCanvasElement;
    set domElement(element: HTMLCanvasElement);
    render(scene: DIVEScene, camera: Camera): void;
    onResize(width: number, height: number): void;
    dispose(): void;
}
