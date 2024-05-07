import DIVEPerspectiveCamera from "../camera/PerspectiveCamera.ts";
import DIVEScene from "../scene/Scene.ts";
import { COMPov } from "../com/types.ts";
import DIVERenderer from "../renderer/Renderer.ts";
import DIVEOrbitControls from "../controls/OrbitControls.ts";

export default class DIVEMediaCreator {
    private renderer: DIVERenderer;
    private scene: DIVEScene;
    private controller: DIVEOrbitControls;

    constructor(renderer: DIVERenderer, scene: DIVEScene, controller: DIVEOrbitControls) {
        this.renderer = renderer;
        this.scene = scene;
        this.controller = controller;
    }

    public GenerateMedia(pov: COMPov): string {
        const resetPosition = this.controller.object.position.clone();
        const resetRotation = this.controller.object.quaternion.clone();

        this.controller.object.position.copy(pov.position);
        this.controller.target.copy(pov.target);
        this.controller.update();

        const dataUri = this.drawCanvas();

        this.controller.object.position.copy(resetPosition);
        this.controller.object.quaternion.copy(resetRotation);

        return dataUri;
    }

    private drawCanvas(): string {
        // draw canvas
        this.controller.object.layers.mask = DIVEPerspectiveCamera.LIVE_VIEW_LAYER_MASK;
        this.renderer.render(this.scene, this.controller.object);
        this.controller.object.layers.mask = DIVEPerspectiveCamera.EDITOR_VIEW_LAYER_MASK;

        return this.renderer.domElement.toDataURL();
    }
}
