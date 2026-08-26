import {
    BoxGeometry,
    EdgesGeometry,
    LineBasicMaterial,
    LineSegments,
    Matrix4,
    Mesh,
    MeshBasicMaterial,
    Quaternion,
    SphereGeometry,
    Vector3,
    type Box3,
    type ColorRepresentation,
    type Sphere,
} from 'three/webgpu';
import { HELPER_LAYER_MASK } from '../../constants/VisibilityLayerMask.ts';
import { BoundingBox } from '../../engine/boundingbox/BoundingBox.ts';
import { DIVEComponent } from '../component/Component.ts';
import { type DIVENode } from '../node/Node.ts';

/** scratch for placing the helpers, so a measurement allocates nothing */
const _inverse = new Matrix4();
const _center = new Vector3();
const _scale = new Vector3();
const _noRotation = new Quaternion();

/** the unit wireframe the box helper is scaled from */
const unitBoxEdges = (): EdgesGeometry => {
    const box = new BoxGeometry(1, 1, 1);
    const edges = new EdgesGeometry(box);
    box.dispose();

    return edges;
};

/**
 * Keeps a {@link BoundingBox} around the node it is attached to, and can draw it.
 *
 * The measurement itself is `BoundingBox`, which knows nothing about nodes. What
 * this adds is the node: it always encloses its owner, and it watches that owner
 * so the numbers are never behind the scene.
 *
 * Watched, and therefore free:
 *
 * - a child node or a contributed object arriving or leaving (`childadded` /
 *   `childremoved`), which is how a finished asset load reaches this -- the
 *   loader contributes the file's roots to the node
 * - a component arriving or leaving (`componentadded` / `componentremoved`)
 * - the node moving, turning or scaling (`object-transform`), whatever moved it
 *
 * Not watched, because nothing announces it: geometry swapped in place on a mesh
 * that is already there. Call {@link refresh} after that.
 *
 * An event only marks the box stale; the measurement happens when someone reads
 * it. That matters because a glTF with fifty root nodes arrives as fifty
 * `childadded` events, and re-measuring per event would traverse the subtree
 * fifty times for one load.
 *
 * @module
 */
export class BoundingBoxComponent extends DIVEComponent {
    readonly isBoundingBoxComponent: true = true;

    private _boundingBox: BoundingBox = new BoundingBox();
    private _oriented: boolean = false;
    private _stale: boolean = true;

    private _boxHelper: LineSegments;
    private _sphereHelper: Mesh;

    private _invalidate = (): void => {
        this._stale = true;
    };

    constructor() {
        super();

        this.name = 'BoundingBoxComponent';

        this._boxHelper = new LineSegments(
            unitBoxEdges(),
            new LineBasicMaterial({ color: 0x00ff00 }),
        );
        this._sphereHelper = new Mesh(
            new SphereGeometry(0.5, 32, 32),
            new MeshBasicMaterial({ color: 0x00ff00, wireframe: true }),
        );

        [this._boxHelper, this._sphereHelper].forEach((helper) => {
            helper.layers.mask = HELPER_LAYER_MASK;
            helper.visible = false;

            // both helpers carry a matrix this component writes, rather than a
            // position and a scale three composes: the box has to follow the
            // frame it was measured in, and neither may pick up the owner's
            // transform, which a contributed object would otherwise inherit
            helper.matrixAutoUpdate = false;
        });

        this.contribute(this._boxHelper, this._sphereHelper);

        // only while something is drawn: a visible helper has to follow a drag
        // frame by frame, while numbers nobody reads cost nothing to leave stale
        this.setTickEnabled(false);
    }

    /** The measurement, current as of this read. */
    public get boundingBox(): BoundingBox {
        this._measure();

        return this._boundingBox;
    }

    /** The box itself, in the frame it was measured in. */
    public get box(): Box3 {
        return this.boundingBox.box;
    }

    /** Width, height and depth, in the frame the box was measured in. */
    public get size(): Vector3 {
        return this.boundingBox.size;
    }

    /** The centre of the box, in world space. */
    public get center(): Vector3 {
        return this.boundingBox.center;
    }

    /** The sphere around the box, in world space. */
    public get sphere(): Sphere {
        return this.boundingBox.sphere;
    }

    /** The radius of that sphere. */
    public get radius(): number {
        return this.boundingBox.radius;
    }

    /** Whether the box is aligned to its owner rather than to the world axes. */
    public get oriented(): boolean {
        return this._oriented;
    }

