import { DIVEPerspectiveCamera } from '../../../engine/camera/PerspectiveCamera.ts';
import { type DIVEScene } from '../../../engine/scene/Scene.ts';
import { type DIVERenderer } from '../../../engine/renderer/Renderer.ts';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { MediaGenerationByPosition } from '../types/index.ts';

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

    public generateMedia(options: MediaGenerationByPosition): string {
        const { position, target, resolution } = options;
        const { width, height } = resolution;
        const resetPosition = this._controller.object.position.clone();
        const resetRotation = this._controller.object.quaternion.clone();

        this._renderer.onResize(width, height);
        // will be removed in the future when DIVEOrthographicCamera will be implemented
        if ('onResize' in this._controller.object) {
            this._controller.object.onResize(width, height);
        }

        this._controller.object.position.copy(position);
        this._controller.target.copy(target);
        this._controller.update();

        const dataUri = this.drawCanvas().toDataURL();

        this._controller.object.position.copy(resetPosition);
        this._controller.object.quaternion.copy(resetRotation);

        return dataUri;
    }

    public drawCanvas(canvasElement?: HTMLCanvasElement): HTMLCanvasElement {
        // save current canvas
        const restore = this._renderer.webglrenderer.domElement;
        if (canvasElement) {
            this._renderer.webglrenderer.domElement = canvasElement;
        }

        // draw canvas
        this._controller.object.layers.mask =
            DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK;
        this._renderer.webglrenderer.render(
            this._scene,
            this._controller.object,
        );
        this._controller.object.layers.mask =
            DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;

        const returnCanvas = this._renderer.webglrenderer.domElement;

        // restore canvas
        if (canvasElement) {
            this._renderer.webglrenderer.domElement = restore;
        }

        return returnCanvas;
    }
}
