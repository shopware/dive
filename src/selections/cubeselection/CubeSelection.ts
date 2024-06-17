import { Box3, Object3D } from "three";
import { DIVECubeSelectionMesh } from "./mesh/CubeSelectionMesh";

export class DIVECubeSelection extends Object3D {
    private _parents: { [id: string]: Object3D };
    private _objectRoot: Object3D;

    private _boundingBox: Box3;
    private _boxMesh: DIVECubeSelectionMesh;

    public get objects(): Object3D[] {
        return this._objectRoot.children;
    }

    public set objects(objects: Object3D[]) {
        this._objectRoot.children = objects;
        this.calculateBoundingBox();
        this._boxMesh.updateBox(this._boundingBox);
    }

    constructor() {
        super();

        this._parents = {};
        this._objectRoot = new Object3D();
        this.add(this._objectRoot);

        this._boundingBox = new Box3()
        this._boxMesh = new DIVECubeSelectionMesh();
        this.add(this._boxMesh);

    }

    public Attach(object: Object3D): this {
        if (object.parent !== null) {
            this._parents[object.uuid] = object.parent;
        }

        this.addChild(object);

        return this;
    }

    public Detach(object: Object3D): this;
    public Detach(object: string): this;
    public Detach(object: Object3D | string): this {
        if (typeof object === 'string') {
            const index = this.children.findIndex((child) => child.uuid === object);
            if (index === -1) return this;

            if (this._parents[object]) {
                this.removeChild(this.children[index]);
                this._parents[object].add(this.children[index]);
                delete this._parents[object];
            } else {
                this.removeChild(this.children[index]);
            }
        } else {
            if (this._parents[object.uuid]) {
                this.removeChild(object);
                this._parents[object.uuid].add(object);
                delete this._parents[object.uuid];
            } else {
                this.removeChild(object);
            }
        }

        return this;
    }

    private addChild(object: Object3D): this {
        this._objectRoot.add(object);
        this.calculateBoundingBox();
        this._boxMesh.updateBox(this._boundingBox);

        return this;
    }

    private removeChild(object: Object3D): this {
        this._objectRoot.remove(object);
        this.calculateBoundingBox();
        this._boxMesh.updateBox(this._boundingBox);
        return this;
    }

    private calculateBoundingBox(): void {
        this._objectRoot.children.forEach((child) => {
            child.updateMatrixWorld(true);
        });

        this._boundingBox.setFromObject(this._objectRoot);
    }
}