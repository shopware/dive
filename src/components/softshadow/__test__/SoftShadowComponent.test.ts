import {
    BoxGeometry,
    Color,
    Mesh,
    MeshBasicMaterial,
    Scene,
    Vector3,
    type WebGPURenderer,
} from 'three/webgpu';
import { SoftShadowComponent } from '../SoftShadowComponent.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import {
    PRODUCT_LAYER_MASK,
    SHADOW_LAYER_MASK,
} from '../../../constants/VisibilityLayerMask.ts';

const createCube = (size = 2): Mesh => {
    const mesh = new Mesh(
        new BoxGeometry(size, size, size),
        new MeshBasicMaterial(),
    );
    mesh.layers.mask = PRODUCT_LAYER_MASK;

    return mesh;
};

/** A node with geometry and a shadow, the way a caller composes one. */
const shaded = (
    content: Mesh | null = createCube(),
): { node: DIVENode; shadow: SoftShadowComponent } => {
    const node = new DIVENode();
    if (content) node.add(content);
    node.updateMatrixWorld(true);

    return { node, shadow: node.addComponent(new SoftShadowComponent()) };
};

type FakeRenderer = WebGPURenderer & {
    render: ReturnType<typeof vi.fn>;
    setRenderTarget: ReturnType<typeof vi.fn>;
    setClearColor: ReturnType<typeof vi.fn>;
};

const createRenderer = (initialized = true): FakeRenderer =>
    ({
        initialized,
        render: vi.fn(),
        setRenderTarget: vi.fn(),
        getRenderTarget: vi.fn(() => null),
        setClearColor: vi.fn(),
        getClearColor: vi.fn((target: Color) => target.set(0x123456)),
        getClearAlpha: vi.fn(() => 0.5),
    }) as unknown as FakeRenderer;

/** The route the plane gives the component to a renderer and a scene. */
const observe = (
    shadow: SoftShadowComponent,
    renderer: FakeRenderer,
    scene: Scene = new Scene(),
): void => {
    const onBeforeRender = shadow.mesh.onBeforeRender as unknown as (
        renderer: unknown,
        scene: Scene,
    ) => void;

    onBeforeRender(renderer, scene);
};

