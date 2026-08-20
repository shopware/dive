import {
    BasicShadowMap,
    LinearToneMapping,
    PCFShadowMap,
    PCFSoftShadowMap,
    SRGBColorSpace,
    WebGPURenderer,
} from 'three/webgpu';
import { DIVEScene } from '../scene/Scene.ts';
import { type DIVECameraComponent } from '../../components/camera/CameraComponent.ts';
import { DIVEEnvironment } from '../environment/Environment.ts';
import { DIVEAbortablePromise } from '../promise/abortable/AbortablePromise.ts';

export type DIVERendererSettings = {
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
     * @default true
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

export const DIVERendererDefaultSettings: Required<DIVERendererSettings> = {
    canvas: undefined,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    precision: 'highp',
    stencil: false,
    depth: true,
    logarithmicDepthBuffer: true,
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

export class DIVERenderer {
    public readonly isDIVERenderer: true = true;

    private _webgpurenderer: WebGPURenderer;
    private _environment: DIVEEnvironment;
    private _initPromise: DIVEAbortablePromise<void> | null = null;

    private _settings: DIVERendererSettings;

    /**
     * Whose eyes the next frame is drawn through.
     *
     * The component, not the bare camera: a camera is reached through the
     * component that owns it everywhere else, and taking the camera here would
     * make the renderer the one place holding a handle that cannot be asked for
     * its layers or resized. `tick` reads `.camera` off it per frame, so a
     * component that swaps its camera is followed rather than remembered wrongly.
     *
     * Settable rather than fixed at construction: cameras are nodes now, so a
     * caller may want to render through a camera entity or a preview and back
     * again. Welding one in meant rebuilding the renderer -- and with it the WebGPU
     * context -- to look somewhere else.
     */
    public activeCamera: DIVECameraComponent;

    constructor(
        private _scene: DIVEScene,
        camera: DIVECameraComponent,
        settings?: Partial<DIVERendererSettings>,
    ) {
        this.activeCamera = camera;

        this._settings = {
            ...DIVERendererDefaultSettings,
            ...(settings ?? {}),
        };

        this._webgpurenderer = this._createWebGPURenderer();

        this._environment = new DIVEEnvironment(
            this._webgpurenderer,
            this._scene,
        );
    }

    public get webgpurenderer(): WebGPURenderer {
        return this._webgpurenderer;
    }

    public get environment(): DIVEEnvironment {
        return this._environment;
    }

    public get canvas(): HTMLCanvasElement {
        return this._webgpurenderer.domElement;
    }

    public get initialized(): boolean {
        return this._webgpurenderer.initialized;
    }

    public async initAsync(): Promise<void> {
        if (!this._initPromise) {
            this._initPromise = new DIVEAbortablePromise<void>(
                async (signal) => {
                    if (!this._webgpurenderer.initialized) {
                        await this._webgpurenderer.init();
                    }

                    if (signal.aborted) {
                        return;
                    }

                    await this._environment.initAsync();
                },
            );
        }

        return this._initPromise;
    }

    /**
     * @deprecated Use {@link DIVERenderer.tick} instead.
     */
    public render(): void {
        console.warn('DIVERenderer.render: Use DIVERenderer.tick instead.');
        this.tick();
    }

    public tick(): void {
        if (!this._webgpurenderer.initialized) return;

        this._webgpurenderer.render(this._scene, this.activeCamera.camera);
    }

    public onResize(width: number, height: number): void {
        this._webgpurenderer.setSize(width, height);
    }

    public dispose(): void {
        this._initPromise?.abort();
        this._environment.dispose();
        this._webgpurenderer.dispose();
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        const previousRenderer = this._webgpurenderer;

        this._initPromise?.abort();
        this._initPromise = null;

        // create new renderer with canvas
        this._settings.canvas = canvas;
        this._webgpurenderer = this._createWebGPURenderer();
        this._environment.setRenderer(this._webgpurenderer);
        previousRenderer.dispose();
    }

    private _createWebGPURenderer(): WebGPURenderer {
        // create new renderer
        const renderer = new WebGPURenderer({
            ...this._settings,
            forceWebGL: true,
        });
        renderer.shadowMap.enabled = this._settings.shadows;
        renderer.shadowMap.type =
            this._settings.shadowQuality === 'high'
                ? PCFSoftShadowMap
                : this._settings.shadowQuality === 'medium'
                  ? PCFShadowMap
                  : BasicShadowMap;
        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.outputColorSpace = SRGBColorSpace;
        renderer.toneMapping = LinearToneMapping;
        renderer.toneMappingExposure = 1.0;

        return renderer;
    }
}
