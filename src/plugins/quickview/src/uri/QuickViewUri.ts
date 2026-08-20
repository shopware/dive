import { DIVE, DIVENode, ModelComponent } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { QuickViewSettings } from '../../types/QuickViewSettings.ts';
import { type QuickViewWithModel } from '../../types/index.ts';

export const QuickViewUri = async (
    uri: string,
    settings?: Partial<QuickViewSettings>,
): Promise<QuickViewWithModel> => {
    try {
        const dive = new DIVE({ ...settings, autoStart: false });

        // the node, not the camera: the camera sits at its node's origin, and the
        // controller below moves the node
        dive.mainView.cameraComponent.owner.position.set(0, 1, 2);

        // a model is a node carrying mesh geometry
        const model = new DIVENode();
        model.name = 'QuickViewModel';
        const mesh = model.addComponent(new ModelComponent());
        dive.scene.root.add(model);
        await mesh.setFromURL(uri);
        model.dropIt();

        const orbitController = new OrbitController(
            dive.mainView.cameraComponent,
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
