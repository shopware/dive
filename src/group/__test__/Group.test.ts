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

const gltf = {
    scene: {
        isMesh: true,
        isObject3D: true,
        parent: null,
        dispatchEvent: jest.fn(),
        layers: {
            mask: 0,
        },
        material: {},
        updateWorldMatrix: jest.fn(),
        children: [
            {
                castShadow: false,
                receiveShadow: false,
                layers: {
                    mask: 0,
                },
                children: [],
                updateWorldMatrix: jest.fn(),
                isMesh: true,
            },
        ],
        traverse: function (callback: (object: object) => void) {
            callback(this);
        },
        removeFromParent: jest.fn(),
    },
} as unknown as GLTF;

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

        expect(() => group.AddObject(mockObject)).not.toThrow();
        expect(group.AddObject(mockObject)).toBe(group);
    });
});