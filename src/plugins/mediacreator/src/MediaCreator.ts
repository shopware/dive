import { RenderTarget, SRGBColorSpace } from 'three/webgpu';
import { DIVEPerspectiveCamera } from '../../../engine/camera/PerspectiveCamera.ts';
import { type DIVEScene } from '../../../engine/scene/Scene.ts';
import { type DIVERenderer } from '../../../engine/renderer/Renderer.ts';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import {
    type MediaGenerationByPosition,
    type MediaGenerationResolution,
} from '../types/index.ts';

/**
 * @internal
 */
export class MediaCreator {
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _controller: OrbitController;

    constructor(
        renderer: DIVERenderer,
        scene: DIVEScene,
        controller: OrbitController,
    ) {
        this._renderer = renderer;
        this._scene = scene;
        this._controller = controller;
    }

    public async generateMedia(
        options: MediaGenerationByPosition,
    ): Promise<string> {
        const { position, target, resolution } = options;
        const { width, height } = resolution;
        const resetPosition = this._controller.object.position.clone();
        const resetRotation = this._controller.object.quaternion.clone();
        const resetTarget = this._controller.target.clone();
        const restoreWidth = this._renderer.canvas.clientWidth || width;
        const restoreHeight = this._renderer.canvas.clientHeight || height;

        try {
            if ('onResize' in this._controller.object) {
                this._controller.object.onResize(width, height);
            }

            this._controller.object.position.copy(position);
            this._controller.target.copy(target);
            this._controller.update();

            const dataUri = (
                await this.drawCanvas(undefined, resolution)
            ).toDataURL();

            return dataUri;
        } finally {
            this._controller.object.position.copy(resetPosition);
            this._controller.object.quaternion.copy(resetRotation);
            this._controller.target.copy(resetTarget);
            this._controller.update();

            if ('onResize' in this._controller.object) {
                this._controller.object.onResize(restoreWidth, restoreHeight);
            }
        }
    }

    public async drawCanvas(
        canvasElement?: HTMLCanvasElement,
        resolution?: MediaGenerationResolution,
    ): Promise<HTMLCanvasElement> {
        await this._renderer.initAsync();

        const renderer = this._renderer.webgpurenderer;
        const width = Math.max(
            1,
            resolution?.width ??
                canvasElement?.width ??
                canvasElement?.clientWidth ??
                this._renderer.canvas.clientWidth,
        );
        const height = Math.max(
            1,
            resolution?.height ??
                canvasElement?.height ??
                canvasElement?.clientHeight ??
                this._renderer.canvas.clientHeight,
        );
        const renderTarget = new RenderTarget(width, height, {
            colorSpace: SRGBColorSpace,
        });
        const restoreRenderTarget = renderer.getRenderTarget();
        const restoreLayerMask = this._controller.object.layers.mask;

        try {
            renderer.setRenderTarget(renderTarget);
            this._controller.object.layers.mask =
                DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK;
            renderer.render(this._scene, this._controller.object);

            const pixels = await renderer.readRenderTargetPixelsAsync(
                renderTarget,
                0,
                0,
                width,
                height,
            );

            const outputCanvas =
                canvasElement ?? document.createElement('canvas');
            outputCanvas.width = width;
            outputCanvas.height = height;
            this._writePixelsToCanvas(outputCanvas, pixels, width, height);

            return outputCanvas;
        } finally {
            this._controller.object.layers.mask = restoreLayerMask;
            renderer.setRenderTarget(restoreRenderTarget);
            renderTarget.dispose();
        }
    }

    private _writePixelsToCanvas(
        canvas: HTMLCanvasElement,
        pixels: ArrayLike<number>,
        width: number,
        height: number,
    ): void {
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error(
                'MediaCreator.drawCanvas: 2D canvas context is not available.',
            );
        }

        const imageData = context.createImageData(width, height);
        imageData.data.set(new Uint8ClampedArray(Array.from(pixels)));
        context.putImageData(imageData, 0, 0);
    }
}
