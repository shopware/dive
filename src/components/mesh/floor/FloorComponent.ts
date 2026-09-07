import {
    Color,
    Mesh,
    MeshStandardMaterial,
    PlaneGeometry,
    FrontSide,
    type ColorRepresentation,
} from 'three/webgpu';
import { FLOOR_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';
import { MeshComponent } from '../MeshComponent.ts';

const FLOOR_EXTENT = 1000;

/**
 * The ground plane.
 *
 * Extends {@link MeshComponent} to reuse the mesh and material handling, but
 * sits on {@link FLOOR_LAYER_MASK} rather than the product layer. That single
 * difference is what keeps a 1000x1000 plane out of every bounding box, out of
 * scene exports and out of picking, while still rendering and receiving shadows.
 *
 * @module
 */
export class FloorComponent extends MeshComponent {
    readonly isFloorComponent: true = true;

    constructor() {
        super();

        this.name = 'FloorComponent';

        const geometry = new PlaneGeometry(1, 1);
        geometry.scale(FLOOR_EXTENT, FLOOR_EXTENT, 1);
        geometry.rotateX(-Math.PI / 2);

        this._material = new MeshStandardMaterial({
            color: new Color(0xffffff),
            side: FrontSide,
        });

        this._mesh = new Mesh(geometry, this._material);
        this._mesh.name = 'Floor';
        this._mesh.layers.mask = FLOOR_LAYER_MASK;
        this._mesh.receiveShadow = true;
        this.contribute(this._mesh);
    }

    /** Whether the floor is drawn. */
    public get visible(): boolean {
        return this._mesh!.visible;
    }

    /**
     * On the plane, which is what three reads when it draws. There is nothing
     * else to set: a component carries no visibility of its own.
     *
     * @param visible - Whether the floor is drawn.
     */
    public setVisibility(visible: boolean): void {
        this._mesh!.visible = visible;
    }

    /**
     * @param color - The floor colour.
     */
    public setColor(color: ColorRepresentation): void {
        this._material!.color = new Color(color);
    }
}
