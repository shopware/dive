import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { DIVENode } from "../node/Node";
import { DIVECommunication } from "../com/Communication";
import { type DIVESceneObject } from "../types";

export class DIVEGroup extends DIVENode {
    readonly isDIVEGroup: true = true;

    private _boxMesh: Mesh;

    constructor() {
        super();

        this.name = 'DIVEGroup';

        this._boxMesh = new Mesh(new BoxGeometry(0, 0, 0), new MeshBasicMaterial({ color: 0xff0000, wireframe: true }));
        this._boxMesh.visible = false;
        this.add(this._boxMesh);
    }

    public SetBoundingBoxVisibility(visible: boolean): void {
        this._boxMesh.visible = visible;
    }

    public attach(object: DIVESceneObject): this {
        // attach (insted of add) object to keep it's world position
        super.attach(object);

        // set position to it's bb's center
        this.recalculatePosition();

        // update box mesh
        this.updateBoxMesh();

        return this;
    }

    public remove(object: DIVESceneObject): this {
        // removes object from group while keeping it's world position
        super.remove(object);

        // set position to it's bb's center
        this.recalculatePosition();

        // update box mesh
        this.updateBoxMesh();

        return this;
    }

    /**
     * Recalculates the position of the group based on it's bounding box.
     * Children's world positions are kept.
     */
    private recalculatePosition(): void {
        // store all children's world positions
        const childrensWorldPositions: Vector3[] = this.children.map((child) => child.getWorldPosition(new Vector3()));

        // calculate new center and set it as the group's position
        const bbcenter = this.updateBB();
        this.position.copy(bbcenter);

        // set childrens's positions so their world positions are kept
        this.children.forEach((child, i) => {
            if (child.uuid === this._boxMesh.uuid) return;
            child.position.copy(this.worldToLocal(childrensWorldPositions[i]));
        });

        DIVECommunication.get(this.userData.id)?.PerformAction('UPDATE_OBJECT', { id: this.userData.id, position: this.position });
    }

    /**
     * Updates the bounding box of the group.
     * @returns {Vector3} The new center of the bounding box.
     */
    private updateBB(): Vector3 {
        this._boundingBox.makeEmpty();

        if (this.children.length === 1) {
            // because we always have the box mesh as 1 child
            return this.position.clone();
        }

        this.children.forEach((child) => {
            if (child.uuid === this._boxMesh.uuid) return;
            this._boundingBox.expandByObject(child);
        });

        return this._boundingBox.getCenter(new Vector3());
    }

    private updateBoxMesh(): void {
        if (this.children.length === 1) {
            // because we always have the box mesh as 1 child
            this._boxMesh.visible = false;
            return;
        }

        this._boxMesh.quaternion.copy(this.quaternion.clone().invert());
        this._boxMesh.scale.set(1 / this.scale.x, 1 / this.scale.y, 1 / this.scale.z);
        this._boxMesh.geometry = new BoxGeometry(this._boundingBox.max.x - this._boundingBox.min.x, this._boundingBox.max.y - this._boundingBox.min.y, this._boundingBox.max.z - this._boundingBox.min.z);
        this._boxMesh.visible = true;
    }

    public onMove(): void {
        super.onMove();
        this.updateBB();
        this.updateBoxMesh();
    }
}