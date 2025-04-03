import { Box3, Object3D, Vector3, Vector3Like } from 'three';
import { DIVEMovable } from '../interface/Movable';
import { DIVESelectable } from '../interface/Selectable';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
declare const DIVENode_base: new () => Object3D<import('three').Object3DEventMap> & DIVEMovable & DIVESelectable;
export declare class DIVENode extends DIVENode_base {
    readonly isDIVENode: true;
    gizmo: TransformControls | null;
    protected _positionWorldBuffer: Vector3;
    protected _boundingBox: Box3;
    constructor();
    SetPosition(position: Vector3Like): void;
    SetRotation(rotation: Vector3Like): void;
    SetScale(scale: Vector3Like): void;
    SetVisibility(visible: boolean): void;
    SetToWorldOrigin(): void;
    /**
     * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
     */
    onMove(): void;
    onSelect(): void;
    onDeselect(): void;
}
export {};
