import { type GLTF } from "three/examples/jsm/loaders/GLTFLoader";
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

    it('should set position', () => {
        expect(() => group.SetPosition({ x: 0, y: 0, z: 0 })).not.toThrow();
    });

    it('should set rotation', () => {
        expect(() => group.SetRotation({ x: 0, y: 0, z: 0 })).not.toThrow();
    });

    it('should set scale', () => {
        expect(() => group.SetScale({ x: 1, y: 1, z: 1 })).not.toThrow();
    });

    it('should set visibility', () => {
        expect(() => group.SetVisibility(true)).not.toThrow();
    });

    it('should set bounding box visibility', () => {
        expect(() => group.SetBoundingBoxVisibility(true)).not.toThrow();
    });

    it('should add an object', () => {
        const mockObject = new DIVEGroup();

        expect(() => group.attach(mockObject)).not.toThrow();
        expect(group.children).toContain(mockObject);
    });

    it('should remove an object', () => {
        const mockObject = new DIVEGroup();

        expect(() => group.remove(mockObject)).not.toThrow();
        expect(group.children).not.toContain(mockObject);
    });
});