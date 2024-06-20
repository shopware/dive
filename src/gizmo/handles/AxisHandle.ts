import { Color, ColorRepresentation, CylinderGeometry, Mesh, MeshBasicMaterial, Object3D, Vector3 } from "three";
import { UI_LAYER_MASK } from "../../constant/VisibilityLayerMask";
import { DIVEHoverable } from "../../interface/Hoverable";
import { DIVETranslateGizmo } from "../translate/TranslateGizmo";
import { DIVEDraggable, DraggableEvent } from "../../interface/Draggable";

export class DIVEAxisHandle extends Object3D implements DIVEHoverable, DIVEDraggable {
    readonly isHoverable: true = true;
    readonly isDraggable: true = true;

    public axis: 'x' | 'y' | 'z';

    private _color: Color = new Color(0xff00ff);
    private _colorHover: Color;

    private _lineMaterial: MeshBasicMaterial;

    public get forward(): Vector3 {
        return new Vector3(0, 1, 0).applyQuaternion(this.quaternion).normalize();
    }

    public get right(): Vector3 {
        return new Vector3(1, 0, 0).applyQuaternion(this.quaternion).normalize();
    }

    // public get up(): Vector3 {
    //     return new Vector3(0, 1, 0).applyQuaternion(this.quaternion).normalize();
    // }

    constructor(axis: 'x' | 'y' | 'z', length: number, direction: Vector3, color: ColorRepresentation) {
        super();

        this.name = "DIVEAxisHandle";
        this.axis = axis;

        this._color.set(color);
        this._colorHover = this._color.clone().multiplyScalar(2);

        // create line
        const lineGeo = new CylinderGeometry(0.01, 0.01, length, 13);
        this._lineMaterial = new MeshBasicMaterial({
            color: color,
            depthTest: false,
            depthWrite: false,
        });
        const lineMesh = new Mesh(lineGeo, this._lineMaterial);
        lineMesh.layers.mask = UI_LAYER_MASK;
        lineMesh.renderOrder = Infinity;
        // lineMesh.rotateX(Math.PI / 2);
        lineMesh.translateY(length / 2);
        this.add(lineMesh);

        // create collider
        const collider = new CylinderGeometry(0.1, 0.1, length, 3);
        const colliderMaterial = new MeshBasicMaterial({
            color: 0xff00ff,
            transparent: true,
            opacity: 0.15,
            depthTest: false,
            depthWrite: false,
        });
        const colliderMesh = new Mesh(collider, colliderMaterial);
        // colliderMesh.visible = false;
        colliderMesh.layers.mask = UI_LAYER_MASK;
        colliderMesh.renderOrder = Infinity;
        // colliderMesh.rotateX(Math.PI / 2);
        colliderMesh.translateY(length / 2);
        this.add(colliderMesh);

        this.rotateX(direction.z * Math.PI / 2);
        this.rotateZ(direction.x * -Math.PI / 2);
        // this.rotateX(direction.y * Math.PI / 2);

        console.log(axis, this.forward);
    }

    public onPointerEnter(): void {
        this._lineMaterial.color = this._colorHover;
        (this.parent as DIVETranslateGizmo).onHoverAxis();
    }

    public onPointerOver(): void {
        // this.onHover();
    }

    public onPointerLeave(): void {
        this._lineMaterial.color = this._color;
        (this.parent as DIVETranslateGizmo).onHoverAxis();
    }

    public onDragStart(e: DraggableEvent): void {
        console.log('translate: drag start', e);
        (this.parent as DIVETranslateGizmo).onAxisDragStart();
    }

    public onDrag(e: DraggableEvent): void {
        // console.log('translate: drag', e);

        const pointOnAxis = e.dragDelta.clone().projectOnVector(this.forward);
        console.log(pointOnAxis);
    }

    public onDragEnd(e: DraggableEvent): void {
        console.log('translate: drag end', e);
        (this.parent as DIVETranslateGizmo).onAxisDragEnd();
    };
}