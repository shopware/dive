import { Line, Object3D } from 'three/webgpu';
import { MemberLinksComponent } from '../MemberLinksComponent.ts';
import { DIVENode } from '../../node/Node.ts';
import { HELPER_LAYER_MASK } from '../../../constants/VisibilityLayerMask.ts';

describe('dive/group/MemberLinksComponent', () => {
    let group: DIVENode;
    let links: MemberLinksComponent;

    beforeEach(() => {
        group = new DIVENode();
        links = group.addComponent(new MemberLinksComponent());
    });

    const addMember = (x = 1): DIVENode => {
        const member = new DIVENode();
        member.position.set(x, 0, 0);
        group.add(member);
        return member;
    };

    it('should draw a link for each child node', () => {
        addMember();
        addMember(2);

        expect(links.children).toHaveLength(2);
        expect(links.children[0]).toBeInstanceOf(Line);
    });

    it('should keep its links on the helper layer', () => {
        addMember();

        // helper geometry must not count towards bounds, exports or picking
        expect(links.children[0].layers.mask).toBe(HELPER_LAYER_MASK);
    });

    it('should not link plain children', () => {
        group.add(new Object3D());

        expect(links.children).toHaveLength(0);
    });

    it('should not link other components', () => {
        group.addComponent(new MemberLinksComponent());

        expect(links.children).toHaveLength(0);
    });

    it('should drop the link when a member leaves', () => {
        const member = addMember();

        member.removeFromParent();

        expect(links.children).toHaveLength(0);
    });

    it('should link members that were already present when attached', () => {
        const late = new DIVENode();
        const other = new DIVENode();
        late.add(other);

        const lateLinks = late.addComponent(new MemberLinksComponent());

        expect(lateLinks.children).toHaveLength(1);
    });

    it('should follow a member that moves', () => {
        const member = addMember();
        const line = links.children[0] as Line;
        const before = line.geometry.attributes.position.array.slice();

        member.setPosition({ x: 9, y: 0, z: 0 });

        expect(line.geometry.attributes.position.array).not.toEqual(before);
    });

    it('should ignore updateLinkTo for a non-member', () => {
        expect(() => links.updateLinkTo(new Object3D())).not.toThrow();
    });

    it('should hide and show every link', () => {
        addMember();
        addMember(2);

        links.setVisible(false);
        expect(links.children.every((line) => !line.visible)).toBe(true);

        links.setVisible(true);
        expect(links.children.every((line) => line.visible)).toBe(true);
    });

    it('should hide a single link', () => {
        const first = addMember();
        addMember(2);

        links.setVisible(false, first);

        expect(links.children[0].visible).toBe(false);
        expect(links.children[1].visible).toBe(true);
    });

    it('should ignore a single-link change for a non-member', () => {
        expect(() => links.setVisible(false, new Object3D())).not.toThrow();
    });

    it('should apply the current visibility to links added later', () => {
        links.setVisible(false);

        addMember();

        expect(links.children[0].visible).toBe(false);
    });

    it('should drop every link when detached', () => {
        addMember();

        group.removeComponent(links);

        expect(links.children).toHaveLength(0);
    });

    it('should stop tracking the old owner after being moved', () => {
        addMember();
        const other = new DIVENode();

        other.addComponent(links);
        addMember(5);

        // the new owner has no children, and the old owner's member is gone
        expect(links.children).toHaveLength(0);
    });

    it('should dispose its lines', () => {
        addMember();
        const line = links.children[0] as Line;
        const geometry = vi.spyOn(line.geometry, 'dispose');

        links.dispose();

        expect(geometry).toHaveBeenCalled();
        expect(links.children).toHaveLength(0);
    });
});
