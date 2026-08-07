import {
    BufferGeometry,
    Line,
    LineDashedMaterial,
    Vector3,
    Vector3Like,
    Object3D,
} from 'three/webgpu';
import { DIVENode } from '../node/Node.ts';
import { type DIVESceneObject } from '../../types/index.ts';

export class DIVEGroup extends DIVENode {
    readonly isDIVEGroup: true = true;

    private _members: Object3D[]; // children objects

    public get members(): Object3D[] {
        return this._members;
    }

    private _lines: Line[]; // lines to children

    constructor() {
        super();

        this.name = 'DIVEGroup';

        this._members = [];

        this._lines = [];
    }

    public setPosition(position: Vector3Like): void {
        super.setPosition(position);
        this._members.forEach((member) => {
            if ('isDIVENode' in member) {
                (member as DIVENode).onMove();
            }
        });
    }

    public setLinesVisibility(visible: boolean, object?: Object3D): void {
        if (!object) {
            this._lines.forEach((line) => {
                line.visible = visible;
            });
            return;
        }

        const index = this._members.indexOf(object);
        if (index === -1) return;

        this._lines[index].visible = visible;
    }

    public attach(object: DIVESceneObject): this {
        // Check if the object is already a member
        if (this._members.includes(object)) {
            return this;
        }

        // create a line to the new object
        const line = this.createLine();
        this.add(line);
        this._lines.push(line);

        // attach (instead of add) object to keep its world position
        super.attach(object);
        this._members.push(object);

        // update line to object points
        this._updateLineTo(line, object);
        this.setLinesVisibility(true, object);

        return this;
    }

    /**
     * Removes an object from the group.
     * @param object - The object to remove.
     * @returns The group instance.
     */
    public remove(object: DIVESceneObject): this {
        // remove line first
        const index = this._members.indexOf(object);
        if (index === -1) {
            return this;
        }

        const line = this._lines[index];
        super.remove(line);
        this._lines.splice(index, 1);

        // removes object from group while keeping it's world position
        super.remove(object);
        this._members.splice(index, 1);

        return this;
    }

    public updateLineTo(object: Object3D): void {
        const index = this._members.indexOf(object);
        if (index === -1) return;

        this._updateLineTo(this._lines[index], object);
    }

    /**
     * Creates a line for visualization.
     */
    private createLine(): Line {
        const geo = new BufferGeometry();
        const mat = new LineDashedMaterial({
            color: 0x666666,
            dashSize: 0.05,
            gapSize: 0.025,
        });
        const line = new Line(geo, mat);
        line.visible = false;
        return line;
    }

    /**
     * Updates a line to the object.
     */
    private _updateLineTo(line: Line, object: Object3D): void {
        const points = [new Vector3(0, 0, 0), object.position.clone()];
        line.geometry.setFromPoints(points);
        line.computeLineDistances();
    }
}
