import { DIVEPrimitive } from '../Primitive';
import DIVECommunication from '../../com/Communication';
import { Vector3, Box3, Mesh, type Texture, type MeshStandardMaterial } from 'three';
import type DIVEScene from '../../scene/Scene';
import { type COMMaterial, type COMGeometry } from '../../com/types';

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
            this.setAttribute = jest.fn();
            this.setIndex = jest.fn();
            return this;
        }),
        CylinderGeometry: jest.fn(function () {
            return {};
        }),
        SphereGeometry: jest.fn(function () {
            return {};
        }),
        BoxGeometry: jest.fn(function () {
            return {};
        }),
        ConeGeometry: jest.fn(function () {
            return {};
        }),
        Float32BufferAttribute: jest.fn(function () {
            return {};
        }),
        Uint32BufferAttribute: jest.fn(function () {
            return {};
        }),
        MeshStandardMaterial: jest.fn(function () {
            this.color = {};
            this.roughness = 0;
            this.roughnessMap = undefined;
            this.metalness = 0;
            this.metalnessMap = undefined;
            return this;
        }),
        Color: jest.fn(function () {
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
        const bufferGeometry = {} as COMGeometry;
        expect(() => primitive.SetGeometry(bufferGeometry)).not.toThrow();
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
        expect(() => primitive.SetVisibility(true)).not.toThrow();
    });

    it('should set to world origin', () => {
        primitive.userData.id = 'something';

        expect(() => primitive.SetToWorldOrigin()).not.toThrow();
        expect(primitive.position.x).toBe(0);
        expect(primitive.position.y).toBe(0);
        expect(primitive.position.z).toBe(0);

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => primitive.SetToWorldOrigin()).not.toThrow();
    });

    it('should place on floor', () => {
        primitive.userData.id = 'something';

        expect(() => primitive.PlaceOnFloor()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => primitive.PlaceOnFloor()).not.toThrow();
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

        primitive.userData.id = 'something';
        primitive.position.set(0, 4, 0);
        primitive['_boundingBox'] = {
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
                    primitive,
                ],
            },
        } as unknown as DIVEScene;
        scene.Root.parent = scene;

        // test when parent is not set
        console.warn = jest.fn();
        expect(() => primitive.DropIt()).not.toThrow();
        expect(console.warn).toHaveBeenCalledTimes(1);

        primitive.parent = scene.Root;

        expect(() => primitive.DropIt()).not.toThrow();
        expect(primitive.position.y).toBe(2.5);
        expect(comMock.PerformAction).toHaveBeenCalledTimes(1);

        expect(() => primitive.DropIt()).not.toThrow();
        expect(comMock.PerformAction).toHaveBeenCalledTimes(1);

        // reset for PerformAction to be called again
        primitive.position.y = 2;
        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => primitive.DropIt()).not.toThrow();
        expect(comMock.PerformAction).toHaveBeenCalledTimes(1);


    });

    it('should onMove', () => {
        primitive.userData.id = 'something';

        expect(() => primitive.onMove()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => primitive.onMove()).not.toThrow();
    });

    it('should onSelect', () => {
        primitive.userData.id = 'something';

        expect(() => primitive.onSelect()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => primitive.onSelect()).not.toThrow();
    });

    it('should onDeselect', () => {
        primitive.userData.id = 'something';

        expect(() => primitive.onDeselect()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => primitive.onDeselect()).not.toThrow();
    });

    it('should set geometry', () => {
        primitive.userData.id = 'something';

        // cylinder
        const cylinder = {
            name: 'cylinder',
            width: 1,
            height: 1.5,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(cylinder)).not.toThrow();

        // sphere
        const sphere = {
            name: 'sphere',
            width: 1,
            height: 1,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(sphere)).not.toThrow();

        // pyramid
        const pyramid = {
            name: 'pyramid',
            width: 1,
            height: 1.5,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(pyramid)).not.toThrow();

        // box
        const box = {
            name: 'box',
            width: 1,
            height: 1,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(box)).not.toThrow();

        // cone
        const cone = {
            name: 'cone',
            width: 1,
            height: 1.5,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(cone)).not.toThrow();

        // wall
        const wall = {
            name: 'wall',
            width: 1,
            height: 1.5,
            depth: 0.1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(wall)).not.toThrow();

        // plane
        const plane = {
            name: 'plane',
            width: 1,
            height: 0.1,
            depth: 1,
        } as COMGeometry;
        expect(() => primitive.SetGeometry(plane)).not.toThrow();
    });

    it('should set material', () => {
        const material = (primitive['_mesh'].material as MeshStandardMaterial);

        // apply invalid material should not crash
        expect(() => primitive.SetMaterial({} as COMMaterial)).not.toThrow();
        expect(material).toBeDefined();

        expect(() => primitive.SetMaterial({
            color: 0xffffff,
            roughness: 0,
            metalness: 1,
        } as COMMaterial)).not.toThrow();
        expect(material.roughness).toBe(0);
        expect(material.roughnessMap).toBeNull();
        expect(material.metalness).toBe(1);
        expect(material.metalnessMap).toBeNull();

        expect(() => primitive.SetMaterial({
            color: 0xff00ff,
            roughness: 0,
            roughnessMap: 'this is a Texture' as unknown as Texture,
            metalness: 1,
            metalnessMap: 'this is a Texture' as unknown as Texture,
        } as COMMaterial)).not.toThrow();
        expect(material.roughness).toBe(1);
        expect(material.roughnessMap).toBeDefined();
        expect(material.metalness).toBe(0);
        expect(material.metalnessMap).toBeDefined();
    });
});