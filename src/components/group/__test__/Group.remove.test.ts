import { Object3D } from 'three/webgpu';
import { DIVEGroup } from '../Group.ts';
import { type DIVESceneObject } from '../../../types/components/DIVESceneObject.ts';

/**
 * Separate from `Group.test.ts` on purpose: that file replaces
 * `Object3D.prototype.remove` with a spy, and these cases are precisely about
 * the real removal behaviour.
 */

const createMember = (): DIVESceneObject =>
    new Object3D() as unknown as DIVESceneObject;

describe('dive/group/DIVEGroup remove', () => {
    let group: DIVEGroup;

    beforeEach(() => {
        group = new DIVEGroup();
    });

    it('should remove a member and its line', () => {
        const member = createMember();
        group.attach(member);

        expect(group.children).toHaveLength(2); // member + line
        expect(group.members).toHaveLength(1);

        group.remove(member);

        expect(group.members).toHaveLength(0);
        expect(group.children).toHaveLength(0);
    });

    it('should remove every argument when called variadically', () => {
        const first = createMember();
        const second = createMember();
        group.attach(first);
        group.attach(second);

        group.remove(first, second);

        expect(group.members).toHaveLength(0);
        expect(group.children).toHaveLength(0);
    });

    it('should remove a non-member child instead of ignoring it', () => {
        const stranger = new Object3D();
        group.add(stranger);

        group.remove(stranger);

        expect(group.children).not.toContain(stranger);
        expect(stranger.parent).toBeNull();
    });

    it('should support clear() across members and lines', () => {
        group.attach(createMember());
        group.attach(createMember());

        expect(group.children).toHaveLength(4); // 2 members + 2 lines

        group.clear();

        expect(group.children).toHaveLength(0);
        expect(group.members).toHaveLength(0);
    });

    it('should let a helper line remove itself from the group', () => {
        group.attach(createMember());

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const line = (group as any)._lines[0] as Object3D;
        expect(group.children).toContain(line);

        line.removeFromParent();

        expect(group.children).not.toContain(line);
        expect(line.parent).toBeNull();
    });

    it('should keep members intact when removing an unrelated object', () => {
        const member = createMember();
        group.attach(member);

        group.remove(new Object3D());

        expect(group.members).toContain(member);
        expect(group.children).toContain(member);
    });
});
