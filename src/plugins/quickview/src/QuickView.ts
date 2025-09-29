import {
    DIVE,
    DIVEDefaultSettings,
    DIVEModel,
    DIVESceneLight,
    ImageBasedEnvironment,
} from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type QuickViewSettings } from '../types/index.ts';

export const QuickViewDefaultSettings: Required<QuickViewSettings> = {
    ...DIVEDefaultSettings,
    lightIntensity: 1,
    hdr: {
        enabled: false,
        hdrUrl: undefined,
        useAsBackground: true,
        globalEnvIntensity: 1,
        exposure: 1,
        rotateY: 0,
        replaceLights: false,
    },
};

export type QuickView = DIVE & {
    orbitController: OrbitController;
    ibl: ImageBasedEnvironment;
};

/**
 *
 * @param uri - The URI of the 3D model to display in QuickView
 * @param settings - The settings for the QuickView
 * @returns The DIVE instance with the orbit controller - { ...DIVE, orbitController: OrbitController }
 */
export const QuickView = async (
    uri: string,
    settings?: Partial<QuickViewSettings>,
): Promise<QuickView> => {
    const dive = new DIVE(settings);
    dive.mainView.camera.position.set(0, 1, 2);

    // add scene light
    const light = new DIVESceneLight();
    light.setIntensity(settings?.lightIntensity ?? 1);
    dive.scene.root.add(light);

    // instantiate model
    const model = await new DIVEModel().setFromURL(uri);
    dive.scene.root.add(model);
    model.placeOnFloor();

    const orbitController = new OrbitController(
        dive.mainView.camera,
        dive.mainView.canvas,
    );
    orbitController.focusObject(model);
    dive.clock.addTicker(orbitController);

    const ibl = new ImageBasedEnvironment(
        dive.mainView.renderer.webglrenderer,
        dive.scene,
        settings?.hdr ?? QuickViewDefaultSettings.hdr,
    );
    if (!settings?.hdr?.hdrUrl) {
        ibl.setHDR('');
    }

    return Object.assign(dive, { orbitController, ibl });
};
