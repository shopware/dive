import {
    DIVE,
    DIVEDefaultSettings,
    DIVEModel,
    DIVESceneLight,
    HDREnvironment,
    HDREnvironmentDefaultSettings,
} from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type QuickViewSettings } from '../types/index.ts';

export const QuickViewDefaultSettings: Required<QuickViewSettings> = {
    ...DIVEDefaultSettings,
    lightIntensity: 1,
    hdr: HDREnvironmentDefaultSettings,
};

export type QuickView = DIVE & {
    orbitController: OrbitController;
    hdr: HDREnvironment;
};

/**
 *
 * @param uri - The URI of the 3D model to display in QuickView
 * @param settings - The settings for the QuickView
 * @returns The DIVE instance with the orbit controller and hdr environment - { ...DIVE, orbitController: OrbitController, hdr: HDREnvironment }
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

    const hdr = new HDREnvironment(
        dive.mainView.renderer.webglrenderer,
        dive.scene,
        settings?.hdr ?? QuickViewDefaultSettings.hdr,
    );

    return Object.assign(dive, { orbitController, hdr });
};
