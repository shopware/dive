import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three/webgpu';
import { componentOf, DIVEComponent, isDIVEComponent } from '../Component.ts';
import { DIVENode } from '../../node/Node.ts';

class TestComponent extends DIVEComponent {
    public attachedTo: DIVENode | null = null;
    public detachedFrom: DIVENode | null = null;
    public disposed = false;

    /** Where its content sat when the hooks ran, to pin the ordering. */
    public contentParentOnAttach: Object3D | null | undefined;
    public contentParentOnDetach: Object3D | null | undefined;

    /** `contribute` is protected; tests drive it through this. */
    public give(...objects: Object3D[]): void {
        this.contribute(...objects);
    }

    public takeBack(...objects: Object3D[]): void {
        this.withdraw(...objects);
    }

    protected onAttach(owner: DIVENode): void {
        this.attachedTo = owner;
        this.contentParentOnAttach = this.contributions[0]?.parent;
    }

    protected onDetach(previousOwner: DIVENode): void {
        this.detachedFrom = previousOwner;
        this.contentParentOnDetach = this.contributions[0]?.parent;
    }

    public dispose(): void {
        this.disposed = true;
    }
}

class TickingComponent extends DIVEComponent {
    public ticks = 0;
    public lastDelta = 0;

    public tick(deltaTime: number): void {
        this.ticks++;
        this.lastDelta = deltaTime;
    }
}

