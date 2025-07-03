import { type AmbientLight, type Color } from 'three';
import { DIVEAmbientLight } from '../AmbientLight.ts';

describe('dive/light/DIVEAmbientLight', () => {
    it('should instantiate', () => {
        const testLight = new DIVEAmbientLight();
        expect(testLight).toBeDefined();
    });

    it('should set intensity', () => {
        const testLight = new DIVEAmbientLight();
        testLight.setIntensity(1.0);
        expect((testLight.children[0] as AmbientLight).intensity).toBe(1.0);
    });

    it('should set color', () => {
        const testLight = new DIVEAmbientLight();
        testLight.setColor({ test: true } as unknown as Color);
        expect((testLight.children[0] as AmbientLight).color).toEqual({
            test: true,
        });
    });

    it('should set enabled', () => {
        const testLight = new DIVEAmbientLight();
        testLight.setEnabled(false);
        expect(testLight.children[0].visible).toBe(false);
    });
});
