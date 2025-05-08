import { DIVEScene } from '../../../engine/scene/Scene.ts';
import { DIVETransformTool } from '../transform/TransformTool.ts';
import { OrbitController } from '../../controller/orbit/OrbitController.ts';
import { DIVESelectable } from '../../../interfaces/Selectable.ts';
import { DIVEBaseTool } from '../BaseTool.ts';
export declare const isSelectTool: (tool: DIVEBaseTool) => tool is DIVESelectTool;
export interface DIVEObjectEventMap {
    select: object;
}
/**
 * A Tool to select and move objects in the scene.
 *
 * Objects have to implement the DIVESelectable interface to be selectable and DIVEMovable to be movable.
 *
 * @module
 */
export declare class DIVESelectTool extends DIVETransformTool {
    readonly isSelectTool: boolean;
    constructor(scene: DIVEScene, controller: OrbitController);
    Activate(): void;
    Select(selectable: DIVESelectable): void;
    Deselect(selectable: DIVESelectable): void;
    AttachGizmo(selectable: DIVESelectable): void;
    DetachGizmo(): void;
    onClick(e: PointerEvent): void;
}
