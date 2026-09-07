import { Object3D } from 'three/webgpu';
import { DIVENode } from '../Node.ts';
import { DIVEComponent } from '../../component/Component.ts';

class AlphaComponent extends DIVEComponent {}
class BetaComponent extends DIVEComponent {}
class SpecialAlphaComponent extends AlphaComponent {}

abstract class AbstractBase extends DIVEComponent {}
class ConcreteFromAbstract extends AbstractBase {}

describe('dive/node/DIVENode components', () => {
    let node: DIVENode;

    beforeEach(() => {
        node = new DIVENode();
    });

    describe('addComponent', () => {
        it('should attach the component and return it', () => {
            const component = new AlphaComponent();

            const returned = node.addComponent(component);

            expect(returned).toBe(component);
            expect(node.components).toContain(component);
            expect(node.children).toContain(component);
        });

        it('should use add rather than attach', () => {
            // attach would apply an inverse world matrix, meaningless for a
            // component that has no transform of its own
            node.position.set(5, 5, 5);
            node.updateMatrixWorld(true);
            const component = new AlphaComponent();

            node.addComponent(component);

            expect(component.position.x).toBe(0);
            expect(component.position.y).toBe(0);
        });

        it('should accept multiple components of the same type', () => {
            const first = node.addComponent(new AlphaComponent());
            const second = node.addComponent(new AlphaComponent());

            expect(node.getComponents(AlphaComponent)).toEqual([first, second]);
        });
    });

    describe('removeComponent', () => {
        it('should detach the component', () => {
            const component = node.addComponent(new AlphaComponent());

            node.removeComponent(component);

            expect(node.components).not.toContain(component);
            expect(node.children).not.toContain(component);
        });

        it('should be chainable', () => {
            const component = node.addComponent(new AlphaComponent());

            expect(node.removeComponent(component)).toBe(node);
        });
    });

    describe('registry maintenance', () => {
        it('should track components added with the raw three api', () => {
            const component = new AlphaComponent();

            node.add(component);

            expect(node.components).toContain(component);
        });

        it('should untrack components removed with removeFromParent', () => {
            const component = node.addComponent(new AlphaComponent());

            component.removeFromParent();

            expect(node.components).not.toContain(component);
        });

        it('should untrack components stolen by another node', () => {
            const other = new DIVENode();
            const component = node.addComponent(new AlphaComponent());

            other.add(component);

            expect(node.components).not.toContain(component);
            expect(other.components).toContain(component);
        });

        it('should not track plain children as components', () => {
            node.add(new Object3D());

            expect(node.components).toHaveLength(0);
        });
    });

    describe('getComponent', () => {
        it('should find a component by its exact type', () => {
            const component = node.addComponent(new AlphaComponent());
            node.addComponent(new BetaComponent());

            expect(node.getComponent(AlphaComponent)).toBe(component);
        });

        it('should return undefined when absent', () => {
            expect(node.getComponent(AlphaComponent)).toBeUndefined();
        });

        it('should find a subclass through its base class', () => {
            // this is what lets one code path serve both MeshComponent and
            // PrimitiveMeshComponent
            const component = node.addComponent(new SpecialAlphaComponent());

            expect(node.getComponent(AlphaComponent)).toBe(component);
        });

        it('should find a concrete component through an abstract base', () => {
            const component = node.addComponent(new ConcreteFromAbstract());

            expect(node.getComponent(AbstractBase)).toBe(component);
        });
    });

    describe('getComponents', () => {
        it('should return every match', () => {
            const first = node.addComponent(new AlphaComponent());
            const second = node.addComponent(new SpecialAlphaComponent());
            node.addComponent(new BetaComponent());

            expect(node.getComponents(AlphaComponent)).toEqual([first, second]);
        });

        it('should return an empty array when none match', () => {
            expect(node.getComponents(AlphaComponent)).toEqual([]);
        });
    });

    describe('requireComponent', () => {
        it('should return the component when present', () => {
            const component = node.addComponent(new AlphaComponent());

            expect(node.requireComponent(AlphaComponent)).toBe(component);
        });

        it('should throw a named error when absent', () => {
            node.name = 'MyNode';

            expect(() => node.requireComponent(AlphaComponent)).toThrow(
                /has no AlphaComponent attached/,
            );
            expect(() => node.requireComponent(AlphaComponent)).toThrow(
                /MyNode/,
            );
        });
    });

    describe('nodes', () => {
        it('should report child nodes only', () => {
            const child = new DIVENode();
            node.add(child);
            node.addComponent(new AlphaComponent());
            node.add(new Object3D());

            expect(node.nodes).toEqual([child]);
        });

        it('should be empty for a leaf node', () => {
            node.addComponent(new AlphaComponent());

            expect(node.nodes).toEqual([]);
        });

        it('should stay correct after direct children assignment', () => {
            // gizmo code and several tests assign `children` directly, which
            // bypasses three's events -- an uncached getter cannot go stale
            const child = new DIVENode();
            node.children = [child, new AlphaComponent()];

            expect(node.nodes).toEqual([child]);
        });
    });

    describe('clear', () => {
        it('should remove child nodes but keep components', () => {
            const component = node.addComponent(new AlphaComponent());
            const child = new DIVENode();
            node.add(child, new Object3D());

            node.clear();

            expect(node.components).toContain(component);
            expect(node.children).toContain(component);
            expect(node.children).not.toContain(child);
        });

        it('should be chainable', () => {
            expect(node.clear()).toBe(node);
        });

        it('should leave a node holding only components untouched', () => {
            node.addComponent(new AlphaComponent());

            node.clear();

            expect(node.children).toHaveLength(1);
        });
    });

    describe('copy', () => {
        it('should not duplicate components', () => {
            const source = new DIVENode();
            source.addComponent(new AlphaComponent());

            const target = new DIVENode();
            target.addComponent(new AlphaComponent());
            target.copy(source);

            expect(target.getComponents(AlphaComponent)).toHaveLength(1);
        });

        it('should copy child nodes', () => {
            const source = new DIVENode();
            source.add(new DIVENode());

            const target = new DIVENode();
            target.copy(source);

            expect(target.nodes).toHaveLength(1);
        });

        it('should skip children when not recursive', () => {
            const source = new DIVENode();
            source.add(new DIVENode());

            const target = new DIVENode();
            target.copy(source, false);

            expect(target.children).toHaveLength(0);
        });

        it('should not throw when cloning a node with components', () => {
            node.addComponent(new AlphaComponent());

            expect(() => node.clone()).not.toThrow();
        });
    });
});
