import { type DIVEScene } from '@shopware-ag/dive';
import { type DIVEBaseTool } from './BaseTool.ts';
import { DIVESelectTool } from './select/SelectTool.ts';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';

export type ToolType = 'select' | 'none';

export class Toolbox {
    public static readonly DefaultTool = 'select';

    private _scene: DIVEScene;
    private _controller: OrbitController;

    private _activeTool: DIVEBaseTool | null;

    private _selectTool: DIVESelectTool | null;
    public get selectTool(): DIVESelectTool {
        if (!this._selectTool) {
            this._selectTool = new DIVESelectTool(
                this._scene,
                this._controller,
            );
        }
        return this._selectTool;
    }

    constructor(scene: DIVEScene, controller: OrbitController) {
        this._scene = scene;
        this._controller = controller;

        // toolset
        this._selectTool = null;

        // default tool
        this._activeTool = null;
    }

    public dispose(): void {
        this.removeEventListeners();
    }

    public getActiveTool(): DIVEBaseTool | null {
        return this._activeTool;
    }

    public useTool(tool: ToolType): void {
        this._activeTool?.deactivate();
        switch (tool) {
            case 'select': {
                this.addEventListeners();
                this.selectTool.activate();
                this._activeTool = this.selectTool;
                break;
            }
            case 'none': {
                this.removeEventListeners();
                this._activeTool = null;
                break;
            }
            default: {
                console.warn(`DIVEToolBox.useTool: Unknown tool: ${tool}`);
            }
        }
    }

    public setGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void {
        this.selectTool.setGizmoMode(mode);
    }

    public setGizmoVisible(active: boolean): void {
        this.selectTool.setGizmoVisible(active);
    }

    public setGizmoScaleLinked(linked: boolean): void {
        this.selectTool.setGizmoScaleLinked(linked);
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
        this._controller.domElement.addEventListener('pointermove', (e) =>
            this.onPointerMove(e),
        );
        this._controller.domElement.addEventListener('pointerdown', (e) =>
            this.onPointerDown(e),
        );
        this._controller.domElement.addEventListener('pointerup', (e) =>
            this.onPointerUp(e),
        );
        this._controller.domElement.addEventListener('wheel', (e) =>
            this.onWheel(e),
        );
    }

    private removeEventListeners(): void {
        this._controller.domElement.removeEventListener('pointermove', (e) =>
            this.onPointerMove(e),
        );
        this._controller.domElement.removeEventListener('pointerdown', (e) =>
            this.onPointerDown(e),
        );
        this._controller.domElement.removeEventListener('pointerup', (e) =>
            this.onPointerUp(e),
        );
        this._controller.domElement.removeEventListener('wheel', (e) =>
            this.onWheel(e),
        );
    }
}
