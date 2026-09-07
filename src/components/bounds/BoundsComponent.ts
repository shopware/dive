import {
    Box3,
    Box3Helper,
    Mesh,
    MeshBasicMaterial,
    Sphere,
    SphereGeometry,
    Vector3,
    type ColorRepresentation,
    type Object3D,
} from 'three/webgpu';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { computeProductBounds } from '../../helpers/computeProductBounds/computeProductBounds.ts';
import { DIVEComponent } from '../component/Component.ts';

/**
 * Measures a target's extents and can visualise them.
 *
 * Replaces the old `BoundingBox`, which extended `DIVENode` and therefore
 * inherited `isSelectable`/`isMovable`: attached to a node it would appear in
 * `nodes`, be raycast-hittable, and terminate the `findInterface` walk so the box
 * got selected instead of the object it measured. As a component it carries no
 * capability brands and its helpers sit on the helper layer, so they never count
 * towards bounds, exports or picking -- including its own.
 *
 * Configure with {@link setTarget} rather than a constructor argument, so
 * `Object3D.clone()` keeps working.
 *
 * @module
 */
export class BoundsComponent extends DIVEComponent {
    readonly isBoundsComponent: true = true;

    private _box: Box3 = new Box3();
    private _sphere: Sphere = new Sphere();
    private _center: Vector3 = new Vector3();
    private _size: Vector3 = new Vector3();

    private _boxHelper: Box3Helper;
    private _sphereHelper: Mesh;

    constructor() {
        super();

        this.name = 'BoundsComponent';

        this._boxHelper = new Box3Helper(this._box, 0x00ff00);
        this._boxHelper.layers.mask = HELPER_LAYER_MASK;
        this._boxHelper.visible = false;
        this.add(this._boxHelper);

        this._sphereHelper = new Mesh(
            new SphereGeometry(1, 32, 32),
            new MeshBasicMaterial({ color: 0x00ff00, wireframe: true }),
        );
        this._sphereHelper.layers.mask = HELPER_LAYER_MASK;
        this._sphereHelper.visible = false;
        this.add(this._sphereHelper);
    }

    /** The measured bounding box, in world space. */
    public get box(): Box3 {
        return this._box;
    }

    /** The measured bounding sphere, in world space. */
    public get sphere(): Sphere {
        return this._sphere;
    }

    /** The centre of the measured box. */
    public get center(): Vector3 {
        return this._center;
    }

    /** The radius of the measured sphere. */
    public get radius(): number {
        return this._sphere.radius;
    }

    /** Width, height and depth of the measured box. */
    public get size(): Vector3 {
        return this._size;
    }

    /**
     * Measures one or more objects and updates the helpers.
     *
     * Defaults to the owning node, which is the common case.
     *
     * @param target - What to measure. Omit to measure the owner.
     */
    public setTarget(target?: Object3D | Object3D[]): this {
        const targets = target
            ? Array.isArray(target)
                ? target
                : [target]
            : this.isAttached
              ? [this.owner]
              : [];

        this._box.makeEmpty();

        const scratch = new Box3();
        targets.forEach((object) => {
            this._box.union(computeProductBounds(object, scratch));
        });

        this._box.getCenter(this._center);
        this._box.getSize(this._size);
        this._box.getBoundingSphere(this._sphere);

        this._sphereHelper.position.copy(this._center);
        this._sphereHelper.scale.setScalar(this._sphere.radius);

        // the helper reads _box by reference, but its own bounds need refreshing
        this._boxHelper.updateMatrixWorld(true);

        return this;
    }

    /**
     * @param visible - Whether the box wireframe is drawn.
     */
    public setBoxHelperVisible(visible: boolean): void {
        this._boxHelper.visible = visible;
    }

    /**
     * @param visible - Whether the sphere wireframe is drawn.
     */
    public setSphereHelperVisible(visible: boolean): void {
        this._sphereHelper.visible = visible;
    }

    /**
     * @param color - The helper colour.
     */
    public setHelperColor(color: ColorRepresentation): void {
        (this._boxHelper.material as MeshBasicMaterial).color.set(color);
        (this._sphereHelper.material as MeshBasicMaterial).color.set(color);
    }

    public dispose(): void {
        this._boxHelper.dispose();
        this._sphereHelper.geometry.dispose();
        (this._sphereHelper.material as MeshBasicMaterial).dispose();
    }
}
