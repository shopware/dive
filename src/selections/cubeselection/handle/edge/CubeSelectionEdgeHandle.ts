import { Line2, LineGeometry, LineMaterial } from 'three/examples/jsm/Addons';
import { HELPER_LAYER_MASK } from '../../../../constant/VisibilityLayerMask';
import { Color } from 'three';

export class DIVECubeSelectionEdgeHandle extends Line2 {
    readonly isCubeSelection = true;
    readonly isCubeSelectionEdge = true;

    private _color: number;
    private _hoverColor: number = 0xff0000;

    constructor(material: LineMaterial) {
        super();

        this.layers.mask = HELPER_LAYER_MASK;

        this.geometry = new LineGeometry();
        this.material = material.clone();
        this._color = this.material.color.getHex();

        const hsl = new Color(this._color).getHSL({ h: 0, s: 0, l: 0 });
        this._hoverColor = new Color(this._color).setHSL(hsl.h, hsl.s, hsl.l * 1.3).getHex();
    }

    public setPoints(points: [number, number, number, number, number, number]): this {
        this.geometry.setPositions(points);
        this.geometry.computeBoundingBox();
        return this;
    }

    public onPointerEnter(): void {
        this.material.color.setHex(this._hoverColor);
    }

    public onPointerLeave(): void {
        this.material.color.setHex(this._color);
    }
}