import { BoxGeometry, Color, ColorRepresentation, CylinderGeometry, Mesh, MeshBasicMaterial, Object3D, Vector3 } from "three";
import { UI_LAYER_MASK } from "../../constant/VisibilityLayerMask";
import { DIVEHoverable } from "../../interface/Hoverable";
import { DIVEScaleGizmo } from "../scale/ScaleGizmo";
import { DIVEDraggable } from "../../interface/Draggable";
import { DraggableEvent } from "../../toolbox/BaseTool";

export class DIVEScaleHandle extends Object3D implements DIVEHoverable, DIVEDraggable {
    readonly isHoverable: true = true;
    readonly isDraggable: true = true;

    public parent: DIVEScaleGizmo | null = null;

    public axis: 'x' | 'y' | 'z';

    private _color: Color = new Color(0xff00ff);
    private _colorHover: Color;

    private _lineMaterial: MeshBasicMaterial;

    private _box: Mesh;
    private _boxSize: number;

    public get forwardVector(): Vector3 {
        return new Vector3(0, 0, 1).applyQuaternion(this.quaternion).normalize();
    }

    public get rightVector(): Vector3 {
        return new Vector3(1, 0, 0).applyQuaternion(this.quaternion).normalize();
    }

    public get upVector(): Vector3 {
        return new Vector3(0, 1, 0).applyQuaternion(this.quaternion).normalize();
    }

    constructor(axis: 'x' | 'y' | 'z', length: number, direction: Vector3, color: ColorRepresentation, boxSize: number = 0.05) {
        super();

        this.name = "DIVEScaleHandle";
        this.axis = axis;

        this._color.set(color);
        this._colorHover = this._color.clone().multiplyScalar(2);

        this._boxSize = boxSize;

        // create line
        const lineGeo = new CylinderGeometry(0.01, 0.01, length - boxSize, 13);
        this._lineMaterial = new MeshBasicMaterial({
            color: color,
            depthTest: false,
            depthWrite: false,
        });
        const lineMesh = new Mesh(lineGeo, this._lineMaterial);
        lineMesh.layers.mask = UI_LAYER_MASK;
        lineMesh.renderOrder = Infinity;
        lineMesh.rotateX(Math.PI / 2);
        lineMesh.translateY(length / 2);
        this.add(lineMesh);

        // create box
        this._box = new Mesh(
            new BoxGeometry(boxSize, boxSize, boxSize),
            this._lineMaterial,
        );
        this._box.layers.mask = UI_LAYER_MASK;
        this._box.renderOrder = Infinity;
        this._box.rotateX(Math.PI / 2);
        this._box.translateY(length - boxSize / 2);
        this._box.rotateZ(direction.x * Math.PI / 2);
        this._box.rotateX(direction.z * Math.PI / 2);
        this.add(this._box);

        // create collider
        const collider = new CylinderGeometry(0.1, 0.1, length + boxSize / 2, 3);
        const colliderMaterial = new MeshBasicMaterial({
            color: 0xff00ff,
            transparent: true,
            opacity: 0.15,
            depthTest: false,
            depthWrite: false,
        });
        const colliderMesh = new Mesh(collider, colliderMaterial);
        colliderMesh.visible = false;
        colliderMesh.layers.mask = UI_LAYER_MASK;
        colliderMesh.renderOrder = Infinity;
        colliderMesh.rotateX(Math.PI / 2);
        colliderMesh.translateY(length / 2);
        this.add(colliderMesh);

        this.rotateX(direction.y * -Math.PI / 2);
        this.rotateY(direction.x * Math.PI / 2);
    }

    public reset(): void {
        this._lineMaterial.color = this._color;
    }

    public update(scale: Vector3): void {
        this._box.scale.copy(
            new Vector3(1, 1, 1) // identity scale ...
                .sub(this.forwardVector) // subtracted the forward vector ...
                .add( // to then add ...
                    scale.clone() // the scale ...
                        .multiply(this.forwardVector) // that is scaled by the forward vector again to get the forward vector as the only direction
                )
        );
    }

    public onPointerEnter(): void {
        this._lineMaterial.color = this._colorHover;
        if (this.parent) {
            this.parent.onHoverAxis(this.axis, true);
        }
    }

    public onPointerLeave(): void {
        this._lineMaterial.color = this._color;
        if (this.parent) {
            this.parent.onHoverAxis(this.axis, false);
        }
    }

    public onDragStart(): void {
        this._lineMaterial.color = this._colorHover;
        if (this.parent) {
            this.parent.onAxisDragStart();
        }
    }

    public onDrag(e: DraggableEvent): void {
        this._lineMaterial.color = this._colorHover;
        if (this.parent) {
            this.parent.onAxisDrag(this, e);
        }
    }

    public onDragEnd(): void {
        this._lineMaterial.color = this._colorHover;
        if (this.parent) {
            this.parent.onAxisDragEnd();
        }
    }
}