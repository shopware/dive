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

        // the root, because framing takes one node and the root is the parent of
        // everything the state created
        // whether there is anything to look at is a different question: an empty
        // scene measures to a negative radius and would put the camera behind
        // its own target
        const worthLookingAt = objects.some(
            (object) => 'isDIVEModel' in object || 'isDIVEPrimitive' in object,
        );
        if (worthLookingAt) {
            orbitController.focusObject(dive.scene.root);
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
