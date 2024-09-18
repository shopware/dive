import DIVESceneLight from '../SceneLight';
import { DIVECommunication } from '../../com/Communication';
import { Color, HemisphereLight as THREEHemisphereLight, DirectionalLight as THREEDirectionalLight, Object3D } from 'three';

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

const mockAdd = jest.fn();

jest.mock('three', () => {
    return {
        Color: jest.fn(function () {
            return {};
        }),
        PointLight: jest.fn(function () {
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
            this.add = mockAdd;
            this.children = [{
                material: {
                    color: {},
                },
            }];
            this.userData = {};
            return this;
        }),
        SphereGeometry: jest.fn(function () {
            return this;
        }),
        MeshBasicMaterial: jest.fn(function () {
            return this;
        }),
        Mesh: jest.fn(function () {
            this.layers = {
                mask: 0,
            };
            return this;
        }),
        Object3D: jest.fn(function () {
            this.children = [];
            this.add = (obj: Object3D) => {
                this.children.push(obj);
            };
            return this;
        }),
        HemisphereLight: jest.fn(function () {
            this.visible = true;
            this.layers = {
                mask: 0,
            };
            this.position = {
                set: jest.fn(),
            };
            this.removeFromParent = mockAdd;
            return this;
        }),
        DirectionalLight: jest.fn(function () {
            this.visible = true;
            this.layers = {
                mask: 0,
            };
            this.position = {
                set: jest.fn(),
                multiplyScalar: jest.fn(),
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
            this.removeFromParent = mockAdd;
            return this;
        }),
    }
});

jest.spyOn(DIVECommunication, 'get').mockReturnValue({ PerformAction: jest.fn() } as unknown as DIVECommunication);

describe('dive/light/DIVESceneLight', () => {
    it('should instantiate', () => {
        const testLight = new DIVESceneLight();
        expect(testLight).toBeDefined();
        expect(testLight.children).toHaveLength(2);
    });

    it('should set intensity', () => {
        const testLight = new DIVESceneLight();
        expect(() => testLight.SetIntensity(1.0)).not.toThrow();
        expect(() => testLight.SetIntensity(0.6)).not.toThrow();
    });

    it('should set color', () => {
        const testLight = new DIVESceneLight();
        expect(() => testLight.SetColor({ test: true } as unknown as Color)).not.toThrow();
    });

    it('should set enabled', () => {
        const testLight = new DIVESceneLight();
        testLight.SetEnabled(false);
        expect(testLight.children[0].visible).toBe(false);
        expect(testLight.children[1].visible).toBe(false);
    });
});