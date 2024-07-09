import DIVEPointLight from '../PointLight.ts';
import DIVECommunication from '../../com/Communication.ts';
import { Color, MeshBasicMaterial, Object3D, PointLight } from 'three';

const mockAdd = jest.fn();

jest.mock('three', () => {
    return {
        Color: jest.fn(function () {
            return {};
        }),
        PointLight: jest.fn(function () {
            this.visible = true;
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
            return this;
        }),
        SphereGeometry: jest.fn(function () {
            return this;
        }),
        MeshBasicMaterial: jest.fn(function () {
            this.opacity = 1.0;
            this.color = new Color();
            return this;
        }),
        Mesh: jest.fn(function () {
            this.layers = {
                mask: 0,
            };
            this.visible = true;
            this.material = new MeshBasicMaterial();
            return this;
        }),
        Object3D: jest.fn(function () {
            this.children = [];
            this.add = (obj: Object3D) => {
                this.children.push(obj);
            };
            this.userData = {};
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

describe('dive/light/DIVEPointLight', () => {
    it('should instantiate', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(testLight).toBeDefined();
        expect(testLight.userData.id).toBe('something');
        expect(testLight.children).toHaveLength(2);
    });

    it('should set intensity', () => {
        const testLight = new DIVEPointLight();
        testLight.SetIntensity(1.0);
        expect((testLight.children[0] as PointLight).intensity).toBe(1.0);
        testLight.SetIntensity(0.6);
        expect((testLight.children[0] as PointLight).intensity).toBe(0.6);
    });

    it('should set color', () => {
        const testLight = new DIVEPointLight();
        testLight.SetColor({ test: true } as unknown as Color);
        expect((testLight.children[0] as PointLight).color).toEqual({ test: true });
    });

    it('should set enabled', () => {
        const testLight = new DIVEPointLight();
        testLight.SetEnabled(false);
        expect(testLight.children[0].visible).toBe(false);
    });

    it('should onMove', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(() => testLight.onMove()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => testLight.onMove()).not.toThrow();
    });

    it('should onSelect', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(() => testLight.onSelect()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => testLight.onSelect()).not.toThrow();
    });

    it('should onDeselect', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(() => testLight.onDeselect()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => testLight.onDeselect()).not.toThrow();
    });
});