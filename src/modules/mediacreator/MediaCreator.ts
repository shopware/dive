import DIVEPerspectiveCamera from '../../camera/PerspectiveCamera';
import { type DIVEScene } from '../../scene/Scene';
import { type DIVERenderer } from '../../renderer/Renderer';
import type DIVEOrbitControls from '../../controls/OrbitControls';
import { type Vector3Like } from 'three';

declare global {
    interface ModuleClasses {
        MediaCreator: MediaCreator;
    }
}

/**
 * @module MediaCreator
 *
 * Provides tools for creating media content from the 3D scene:
 *
 * ```ts
 * import { MediaCreator } from '@shopware-ag/dive/modules/mediacreator';
 * const mediaCreator = new MediaCreator();
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

export class MediaCreator {
    private renderer: DIVERenderer;
    private scene: DIVEScene;
    private controller: DIVEOrbitControls;

    constructor(
        renderer: DIVERenderer,
        scene: DIVEScene,
        controller: DIVEOrbitControls,
    ) {
        this.renderer = renderer;
        this.scene = scene;
        this.controller = controller;
    }

    public GenerateMedia(
        position: Vector3Like,
        target: Vector3Like,
        width: number,
        height: number,
    ): string {
        const resetPosition = this.controller.object.position.clone();
        const resetRotation = this.controller.object.quaternion.clone();

        this.renderer.OnResize(width, height);
        this.controller.object.OnResize(width, height);

        this.controller.object.position.copy(position);
        this.controller.target.copy(target);
        this.controller.update();

        const dataUri = this.DrawCanvas().toDataURL();

        this.controller.object.position.copy(resetPosition);
        this.controller.object.quaternion.copy(resetRotation);

        return dataUri;
    }

    public DrawCanvas(canvasElement?: HTMLCanvasElement): HTMLCanvasElement {
        // save current canvas
        const restore = this.renderer.domElement;
        if (canvasElement) {
            this.renderer.domElement = canvasElement;
        }

        // draw canvas
        this.controller.object.layers.mask =
            DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK;
        this.renderer.render(this.scene, this.controller.object);
        this.controller.object.layers.mask =
            DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;

        const returnCanvas = this.renderer.domElement;

        // restore canvas
        if (canvasElement) {
            this.renderer.domElement = restore;
        }

        return returnCanvas;
    }
}
