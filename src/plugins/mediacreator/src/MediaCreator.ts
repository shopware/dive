import { RenderTarget, SRGBColorSpace } from 'three/webgpu';
import {
    DIVECameraComponent,
    type DIVEScene,
    type DIVERenderer,
} from '@shopware-ag/dive';
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
        const restorePosition = this._controller.object.owner.position.clone();
        const restoreTarget = this._controller.target.clone();
        const restoreWidth = this._renderer.canvas.clientWidth || width;
        const restoreHeight = this._renderer.canvas.clientHeight || height;

        try {
            this._controller.object.onResize(width, height);
            this._controller.object.owner.position.copy(position);
            this._controller.target.copy(target);
            this._controller.update();

            const dataUri = (
                await this.drawCanvas(undefined, resolution)
            ).toDataURL();

            return dataUri;
        } finally {
            this._controller.object.owner.position.copy(restorePosition);
            this._controller.target.copy(restoreTarget);
            this._controller.update();

            this._controller.object.onResize(restoreWidth, restoreHeight);
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
        const camera = this._controller.object.camera;
        const restoreLayerMask = camera.layers.mask;

        try {
            renderer.setRenderTarget(renderTarget);
            camera.layers.mask = DIVECameraComponent.LIVE_VIEW_LAYER_MASK;
            renderer.render(this._scene, camera);

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
            camera.layers.mask = restoreLayerMask;
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