    /**
     * The wireframe box, for anyone that wants to style or inspect it.
     *
     * Measures first, like every other read: a helper handed out unplaced would
     * be a matrix from before whatever last changed the node.
     */
    public get boxHelper(): LineSegments {
        this._measure();

        return this._boxHelper;
    }

    /** The wireframe sphere, placed the same way. */
    public get sphereHelper(): Mesh {
        this._measure();

        return this._sphereHelper;
    }

    /**
     * Chooses between a world-aligned and an owner-aligned box.
     *
     * @param oriented - Whether to align the box to the owner.
     */
    public setOriented(oriented: boolean): this {
        if (this._oriented === oriented) return this;

        this._oriented = oriented;
        this._stale = true;

        return this;
    }

    /**
     * Marks the box stale, so the next read measures again.
     *
     * Only needed for changes nothing announces -- a geometry swapped in place on
     * a mesh that is already in the node. Everything that goes through the node's
     * own API arrives here as an event.
     */
    public refresh(): this {
        this._stale = true;

        return this;
    }

    /**
     * @param visible - Whether the box wireframe is drawn.
     */
    public setBoxHelperVisible(visible: boolean): void {
        this._boxHelper.visible = visible;
        this._refreshTick();
    }

    /**
     * @param visible - Whether the sphere wireframe is drawn.
     */
    public setSphereHelperVisible(visible: boolean): void {
        this._sphereHelper.visible = visible;
        this._refreshTick();
    }

    /**
     * @param color - The helper colour.
     */
    public setHelperColor(color: ColorRepresentation): void {
        (this._boxHelper.material as LineBasicMaterial).color.set(color);
        (this._sphereHelper.material as MeshBasicMaterial).color.set(color);
    }

    /** Keeps a drawn box glued to the node while anything moves it. */
    public tick(): void {
        this._measure();
    }

    protected onAttach(owner: DIVENode): void {
        owner.addEventListener('childadded', this._invalidate);
        owner.addEventListener('childremoved', this._invalidate);
        owner.addEventListener('componentadded', this._invalidate);
        owner.addEventListener('componentremoved', this._invalidate);
        owner.addEventListener('object-transform', this._invalidate);

        this._stale = true;
    }

    protected onDetach(previousOwner: DIVENode): void {
        previousOwner.removeEventListener('childadded', this._invalidate);
        previousOwner.removeEventListener('childremoved', this._invalidate);
        previousOwner.removeEventListener('componentadded', this._invalidate);
        previousOwner.removeEventListener('componentremoved', this._invalidate);
        previousOwner.removeEventListener('object-transform', this._invalidate);

        this._stale = true;
    }

    /** Re-encloses the owner if anything has happened since the last read. */
    private _measure(): void {
        if (!this._stale) return;
        this._stale = false;

        if (!this.isAttached) {
            this._boundingBox.clear();
            this._place();

            return;
        }

        const owner = this.owner;
        if (this._oriented) {
            this._boundingBox.encloseOriented(owner, owner);
        } else {
            this._boundingBox.enclose(owner);
        }

        this._place();
    }

    /** Puts the helpers where the measurement says they belong. */
    private _place(): void {
        const { box, frame, center, radius } = this._boundingBox;

        // the owner's transform, cancelled: a contributed object hangs in the
        // owner's children and would otherwise be transformed a second time
        _inverse.identity();
        if (this.isAttached) {
            _inverse.copy(this.owner.matrixWorld).invert();
        }

        box.getCenter(_center);
        this._boxHelper.matrix
            .compose(_center, _noRotation, this._boundingBox.size)
            .premultiply(frame)
            .premultiply(_inverse);

        this._sphereHelper.matrix
            .compose(
                center,
                _noRotation,
                _scale.setScalar(Math.max(0, radius) * 2),
            )
            .premultiply(_inverse);
    }

    /** Ticks only while there is something drawn to keep up to date. */
    private _refreshTick(): void {
        this.setTickEnabled(
            this._boxHelper.visible || this._sphereHelper.visible,
        );
    }

    public copy(source: this): this {
        super.copy(source);

        this._oriented = source.oriented;
        this._stale = true;

        return this;
    }

    public dispose(): void {
        this._boxHelper.geometry.dispose();
        (this._boxHelper.material as LineBasicMaterial).dispose();
        this._sphereHelper.geometry.dispose();
        (this._sphereHelper.material as MeshBasicMaterial).dispose();
    }
}
