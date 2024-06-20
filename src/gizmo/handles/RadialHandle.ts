import { Color, ColorRepresentation, Mesh, MeshBasicMaterial, Object3D, TorusGeometry, Vector3 } from "three";
import { UI_LAYER_MASK } from "../../constant/VisibilityLayerMask";
import { DIVEHoverable } from "../../interface/Hoverable";
import { DIVETranslateGizmo } from "../translate/TranslateGizmo";

export class DIVERadialHandle extends Object3D implements DIVEHoverable {
    readonly isHoverable: true = true;

    public axis: 'x' | 'y' | 'z';

    private _color: Color = new Color(0xff00ff);
    private _colorHover: Color;

    private _lineMaterial: MeshBasicMaterial;

    constructor(axis: 'x' | 'y' | 'z', arc: number, direction: Vector3, color: ColorRepresentation) {
        super();

        this.name = "DIVERadialHandle";
        this.axis = axis;

        this._color.set(color);
        this._colorHover = this._color.clone().multiplyScalar(2);

        // create line
        const lineGeo = new TorusGeometry(1, 0.01, 13, 48, arc);
        this._lineMaterial = new MeshBasicMaterial({
            color: color,
            depthTest: false,
            depthWrite: false,
        });
        const lineMesh = new Mesh(lineGeo, this._lineMaterial);
        lineMesh.layers.mask = UI_LAYER_MASK;
        lineMesh.renderOrder = Infinity;
        // lineMesh.rotateX(Math.PI / 2);
        this.add(lineMesh);

        // create collider
        const collider = new TorusGeometry(1, 0.1, 3, 48, arc);
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

        this.add(colliderMesh);

        this.lookAt(direction);
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