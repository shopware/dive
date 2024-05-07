import { Color, ColorRepresentation, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { PRODUCT_LAYER_MASK } from "../../constant/VisibilityLayerMask.ts";

export default class DIVEFloor extends Mesh {
    public isFloor: true = true;

    constructor() {
        super(new PlaneGeometry(10000, 10000), new MeshStandardMaterial({ color: new Color(150 / 255, 150 / 255, 150 / 255) }));

        this.name = 'Floor';

        this.layers.mask = PRODUCT_LAYER_MASK;

        this.receiveShadow = true;

        this.rotateX(-Math.PI / 2);
    }

    public SetVisibility(visible: boolean): void {
        this.visible = visible;
    }

    public SetColor(color: ColorRepresentation): void {
        (this.material as MeshStandardMaterial).color = new Color(color);
    }
}
