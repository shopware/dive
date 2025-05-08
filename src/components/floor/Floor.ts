import {
    Color,
    ColorRepresentation,
    Mesh,
    MeshStandardMaterial,
    PlaneGeometry,
} from 'three';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';

/**
 * A basic floor geometry.
 *
 * Can change the color and visibility of the floor.
 *
 * @module
 */

export class DIVEFloor extends Mesh {
    readonly isDIVEFloor: true = true;

    constructor() {
        super(
            new PlaneGeometry(10000, 10000),
            new MeshStandardMaterial({
                color: new Color(150 / 255, 150 / 255, 150 / 255),
            }),
        );

        this.name = 'Floor';

        this.layers.mask = PRODUCT_LAYER_MASK;

        this.receiveShadow = true;

        this.rotateX(-Math.PI / 2);
    }

    public setVisibility(visible: boolean): void {
        this.visible = visible;
    }

    public setColor(color: ColorRepresentation): void {
        (this.material as MeshStandardMaterial).color = new Color(color);
    }
}
