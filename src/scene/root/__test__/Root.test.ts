import { DIVERoot } from '../Root';
import { type COMPrimitive, type COMLight, type COMModel, type COMPov, type COMEntity, type COMGeometry, COMGroup } from '../../../com/types';
import { type DIVEScene } from '../../Scene';
import { DIVECommunication } from '../../../com/Communication';
import { type DIVESceneObject } from '../../../types';
import { Vector3, Mesh, Box3, Object3D } from 'three';

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
            this.isObject3D = true;
            this.clear = jest.fn();
            this.color = {};
            this.intensity = 0;
            this.layers = {
                mask: 0,
            };
            this.userData = {};
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
            this.attach = jest.fn();
            this.remove = jest.fn();
            this.sub = jest.fn();
            this.children = [{
                visible: true,
                material: {
                    color: {},
                },
                userData: {

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
                callback(this);
                callback(this.children[0]);
            });
            this.parent = {
                parent: null,
            };
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
            this.intersectObjects = jest.fn();
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
            this.translate = jest.fn();
            return this;
        }),
        CylinderGeometry: jest.fn(function () {
            this.translate = jest.fn();
            return this;
        }),
        SphereGeometry: jest.fn(function () {
            this.translate = jest.fn();
            return this;
        }),
        BoxGeometry: jest.fn(function () {
            this.translate = jest.fn();
            return this;
        }),
        ConeGeometry: jest.fn(function () {
            this.rotateY = jest.fn();
            this.translate = jest.fn();
            return this;
        }),
        Float32BufferAttribute: jest.fn(function () {
            return this;
        }),
        Uint32BufferAttribute: jest.fn(function () {
            return this;
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

jest.mock('../../../com/Communication.ts', () => {
    return {
        DIVECommunication: {
            get: jest.fn(() => {
                return {
                    PerformAction: jest.fn(),
                }
            }),
        }
    };
});

const mock_LoadGLTF = jest.fn().mockResolvedValue({});
jest.mock('../../../loadingmanager/LoadingManager.ts', () => {
    return {
        DIVELoadingManager: jest.fn(function () {
            this.LoadGLTF = mock_LoadGLTF;
            return this;
        })
    };
});

jest.mock('../../../primitive/floor/Floor', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.removeFromParent = jest.fn();
        this.updateMatrixWorld = jest.fn();
        return this;
    });
});

jest.mock('../../../grid/Grid', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.removeFromParent = jest.fn();
        this.updateMatrixWorld = jest.fn();
        return this;
    });
});

jest.mock('../../../light/AmbientLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.parent = {
            attach: jest.fn(),
        };
        this.attach = jest.fn();
        this.applyMatrix4 = jest.fn();
        this.updateWorldMatrix = jest.fn();
        this.children = [];
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../light/PointLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.parent = {
            attach: jest.fn(),
        };
        this.attach = jest.fn();
        this.applyMatrix4 = jest.fn();
        this.updateWorldMatrix = jest.fn();
        this.children = [];
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../light/SceneLight.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.parent = {
            attach: jest.fn(),
        };
        this.attach = jest.fn();
        this.applyMatrix4 = jest.fn();
        this.updateWorldMatrix = jest.fn();
        this.children = [];
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../../../model/Model.ts', () => {
    return {
        DIVEModel: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.parent = {
                attach: jest.fn(),
            };
            this.attach = jest.fn();
            this.applyMatrix4 = jest.fn();
            this.updateWorldMatrix = jest.fn();
            this.children = [];
            this.SetModel = jest.fn();
            this.SetPosition = jest.fn();
            this.SetRotation = jest.fn();
            this.SetScale = jest.fn();
            this.SetVisibility = jest.fn();
            this.SetMaterial = jest.fn();
            this.PlaceOnFloor = jest.fn();
            this.removeFromParent = jest.fn();
            return this;
        })
    };
});

jest.mock('../../../primitive/Primitive.ts', () => {
    return {
        DIVEPrimitive: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.parent = {
                attach: jest.fn(),
            };
            this.attach = jest.fn();
            this.applyMatrix4 = jest.fn();
            this.updateWorldMatrix = jest.fn();
            this.children = [];
            this.SetGeometry = jest.fn();
            this.SetMaterial = jest.fn();
            this.SetPosition = jest.fn();
            this.SetRotation = jest.fn();
            this.SetScale = jest.fn();
            this.SetVisibility = jest.fn();
            this.PlaceOnFloor = jest.fn();
            this.removeFromParent = jest.fn();
            return this;
        })
    };
});

