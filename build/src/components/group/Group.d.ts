import { Vector3Like, Object3D } from 'three';
import { DIVENode } from '../node/Node.ts';
import { DIVESceneObject } from '../../types/index.ts';
export declare class DIVEGroup extends DIVENode {
    readonly isDIVEGroup: true;
    private _members;
    get members(): Object3D[];
    private _lines;
    constructor();
    setPosition(position: Vector3Like): void;
    setLinesVisibility(visible: boolean, object?: Object3D): void;
    attach(object: DIVESceneObject): this;
    /**
     * Removes an object from the group.
     * @param object - The object to remove.
     * @returns The group instance.
     */
    remove(object: DIVESceneObject): this;
    updateLineTo(object: Object3D): void;
    /**
     * Creates a line for visualization.
     */
    private createLine;
    /**
     * Updates a line to the object.
     */
    private _updateLineTo;
}
