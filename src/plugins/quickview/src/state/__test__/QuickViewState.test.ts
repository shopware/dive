/**
 * @jest-environment jsdom
 */

import { vi } from 'vitest';
import { DIVE } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type StateData, State } from '@shopware-ag/dive/state';
import { QuickViewState } from '../QuickViewState.ts';

// shared across instances, because QuickViewState replaces disposeAsync on the
// returned object, which hides the original mock
const {
    diveDisposeAsync,
    statePerformAction,
    stateSubscribe,
    modelLoaded,
    resetListeners,
    sceneObjects,
} = vi.hoisted(() => {
    const listeners: (() => void)[] = [];
    // what scene.root.getSceneObject resolves, keyed by entity id
    const sceneObjects: Record<string, object> = {};

    return {
        diveDisposeAsync: vi.fn(async () => {}),
        statePerformAction: vi.fn(),
        stateSubscribe: vi.fn((_type: string, listener: () => void) => {
            listeners.push(listener);
            return () => {};
        }),
        // replays a MODEL_LOADED event to every subscriber
        modelLoaded: (times = 1): void => {
            for (let i = 0; i < times; i++) {
                listeners.forEach((listener) => listener());
            }
        },
        resetListeners: (): void => {
            listeners.length = 0;
            for (const key of Object.keys(sceneObjects))
                delete sceneObjects[key];
        },
        sceneObjects,
    };
});

vi.mock('@shopware-ag/dive', () => {
    return {
        DIVE: vi.fn(() => {
            return {
                mainView: {
                    canvas: vi.fn(),
                    camera: {
                        position: {
                            set: vi.fn(),
                        },
                    },
                },
                scene: {
                    root: {
                        name: 'Root',
                        // resolves a schema entry to the object in the scene
                        getSceneObject: vi.fn(
                            (entity: { id: string }) => sceneObjects[entity.id],
                        ),
                    },
                },
                clock: {
                    addTicker: vi.fn(),
                },
                startAsync: vi.fn(async () => {}),
                disposeAsync: diveDisposeAsync,
            };
        }),
    };
});

vi.mock('@shopware-ag/dive/orbitcontroller', () => {
    return {
        OrbitController: vi.fn(() => {
            return {
                focusObject: vi.fn(),
                dispose: vi.fn(),
            };
        }),
    };
});

vi.mock('@shopware-ag/dive/state', () => {
    return {
        State: vi.fn(() => {
            return {
                performAction: statePerformAction,
                subscribe: stateSubscribe,
                destroyInstance: vi.fn(),
            };
        }),
    };
});

/** Scene data describing `modelCount` models. */
const sceneDataWith = (modelCount: number): StateData =>
    ({
        name: 'scene',
        lights: [],
        objects: Array.from({ length: modelCount }, (_, i) => ({
            id: `model-${i}`,
            entityType: 'model',
        })),
        primitives: [],
        groups: [],
        cameras: [],
    }) as unknown as StateData;

const sceneData = sceneDataWith(0);