jest.mock('../../../group/Group.ts', () => {
    return {
        DIVEGroup: jest.fn(function () {
            this.isDIVEGroup = true;
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.parent = {
                attach: jest.fn(),
            };
            this.attach = jest.fn();
            this.applyMatrix4 = jest.fn();
            this.updateWorldMatrix = jest.fn();
            this.children = [];
            this.SetGeometry = jest.fn();
            this.SetMaterial = jest.fn();
            this.SetPosition = jest.fn();
            this.SetRotation = jest.fn();
            this.SetScale = jest.fn();
            this.SetVisibility = jest.fn();
            this.SetBoundingBoxVisibility = jest.fn();
            this.PlaceOnFloor = jest.fn();
            this.removeFromParent = jest.fn();
            return this;
        })
    };
});

let root: DIVERoot;

jest.spyOn(console, 'warn').mockImplementation(() => { });

describe('DIVE/scene/root/DIVERoot', () => {
    beforeEach(() => {
        root = new DIVERoot();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should instantiate', () => {
        expect(root).toBeDefined();
    });

    it('should ComputeSceneBB', () => {
        const bb = root.ComputeSceneBB();
        expect(bb).toBeDefined();
    });

    it('should get scene object', async () => {
        root.children = [{
            userData: {
                id: 'different_id',
            }
        }] as unknown as DIVESceneObject[];
        expect(root.GetSceneObject({ id: 'test_id' })).toBeUndefined();

        expect(() => root.AddSceneObject({
            id: 'test_id',
            name: 'test',
            entityType: 'primitive',
            position: { x: 1, y: 2, z: 3 },
            rotation: { x: 1, y: 2, z: 3 },
            scale: { x: 1, y: 2, z: 3 },
            geometry: {} as COMGeometry,
            visible: true,
            parent: null,
        })).not.toThrow();
        root.children = [{
            userData: {
                id: 'test_id',
            }
        }] as unknown as DIVESceneObject[];
        expect(root.GetSceneObject({ id: 'test_id' })).toBeDefined();
    });

    it('should add object', () => {
        expect(() => root.AddSceneObject({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();

        expect(() => root.AddSceneObject({ id: 'id', name: 'light', entityType: 'light', visible: true } as COMLight)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id_scene', name: 'light', entityType: 'light', visible: true, type: 'scene' } as COMLight)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id_ambient', name: 'light', entityType: 'light', visible: true, type: 'ambient' } as COMLight)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id_point', name: 'light', entityType: 'light', visible: true, type: 'point', position: { x: 0, y: 0, z: 0 }, intensity: 1, enabled: false, color: 0xffffff, parent: { id: 'id' } } as COMLight)).not.toThrow();


        expect(() => root.AddSceneObject({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id_uri0', name: 'model', entityType: 'model', visible: true, uri: 'uri', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }, material: {}, parent: { id: 'id' } } as COMModel)).not.toThrow();
        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => root.AddSceneObject({ id: 'id_uri1', name: 'model', entityType: 'model', visible: true, uri: 'uri', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }, material: {} } as COMModel)).not.toThrow();

        expect(() => root.AddSceneObject({ id: 'id0', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id1', name: 'primitive', entityType: 'primitive', visible: true, material: {}, parent: { id: 'id' } } as COMPrimitive)).not.toThrow();

        expect(() => root.AddSceneObject({ id: 'id0', name: 'Group', entityType: 'group', visible: true } as COMGroup)).not.toThrow();
        expect(() => root.AddSceneObject({ id: 'id0', name: 'Group', entityType: 'group', visible: true, position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }, bbVisible: true, parent: { id: 'id' } } as COMGroup)).not.toThrow();
    });

    it('should update object', () => {
        root.children = [
            {
                userData: {
                    id: 'id',
                },
                SetVisibility: jest.fn(),
                parent: root,
                children: [],
            } as unknown as Object3D,
            {
                userData: {
                    id: 'id_groupparent',
                },
                AddObject: jest.fn(),
                parent: root,
                children: [],
            } as unknown as Object3D,
            {
                userData: {
                    id: 'id_modelparent',
                },
                attach: jest.fn(),
                parent: root,
                children: [],
            } as unknown as Object3D,
            {
                userData: {
                    id: 'id_groupchild',
                },
                SetVisibility: jest.fn(),
                parent: {
                    isDIVEGroup: true,
                    RemoveObject: jest.fn(),
                },
                children: [],
            } as unknown as Object3D
        ];
        expect(() => root.UpdateSceneObject({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id', name: 'light', entityType: 'light', visible: true } as COMLight)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id', name: 'group', entityType: 'group', visible: true } as COMGroup)).not.toThrow();

        expect(() => root.AddSceneObject({ id: 'id_groupparent', name: 'Group', entityType: 'group' } as COMGroup)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id_groupchild', name: 'group', entityType: 'group', parent: { id: 'id_groupparent' } } as COMGroup)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id_groupchild', name: 'group', entityType: 'group', parent: null } as COMGroup)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id_groupchild', name: 'group', entityType: 'group', parent: { id: 'id_modelparent' } } as COMGroup)).not.toThrow();
        expect(() => root.UpdateSceneObject({ id: 'id_groupchild', name: 'group', entityType: 'group', parent: { id: 'does_not_exist' } } as COMGroup)).not.toThrow();
    });

    it('should delete object', () => {
        const sceneParent = {
            parent: null,
            remove: jest.fn(),
            children: [
                {
                    isTransformControls: true,
                    detach: jest.fn(),
                }
            ],
        }
        root.parent = sceneParent as unknown as DIVEScene;

        root.children = [
            {
                userData: {
                    id: 'id',
                },
                SetVisibility: jest.fn(),
                parent: root,
                children: [],
            } as unknown as Object3D
        ];

        expect(() => root.DeleteSceneObject({ id: 'does_not_exist', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();

        expect(() => root.DeleteSceneObject({ id: 'does_not_exist', name: 'light', entityType: 'light', visible: true, type: 'scene' } as COMLight)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'light', entityType: 'light', visible: true, type: 'scene' } as COMLight)).not.toThrow();

        expect(() => root.DeleteSceneObject({ id: 'does_not_exist', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();

        expect(() => root.DeleteSceneObject({ id: 'does_not_exist', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();

        expect(() => root.DeleteSceneObject({ id: 'does_not_exist', name: 'group', entityType: 'group', visible: true } as COMGroup)).not.toThrow();
        expect(() => root.DeleteSceneObject({ id: 'id', name: 'group', entityType: 'group', visible: true } as COMGroup)).not.toThrow();

        const firstFind = root.GetSceneObject({ id: 'id' });
        jest.spyOn(root, 'GetSceneObject')
            .mockReturnValueOnce({
                ...firstFind,
                parent: sceneParent,
                children: [{
                    isObject3D: true,
                }],
            } as unknown as DIVESceneObject)

        expect(() => root.DeleteSceneObject({ id: 'id', name: 'group', entityType: 'group', visible: true } as COMGroup)).not.toThrow();
    });

    it('should place object on floor', () => {
        root.children = [
            {
                userData: {
                    id: 'id',
                },
                SetVisibility: jest.fn(),
                PlaceOnFloor: jest.fn(),
                parent: root,
                children: [],
            } as unknown as Object3D
        ];

        expect(() => root.PlaceOnFloor({ id: 'does_not_exist', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'pov', entityType: 'pov', visible: true } as COMPov)).not.toThrow();

        expect(() => root.PlaceOnFloor({ id: 'does_not_exist', name: 'light', entityType: 'light', visible: true } as COMLight)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'light', entityType: 'light', visible: true } as COMLight)).not.toThrow();

        expect(() => root.PlaceOnFloor({ id: 'does_not_exist', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'model', entityType: 'model', visible: true } as COMModel)).not.toThrow();

        expect(() => root.PlaceOnFloor({ id: 'does_not_exist', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
        expect(() => root.PlaceOnFloor({ id: 'id', name: 'primitive', entityType: 'primitive', visible: true } as COMPrimitive)).not.toThrow();
    });
});
