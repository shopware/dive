import {
    Box3,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    Vector3,
    type Vector3Like,
} from 'three/webgpu';
import { PROXY_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../../engine/component/Component.ts';

/** keeps a flat box invertible, a zero scale breaks the raycast */
const MIN_EXTENT = 1e-6;

const _size = new Vector3();

/**
 * An invisible box that makes its owner clickable.
 *
 * A proxy: the pointer hits the box and picking resolves to the owner, while the
 * box stays out of the live view, bounds and exports. Invisible through its
 * material, not `visible`, because picking skips hidden objects.
 *
 * Sized like a `Box3`, in the owner's space. Nothing resizes it on its own: a
 * caller that changes what it encloses sets it again.
 *
 * @module
 */
export class ColliderComponent extends DIVEComponent {
    readonly isColliderComponent: true = true;

    private _box: Box3 = new Box3(
        new Vector3(-0.5, -0.5, -0.5),
        new Vector3(0.5, 0.5, 0.5),
    );
    private _mesh: Mesh<BoxGeometry, MeshBasicMaterial>;

    constructor() {
        super();

        this.name = 'ColliderComponent';

        this._mesh = new Mesh(
            new BoxGeometry(1, 1, 1),
            new MeshBasicMaterial({ visible: false }),
        );
        this._mesh.layers.mask = PROXY_LAYER_MASK;
        this.contribute(this._mesh);

        this._update();
    }

    /** The box the pointer hits. */
    public get mesh(): Mesh {
        return this._mesh;
    }

    /**
     * Like `Box3.set`. An empty box (`min` above `max`) is not hit at all.
     *
     * @param min - Lower corner, in the owner's space.
     * @param max - Upper corner, in the owner's space.
     */
    public set(min: Vector3Like, max: Vector3Like): this {
        this._box.min.set(min.x, min.y, min.z);
        this._box.max.set(max.x, max.y, max.z);
        this._update();

        return this;
    }

    /**
     * Like `Box3.setFromCenterAndSize`.
     *
     * @param center - Centre, in the owner's space.
     * @param size - Extent along each axis.
     */
    public setFromCenterAndSize(center: Vector3Like, size: Vector3Like): this {
        this._box.setFromCenterAndSize(
            new Vector3(center.x, center.y, center.z),
            new Vector3(size.x, size.y, size.z),
        );
        this._update();

        return this;
    }

    /** Like `Box3.getCenter`. */
    public getCenter(target: Vector3): Vector3 {
        return this._box.getCenter(target);
    }

    /** Like `Box3.getSize`. */
    public getSize(target: Vector3): Vector3 {
        return this._box.getSize(target);
    }

    /** Like `Box3.isEmpty`. */
    public isEmpty(): boolean {
        return this._box.isEmpty();
    }

    public copy(source: this): this {
        super.copy(source);

        this.set(source._box.min, source._box.max);

        return this;
    }

    public dispose(): void {
        this._mesh.geometry.dispose();
        this._mesh.material.dispose();
    }

    /** Places the unit box mesh over the box. */
    private _update(): void {
        const empty = this._box.isEmpty();

        /** hidden rather than scaled to zero, picking skips hidden objects */
        this._mesh.visible = !empty;
        if (empty) return;

        this._box.getCenter(this._mesh.position);
        this._box.getSize(_size);
        this._mesh.scale.set(
            Math.max(_size.x, MIN_EXTENT),
            Math.max(_size.y, MIN_EXTENT),
            Math.max(_size.z, MIN_EXTENT),
        );
    }
}
