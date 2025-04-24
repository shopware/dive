import { DIVEPerspectiveCamera } from '../../engine/camera/PerspectiveCamera';
import { type DIVEScene } from '../../engine/scene/Scene';
import { type DIVERenderer } from '../../engine/renderer/Renderer';
import { type DIVEOrbitController } from '../../modules/controller/orbit/OrbitController';
import { type Vector3Like } from 'three';

declare global {
    interface ModuleClasses {
        MediaCreator: typeof MediaCreator;
    }
}

/**
 * @module MediaCreator
 *
 * Provides tools for creating media content from the 3D scene:
 *
 * ```ts
 * import { MediaCreator } from '@shopware-ag/dive/modules/MediaCreator';
 *
 * const mediaCreator = new MediaCreator(renderer, scene, controller);
 *
 * // Generate a screenshot
 * const screenshot = await mediaCreator.GenerateMedia(
 *     { x: 0, y: 0, z: 0 }, // camera position
 *     { x: 0, y: 0, z: 0 }, // camera target
 *     1920, // width
 *     1080  // height
 * );
 * ```
 *
 * Features:
 * - High-quality screenshot generation
 * - Customizable camera position and target
 * - Configurable output resolution
 */

/**
 * @internal
 */
export class MediaCreator {
    private _renderer: DIVERenderer;
    private _scene: DIVEScene;
    private _controller: DIVEOrbitController;

    constructor(
        renderer: DIVERenderer,
        scene: DIVEScene,
        controller: DIVEOrbitController,
    ) {
        this._renderer = renderer;
        this._scene = scene;
        this._controller = controller;
    }

    public GenerateMedia(
        position: Vector3Like,
        target: Vector3Like,
        width: number,
        height: number,
    ): string {
        const resetPosition = this._controller.object.position.clone();
        const resetRotation = this._controller.object.quaternion.clone();

        this._renderer.onResize(width, height);
        this._controller.object.onResize(width, height);

        this._controller.object.position.copy(position);
        this._controller.target.copy(target);
        this._controller.update();

        const dataUri = this.DrawCanvas().toDataURL();

        this._controller.object.position.copy(resetPosition);
        this._controller.object.quaternion.copy(resetRotation);

        return dataUri;
    }

    public DrawCanvas(canvasElement?: HTMLCanvasElement): HTMLCanvasElement {
        // save current canvas
        const restore = this._renderer.domElement;
        if (canvasElement) {
            this._renderer.domElement = canvasElement;
        }

        // draw canvas
        this._controller.object.layers.mask =
            DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK;
        this._renderer.render(this._scene, this._controller.object);
        this._controller.object.layers.mask =
            DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;

        const returnCanvas = this._renderer.domElement;

        // restore canvas
        if (canvasElement) {
            this._renderer.domElement = restore;
        }

        return returnCanvas;
    }
}
