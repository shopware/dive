import { Box3, Object3D, Vector3, Vector3Like } from 'three';
import { DIVEMovable } from '../../interfaces/Movable.ts';
import { DIVESelectable } from '../../interfaces/Selectable.ts';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.ts';
export declare class DIVENode extends Object3D implements DIVESelectable, DIVEMovable {
    readonly isSelectable: true;
    readonly isMovable: true;
    readonly isDIVENode: true;
    gizmo: TransformControls | null;
    protected _positionWorldBuffer: Vector3;
    protected _boundingBox: Box3;
    constructor();
    setPosition(position: Vector3Like): void;
    setRotation(rotation: Vector3Like): void;
    setScale(scale: Vector3Like): void;
    setVisibility(visible: boolean): void;
    setToWorldOrigin(): void;
    /**
     * Can be called when the object is moved from a foreign object (gizmo, parent, etc.) to update the object's position.
     */
    onMove(): void;
    onSelect(): void;
    onDeselect(): void;
}
