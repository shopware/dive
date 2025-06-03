import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { DIVEBaseTool } from '../BaseTool.ts';
import { DIVEGizmo, DIVEScene } from '../../../../index.ts';
import { OrbitController } from '../../../orbitcontroller/index.ts';
export declare const isTransformTool: (tool: DIVEBaseTool) => tool is DIVETransformTool;
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
    activate(): void;
    setGizmoMode(mode: 'translate' | 'rotate' | 'scale'): void;
    setGizmoVisibility(active: boolean): void;
    setGizmoScaleLinked(linked: boolean): void;
    private initGizmo;
}
