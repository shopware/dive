import {
    BasicShadowMap,
    LinearToneMapping,
    PCFShadowMap,
    PCFSoftShadowMap,
    SRGBColorSpace,
    WebGPURenderer,
} from 'three/webgpu';
import { DIVEScene } from '../scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../camera/PerspectiveCamera.ts';
import { DIVEEnvironment } from '../environment/Environment.ts';

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

type CanvasLayout = {
    width: number;
    height: number;
};

const nextFrame = (): Promise<void> =>
    new Promise((resolve) => requestAnimationFrame(() => resolve()));

const getCanvasLayout = (canvas: HTMLCanvasElement): CanvasLayout => {
    const rect = canvas.getBoundingClientRect?.() ?? {
        width: 0,
        height: 0,
    };

    return {
        width: Math.max(rect.width, canvas.clientWidth),
        height: Math.max(rect.height, canvas.clientHeight),
    };
};

const isRenderableCanvas = (canvas: HTMLCanvasElement): boolean => {
    if (!canvas.isConnected) {
        return false;
    }

    const { width, height } = getCanvasLayout(canvas);
    return width >= 1 && height >= 1;
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
    private _initPromise: Promise<void> | null = null;

    private _settings: DIVERendererSettings;

    constructor(
        private _scene: DIVEScene,
        private _camera: DIVEPerspectiveCamera,
        settings?: Partial<DIVERendererSettings>,
    ) {
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

    public async init(): Promise<void> {
        if (this._webgpurenderer.initialized) {
            await this._environment.init();
            return;
        }

        if (this._initPromise) {
            return this._initPromise;
        }

        const renderer = this._webgpurenderer;
        this._initPromise = (async () => {
            const canvasLayout = await this._waitForRenderableCanvas(renderer);

            if (renderer !== this._webgpurenderer) {
                return;
            }

            if (canvasLayout) {
                renderer.setSize(canvasLayout.width, canvasLayout.height);
            }

            await renderer.init();

            if (renderer !== this._webgpurenderer) {
                return;
            }

            await this._environment.init();
        })().finally(() => {
            if (renderer === this._webgpurenderer) {
                this._initPromise = null;
            }
        });

        return this._initPromise;
    }

    public render(): void {
        if (!this._webgpurenderer.initialized) return;

        this._webgpurenderer.render(this._scene, this._camera);
    }

    public onResize(width: number, height: number): void {
        this._webgpurenderer.setSize(width, height);
    }

    public dispose(): void {
        this._environment.dispose();
        this._webgpurenderer.dispose();
    }

    public setCanvas(canvas: HTMLCanvasElement): void {
        const previousRenderer = this._webgpurenderer;
        const shouldReinitialize =
            previousRenderer.initialized || this._initPromise !== null;

        this._initPromise = null;

        // create new renderer with canvas
        this._settings.canvas = canvas;
        this._webgpurenderer = this._createWebGPURenderer();

        this._environment.setRenderer(this._webgpurenderer);
        previousRenderer.dispose();

        if (shouldReinitialize) {
            void this.init();
        }
    }

    private _createWebGPURenderer(): WebGPURenderer {
        // create new renderer
        const renderer = new WebGPURenderer(this._settings);
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

    private async _waitForRenderableCanvas(
        renderer: WebGPURenderer,
    ): Promise<CanvasLayout | null> {
        if (this._settings.canvas === undefined) {
            return getCanvasLayout(renderer.domElement);
        }

        const canvas = renderer.domElement;

        const getStableLayout = async (): Promise<CanvasLayout | null> => {
            if (
                renderer !== this._webgpurenderer ||
                !isRenderableCanvas(canvas)
            ) {
                return null;
            }

            await nextFrame();

            if (
                renderer !== this._webgpurenderer ||
                !isRenderableCanvas(canvas)
            ) {
                return null;
            }

            return getCanvasLayout(canvas);
        };

        const immediateLayout = await getStableLayout();

        if (immediateLayout) {
            return immediateLayout;
        }

        return new Promise((resolve) => {
            let settled = false;
            let verifyScheduled = false;
            let rafId: number | null = null;

            const finish = (layout: CanvasLayout | null): void => {
                if (settled) {
                    return;
                }

                settled = true;
                resizeObserver.disconnect();

                if (rafId !== null) {
                    cancelAnimationFrame(rafId);
                }

                resolve(layout);
            };

            const verify = async (): Promise<void> => {
                if (settled || verifyScheduled) {
                    return;
                }

                verifyScheduled = true;

                try {
                    if (renderer !== this._webgpurenderer) {
                        finish(null);
                        return;
                    }

                    const stableLayout = await getStableLayout();

                    if (stableLayout) {
                        finish(stableLayout);
                    }
                } finally {
                    verifyScheduled = false;
                }
            };

            const resizeObserver = new ResizeObserver(() => {
                void verify();
            });

            resizeObserver.observe(canvas);

            if (canvas.parentElement) {
                resizeObserver.observe(canvas.parentElement);
            }

            const tick = (): void => {
                if (settled) {
                    return;
                }

                void verify();
                rafId = requestAnimationFrame(tick);
            };

            tick();
        });
    }
}
