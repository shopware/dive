import { HalfFloatType, IUniform, MathUtils, Mesh, NoToneMapping, OrthographicCamera, PCFSoftShadowMap, PlaneGeometry, Raycaster, Scene, ShaderMaterial, ShadowMapType, ToneMapping, UniformsUtils, Vector2, WebGLRenderTarget, WebGLRenderer } from "three";
import DIVEPerspectiveCamera from "../camera/PerspectiveCamera";
import { BokehShader, BokehDepthShader } from "three/examples/jsm/shaders/BokehShader2";
import { PRODUCT_LAYER_MASK } from "../constant/VisibilityLayerMask";
import DIVEScene from "../scene/Scene";

type DIVEDOFSettings = {
    enabled: boolean;
    materialDepth: ShaderMaterial;
    scene: Scene,
    camera: OrthographicCamera,
    rtTextureDepth: WebGLRenderTarget,
    rtTextureColor: WebGLRenderTarget,
    bokeh_uniforms: { [uniform: string]: IUniform<unknown> },
    materialBokeh: ShaderMaterial,
    quad: Mesh,
}

export type DIVEPostprocessingSettings = {
    dof: { enabled: false } | DIVEDOFSettings;
}

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

export class DIVERenderer extends WebGLRenderer {
    // basic functionality members
    private paused: boolean = false;
    private running: boolean = false;
    private force: boolean = false;

    // pre- and post-render callbacks
    private preRenderCallbacks: Map<string, () => void> = new Map<string, () => void>();
    private postRenderCallbacks: Map<string, () => void> = new Map<string, () => void>();

    // postprocessing
    private postprocessing: DIVEPostprocessingSettings = {
        dof: {
            enabled: false,
            materialDepth: new ShaderMaterial(),
            scene: new Scene(),
            camera: new OrthographicCamera(),
            rtTextureDepth: new WebGLRenderTarget(0, 0),
            rtTextureColor: new WebGLRenderTarget(0, 0),
            bokeh_uniforms: {},
            materialBokeh: new ShaderMaterial(),
            quad: new Mesh()
        }

    };

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
    public StartRenderer(scene: DIVEScene, cam: DIVEPerspectiveCamera): void {
        // init dof
        this.postprocessing = {
            dof: this.initDOF(),
        };

        (this.postprocessing.dof as DIVEDOFSettings).materialDepth.uniforms['mNear'].value = cam.near;
        (this.postprocessing.dof as DIVEDOFSettings).materialDepth.uniforms['mFar'].value = cam.far;

        // normal render loop
        this.setAnimationLoop(() => { this.internal_loop(scene, cam) });
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
    private internal_loop(scene: DIVEScene, cam: DIVEPerspectiveCamera): void {
        // execute background render loop callbacks
        if ((this.paused || !this.running) && !this.force) return;

        // execute render loop callbacks
        this.preRenderCallbacks.forEach((callback) => { callback(); });

        if (this.postprocessing.dof.enabled) {
            this.internal_dof_render(scene, cam);
        } else {
            this.internal_render(scene, cam);
        }

        this.postRenderCallbacks.forEach((callback) => { callback(); });

        this.force = false;
    }

    private initDOF(): DIVEDOFSettings {
        const shaderSettings = {
            rings: 3,
            samples: 4
        };

        const scene = new Scene();

        const camera = new OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 10000, 10000);
        camera.position.z = 100;

        scene.add(camera);

        const rtTextureDepth = new WebGLRenderTarget(window.innerWidth, window.innerHeight, { type: HalfFloatType });
        const rtTextureColor = new WebGLRenderTarget(window.innerWidth, window.innerHeight, { type: HalfFloatType });

        const bokeh_shader = BokehShader;

        const bokeh_uniforms = UniformsUtils.clone<{ [uniform: string]: IUniform<unknown>; }>(bokeh_shader.uniforms as unknown as { [uniform: string]: IUniform<unknown>; });

        bokeh_uniforms['tColor'].value = rtTextureColor.texture;
        bokeh_uniforms['tDepth'].value = rtTextureDepth.texture;
        bokeh_uniforms['textureWidth'].value = window.innerWidth;
        bokeh_uniforms['textureHeight'].value = window.innerHeight;

        bokeh_uniforms['shaderFocus'].value = false;
        bokeh_uniforms['fstop'].value = 2.2;
        bokeh_uniforms['maxblur'].value = 1.0;

        bokeh_uniforms['showFocus'].value = false;
        bokeh_uniforms['focalDepth'].value = 2.8;
        bokeh_uniforms['manualdof'].value = false;
        bokeh_uniforms['vignetting'].value = false;
        bokeh_uniforms['depthblur'].value = false;

        bokeh_uniforms['threshold'].value = 0.5;
        bokeh_uniforms['gain'].value = 2.0;
        bokeh_uniforms['bias'].value = 0.5;
        bokeh_uniforms['fringe'].value = 0.7;

        bokeh_uniforms['focalLength'].value = 35;
        bokeh_uniforms['noise'].value = true;
        bokeh_uniforms['pentagon'].value = false;

        bokeh_uniforms['dithering'].value = 0.0001;

        const materialBokeh = new ShaderMaterial({

            uniforms: bokeh_uniforms,
            vertexShader: bokeh_shader.vertexShader,
            fragmentShader: bokeh_shader.fragmentShader,
            defines: {
                RINGS: shaderSettings.rings,
                SAMPLES: shaderSettings.samples
            }

        });

        const quad = new Mesh(new PlaneGeometry(window.innerWidth, window.innerHeight), materialBokeh);
        quad.position.z = - 500;
        scene.add(quad);

        const depthShader = BokehDepthShader;

        const materialDepth = new ShaderMaterial({
            uniforms: depthShader.uniforms,
            vertexShader: depthShader.vertexShader,
            fragmentShader: depthShader.fragmentShader
        });

        return {
            enabled: true,
            scene,
            camera,
            materialDepth,
            rtTextureDepth,
            rtTextureColor,
            bokeh_uniforms,
            materialBokeh,
            quad,
        };
    }

