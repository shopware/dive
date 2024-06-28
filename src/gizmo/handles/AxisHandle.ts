import { Color, ColorRepresentation, CylinderGeometry, Mesh, MeshBasicMaterial, Object3D, Vector3 } from "three";
import { UI_LAYER_MASK } from "../../constant/VisibilityLayerMask";
import { DIVEHoverable } from "../../interface/Hoverable";
import { DIVETranslateGizmo } from "../translate/TranslateGizmo";
import { DIVEDraggable } from "../../interface/Draggable";
import { DraggableEvent } from "../../toolbox/BaseTool";

export class DIVEAxisHandle extends Object3D implements DIVEHoverable, DIVEDraggable {
    readonly isHoverable: true = true;
    readonly isDraggable: true = true;

    public parent: DIVETranslateGizmo | null = null;

    public axis: 'x' | 'y' | 'z';

    private _color: Color = new Color(0xff00ff);
    private _colorHover: Color;
    private _hovered: boolean;
    private _highlight: boolean;
    public get highlight(): boolean {
        return this._highlight;
    }
    public set highlight(highlight: boolean) {
        this._highlight = highlight;
        this._lineMaterial.color = this._highlight || this._hovered ? this._colorHover : this._color;
    }

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

    constructor(axis: 'x' | 'y' | 'z', length: number, direction: Vector3, color: ColorRepresentation) {
        super();

        this.name = "DIVEAxisHandle";
        this.axis = axis;

        this._color.set(color);
        this._colorHover = this._color.clone().multiplyScalar(2);

        this._highlight = false;
        this._hovered = false;

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
        lineMesh.rotateX(Math.PI / 2);
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

    public onPointerEnter(): void {
        this._hovered = true;
        if (this.parent) {
            this.parent.onHandleHover(this, true);
        }
    }

    public onPointerLeave(): void {
        this._hovered = false;
        if (this.parent) {
            this.parent.onHandleHover(this, false);
        }
    }

    public onDragStart(): void {
        if (this.parent) {
            this.parent.onHandleDragStart(this);
        }
    }

    public onDrag(e: DraggableEvent): void {
        if (this.parent) {
            this.parent.onHandleDrag(this, e);
        }
    }

    public onDragEnd(): void {
        if (this.parent) {
            this.parent.onHandleDragEnd(this);
        }
    }
}