describe('QuickViewState', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetListeners();
        console.error = vi.fn();
    });

    it('creates the DIVE instance with auto start disabled', async () => {
        const quickView = await QuickViewState(sceneData);

        expect(DIVE).toHaveBeenCalledWith({ autoStart: false });
        // starting is deferred into the MODEL_LOADED handler
        expect(quickView.startAsync).not.toHaveBeenCalled();
    });

    it('registers the orbit controller as a ticker', async () => {
        const quickView = await QuickViewState(sceneData);

        expect(OrbitController).toHaveBeenCalledWith(
            quickView.mainView.camera,
            quickView.mainView.canvas,
        );
        expect(quickView.clock.addTicker).toHaveBeenCalledWith(
            quickView.orbitController,
        );
    });

    it('exposes a State bound to the DIVE instance and the orbit controller', async () => {
        const quickView = await QuickViewState(sceneData);

        expect(State).toHaveBeenCalledWith(
            quickView,
            quickView.orbitController,
        );
        expect(quickView.state).toBe(vi.mocked(State).mock.results[0].value);
    });

    it('does not expose a single model, because a state describes many', async () => {
        const quickView = await QuickViewState(sceneData);

        expect(quickView).not.toHaveProperty('model');
    });

    it('forwards the settings but keeps auto start disabled', async () => {
        const settings = {
            autoStart: false,
            backgroundColor: 0xff0000,
            displayGrid: true,
        };

        const quickView = await QuickViewState(sceneData, settings);

        expect(DIVE).toHaveBeenCalledWith({ ...settings, autoStart: false });
        expect(quickView.startAsync).not.toHaveBeenCalled();
    });

    it('disposes the orbit controller before the wrapped DIVE instance', async () => {
        const quickView = await QuickViewState(sceneData);

        await quickView.disposeAsync();

        const controllerDispose = vi.mocked(quickView.orbitController.dispose);
        expect(controllerDispose).toHaveBeenCalledTimes(1);
        expect(diveDisposeAsync).toHaveBeenCalledTimes(1);
        expect(controllerDispose.mock.invocationCallOrder[0]).toBeLessThan(
            diveDisposeAsync.mock.invocationCallOrder[0],
        );
    });

    it('rejects when the DIVE instance cannot be created', async () => {
        vi.mocked(DIVE).mockImplementationOnce(() => {
            throw new Error('DIVE initialization error');
        });

        await expect(QuickViewState(sceneData)).rejects.toThrow(
            'DIVE initialization error',
        );
        expect(console.error).toHaveBeenCalled();
    });

    it('creates an independent instance per call', async () => {
        const first = await QuickViewState(sceneData);
        const second = await QuickViewState(sceneData);

        expect(first).not.toBe(second);
        expect(DIVE).toHaveBeenCalledTimes(2);
        expect(State).toHaveBeenCalledTimes(2);
    });

    describe('scene state', () => {
        it('should apply the given scene data through SET_STATE', async () => {
            const data = sceneDataWith(2);

            await QuickViewState(data);

            expect(statePerformAction).toHaveBeenCalledWith('SET_STATE', data);
        });

        it('should subscribe to MODEL_LOADED before applying the state', async () => {
            await QuickViewState(sceneDataWith(1));

            expect(stateSubscribe).toHaveBeenCalledWith(
                'MODEL_LOADED',
                expect.any(Function),
            );
            // subscribing afterwards would miss models that SET_STATE loads
            expect(stateSubscribe.mock.invocationCallOrder[0]).toBeLessThan(
                statePerformAction.mock.invocationCallOrder[0],
            );
        });

        it('should focus the resolved objects only once every model has loaded', async () => {
            const data = sceneDataWith(3);
            const resolved = data.objects.map((object, i) => {
                const sceneObject = { name: `model-${i}` };
                sceneObjects[(object as unknown as { id: string }).id] =
                    sceneObject;
                return sceneObject;
            });

            const quickView = await QuickViewState(data);
            const focusObject = vi.mocked(
                quickView.orbitController.focusObject,
            );

            modelLoaded(2);
            expect(focusObject).not.toHaveBeenCalled();

            modelLoaded();
            expect(focusObject).toHaveBeenCalledWith(resolved);
        });

        it('should also focus the primitives of the scene', async () => {
            const data = sceneDataWith(1);
            const model = { name: 'the-model' };
            const primitive = { name: 'the-primitive' };
            sceneObjects['model-0'] = model;
            sceneObjects['primitive-0'] = primitive;
            (data as unknown as { primitives: object[] }).primitives = [
                { id: 'primitive-0', entityType: 'primitive' },
            ];

            const quickView = await QuickViewState(data);
            modelLoaded();

            expect(quickView.orbitController.focusObject).toHaveBeenCalledWith([
                model,
                primitive,
            ]);
        });

        it('should skip entities that are not present in the scene', async () => {
            const data = sceneDataWith(2);
            const onlyOne = { name: 'model-1' };
            sceneObjects['model-1'] = onlyOne;

            const quickView = await QuickViewState(data);
            modelLoaded(2);

            expect(quickView.orbitController.focusObject).toHaveBeenCalledWith([
                onlyOne,
            ]);
        });

        it('should start the scene from the model loaded handler', async () => {
            const quickView = await QuickViewState(sceneDataWith(1));

            expect(quickView.startAsync).not.toHaveBeenCalled();

            modelLoaded();

            expect(quickView.startAsync).toHaveBeenCalled();
        });
    });
});
