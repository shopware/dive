import { DIVEScene } from '../../engine/scene/Scene';
import { DIVEBaseTool } from './BaseTool';
import { DIVESelectTool } from './select/SelectTool';
import { OrbitController } from '../controller/orbit/OrbitController';
export type ToolType = 'select' | 'none';
declare global {
    interface ModuleClasses {
        Toolbox: typeof Toolbox;
    }
}
/**
 * @module Toolbox
 * A Toolbox to activate and deactivate tools to use with the pointer.
 */
export declare class Toolbox {
    static readonly DefaultTool = "select";
    private _scene;
    private _controller;
    private _activeTool;
    private _selectTool;
    get selectTool(): DIVESelectTool;
    constructor(scene: DIVEScene, controller: OrbitController);
    Dispose(): void;
    GetActiveTool(): DIVEBaseTool | null;
    UseTool(tool: ToolType): void;
    SetGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void;
    SetGizmoVisibility(active: boolean): void;
    SetGizmoScaleLinked(linked: boolean): void;
    onPointerMove(e: PointerEvent): void;
    onPointerDown(e: PointerEvent): void;
    onPointerUp(e: PointerEvent): void;
    onWheel(e: WheelEvent): void;
    private addEventListeners;
    private removeEventListeners;
}
