import DIVEPerspectiveCamera from "../camera/PerspectiveCamera.ts";
import DIVEScene from "../scene/Scene.ts";
import { DIVERenderer } from "../renderer/Renderer.ts";
import DIVEOrbitControls from "../controls/OrbitControls.ts";
import { Vector3Like } from "three";

/**
 * Creates renderings of the current scene
 *
 * @module
 */

export class DIVEMediaCreator {
    private renderer: DIVERenderer;
    private scene: DIVEScene;
    private controller: DIVEOrbitControls;

    constructor(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls) {
        this.renderer = renderer;
        this.scene = scene;
        this.controller = controller;
    }

    public GenerateMedia(position: Vector3Like, target: Vector3Like, width: number, height: number): string {
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
        this.controller.object.layers.mask = DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK;
        this.renderer.render(this.scene, this.controller.object);
        this.controller.object.layers.mask = DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;

        const returnCanvas = this.renderer.domElement;

        // restore canvas
        if (canvasElement) {
            this.renderer.domElement = restore;
        }

        return returnCanvas;
    }
}
