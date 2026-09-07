import {
    Color,
    ColorRepresentation,
    FrontSide,
    Mesh,
    MeshStandardMaterial,
    PlaneGeometry,
} from 'three/webgpu';
import { FLOOR_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';

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
        const geo = new PlaneGeometry(1, 1);
        geo.scale(1000, 1000, 1);
        geo.rotateX(-Math.PI / 2);

        const material = new MeshStandardMaterial({
            color: new Color(0xffffff),
            side: FrontSide,
        });

        super(geo, material);

        this.name = 'Floor';

        this.layers.mask = FLOOR_LAYER_MASK;

        this.receiveShadow = true;
    }

    public setVisibility(visible: boolean): void {
        this.visible = visible;
    }

    public setColor(color: ColorRepresentation): void {
        (this.material as MeshStandardMaterial).color = new Color(color);
    }
}
