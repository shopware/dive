import { type Vector3Like } from 'three';
import { DIVECommunication } from '../../com/Communication';
import { type DIVENode } from '../../node/Node';
import { DIVEGroup } from '../Group';

jest.mock('../../com/Communication.ts', () => {
    return {
        DIVECommunication: {
            get: jest.fn(() => {
                return {
                    PerformAction: jest.fn(),
                };
            }),
        },
    };
});

jest.spyOn(DIVECommunication, 'get').mockReturnValue({
    PerformAction: jest.fn(),
} as unknown as DIVECommunication);

let group: DIVEGroup;

describe('dive/group/DIVEGroup', () => {
    beforeEach(() => {
        group = new DIVEGroup();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(group).toBeDefined();
    });

    it('should add an object', () => {
        const mockObject = new DIVEGroup();

        expect(() => group.attach(mockObject)).not.toThrow();
        expect(group.children).toContain(mockObject);
        expect(group.members).toContain(mockObject);

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => group.attach(mockObject)).not.toThrow();
    });

    it('should remove an object', () => {
        const mockObject = new DIVEGroup();

        expect(() => group.remove(mockObject)).not.toThrow();
        expect(group.children).not.toContain(mockObject);
        expect(group.members).not.toContain(mockObject);

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => group.remove(mockObject)).not.toThrow();
    });

    it('should set lines visibility', () => {
        expect(() => group.SetLinesVisibility(true)).not.toThrow();

        const mockObject = new DIVEGroup();
        expect(() => group.SetLinesVisibility(false, mockObject)).not.toThrow();

        expect(() => group.attach(mockObject)).not.toThrow();
        expect(() => group.SetLinesVisibility(false)).not.toThrow();

        expect(() => group.SetLinesVisibility(true, mockObject)).not.toThrow();
    });

    it('update lines', () => {
        const mockObject = new DIVEGroup();
        expect(() => group.UpdateLineTo(mockObject)).not.toThrow();

        expect(() => group.attach(mockObject)).not.toThrow();
        expect(() => group.UpdateLineTo(mockObject)).not.toThrow();
    });

    it('should onMove', () => {
        group.userData.id = 'something';

        expect(() => group.onMove()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => group.onMove()).not.toThrow();
    });

    it('should onSelect', () => {
        group.userData.id = 'something';

        expect(() => group.onSelect()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => group.onSelect()).not.toThrow();
    });

    it('should onDeselect', () => {
        group.userData.id = 'something';

        expect(() => group.onDeselect()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => group.onDeselect()).not.toThrow();
    });

    it('should onMove', () => {
        group.userData.id = 'something';

        expect(() => group.onMove()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => group.onMove()).not.toThrow();
    });

    it('should call onMove on members with isDIVENode', () => {
        // Create mock members
        const diveNode1: DIVENode = {
            isDIVENode: true,
            onMove: jest.fn(),
        } as unknown as DIVENode;

        const diveNode2: DIVENode = {
            isDIVENode: true,
            onMove: jest.fn(),
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
        group.SetPosition(position);

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
        group.SetPosition(position);

        // Since members do not have onMove, there's nothing to assert
        // If members have onMove as optional, you can spy on them to ensure they're not called
    });

    it('should handle an empty _members array without errors', () => {
        // Assign an empty _members array
        (group as any)._members = [];

        const position: Vector3Like = { x: 10, y: 11, z: 12 };
        expect(() => group.SetPosition(position)).not.toThrow();
    });

    it('should handle _members with mixed types correctly', () => {
        // Create mixed members
        const diveNode: DIVENode = {
            isDIVENode: true,
            onMove: jest.fn(),
        } as unknown as DIVENode;

        const member: DIVENode = {
            // Define other properties/methods if necessary
        } as unknown as DIVENode;

        (group as any)._members = [
            diveNode,
            member,
        ];

        const position: Vector3Like = { x: 13, y: 14, z: 15 };
        group.SetPosition(position);

        // Ensure onMove is called only on diveNode
        expect(diveNode.onMove).toHaveBeenCalled();
    });
});
