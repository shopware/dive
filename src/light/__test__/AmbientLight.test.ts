import { Color } from 'three';
import DIVEAmbientLight from '../AmbientLight';

jest.mock('three', () => {
    return {
        Color: jest.fn(function () {
            return {};
        }),
        AmbientLight: jest.fn(function () {
            this.color = {};
            this.intensity = 0;
            this.layers = {
                mask: 0,
            };
            return this;
        }),
    }
});


describe('dive/light/DIVEAmbientLight', () => {
    it('should instantiate', () => {
        const testLight = new DIVEAmbientLight();
        expect(testLight).toBeDefined();
    });

    it('should set intensity', () => {
        const testLight = new DIVEAmbientLight();
        testLight.SetIntensity(1.0);
        expect(testLight.intensity).toBe(1.0);
    });

    it('should set color', () => {
        const testLight = new DIVEAmbientLight();
        testLight.SetColor({ test: true } as unknown as Color);
        expect(testLight.color).toEqual({ test: true });
    });

    it('should set enabled', () => {
        const testLight = new DIVEAmbientLight();
        testLight.SetEnabled(false);
        expect(testLight.visible).toBe(false);
    });
});