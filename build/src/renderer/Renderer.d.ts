import { Camera, Scene, ShadowMapType, ToneMapping, WebGLRenderer } from 'three';
export type DIVERendererSettings = {
    antialias: boolean;
    alpha: boolean;
    stencil: boolean;
    shadowMapEnabled: boolean;
    shadowMapType: ShadowMapType;
    toneMapping: ToneMapping;
    canvas?: HTMLCanvasElement;
};
export declare const DIVERendererDefaultSettings: DIVERendererSettings;
export type DIVERenderCallback = (time: DOMHighResTimeStamp, frame: XRFrame) => void;
/**
 * A changed version of the WebGLRenderer.
 *
 * Has to be started manually by calling StartRenderer().
 *
 * @module
 */
export declare class DIVERenderer extends WebGLRenderer {
    private paused;
    private running;
    private force;
    private preRenderCallbacks;
    private postRenderCallbacks;
    constructor(rendererSettings?: Partial<DIVERendererSettings>);
    Dispose(): void;
    StartRenderer(scene: Scene, cam: Camera): void;
    PauseRenderer(): void;
    ResumeRenderer(): void;
    StopRenderer(): void;
    OnResize(width: number, height: number): void;
    /**
     * Adds a callback to the render loop before actual render call.
     * @param callback Executed before rendering.
     * @returns uuid to remove the callback.
     */
    AddPreRenderCallback(callback: DIVERenderCallback): string;
    /**
     * Removes a callback from the render loop before actual render call.
     * @param uuid of callback to remove.
     * @returns if removing was successful.
     */
    RemovePreRenderCallback(uuid: string): boolean;
    /**
     * Adds a callback to the render loop after actual render call.
     * @param callback Executed after rendering.
     * @returns uuid to remove the callback.
     */
    AddPostRenderCallback(callback: DIVERenderCallback): string;
    /**
     * Removes a callback from the render loop after actual render call.
     * @param uuid of callback to remove.
     * @returns if removing was successful.
     */
    RemovePostRenderCallback(uuid: string): boolean;
    /**
     * Forces the renderer to render the next frame.
     */
    ForceRendering(): void;
    /**
     * Internal render loop.
     *
     * To control renderloop you can add callbacks via AddPreRenderCallback() and AddPostRenderCallback().
     * @param scene Scene to render.
     * @param cam Camera to render with.
     */
    private internal_render;
}
