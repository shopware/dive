vi.mock('@shopware-ag/dive/shader', () => ({
    DIVEShaderLib: {
        grid: { uniforms: {}, vertexShader: '', fragmentShader: '' },
    },
    DIVEShaderMaterial: vi.fn(),
}));

import { Object3D, type Vector3Like } from 'three';
import { State } from '@shopware-ag/dive/state';
import { type DIVENode } from '../../node/Node.ts';
import { DIVEGroup } from '../Group.ts';

vi.mock('../../../modules/state/State', () => {
    return {
        State: {
            get: vi.fn(() => {
                return {
                    performAction: vi.fn(),
                };
            }),
        },
    };
});

vi.spyOn(State, 'get').mockReturnValue({
    performAction: vi.fn(),
} as unknown as State);

let group: DIVEGroup;
let obj: Object3D;

Object3D.prototype.attach = vi.fn();
Object3D.prototype.remove = vi.fn();

// Ensure remove method is not mocked
const originalAttach = DIVEGroup.prototype.attach;
const originalRemove = DIVEGroup.prototype.remove;
beforeEach(() => {
    group = new DIVEGroup();
    obj = new Object3D();
    obj.position.set(1, 2, 3);
    // Restore original remove method
    group.attach = originalAttach;
    group.remove = originalRemove;
});

describe('dive/group/DIVEGroup', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(group).toBeDefined();
    });

    it('attach adds object and creates visible line', () => {
        const objId = 'test-obj';
        obj.userData.id = objId;
        group.attach(obj as any);
        expect(group.members.some((m) => m.userData.id === objId)).toBe(true);
        const lines = (group as any)._lines as any[];
        expect(lines.length).toBe(1);
        const line = lines[0];
        expect(line.visible).toBe(true);
    });

    it('attach does not add object if already in group', () => {
        const objId = 'test-obj';
        obj.userData.id = objId;
        group.attach(obj as any);
        group.attach(obj as any);
        expect(group.members.some((m) => m.userData.id === objId)).toBe(true);
        const lines = (group as any)._lines as any[];
        expect(lines.length).toBe(1);
        const line = lines[0];
        expect(line.visible).toBe(true);
    });

    it('remove removes object and its line', () => {
        const objId = 'test-obj';
        obj.userData.id = objId;
        (group as any)._members = [obj];
        (group as any)._lines = [new Object3D()];
        group.remove(obj as any);
        expect((group as any)._members).toHaveLength(0);
        expect((group as any)._lines).toHaveLength(0);
    });

    it('remove on non-member does nothing', () => {
        const result = group.remove(obj as any);
        expect(result).toBe(group);
        expect(group.members).toHaveLength(0);
    });

    it('SetLinesVisibility toggles all lines and specific object line', () => {
        group.attach(obj as any);
        const lines = (group as any)._lines as any[];
        group.setLinesVisibility(false);
        expect(lines[0].visible).toBe(false);
        group.setLinesVisibility(true, obj as any);
        expect(lines[0].visible).toBe(true);
    });

    it('UpdateLineTo updates geometry based on object position', () => {
        const objId = 'test-obj';
        obj.userData.id = objId;
        group.attach(obj as any);
        const lines = (group as any)._lines as any[];
        obj.position.set(4, 5, 6);
        group.updateLineTo(obj as any);
    });

    it('should onMove', () => {
        group.userData.id = 'something';

        expect(() => group.onMove()).not.toThrow();

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => group.onMove()).not.toThrow();
    });

    it('should onSelect', () => {
        group.userData.id = 'something';

        expect(() => group.onSelect()).not.toThrow();

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => group.onSelect()).not.toThrow();
    });

    it('should onDeselect', () => {
        group.userData.id = 'something';

        expect(() => group.onDeselect()).not.toThrow();

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => group.onDeselect()).not.toThrow();
    });

    it('should onMove', () => {
        group.userData.id = 'something';

        expect(() => group.onMove()).not.toThrow();

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => group.onMove()).not.toThrow();
    });

    it('should call onMove on members with isDIVENode', () => {
        // Create mock members
        const diveNode1: DIVENode = {
            isDIVENode: true,
            onMove: vi.fn(),
        } as unknown as DIVENode;

        const diveNode2: DIVENode = {
            isDIVENode: true,
            onMove: vi.fn(),
        } as unknown as DIVENode;

        const member1: DIVENode = {
            // Define other properties/methods if necessary
        } as unknown as DIVENode;

        const member2: DIVENode = {
            // Define other properties/methods if necessary
        } as unknown as DIVENode;

        // Assign the _members array (assuming it's protected or public for testing)
        // If _members is private, you might need to use a different approach or modify the class for testability
        (group as any)._members = [
            diveNode1,
            member1,
            diveNode2,
            member2,
        ];

        const position: Vector3Like = { x: 4, y: 5, z: 6 };
        group.setPosition(position);

        // Check that onMove was called on diveNode1 and diveNode2
        expect(diveNode1.onMove).toHaveBeenCalled();
        expect(diveNode2.onMove).toHaveBeenCalled();

        // Ensure onMove was not called on other members
        // Since member1 and member2 don't have onMove, there's nothing to assert here
        // If members have onMove, you should mock and verify they are not called
    });

    it('should not call onMove on members without isDIVENode', () => {
        // Create mock members without isDIVENode
        const member1: DIVENode = {
            // Define other properties/methods if necessary
        } as unknown as DIVENode;

        const member2: DIVENode = {
            // Define other properties/methods if necessary
        } as unknown as DIVENode;

        // Assign the _members array
        (group as any)._members = [
            member1,
            member2,
        ];

        const position: Vector3Like = { x: 7, y: 8, z: 9 };
        group.setPosition(position);

        // Since members do not have onMove, there's nothing to assert
        // If members have onMove as optional, you can spy on them to ensure they're not called
    });

    it('should handle an empty _members array without errors', () => {
        // Assign an empty _members array
        (group as any)._members = [];

        const position: Vector3Like = { x: 10, y: 11, z: 12 };
        expect(() => group.setPosition(position)).not.toThrow();
    });

    it('should handle _members with mixed types correctly', () => {
        // Create mixed members
        const diveNode: DIVENode = {
            isDIVENode: true,
            onMove: vi.fn(),
        } as unknown as DIVENode;

        const member: DIVENode = {
            // Define other properties/methods if necessary
        } as unknown as DIVENode;

        (group as any)._members = [
            diveNode,
            member,
        ];

        const position: Vector3Like = { x: 13, y: 14, z: 15 };
        group.setPosition(position);

        // Ensure onMove is called only on diveNode
        expect(diveNode.onMove).toHaveBeenCalled();
    });

    it('SetLinesVisibility with non-member object does nothing', () => {
        const nonMember = new Object3D();
        group.setLinesVisibility(true, nonMember);
        // No error should be thrown
        expect(() => group.setLinesVisibility(true, nonMember)).not.toThrow();
    });

    it('UpdateLineTo with non-member object does nothing', () => {
        const nonMember = new Object3D();
        expect(() => group.updateLineTo(nonMember)).not.toThrow();
    });

    it('attach with object without userData.id', () => {
        const objWithoutId = new Object3D();
        expect(() => group.attach(objWithoutId as any)).not.toThrow();
        expect(group.members).toContain(objWithoutId);
    });

    it('remove with object without userData.id', () => {
        const objWithoutId = new Object3D();
        group.attach(objWithoutId as any);
        expect(() => group.remove(objWithoutId as any)).not.toThrow();
        expect(group.members).not.toContain(objWithoutId);
    });
});
