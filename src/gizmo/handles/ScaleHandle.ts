import { BoxGeometry, Color, ColorRepresentation, CylinderGeometry, Mesh, MeshBasicMaterial, Object3D, Vector3 } from "three";
import { UI_LAYER_MASK } from "../../constant/VisibilityLayerMask";
import { DIVEHoverable } from "../../interface/Hoverable";
import { DIVETranslateGizmo } from "../translate/TranslateGizmo";

export class DIVEScaleHandle extends Object3D implements DIVEHoverable {
    readonly isHoverable: true = true;

    public axis: 'x' | 'y' | 'z';

    private _color: Color = new Color(0xff00ff);
    private _colorHover: Color;

    private _lineMaterial: MeshBasicMaterial;

    constructor(axis: 'x' | 'y' | 'z', length: number, direction: Vector3, color: ColorRepresentation, boxSize: number = 0.05) {
        super();

        this.name = "DIVEScaleHandle";
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
        lineMesh.rotateX(Math.PI / 2);
        lineMesh.translateY(length / 2);
        this.add(lineMesh);

        // create box
        const box = new Mesh(
            new BoxGeometry(boxSize, boxSize, boxSize),
            this._lineMaterial,
        );
        box.layers.mask = UI_LAYER_MASK;
        box.renderOrder = Infinity;
        box.rotateX(Math.PI / 2);
        box.translateY(length - boxSize / 2);
        this.add(box);

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
        // colliderMesh.visible = false;
        colliderMesh.layers.mask = UI_LAYER_MASK;
        colliderMesh.renderOrder = Infinity;
        colliderMesh.rotateX(Math.PI / 2);
        colliderMesh.translateY(length / 2);
        this.add(colliderMesh);

        this.lookAt(direction);
    }

    public reset(): void {
        this._lineMaterial.color = this._color;
    }

    public onPointerEnter(): void {
        this.onHover(true);
    };

    public onPointerOver(): void {
        // this.onHover();
    };

    public onPointerLeave(): void {
        this.onHover(false);
    };

    public onHover(value: boolean): void {
        this._lineMaterial.color = value ? this._colorHover : this._color;

        (this.parent as DIVETranslateGizmo).onHoverAxis(this.axis);
    }
}