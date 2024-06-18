import Model from '../Model';
import DIVECommunication from '../../com/Communication';
import { GLTF } from 'three/examples/jsm/Addons';
import DIVEScene from '../../scene/Scene';
import { Vector3, Box3, Mesh } from 'three';

const intersectObjectsMock = jest.fn();

jest.mock('three', () => {
    return {
        Vector3: jest.fn(function (x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.copy = (vec3: Vector3) => {
                this.x = vec3.x;
                this.y = vec3.y;
                this.z = vec3.z;
                return this;
            };
            this.set = (x: number, y: number, z: number) => {
                this.x = x;
                this.y = y;
                this.z = z;
                return this;
            };
            this.multiply = (vec3: Vector3) => {
                this.x *= vec3.x;
                this.y *= vec3.y;
                this.z *= vec3.z;
                return this;
            };
            this.clone = () => {
                return new Vector3(this.x, this.y, this.z);
            };
            this.setY = (y: number) => {
                this.y = y;
                return this;
            }
            this.add = (vec3: Vector3) => {
                this.x += vec3.x;
                this.y += vec3.y;
                this.z += vec3.z;
                return this;
            };
            return this;
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
            this.position = new Vector3();
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
            this.localToWorld = (vec3: Vector3) => {
                return vec3;
            };
            this.mesh = new Mesh();
            return this;
        }),
        Box3: jest.fn(function () {
            this.min = new Vector3(Infinity, Infinity, Infinity);
            this.max = new Vector3(-Infinity, -Infinity, -Infinity);
            this.getCenter = jest.fn(() => {
                return new Vector3(0, 0, 0);
            });
            this.expandByObject = jest.fn();

            return this;
        }),
        Raycaster: jest.fn(function () {
            this.intersectObjects = intersectObjectsMock;
            this.layers = {
                mask: 0,
            };
            return this;
        }),
        Mesh: jest.fn(function () {
            this.geometry = {
                computeBoundingBox: jest.fn(),
                boundingBox: new Box3(),
            };
            this.material = {};
            this.castShadow = true;
            this.receiveShadow = true;
            this.layers = {
                mask: 0,
            };
            this.updateWorldMatrix = jest.fn();
            this.traverse = jest.fn();
            this.removeFromParent = jest.fn();
            this.localToWorld = (vec3: Vector3) => {
                return vec3;
            };
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

    it('should drop it', () => {
        const comMock = {
            PerformAction: jest.fn(),
        } as unknown as DIVECommunication;
        jest.spyOn(DIVECommunication, 'get').mockReturnValue(comMock);

        const size = {
            x: 1,
            y: 1,
            z: 1,
        };

        const model = new Model();
        model.userData.id = 'something';
        model.position.set(0, 4, 0);
        model['boundingBox'] = {
            min: new Vector3(-size.x / 2, -size.y / 2, -size.z / 2),
            max: new Vector3(size.x / 2, size.y / 2, size.z / 2),
            getCenter: jest.fn(() => {
                return new Vector3(0, 0, 0);
            }),
        } as unknown as Box3;


        const hitObject = new Mesh();
        hitObject.geometry.boundingBox = new Box3();
        hitObject.geometry.boundingBox.max = new Vector3(0, 2, 0);
        intersectObjectsMock.mockReturnValue([{
            object: hitObject,

        }]);

        const scene = {
            parent: null,
            Root: {
                children: [
                    model,
                ],
            },
        } as unknown as DIVEScene;
        scene.Root.parent = scene;

        // test when parent is not set
        console.warn = jest.fn();
        expect(() => model.DropIt()).not.toThrow();
        expect(console.warn).toHaveBeenCalledTimes(1);

        model.parent = scene.Root;

        expect(() => model.DropIt()).not.toThrow();
        expect(model.position.y).toBe(1.5);
        expect(comMock.PerformAction).toHaveBeenCalledTimes(1);

        expect(() => model.DropIt()).not.toThrow();
        expect(comMock.PerformAction).toHaveBeenCalledTimes(1);

        // reset for PerformAction to be called again
        model.position.y = 2;
        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => model.DropIt()).not.toThrow();
        expect(comMock.PerformAction).toHaveBeenCalledTimes(1);


    });

    it('should onMove', () => {
        const model = new Model();
        model.userData.id = 'something';

        expect(() => model.onMove()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => model.onMove()).not.toThrow();
    });
});