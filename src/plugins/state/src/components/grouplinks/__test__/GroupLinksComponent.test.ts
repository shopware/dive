import { describe, expect, it } from 'vitest';
import { Object3D, type LineDashedMaterial } from 'three/webgpu';
import { DIVENode, MultiLineComponent } from '@shopware-ag/dive';
import { GroupLinksComponent } from '../GroupLinksComponent.ts';

const setup = (): {
    group: DIVENode;
    links: GroupLinksComponent;
    member: Object3D;
} => {
    const group = new DIVENode();
    const links = group.addComponent(new GroupLinksComponent());
    const member = new Object3D();
    group.add(member);
    return { group, links, member };
};

describe('plugins/state/GroupLinksComponent', () => {
    describe('lookup', () => {
        it('should be found as itself and as a line component', () => {
            const { group, links } = setup();

            expect(group.getComponent(GroupLinksComponent)).toBe(links);
            expect(group.getComponent(MultiLineComponent)).toBe(links);
        });

        it('should not be found on a node with a plain line component', () => {
            const node = new DIVENode();
            node.addComponent(new MultiLineComponent());

            expect(node.getComponent(GroupLinksComponent)).toBeUndefined();
        });

        it('should stay a links component when cloned', () => {
            expect(new GroupLinksComponent().clone()).toBeInstanceOf(
                GroupLinksComponent,
            );
        });
    });

    describe('look', () => {
        it('should draw dashed links', () => {
            const material = new GroupLinksComponent().lines
                .material as LineDashedMaterial;

            expect(material.dashSize).toBe(0.05);
            expect(material.gapSize).toBe(0.025);
        });
    });

    describe('updateLinkFor', () => {
        it('should draw from the origin to the member', () => {
            const { links, member } = setup();
            member.position.set(1, 2, 3);

            links.updateLinkFor(member);

            const position = links.lines.geometry.getAttribute('position');
            expect(links.lineCount).toBe(1);
            expect([
                position.getX(0),
                position.getY(0),
                position.getZ(0),
            ]).toEqual([0, 0, 0]);
            expect([
                position.getX(1),
                position.getY(1),
                position.getZ(1),
            ]).toEqual([1, 2, 3]);
        });

        it('should move the link instead of adding one', () => {
            const { links, member } = setup();

            links.updateLinkFor(member);
            member.position.set(4, 0, 0);
            links.updateLinkFor(member);

            expect(links.lineCount).toBe(1);
            expect(links.lines.geometry.getAttribute('position').getX(1)).toBe(
                4,
            );
        });
    });

    describe('members leaving', () => {
        it('should drop the link when the member is removed', () => {
            const { links, member } = setup();
            links.updateLinkFor(member);

            member.removeFromParent();

            expect(links.hasLineFor(member)).toBe(false);
        });

        it('should keep the links of the members that stayed', () => {
            const { group, links, member } = setup();
            const staying = new Object3D();
            group.add(staying);
            links.updateLinkFor(member);
            links.updateLinkFor(staying);

            new Object3D().attach(member);

            expect(links.hasLineFor(member)).toBe(false);
            expect(links.hasLineFor(staying)).toBe(true);
        });

        it('should stop listening once detached', () => {
            const { group, links, member } = setup();
            links.updateLinkFor(member);

            group.removeComponent(links);
            member.removeFromParent();

            expect(links.hasLineFor(member)).toBe(true);
        });

        it('should listen on its new owner after a move', () => {
            const { group, links } = setup();
            const other = new DIVENode();
            const member = new Object3D();
            other.add(member);

            other.addComponent(links);
            links.updateLinkFor(member);
            group.add(member);

            expect(links.hasLineFor(member)).toBe(false);
        });
    });
});
