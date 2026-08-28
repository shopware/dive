/**
 * @jest-environment jsdom
 */

import { vi } from 'vitest';
import { DIVE, DIVENode, ModelComponent } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { State, type StateData } from '@shopware-ag/dive/state';
import { QuickView, QuickViewDefaultSettings } from '../QuickView.ts';

/**
 * Shared across instances, because QuickView replaces `disposeAsync` on the
 * object it returns, which hides the original mock, and because the mesh
 * component is created per call.
 */
const {
    diveDisposeAsync,
    setFromURL,
    statePerformAction,
    stateDestroyInstance,
    rootAdd,
    rootNodes,
} = vi.hoisted(() => ({
    diveDisposeAsync: vi.fn(async () => {}),
    setFromURL: vi.fn(),
    statePerformAction: vi.fn(async () => [] as object[]),
    stateDestroyInstance: vi.fn(),
    rootAdd: vi.fn(),
    rootNodes: [] as unknown[],
}));

vi.mock('@shopware-ag/dive', () => {
    return {
        DIVE: vi.fn(() => {
            return {
                mainView: {
                    canvas: vi.fn(),
                    // the controller drives the component, not the camera
                    cameraComponent: { owner: { position: { set: vi.fn() } } },
                },
                scene: {
                    root: {
                        add: rootAdd,
                        get nodes() {
                            return rootNodes;
                        },
                    },
                },
                clock: { addTicker: vi.fn() },
                startAsync: vi.fn(async () => {}),
                disposeAsync: diveDisposeAsync,
            };
        }),
        DIVEDefaultSettings: { displayGrid: false },
        // the real one, so the teardown assertions below exercise it
        disposeComponents: (object: { components?: { dispose(): void }[] }) =>
            object.components?.forEach((component) => component.dispose()),
        DIVENode: vi.fn(function (this: Record<string, unknown>) {
            const mesh = { setFromURL, dispose: vi.fn() };
            this.components = [mesh];
            this.dropIt = vi.fn();
            this.addComponent = vi.fn(() => mesh);
            this.requireComponent = vi.fn(() => mesh);
            this.removeFromParent = vi.fn();
            this.traverse = vi.fn((callback: (o: unknown) => void) =>
                callback(this),
            );
            this.isDIVENode = true;
            return this;
        }),
        ModelComponent: vi.fn(),
    };
});

