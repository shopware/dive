import { Box3, BoxGeometry, Mesh, MeshBasicMaterial, Object3D, Vector3, type Vector3Like } from "three";
import { type DIVEMoveable } from "../interface/Moveable";
import { type DIVESelectable } from "../interface/Selectable";
import { type DIVESceneObject } from "../types";

export class DIVEGroup extends Object3D implements DIVESelectable, DIVEMoveable {
    readonly isDIVEGroup: true = true;
    readonly isSelectable: true = true;
    readonly isMoveable: true = true;

    private _bb: Box3;
    private _boxMesh: Mesh;

    constructor() {
        super();

        this.name = 'DIVEGroup';

        this._bb = new Box3();

        this._boxMesh = new Mesh(new BoxGeometry(0, 0, 0), new MeshBasicMaterial({ color: 0xff0000, wireframe: true }));
        this._boxMesh.visible = false;
        this.add(this._boxMesh);
    }

    public SetPosition(position: Vector3Like): void {
        this.position.set(position.x, position.y, position.z);
    }

    public SetRotation(rotation: Vector3Like): void {
        this.rotation.setFromVector3(new Vector3(rotation.x, rotation.y, rotation.z));
    }

    public SetScale(scale: Vector3Like): void {
        this.scale.set(scale.x, scale.y, scale.z);
    }

    public SetVisibility(visible: boolean): void {
        this.traverse((child) => {
            if (child.uuid === this._boxMesh.uuid) return;
            child.visible = visible;
        });
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
    }

    /**
     * Updates the bounding box of the group.
     * @returns {Vector3} The new center of the bounding box.
     */
    private updateBB(): Vector3 {
        this._bb.makeEmpty();
        this.children.forEach((child) => {
            if (child.uuid === this._boxMesh.uuid) return;
            this._bb.expandByObject(child);
        });

        return this._bb.getCenter(new Vector3());
    }

    private updateBoxMesh(): void {
        this._boxMesh.geometry = new BoxGeometry(this._bb.max.x - this._bb.min.x, this._bb.max.y - this._bb.min.y, this._bb.max.z - this._bb.min.z);
    }
}