describe('dive/component/DIVEComponent', () => {
    it('should carry the component brand', () => {
        const component = new TestComponent();

        expect(component.isDIVEComponent).toBe(true);
        expect(isDIVEComponent(component)).toBe(true);
        expect(isDIVEComponent(new Object3D())).toBe(false);
    });

    it('should not declare capability brands', () => {
        const component = new TestComponent();

        // A component carrying isSelectable/isMovable would terminate the
        // findInterface walk and be selected instead of the node behind it.
        expect('isSelectable' in component).toBe(false);
        expect('isMovable' in component).toBe(false);
        expect('isDIVENode' in component).toBe(false);
    });

    it('should disable automatic matrix updates', () => {
        // a component sits at its owner's transform, so the local matrix is
        // identity and composing it every frame is wasted work
        expect(new TestComponent().matrixAutoUpdate).toBe(false);
    });

    it('should start without an owner', () => {
        expect(new TestComponent().isAttached).toBe(false);
    });

    it('should refuse to hand out an owner it does not have', () => {
        // rather than a null every consumer would have to rule out
        expect(() => new TestComponent().owner).toThrow(
            /TestComponent is not attached to a node/,
        );
    });

    it('should report its owner once attached', () => {
        const node = new DIVENode();
        const component = new TestComponent();

        node.addComponent(component);

        expect(component.owner).toBe(node);
        expect(component.attachedTo).toBe(node);
    });

    it('should receive onDetach with the previous owner', () => {
        const node = new DIVENode();
        const component = new TestComponent();
        node.addComponent(component);

        node.removeComponent(component);

        // three clears `parent` before dispatching `removed`, hence the argument
        expect(component.isAttached).toBe(false);
        expect(component.detachedFrom).toBe(node);
    });

    it('should not claim a non-node parent as owner', () => {
        const plain = new Object3D();
        const component = new TestComponent();

        plain.add(component);

        expect(component.isAttached).toBe(false);
        expect(component.attachedTo).toBeNull();
    });

    it('should not report a detach it never attached for', () => {
        // three fires `removed` whatever the parent was, so leaving a plain
        // Object3D reaches the handler with no owner to report
        const plain = new Object3D();
        const component = new TestComponent();
        plain.add(component);

        plain.remove(component);

        expect(component.detachedFrom).toBeNull();
    });

    it('should re-target its owner when moved between nodes', () => {
        const first = new DIVENode();
        const second = new DIVENode();
        const component = new TestComponent();

        first.addComponent(component);
        second.addComponent(component);

        expect(component.owner).toBe(second);
        expect(component.detachedFrom).toBe(first);
        expect(first.components).not.toContain(component);
        expect(second.components).toContain(component);
    });

    it('should survive removal while never attached', () => {
        const component = new TestComponent();

        expect(() => component.removeFromParent()).not.toThrow();
        expect(component.detachedFrom).toBeNull();
    });

    it('should default to a no-op dispose', () => {
        class Bare extends DIVEComponent {}

        expect(() => new Bare().dispose()).not.toThrow();
    });

    it('should default the base lifecycle hooks to no-ops', () => {
        class Bare extends DIVEComponent {
            public callHooks(node: DIVENode): void {
                this['onAttach'](node);
                this['onDetach'](node);
            }
        }
        const node = new DIVENode();

        expect(() => new Bare().callHooks(node)).not.toThrow();
    });

    it('should be constructible with no arguments so clone works', () => {
        // Object3D.clone() calls new this.constructor()
        const component = new TestComponent();

        expect(() => component.clone()).not.toThrow();
    });

    describe('tickEnabled', () => {
        it('should default to enabled', () => {
            expect(new TickingComponent().tickEnabled).toBe(true);
        });

        it('should reflect setTickEnabled', () => {
            const component = new TickingComponent();

            component.setTickEnabled(false);
            expect(component.tickEnabled).toBe(false);

            component.setTickEnabled(true);
            expect(component.tickEnabled).toBe(true);
        });

        it('should ignore a redundant change', () => {
            const component = new TickingComponent();
            const node = new DIVENode();
            node.addComponent(component);
            const refresh = vi.spyOn(node, 'refreshComponentTick');

            component.setTickEnabled(true);

            expect(refresh).not.toHaveBeenCalled();
        });

        it('should notify its owner about a real change', () => {
            const component = new TickingComponent();
            const node = new DIVENode();
            node.addComponent(component);
            const refresh = vi.spyOn(node, 'refreshComponentTick');

            component.setTickEnabled(false);

            expect(refresh).toHaveBeenCalledWith(component);
        });

        it('should tolerate being toggled while detached', () => {
            const component = new TickingComponent();

            expect(() => component.setTickEnabled(false)).not.toThrow();
            expect(component.tickEnabled).toBe(false);
        });
    });

    it('should render its own geometry as a child of the node', () => {
        // the whole point of extending Object3D: the component's content is in
        // the scene graph, which is what three builds the render list from
        const node = new DIVENode();
        const component = new TestComponent();
        const mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial());
        component.add(mesh);

        node.addComponent(component);

        expect(node.children).toContain(component);
        expect(component.children).toContain(mesh);
    });

    describe('contributing content', () => {
        const content = (name = 'content'): Mesh => {
            const mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial());
            mesh.name = name;
            return mesh;
        };

        it('should put content into the node, not into itself', () => {
            // `children` is three's render queue, so the content has to be in the
            // graph -- but the component holding it does not, and an exporter
            // writes every graph node it walks
            const node = new DIVENode();
            const component = node.addComponent(new TestComponent());
            const mesh = content();

            component.give(mesh);

            expect(node.children).toContain(mesh);
            expect(component.children).not.toContain(mesh);
        });

        it('should hold content contributed before it had an owner', () => {
            // the normal case: a component builds its renderable in its
            // constructor, long before anyone attaches it
            const component = new TestComponent();
            const mesh = content();

            component.give(mesh);

            expect(component.contributions).toEqual([mesh]);
            expect(mesh.parent).toBeNull();
        });

        it('should hand that content over on attach', () => {
            const component = new TestComponent();
            const mesh = content();
            component.give(mesh);
            const node = new DIVENode();

            node.addComponent(component);

            expect(node.children).toContain(mesh);
        });

        it('should take its content along to another node', () => {
            const first = new DIVENode();
            const component = first.addComponent(new TestComponent());
            const mesh = content();
            component.give(mesh);
            const second = new DIVENode();

            second.addComponent(component);

            expect(second.children).toContain(mesh);
            expect(first.children).not.toContain(mesh);
        });

        it('should leave nothing behind when detached', () => {
            const node = new DIVENode();
            const component = node.addComponent(new TestComponent());
            const mesh = content();
            component.give(mesh);

            node.removeComponent(component);

            expect(node.children).not.toContain(mesh);
            expect(component.contributions).toEqual([mesh]);
        });

        it('should ignore a repeated contribution', () => {
            // a duplicate would send a spurious childremoved/childadded pair
            // through the node -- the events the group-line listener hangs on
            const node = new DIVENode();
            const component = node.addComponent(new TestComponent());
            const mesh = content();

            component.give(mesh);
            component.give(mesh);

            expect(component.contributions).toEqual([mesh]);
            expect(
                node.children.filter((child) => child === mesh),
            ).toHaveLength(1);
        });

        it('should withdraw only what it contributed', () => {
            const node = new DIVENode();
            const component = node.addComponent(new TestComponent());
            const mine = content('mine');
            const foreign = content('foreign');
            component.give(mine);
            node.add(foreign);

            component.takeBack(mine, foreign);

            expect(node.children).not.toContain(mine);
            expect(node.children).toContain(foreign);
        });

        it('should withdraw while detached', () => {
            const component = new TestComponent();
            const mesh = content();
            component.give(mesh);

            component.takeBack(mesh);

            expect(component.contributions).toEqual([]);
        });

        it('should not re-add content it withdrew', () => {
            const component = new TestComponent();
            const mesh = content();
            component.give(mesh);
            component.takeBack(mesh);

            new DIVENode().addComponent(component);

            expect(mesh.parent).toBeNull();
        });

        it('should show the hooks their content in place', () => {
            // attach adds before onAttach, detach removes after onDetach -- so a
            // hook never sees a half-moved component
            const node = new DIVENode();
            const component = new TestComponent();
            component.give(content());

            node.addComponent(component);
            expect(component.contentParentOnAttach).toBe(node);

            node.removeComponent(component);
            expect(component.contentParentOnDetach).toBe(node);
        });

        it('should say which component contributed an object', () => {
            const node = new DIVENode();
            const component = node.addComponent(new TestComponent());
            const mesh = content();
            component.give(mesh);

            expect(componentOf(mesh)).toBe(component);
            expect(componentOf(new Object3D())).toBeUndefined();
        });

        it('should survive a node whose children were replaced wholesale', () => {
            // the gizmo does this, and Node.test.ts pins it as supported: the
            // list is not the truth, so re-attaching heals it
            const node = new DIVENode();
            const component = node.addComponent(new TestComponent());
            const mesh = content();
            component.give(mesh);

            node.children = [component];
            new DIVENode().addComponent(component);

            expect(component.owner.children).toContain(mesh);
        });
    });

    describe('a node holding contributed content', () => {
        const content = (): Mesh =>
            new Mesh(new BoxGeometry(), new MeshBasicMaterial());

        it('should keep it through clear()', () => {
            // clear() means "drop the child nodes", not "strip the geometry"
            const node = new DIVENode();
            const component = node.addComponent(new TestComponent());
            const mesh = content();
            component.give(mesh);
            node.add(new DIVENode());

            node.clear();

            expect(node.children).toContain(mesh);
            expect(node.nodes).toHaveLength(0);
        });

        it('should not clone it', () => {
            // a clone would hold ownerless geometry beside a fresh, unaware
            // component
            const source = new DIVENode();
            source.addComponent(new TestComponent()).give(content());

            const copy = source.clone();

            expect(copy.children).toHaveLength(0);
        });
    });
});
