import DIVEOrbitControls from "../controls/OrbitControls.ts";
import DIVEScene from "../scene/Scene.ts";
import DIVEBaseTool from "./BaseTool.ts";
import DIVESelectTool from "./select/SelectTool.ts";

/**
 * A Toolbox to activate and deactivate tools to use with the pointer.
 *
 * @module
 */

export default class DIVEToolbox {
    public static readonly DefaultTool = 'select';

    private activeTool: DIVEBaseTool;

    private selectTool: DIVESelectTool;

    private removeListenersCallback: () => void = () => { };

    constructor(scene: DIVEScene, controller: DIVEOrbitControls) {
        this.selectTool = new DIVESelectTool(scene, controller);

        const pointerMove = this.onPointerMove.bind(this);
        const pointerDown = this.onPointerDown.bind(this);
        const pointerUp = this.onPointerUp.bind(this);
        const wheel = this.onWheel.bind(this);

        controller.domElement.addEventListener('pointermove', pointerMove);
        controller.domElement.addEventListener('pointerdown', pointerDown);
        controller.domElement.addEventListener('pointerup', pointerUp);
        controller.domElement.addEventListener('wheel', wheel);

        this.removeListenersCallback = () => {
            controller.domElement.removeEventListener('pointermove', pointerMove);
            controller.domElement.removeEventListener('pointerdown', pointerDown);
            controller.domElement.removeEventListener('pointerup', pointerUp);
            controller.domElement.removeEventListener('wheel', wheel);
        };

        // default tool
        this.activeTool = this.selectTool;
        this.activeTool.Activate();
    }

    public dispose(): void {
        this.removeListenersCallback();
    }

    public GetActiveTool(): DIVEBaseTool {
        return this.activeTool;
    }

    public UseTool(tool: string): void {
        this.activeTool.Deactivate();
        switch (tool) {
            case "select": {
                this.selectTool.Activate();
                this.activeTool = this.selectTool;
                break;
            }
            default: {
                throw new Error(`ToolBox.UseTool: Unknown tool: ${tool}`);
            }
        }
    }

    public SetGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void {
        this.selectTool.SetGizmoMode(mode);
    }

    public SetGizmoVisibility(active: boolean): void {
        this.selectTool.SetGizmoVisibility(active);
    }

    public onPointerMove(e: PointerEvent): void {
        this.activeTool.onPointerMove(e);
    }

    public onPointerDown(e: PointerEvent): void {
        this.activeTool.onPointerDown(e);
    }

    public onPointerUp(e: PointerEvent): void {
        this.activeTool.onPointerUp(e);
    }

    public onWheel(e: WheelEvent): void {
        this.activeTool.onWheel(e);
    }
}