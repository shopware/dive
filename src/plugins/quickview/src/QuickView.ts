import { DIVE, DIVEModel, DIVESceneLight } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { QuickViewDefaultSettings } from './QuickViewDefaultSettings.ts';
import { type QuickViewSettings } from '../types/index.ts';

export type QuickView = DIVE & { orbitController: OrbitController };

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

    // set scene properties
    dive.scene.setBackground(
        settings?.backgroundColor ?? QuickViewDefaultSettings.backgroundColor,
    );
    dive.scene.grid.setVisibility(
        settings?.displayGrid ?? QuickViewDefaultSettings.displayGrid,
    );
    dive.scene.root.floor.setVisibility(
        settings?.displayFloor ?? QuickViewDefaultSettings.displayFloor,
    );

    // add scene light
    const light = new DIVESceneLight();
    light.setIntensity(settings?.lightIntensity ?? 1);
    dive.scene.root.add(light);

    // instantiate model
    const model = await new DIVEModel().setFromURL(uri);
    dive.scene.root.add(model);

    const orbitController = new OrbitController(
        dive.mainView.camera,
        dive.mainView.canvas,
    );
    orbitController.focusObject(model);
    dive.clock.addTicker(orbitController);

    return Object.assign(dive, { orbitController });
};
