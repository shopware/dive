import {
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
} from 'three/webgpu';
import { PRODUCT_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { ImageComponentBase } from './ImageComponentBase.ts';

/**
 * An image on a flat plane: fixed content that keeps its orientation.
 *
 * The plane lies in the owner's XY plane, centred on its origin and facing +Z;
 * it is double-sided, so it shows from behind as well. Its size is in metres.
 * A white image takes on the colour as is.
 *
 * It sits on {@link PRODUCT_LAYER_MASK}, so it is drawn in the live view,
 * counted in bounds and exported like any other content. It adds no collider:
 * a node that should be clickable through it needs a `MeshColliderComponent`.
 *
 * The image is taken by URL. Every image plane and sprite showing one URL
 * shares one loaded texture; {@link dispose} gives it back.
 *
 * @module
 */
export class ImageComponent extends ImageComponentBase<
    Mesh<PlaneGeometry, MeshBasicMaterial>
> {
    readonly isImageComponent: true = true;

    constructor() {
        // unlit, so the image shows as it is whatever the lighting
        const mesh = new Mesh(
            new PlaneGeometry(1, 1),
            new MeshBasicMaterial({ side: DoubleSide, transparent: true }),
        );
        mesh.name = 'Image';
        mesh.layers.mask = PRODUCT_LAYER_MASK;

        super(mesh);

        this.name = 'ImageComponent';
    }

    /** The plane the image is drawn on. */
    public get mesh(): Mesh<PlaneGeometry, MeshBasicMaterial> {
        return this._object;
    }

    /** Frees the plane and gives back its image. */
    public dispose(): void {
        super.dispose();
        this._object.geometry.dispose();
    }

    protected applySize(width: number, height: number): void {
        this._object.scale.set(width, height, 1);
    }
}
