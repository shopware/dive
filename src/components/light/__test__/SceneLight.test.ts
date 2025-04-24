import { DIVECommunication } from '../../../com/Communication';
import { Color } from 'three';
import { DIVESceneLight } from '../SceneLight';

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

jest.spyOn(DIVECommunication, 'get').mockReturnValue({
    PerformAction: jest.fn(),
} as unknown as DIVECommunication);

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
        expect(() =>
            testLight.SetColor({ test: true } as unknown as Color),
        ).not.toThrow();
    });

    it('should set enabled', () => {
        const testLight = new DIVESceneLight();
        testLight.SetEnabled(false);
        expect(testLight.children[0].visible).toBe(false);
        expect(testLight.children[1].visible).toBe(false);
    });
});
