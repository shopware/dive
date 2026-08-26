import { DIVE } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import type { StateData } from '@shopware-ag/dive/state';
import { QuickViewSettings } from '../../types/QuickViewSettings.ts';
import { type QuickViewWithState } from '../../types/index.ts';

export const QuickViewState = async (
    sceneData: StateData,
    settings?: Partial<QuickViewSettings>,
): Promise<QuickViewWithState> => {
    try {
        const dive = new DIVE({ ...settings, autoStart: false });

        /**
         * the node, not the camera: the camera sits at its node's origin, and the
         * controller below moves the node
         */
        dive.mainView.cameraComponent.owner.position.set(0, 1, 2);

        const orbitController = new OrbitController(
            dive.mainView.cameraComponent,
            dive.mainView.canvas,
        );
        dive.clock.addTicker(orbitController);

        const state = new (await import('@shopware-ag/dive/state')).State(
            dive,
            orbitController,
        );

        const quickView = Object.assign(dive, { orbitController, state });

        const originalDispose = dive.disposeAsync.bind(dive);
        quickView.disposeAsync = async () => {
            orbitController.dispose();
            // otherwise the instance lingers in State's static registry
            state.destroyInstance();

            // dispose dive
            await originalDispose();
        };

        // SET_STATE settles once every model is loaded, so there is nothing
        // left to wait for and the created objects come back with it
        // a single broken asset is warned about rather than dropping the whole
        // scene, so what comes back is everything that made it in
        const objects = await state.performAction('SET_STATE', sceneData);

        const objectsToFocus = objects.filter(
            (object) => 'isDIVEModel' in object || 'isDIVEPrimitive' in object,
        );
        // an empty list would give the bounding box a negative radius
        if (objectsToFocus.length > 0) {
            orbitController.focusObject(objectsToFocus);
        }

        if (settings?.autoStart ?? true) {
            await dive.startAsync();
        }

        return quickView;
    } catch (error) {
        console.error('Failed to initialize QuickView:', error);
        return Promise.reject(error);
    }
};
