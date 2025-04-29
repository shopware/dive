import { DIVEBaseTool } from '../BaseTool';
import { DIVEScene } from '../../../engine/scene/Scene';
import { OrbitController } from '../../controller/orbit/OrbitController';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { DIVEGizmo } from '../../../components/gizmo/Gizmo';
export declare const isTransformTool: (tool: DIVEBaseTool) => tool is DIVETransformTool;
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
export declare class DIVETransformTool extends DIVEBaseTool {
    readonly isTransformTool: boolean;
    private _scaleLinked;
    protected _gizmo: TransformControls | DIVEGizmo;
    constructor(scene: DIVEScene, controller: OrbitController);
    Activate(): void;
    SetGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void;
    SetGizmoVisibility(active: boolean): void;
    SetGizmoScaleLinked(linked: boolean): void;
    private initGizmo;
}
