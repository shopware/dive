import type { Mock } from 'vitest';
import {
    Color,
    EquirectangularReflectionMapping,
    Object3D,
    SRGBColorSpace,
    Texture,
} from 'three/webgpu';
import { DIVEComponent } from '../../component/Component.ts';
import { DIVENode } from '../../node/Node.ts';
import {
    DIVEImageBasedLightDefaultSettings,
    DIVEScene as SceneUnderTest,
    DIVESceneDefaultSettings,
} from '../Scene.ts';
import { DIVEGridDefaultSettings } from '../../../components/grid/GridComponent.ts';
import { GroundProjectionComponent } from '../../../components/groundprojection/GroundProjectionComponent.ts';

const mock_GetSceneObject = vi.fn();
const mock_ComputeSceneBB = vi.fn();

let mock_FloorSetVisibility: Mock;

/**
 * The root is a stand-in for the construction and settings tests, and the
 * real one for the suites that put nodes in the scene.
 */
const real = vi.hoisted(() => ({ root: false }));

vi.mock('../root/Root.ts', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../root/Root.ts')>();

    return {
        ...actual,
        DIVERoot: vi.fn(function (this: any) {
            if (real.root) return new actual.DIVERoot();

            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            // real Object3Ds, so the dispose pass below can walk them
            this.children = [];
            this.traverse = vi.fn((callback: (object: unknown) => void) =>
                callback(this),
            );
            this.dispose = vi.fn();
            this.getSceneObject = mock_GetSceneObject;
            this.computeSceneBB = mock_ComputeSceneBB;
            this.removeFromParent = vi.fn();
            mock_FloorSetVisibility = vi.fn();
            this.floor = {
                setVisibility: mock_FloorSetVisibility,
            };
            return this;
        }),
    };
});

const loaders = vi.hoisted(() => {
    const state = { pending: 0 };

    /** a texture per load, telling which loader made it from which url */
    const loader = (kind: string) =>
        vi.fn(async (url: string) => {
            state.pending++;
            try {
                const texture = new (await import('three/webgpu')).Texture();
                texture.name = url;
                texture.userData.loader = kind;
                vi.spyOn(texture, 'dispose');
                return texture;
            } finally {
                state.pending--;
            }
        });

    return {
        state,
        hdr: loader('hdr'),
        exr: loader('exr'),
        texture: loader('texture'),
    };
});

vi.mock('three/examples/jsm/loaders/HDRLoader.js', () => ({
    HDRLoader: vi.fn(function (this: any) {
        this.loadAsync = loaders.hdr;
    }),
}));

vi.mock('three/examples/jsm/loaders/EXRLoader.js', () => ({
    EXRLoader: vi.fn(function (this: any) {
        this.loadAsync = loaders.exr;
    }),
}));

vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three/webgpu')>();

    return {
        ...actual,
        TextureLoader: vi.fn(function (this: any) {
            this.loadAsync = loaders.texture;
        }),
    };
});

/** every texture disposal, clones included: a clone carries no spy of its own */
const textureDispose = vi.spyOn(Texture.prototype, 'dispose');

/** how often a texture was disposed */
const disposals = (texture: Texture): number =>
    textureDispose.mock.contexts.filter((each) => each === texture).length;

/** what three does right before it renders an object */
const render = (object: Object3D): void =>
    object.onBeforeRender(
        ...([] as unknown as Parameters<Object3D['onBeforeRender']>),
    );

/** how often a url went to the hdr loader */
const loadsOf = (url: string): number =>
    loaders.hdr.mock.calls.filter(([each]) => each === url).length;

/** the texture the hdr loader made for a url, which every user gets a clone of */
const loadedImage = (url: string): Promise<Texture> =>
    loaders.hdr.mock.results[
        loaders.hdr.mock.calls.findIndex(([each]) => each === url)
    ].value;

/** every scene a test made, disposed after it so the shared image cache empties */
const scenes: SceneUnderTest[] = [];

/** disposes every scene made so far and lets their loads settle */
async function disposeScenes(): Promise<void> {
    scenes.splice(0).forEach((made) => made.dispose());
    await vi.waitFor(() => expect(loaders.state.pending).toBe(0));
    await new Promise((resolve) => setTimeout(resolve));
}

class DIVEScene extends SceneUnderTest {
    constructor(...args: ConstructorParameters<typeof SceneUnderTest>) {
        super(...args);
        scenes.push(this);
    }
}

class Ticker extends DIVEComponent {
    public ticks = 0;
    public deltas: number[] = [];

    public tick(deltaTime: number): void {
        this.ticks++;
        this.deltas.push(deltaTime);
    }
}

class Passive extends DIVEComponent {}

/** Removes another component from inside its own tick. */
class Remover extends DIVEComponent {
    public victim: DIVEComponent | null = null;

    public tick(): void {
        if (!this.victim?.isAttached) return;

        this.victim.owner.removeComponent(this.victim);
    }
}

/** Takes its own node out of the scene from inside its own tick. */
class Detacher extends DIVEComponent {
    public tick(): void {
        if (this.isAttached) this.owner.removeFromParent();
    }
}

