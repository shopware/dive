import { DIVEScene } from '../../engine/scene/Scene.ts';
import { DIVEBaseTool } from './BaseTool.ts';
import { DIVESelectTool } from './select/SelectTool.ts';
import { OrbitController } from '../controller/orbit/OrbitController.ts';
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
    dispose(): void;
    getActiveTool(): DIVEBaseTool | null;
    useTool(tool: ToolType): void;
    setGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void;
    setGizmoVisibility(active: boolean): void;
    setGizmoScaleLinked(linked: boolean): void;
    onPointerMove(e: PointerEvent): void;
    onPointerDown(e: PointerEvent): void;
    onPointerUp(e: PointerEvent): void;
    onWheel(e: WheelEvent): void;
    private addEventListeners;
    private removeEventListeners;
}
