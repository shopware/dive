import { Box3, Color, Euler, Mesh, Object3D, Vector3 } from 'three';
import { DIVEScene } from '../../../scene/Scene';
import { DIVEAROptions } from '../../AR';
import { DIVESceneViewer } from '../SceneViewer';

jest.mock('../../../scene/Scene', () => {
    return {
        DIVEScene: jest.fn(function () {
            this.add = jest.fn();
            this.children = [];
            this.Root = {
                children: [],
            };
            this.traverse = jest.fn((callback) => {
                this.Root.children.forEach((child: Object3D) => {
                    callback(child);
                });
            });
            return this;
        }),
    };
});

jest.mock('three', () => {
    return {
        Vector3: jest.fn(function (
            x: number = 0,
            y: number = 0,
            z: number = 0,
        ) {
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
            };
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
        Euler: jest.fn(function () {
            this.set = jest.fn();
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
            };
            this.add = jest.fn();
            this.sub = jest.fn();
            this.children = [
                {
                    visible: true,
                    material: {
                        color: {},
                    },
                },
            ];
            this.userData = {};
            this.position = new Vector3();
            this.rotation = new Euler();
            this.scale = new Vector3(1, 1, 1);
            this.localToWorld = (vec3: Vector3) => {
                return vec3;
            };
            this.mesh = new Mesh();
            this.traverse = jest.fn((callback) => {
                callback(this.children[0]);
            });
            this.getWorldPosition = jest.fn(() => {
                return new Vector3();
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
        MeshStandardMaterial: jest.fn(function () {
            this.color = new Color();
            this.roughness = 1;
            this.roughnessMap = undefined;
            this.metalness = 0;
            this.metalnessMap = undefined;
            return this;
        }),
        Color: jest.fn(function () {
            this.set = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../../exporters/usdz/USDZExporter', () => {
    return {
        DIVEUSDZExporter: jest.fn().mockImplementation(() => {
            return {
                parse: jest.fn(() => {
                    return Promise.resolve(new Uint8Array());
                }),
            };
        }),
    };
});

URL.createObjectURL = jest.fn(() => 'blob:http://localhost:8080/');

describe('DIVESceneViewer', () => {
    let mockScene: DIVEScene;
    let mockOptions: DIVEAROptions;
    let mockModels: Object3D[];

    beforeEach(() => {
        mockModels = [
            new Object3D(),
            new Object3D(),
            new Object3D(),
        ];
        mockModels[1].userData = {
            uri: 'https://example.com',
        };
        mockScene = new DIVEScene();
        mockOptions = {
            arPlacement: 'horizontal',
            arScale: 'auto',
        } as DIVEAROptions;
    });

    describe('Launch', () => {
        it('should be a function', () => {
            expect(DIVESceneViewer.Launch).toBeInstanceOf(Function);
        });

        it('should not throw without options', () => {
            mockScene.Root.children = mockModels;

            expect(() => {
                DIVESceneViewer.Launch(mockScene);
            }).not.toThrow();
        });

        it('should not throw with options', () => {
            mockScene.Root.children = mockModels;

            expect(() => {
                DIVESceneViewer.Launch(mockScene, mockOptions);
            }).not.toThrow();
        });

        it('should not throw with alternated options', () => {
            mockScene.Root.children = mockModels;

            mockOptions = {
                arPlacement: 'vertical',
                arScale: 'fixed',
            } as DIVEAROptions;

            expect(() => {
                DIVESceneViewer.Launch(mockScene, mockOptions);
            }).not.toThrow();
        });

        it('should throw if no url is found', () => {
            mockScene.Root.children = [
                new Object3D(),
                new Object3D(),
                new Object3D(),
            ];

            expect(() => {
                DIVESceneViewer.Launch(mockScene, mockOptions);
            }).toThrow();
        });
    });
});
