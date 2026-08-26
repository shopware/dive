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
const { diveDisposeAsync, statePerformAction, stateDestroyInstance, root } =
    vi.hoisted(() => ({
        diveDisposeAsync: vi.fn(async () => {}),
        statePerformAction: vi.fn(async () => [] as object[]),
        stateDestroyInstance: vi.fn(),
        // framing takes one node, and the root is the parent of everything the
        // state created
        root: {},
    }));

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
                    // the controller drives the component, not the camera
                    cameraComponent: { owner: { position: { set: vi.fn() } } },
                },
                clock: {
                    addTicker: vi.fn(),
                },
                scene: { root },
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
                subscribe: vi.fn(),
                destroyInstance: stateDestroyInstance,
            };
        }),
    };
});

const sceneData = { name: 'scene' } as unknown as StateData;

/** Scene objects as SET_STATE hands them back. */
const model = { name: 'a-model', isDIVEModel: true };
const primitive = { name: 'a-primitive', isDIVEPrimitive: true };
const light = { name: 'a-light', isDIVELight: true };

describe('QuickViewState', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        statePerformAction.mockResolvedValue([]);
        console.error = vi.fn();
    });

    it('creates the DIVE instance without auto start and starts it afterwards', async () => {
        const quickView = await QuickViewState(sceneData);

        expect(DIVE).toHaveBeenCalledWith({ autoStart: false });
        expect(quickView.startAsync).toHaveBeenCalledTimes(1);
    });

    it('registers the orbit controller as a ticker', async () => {
        const quickView = await QuickViewState(sceneData);

        expect(OrbitController).toHaveBeenCalledWith(
            quickView.mainView.cameraComponent,
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

    describe('disposal', () => {
        it('disposes the orbit controller before the wrapped DIVE instance', async () => {
            const quickView = await QuickViewState(sceneData);

            await quickView.disposeAsync();

            const controllerDispose = vi.mocked(
                quickView.orbitController.dispose,
            );
            expect(controllerDispose).toHaveBeenCalledTimes(1);
            expect(diveDisposeAsync).toHaveBeenCalledTimes(1);
            expect(controllerDispose.mock.invocationCallOrder[0]).toBeLessThan(
                diveDisposeAsync.mock.invocationCallOrder[0],
            );
        });

        it('removes the State instance from the registry', async () => {
            const quickView = await QuickViewState(sceneData);

            expect(stateDestroyInstance).not.toHaveBeenCalled();

            await quickView.disposeAsync();

            expect(stateDestroyInstance).toHaveBeenCalledTimes(1);
        });
    });

    describe('scene state', () => {
        it('applies the given scene data through SET_STATE', async () => {
            await QuickViewState(sceneData);

            expect(statePerformAction).toHaveBeenCalledWith(
                'SET_STATE',
                sceneData,
            );
        });

        it('focuses the root once SET_STATE created something to look at', async () => {
            statePerformAction.mockResolvedValue([model, light, primitive]);

            const quickView = await QuickViewState(sceneData);

            expect(quickView.orbitController.focusObject).toHaveBeenCalledWith(
                root,
            );
        });

        it('does not focus when the scene holds nothing focusable', async () => {
            statePerformAction.mockResolvedValue([light]);

            const quickView = await QuickViewState(sceneData);

            // an empty scene measures to a negative radius, which would put the
            // camera behind its own target
            expect(
                quickView.orbitController.focusObject,
            ).not.toHaveBeenCalled();
        });

        it('starts an empty scene even though there is nothing to focus', async () => {
            const quickView = await QuickViewState(sceneData);

            expect(
                quickView.orbitController.focusObject,
            ).not.toHaveBeenCalled();
            expect(quickView.startAsync).toHaveBeenCalledTimes(1);
        });

        it('focuses before starting the scene', async () => {
            statePerformAction.mockResolvedValue([model]);

            const quickView = await QuickViewState(sceneData);

            const focus = vi.mocked(quickView.orbitController.focusObject);
            const start = vi.mocked(quickView.startAsync);
            expect(focus.mock.invocationCallOrder[0]).toBeLessThan(
                start.mock.invocationCallOrder[0],
            );
        });

        it('rejects when applying the state fails', async () => {
            statePerformAction.mockRejectedValueOnce(
                new Error('asset missing'),
            );

            await expect(QuickViewState(sceneData)).rejects.toThrow(
                'asset missing',
            );
        });
    });
});
