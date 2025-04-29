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
    render(): void;
    onResize(width: number, height: number): void;
    dispose(): void;
}
