import { DIVE, DIVEDefaultSettings, DIVEModel } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type QuickViewSettings } from '../types/index.ts';

export const QuickViewDefaultSettings: Omit<
    Required<QuickViewSettings>,
    'hdr'
> = {
    ...DIVEDefaultSettings,
};

export type QuickView = DIVE & {
    orbitController: OrbitController;
    model: DIVEModel;
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

    const quickView = Object.assign(dive, { orbitController, model });

    const originalDispose = dive.dispose.bind(dive);
    quickView.dispose = async () => {
        orbitController.dispose();

        // dispose dive
        await originalDispose();
    };

    return quickView;
};
