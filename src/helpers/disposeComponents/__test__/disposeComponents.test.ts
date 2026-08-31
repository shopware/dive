import { Object3D } from 'three/webgpu';
import { disposeComponents } from '../disposeComponents.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { DIVEComponent } from '../../../engine/component/Component.ts';

class Disposable extends DIVEComponent {
    public disposed = 0;

    public dispose(): void {
        this.disposed++;
    }
}

describe('dive/helpers/disposeComponents', () => {
    it('should free the components of the object itself', () => {
        const node = new DIVENode();
        const component = node.addComponent(new Disposable());

        disposeComponents(node);

        expect(component.disposed).toBe(1);
    });

    it('should free every component on a node', () => {
        const node = new DIVENode();
        const first = node.addComponent(new Disposable());
        const second = node.addComponent(new Disposable());

        disposeComponents(node);

        expect(first.disposed).toBe(1);
        expect(second.disposed).toBe(1);
    });

    it('should reach through objects that are not nodes', () => {
        // components are not in the graph, so what the traversal finds is nodes
        const root = new Object3D();
        const wrapper = new Object3D();
        const node = new DIVENode();
        const component = node.addComponent(new Disposable());
        wrapper.add(node);
        root.add(wrapper);

        disposeComponents(root);

        expect(component.disposed).toBe(1);
    });

    it('should unparent nothing', () => {
        // removing an object and freeing what it holds are separate questions
        const parent = new DIVENode();
        const node = new DIVENode();
        node.addComponent(new Disposable());
        parent.add(node);

        disposeComponents(parent);

        expect(node.parent).toBe(parent);
    });

    it('should cope with an object holding no components at all', () => {
        expect(() => disposeComponents(new Object3D())).not.toThrow();
    });
});
