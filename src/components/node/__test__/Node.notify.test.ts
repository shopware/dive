import { Object3D } from 'three/webgpu';
import { DIVENode } from '../Node.ts';
import { DIVEComponent } from '../../component/Component.ts';
import { MultiLineComponent } from '../../line/MultiLineComponent.ts';

class WatchingComponent extends DIVEComponent {
    public moved: DIVENode[] = [];

    public onChildNodeTransform(node: DIVENode): void {
        this.moved.push(node);
    }
}

class DeafComponent extends DIVEComponent {}

describe('dive/node/DIVENode transform notification', () => {
    let parent: DIVENode;
    let child: DIVENode;
    let watcher: WatchingComponent;

    beforeEach(() => {
        parent = new DIVENode();
        watcher = parent.addComponent(new WatchingComponent());
        child = new DIVENode();
        parent.add(child);
    });

    it('should notify the parent components on setPosition', () => {
        child.setPosition({ x: 1, y: 2, z: 3 });

        expect(watcher.moved).toEqual([child]);
    });

    it('should notify on setRotation', () => {
        child.setRotation({ x: 0, y: 1, z: 0 });

        expect(watcher.moved).toEqual([child]);
    });

    it('should notify on setScale', () => {
        child.setScale({ x: 2, y: 2, z: 2 });

        expect(watcher.moved).toEqual([child]);
    });

    it('should tolerate components that do not implement the hook', () => {
        parent.addComponent(new DeafComponent());

        expect(() => child.setScale({ x: 1, y: 1, z: 1 })).not.toThrow();
    });

    it('should not notify when the node has no parent', () => {
        const orphan = new DIVENode();

        // setPosition takes the no-parent branch and keeps the world position
        expect(() => orphan.setPosition({ x: 1, y: 1, z: 1 })).not.toThrow();
        expect(orphan.position.x).toBe(1);
    });

    it('should not notify when the parent is not a node', () => {
        const plain = new Object3D();
        const lonely = new DIVENode();
        plain.add(lonely);

        expect(() => lonely.setRotation({ x: 1, y: 0, z: 0 })).not.toThrow();
    });

    it('should let a link component follow a member', () => {
        const group = new DIVENode();
        const links = group.addComponent(new MultiLineComponent());
        const member = new DIVENode();
        group.add(member);
        const updateLineTo = vi.spyOn(links, 'updateLineTo');

        member.setPosition({ x: 3, y: 0, z: 0 });

        expect(updateLineTo).toHaveBeenCalledWith(member);
    });
});
