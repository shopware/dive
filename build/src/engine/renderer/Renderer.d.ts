import { WebGLRenderer } from 'three';
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
export declare const DIVERenderPipelineDefaultSettings: Required<DIVERenderPipelineSettings>;
/**
 * A changed version of the WebGLRenderer.
 *
 * Has to be started manually by calling StartRenderer().
 *
 * @module
 */
export declare class DIVERenderPipeline {
    private _scene;
    private _camera;
    private _webglrenderer;
    private _settings;
    constructor(_scene: DIVEScene, _camera: DIVEPerspectiveCamera, settings?: Partial<DIVERenderPipelineSettings>);
    get webglrenderer(): WebGLRenderer;
    setCanvas(canvas: HTMLCanvasElement): void;
    render(): void;
    onResize(width: number, height: number): void;
    dispose(): void;
}
