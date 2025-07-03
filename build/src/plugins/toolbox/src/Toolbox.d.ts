import { DIVEScene } from '../../../index.ts';
import { DIVEBaseTool } from './BaseTool.ts';
import { DIVESelectTool } from './select/SelectTool.ts';
import { OrbitController } from '../../orbitcontroller/index.ts';
export type ToolType = 'select' | 'none';
export declare class Toolbox {
    static readonly DefaultTool = "select";
    private _scene;
    private _controller;
    private _activeTool;
    private _selectTool;
    get selectTool(): DIVESelectTool;
    constructor(scene: DIVEScene, controller: OrbitController);
    dispose(): void;
    getActiveTool(): DIVEBaseTool | null;
    useTool(tool: ToolType): void;
    setGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void;
    setGizmoVisible(active: boolean): void;
    setGizmoScaleLinked(linked: boolean): void;
    onPointerMove(e: PointerEvent): void;
    onPointerDown(e: PointerEvent): void;
    onPointerUp(e: PointerEvent): void;
    onWheel(e: WheelEvent): void;
    private addEventListeners;
    private removeEventListeners;
}
