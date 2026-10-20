import { EngineGateway } from '../EngineGateway.ts';
import { State } from '../State.ts';
import {
    DIVE,
    DIVERoot,
    DIVEScene,
    DIVESettings,
    ModelComponent,
    type DIVESceneObject,
} from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Toolbox } from '@shopware-ag/dive/toolbox';
import { getActionClass } from '../ActionRegistry.ts';
import { Action } from '../actions/action.ts';
import {
    type ActionDependencies,
    type ModelSchema,
} from '../../types/index.ts';
import { Object3D, PerspectiveCamera, type Vector3Like } from 'three/webgpu';
import { DIVENode } from '../../../../engine/node/Node.ts';
import { PerspectiveCameraComponent } from '../../../../components/camera/perspective/PerspectiveCameraComponent.ts';

// every action registers itself on import
import '../actions/index.ts';

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
            canvas: { uuid: 'mock-canvas' },
        },
        scene: {
            uuid: 'mock-scene-uuid',
        },
        camera: {
            uuid: 'mock-camera-uuid',
        },
    };

    const DIVE = vi.fn().mockImplementation(function () {
        return mockDiveInstance;
    });

    (DIVE as any).QuickView = vi.fn().mockImplementation(function () {
        return mockDiveInstance;
    });

    return {
        DIVE,
    };
});
vi.mock(import('@shopware-ag/dive/orbitcontroller'), async (importOriginal) => {
    const actual = await importOriginal();
    const MockOrbitController = vi.fn().mockImplementation(function () {
        return {
            uuid: 'mock-orbit-controller-uuid',
        };
    });

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
    DIVEToolbox: vi.fn().mockImplementation(function () {
        return {
            uuid: 'mock-toolbox-uuid',
        };
    }),
}));
/**
 * Switches between stand-ins and real implementations per suite: the reporting
 * suite runs real actions and selects through a real toolbox.
 */
const real = vi.hoisted(() => ({
    toolbox: false,
    actionRegistry: undefined as
        typeof import('../ActionRegistry.ts') | undefined,
}));

const loadAsset = vi.fn(async () => {
    const { Object3D } =
        await vi.importActual<typeof import('three/webgpu')>('three/webgpu');
    return new Object3D();
});

vi.mock('@shopware-ag/dive/assetloader', () => ({
    AssetLoader: vi.fn(function (this: Record<string, unknown>) {
        this.load = loadAsset;
        return this;
    }),
}));

vi.mock('@shopware-ag/dive/mediacreator', () => ({
    MediaCreator: vi.fn().mockImplementation(function () {
        return {
            uuid: 'mock-media-creator-uuid',
        };
    }),
}));

vi.mock('@shopware-ag/dive/ar', () => ({
    ARSystem: vi.fn().mockImplementation(function () {
        return {
            uuid: 'mock-ar-system-uuid',
        };
    }),
}));

vi.mock('@shopware-ag/dive/assetexporter', () => ({
    AssetExporter: vi.fn().mockImplementation(function () {
        return {
            uuid: 'mock-asset-exporter-uuid',
        };
    }),
}));

vi.mock('@shopware-ag/dive/animation', () => ({
    AnimationSystem: vi.fn().mockImplementation(function () {
        return {
            uuid: 'mock-animation-system-uuid',
            dispose: vi.fn(),
        };
    }),
}));

vi.mock('@shopware-ag/dive/toolbox', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('@shopware-ag/dive/toolbox')>();
    return {
        ...actual,
        Toolbox: vi.fn().mockImplementation(function (
            ...args: ConstructorParameters<typeof actual.Toolbox>
        ) {
            if (real.toolbox) {
                return new actual.Toolbox(...args);
            }
            return {
                uuid: 'mock-toolbox-uuid',
                dispose: vi.fn(),
            };
        }),
    };
});

