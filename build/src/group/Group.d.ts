import { Vector3Like, Object3D } from 'three';
import { DIVENode } from '../node/Node';
import { DIVESceneObject } from '../types';
export declare class DIVEGroup extends DIVENode {
    readonly isDIVEGroup: true;
    private _members;
    get members(): Object3D[];
    private _lines;
    constructor();
    SetPosition(position: Vector3Like): void;
    SetLinesVisibility(visible: boolean, object?: Object3D): void;
    attach(object: DIVESceneObject): this;
    remove(object: DIVESceneObject): this;
    UpdateLineTo(object: Object3D): void;
    /**
     * Adds a line to this grouo as last child.
     */
    private createLine;
    /**
     * Updates a line to the object.
     */
    private updateLineTo;
}
