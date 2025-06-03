import { State } from '@shopware-ag/dive/state';
import { type Color } from 'three';
import { DIVESceneLight } from '../SceneLight.ts';

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

vi.spyOn(State, 'get').mockReturnValue({
    performAction: vi.fn(),
} as unknown as State);

describe('dive/light/DIVESceneLight', () => {
    it('should instantiate', () => {
        const testLight = new DIVESceneLight();
        expect(testLight).toBeDefined();
        expect(testLight.children).toHaveLength(2);
    });

    it('should set intensity', () => {
        const testLight = new DIVESceneLight();
        expect(() => testLight.setIntensity(1.0)).not.toThrow();
        expect(() => testLight.setIntensity(0.6)).not.toThrow();
    });

    it('should set color', () => {
        const testLight = new DIVESceneLight();
        expect(() =>
            testLight.setColor({ test: true } as unknown as Color),
        ).not.toThrow();
    });

    it('should set enabled', () => {
        const testLight = new DIVESceneLight();
        testLight.setEnabled(false);
        expect(testLight.children[0].visible).toBe(false);
        expect(testLight.children[1].visible).toBe(false);
    });
});
