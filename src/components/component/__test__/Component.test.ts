import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three/webgpu';
import { DIVEComponent, isDIVEComponent } from '../Component.ts';
import { DIVENode } from '../../node/Node.ts';

class TestComponent extends DIVEComponent {
    public attachedTo: DIVENode | null = null;
    public detachedFrom: DIVENode | null = null;
    public disposed = false;

    protected onAttach(owner: DIVENode): void {
        this.attachedTo = owner;
    }

    protected onDetach(previousOwner: DIVENode): void {
        this.detachedFrom = previousOwner;
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
        expect(new TestComponent().owner).toBeNull();
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
        expect(component.owner).toBeNull();
        expect(component.detachedFrom).toBe(node);
    });

    it('should not claim a non-node parent as owner', () => {
        const plain = new Object3D();
        const component = new TestComponent();

        plain.add(component);

        expect(component.owner).toBeNull();
        expect(component.attachedTo).toBeNull();
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
});
