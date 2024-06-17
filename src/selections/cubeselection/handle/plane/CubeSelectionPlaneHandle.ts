import { Color, Mesh, MeshBasicMaterial, PlaneGeometry, Vector3, HSL } from 'three';
import { HELPER_LAYER_MASK } from '../../../../constant/VisibilityLayerMask';

export class DIVECubeSelectionPlaneHandle extends Mesh {
    readonly isCubeSelection = true;
    readonly isCubeSelectionPlane = true;

    private _color: number;
    private _hoverColor: number = 0xff0000;

    constructor(material: MeshBasicMaterial) {
        super();

        this.layers.mask = HELPER_LAYER_MASK;
        this.geometry = new PlaneGeometry();

        this.material = material.clone();
        this._color = material.color.getHex();

        const hsl: HSL = {
            h: 0,
            s: 0,
            l: 0,
        };
        new Color(this._color).getHSL(hsl);
        this._hoverColor = new Color(this._color).setHSL(hsl.h, hsl.s, hsl.l * 1.2).getHex();


    }

    public setPoints(points: [Vector3, Vector3, Vector3, Vector3]): this {
        this.geometry.setFromPoints(points);
        this.geometry.computeBoundingBox();
        return this;
    }

    public onPointerEnter(): void {
        (this.material as MeshBasicMaterial).color.setHex(this._hoverColor);
    }

    public onPointerLeave(): void {
        (this.material as MeshBasicMaterial).color.setHex(this._color);
    }
}