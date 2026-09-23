import {
    Color,
    DoubleSide,
    Matrix4,
    Mesh,
    MeshBasicNodeMaterial,
    NoBlending,
    NodeMaterial,
    OrthographicCamera,
    PlaneGeometry,
    QuadMesh,
    Quaternion,
    RenderTarget,
    Vector2,
    Vector3,
    type ColorRepresentation,
    type Scene,
    type UniformNode,
    type WebGPURenderer,
} from 'three/webgpu';
import { float, positionView, texture, uniform, vec4 } from 'three/tsl';
import { BlurNode, type BlurNodeUniforms } from '@shopware-ag/dive/shader';
import {
    PRODUCT_LAYER_MASK,
    SHADOW_LAYER_MASK,
} from '../../constants/VisibilityLayerMask.ts';
import { BoundingBox } from '../../engine/boundingbox/BoundingBox.ts';
import { DIVEComponent } from '../../engine/component/Component.ts';
import { type DIVENode } from '../../engine/node/Node.ts';

/** scratch for placing the plane, so a bake allocates nothing */
const _inverse = new Matrix4();
const _center = new Vector3();
const _position = new Vector3();
const _scale = new Vector3();
const _noRotation = new Quaternion();
const _clearColor = new Color();

/** Edge length of the shadow texture, in pixels. */
const DEFAULT_RESOLUTION = 512;

/** How far the shadow spreads past what casts it, in meters. */
const DEFAULT_SOFTNESS = 0.1;

/** How dark the shadow gets where something touches the ground, 0 to 1. */
const DEFAULT_DARKNESS = 1;

/**
 * The radius of the second blur pass, relative to the first.
 *
 * Two passes rather than one wide one: a nine-tap kernel stretched far enough
 * to soften a whole shadow shows its taps as rings. A second, tighter pass
 * fills in between them, which is cheaper than the taps it would otherwise take.
 */
const BLUR_FALLOFF = 0.4;

/**
 * How much room the plane leaves around the bounds, as a multiple of softness.
 *
 * The blur reaches one radius past the silhouette, and a shadow cut off at the
 * plane edge reads as a hard line -- the one thing this component exists to
 * avoid. Two radii leave the falloff somewhere to finish.
 */
const PADDING_FACTOR = 2;

/** A flat object still needs a frustum with depth to be rendered into. */
const MIN_HEIGHT = 1e-4;

/**
 * A soft contact shadow under the node it is attached to, baked once.
 *
 * What it draws is not a shadow map and does not come from any light: a camera
 * under the node looks up and records how close the geometry above it comes to
 * the ground, and that gets blurred and put on a plane. So it costs one
 * transparent quad per frame however complicated the model is, the softness is a
 * number rather than a consequence of a light's size, and it does not flicker or
 * crawl the way a shadow map does at grazing angles.
 *
 * The trade is that it is baked. It holds for a model that stands still --
 * which is what it is for -- and anything that moves, turns or reshapes the node
 * needs another bake. The same events {@link BoundingBoxComponent} watches mark
 * it stale, and {@link tick} re-bakes it by itself; {@link setAutoBake} turns
 * that off for a caller that would rather decide, such as an editor dragging a
 * gizmo.
 *
 * The bake needs a renderer and a scene, which a component has no way to ask
 * for. Both arrive through `onBeforeRender` on the contributed plane -- the
 * sanctioned route, and the same one {@link GridComponent} uses for its camera.
 * The first frame therefore draws nothing, and the shadow appears in the second.
 * {@link bake} is there for a caller that has a renderer and does not want to
 * wait for that.
 *
 * The plane sits on {@link SHADOW_LAYER_MASK}, which keeps it out of bounding
 * boxes, exports and picking -- and, since the bake camera renders
 * {@link PRODUCT_LAYER_MASK}, out of its own shadow. Everything else on the
 * product layer within the frustum is captured, so a model standing next to
 * another one is shaded by it too.
 *
 * @module
 */
