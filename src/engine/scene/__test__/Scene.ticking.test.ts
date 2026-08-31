import { DIVEScene } from '../Scene.ts';
import { DIVENode } from '../../node/Node.ts';
import { DIVEComponent } from '../../component/Component.ts';

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

describe('dive/engine/scene/DIVEScene ticking', () => {
    let scene: DIVEScene;

    beforeEach(() => {
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
