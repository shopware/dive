import { DIVEPrimitive } from '../Primitive';
import DIVECommunication from '../../com/Communication';
import { GLTF } from 'three/examples/jsm/Addons';
import DIVEScene from '../../scene/Scene';
import { Vector3, Box3, Mesh, BufferGeometry } from 'three';

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
            this.sub = (vec3: Vector3) => {
                this.x -= vec3.x;
                this.y -= vec3.y;
                this.z -= vec3.z;
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
            this.sub = jest.fn();
            this.children = [{
                visible: true,
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
            this.traverse = jest.fn((callback) => {
                callback(this.children[0])
            });
            return this;
        }),
        Box3: jest.fn(function () {
            this.min = new Vector3(Infinity, Infinity, Infinity);
            this.max = new Vector3(-Infinity, -Infinity, -Infinity);
            this.getCenter = jest.fn(() => {
                return new Vector3(0, 0, 0);
            });
            this.expandByObject = jest.fn();
            this.setFromObject = jest.fn();

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
        BufferGeometry: jest.fn(function () {
            return {};
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

jest.spyOn(DIVECommunication, 'get').mockReturnValue({ PerformAction: jest.fn() } as unknown as DIVECommunication);

let primitive: DIVEPrimitive;

describe('dive/primitive/DIVEPrimitive', () => {
    beforeEach(() => {
        primitive = new DIVEPrimitive();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(primitive).toBeDefined();
    });

    it('should set geometry', () => {
        const bufferGeometry = new BufferGeometry();
        expect(() => primitive.SetBufferGeometry(bufferGeometry)).not.toThrow();
    });

    it('should set position', () => {
        expect(() => primitive.SetPosition({ x: 0, y: 0, z: 0 })).not.toThrow();
    });

    it('should set rotation', () => {
        expect(() => primitive.SetRotation({ x: 0, y: 0, z: 0 })).not.toThrow();
    });

    it('should set scale', () => {
        expect(() => primitive.SetScale({ x: 1, y: 1, z: 1 })).not.toThrow();
    });

    it('should set visibility', () => {
        const model = new DIVEPrimitive();
        expect(() => model.SetVisibility(true)).not.toThrow();
    });

    it('should set to world origin', () => {
        const model = new DIVEPrimitive();
        model.userData.id = 'something';

        expect(() => model.SetToWorldOrigin()).not.toThrow();
        expect(model.position.x).toBe(0);
        expect(model.position.y).toBe(0);
        expect(model.position.z).toBe(0);

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => model.SetToWorldOrigin()).not.toThrow();
    });

    it('should place on floor', () => {
        const model = new DIVEPrimitive();
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

        const model = new DIVEPrimitive();
        model.userData.id = 'something';
        model.position.set(0, 4, 0);
        model['_boundingBox'] = {
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
        expect(model.position.y).toBe(2.5);
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
        const model = new DIVEPrimitive();
        model.userData.id = 'something';

        expect(() => model.onMove()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => model.onMove()).not.toThrow();
    });

    it('should onSelect', () => {
        const testLight = new DIVEPrimitive();
        testLight.userData.id = 'something';

        expect(() => testLight.onSelect()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => testLight.onSelect()).not.toThrow();
    });

    it('should onDeselect', () => {
        const testLight = new DIVEPrimitive();
        testLight.userData.id = 'something';

        expect(() => testLight.onDeselect()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => testLight.onDeselect()).not.toThrow();
    });
});