export class SoftShadowComponent extends DIVEComponent {
    readonly isSoftShadowComponent: true = true;

    private _mesh: Mesh;
    private _material: MeshBasicNodeMaterial;

    /** Where the bake ends up, and what the plane samples. Never swapped. */
    private _target: RenderTarget;

    /** The other half of the blur ping-pong. */
    private _scratch: RenderTarget;

    private _quad: QuadMesh;
    private _blurToScratch: NodeMaterial;
    private _blurToTarget: NodeMaterial;
    private _horizontal: BlurNodeUniforms;
    private _vertical: BlurNodeUniforms;

    private _camera: OrthographicCamera;
    private _depthMaterial: MeshBasicNodeMaterial;

    private _opacity: UniformNode<'float', number>;
    private _darkness: UniformNode<'float', number>;

    /** How high the bake frustum reaches, so the shader can normalise depth. */
    private _reach: UniformNode<'float', number>;

    private _bounds: BoundingBox = new BoundingBox();
    private _stale: boolean = true;
    private _needsBake: boolean = true;

    private _resolution: number = DEFAULT_RESOLUTION;
    private _softness: number = DEFAULT_SOFTNESS;
    private _autoBake: boolean = true;

    /** World-space extent of the plane, which is what a blur radius is in UV of. */
    private _width: number = 1;
    private _depth: number = 1;

    private _renderer: WebGPURenderer | null = null;
    private _scene: Scene | null = null;

    private _invalidate = (): void => {
        this._stale = true;
        this._needsBake = true;
        this.setTickEnabled(true);
    };

    constructor() {
        super();

        this.name = 'SoftShadowComponent';

        this._opacity = uniform(1);
        this._darkness = uniform(DEFAULT_DARKNESS);
        this._reach = uniform(1);

        this._target = new RenderTarget(DEFAULT_RESOLUTION, DEFAULT_RESOLUTION);
        this._scratch = new RenderTarget(
            DEFAULT_RESOLUTION,
            DEFAULT_RESOLUTION,
        );

        /**
         * Black with the bake in the alpha channel, so the colour stays a
         * property of the material and changing it costs no bake.
         */
        this._material = new MeshBasicNodeMaterial({
            color: new Color(0x000000),
            transparent: true,
            depthWrite: false,
            // the geometry's normal points down, see below
            side: DoubleSide,
            opacityNode: texture(this._target.texture).a.mul(this._opacity),
            // it lies on the floor, and coplanar the depth test goes either way
            polygonOffset: true,
            polygonOffsetFactor: 1,
            polygonOffsetUnits: 1,
        });

        /**
         * Turned so that +X and +Z of the plane are +X and +Z of the world,
         * which is how the bake camera sees them -- looking up, its own up
         * vector is +Z. Getting that the other way round would mirror the
         * shadow along Z, visible on anything asymmetric. The cost is that the
         * normal ends up pointing down, hence `DoubleSide` above.
         */
        const geometry = new PlaneGeometry(1, 1);
        geometry.rotateX(Math.PI / 2);

        this._mesh = new Mesh(geometry, this._material);
        this._mesh.name = 'SoftShadow';
        this._mesh.layers.mask = SHADOW_LAYER_MASK;

        /**
         * The plane carries a matrix this component writes rather than a
         * transform three composes: it hangs in the owner's children and would
         * otherwise pick up the owner's rotation and scale, while the shadow it
         * draws is world-aligned and measured in world units.
         */
        this._mesh.matrixAutoUpdate = false;

        this._mesh.onBeforeRender = (renderer, scene): void => {
            this._renderer = renderer as unknown as WebGPURenderer;
            this._scene = scene;
        };

        this.contribute(this._mesh);

        /**
         * Distance from the camera, which looks straight up from the plane, so
         * view depth is height above the ground. Full darkness where something
         * touches down, nothing at the top of the frustum.
         */
        const height = positionView.z.negate().div(this._reach).clamp(0, 1);

        this._depthMaterial = new MeshBasicNodeMaterial({
            // written straight into the target: the depth test already picked
            // the lowest fragment, and blending would stack the ones behind it
            blending: NoBlending,
            side: DoubleSide,
            outputNode: vec4(
                0,
                0,
                0,
                float(1).sub(height).mul(this._darkness).clamp(0, 1),
            ),
        });

        this._camera = new OrthographicCamera();
        this._camera.rotation.x = Math.PI / 2; // look up
        this._camera.layers.mask = PRODUCT_LAYER_MASK;

        this._horizontal = { uDirection: uniform(new Vector2()) };
        this._vertical = { uDirection: uniform(new Vector2()) };

        this._blurToScratch = new NodeMaterial();
        this._blurToScratch.fragmentNode = new BlurNode(
            this._target.texture,
            this._horizontal,
        );

        this._blurToTarget = new NodeMaterial();
        this._blurToTarget.fragmentNode = new BlurNode(
            this._scratch.texture,
            this._vertical,
        );

        [this._blurToScratch, this._blurToTarget].forEach((material) => {
            material.blending = NoBlending;
            material.depthTest = false;
            material.depthWrite = false;
        });

        this._quad = new QuadMesh(new NodeMaterial());
    }

