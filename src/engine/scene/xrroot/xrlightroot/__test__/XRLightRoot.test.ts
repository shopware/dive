import { DIVEXRLightRoot } from '../XRLightRoot.ts';
import { DIVESceneLight } from '../../../../../components/light/SceneLight.ts';
import { type DIVEScene } from '../../../Scene.ts';

const mockScene = { environment: null } as unknown as DIVEScene;

describe('engine/scene/xrroot/DIVEXRLightRoot', () => {
    it('should hold a scene light', () => {
        // it used to call updateSceneObject on a freshly built root, which
        // found nothing to update — the light root shipped with only a floor
        const xrLightRoot = new DIVEXRLightRoot(mockScene);

        const lights: DIVESceneLight[] = [];
        xrLightRoot.traverse((child) => {
            if (child instanceof DIVESceneLight) lights.push(child);
        });

        expect(lights).toHaveLength(1);
        expect(lights[0].name).toBe('XRSceneLight');
        expect(lights[0].userData.id).toBe('XRSceneLight');
    });

    it('should hide and show the light root with the estimation', () => {
        const xrLightRoot = new DIVEXRLightRoot(mockScene);
        const lightRoot = xrLightRoot['_lightRoot'];

        xrLightRoot['onEstimationStart']();
        expect(lightRoot.visible).toBe(false);

        xrLightRoot['onEstimationEnd']();
        expect(lightRoot.visible).toBe(true);
    });
});
