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

        controller.domElement.addEventListener('pointerdown', this.onPointerDown.bind(this));
        controller.domElement.addEventListener('pointerup', this.onPointerUp.bind(this));
        controller.domElement.addEventListener('wheel', this.onWheel.bind(this));

        this.removeListenersCallback = () => {
            controller.domElement.removeEventListener('pointerdown', this.onPointerDown.bind(this));
            controller.domElement.removeEventListener('pointerup', this.onPointerUp.bind(this));
            controller.domElement.removeEventListener('wheel', this.onWheel.bind(this));
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