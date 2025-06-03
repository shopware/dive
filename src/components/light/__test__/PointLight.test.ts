import { DIVEPointLight } from '../PointLight.ts';
import { State } from '@shopware-ag/dive/state';
import { type Color, type PointLight } from 'three';

vi.mock('../../../modules/state/State', () => {
    return {
        State: {
            get: vi.fn(() => {
                return {
                    performAction: vi.fn(),
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
        testLight.setIntensity(1.0);
        expect((testLight.children[0] as PointLight).intensity).toBe(1.0);
        testLight.setIntensity(0.6);
        expect((testLight.children[0] as PointLight).intensity).toBe(0.6);
    });

    it('should set color', () => {
        const testLight = new DIVEPointLight();
        testLight.setColor({ test: true } as unknown as Color);
        expect((testLight.children[0] as PointLight).color).toEqual({
            test: true,
        });
    });

    it('should set enabled', () => {
        const testLight = new DIVEPointLight();
        testLight.setEnabled(false);
        expect(testLight.children[0].visible).toBe(false);
    });

    it('should onMove', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(() => testLight.onMove()).not.toThrow();

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => testLight.onMove()).not.toThrow();
    });

    it('should onSelect', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(() => testLight.onSelect()).not.toThrow();

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => testLight.onSelect()).not.toThrow();
    });

    it('should onDeselect', () => {
        const testLight = new DIVEPointLight();
        testLight.userData.id = 'something';
        expect(() => testLight.onDeselect()).not.toThrow();

        vi.spyOn(State, 'get').mockReturnValueOnce(undefined);
        expect(() => testLight.onDeselect()).not.toThrow();
    });
});
