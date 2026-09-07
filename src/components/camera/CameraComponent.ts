import {
    type Camera,
    Matrix4,
    Quaternion,
    Vector3,
    type Vector3Like,
} from 'three/webgpu';
import {
    DEFAULT_LAYER_MASK,
    FLOOR_LAYER_MASK,
    HELPER_LAYER_MASK,
    PRODUCT_LAYER_MASK,
    PROXY_LAYER_MASK,
    UI_LAYER_MASK,
} from '../../constants/VisibilityLayerMask.ts';
import { DIVEComponent } from '../../engine/component/Component.ts';

/**
 * Base class for every camera a node can carry.
 *
 * ### Why a camera is owned rather than extended
 *
 * A component is an `Object3D`, and so is every three camera -- nothing can be
 * both. So this holds one and adds it as a child, exactly as `DIVELightComponent`
 * holds a light and `MeshComponent` holds a mesh. Whoever renders or orbits asks
 * for {@link camera}.
 *
 * Anything that places or turns the camera goes through `owner`, the node it is
 * attached to: a component carries no transform of its own -- its local matrix is
 * identity and `matrixAutoUpdate` is off -- so writing `position` on the component
 * would silently do nothing.
 *
 * The consequence worth knowing: the three camera sits at its owner's transform,
 * so moving the node moves the view. For a camera entity that is the point. For a
 * camera an `OrbitController` drives, the node has to stay at the origin -- the
 * controller writes world-space values onto the camera, and a node with a
 * transform of its own would be applied on top of them.
 *
 * Takes a constructor argument, unlike concrete components: it is abstract and so
 * never the target of `new this.constructor()` in `clone()`.
 *
 * @module
 */
// scratch for aimAt, so turning the camera allocates nothing per frame
const _matrix = new Matrix4();
const _quaternion = new Quaternion();
const _position = new Vector3();
const _target = new Vector3();

export abstract class DIVECameraComponent extends DIVEComponent {
    readonly isDIVECameraComponent: true = true;

    /**
     * Everything a camera can show.
     *
     * Deliberately every layer, including `DEFAULT_LAYER_MASK` — three puts an
     * object on layer 0 unless someone says otherwise, and the transform gizmo is
     * one of them, so an editor that left it out would hide whatever never picked
     * a layer.
     *
     * `COORDINATE_LAYER_MASK` is the one left out. The orientation display adds its
     * axes to the same scene and draws them with its own camera in the corner;
     * having that bit here would draw them a second time in the middle of the
     * viewport.
     */
    public static readonly EDITOR_VIEW_LAYER_MASK =
        DEFAULT_LAYER_MASK |
        UI_LAYER_MASK |
        HELPER_LAYER_MASK |
        PRODUCT_LAYER_MASK |
        PROXY_LAYER_MASK |
        FLOOR_LAYER_MASK;

    /**
     * What an end user sees: the content and the ground it stands on.
     *
     * A short list on purpose, and one that has to be opted into. Everything that
     * exists to help build a scene stays out — the gizmo, the helper lines, the
     * proxies for entities without geometry — and so does `DEFAULT_LAYER_MASK`,
     * because it is the catch-all: anything that never chose a layer is a thing
     * nobody decided to show an end user.
     */
    public static readonly LIVE_VIEW_LAYER_MASK =
        PRODUCT_LAYER_MASK | FLOOR_LAYER_MASK;

    /** Told whenever {@link setCameraLayer} changed what is visible. */
    public onSetCameraLayer: (mask: number) => void = () => {};

    protected _camera: Camera;

    /**
     * @param camera - The three camera this component owns.
     */
    constructor(camera: Camera) {
        super();

        this._camera = camera;
        this._camera.layers.mask = DIVECameraComponent.EDITOR_VIEW_LAYER_MASK;
        this.contribute(this._camera);
    }

    /** The three camera this component owns. */
    public get camera(): Camera {
        return this._camera;
    }

    /**
     * Switches between what an editor shows and what an end user sees.
     *
     * @param layer - Which of the two.
     */
    public setCameraLayer(layer: 'LIVE' | 'EDITOR'): void {
        this._camera.layers.mask =
            layer === 'LIVE'
                ? DIVECameraComponent.LIVE_VIEW_LAYER_MASK
                : DIVECameraComponent.EDITOR_VIEW_LAYER_MASK;

        this.onSetCameraLayer(this._camera.layers.mask);
    }

    /**
     * Turns the node this camera sits on to face a point.
     *
     * Not `owner.lookAt`: three's `Object3D.lookAt` swaps eye and target unless the
     * object reports `isCamera`, so a plain node comes out oriented 180 degrees the
     * other way -- its `+Z` at the target instead of its `-Z`. What follows is the
     * camera branch, applied to the node.
     *
     * @param target - The point to face, in world space.
     */
    public aimAt(target: Vector3Like): void {
        const node = this.owner;

        node.updateWorldMatrix(true, false);
        _position.setFromMatrixPosition(node.matrixWorld);

        // the camera's up, not the node's, it is the camera whose roll this sets
        _matrix.lookAt(_position, _target.copy(target), this._camera.up);
        node.quaternion.setFromRotationMatrix(_matrix);

        // in world space, a rotated parent would otherwise tilt the result
        if (node.parent) {
            _matrix.extractRotation(node.parent.matrixWorld);
            _quaternion.setFromRotationMatrix(_matrix);
            node.quaternion.premultiply(_quaternion.invert());
        }
    }

    /**
     * Fits the camera to a new viewport.
     *
     * Abstract because what a viewport means differs: a perspective camera changes
     * its aspect, an orthographic one its extents.
     *
     * @param width - Viewport width in pixels.
     * @param height - Viewport height in pixels.
     */
    public abstract onResize(width: number, height: number): void;
}
