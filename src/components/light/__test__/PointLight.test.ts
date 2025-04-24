import { DIVEPointLight } from '../PointLight';
import { DIVECommunication } from '../../../com/Communication';
import { Color, PointLight } from 'three';

jest.mock('../../../com/Communication.ts', () => {
    return {
        DIVECommunication: {
            get: jest.fn(() => {
                return {
                    PerformAction: jest.fn(),
                };
            }),
        },
    };
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
        expect((testLight.children[0] as PointLight).color).toEqual({
            test: true,
        });
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
