import { Object3D } from 'three/webgpu';
import { GroupLinksComponent } from '../GroupLinksComponent.ts';
import { MultiLineComponent } from '../../line/MultiLineComponent.ts';
import { DIVENode } from '../../node/Node.ts';

/**
 * Tests the wiring only: which members get a line and when it is refreshed. How
 * a line is drawn belongs to `MultiLineComponent` and is tested there.
 */

describe('dive/group/GroupLinksComponent', () => {
    let group: DIVENode;
    let links: GroupLinksComponent;

    beforeEach(() => {
        group = new DIVENode();
        links = group.addComponent(new GroupLinksComponent());
    });

    const addMember = (x = 1): DIVENode => {
        const member = new DIVENode();
        member.position.set(x, 0, 0);
        group.add(member);
        return member;
    };

    describe('composition', () => {
        it('should bring its own line component along', () => {
            expect(links.lines).toBeInstanceOf(MultiLineComponent);
            expect(group.getComponent(MultiLineComponent)).toBe(links.lines);
        });

        it('should adopt an existing line component instead of adding one', () => {
            const node = new DIVENode();
            const existing = node.addComponent(new MultiLineComponent());

            const wiring = node.addComponent(new GroupLinksComponent());

            expect(wiring.lines).toBe(existing);
            expect(node.getComponents(MultiLineComponent)).toHaveLength(1);
        });

        it('should leave an adopted line component behind on detach', () => {
            const node = new DIVENode();
            const existing = node.addComponent(new MultiLineComponent());
            const wiring = node.addComponent(new GroupLinksComponent());

            node.removeComponent(wiring);

            expect(node.getComponent(MultiLineComponent)).toBe(existing);
        });

        it('should take its own line component with it on detach', () => {
            group.removeComponent(links);

            expect(group.getComponent(MultiLineComponent)).toBeUndefined();
        });
    });

    describe('membership', () => {
        it('should add a line for each child node', () => {
            addMember(1);
            addMember(2);

            expect(links.linkCount).toBe(2);
            expect(links.lines!.lineCount).toBe(2);
        });

        it('should ignore plain children', () => {
            group.add(new Object3D());

            expect(links.linkCount).toBe(0);
        });

        it('should ignore other components', () => {
            group.addComponent(new GroupLinksComponent());

            expect(links.linkCount).toBe(0);
        });

        it('should drop the line when a member leaves', () => {
            const member = addMember();

            member.removeFromParent();

            expect(links.linkCount).toBe(0);
            expect(links.lines!.lineCount).toBe(0);
        });

        it('should link members that were already present when attached', () => {
            const node = new DIVENode();
            node.add(new DIVENode());

            const wiring = node.addComponent(new GroupLinksComponent());

            expect(wiring.linkCount).toBe(1);
        });

        it('should drop every line on detach', () => {
            addMember(1);
            addMember(2);

            group.removeComponent(links);

            expect(links.linkCount).toBe(0);
        });

        it('should stop tracking the old owner after being moved', () => {
            addMember(1);
            const other = new DIVENode();

            other.addComponent(links);
            addMember(5);

            expect(links.linkCount).toBe(0);
        });
    });

    describe('updates', () => {
        it('should refresh the line when a member moves', () => {
            const member = addMember(1);
            const setLine = vi.spyOn(links.lines!, 'setLine');

            member.setPosition({ x: 9, y: 0, z: 0 });

            expect(setLine).toHaveBeenCalledWith(
                expect.any(Number),
                expect.objectContaining({ x: 0, y: 0, z: 0 }),
                expect.objectContaining({ x: 9 }),
            );
        });

        it('should run the line from the owner origin to the member', () => {
            addMember(3);

            const array = links.lines!.lines.geometry.attributes.position
                .array as Float32Array;
            expect(Array.from(array.slice(0, 6))).toEqual([0, 0, 0, 3, 0, 0]);
        });

        it('should use owner-local coordinates, not world', () => {
            // world points would be transformed a second time by the owner
            group.position.set(100, 0, 0);
            group.updateMatrixWorld(true);
            addMember(2);

            const array = links.lines!.lines.geometry.attributes.position
                .array as Float32Array;
            expect(Array.from(array.slice(3, 6))).toEqual([2, 0, 0]);
        });

        it('should ignore updateLineTo for a non-member', () => {
            expect(() => links.updateLineTo(new Object3D())).not.toThrow();
        });
    });

    describe('visibility', () => {
        it('should hide and show every link', () => {
            addMember();

            links.setVisible(false);
            expect(links.lines!.lines.visible).toBe(false);

            links.setVisible(true);
            expect(links.lines!.lines.visible).toBe(true);
        });

        it('should hide a single link', () => {
            const first = addMember(1);
            addMember(2);
            const setLineVisible = vi.spyOn(links.lines!, 'setLineVisible');

            links.setVisible(false, first);

            expect(setLineVisible).toHaveBeenCalledWith(
                expect.any(Number),
                false,
            );
        });

        it('should ignore a single-link change for a non-member', () => {
            expect(() => links.setVisible(false, new Object3D())).not.toThrow();
        });
    });
});
