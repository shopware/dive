import { DIVE, DIVEModel } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { QuickViewSettings } from '../../types/QuickViewSettings.ts';
import { type QuickViewWithModel } from '../../types/index.ts';

export const QuickViewUri = async (
    uri: string,
    settings?: Partial<QuickViewSettings>,
): Promise<QuickViewWithModel> => {
    try {
        const dive = new DIVE({ ...settings, autoStart: false });

        dive.mainView.camera.position.set(0, 1, 2);

        // instantiate model
        const model = await new DIVEModel().setFromURL(uri);
        dive.scene.root.add(model);
        model.dropIt();

        const orbitController = new OrbitController(
            dive.mainView.camera,
            dive.mainView.canvas,
        );
        dive.clock.addTicker(orbitController);

        const quickView = Object.assign(dive, { orbitController, model });

        const originalDispose = dive.disposeAsync.bind(dive);
        quickView.disposeAsync = async () => {
            orbitController.dispose();

            // dispose dive
            await originalDispose();
        };

        if (settings?.autoStart ?? true) {
            await dive.startAsync();
            orbitController.focusObject(model);
        }

        return quickView;
    } catch (error) {
        console.error('Failed to initialize QuickView:', error);
        return Promise.reject(error);
    }
};
