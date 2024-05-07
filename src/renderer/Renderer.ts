import { Camera, MathUtils, NoToneMapping, PCFSoftShadowMap, Scene, WebGLRenderer } from "three";

export default class DIVERenderer extends WebGLRenderer {
    private paused: boolean = false;
    private running: boolean = false;
    private force: boolean = false;

    private preRenderCallbacks: Map<string, () => void> = new Map<string, () => void>();
    private postRenderCallbacks: Map<string, () => void> = new Map<string, () => void>();

    constructor() {
        super({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        this.setPixelRatio(window.devicePixelRatio);

        this.shadowMap.enabled = true;
        this.shadowMap.type = PCFSoftShadowMap;

        this.debug.checkShaderErrors = false;

        // maybe add switching tone mapping
        this.toneMapping = NoToneMapping;
    }

    public StartRenderer(scene: Scene, cam: Camera): void {
        this.setAnimationLoop(() => { this.internal_render(scene, cam) });
        this.running = true;
    }

    public PauseRenderer(): void {
        this.paused = true;
    }

    public ResumeRenderer(): void {
        this.paused = false;
    }

    public StopRenderer(): void {
        this.setAnimationLoop(null);
        this.running = false;
    }

    public ResizeRenderer(width: number, height: number): void {
        this.setSize(width, height);

        // resize 2D renderer as well
    }

    public AddPreRenderCallback(callback: () => void): string {
        // add callback to renderloop
        const newUUID = MathUtils.generateUUID();
        this.preRenderCallbacks.set(newUUID, callback);

        return newUUID;
    }

    public RemovePreRenderCallback(uuid: string): boolean {
        // check if callback exists
        if (!this.preRenderCallbacks.has(uuid)) return false;

        // remove callback from renderloop
        this.preRenderCallbacks.delete(uuid);

        return true;
    }

    public AddPostRenderCallback(callback: () => void): string {
        // add callback to renderloop
        const newUUID = MathUtils.generateUUID();
        this.postRenderCallbacks.set(newUUID, callback);

        return newUUID;
    }

    public RemovePostRenderCallback(uuid: string): boolean {
        // check if callback exists
        if (!this.postRenderCallbacks.has(uuid)) return false;

        // remove callback from renderloop
        this.postRenderCallbacks.delete(uuid);

        return true;
    }

    public ForceRendering(): void {
        this.force = true;
    }

    /**
     * Don't use this outside. Use StartRenderer() instead. To control renderloop you can add callbacks via AddRenderLoopCallback().
     * @param scene
     * @param cam
     * @returns
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