import { DIVEScene } from '../../../engine/scene/Scene.ts';
import { DIVETransformTool } from '../transform/TransformTool.ts';
import { OrbitController } from '../../controller/orbit/OrbitController.ts';
import { DIVESelectable } from '../../../interfaces/Selectable.ts';
import { DIVEBaseTool } from '../BaseTool.ts';
export declare const isSelectTool: (tool: DIVEBaseTool) => tool is DIVESelectTool;
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
    activate(): void;
    select(selectable: DIVESelectable): void;
    deselect(selectable: DIVESelectable): void;
    attachGizmo(selectable: DIVESelectable): void;
    detachGizmo(): void;
    onClick(e: PointerEvent): void;
}