    /** The plane the shadow is drawn on. */
    public get mesh(): Mesh {
        return this._mesh;
    }

    /** Whether the shadow is drawn. */
    public get visible(): boolean {
        return this._mesh.visible;
    }

    /** The shadow colour. */
    public get color(): Color {
        return this._material.color;
    }

    /** How opaque the shadow is drawn, 0 to 1. */
    public get opacity(): number {
        return this._opacity.value;
    }

    /** How dark the shadow goes where something touches the ground, 0 to 1. */
    public get darkness(): number {
        return this._darkness.value;
    }

    /** How far the shadow spreads past what casts it, in meters. */
    public get softness(): number {
        return this._softness;
    }

    /** Edge length of the shadow texture, in pixels. */
    public get resolution(): number {
        return this._resolution;
    }

    /** Whether {@link tick} re-bakes the shadow when it goes stale. */
    public get autoBake(): boolean {
        return this._autoBake;
    }

    /** Whether the shadow on screen is behind what the node looks like now. */
    public get needsBake(): boolean {
        return this._needsBake;
    }

    /**
     * @param visible - Whether the shadow is drawn.
     */
    public setVisibility(visible: boolean): this {
        this._mesh.visible = visible;

        return this;
    }

    /**
     * Costs no bake: the bake writes alpha, and this is the colour under it.
     *
     * @param color - The shadow colour.
     */
    public setColor(color: ColorRepresentation): this {
        this._material.color.set(color);

        return this;
    }

    /**
     * Costs no bake either, which makes it the one to animate or tie to a slider.
     *
     * @param opacity - How opaque the shadow is drawn, 0 to 1.
     */
    public setOpacity(opacity: number): this {
        this._opacity.value = opacity;

        return this;
    }

    /**
     * How dark the shadow goes directly under the model.
     *
     * Baked into the texture, unlike {@link setOpacity}, because it is a curve
     * over height rather than one value over the whole plane.
     *
     * @param darkness - The darkness at ground contact, 0 to 1.
     */
    public setDarkness(darkness: number): this {
        this._darkness.value = darkness;

        return this.refresh();
    }

    /**
     * How far the shadow spreads past what casts it.
     *
     * In meters, so it stays put when the model is swapped for a bigger one.
     * The plane grows with it -- {@link PADDING_FACTOR} radii past the bounds --
     * so raising this never clips the falloff.
     *
     * @param softness - The spread in meters.
     */
    public setSoftness(softness: number): this {
        this._softness = softness;

        return this.refresh();
    }

    /**
     * @param resolution - Edge length of the shadow texture in pixels.
     */
    public setResolution(resolution: number): this {
        this._resolution = Math.max(1, Math.floor(resolution));

        return this.refresh();
    }

