import { Camera, MathUtils, NoToneMapping, PCFSoftShadowMap, Scene, ShadowMapType, ToneMapping, WebGLRenderer } from "three";

export type DIVERendererSettings = {
    antialias: boolean;
    alpha: boolean;
    stencil: boolean;
    shadowMapEnabled: boolean;
    shadowMapType: ShadowMapType;
    toneMapping: ToneMapping;
}

export const DIVERendererDefaultSettings: DIVERendererSettings = {
    antialias: true,
    alpha: true,
    stencil: false,
    shadowMapEnabled: true,
    shadowMapType: PCFSoftShadowMap,
    toneMapping: NoToneMapping,
}

/**
 * A changed version of the WebGLRenderer.
 *
 * Has to be started manually by calling StartRenderer().
 *
 * @module
 */

export default class DIVERenderer extends WebGLRenderer {
    // basic functionality members
    private paused: boolean = false;
    private running: boolean = false;
    private force: boolean = false;

    // pre- and post-render callbacks
    private preRenderCallbacks: Map<string, () => void> = new Map<string, () => void>();
    private postRenderCallbacks: Map<string, () => void> = new Map<string, () => void>();

    constructor(rendererSettings: DIVERendererSettings = DIVERendererDefaultSettings) {
        super({
            antialias: rendererSettings.antialias,
            alpha: rendererSettings.alpha,
            preserveDrawingBuffer: true
        });
        this.setPixelRatio(window.devicePixelRatio);

        this.shadowMap.enabled = rendererSettings.shadowMapEnabled;
        this.shadowMap.type = rendererSettings.shadowMapType;

        this.toneMapping = rendererSettings.toneMapping;

        this.debug.checkShaderErrors = false;
    }

    // Stops renderings and disposes the renderer.
    public Dispose(): void {
        this.StopRenderer();
        this.dispose();
    }

    // Starts the renderer with the given scene and camera.
    public StartRenderer(scene: Scene, cam: Camera): void {
        this.setAnimationLoop(() => { this.internal_render(scene, cam) });
        this.running = true;
    }

    // Pauses the renderer.
    public PauseRenderer(): void {
        this.paused = true;
    }

    // Resumes the renderer after pausing.
    public ResumeRenderer(): void {
        this.paused = false;
    }

    // Stops the renderer completely. Has to be started again with StartRenderer().
    public StopRenderer(): void {
        this.setAnimationLoop(null);
        this.running = false;
    }

    // Resizes the renderer to the given width and height.
    public OnResize(width: number, height: number): void {
        this.setSize(width, height);
    }

    /**
     * Adds a callback to the render loop before actual render call.
     * @param callback Executed before rendering.
     * @returns uuid to remove the callback.
     */
    public AddPreRenderCallback(callback: () => void): string {
        // add callback to renderloop
        const newUUID = MathUtils.generateUUID();
        this.preRenderCallbacks.set(newUUID, callback);

        return newUUID;
    }

    /**
     * Removes a callback from the render loop before actual render call.
     * @param uuid of callback to remove.
     * @returns if removing was successful.
     */
    public RemovePreRenderCallback(uuid: string): boolean {
        // check if callback exists
        if (!this.preRenderCallbacks.has(uuid)) return false;

        // remove callback from renderloop
        this.preRenderCallbacks.delete(uuid);

        return true;
    }

    /**
     * Adds a callback to the render loop after actual render call.
     * @param callback Executed after rendering.
     * @returns uuid to remove the callback.
     */
    public AddPostRenderCallback(callback: () => void): string {
        // add callback to renderloop
        const newUUID = MathUtils.generateUUID();
        this.postRenderCallbacks.set(newUUID, callback);

        return newUUID;
    }

    /**
     * Removes a callback from the render loop after actual render call.
     * @param uuid of callback to remove.
     * @returns if removing was successful.
     */
    public RemovePostRenderCallback(uuid: string): boolean {
        // check if callback exists
        if (!this.postRenderCallbacks.has(uuid)) return false;

        // remove callback from renderloop
        this.postRenderCallbacks.delete(uuid);

        return true;
    }

    /**
     * Forces the renderer to render the next frame.
     */
    public ForceRendering(): void {
        this.force = true;
    }

    /**
     * Internal render loop.
     *
     * To control renderloop you can add callbacks via AddPreRenderCallback() and AddPostRenderCallback().
     * @param scene Scene to render.
     * @param cam Camera to render with.
     */
    private internal_render(scene: Scene, cam: Camera): void {
        // execute background render loop callbacks
        if ((this.paused || !this.running) && !this.force) return;

        // execute render loop callbacks
        this.preRenderCallbacks.forEach((callback) => { callback(); });

        this.render(scene, cam);

        this.postRenderCallbacks.forEach((callback) => { callback(); });

        this.force = false;
    }
}