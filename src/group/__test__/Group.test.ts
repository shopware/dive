import { DIVECommunication } from "../../com/Communication";
import { DIVEGroup } from "../Group";

jest.mock('../../com/Communication.ts', () => {
    return {
        DIVECommunication: {
            get: jest.fn(() => {
                return {
                    PerformAction: jest.fn(),
                }
            }),
        },
    }
});

jest.spyOn(DIVECommunication, 'get').mockReturnValue({ PerformAction: jest.fn() } as unknown as DIVECommunication);

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

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => group.attach(mockObject)).not.toThrow();
    });

    it('should remove an object', () => {
        const mockObject = new DIVEGroup();

        expect(() => group.remove(mockObject)).not.toThrow();
        expect(group.children).not.toContain(mockObject);

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
});