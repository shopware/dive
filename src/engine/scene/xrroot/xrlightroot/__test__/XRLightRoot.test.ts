import { DIVEXRLightRoot } from '../XRLightRoot.ts';
import { DIVENode } from '../../../../node/Node.ts';
import { DIVELightComponent } from '../../../../../components/light/LightComponent.ts';
import { HemisphereLightComponent } from '../../../../../components/light/hemi/HemisphereLightComponent.ts';
import { DirectionalLightComponent } from '../../../../../components/light/directional/DirectionalLightComponent.ts';
import { type DIVEScene } from '../../../Scene.ts';

const mockScene = { environment: null } as unknown as DIVEScene;

describe('engine/scene/xrroot/DIVEXRLightRoot', () => {
    it('should hold a scene light', () => {
        // it used to call updateSceneObject on a freshly built root, which
        // found nothing to update — the light root shipped with only a floor
        const xrLightRoot = new DIVEXRLightRoot(mockScene);

        const lightNodes: DIVENode[] = [];
        xrLightRoot.traverse((child) => {
            if (child instanceof DIVENode && child.name === 'XRSceneLight') {
                lightNodes.push(child);
            }
        });

        expect(lightNodes).toHaveLength(1);
        expect(lightNodes[0].userData.id).toBe('XRSceneLight');

        // what used to be one DIVESceneLight is a hemisphere plus a directional
        expect(lightNodes[0].getComponents(DIVELightComponent)).toHaveLength(2);
        expect(
            lightNodes[0].getComponent(HemisphereLightComponent),
        ).toBeDefined();
        expect(
            lightNodes[0].getComponent(DirectionalLightComponent),
        ).toBeDefined();
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