/** Disables itself the first time it runs, the expected way to stop ticking. */
class SelfStopping extends DIVEComponent {
    public ticks = 0;

    public tick(): void {
        this.ticks++;
        this.setTickEnabled(false);
    }
}

let scene: DIVEScene;

describe('DIVEScene', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        real.root = false;
        scene = new DIVEScene();
    });

    afterEach(disposeScenes);

    it('should instantiate with correct properties', () => {
        expect(scene).toBeDefined();
        expect(scene.root).toBeDefined();
        expect(scene.grid).toBeDefined();
        expect(scene.background).toBe(null);
    });

    it('should add root and grid to scene', () => {
        // the grid sits on its own node, so what the scene holds is that node
        expect(scene.children).toContain(scene.root);
        expect(scene.children).toContain(scene.grid.owner);
    });

    it('should set background color', () => {
        const color = new Color(0x000000);
        scene.setBackground(0x000000);
        expect((scene.background as Color).getHex()).toBe(color.getHex());
    });

    it('should delegate computeSceneBB to root', () => {
        scene.computeSceneBB();
        expect(mock_ComputeSceneBB).toHaveBeenCalledTimes(1);
    });

    describe('default settings (no parameters)', () => {
        it('should use transparent background by default', () => {
            expect(scene.background).toBeNull();
        });

        it('should hide the floor by default', () => {
            expect(mock_FloorSetVisibility).toHaveBeenCalledWith(false);
        });

        it('should not create the grid by default', () => {
            expect(
                scene.children.some((child) => child.name === 'DIVEGrid'),
            ).toBe(false);
        });

        it('should have correct default settings exported', () => {
            expect(DIVESceneDefaultSettings).toEqual({
                displayFloor: false,
                displayGrid: false,
                grid: DIVEGridDefaultSettings,
                backgroundColor: 'transparent',
                imageBasedLight: DIVEImageBasedLightDefaultSettings,
            });
        });
    });

    describe('custom settings', () => {
        it('should show the floor when displayFloor is true', () => {
            const customScene = new DIVEScene({ displayFloor: true });
            expect(mock_FloorSetVisibility).toHaveBeenCalledWith(true);
            expect(customScene.root).toBeDefined();
        });

        it('should show the grid when displayGrid is true', () => {
            const customScene = new DIVEScene({ displayGrid: true });

            expect(customScene.grid.visible).toBe(true);
            expect(customScene.children).toContain(customScene.grid.owner);
        });

        it('should set a custom background color from a number', () => {
            const customScene = new DIVEScene({
                backgroundColor: 0xff0000,
            });
            expect(customScene.background).toBeInstanceOf(Color);
            expect((customScene.background as Color).getHex()).toBe(0xff0000);
        });

        it('should set a custom background color from a string', () => {
            const customScene = new DIVEScene({
                backgroundColor: '#00ff00',
            });
            expect(customScene.background).toBeInstanceOf(Color);
            expect((customScene.background as Color).getHex()).toBe(0x00ff00);
        });

        it('should accept all settings at once', () => {
            const customScene = new DIVEScene({
                displayFloor: true,
                displayGrid: true,
                backgroundColor: 0x0000ff,
            });
            expect(mock_FloorSetVisibility).toHaveBeenCalledWith(true);
            expect(customScene.grid.visible).toBe(true);
            expect(customScene.background).toBeInstanceOf(Color);
            expect((customScene.background as Color).getHex()).toBe(0x0000ff);
        });

        it('should use defaults for omitted partial settings', () => {
            const customScene = new DIVEScene({ displayFloor: true });
            // floor is explicitly set
            expect(mock_FloorSetVisibility).toHaveBeenCalledWith(true);
            // grid is not created when displayGrid defaults to false
            expect(
                customScene.children.some((child) => child.name === 'DIVEGrid'),
            ).toBe(false);
            // background falls back to default (transparent -> null)
            expect(customScene.background).toBeNull();
        });
    });

    describe('setBackground', () => {
        it('should set background to null for "transparent"', () => {
            scene.setBackground(0xff0000);
            expect(scene.background).not.toBeNull();

            scene.setBackground('transparent');
            expect(scene.background).toBeNull();
        });

        it('should set background from a hex number', () => {
            scene.setBackground(0xabcdef);
            expect(scene.background).toBeInstanceOf(Color);
            expect((scene.background as Color).getHex()).toBe(0xabcdef);
        });

        it('should set background from a CSS color string', () => {
            scene.setBackground('#ff00ff');
            expect(scene.background).toBeInstanceOf(Color);
            expect((scene.background as Color).getHex()).toBe(0xff00ff);
        });

        it('should set background from a Color instance', () => {
            const color = new Color(0x123456);
            scene.setBackground(color);
            expect(scene.background).toBe(color);
        });
    });

    describe('dispose', () => {
        it('should dispose every component in the scene', () => {
            /**
             * three frees a geometry, material or texture when its own dispose fires,
             * and Renderer.dispose only drops its bookkeeping
             */
            const node = new DIVENode();
            const component = node.addComponent(
                new (class extends DIVEComponent {})(),
            );
            const disposed = vi.spyOn(component, 'dispose');
            scene.add(node);

            scene.dispose();

            expect(disposed).toHaveBeenCalled();
        });

        it('should dispose a component sitting deeper in the tree', () => {
            /**
             * reached through the nodes, not by looking for components in the
             * graph: a component is not in the graph, only what it contributed is
             */
            const deep = new DIVENode();
            const component = deep.addComponent(
                new (class extends DIVEComponent {})(),
            );
            const disposed = vi.spyOn(component, 'dispose');
            const branch = new DIVENode();
            branch.add(deep);
            scene.add(branch);

            scene.dispose();

            expect(disposed).toHaveBeenCalled();
        });

        it('should dispose the grid', () => {
            const disposed = vi.spyOn(scene.grid, 'dispose');

            scene.dispose();

            expect(disposed).toHaveBeenCalled();
        });

        it('should remove root and grid from scene', () => {
            const gridNode = scene.grid.owner;
            expect(scene.children).toContain(scene.root);
            expect(scene.children).toContain(gridNode);

            scene.dispose();

            expect(scene.children).not.toContain(scene.root);
            expect(scene.children).not.toContain(gridNode);
        });
    });

    describe('ticking', () => {
        let scene: DIVEScene;

        beforeEach(() => {
            real.root = true;
            scene = new DIVEScene();
        });

        const addNodeWith = (...components: DIVEComponent[]): DIVENode => {
            const node = new DIVENode();
            components.forEach((component) => node.addComponent(component));
            scene.root.add(node);
            return node;
        };

        describe('a component withdrawn during a tick', () => {
            it('should stop ticking once it is removed', () => {
                const ticker = new Ticker();
                const remover = new Remover();
                remover.victim = ticker;
                addNodeWith(remover, ticker);

                scene.tick(0.1);
                const afterRemoval = ticker.ticks;
                scene.tick(0.1);
                scene.tick(0.1);

                expect(ticker.ticks).toBe(afterRemoval);
            });

            it('should leave the tick list without it', () => {
                const ticker = new Ticker();
                const remover = new Remover();
                remover.victim = ticker;
                addNodeWith(remover, ticker);

                scene.tick(0.1);

                expect(scene['_tickingComponents']).not.toContain(ticker);
            });

            it('should stop ticking when its node leaves the scene', () => {
                const detacher = new Detacher();
                addNodeWith(detacher);

                scene.tick(0.1);
                scene.tick(0.1);

                expect(scene['_tickingComponents']).not.toContain(detacher);
            });

            it('should never tick a component that has lost its node', () => {
                /**
                 * a tick that reads `owner` is the ordinary case, and the getter
                 * throws while detached -- so a withdrawal that does not take effect
                 * turns into an exception on the next frame
                 */
                const reader = new (class extends DIVEComponent {
                    public ticks = 0;

                    public tick(): void {
                        void this.owner;
                        this.ticks++;
                    }
                })();
                const remover = new Remover();
                remover.victim = reader;
                addNodeWith(remover, reader);

                expect(() => {
                    scene.tick(0.1);
                    scene.tick(0.1);
                }).not.toThrow();
            });

            it('should keep ticking a component enrolled again in the same frame', () => {
                // withdrawn and re-enlisted mid-frame, so the pending removal is void
                const ticker = new Ticker();
                const node = addNodeWith(ticker);
                const rejoin = node.addComponent(
                    new (class extends DIVEComponent {
                        public tick(): void {
                            if (!ticker.isAttached) return;

                            node.removeComponent(ticker);
                            node.addComponent(ticker);
                        }
                    })(),
                );
                void rejoin;

                scene.tick(0.1);
                const before = ticker.ticks;
                scene.tick(0.1);

                expect(ticker.ticks).toBe(before + 1);
                expect(scene['_tickingComponents']).toContain(ticker);
            });

            it('should never end up enrolled in two scenes at once', () => {
                // moving a node mid-tick withdraws from one scene and enlists in the
                // other; a deferred withdrawal that never happens leaves both
                const other = new DIVEScene();
                const ticker = new Ticker();
                const mover = new (class extends DIVEComponent {
                    public tick(): void {
                        if (this.isAttached) other.root.add(this.owner);
                    }
                })();
                addNodeWith(mover, ticker);

                scene.tick(0.1);

                expect(scene['_tickingComponents']).not.toContain(ticker);
                expect(other['_tickingComponents']).toContain(ticker);
            });
        });

        it('should tick an enrolled component', () => {
            const ticker = new Ticker();
            addNodeWith(ticker);

            scene.tick(0.5);

            expect(ticker.ticks).toBe(1);
            expect(ticker.deltas).toEqual([0.5]);
        });

        it('should never visit a component without a tick method', () => {
            const passive = new Passive();
            addNodeWith(passive);

            expect(() => scene.tick(0.1)).not.toThrow();
            // nothing to assert on the component itself; the point is the flat list
            expect(scene['_tickingComponents']).not.toContain(passive);
        });

        it('should tick components attached to nested nodes', () => {
            const ticker = new Ticker();
            const parent = addNodeWith();
            const child = new DIVENode();
            child.addComponent(ticker);
            parent.add(child);

            scene.tick(0.1);

            expect(ticker.ticks).toBe(1);
        });

        it('should enrol a whole prebuilt subtree added in one go', () => {
            // three fires `added` only on the object added, not its descendants
            const first = new Ticker();
            const second = new Ticker();

            const branch = new DIVENode();
            branch.addComponent(first);
            const leaf = new DIVENode();
            leaf.addComponent(second);
            branch.add(leaf);

            scene.root.add(branch);
            scene.tick(0.1);

            expect(first.ticks).toBe(1);
            expect(second.ticks).toBe(1);
        });

        it('should not tick a component while its node is detached', () => {
            const ticker = new Ticker();
            const node = new DIVENode();
            node.addComponent(ticker);

            scene.tick(0.1);

            expect(ticker.ticks).toBe(0);
        });

        it('should stop ticking a component once its node leaves the scene', () => {
            const ticker = new Ticker();
            const node = addNodeWith(ticker);

            scene.tick(0.1);
            node.removeFromParent();
            scene.tick(0.1);

            expect(ticker.ticks).toBe(1);
        });

        it('should stop ticking a component removed from its node', () => {
            const ticker = new Ticker();
            const node = addNodeWith(ticker);

            scene.tick(0.1);
            node.removeComponent(ticker);
            scene.tick(0.1);

            expect(ticker.ticks).toBe(1);
        });

        it('should enrol a component added to an already live node', () => {
            const node = addNodeWith();
            const ticker = new Ticker();

            node.addComponent(ticker);
            scene.tick(0.1);

            expect(ticker.ticks).toBe(1);
        });

        it('should respect setTickEnabled', () => {
            const ticker = new Ticker();
            addNodeWith(ticker);

            ticker.setTickEnabled(false);
            scene.tick(0.1);
            expect(ticker.ticks).toBe(0);

            ticker.setTickEnabled(true);
            scene.tick(0.1);
            expect(ticker.ticks).toBe(1);
        });

        it('should let a component disable itself from inside its own tick', () => {
            const selfStopping = new SelfStopping();
            addNodeWith(selfStopping);

            scene.tick(0.1);
            scene.tick(0.1);

            expect(selfStopping.ticks).toBe(1);
        });

        it('should not skip a neighbour when one component withdraws mid-tick', () => {
            /**
             * the classic mutation-during-iteration bug: splicing inside forEach
             * makes the loop jump over the following entry
             */
            const selfStopping = new SelfStopping();
            const after = new Ticker();
            addNodeWith(selfStopping, after);

            scene.tick(0.1);

            expect(after.ticks).toBe(1);
        });

        it('should not enrol the same component twice', () => {
            const ticker = new Ticker();
            const node = addNodeWith(ticker);

            // re-adding an existing child is a no-op re-parent in three
            node.addComponent(ticker);
            scene.tick(0.1);

            expect(ticker.ticks).toBe(1);
        });

        it('should drop all tickers on dispose', () => {
            const ticker = new Ticker();
            addNodeWith(ticker);

            scene.dispose();
            scene.tick(0.1);

            expect(ticker.ticks).toBe(0);
        });

        it('should skip a disabled component without removing it', () => {
            /**
             * enrolled but switched off: the loop must skip it and leave the entry
             * in place, so re-enabling does not need a re-enrolment
             */
            const ticker = new Ticker();
            addNodeWith(ticker);
            scene['_tickingComponents'][0].setTickEnabled(false);
            scene['_tickingComponents'] = [ticker];

            scene.tick(0.1);

            expect(ticker.ticks).toBe(0);
            expect(scene['_tickingComponents']).toContain(ticker);
        });

        it('should ignore enlisting a component that cannot tick', () => {
            const passive = new Passive();

            scene.enlistComponent(passive);

            expect(scene['_tickingComponents']).toHaveLength(0);
        });

        it('should ignore enlisting a component whose tick is disabled', () => {
            const ticker = new Ticker();
            ticker.setTickEnabled(false);

            scene.enlistComponent(ticker);

            expect(scene['_tickingComponents']).toHaveLength(0);
        });

        it('should ignore withdrawing a component that was never enrolled', () => {
            expect(() => scene.withdrawComponent(new Ticker())).not.toThrow();
        });

        it('should expose a uuid so the clock can dedupe it', () => {
            expect(typeof scene.uuid).toBe('string');
            expect(scene.uuid.length).toBeGreaterThan(0);
        });
    });

    describe('image based light', () => {
        beforeEach(async () => {
            // the scene made above shares its loads, so only this test's count
            await disposeScenes();
            real.root = true;
            loaders.hdr.mockClear();
            loaders.exr.mockClear();
            loaders.texture.mockClear();
        });

        it('is lit by the bundled default HDR without any setting', async () => {
            const scene = new DIVEScene();
            await scene.setImageBasedLight({});

            expect(scene.imageBasedLight).toEqual({
                image: null,
                rotation: 0,
                intensity: 1,
            });
            expect(scene.imageBasedLightTexture).toBeInstanceOf(Texture);
            expect(scene.imageBasedLightTexture!.name).toMatch(/default\.hdr/);
            expect(loaders.hdr).toHaveBeenCalledTimes(1);
        });

        it('takes the light from the DIVE settings', async () => {
            const scene = new DIVEScene({
                imageBasedLight: { image: 'studio.hdr', intensity: 2 },
            });
            await scene.setImageBasedLight({});

            expect(scene.imageBasedLight).toMatchObject({
                image: 'studio.hdr',
                rotation: 0,
                intensity: 2,
            });
        });

        it('has no light with null, in the settings or later', async () => {
            const unlit = new DIVEScene({ imageBasedLight: null });
            expect(unlit.imageBasedLight).toBeNull();
            expect(loaders.hdr).not.toHaveBeenCalled();

            const scene = new DIVEScene();
            await scene.setImageBasedLight({});
            const texture = scene.imageBasedLightTexture!;

            await scene.setImageBasedLight(null);

            expect(scene.imageBasedLight).toBeNull();
            expect(scene.imageBasedLightTexture).toBeNull();
            expect(disposals(texture)).toBeGreaterThan(0);
        });

        it('keeps the fields a call leaves out', async () => {
            const scene = new DIVEScene();
            await scene.setImageBasedLight({ image: 'a.hdr', rotation: 1 });
            const texture = scene.imageBasedLightTexture;

            await scene.setImageBasedLight({ intensity: 3 });

            expect(scene.imageBasedLight).toMatchObject({
                image: 'a.hdr',
                rotation: 1,
                intensity: 3,
            });
            expect(scene.imageBasedLightTexture).toBe(texture);
        });

        it('starts from the defaults again after null', async () => {
            const scene = new DIVEScene();
            await scene.setImageBasedLight({ image: 'a.hdr', rotation: 1 });
            await scene.setImageBasedLight(null);

            await scene.setImageBasedLight({ intensity: 3 });

            expect(scene.imageBasedLight).toEqual({
                image: null,
                rotation: 0,
                intensity: 3,
            });
            expect(scene.imageBasedLightTexture!.name).toMatch(/default\.hdr/);
        });

        it('lets the last of overlapping calls win and disposes the stale image', async () => {
            const scene = new DIVEScene();
            await scene.setImageBasedLight({});

            const slow = deferred<Texture>();
            loaders.hdr.mockImplementationOnce(() => slow.promise);
            const first = scene.setImageBasedLight({ image: 'slow.hdr' });
            const second = scene.setImageBasedLight({ image: 'fast.hdr' });

            await second;
            const stale = new Texture();
            vi.spyOn(stale, 'dispose');
            slow.resolve(stale);
            await first;

            expect(scene.imageBasedLight!.image).toBe('fast.hdr');
            expect(scene.imageBasedLightTexture!.name).toBe('fast.hdr');
            expect(disposals(stale)).toBeGreaterThan(0);
        });

        it('lets a later null win over a load still on its way', async () => {
            const scene = new DIVEScene({ imageBasedLight: null });

            const pending = scene.setImageBasedLight({ image: 'a.hdr' });
            await scene.setImageBasedLight(null);
            await pending;

            expect(scene.imageBasedLight).toBeNull();
        });

        it('applies rotation and intensity before a pending image arrives', async () => {
            const scene = new DIVEScene();
            await scene.setImageBasedLight({});

            const slow = deferred<Texture>();
            loaders.hdr.mockImplementationOnce(() => slow.promise);
            const pending = scene.setImageBasedLight({ image: 'slow.hdr' });
            const rotated = scene.setImageBasedLight({ rotation: 2 });

            expect(scene.imageBasedLight).toMatchObject({
                image: 'slow.hdr',
                rotation: 2,
            });
            expect(scene.imageBasedLightTexture!.name).toMatch(/default\.hdr/);

            slow.resolve(new Texture());
            await Promise.all([pending, rotated]);

            expect(scene.imageBasedLight).toMatchObject({
                image: 'slow.hdr',
                rotation: 2,
            });
        });

        it('describes the default image as null, also when given its URL', async () => {
            const scene = new DIVEScene({
                imageBasedLight: { image: 'a.hdr' },
            });
            await scene.setImageBasedLight({});

            await scene.setImageBasedLight({ image: null });
            const texture = scene.imageBasedLightTexture;
            expect(scene.imageBasedLight!.image).toBeNull();
            expect(texture!.name).toMatch(/default\.hdr/);

            await scene.setImageBasedLight({ image: texture!.name });
            expect(scene.imageBasedLight!.image).toBeNull();
            expect(scene.imageBasedLightTexture).toBe(texture);
        });

        it('shares one image with a background of the same url', async () => {
            const scene = new DIVEScene({ imageBasedLight: null });

            await Promise.all([
                scene.setImageBasedLight({ image: 'studio.hdr' }),
                scene.setBackground({ image: 'studio.hdr' }),
            ]);
            render(scene);
            const texture = scene.imageBasedLightTexture!;

            expect(loaders.hdr).toHaveBeenCalledOnce();
            expect(scene.background).not.toBe(texture);
            expect((scene.background as Texture).source).toBe(texture.source);

            const loaded = await loadedImage('studio.hdr');
            const background = scene.background as Texture;

            await scene.setImageBasedLight({ image: 'a.hdr' });
            expect(disposals(texture)).toBe(1);
            expect(disposals(background)).toBe(0);
            expect(disposals(loaded)).toBe(0);

            await scene.setBackground(null);
            expect(disposals(background)).toBe(1);
            expect(disposals(loaded)).toBe(1);
        });

        it('shares one load with a background and a dome of the same url', async () => {
            const scene = new DIVEScene({ imageBasedLight: null });
            const node = new DIVENode();
            const dome = node.addComponent(new GroundProjectionComponent());
            scene.add(node);

            await Promise.all([
                scene.setImageBasedLight({ image: 'studio.hdr' }),
                scene.setBackground({ image: 'studio.hdr' }),
                dome.setImage('studio.hdr'),
            ]);
            render(scene);
            render(dome.mesh);
            const light = scene.imageBasedLightTexture!;
            const background = scene.background as Texture;
            const projected = dome.mesh.material.map!;

            expect(loadsOf('studio.hdr')).toBe(1);
            expect(new Set([light, background, projected]).size).toBe(3);
            expect(background.source).toBe(light.source);
            expect(projected.source).toBe(light.source);

            const loaded = await loadedImage('studio.hdr');

            await scene.setImageBasedLight(null);
            await scene.setBackground(null);
            expect(disposals(light)).toBe(1);
            expect(disposals(background)).toBe(1);
            expect(disposals(projected)).toBe(0);
            expect(disposals(loaded)).toBe(0);

            dome.dispose();
            expect(disposals(projected)).toBe(1);
            expect(disposals(loaded)).toBe(1);
        });

        it('shares one image between scenes', async () => {
            const first = new DIVEScene();
            const second = new DIVEScene();
            await Promise.all([
                first.setImageBasedLight({ image: 'studio.hdr' }),
                second.setImageBasedLight({ image: 'studio.hdr' }),
            ]);
            const texture = first.imageBasedLightTexture!;

            expect(loadsOf('studio.hdr')).toBe(1);
            expect(second.imageBasedLightTexture).not.toBe(texture);
            expect(second.imageBasedLightTexture!.source).toBe(texture.source);

            const other = second.imageBasedLightTexture!;
            const loaded = await loadedImage('studio.hdr');

            first.dispose();
            expect(disposals(texture)).toBe(1);
            expect(disposals(other)).toBe(0);
            expect(disposals(loaded)).toBe(0);

            second.dispose();
            expect(disposals(other)).toBe(1);
            expect(disposals(loaded)).toBe(1);
        });

        it('disposes a loaded image on replace and on scene dispose', async () => {
            const scene = new DIVEScene();
            await scene.setImageBasedLight({ image: 'a.hdr' });
            const replaced = scene.imageBasedLightTexture!;

            await scene.setImageBasedLight({ image: 'b.hdr' });
            const current = scene.imageBasedLightTexture!;

            expect(disposals(replaced)).toBeGreaterThan(0);
            expect(disposals(current)).toBe(0);

            scene.dispose();

            expect(disposals(current)).toBeGreaterThan(0);
        });

        it('disposes an image that arrives after the scene was disposed', async () => {
            const scene = new DIVEScene({ imageBasedLight: null });
            const slow = deferred<Texture>();
            loaders.hdr.mockImplementationOnce(() => slow.promise);
            const pending = scene.setImageBasedLight({ image: 'a.hdr' });

            scene.dispose();
            const late = new Texture();
            vi.spyOn(late, 'dispose');
            slow.resolve(late);
            await pending;

            expect(disposals(late)).toBeGreaterThan(0);
        });

        it.each([
            ['a.hdr', 'hdr'],
            ['a.HDR?v=2', 'hdr'],
            ['a.exr', 'exr'],
            ['a.jpg', 'texture'],
            ['a.png', 'texture'],
            ['a.webp#x', 'texture'],
        ] as const)('loads %s with the %s loader', async (url, loader) => {
            const scene = new DIVEScene({ imageBasedLight: null });
            await scene.setImageBasedLight({ image: url });

            const texture = scene.imageBasedLightTexture!;
            expect(texture.userData.loader).toBe(loader);
            expect(texture.name).toBe(url);
            expect(texture.mapping).toBe(EquirectangularReflectionMapping);
        });

        it('tags images from the texture loader as sRGB', async () => {
            const scene = new DIVEScene({ imageBasedLight: null });

            await scene.setImageBasedLight({ image: 'a.jpg' });
            expect(scene.imageBasedLightTexture!.colorSpace).toBe(
                SRGBColorSpace,
            );

            await scene.setImageBasedLight({ image: 'a.hdr' });
            expect(scene.imageBasedLightTexture!.colorSpace).not.toBe(
                SRGBColorSpace,
            );
        });
    });

    describe('background', () => {
        /** a scene without an image based light, so only background loads count */
        const createScene = (
            settings?: ConstructorParameters<typeof DIVEScene>[0],
        ): DIVEScene => new DIVEScene({ imageBasedLight: null, ...settings });

        beforeEach(async () => {
            // the scene made above shares its loads, so only this test's count
            await disposeScenes();
            real.root = true;
            loaders.hdr.mockClear();
            loaders.exr.mockClear();
            loaders.texture.mockClear();
        });

        it('shows an image from a URL as an equirectangular background', async () => {
            const scene = createScene();

            await scene.setBackground({ image: 'panorama.jpg', rotation: 1 });
            render(scene);

            const background = scene.background as Texture;
            expect(background).toBeInstanceOf(Texture);
            expect(background.name).toBe('panorama.jpg');
            expect(background.userData.loader).toBe('texture');
            expect(background.mapping).toBe(EquirectangularReflectionMapping);
            expect(scene.backgroundRotation.y).toBe(1);
            expect(scene.getBackground()).toEqual({
                type: 'image',
                image: 'panorama.jpg',
                rotation: 1,
            });
        });

        it('puts a loaded image on the scene only right before rendering', async () => {
            const scene = createScene();

            await scene.setBackground({ image: 'panorama.jpg', rotation: 1 });
            expect(scene.background).toBeNull();
            expect(scene.backgroundRotation.y).toBe(0);

            render(scene);
            expect((scene.background as Texture).name).toBe('panorama.jpg');
            expect(scene.backgroundRotation.y).toBe(1);
        });

        it('assigns the background only when the image changed', async () => {
            const scene = createScene();
            await scene.setBackground({ image: 'a.jpg' });
            render(scene);
            const shown = scene.background;
            const assigned = vi.fn();
            Object.defineProperty(scene, 'background', {
                get: () => shown,
                set: assigned,
                configurable: true,
            });

            render(scene);

            expect(assigned).not.toHaveBeenCalled();
        });

        it('draws without the background for a pass that asks, then puts it back', async () => {
            const scene = createScene();
            await scene.setBackground({ image: 'a.jpg' });
            render(scene);
            const shown = scene.background;
            const drawn: unknown[] = [];

            scene.withoutBackground(() => {
                render(scene);
                drawn.push(scene.background);
            });

            expect(drawn).toEqual([null]);
            expect(scene.background).toBe(shown);
        });

        it('shows a new image on the first render after such a pass', async () => {
            const scene = createScene();
            const slow = deferred<Texture>();
            loaders.texture.mockImplementationOnce(() => slow.promise);
            const pending = scene.setBackground({ image: 'a.jpg' });
            const loaded = new Texture();
            slow.resolve(loaded);
            await pending;

            scene.withoutBackground(() => render(scene));
            expect(scene.background).toBeNull();

            render(scene);
            expect((scene.background as Texture | null)?.source).toBe(
                loaded.source,
            );
        });

        it('shows a colour', async () => {
            const scene = createScene();

            await scene.setBackground('#ff0000');

            expect((scene.background as Color).getHex()).toBe(0xff0000);
            expect(scene.getBackground()).toEqual({
                type: 'color',
                color: new Color(0xff0000),
            });
        });

        it.each([null, 'transparent'] as const)(
            'is transparent with %s',
            async (value) => {
                const scene = createScene({ background: '#ff0000' });

                await scene.setBackground(value);

                expect(scene.background).toBeNull();
                expect(scene.getBackground()).toBeNull();
            },
        );

        it('rotates an image without loading it again', async () => {
            const scene = createScene();
            await scene.setBackground({ image: 'panorama.jpg' });
            render(scene);
            const texture = scene.background as Texture;
            expect(scene.backgroundRotation.y).toBe(0);

            await scene.setBackground({ image: 'panorama.jpg', rotation: 2 });
            render(scene);

            expect(scene.background).toBe(texture);
            expect(scene.backgroundRotation.y).toBe(2);
            expect(scene.getBackground()).toMatchObject({ rotation: 2 });
            expect(disposals(texture)).toBe(0);
            expect(loaders.texture).toHaveBeenCalledTimes(1);
        });

        it('applies the newest rotation to an image still on its way', async () => {
            const scene = createScene();
            const slow = deferred<Texture>();
            loaders.texture.mockImplementationOnce(() => slow.promise);

            const first = scene.setBackground({ image: 'panorama.jpg' });
            const second = scene.setBackground({
                image: 'panorama.jpg',
                rotation: 2,
            });
            slow.resolve(new Texture());
            await Promise.all([first, second]);
            render(scene);

            expect(scene.backgroundRotation.y).toBe(2);
            expect(loaders.texture).toHaveBeenCalledTimes(1);
        });

        it('keeps the previous background until a new image has loaded', async () => {
            const scene = createScene({ background: '#ff0000' });
            const slow = deferred<Texture>();
            loaders.texture.mockImplementationOnce(() => slow.promise);

            const pending = scene.setBackground({ image: 'panorama.jpg' });
            render(scene);

            expect((scene.background as Color).getHex()).toBe(0xff0000);
            expect(scene.getBackground()).toEqual({
                type: 'image',
                image: 'panorama.jpg',
                rotation: 0,
            });

            const loaded = new Texture();
            slow.resolve(loaded);
            await pending;
            render(scene);

            expect((scene.background as Texture).source).toBe(loaded.source);
        });

        it('lets the last of overlapping images win and disposes the stale one', async () => {
            const scene = createScene();
            const slow = deferred<Texture>();
            loaders.texture.mockImplementationOnce(() => slow.promise);

            const first = scene.setBackground({ image: 'slow.jpg' });
            const second = scene.setBackground({ image: 'fast.jpg' });
            await second;
            const stale = new Texture();
            vi.spyOn(stale, 'dispose');
            slow.resolve(stale);
            await first;
            render(scene);

            expect((scene.background as Texture).name).toBe('fast.jpg');
            expect(disposals(stale)).toBeGreaterThan(0);
        });

        it('lets a later colour win over an image still on its way', async () => {
            const scene = createScene();
            const slow = deferred<Texture>();
            loaders.texture.mockImplementationOnce(() => slow.promise);

            const pending = scene.setBackground({ image: 'panorama.jpg' });
            await scene.setBackground('#00ff00');
            const stale = new Texture();
            vi.spyOn(stale, 'dispose');
            slow.resolve(stale);
            await pending;

            expect((scene.background as Color).getHex()).toBe(0x00ff00);
            expect(disposals(stale)).toBeGreaterThan(0);
        });

        it('lets a later rotation of the shown image win over a pending one', async () => {
            const scene = createScene();
            await scene.setBackground({ image: 'a.jpg' });
            render(scene);
            const shown = scene.background;
            const slow = deferred<Texture>();
            loaders.texture.mockImplementationOnce(() => slow.promise);

            const pending = scene.setBackground({ image: 'b.jpg' });
            await scene.setBackground({ image: 'a.jpg', rotation: 1 });
            slow.resolve(new Texture());
            await pending;
            render(scene);

            expect(scene.background).toBe(shown);
            expect(scene.backgroundRotation.y).toBe(1);
        });

        it('disposes a loaded image on replace and on scene dispose', async () => {
            const scene = createScene();
            await scene.setBackground({ image: 'a.jpg' });
            render(scene);
            const replaced = scene.background as Texture;

            await scene.setBackground({ image: 'b.jpg' });
            render(scene);
            const current = scene.background as Texture;

            expect(disposals(replaced)).toBeGreaterThan(0);
            expect(disposals(current)).toBe(0);

            scene.dispose();

            expect(disposals(current)).toBeGreaterThan(0);
        });

        it('disposes a loaded image when a colour replaces it', async () => {
            const scene = createScene();
            await scene.setBackground({ image: 'a.jpg' });
            render(scene);
            const replaced = scene.background as Texture;

            await scene.setBackground(null);

            expect(disposals(replaced)).toBeGreaterThan(0);
        });

        it('disposes an image that arrives after the scene was disposed', async () => {
            const scene = createScene();
            const slow = deferred<Texture>();
            loaders.texture.mockImplementationOnce(() => slow.promise);
            const pending = scene.setBackground({ image: 'a.jpg' });

            scene.dispose();
            const late = new Texture();
            vi.spyOn(late, 'dispose');
            slow.resolve(late);
            await pending;

            expect(disposals(late)).toBeGreaterThan(0);
        });

        it('disposes an image requested after the scene was disposed', async () => {
            const scene = createScene();
            scene.dispose();

            await scene.setBackground({ image: 'a.jpg' });

            expect(scene.background).toBeNull();
            const [result] = loaders.texture.mock.results;
            expect(disposals(await result.value)).toBeGreaterThan(0);
        });

        it('loads the image with the loader its extension calls for', async () => {
            const scene = createScene();

            await scene.setBackground({ image: 'a.exr' });
            render(scene);

            expect((scene.background as Texture).userData.loader).toBe('exr');
        });

        describe('settings', () => {
            it('is transparent by default', () => {
                const scene = createScene();

                expect(scene.background).toBeNull();
                expect(scene.getBackground()).toBeNull();
            });

            it('takes an image from the settings', async () => {
                const scene = createScene({
                    background: { image: 'panorama.jpg', rotation: 1 },
                });
                await scene.setBackground({
                    image: 'panorama.jpg',
                    rotation: 1,
                });
                render(scene);

                expect((scene.background as Texture).name).toBe('panorama.jpg');
                expect(scene.backgroundRotation.y).toBe(1);
                expect(loaders.texture).toHaveBeenCalledOnce();
            });

            it('still takes the deprecated backgroundColor', () => {
                const scene = createScene({ backgroundColor: '#0000ff' });

                expect((scene.background as Color).getHex()).toBe(0x0000ff);
            });

            it.each([
                ['a colour', '#00ff00', 0x00ff00],
                ['null', null, null],
            ] as const)(
                'prefers background over backgroundColor with %s',
                (_, background, expected) => {
                    const scene = createScene({
                        background,
                        backgroundColor: '#0000ff',
                    });

                    expect(
                        (scene.background as Color | null)?.getHex() ?? null,
                    ).toBe(expected);
                },
            );
        });
    });
});

function deferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((resolver) => {
        resolve = resolver;
    });

    return { promise, resolve };
}