// getActionClass is a bare stub unless a suite hands it the real lookup
vi.mock('../ActionRegistry.ts', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('../ActionRegistry.ts')>();
    real.actionRegistry = actual;
    return { ...actual, getActionClass: vi.fn() };
});

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

        mockController = new OrbitController(cameraComponent);

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

        it('should take down the modules it built', async () => {
            /**
             * they are this state's to take down because they are this state's to
             * build: a Toolbox listens on the canvas and puts a gizmo in the
             * scene from its constructor
             */
            const toolbox = await state['getToolbox']();
            const animation = await state['getAnimationSystem']();

            state.destroyInstance();
            await Promise.resolve();

            expect(toolbox.dispose).toHaveBeenCalledTimes(1);
            expect(animation.dispose).toHaveBeenCalledTimes(1);
        });

        it('should take down a module that was still being imported', async () => {
            // awaited rather than checked, so it is torn down when it arrives
            const pending = state['getToolbox']();

            state.destroyInstance();
            const toolbox = await pending;
            await Promise.resolve();

            expect(toolbox.dispose).toHaveBeenCalledTimes(1);
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
                mockDive.mainView.canvas,
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
            const otherController = new OrbitController(cameraComponent);
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

    /**
     * What a subscriber outside DIVE sees when an object reports about itself.
     *
     * The path this covers is the one a consumer depends on and no unit test spans:
     * a scene object dispatches an event, `watchEntity` turns it into a `dispatch`,
     * and `State.subscribe` hands it to the application. Every piece of it is
     * covered on its own; this asserts they are actually connected, and that the
     * payload is the one consumers already read.
     *
     * Reports go engine -> state, so nothing here runs an action. That is the point:
     * a report used to perform `UPDATE_OBJECT`, which commanded the object that had
     * just moved.
     */
    describe('reporting to subscribers', () => {
        /** Compares a three vector/euler by component, sidestepping -0 vs 0. */
        const expectVec = (
            actual: { x: number; y: number; z: number },
            expected: { x: number; y: number; z: number },
        ): void => {
            expect(actual.x).toBeCloseTo(expected.x);
            expect(actual.y).toBeCloseTo(expected.y);
            expect(actual.z).toBeCloseTo(expected.z);
        };

        const modelData = (): ModelSchema => ({
            id: 'model-1',
            entityType: 'model',
            name: 'M',
            visible: true,
            uri: 'a.glb',
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            loaded: false,
            parentId: null,
        });

        let state: State;
        let root: DIVERoot;
        let node: DIVENode;

        /** Adds a model through the real action and returns its scene object. */
        const addModel = async (): Promise<DIVENode> => {
            const added = (await state.performAction(
                'ADD_OBJECT',
                modelData(),
            )) as DIVESceneObject;

            return added as unknown as DIVENode;
        };

        beforeEach(async () => {
            real.toolbox = true;
            vi.mocked(getActionClass).mockImplementation(
                real.actionRegistry!.getActionClass,
            );
            State['__instances'] = [];

            root = new DIVERoot();
            /**
             * enough of a scene and a controller for the toolbox to build on, which
             * the selection actions need
             */
            state = new State(
                {
                    scene: Object.assign(new Object3D(), { root }),
                    mainView: { canvas: document.createElement('canvas') },
                } as unknown as DIVE,
                {
                    object: new Object3D(),
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                } as unknown as OrbitController,
            );

            node = await addModel();
        });

        afterEach(() => {
            real.toolbox = false;
            vi.mocked(getActionClass).mockReset();
        });

        it('should put the object in the scene', () => {
            expect(node).toBeInstanceOf(DIVENode);
        });

        describe('a gizmo drag', () => {
            it('should reach an UPDATE_OBJECT subscriber', () => {
                const onUpdate = vi.fn();
                state.subscribe('UPDATE_OBJECT', onUpdate);

                // what dragging the gizmo does: the object reports its own move
                node.position.set(1, 2, 3);
                node.onMove();

                expect(onUpdate).toHaveBeenCalledTimes(1);

                // the payload a consumer already reads: these five keys and no others
                const report = onUpdate.mock.calls[0][0];
                expect(Object.keys(report).sort()).toEqual([
                    'entityType',
                    'id',
                    'position',
                    'rotation',
                    'scale',
                ]);
                expect(report.id).toBe('model-1');
                expect(report.entityType).toBe('model');
                expect(report.position).toEqual({ x: 1, y: 2, z: 3 });
                /**
                 * by component: a euler off a matrix carries -0, which deep equality
                 * tells apart from 0 and nothing else does
                 */
                expectVec(report.rotation, { x: 0, y: 0, z: 0 });
                expectVec(report.scale, { x: 1, y: 1, z: 1 });
            });

            it('should report the world position, not the local one', () => {
                const group = new DIVENode();
                group.position.set(10, 0, 0);
                root.add(group);
                group.attach(node);

                const onUpdate = vi.fn();
                state.subscribe('UPDATE_OBJECT', onUpdate);

                node.position.set(1, 0, 0);
                node.onMove();

                expect(onUpdate).toHaveBeenCalledWith(
                    expect.objectContaining({
                        position: expect.objectContaining({ x: 11 }),
                    }),
                );
            });

            it('should leave the object where the gizmo put it', () => {
                /**
                 * a report that ran UPDATE_OBJECT used to write the position back
                 * through worldToLocal onto this very node, once per frame
                 */
                state.subscribe('UPDATE_OBJECT', vi.fn());

                node.position.set(1, 2, 3);
                node.onMove();

                expect(node.position.toArray()).toEqual([1, 2, 3]);
            });

            it('should keep what GET_STATE reports in step with it', () => {
                node.position.set(4, 5, 6);
                node.onMove();

                const objects = state.performAction('GET_ALL_OBJECTS');

                expect(objects.get('model-1')).toMatchObject({
                    position: { x: 4, y: 5, z: 6 },
                });
            });

            it('should stop reporting once the object is deleted', () => {
                const onUpdate = vi.fn();
                state.subscribe('UPDATE_OBJECT', onUpdate);
                state.performAction('DELETE_OBJECT', { id: 'model-1' });
                onUpdate.mockClear();

                node.onMove();

                expect(onUpdate).not.toHaveBeenCalled();
            });
        });

        describe('a selection in the scene', () => {
            it('should reach a SELECT_OBJECT subscriber exactly once', () => {
                const onSelect = vi.fn();
                state.subscribe('SELECT_OBJECT', onSelect);

                node.onSelect();

                expect(onSelect).toHaveBeenCalledTimes(1);
                expect(onSelect).toHaveBeenCalledWith({
                    id: 'model-1',
                    entityType: 'model',
                });
            });

            it('should reach a DESELECT_OBJECT subscriber exactly once', () => {
                const onDeselect = vi.fn();
                state.subscribe('DESELECT_OBJECT', onDeselect);

                node.onDeselect();

                expect(onDeselect).toHaveBeenCalledTimes(1);
                expect(onDeselect).toHaveBeenCalledWith({
                    id: 'model-1',
                    entityType: 'model',
                });
            });
        });

        describe('a finished asset load', () => {
            /**
             * reported by the component that loads, not by the node, fetching an asset
             * is not the node's business
             */
            const reportLoad = (): void => {
                node.getComponent(ModelComponent)!.dispatchEvent({
                    type: 'object-load',
                });
            };

            it('should reach a MODEL_LOADED subscriber', () => {
                const onLoaded = vi.fn();
                state.subscribe('MODEL_LOADED', onLoaded);

                reportLoad();

                expect(onLoaded).toHaveBeenCalledWith({ id: 'model-1' });
            });

            it('should mark the model loaded in the state', () => {
                reportLoad();

                const objects = state.performAction('GET_ALL_OBJECTS');

                expect(objects.get('model-1')).toMatchObject({ loaded: true });
            });
        });

        describe('after the state is destroyed', () => {
            it('should stop reporting to subscribers', async () => {
                /**
                 * the registry holds every watchEntity teardown, so a state that
                 * forgets to clear it leaves the listeners on the nodes -- reporting
                 * into a state nobody uses any more
                 */
                const onUpdate = vi.fn();
                state.subscribe('UPDATE_OBJECT', onUpdate);

                state.destroyInstance();
                node.onMove();

                expect(onUpdate).not.toHaveBeenCalled();
            });

            it('should leave no listener on the nodes it watched', async () => {
                // the consequence above, seen directly on the node
                state.destroyInstance();

                const listeners = (
                    node as unknown as {
                        _listeners?: Record<string, unknown[] | undefined>;
                    }
                )._listeners;
                expect(listeners?.['object-transform']?.length ?? 0).toBe(0);
            });

            it('should forget its subscribers', async () => {
                const onUpdate = vi.fn();
                state.subscribe('UPDATE_OBJECT', onUpdate);

                state.destroyInstance();

                expect(
                    (state as unknown as { listeners: Map<string, unknown[]> })
                        .listeners.size,
                ).toBe(0);
            });
        });

        describe('how many notifications one action produces', () => {
            /**
             * one per object that actually changed, and no more, the write path used to
             * report once per transform field on top of performAction's own
             */
            const fullPatch = {
                id: 'model-1',
                entityType: 'model' as const,
                position: { x: 7, y: 0, z: 0 },
                rotation: { x: 0, y: 1, z: 0 },
                scale: { x: 2, y: 2, z: 2 },
            };

            /** Adds a group and puts the model in it. */
            const group = async (): Promise<void> => {
                await state.performAction('ADD_OBJECT', {
                    id: 'g',
                    entityType: 'group',
                    name: 'G',
                    visible: true,
                    parentId: null,
                    position: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 1, y: 1, z: 1 },
                } as never);
                await state.performAction('SET_PARENT', {
                    object: { id: 'model-1' },
                    parent: { id: 'g' },
                });
            };

            it('should send one for a patch carrying position, rotation and scale', async () => {
                const onUpdate = vi.fn();
                state.subscribe('UPDATE_OBJECT', onUpdate);

                await state.performAction('UPDATE_OBJECT', fullPatch);

                expect(onUpdate).toHaveBeenCalledTimes(1);
            });

            it('should send one for a patch carrying nothing but a name', async () => {
                /**
                 * no transform changes, so nothing reports -- the one performAction
                 * sends is what keeps this from going unannounced
                 */
                const onUpdate = vi.fn();
                state.subscribe('UPDATE_OBJECT', onUpdate);

                await state.performAction('UPDATE_OBJECT', {
                    id: 'model-1',
                    entityType: 'model',
                    name: 'renamed',
                });

                expect(onUpdate).toHaveBeenCalledTimes(1);
            });

            it('should send one per object when a group moves', async () => {
                await group();
                const reported: string[] = [];
                state.subscribe('UPDATE_OBJECT', (payload) =>
                    reported.push((payload as { id: string }).id),
                );

                await state.performAction('UPDATE_OBJECT', {
                    id: 'g',
                    entityType: 'group',
                    position: { x: 5, y: 0, z: 0 },
                    rotation: { x: 0, y: 1, z: 0 },
                    scale: { x: 2, y: 2, z: 2 },
                } as never);

                // the member moved in world space and is its own entity to a consumer
                expect(reported.sort()).toEqual(['g', 'model-1']);
            });

            it('should send one per object when a group is dragged', async () => {
                await group();
                const reported: string[] = [];
                state.subscribe('UPDATE_OBJECT', (payload) =>
                    reported.push((payload as { id: string }).id),
                );

                // what the gizmo does per frame, on the group
                const groupNode = node.parent as DIVENode;
                groupNode.position.set(9, 0, 0);
                groupNode.onMove();

                /**
                 * the member used to be left out here, so its reported position went
                 * stale as soon as anyone dragged the group
                 */
                expect(reported.sort()).toEqual(['g', 'model-1']);
            });

            it('should send one when the object is moved directly', async () => {
                const onUpdate = vi.fn();
                state.subscribe('UPDATE_OBJECT', onUpdate);

                node.setPosition({ x: 3, y: 0, z: 0 });

                expect(onUpdate).toHaveBeenCalledTimes(1);
            });
        });

        describe('how many notifications a selection produces', () => {
            /**
             * one per object whose selection actually changed, an action used to
             * announce itself twice because the object reported it as well
             */
            const otherModel = async (): Promise<DIVENode> => {
                const added = (await state.performAction('ADD_OBJECT', {
                    ...modelData(),
                    id: 'model-2',
                })) as DIVESceneObject;

                return added as unknown as DIVENode;
            };

            let selects: unknown[];
            let deselects: unknown[];

            beforeEach(() => {
                selects = [];
                deselects = [];
                state.subscribe('SELECT_OBJECT', (payload) =>
                    selects.push(payload),
                );
                state.subscribe('DESELECT_OBJECT', (payload) =>
                    deselects.push(payload),
                );
            });

            it('should send one for a selection through the action', async () => {
                await state.performAction('SELECT_OBJECT', { id: 'model-1' });

                expect(selects).toHaveLength(1);
            });

            it('should send one for a click', async () => {
                const toolbox = await state['getToolbox']();

                toolbox.selectionState.select(node as never);

                expect(selects).toHaveLength(1);
            });

            it('should announce the object a selection displaced', async () => {
                /**
                 * the only source for that news: nobody asked for it, so the object
                 * reports it even on the silent path
                 */
                await otherModel();
                await state.performAction('SELECT_OBJECT', { id: 'model-1' });
                selects.length = 0;

                await state.performAction('SELECT_OBJECT', { id: 'model-2' });

                expect(selects).toHaveLength(1);
                expect(deselects).toEqual([
                    { id: 'model-1', entityType: 'model' },
                ]);
            });

            it('should still send one when the same object is selected again', async () => {
                /**
                 * SelectionState stops early, so nothing reports -- the one
                 * performAction sends is what keeps this from going unanswered
                 */
                await state.performAction('SELECT_OBJECT', { id: 'model-1' });
                selects.length = 0;

                await state.performAction('SELECT_OBJECT', { id: 'model-1' });

                expect(selects).toHaveLength(1);
            });

            it('should send one for a deselection through the action', async () => {
                await state.performAction('SELECT_OBJECT', { id: 'model-1' });

                await state.performAction('DESELECT_OBJECT', { id: 'model-1' });

                expect(deselects).toHaveLength(1);
            });

            it('should send one for a click that deselects', async () => {
                const toolbox = await state['getToolbox']();
                toolbox.selectionState.select(node as never);
                deselects.length = 0;

                toolbox.selectionState.deselect();

                expect(deselects).toHaveLength(1);
            });

            it('should still let the gizmo attach on a programmatic selection', async () => {
                // TransformTool listens through onChange, which the silent path fires
                const toolbox = await state['getToolbox']();
                const changes: unknown[] = [];
                toolbox.selectionState.onChange((selected) =>
                    changes.push(selected),
                );

                await state.performAction('SELECT_OBJECT', { id: 'model-1' });

                expect(changes).toEqual([node]);
                expect(toolbox.selectionState.selected).toBe(node);
            });
        });

        it('should keep two instances apart', () => {
            // a page may hold more than one DIVE; a report must reach its own state
            const other = new State(
                { scene: { root: new DIVERoot() } } as unknown as DIVE,
                {} as unknown as OrbitController,
            );

            const onOwn = vi.fn();
            const onOther = vi.fn();
            state.subscribe('UPDATE_OBJECT', onOwn);
            other.subscribe('UPDATE_OBJECT', onOther);

            node.onMove();

            expect(onOwn).toHaveBeenCalled();
            expect(onOther).not.toHaveBeenCalled();
        });
    });
});