describe('dive/softshadow/SoftShadowComponent', () => {
    describe('composition', () => {
        it('should declare no capability brands', () => {
            /** a shadow is never what a click or a bounding box is about */
            const shadow = new SoftShadowComponent();

            expect('isSelectable' in shadow).toBe(false);
            expect('isMovable' in shadow).toBe(false);
            expect('isDIVENode' in shadow).toBe(false);
        });

        it('should contribute one plane on the shadow layer', () => {
            const shadow = new SoftShadowComponent();

            expect(shadow.contributions).toEqual([shadow.mesh]);
            expect(shadow.mesh.layers.mask).toBe(SHADOW_LAYER_MASK);
        });

        it('should write the plane matrix itself', () => {
            /**
             * it hangs in the owner's children and must not pick up the owner's
             * rotation or scale
             */
            expect(new SoftShadowComponent().mesh.matrixAutoUpdate).toBe(false);
        });

        it('should be constructible with no arguments', () => {
            expect(() => new SoftShadowComponent().clone()).not.toThrow();
        });

        it('should stay out of the bounds it measures', () => {
            /**
             * the plane is geometry in the node, so a product layer would let
             * every bake grow the box it was sized from
             */
            const { node, shadow } = shaded();
            shadow.tick();

            expect((shadow.mesh.layers.mask & PRODUCT_LAYER_MASK) !== 0).toBe(
                false,
            );
            expect(node.children).toContain(shadow.mesh);
        });
    });

    describe('placement', () => {
        it('should size the plane to the bounds plus room for the blur', () => {
            const { shadow } = shaded();
            shadow.setSoftness(0.1);
            shadow.tick();

            /**
             * 2 across, plus two padding radii either side. Read off the
             * matrix, which carries no rotation, so the diagonal is the scale
             */
            expect(shadow.mesh.matrix.elements[0]).toBeCloseTo(2.4);
            expect(shadow.mesh.matrix.elements[10]).toBeCloseTo(2.4);
        });

        it('should sit on the lowest point of what it shades', () => {
            const { shadow } = shaded();
            shadow.tick();

            const position = new Vector3().setFromMatrixPosition(
                shadow.mesh.matrix,
            );

            expect(position.y).toBeCloseTo(-1);
        });

        it('should multiply the owner transform back out', () => {
            /**
             * the bounds are world-space, the matrix is the owner's child: the
             * plane would otherwise be moved by the owner a second time
             */
            const { node, shadow } = shaded();
            node.position.set(5, 0, 0);
            node.updateMatrixWorld(true);
            shadow.refresh();
            shadow.tick();

            const local = new Vector3().setFromMatrixPosition(
                shadow.mesh.matrix,
            );
            const world = local.clone().applyMatrix4(node.matrixWorld);

            expect(local.x).toBeCloseTo(0);
            expect(world.x).toBeCloseTo(5);
        });

        it('should collapse the plane when there is nothing to shade', () => {
            const { shadow } = shaded(null);
            shadow.tick();

            expect(shadow.mesh.matrix.elements[0]).toBe(0);
            expect(shadow.mesh.matrix.elements[10]).toBe(0);
        });

        it('should collapse the plane while detached', () => {
            const shadow = new SoftShadowComponent();
            shadow.tick();

            expect(shadow.mesh.matrix.elements[0]).toBe(0);
        });
    });

    describe('baking', () => {
        it('should render the scene once and blur it four times', () => {
            const { shadow } = shaded();
            const renderer = createRenderer();

            shadow.bake(renderer, new Scene());

            // the silhouette, then two separable passes of two directions
            expect(renderer.render).toHaveBeenCalledTimes(5);
        });

        it('should look straight up from the plane through the bounds', () => {
            const { shadow } = shaded();
            const renderer = createRenderer();

            shadow.bake(renderer, new Scene());

            const camera = renderer.render.mock.calls[0][1];
            expect(camera.position.y).toBeCloseTo(-1);
            expect(camera.rotation.x).toBeCloseTo(Math.PI / 2);
            expect(camera.far).toBeCloseTo(2);
            expect(camera.layers.mask).toBe(PRODUCT_LAYER_MASK);
        });

        it('should capture only the product layer', () => {
            /** the floor and the shadow plane itself must never be in the bake */
            const { shadow } = shaded();
            const renderer = createRenderer();

            shadow.bake(renderer, new Scene());

            const camera = renderer.render.mock.calls[0][1];
            expect(camera.layers.mask & SHADOW_LAYER_MASK).toBe(0);
        });

        it('should put back everything it borrowed', () => {
            const { shadow } = shaded();
            const renderer = createRenderer();
            const scene = new Scene();
            const background = new Color(0x00ff00);
            const override = new MeshBasicMaterial();
            scene.background = background;
            scene.overrideMaterial = override;

            shadow.bake(renderer, scene);

            expect(scene.background).toBe(background);
            expect(scene.overrideMaterial).toBe(override);
            expect(renderer.setRenderTarget).toHaveBeenLastCalledWith(null);
            expect(renderer.setClearColor).toHaveBeenLastCalledWith(
                expect.objectContaining({ isColor: true }),
                0.5,
            );
        });

        it('should put them back after a failed render too', () => {
            const { shadow } = shaded();
            const renderer = createRenderer();
            const scene = new Scene();
            renderer.render.mockImplementation(() => {
                throw new Error('device lost');
            });

            expect(() => shadow.bake(renderer, scene)).toThrow('device lost');
            expect(scene.overrideMaterial).toBe(null);
            expect(renderer.setRenderTarget).toHaveBeenLastCalledWith(null);
        });

        it('should refuse an uninitialised renderer', () => {
            const { shadow } = shaded();

            expect(() => shadow.bake(createRenderer(false), new Scene())) //
                .toThrow(/not initialized/);
        });

        it('should skip the render when there is nothing to shade', () => {
            const { shadow } = shaded(null);
            const renderer = createRenderer();

            shadow.bake(renderer, new Scene());

            expect(renderer.render).not.toHaveBeenCalled();
            expect(shadow.needsBake).toBe(false);
        });

        it('should resize its targets only when the resolution changed', () => {
            const { shadow } = shaded();
            const renderer = createRenderer();
            const target = shadow['_target'];
            const resize = vi.spyOn(target, 'setSize');

            shadow.bake(renderer, new Scene());
            expect(resize).not.toHaveBeenCalled();

            shadow.setResolution(128);
            shadow.bake(renderer, new Scene());
            expect(resize).toHaveBeenCalledWith(128, 128);
        });

        it('should keep the texture the plane samples across a resize', () => {
            /** the material holds the node, so a swapped target would go unread */
            const { shadow } = shaded();
            const sampled = shadow['_target'].texture;

            shadow.setResolution(64);
            shadow.bake(createRenderer(), new Scene());

            expect(shadow['_target'].texture).toBe(sampled);
        });

        it('should scale the blur step by the extent it runs along', () => {
            /** in meters, so a wide shallow plane is not blurred into an oval */
            const { shadow } = shaded();
            shadow.setSoftness(0.24);
            shadow.bake(createRenderer(), new Scene());

            const horizontal = shadow['_horizontal'].uDirection.value;
            const vertical = shadow['_vertical'].uDirection.value;

            // second pass leaves the falloff radius behind
            expect(horizontal.x).toBeCloseTo((0.24 * 0.4) / 4 / 2.96);
            expect(horizontal.y).toBe(0);
            expect(vertical.x).toBe(0);
            expect(vertical.y).toBeCloseTo((0.24 * 0.4) / 4 / 2.96);
        });
    });

    describe('staleness', () => {
        it('should start out needing a bake', () => {
            expect(new SoftShadowComponent().needsBake).toBe(true);
        });

        it('should settle once baked', () => {
            const { shadow } = shaded();

            shadow.bake(createRenderer(), new Scene());

            expect(shadow.needsBake).toBe(false);
            expect(shadow.tickEnabled).toBe(false);
        });

        it.each([
            ['childadded'],
            ['childremoved'],
            ['componentadded'],
            ['componentremoved'],
            ['object-transform'],
        ])('should go stale again on %s', (event) => {
            const { node, shadow } = shaded();
            shadow.bake(createRenderer(), new Scene());

            node.dispatchEvent({ type: event } as never);

            expect(shadow.needsBake).toBe(true);
            expect(shadow.tickEnabled).toBe(true);
        });

        it('should stop listening once detached', () => {
            const { node, shadow } = shaded();
            node.removeComponent(shadow);
            shadow.bake(createRenderer(), new Scene());

            node.dispatchEvent({ type: 'object-transform' } as never);

            expect(shadow.needsBake).toBe(false);
        });

        it.each([
            ['setDarkness', 0.5],
            ['setSoftness', 0.3],
            ['setResolution', 256],
        ])('should need another bake after %s', (setter, value) => {
            const { shadow } = shaded();
            shadow.bake(createRenderer(), new Scene());

            (
                shadow[setter as keyof SoftShadowComponent] as (
                    v: number,
                ) => void
            )(value);

            expect(shadow.needsBake).toBe(true);
        });

        it.each([
            ['setColor', 0xff0000],
            ['setOpacity', 0.5],
        ])('should not need one after %s', (setter, value) => {
            /** both live on the material, over whatever the bake produced */
            const { shadow } = shaded();
            shadow.bake(createRenderer(), new Scene());

            (
                shadow[setter as keyof SoftShadowComponent] as (
                    v: number,
                ) => void
            )(value);

            expect(shadow.needsBake).toBe(false);
        });
    });

    describe('ticking', () => {
        it('should do nothing while nothing has changed', () => {
            const { shadow } = shaded();
            const renderer = createRenderer();
            observe(shadow, renderer);
            shadow.bake(renderer, new Scene());
            renderer.render.mockClear();

            shadow.tick();

            expect(renderer.render).not.toHaveBeenCalled();
        });

        it('should bake with what onBeforeRender handed it', () => {
            /** the only route a component has to a renderer and a scene */
            const { shadow } = shaded();
            const renderer = createRenderer();
            observe(shadow, renderer);

            shadow.tick();

            expect(renderer.render).toHaveBeenCalled();
            expect(shadow.needsBake).toBe(false);
        });

        it('should place the plane even with no renderer yet', () => {
            const { shadow } = shaded();

            shadow.tick();

            expect(shadow.mesh.matrix.elements[0]).toBeCloseTo(2.4);
            expect(shadow.needsBake).toBe(true);
        });

        it('should wait for the renderer to be initialised', () => {
            const { shadow } = shaded();
            const renderer = createRenderer(false);
            observe(shadow, renderer);

            shadow.tick();

            expect(renderer.render).not.toHaveBeenCalled();
            expect(shadow.needsBake).toBe(true);
        });

        it('should leave the baking to the caller when told to', () => {
            const { shadow } = shaded();
            const renderer = createRenderer();
            observe(shadow, renderer);
            shadow.setAutoBake(false);

            shadow.tick();

            expect(shadow.autoBake).toBe(false);
            expect(renderer.render).not.toHaveBeenCalled();
        });
    });

    describe('configuration', () => {
        it('should default to a black shadow at full strength', () => {
            const shadow = new SoftShadowComponent();

            expect(shadow.color.getHex()).toBe(0x000000);
            expect(shadow.opacity).toBe(1);
            expect(shadow.darkness).toBe(1);
            expect(shadow.softness).toBe(0.1);
            expect(shadow.resolution).toBe(512);
            expect(shadow.autoBake).toBe(true);
            expect(shadow.visible).toBe(true);
        });

        it('should round a resolution to a usable number of pixels', () => {
            const shadow = new SoftShadowComponent();

            expect(shadow.setResolution(0).resolution).toBe(1);
            expect(shadow.setResolution(64.7).resolution).toBe(64);
        });

        it('should hide without touching the rest of the node', () => {
            const { node, shadow } = shaded();

            shadow.setVisibility(false);

            expect(shadow.visible).toBe(false);
            expect(node.visible).toBe(true);
        });

        it('should carry its configuration into a clone', () => {
            const shadow = new SoftShadowComponent()
                .setColor(0x0000ff)
                .setOpacity(0.25)
                .setDarkness(0.75)
                .setSoftness(0.4)
                .setResolution(128)
                .setAutoBake(false)
                .setVisibility(false);

            const copy = shadow.clone();

            expect(copy.color.getHex()).toBe(0x0000ff);
            expect(copy.opacity).toBe(0.25);
            expect(copy.darkness).toBe(0.75);
            expect(copy.softness).toBe(0.4);
            expect(copy.resolution).toBe(128);
            expect(copy.autoBake).toBe(false);
            expect(copy.visible).toBe(false);
        });

        it('should give the clone its own targets to bake into', () => {
            const shadow = new SoftShadowComponent();

            const copy = shadow.clone();

            expect(copy['_target']).not.toBe(shadow['_target']);
            expect(copy.needsBake).toBe(true);
        });
    });

    it('should release what it owns on dispose', () => {
        const shadow = new SoftShadowComponent();
        const disposed = [
            vi.spyOn(shadow.mesh.geometry, 'dispose'),
            vi.spyOn(shadow['_material'], 'dispose'),
            vi.spyOn(shadow['_depthMaterial'], 'dispose'),
            vi.spyOn(shadow['_blurToScratch'], 'dispose'),
            vi.spyOn(shadow['_blurToTarget'], 'dispose'),
            vi.spyOn(shadow['_target'], 'dispose'),
            vi.spyOn(shadow['_scratch'], 'dispose'),
        ];

        shadow.dispose();

        disposed.forEach((spy) => expect(spy).toHaveBeenCalled());
    });
});
