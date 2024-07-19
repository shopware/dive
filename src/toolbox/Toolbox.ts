import type DIVEOrbitControls from "../controls/OrbitControls.ts";
import type DIVEScene from "../scene/Scene.ts";
import { type DIVEBaseTool } from "./BaseTool.ts";
import { type DIVESelectTool } from "./select/SelectTool.ts";

export type ToolType = 'select' | 'none';

/**
 * A Toolbox to activate and deactivate tools to use with the pointer.
 *
 * @module
 */

export default class DIVEToolbox {
    public static readonly DefaultTool = 'select';

    private _scene: DIVEScene;
    private _controller: DIVEOrbitControls;

    private _activeTool: DIVEBaseTool | null;

    private _selectTool: DIVESelectTool | null;
    public get selectTool(): DIVESelectTool {
        if (!this._selectTool) {
            const DIVESelectTool = require('./select/SelectTool.ts').DIVESelectTool as typeof import('./select/SelectTool.ts').DIVESelectTool;
            this._selectTool = new DIVESelectTool(this._scene, this._controller);
        }
        return this._selectTool;
    }

    constructor(scene: DIVEScene, controller: DIVEOrbitControls) {
        this._scene = scene;
        this._controller = controller;

        // toolset
        this._selectTool = null;

        // default tool
        this._activeTool = null;
    }

    public Dispose(): void {
        this.removeEventListeners();
    }

    public GetActiveTool(): DIVEBaseTool | null {
        return this._activeTool;
    }

    public UseTool(tool: ToolType): void {
        this._activeTool?.Deactivate();
        switch (tool) {
            case "select": {
                this.addEventListeners();
                this.selectTool.Activate();
                this._activeTool = this.selectTool;
                break;
            }
            case "none": {
                this.removeEventListeners();
                this._activeTool = null;
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
        this._activeTool?.onPointerMove(e);
    }

    public onPointerDown(e: PointerEvent): void {
        this._activeTool?.onPointerDown(e);
    }

    public onPointerUp(e: PointerEvent): void {
        this._activeTool?.onPointerUp(e);
    }

    public onWheel(e: WheelEvent): void {
        this._activeTool?.onWheel(e);
    }

    private addEventListeners(): void {
        this._controller.domElement.addEventListener('pointermove', (e) => this.onPointerMove(e));
        this._controller.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e));
        this._controller.domElement.addEventListener('pointerup', (e) => this.onPointerUp(e));
        this._controller.domElement.addEventListener('wheel', (e) => this.onWheel(e));
    }

    private removeEventListeners(): void {
        this._controller.domElement.removeEventListener('pointermove', (e) => this.onPointerMove(e));
        this._controller.domElement.removeEventListener('pointerdown', (e) => this.onPointerDown(e));
        this._controller.domElement.removeEventListener('pointerup', (e) => this.onPointerUp(e));
        this._controller.domElement.removeEventListener('wheel', (e) => this.onWheel(e));
    }
}