import {
    BufferGeometry,
    Line,
    LineDashedMaterial,
    Vector3,
    Vector3Like,
    Object3D,
} from 'three';
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
        const points = [
            new Vector3(0, 0, 0),
            object.position.clone(),
        ];
        line.geometry.setFromPoints(points);
        line.computeLineDistances();
    }

    // public setBoundingBoxVisibility(visible: boolean): void {
    //     this._boxMesh.visible = visible;
    // }

    // /**
    //  * Recalculates the position of the group based on it's bounding box.
    //  * Children's world positions are kept.
    //  */
    // private recalculatePosition(): void {
    //     // store all children's world positions
    //     const childrensWorldPositions: Vector3[] = this.children.map((child) => child.getWorldPosition(new Vector3()));

    //     // calculate new center and set it as the group's position
    //     const bbcenter = this.updateBB();
    //     this.position.copy(bbcenter);

    //     // set childrens's positions so their world positions are kept
    //     this.children.forEach((child, i) => {
    //         if (child.uuid === this._boxMesh.uuid) return;
    //         child.position.copy(this.worldToLocal(childrensWorldPositions[i]));
    //     });

    //     DIVECommunication.get(this.userData.id)?.performAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position });
    // }

    // /**
    //  * Updates the bounding box of the group.
    //  * @returns {Vector3} The new center of the bounding box.
    //  */
    // private updateBB(): Vector3 {
    //     this._boundingBox.makeEmpty();

    //     if (this.children.length === 1) {
    //         // because we always have the box mesh as 1 child
    //         return this.position.clone();
    //     }

    //     this.children.forEach((child) => {
    //         if (child.uuid === this._boxMesh.uuid) return;
    //         this._boundingBox.expandByObject(child);
    //     });

    //     return this._boundingBox.getCenter(new Vector3());
    // }

    // private updateBoxMesh(): void {
    //     if (this.children.length === 1) {
    //         // because we always have the box mesh as 1 child
    //         this._boxMesh.visible = false;
    //         return;
    //     }

    //     this._boxMesh.quaternion.copy(this.quaternion.clone().invert());
    //     this._boxMesh.scale.set(1 / this.scale.x, 1 / this.scale.y, 1 / this.scale.z);
    //     this._boxMesh.geometry = new BoxGeometry(this._boundingBox.max.x - this._boundingBox.min.x, this._boundingBox.max.y - this._boundingBox.min.y, this._boundingBox.max.z - this._boundingBox.min.z);
    //     this._boxMesh.visible = true;
    // }
}