    /**
     * Whether the component re-bakes itself when the node changes.
     *
     * On by default. Worth turning off while something drags the node around,
     * where every frame would otherwise pay for a bake nobody sees.
     *
     * @param autoBake - Whether to re-bake on tick.
     */
    public setAutoBake(autoBake: boolean): this {
        this._autoBake = autoBake;

        return this;
    }

    /**
     * Marks the shadow stale, so it is baked again.
     *
     * Only needed for changes nothing announces -- a geometry swapped in place
     * on a mesh that is already in the node. Everything that goes through the
     * node's own API arrives here as an event.
     */
    public refresh(): this {
        this._invalidate();

        return this;
    }

    /**
     * Renders the shadow.
     *
     * Four passes: the silhouette from below, then the blur twice over, each
     * horizontal and vertical. All of it on the GPU, nothing read back, so this
     * is synchronous -- but it does render the scene, so it is not something to
     * call every frame by choice.
     *
     * Puts back everything it borrows from the renderer and the scene, including
     * on the way out of a failure, because the live view renders from the same
     * two.
     *
     * @param renderer - An initialised renderer.
     * @param scene - The scene the node stands in.
     */
    public bake(renderer: WebGPURenderer, scene: Scene): this {
        if (!renderer.initialized) {
            throw new Error(
                'SoftShadowComponent.bake: the renderer is not initialized yet. Await DIVEView.initAsync() before baking.',
            );
        }

        this._place();

        // nothing above the plane to cast anything
        if (this._bounds.isEmpty) return this._settle();

        this._resize();
        this._aim();

        const restoreRenderTarget = renderer.getRenderTarget();
        const restoreOverride = scene.overrideMaterial;
        const restoreBackground = scene.background;
        const restoreClearAlpha = renderer.getClearAlpha();
        renderer.getClearColor(_clearColor);

        try {
            scene.overrideMaterial = this._depthMaterial;

            // a background would be drawn over the whole target as full alpha
            scene.background = null;
            renderer.setClearColor(0x000000, 0);

            renderer.setRenderTarget(this._target);
            renderer.render(scene, this._camera);

            this._blur(renderer, 1);
            this._blur(renderer, BLUR_FALLOFF);
        } finally {
            scene.overrideMaterial = restoreOverride;
            scene.background = restoreBackground;
            renderer.setClearColor(_clearColor, restoreClearAlpha);
            renderer.setRenderTarget(restoreRenderTarget);
        }

        return this._settle();
    }

    /**
     * Keeps the plane under the node, and bakes when something has changed.
     *
     * Enrolled only while there is something to do: a bake turns the tick off
     * again, and an event turns it back on.
     */
    public tick(): void {
        if (!this._needsBake) return;

        this._place();

        if (!this._autoBake) return;
        if (!this._renderer?.initialized || !this._scene) return;

        this.bake(this._renderer, this._scene);
    }

    protected onAttach(owner: DIVENode): void {
        owner.addEventListener('childadded', this._invalidate);
        owner.addEventListener('childremoved', this._invalidate);
        owner.addEventListener('componentadded', this._invalidate);
        owner.addEventListener('componentremoved', this._invalidate);
        owner.addEventListener('object-transform', this._invalidate);

        this._invalidate();
    }

    protected onDetach(previousOwner: DIVENode): void {
        previousOwner.removeEventListener('childadded', this._invalidate);
        previousOwner.removeEventListener('childremoved', this._invalidate);
        previousOwner.removeEventListener('componentadded', this._invalidate);
        previousOwner.removeEventListener('componentremoved', this._invalidate);
        previousOwner.removeEventListener('object-transform', this._invalidate);

        this._invalidate();
    }