vi.mock('@shopware-ag/dive/orbitcontroller', () => {
    return {
        OrbitController: vi.fn(() => {
            return { focusObject: vi.fn(), dispose: vi.fn() };
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
const aModel = { name: 'a-model', isDIVEModel: true };
const aLight = { name: 'a-light', isDIVELight: true };

describe('QuickView', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        rootNodes.length = 0;
        setFromURL.mockImplementation(async () => {});
        statePerformAction.mockImplementation(async () => []);
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    it('exposes the DIVE defaults as QuickView defaults', () => {
        expect(QuickViewDefaultSettings).toMatchObject({ displayGrid: false });
    });

    it('should build the scene without auto start and start it afterwards', async () => {
        // the model has to be in the scene before the viewport is framed
        const quickView = await QuickView('test_uri');

        expect(DIVE).toHaveBeenCalledWith({ autoStart: false });
        expect(quickView.startAsync).toHaveBeenCalledTimes(1);
    });

    it('should forward the settings but keep auto start disabled', async () => {
        await QuickView('test_uri', { displayGrid: true, autoStart: true });

        expect(DIVE).toHaveBeenCalledWith({
            displayGrid: true,
            autoStart: false,
        });
    });

    it('should register the orbit controller as a ticker', async () => {
        const quickView = await QuickView('test_uri');

        expect(quickView.clock.addTicker).toHaveBeenCalledWith(
            quickView.orbitController,
        );
    });

    it('should create an independent instance per call', async () => {
        const first = await QuickView('first_uri');
        const second = await QuickView('second_uri');

        expect(first).not.toBe(second);
        expect(DIVE).toHaveBeenCalledTimes(2);
    });

    it('should reject when the DIVE instance cannot be created', async () => {
        vi.mocked(DIVE).mockImplementationOnce(() => {
            throw new Error('DIVE initialization error');
        });

        await expect(QuickView('test_uri')).rejects.toThrow(
            'DIVE initialization error',
        );
        expect(console.error).toHaveBeenCalled();
    });

    describe('from a model uri', () => {
        it('should load, ground and frame the model', async () => {
            const quickView = await QuickView('test_uri');

            expect(setFromURL).toHaveBeenCalledWith('test_uri');
            expect(quickView.model!.dropIt).toHaveBeenCalledTimes(1);
            expect(quickView.orbitController.focusObject).toHaveBeenCalledWith(
                quickView.model,
            );
        });

        it('should frame only once the scene runs', async () => {
            // focusObject reads the viewport, which has no size before start
            const quickView = await QuickView('test_uri');

            const focus = vi.mocked(quickView.orbitController.focusObject);
            const start = vi.mocked(quickView.startAsync);
            expect(start.mock.invocationCallOrder[0]).toBeLessThan(
                focus.mock.invocationCallOrder[0],
            );
        });

        it('should not frame anything when it was told not to start', async () => {
            const quickView = await QuickView('test_uri', {
                autoStart: false,
            });

            expect(
                quickView.orbitController.focusObject,
            ).not.toHaveBeenCalled();
        });

        it('should hold no state', async () => {
            expect((await QuickView('test_uri')).state).toBeNull();
        });
    });

    describe('from scene data', () => {
        it('should apply the data through SET_STATE', async () => {
            const quickView = await QuickView(sceneData);

            expect(State).toHaveBeenCalledWith(
                quickView,
                quickView.orbitController,
            );
            expect(statePerformAction).toHaveBeenCalledWith(
                'SET_STATE',
                sceneData,
            );
        });

        it('should frame the root once there is something to look at', async () => {
            statePerformAction.mockResolvedValue([aModel]);

            const quickView = await QuickView(sceneData);

            expect(quickView.orbitController.focusObject).toHaveBeenCalledWith(
                quickView.scene.root,
            );
        });

        it('should not frame a scene holding nothing focusable', async () => {
            /**
             * an empty scene measures to a negative radius, which would put the
             * camera behind its own target
             */
            statePerformAction.mockResolvedValue([aLight]);

            const quickView = await QuickView(sceneData);

            expect(
                quickView.orbitController.focusObject,
            ).not.toHaveBeenCalled();
        });

        it('should still start a scene it cannot frame', async () => {
            const quickView = await QuickView(sceneData);

            expect(quickView.startAsync).toHaveBeenCalledTimes(1);
        });

        it('should hold no single model, because a state describes many', async () => {
            expect((await QuickView(sceneData)).model).toBeNull();
        });

        it('should reject when applying the state fails', async () => {
            statePerformAction.mockRejectedValueOnce(
                new Error('SET_STATE failed'),
            );

            await expect(QuickView(sceneData)).rejects.toThrow(
                'SET_STATE failed',
            );
        });
    });

    describe('load', () => {
        /** A started QuickView with the setup calls already accounted for. */
        const started = async (source: string | StateData = 'first_uri') => {
            const quickView = await QuickView(source);
            vi.mocked(setFromURL).mockClear();
            vi.mocked(statePerformAction).mockClear();
            vi.mocked(stateDestroyInstance).mockClear();
            vi.mocked(quickView.orbitController.focusObject).mockClear();

            return quickView;
        };

        it('should swap the model, stand it up and frame it', async () => {
            // the three calls every consumer wrote by hand, as one
            const quickView = await started();

            await quickView.load('second_uri');

            expect(setFromURL).toHaveBeenCalledWith('second_uri');
            expect(quickView.model!.dropIt).toHaveBeenCalled();
            expect(quickView.orbitController.focusObject).toHaveBeenCalledWith(
                quickView.model,
            );
        });

        it('should keep the model where it loaded when told to', async () => {
            const quickView = await started();
            vi.mocked(quickView.model!.dropIt).mockClear();

            await quickView.load('second_uri', { dropToFloor: false });

            expect(quickView.model!.dropIt).not.toHaveBeenCalled();
            expect(quickView.orbitController.focusObject).toHaveBeenCalled();
        });

        it('should leave the camera alone when told to', async () => {
            const quickView = await started();

            await quickView.load('second_uri', { focus: false });

            expect(quickView.model!.dropIt).toHaveBeenCalled();
            expect(
                quickView.orbitController.focusObject,
            ).not.toHaveBeenCalled();
        });

        it('should reuse the node it already has for another model', async () => {
            // the node is the entity; swapping the asset must not replace it
            const quickView = await started();
            const node = quickView.model;

            await quickView.load('second_uri');

            expect(quickView.model).toBe(node);
            expect(DIVENode).toHaveBeenCalledTimes(1);
        });

        it('should settle only once the asset is in the scene', async () => {
            // awaited, so a caller can rebuild UI that depends on the geometry
            const quickView = await started();
            let loaded = false;
            vi.mocked(setFromURL).mockImplementationOnce(async () => {
                await Promise.resolve();
                loaded = true;
            });

            await quickView.load('second_uri');

            expect(loaded).toBe(true);
        });

        it('should let a failed load through to the caller', async () => {
            const quickView = await started();
            vi.mocked(setFromURL).mockRejectedValueOnce(
                new Error('asset load failed'),
            );

            await expect(quickView.load('broken_uri')).rejects.toThrow(
                'asset load failed',
            );
        });

        describe('two loads at once', () => {
            /** A load that only settles when the returned resolver is called. */
            const suspend = () => {
                let release: () => void = () => {};
                const gate = new Promise<void>((resolve) => {
                    release = resolve;
                });
                setFromURL.mockImplementationOnce(async () => {
                    await gate;
                });

                return release;
            };

            it('should not touch a model a newer load already took away', async () => {
                const quickView = await started();
                const release = suspend();

                const slow = quickView.load('slow_uri');
                await quickView.load(sceneData);
                release();

                await expect(slow).resolves.toBeUndefined();
                expect(quickView.model).toBeNull();
                expect(quickView.state).not.toBeNull();
            });

            it('should let the newest source win', async () => {
                const quickView = await started();
                const release = suspend();

                const slow = quickView.load('slow_uri');
                const fast = quickView.load('fast_uri');
                release();
                await Promise.all([slow, fast]);

                expect(setFromURL).toHaveBeenLastCalledWith('fast_uri');
            });

            it('should skip a load that was superseded before it ran', async () => {
                // three in flight, only the newest is worth doing
                const quickView = await started();
                const release = suspend();

                const first = quickView.load('first_uri');
                const second = quickView.load('second_uri');
                const third = quickView.load('third_uri');
                release();
                await Promise.all([first, second, third]);

                expect(setFromURL).not.toHaveBeenCalledWith('second_uri');
                expect(setFromURL).toHaveBeenLastCalledWith('third_uri');
            });

            it('should drop a queued load once the view is disposed', async () => {
                // rejected at the queue, so the asset is never fetched at all
                const quickView = await started();
                const release = suspend();

                const slow = quickView.load('slow_uri');
                await quickView.disposeAsync();
                release();
                await slow;

                expect(setFromURL).not.toHaveBeenCalled();
                expect(quickView.model).toBeNull();
            });

            it('should free a model that arrives after disposal', async () => {
                /**
                 * the asset was already in flight, so it lands in a node nobody
                 * owns any more -- and its geometry has to be freed there
                 */
                const quickView = await started();
                const release = suspend();

                const slow = quickView.load('slow_uri');
                await vi.waitFor(() =>
                    expect(setFromURL).toHaveBeenCalledWith('slow_uri'),
                );
                const node = quickView.model!;
                const freed = vi.mocked(node.components[0].dispose);
                freed.mockClear();

                await quickView.disposeAsync();
                release();
                await slow;

                expect(freed).toHaveBeenCalled();
                expect(node.removeFromParent).toHaveBeenCalled();
            });

            it('should free scene state that arrives after disposal', async () => {
                const quickView = await started();
                let release: () => void = () => {};
                const gate = new Promise<void>((resolve) => {
                    release = resolve;
                });
                statePerformAction.mockImplementationOnce(async () => {
                    await gate;
                    return [];
                });

                const slow = quickView.load(sceneData);
                await vi.waitFor(() =>
                    expect(statePerformAction).toHaveBeenCalled(),
                );

                await quickView.disposeAsync();
                stateDestroyInstance.mockClear();
                release();
                await slow;

                expect(stateDestroyInstance).toHaveBeenCalledTimes(1);
                expect(quickView.state).toBeNull();
            });
        });

        it('should apply scene data to a view built from a uri', async () => {
            const quickView = await started();
            const node = quickView.model!;

            await quickView.load(sceneData);

            expect(statePerformAction).toHaveBeenCalledWith(
                'SET_STATE',
                sceneData,
            );
            expect(quickView.state).not.toBeNull();
            // the model it replaced is gone, and its geometry with it
            expect(quickView.model).toBeNull();
            expect(node.components[0].dispose).toHaveBeenCalled();
            expect(node.removeFromParent).toHaveBeenCalled();
        });

        it('should load a model into a view built from scene data', async () => {
            const quickView = await started(sceneData);
            const entity = new DIVENode();
            rootNodes.push(entity);

            await quickView.load('a_uri');

            expect(setFromURL).toHaveBeenCalledWith('a_uri');
            expect(quickView.model).not.toBeNull();
            expect(quickView.state).toBeNull();
            // the state instance and everything it put in the scene are gone
            expect(stateDestroyInstance).toHaveBeenCalledTimes(1);
            expect(entity.components[0].dispose).toHaveBeenCalled();
        });

        it('should replace one scene state with another', async () => {
            const quickView = await started(sceneData);

            await quickView.load(sceneData);

            expect(stateDestroyInstance).toHaveBeenCalledTimes(1);
            expect(State).toHaveBeenCalledTimes(2);
        });
    });

    describe('disposal', () => {
        it('should dispose the orbit controller before the wrapped DIVE', async () => {
            const quickView = await QuickView('test_uri');

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

        it('should free the model it loaded', async () => {
            const quickView = await QuickView('test_uri');
            const node = quickView.model!;

            await quickView.disposeAsync();

            expect(node.components[0].dispose).toHaveBeenCalled();
        });

        it('should remove the State instance from the registry', async () => {
            // otherwise it lingers in State's static registry
            const quickView = await QuickView(sceneData);

            await quickView.disposeAsync();

            expect(stateDestroyInstance).toHaveBeenCalledTimes(1);
        });
    });
});
