import {
    Box3,
    Matrix4,
    Quaternion,
    Sphere,
    Vector3,
    type Object3D,
} from 'three/webgpu';
import { computeProductBounds } from '../../helpers/computeProductBounds/computeProductBounds.ts';

/** scratch for the matrix work, so enclosing allocates nothing per call */
const _inverse = new Matrix4();
const _position = new Vector3();
const _quaternion = new Quaternion();
const _scale = new Vector3();
const _corner = new Vector3();

/**
 * The box that encloses a set of objects.
 *
 * A measurement and nothing else: no place in the scene graph, no owner, no
 * visualisation. {@link BoundingBoxComponent} is what gives a node one of these
 * and keeps it current; anything that just needs the numbers builds one here.
 *
 * Two shapes:
 *
 * - {@link enclose} is axis-aligned in world space. What camera framing wants,
 *   and what `size` means for a whole scene.
 * - {@link encloseOriented} is axis-aligned in a frame that carries another
 *   object's position and rotation but not its scale. The box hugs a turned
 *   object instead of enclosing its world projection, and `size` becomes the
 *   object's own width, height and depth in world units. A 2 x 1 x 1 object
 *   turned 45 degrees measures 2 x 1 x 1 oriented and 2.121 x 1 x 2.121
 *   world-aligned.
 *
 * `center` and `sphere` are in world space either way, so code that frames a
 * camera never has to ask which shape it was handed. Only `box` and `size` live
 * in the measured frame, and {@link frame} is how they get to the world.
 *
 * Reused rather than rebuilt: enclosing again overwrites what is there, so a
 * caller that measures repeatedly allocates once.
 *
 * Only geometry that {@link computeProductBounds} counts as real is measured, so
 * helpers, the ground plane and gizmo handles never widen a box.
 *
 * @module
 */
export class BoundingBox {
    readonly isBoundingBox: true = true;

    private _box: Box3 = new Box3();
    private _sphere: Sphere = new Sphere();
    private _center: Vector3 = new Vector3();
    private _size: Vector3 = new Vector3();
    private _frame: Matrix4 = new Matrix4();
    private _oriented: boolean = false;

    /** The box itself, in the frame it was measured in. */
    public get box(): Box3 {
        return this._box;
    }

    /** Width, height and depth, in the frame the box was measured in. */
    public get size(): Vector3 {
        return this._size;
    }

    /** The centre of the box, in world space. */
    public get center(): Vector3 {
        return this._center;
    }

    /** The sphere around the box, in world space. */
    public get sphere(): Sphere {
        return this._sphere;
    }

    /** The radius of that sphere. */
    public get radius(): number {
        return this._sphere.radius;
    }

    /** How the measured frame relates to the world. Identity when world-aligned. */
    public get frame(): Matrix4 {
        return this._frame;
    }

    /** Whether anything was found to measure. */
    public get isEmpty(): boolean {
        return this._box.isEmpty();
    }

    /**
     * Measures a world-aligned box around everything given.
     *
     * @param objects - What to enclose, with everything below it.
     */
    public enclose(objects: Object3D | readonly Object3D[]): this {
        this._oriented = false;
        this._frame.identity();

        return this._measure(objects);
    }

    /**
     * Measures a box aligned to another object's axes.
     *
     * @param objects - What to enclose, with everything below it.
     * @param frame - Whose axes to align to. Its position and rotation are taken,
     * its scale is not: the scale belongs in the extents, or `size` would report
     * the geometry's own numbers rather than the size in the scene.
     */
    public encloseOriented(
        objects: Object3D | readonly Object3D[],
        frame: Object3D,
    ): this {
        this._oriented = true;
        frame.updateWorldMatrix(true, false);
        frame.matrixWorld.decompose(_position, _quaternion, _scale);
        this._frame.compose(_position, _quaternion, _scale.setScalar(1));

        return this._measure(objects);
    }

    /** Empties the box, for when there is nothing to measure. */
    public clear(): this {
        this._oriented = false;
        this._frame.identity();
        this._box.makeEmpty();

        return this._derive();
    }

    private _measure(objects: Object3D | readonly Object3D[]): this {
        const list = Array.isArray(objects) ? objects : [objects as Object3D];

        // the frame's inverse, because a box is axis-aligned in whichever frame
        // it was measured in -- that is the whole mechanism behind an oriented one
        const intoFrame = this._oriented
            ? _inverse.copy(this._frame).invert()
            : undefined;

        this._box.makeEmpty();
        const scratch = new Box3();
        list.forEach((object) => {
            this._box.union(computeProductBounds(object, scratch, intoFrame));
        });

        return this._derive();
    }

    /** Turns the measured box into the world-space figures. */
    private _derive(): this {
        this._box.getSize(this._size);
        this._box.getCenter(_position);
        this._center.copy(_position).applyMatrix4(this._frame);

        if (this._box.isEmpty()) {
            this._sphere.makeEmpty();

            return this;
        }

        // from the box's world corners, so the radius stays right for any frame
        // rather than only for a rigid one
        // the frame as built here carries position and rotation, which preserves
        // distances, so this currently equals the box's own half diagonal
        this._sphere.center.copy(this._center);
        this._sphere.radius = this._worldRadius();

        return this;
    }

    /** The distance from the world centre to the furthest corner. */
    private _worldRadius(): number {
        let radius = 0;

        for (let i = 0; i < 8; i++) {
            _corner.set(
                i & 1 ? this._box.max.x : this._box.min.x,
                i & 2 ? this._box.max.y : this._box.min.y,
                i & 4 ? this._box.max.z : this._box.min.z,
            );
            radius = Math.max(
                radius,
                _corner.applyMatrix4(this._frame).distanceTo(this._center),
            );
        }

        return radius;
    }
}
