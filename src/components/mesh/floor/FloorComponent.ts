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

    /**
     * Both, and neither is redundant while this is still an `Object3D`.
     *
     * The plane is what three reads when it draws, and it is a child of the node
     * now -- setting `visible` on the component stopped reaching it. The
     * component's own flag stays because callers read it back (`EngineGateway`
     * reports the scene's `floorEnabled` from it), and it cannot become a getter
     * over the plane while `Object3D` declares it as a field. Once the component
     * is no longer an `Object3D`, this collapses into one accessor.
     *
     * @param visible - Whether the floor is drawn.
     */
    public setVisibility(visible: boolean): void {
        this._mesh!.visible = visible;
        this.visible = visible;
    }

    /**
     * @param color - The floor colour.
     */
    public setColor(color: ColorRepresentation): void {
        this._material!.color = new Color(color);
    }
}
