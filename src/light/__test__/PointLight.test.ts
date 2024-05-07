import DIVEPointLight from '../PointLight.ts';
import DIVECommunication from '../../com/Communication.ts';
import { Color } from 'three';

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
    }
});

jest.spyOn(DIVECommunication, 'get').mockReturnValue({ PerformAction: jest.fn() } as unknown as DIVECommunication);

describe('dive/light/DIVEPointLight', () => {
    it('should instantiate', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(testLight).toBeDefined();
        expect(mockAdd).toHaveBeenCalledTimes(1);
    });

    it('should set intensity', () => {
        const testLight = new DIVEPointLight();
        testLight.SetIntensity(1.0);
        expect(testLight.intensity).toBe(1.0);
        testLight.SetIntensity(0.6);
        expect(testLight.intensity).toBe(0.6);
    });

    it('should set color', () => {
        const testLight = new DIVEPointLight();
        testLight.SetColor({ test: true } as unknown as Color);
        expect(testLight.color).toEqual({ test: true });
    });

    it('should set enabled', () => {
        const testLight = new DIVEPointLight();
        testLight.SetEnabled(false);
        expect(testLight.visible).toBe(false);
    });

    it('should onMove', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(() => testLight.onMove()).not.toThrow();

        jest.spyOn(DIVECommunication, 'get').mockReturnValueOnce(undefined);
        expect(() => testLight.onMove()).not.toThrow();
    });
});