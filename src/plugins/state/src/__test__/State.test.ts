import { EngineGateway } from '../EngineGateway.ts';
vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three')>();
    return { ...actual };
});

import { State } from '../State.ts';
import { DIVE, DIVEScene, DIVESettings } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Toolbox } from '@shopware-ag/dive/toolbox';
import { getActionClass } from '../ActionRegistry.ts';
import { Action } from '../actions/action.ts';
import { type ActionDependencies } from '../../types/index.ts';
import { PerspectiveCamera, type Vector3Like } from 'three/webgpu';
import { DIVENode } from '../../../../components/node/Node.ts';
import { PerspectiveCameraComponent } from '../../../../components/camera/PerspectiveCameraComponent.ts';

// Extend the global ActionTypes interface for our tests
declare global {
    interface ActionTypes {
        GET_CAMERA_TRANSFORM: typeof MockActionClass;
        TEST_MEDIA_CREATOR: typeof MediaCreatorActionClass;
        TEST_AR_SYSTEM: typeof ARSystemActionClass;
        TEST_ASSET_EXPORTER: typeof AssetExporterActionClass;
        TEST_ANIMATION_SYSTEM: typeof AnimationSystemActionClass;
        TEST_TOOLBOX: typeof ToolboxActionClass;
        TEST_DEPENDENCIES: typeof DependencyCaptureActionClass;
    }
}

// Records what an action actually receives, so the dependency object handed to
// actions can be asserted from the outside.
let capturedDependencies: ActionDependencies | undefined;

const DependencyCaptureActionClass = Action.define<
    void,
    ActionDependencies,
    void
>({
    description: 'Captures the dependencies it receives',
    execute: (payload, deps) => {
        capturedDependencies = deps;
    },
});

// Create a mock action class
const MockActionClass = Action.define<
    void,
    Pick<ActionDependencies, 'controller'>,
    {
        position: Vector3Like;
        target: Vector3Like;
    }
>({
    description: 'Mock action',
    execute: () => ({
        position: { x: 0, y: 0, z: 0 },
        target: { x: 0, y: 0, z: 0 },
    }),
});

// Create action classes that use different dependencies
const MediaCreatorActionClass = Action.define<
    void,
    Pick<ActionDependencies, 'getMediaCreator'>,
    void
>({
    description: 'Test media creator action',
    execute: async (payload, deps) => {
        await deps.getMediaCreator();
    },
});

const ARSystemActionClass = Action.define<
    void,
    Pick<ActionDependencies, 'getARSystem'>,
    void
>({
    description: 'Test AR system action',
    execute: async (payload, deps) => {
        await deps.getARSystem();
    },
});

const AssetExporterActionClass = Action.define<
    void,
    Pick<ActionDependencies, 'getAssetExporter'>,
    void
>({
    description: 'Test asset exporter action',
    execute: async (payload, deps) => {
        await deps.getAssetExporter();
    },
});

const AnimationSystemActionClass = Action.define<
    void,
    Pick<ActionDependencies, 'getAnimationSystem'>,
    void
>({
    description: 'Test animation system action',
    execute: async (payload, deps) => {
        await deps.getAnimationSystem();
    },
});

const ToolboxActionClass = Action.define<
    void,
    Pick<ActionDependencies, 'getToolbox'>,
    void
>({
    description: 'Test toolbox action',
    execute: async (payload, deps) => {
        await deps.getToolbox();
    },
});

