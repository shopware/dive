import { DIVE } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import type { StateData } from '@shopware-ag/dive/state';
import { QuickViewSettings } from '../../types/QuickViewSettings.ts';
import { type QuickViewWithState } from '../../types/index.ts';
import { type Object3D } from 'three/webgpu';

export const QuickViewState = async (
    sceneData: StateData,
    settings?: Partial<QuickViewSettings>,
): Promise<QuickViewWithState> => {
    try {
        const dive = new DIVE({ ...settings, autoStart: false });

        dive.mainView.camera.position.set(0, 1, 2);

        const orbitController = new OrbitController(
            dive.mainView.camera,
            dive.mainView.canvas,
        );
        dive.clock.addTicker(orbitController);

        const state = new (await import('@shopware-ag/dive/state')).State(
            dive,
            orbitController,
        );

        let modelLoadedCountdown = sceneData.objects.length;

        const quickView = Object.assign(dive, { orbitController, state });

        const originalDispose = dive.disposeAsync.bind(dive);
        quickView.disposeAsync = async () => {
            orbitController.dispose();

            // dispose dive
            await originalDispose();
        };

        state.subscribe('MODEL_LOADED', async () => {
            modelLoadedCountdown--;
            if (modelLoadedCountdown === 0) {
                const objectsToFocus: Object3D[] = [];
                sceneData.objects.forEach((object) => {
                    const sceneModel = dive.scene.root.getSceneObject(object);
                    if (sceneModel) {
                        objectsToFocus.push(sceneModel);
                    }
                });
                sceneData.primitives.forEach((primitive) => {
                    const scenePrimitive =
                        dive.scene.root.getSceneObject(primitive);
                    if (scenePrimitive) {
                        objectsToFocus.push(scenePrimitive);
                    }
                });

                orbitController.focusObject(objectsToFocus);
            }

            if (settings?.autoStart ?? true) {
                await dive.startAsync();
            }
        });

        await state.performAction('SET_STATE', sceneData);

        return quickView;
    } catch (error) {
        console.error('Failed to initialize QuickView:', error);
        return Promise.reject(error);
    }
};
