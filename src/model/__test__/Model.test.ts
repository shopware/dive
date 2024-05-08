import Model from '../Model';
import DIVECommunication from '../../com/Communication';
import { GLTF } from 'three/examples/jsm/Addons';

jest.mock('three', () => {
    return {
        Vector3: jest.fn(function (x: number, y: number, z: number) {
            return { x, y, z };
        }),
        Object3D: jest.fn(function () {
            this.clear = jest.fn();
            this.color = {};
            this.intensity = 0;
            this.layers = {
                mask: 0,
            };
            this.shadow = {
                radius: 0,
                mapSize: { width: 0, height: 0 },
                bias: 0,
                camera: {
                    near: 0,
                    far: 0,
                    fov: 0,
                },
            }
            this.add = jest.fn();
            this.children = [{
                material: {
                    color: {},
                },
            }];
            this.userData = {};
            this.position = {
                x: 0,
                y: 0,
                z: 0,
                set: jest.fn(),
            };
            this.rotation = {
                x: 0,
                y: 0,
                z: 0,
                setFromVector3: jest.fn(),
            };
            this.scale = {
                x: 1,
                y: 1,
                z: 1,
                set: jest.fn(),
            };
            return this;
        }),
        Box3: jest.fn(function () {
            this.min = { x: 0, y: 0, z: 0 };
            this.expandByObject = jest.fn();
            return this;
        }),
    }
});

jest.mock('../../com/Communication.ts', () => {
    return {
        get: jest.fn(() => {
            return {
                PerformAction: jest.fn(),
            }
        }),
    }
});

const gltf = {
    scene: {
        isObject3D: true,
        parent: null,
        dispatchEvent: jest.fn(),
        layers: {
            mask: 0,
        },
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
            },
        ],
        traverse: function (callback: (object: object) => void) {
            callback(this);
        },
        removeFromParent: jest.fn(),
    },
} as unknown as GLTF;

jest.spyOn(DIVECommunication, 'get').mockReturnValue({ PerformAction: jest.fn() } as unknown as DIVECommunication);

describe('dive/model/DIVEModel', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        const model = new Model();
        expect(model).toBeDefined();
    });

    it('should set model', () => {
        const model = new Model();
        expect(() => model.SetModel(gltf)).not.toThrow();
    });

    it('should set position', () => {
        const model = new Model();
        expect(() => model.SetPosition({ x: 0, y: 0, z: 0 })).not.toThrow();
    });

    it('should set rotation', () => {
        const model = new Model();
        expect(() => model.SetRotation({ x: 0, y: 0, z: 0 })).not.toThrow();
    });

    it('should set scale', () => {
        const model = new Model();
        expect(() => model.SetScale({ x: 1, y: 1, z: 1 })).not.toThrow();
    });

    it('should set to world origin', () => {
        const model = new Model();
        model.userData.id = 'something';

        expect(() => model.SetToWorldOrigin()).not.toThrow();
        expect(model.position.x).toBe(0);
        expect(model.position.y).toBe(0);
        expect(model.position.z).toBe(0);

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => model.SetToWorldOrigin()).not.toThrow();
    });

    it('should place on floor', () => {
        const model = new Model();
        model.userData.id = 'something';

        expect(() => model.PlaceOnFloor()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => model.PlaceOnFloor()).not.toThrow();
    });

    it('should onMove', () => {
        const model = new Model();
        model.userData.id = 'something';

        expect(() => model.onMove()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => model.onMove()).not.toThrow();
    });
});