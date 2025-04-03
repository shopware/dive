import { DIVEBaseTool } from '../BaseTool.ts';
import { DIVEScene } from '../../scene/Scene.ts';
import { default as DIVEOrbitControls } from '../../controls/OrbitControls.ts';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { DIVEGizmo } from '../../gizmo/Gizmo.ts';
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
export default class DIVETransformTool extends DIVEBaseTool {
    readonly isTransformTool: boolean;
    private _scaleLinked;
    protected _gizmo: TransformControls | DIVEGizmo;
    constructor(scene: DIVEScene, controller: DIVEOrbitControls);
    Activate(): void;
    SetGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void;
    SetGizmoVisibility(active: boolean): void;
    SetGizmoScaleLinked(linked: boolean): void;
    private initGizmo;
}
