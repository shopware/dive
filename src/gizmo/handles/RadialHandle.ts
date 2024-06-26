import { Color, ColorRepresentation, Mesh, MeshBasicMaterial, Object3D, TorusGeometry, Vector3 } from "three";
import { UI_LAYER_MASK } from "../../constant/VisibilityLayerMask";
import { DIVEHoverable } from "../../interface/Hoverable";
import { DraggableEvent } from "../../toolbox/BaseTool";
import { DIVERotateGizmo } from "../rotate/RotateGizmo";
import { DIVEDraggable } from "../../interface/Draggable";

export class DIVERadialHandle extends Object3D implements DIVEHoverable, DIVEDraggable {
    readonly isHoverable: true = true;
    readonly isDraggable: true = true;

    public parent: DIVERotateGizmo | null = null;

    public axis: 'x' | 'y' | 'z';

    private _color: Color = new Color(0xff00ff);
    private _colorHover: Color;

    private _lineMaterial: MeshBasicMaterial;

    public get forwardVector(): Vector3 {
        return new Vector3(0, 0, 1).applyQuaternion(this.quaternion).normalize();
    }

    public get rightVector(): Vector3 {
        return new Vector3(1, 0, 0).applyQuaternion(this.quaternion).normalize();
    }

    public get upVector(): Vector3 {
        return new Vector3(0, 1, 0).applyQuaternion(this.quaternion).normalize();
    }

    constructor(axis: 'x' | 'y' | 'z', radius: number, arc: number, direction: Vector3, color: ColorRepresentation) {
        super();

        this.name = "DIVERadialHandle";
        this.axis = axis;

        this._color.set(color);
        this._colorHover = this._color.clone().multiplyScalar(2);

        // create line
        const lineGeo = new TorusGeometry(radius, 0.01, 13, 48, arc);
        this._lineMaterial = new MeshBasicMaterial({
            color: color,
            depthTest: false,
            depthWrite: false,
        });
        const lineMesh = new Mesh(lineGeo, this._lineMaterial);
        lineMesh.layers.mask = UI_LAYER_MASK;
        lineMesh.renderOrder = Infinity;
        this.add(lineMesh);

        // create collider
        const collider = new TorusGeometry(radius, 0.1, 3, 48, arc);
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

        this.add(colliderMesh);

        this.lookAt(direction);
    }

    public reset(): void {
        this._lineMaterial.color = this._color;
    }

    public onPointerEnter(): void {
        this._lineMaterial.color = this._colorHover;
        (this.parent as DIVERotateGizmo).onHoverAxis(this.axis, true);
    }

    public onPointerLeave(): void {
        this._lineMaterial.color = this._color;
        (this.parent as DIVERotateGizmo).onHoverAxis(this.axis, false);
    }

    public onDragStart(): void {
        this._lineMaterial.color = this._colorHover;
        (this.parent as DIVERotateGizmo).onAxisDragStart();
    }

    public onDrag(e: DraggableEvent): void {
        this._lineMaterial.color = this._colorHover;
        (this.parent as DIVERotateGizmo).onAxisDrag(this, e);
    }

    public onDragEnd(): void {
        this._lineMaterial.color = this._color;
        (this.parent as DIVERotateGizmo).onAxisDragEnd();
    }
}