    public copy(source: this): this {
        super.copy(source);

        this.setColor(source.color);
        this.setOpacity(source.opacity);
        this.setDarkness(source.darkness);
        this.setSoftness(source.softness);
        this.setResolution(source.resolution);
        this.setAutoBake(source.autoBake);
        this.setVisibility(source.visible);

        // the copy bakes its own: a render target is not something to share
        return this.refresh();
    }

    public dispose(): void {
        this._mesh.geometry.dispose();
        this._material.dispose();
        this._depthMaterial.dispose();
        this._blurToScratch.dispose();
        this._blurToTarget.dispose();
        this._target.dispose();
        this._scratch.dispose();

        // the quad's geometry is three's, shared between every QuadMesh
    }

    /** Re-encloses the owner if anything has happened since the last read. */
    private _measure(): void {
        if (!this._stale) return;
        this._stale = false;

        if (!this.isAttached) {
            this._bounds.clear();

            return;
        }

        this._bounds.enclose(this.owner);
    }

    /**
     * Sizes the plane to the bounds and puts it under them.
     *
     * World-aligned and flat on the lowest point of the node, whatever the
     * owner's own transform is -- which is why the owner's world matrix is
     * multiplied back out: a contributed object would otherwise be transformed
     * by it a second time.
     */
    private _place(): void {
        this._measure();

        const { box, size } = this._bounds;

        if (this._bounds.isEmpty) {
            this._mesh.matrix.makeScale(0, 0, 0);
            this._mesh.matrixWorldNeedsUpdate = true;

            return;
        }

        const padding = this._softness * PADDING_FACTOR;
        this._width = size.x + padding * 2;
        this._depth = size.z + padding * 2;

        box.getCenter(_center);

        // reachable only with bounds, and only an attached component has any
        _inverse.copy(this.owner.matrixWorld).invert();

        this._mesh.matrix
            .compose(
                _position.set(_center.x, box.min.y, _center.z),
                _noRotation,
                _scale.set(this._width, 1, this._depth),
            )
            .premultiply(_inverse);
        this._mesh.matrixWorldNeedsUpdate = true;
    }

    /** Points the bake camera up through the bounds from the plane. */
    private _aim(): void {
        const { box, size } = this._bounds;

        box.getCenter(_center);

        this._camera.left = -this._width / 2;
        this._camera.right = this._width / 2;
        this._camera.top = this._depth / 2;
        this._camera.bottom = -this._depth / 2;
        this._camera.near = 0;
        this._camera.far = Math.max(size.y, MIN_HEIGHT);
        this._camera.position.set(_center.x, box.min.y, _center.z);
        this._camera.updateProjectionMatrix();
        this._camera.updateMatrixWorld(true);

        this._reach.value = this._camera.far;
    }

    /** Matches both targets to the configured resolution. */
    private _resize(): void {
        if (this._target.width === this._resolution) return;

        this._target.setSize(this._resolution, this._resolution);
        this._scratch.setSize(this._resolution, this._resolution);
    }

    /**
     * One separable blur: horizontal into the scratch target, vertical back.
     *
     * The radius is in meters and the taps step in UV, so each direction is
     * divided by the extent of the plane along it -- which is what keeps a
     * shadow on a wide, shallow plane from being blurred into an oval.
     *
     * @param renderer - The renderer to draw with.
     * @param scale - The radius for this pass, relative to {@link softness}.
     */
    private _blur(renderer: WebGPURenderer, scale: number): void {
        const radius = (this._softness * scale) / BlurNode.TAPS;

        this._horizontal.uDirection.value.set(radius / this._width, 0);
        this._quad.material = this._blurToScratch;
        renderer.setRenderTarget(this._scratch);
        this._quad.render(renderer);

        this._vertical.uDirection.value.set(0, radius / this._depth);
        this._quad.material = this._blurToTarget;
        renderer.setRenderTarget(this._target);
        this._quad.render(renderer);
    }

    /** Marks the shadow current, and stops the tick until something changes. */
    private _settle(): this {
        this._needsBake = false;
        this.setTickEnabled(false);

        return this;
    }
}