    private raycaster = new Raycaster();

    private mouse = new Vector2();

    private linearize(camera: DIVEPerspectiveCamera, depth: number): number {
        const zfar = camera.far;
        const znear = camera.near;
        return - zfar * znear / (depth * (zfar - znear) - zfar);

    }

    private smoothstep(near: number, far: number, depth: number): number {
        const x = this.saturate((depth - near) / (far - near));
        return x * x * (3 - 2 * x);

    }

    private saturate(x: number): number {
        return Math.max(0, Math.min(1, x));
    }

    private internal_dof_render(scene: DIVEScene, cam: DIVEPerspectiveCamera): void {
        this.raycaster.layers.mask = PRODUCT_LAYER_MASK;

        const dof = this.postprocessing.dof as DIVEDOFSettings;

        this.raycaster.setFromCamera(this.mouse, cam);

        const intersects = this.raycaster.intersectObjects(scene.Root.children, true);

        const targetDistance = (intersects.length > 0) ? intersects[0].distance : 1000;

        const sdistance = this.smoothstep(cam.near, cam.far, targetDistance);

        const ldistance = this.linearize(cam, 1 - sdistance);

        dof.bokeh_uniforms['focalDepth'].value = ldistance;

        this.clear();

        // render scene into texture
        this.setRenderTarget(dof.rtTextureColor);
        this.clear();
        this.render(scene, cam);

        // render depth into texture
        scene.overrideMaterial = dof.materialDepth;
        this.setRenderTarget(dof.rtTextureDepth);
        this.clear();
        this.render(scene, cam);
        scene.overrideMaterial = null;

        // render bokeh composite
        this.setRenderTarget(null);
        this.render(dof.scene, dof.camera);
    }

    private internal_render(scene: Scene, cam: DIVEPerspectiveCamera): void {
        this.setRenderTarget(null);
        this.clear();
        this.render(scene, cam);
    }
}