// Mock dependencies
vi.mock('../../../../engine/Dive.ts', async () => {
    const mockDiveInstance = {
        uuid: 'mock-engine-uuid',
        mainView: {
            renderer: {
                uuid: 'mock-renderer-uuid',
            },
        },
        scene: {
            uuid: 'mock-scene-uuid',
        },
        camera: {
            uuid: 'mock-camera-uuid',
        },
    };

    const DIVE = vi.fn().mockImplementation(() => mockDiveInstance);

    (DIVE as any).QuickView = vi
        .fn()
        .mockImplementation(() => mockDiveInstance);

    return {
        DIVE,
    };
});
vi.mock(import('@shopware-ag/dive/orbitcontroller'), async (importOriginal) => {
    const actual = await importOriginal();
    const MockOrbitController = vi.fn().mockImplementation(() => ({
        uuid: 'mock-orbit-controller-uuid',
    }));

    // Explicitly define static properties
    (MockOrbitController as any).DEFAULT_ZOOM_FACTOR = (
        actual.OrbitController as any
    ).DEFAULT_ZOOM_FACTOR;
    // Add other static properties from actual.OrbitController if they exist and are needed

    return {
        ...actual,
        OrbitController:
            MockOrbitController as unknown as typeof actual.OrbitController, // Cast to satisfy stricter type checking
    };
});
vi.mock('../../toolbox/Toolbox.ts', () => ({
    DIVEToolbox: vi.fn().mockImplementation(() => ({
        uuid: 'mock-toolbox-uuid',
    })),
}));
vi.mock('../ActionRegistry');
describe('modules/state/State', () => {
    let state: State;
    let mockDive: DIVE;
    let mockController: OrbitController;
    let mockToolbox: Toolbox;
    let mockCamera: PerspectiveCamera;
    let cameraNode: DIVENode;
    let cameraComponent: PerspectiveCameraComponent;
    let mockScene: DIVEScene;

    beforeEach(() => {
        // Clear all instances before each test
        State['__instances'] = [];
        capturedDependencies = undefined;

        const diveSettings: Partial<DIVESettings> = {
            autoStart: false,
            displayAxes: false,
        };

        /**
         * a camera component on a node, the way the engine builds it: the
         * controller moves the node, so it has to be attached
         */
        cameraNode = new DIVENode();
        cameraComponent = cameraNode.addComponent(
            new PerspectiveCameraComponent(),
        );
        mockCamera = cameraComponent.camera;
        mockScene = new DIVEScene();
        mockDive = new DIVE(diveSettings);

        const mockCanvas = document.createElement('canvas');
        mockController = new OrbitController(cameraComponent, mockCanvas);

        state = new State(mockDive, mockController);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('Instance Management', () => {
        it('should destroy instance correctly', () => {
            const result = state.destroyInstance();
            expect(result).toBe(true);
        });

        it('should return false when destroying non-existent instance', () => {
            state.destroyInstance();
            const result = state.destroyInstance();
            expect(result).toBe(false);
        });
    });

    describe('Action Performance', () => {
        it('should perform action successfully', () => {
            const mockAction = 'GET_CAMERA_TRANSFORM';
            const mockResult = {
                position: { x: 0, y: 0, z: 0 },
                target: { x: 0, y: 0, z: 0 },
            };

            vi.mocked(getActionClass).mockReturnValue(MockActionClass);

            const result = state.performAction(mockAction);
            expect(result).toEqual(mockResult);
        });

        it('should handle async actions', async () => {
            const mockAction = 'GET_CAMERA_TRANSFORM';
            const mockResult = {
                position: { x: 0, y: 0, z: 0 },
                target: { x: 0, y: 0, z: 0 },
            };

            const AsyncMockActionClass = Action.define<
                void,
                Pick<ActionDependencies, 'controller'>,
                Promise<{
                    position: Vector3Like;
                    target: Vector3Like;
                }>
            >({
                description: 'Mock action',
                execute: async () => mockResult,
            });

            vi.mocked(getActionClass).mockReturnValue(
                AsyncMockActionClass as any,
            );

            const result = await state.performAction(mockAction);
            expect(result).toEqual(mockResult);
        });

        it('should throw error for non-existent action', () => {
            vi.mocked(getActionClass).mockReturnValue(undefined as any);

            expect(() => {
                state.performAction('GET_CAMERA_TRANSFORM');
            }).toThrow('Action GET_CAMERA_TRANSFORM is not defined');
        });

        it('should throw error when action execution fails', () => {
            const mockAction = 'GET_CAMERA_TRANSFORM';
            const mockError = new Error('Action failed');

            const ErrorMockActionClass = Action.define<
                void,
                Pick<ActionDependencies, 'controller'>,
                void
            >({
                description: 'Mock action',
                execute: () => {
                    throw mockError;
                },
            });

            vi.mocked(getActionClass).mockReturnValue(
                ErrorMockActionClass as any,
            );

            expect(() => {
                state.performAction(mockAction);
            }).toThrow('Failed to execute GET_CAMERA_TRANSFORM');
        });

        it('should handle action execution error with cause', () => {
            const mockAction = 'GET_CAMERA_TRANSFORM';
            const mockError = new Error('Inner error');

            const ErrorMockActionClass = Action.define<
                void,
                Pick<ActionDependencies, 'controller'>,
                void
            >({
                description: 'Mock action',
                execute: () => {
                    const error = new Error('Action failed');
                    error.cause = mockError;
                    throw error;
                },
            });

            vi.mocked(getActionClass).mockReturnValue(
                ErrorMockActionClass as any,
            );

            try {
                state.performAction(mockAction);
            } catch (err) {
                const error = err as Error & { cause: Error };
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe(
                    'Failed to execute GET_CAMERA_TRANSFORM',
                );
                expect(error.cause).toBeDefined();
                expect(error.cause.message).toBe('Action failed');
                expect((error.cause as Error & { cause: Error }).cause).toBe(
                    mockError,
                );
            }
        });

        it('should handle async action execution error with cause', async () => {
            const mockAction = 'GET_CAMERA_TRANSFORM';
            const mockError = new Error('Inner error');

            const AsyncErrorMockActionClass = Action.define<
                void,
                Pick<ActionDependencies, 'controller'>,
                Promise<void>
            >({
                description: 'Mock action',
                execute: async () => {
                    throw new Error('Inner action error', { cause: mockError });
                },
            });

            vi.mocked(getActionClass).mockReturnValue(
                AsyncErrorMockActionClass as any,
            );

            try {
                await state.performAction(mockAction);
            } catch (err) {
                const error = err as Error & { cause: Error };
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe(
                    'Failed to execute GET_CAMERA_TRANSFORM',
                );
                expect(error.cause).toBeDefined();
                expect(error.cause.message).toBe('Inner action error');
                expect((error.cause as Error & { cause: Error }).cause).toBe(
                    mockError,
                );
            }
        });
    });

    describe('Subscription Handling', () => {
        it('should subscribe to action', () => {
            const mockAction = 'GET_CAMERA_TRANSFORM';
            const mockListener = vi.fn();

            const unsubscribe = state.subscribe(mockAction, mockListener);
            expect(unsubscribe).toBeDefined();
            expect(typeof unsubscribe).toBe('function');
        });

        it('should call subscribed listeners when action is performed', () => {
            const mockAction = 'GET_CAMERA_TRANSFORM';
            const mockListener = vi.fn();

            state.subscribe(mockAction, mockListener);

            vi.mocked(getActionClass).mockReturnValue(MockActionClass);

            state.performAction(mockAction);
            expect(mockListener).toHaveBeenCalledWith(undefined);
        });

        it('should unsubscribe listener correctly', () => {
            const mockAction = 'GET_CAMERA_TRANSFORM';
            const mockListener = vi.fn();

            const unsubscribe = state.subscribe(mockAction, mockListener);
            unsubscribe();

            vi.mocked(getActionClass).mockReturnValue(MockActionClass);

            state.performAction(mockAction);
            expect(mockListener).not.toHaveBeenCalled();
        });
    });

    describe('Subscription Management', () => {
        const mockAction = 'GET_CAMERA_TRANSFORM';
        const mockListener = vi.fn();

        beforeEach(() => {
            mockListener.mockClear();
        });

        it('should subscribe and unsubscribe successfully', () => {
            const unsubscribe = state.subscribe(mockAction, mockListener);

            // Perform action to trigger listener
            vi.mocked(getActionClass).mockReturnValue(MockActionClass);
            state.performAction(mockAction);
            expect(mockListener).toHaveBeenCalled();

            // Unsubscribe and verify listener is not called
            unsubscribe();
            state.performAction(mockAction);
            expect(mockListener).toHaveBeenCalledTimes(1);
        });

        it('should handle unsubscribe when action type has no listeners', () => {
            const unsubscribe = state.subscribe(mockAction, mockListener);

            // Clear all listeners for this action type
            state['listeners'].delete(mockAction);

            // Should not throw when unsubscribing
            expect(() => unsubscribe()).not.toThrow();
        });

        it('should handle unsubscribe when listener is not found', () => {
            const unsubscribe = state.subscribe(mockAction, mockListener);

            // Remove the specific listener
            const listeners = state['listeners'].get(mockAction)!;
            listeners.splice(listeners.indexOf(mockListener), 1);

            // Should not throw when unsubscribing
            expect(() => unsubscribe()).not.toThrow();
        });

        it('should handle multiple subscriptions to same action', () => {
            const mockListener2 = vi.fn();

            state.subscribe(mockAction, mockListener);
            state.subscribe(mockAction, mockListener2);

            // Perform action to trigger both listeners
            vi.mocked(getActionClass).mockReturnValue(MockActionClass);
            state.performAction(mockAction);

            expect(mockListener).toHaveBeenCalled();
            expect(mockListener2).toHaveBeenCalled();
        });

        it('should handle dispatch when no listeners exist', () => {
            // Should not throw when dispatching to non-existent listeners
            expect(() => {
                state['dispatch'](mockAction, undefined);
            }).not.toThrow();
        });
    });

    describe('Lazy Loading Module Getters', () => {
        beforeEach(() => {
            // Mock the dynamic imports for each module
            vi.mock('@shopware-ag/dive/mediacreator', () => ({
                MediaCreator: vi.fn().mockImplementation(() => ({
                    uuid: 'mock-media-creator-uuid',
                })),
            }));

            vi.mock('@shopware-ag/dive/ar', () => ({
                ARSystem: vi.fn().mockImplementation(() => ({
                    uuid: 'mock-ar-system-uuid',
                })),
            }));

            vi.mock('@shopware-ag/dive/assetexporter', () => ({
                AssetExporter: vi.fn().mockImplementation(() => ({
                    uuid: 'mock-asset-exporter-uuid',
                })),
            }));

            vi.mock('@shopware-ag/dive/animation', () => ({
                AnimationSystem: vi.fn().mockImplementation(() => ({
                    uuid: 'mock-animation-system-uuid',
                })),
            }));

            vi.mock('@shopware-ag/dive/toolbox', () => ({
                Toolbox: vi.fn().mockImplementation(() => ({
                    uuid: 'mock-toolbox-uuid',
                })),
            }));
        });

        it('should build each module once, even for callers in the same tick', async () => {
            /**
             * the promise is cached, not the instance, and before anything is
             * awaited, or two actions fired back to back each build their own
             */
            const [first, second] = await Promise.all([
                state['getToolbox'](),
                state['getToolbox'](),
            ]);

            expect(first).toBe(second);
        });

        it('should build each of the other modules once as well', async () => {
            const pairs = await Promise.all([
                Promise.all([
                    state['getMediaCreator'](),
                    state['getMediaCreator'](),
                ]),
                Promise.all([state['getARSystem'](), state['getARSystem']()]),
                Promise.all([
                    state['getAssetExporter'](),
                    state['getAssetExporter'](),
                ]),
                Promise.all([
                    state['getAnimationSystem'](),
                    state['getAnimationSystem'](),
                ]),
            ]);

            pairs.forEach(([first, second]) => expect(first).toBe(second));
        });

        it('should lazy load MediaCreator when getMediaCreator is called', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                MediaCreatorActionClass as any,
            );

            await state.performAction('TEST_MEDIA_CREATOR');

            // Verify that MediaCreator was instantiated
            const { MediaCreator } =
                await import('@shopware-ag/dive/mediacreator');
            expect(MediaCreator).toHaveBeenCalledWith(
                mockDive.mainView.renderer,
                mockDive.scene,
                mockController,
            );
        });

        it('should lazy load ARSystem when getARSystem is called', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                ARSystemActionClass as any,
            );

            await state.performAction('TEST_AR_SYSTEM');

            // Verify that ARSystem was instantiated
            const { ARSystem } = await import('@shopware-ag/dive/ar');
            expect(ARSystem).toHaveBeenCalled();
        });

        it('should lazy load AssetExporter when getAssetExporter is called', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                AssetExporterActionClass as any,
            );

            await state.performAction('TEST_ASSET_EXPORTER');

            // Verify that AssetExporter was instantiated
            const { AssetExporter } =
                await import('@shopware-ag/dive/assetexporter');
            expect(AssetExporter).toHaveBeenCalled();
        });

        it('should lazy load AnimationSystem when getAnimationSystem is called', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                AnimationSystemActionClass as any,
            );

            await state.performAction('TEST_ANIMATION_SYSTEM');

            // Verify that AnimationSystem was instantiated
            const { AnimationSystem } =
                await import('@shopware-ag/dive/animation');
            expect(AnimationSystem).toHaveBeenCalled();
        });

        it('should lazy load Toolbox when getToolbox is called', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                ToolboxActionClass as any,
            );

            await state.performAction('TEST_TOOLBOX');

            // Verify that Toolbox was instantiated
            const { Toolbox } = await import('@shopware-ag/dive/toolbox');
            expect(Toolbox).toHaveBeenCalledWith(
                mockDive.scene,
                mockController,
            );
        });

        it('should reuse existing MediaCreator instance on subsequent calls', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                MediaCreatorActionClass as any,
            );

            // Call twice
            await state.performAction('TEST_MEDIA_CREATOR');
            await state.performAction('TEST_MEDIA_CREATOR');

            // Verify that MediaCreator was only instantiated once
            const { MediaCreator } =
                await import('@shopware-ag/dive/mediacreator');
            expect(MediaCreator).toHaveBeenCalledTimes(1);
        });

        it('should reuse existing ARSystem instance on subsequent calls', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                ARSystemActionClass as any,
            );

            // Call twice
            await state.performAction('TEST_AR_SYSTEM');
            await state.performAction('TEST_AR_SYSTEM');

            // Verify that ARSystem was only instantiated once
            const { ARSystem } = await import('@shopware-ag/dive/ar');
            expect(ARSystem).toHaveBeenCalledTimes(1);
        });

        it('should reuse existing AssetExporter instance on subsequent calls', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                AssetExporterActionClass as any,
            );

            // Call twice
            await state.performAction('TEST_ASSET_EXPORTER');
            await state.performAction('TEST_ASSET_EXPORTER');

            // Verify that AssetExporter was only instantiated once
            const { AssetExporter } =
                await import('@shopware-ag/dive/assetexporter');
            expect(AssetExporter).toHaveBeenCalledTimes(1);
        });

        it('should reuse existing AnimationSystem instance on subsequent calls', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                AnimationSystemActionClass as any,
            );

            // Call twice
            await state.performAction('TEST_ANIMATION_SYSTEM');
            await state.performAction('TEST_ANIMATION_SYSTEM');

            // Verify that AnimationSystem was only instantiated once
            const { AnimationSystem } =
                await import('@shopware-ag/dive/animation');
            expect(AnimationSystem).toHaveBeenCalledTimes(1);
        });

        it('should reuse existing Toolbox instance on subsequent calls', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                ToolboxActionClass as any,
            );

            // Call twice
            await state.performAction('TEST_TOOLBOX');
            await state.performAction('TEST_TOOLBOX');

            // Verify that Toolbox was only instantiated once
            const { Toolbox } = await import('@shopware-ag/dive/toolbox');
            expect(Toolbox).toHaveBeenCalledTimes(1);
        });
    });

    describe('Action Dependencies', () => {
        const performCapture = (): ActionDependencies => {
            vi.mocked(getActionClass).mockReturnValue(
                DependencyCaptureActionClass as any,
            );
            state.performAction('TEST_DEPENDENCIES');

            expect(capturedDependencies).toBeDefined();
            return capturedDependencies!;
        };

        it('should pass a gateway instead of the engine itself', () => {
            // the DIVE instance is deliberately not handed out — an action
            // reaching past the gateway is what this replaces
            const deps = performCapture();

            expect(deps.gateway).toBeInstanceOf(EngineGateway);
            expect(deps).not.toHaveProperty('engine');
        });

        it('should reuse one gateway for the whole instance', () => {
            expect(performCapture().gateway).toBe(performCapture().gateway);
        });

        it('should pass the orbit controller it was constructed with', () => {
            expect(performCapture().controller).toBe(mockController);
        });

        it('should pass the live registry rather than a copy of it', () => {
            const deps = performCapture();

            expect(deps.registry).toBe(state['registry']);

            // the action sees entities that are registered afterwards
            state['registry'].register({
                id: 'added-later',
                entityType: 'model',
            } as never);

            expect(deps.registry.read('added-later')).toBeDefined();
        });

        it('should pass a dispatch that notifies without performing an action', () => {
            const deps = performCapture();
            const listener = vi.fn();
            state.subscribe('UPDATE_OBJECT', listener);

            deps.dispatch('UPDATE_OBJECT', { id: 'reported' } as never);

            /**
             * reaches subscribers, but never runs UpdateObjectAction — which is
             * what an engine-to-state report needs
             */
            expect(listener).toHaveBeenCalledWith({ id: 'reported' });
            expect(getActionClass).not.toHaveBeenCalledWith('UPDATE_OBJECT');
        });

        it('should expose the lazy module getters as functions', () => {
            const deps = performCapture();

            expect(typeof deps.getMediaCreator).toBe('function');
            expect(typeof deps.getARSystem).toBe('function');
            expect(typeof deps.getAssetExporter).toBe('function');
            expect(typeof deps.getAnimationSystem).toBe('function');
            expect(typeof deps.getToolbox).toBe('function');
        });

        it('should build a fresh dependency object per action', () => {
            const first = performCapture();
            const second = performCapture();

            expect(second).not.toBe(first);
            expect(second.gateway).toBe(first.gateway);
            expect(second.registry).toBe(first.registry);
        });

        it('should scope the dependencies to the instance performing the action', () => {
            const otherDive = new DIVE({
                autoStart: false,
                displayAxes: false,
            });
            const otherController = new OrbitController(
                cameraComponent,
                document.createElement('canvas'),
            );
            const otherState = new State(otherDive, otherController);

            const own = performCapture();

            vi.mocked(getActionClass).mockReturnValue(
                DependencyCaptureActionClass as any,
            );
            otherState.performAction('TEST_DEPENDENCIES');
            const other = capturedDependencies!;

            expect(other.gateway).not.toBe(own.gateway);
            expect(other.controller).toBe(otherController);
            expect(other.registry).not.toBe(own.registry);
        });
    });
});
