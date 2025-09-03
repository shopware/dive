import { State } from '../State.ts';
import {
    DIVE,
    DIVEPerspectiveCamera,
    DIVEScene,
    DIVESettings,
} from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Toolbox } from '@shopware-ag/dive/toolbox';
import { getActionClass } from '../ActionRegistry.ts';
import { Action } from '../actions/action.ts';
import { type ActionDependencies } from '../../types/index.ts';
import { type Vector3Like } from 'three';

// Extend the global ActionTypes interface for our tests
declare global {
    interface ActionTypes {
        GET_CAMERA_TRANSFORM: typeof MockActionClass;
        TEST_MEDIA_CREATOR: typeof MediaCreatorActionClass;
        TEST_AR_SYSTEM: typeof ARSystemActionClass;
        TEST_ASSET_EXPORTER: typeof AssetExporterActionClass;
        TEST_ANIMATION_SYSTEM: typeof AnimationSystemActionClass;
        TEST_TOOLBOX: typeof ToolboxActionClass;
    }
}

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
vi.mock(
    import('../../../../engine/camera/PerspectiveCamera.ts'),
    async (importOriginal) => {
        const actual = await importOriginal();
        const MockDIVEPerspectiveCamera = vi.fn().mockImplementation(() => ({
            uuid: 'mock-perspective-camera-uuid',
        }));

        // Explicitly define static properties
        (MockDIVEPerspectiveCamera as any).EDITOR_VIEW_LAYER_MASK = (
            actual.DIVEPerspectiveCamera as any
        ).EDITOR_VIEW_LAYER_MASK;
        (MockDIVEPerspectiveCamera as any).LIVE_VIEW_LAYER_MASK = (
            actual.DIVEPerspectiveCamera as any
        ).LIVE_VIEW_LAYER_MASK;
        (MockDIVEPerspectiveCamera as any).DEFAULT_UP = (
            actual.DIVEPerspectiveCamera as any
        ).DEFAULT_UP;
        (MockDIVEPerspectiveCamera as any).DEFAULT_MATRIX_AUTO_UPDATE = (
            actual.DIVEPerspectiveCamera as any
        ).DEFAULT_MATRIX_AUTO_UPDATE;
        (MockDIVEPerspectiveCamera as any).DEFAULT_MATRIX_WORLD_AUTO_UPDATE = (
            actual.DIVEPerspectiveCamera as any
        ).DEFAULT_MATRIX_WORLD_AUTO_UPDATE;

        return {
            ...actual,
            DIVEPerspectiveCamera:
                MockDIVEPerspectiveCamera as unknown as typeof actual.DIVEPerspectiveCamera,
        };
    },
);
vi.mock('../../../engine/scene/Scene.ts', () => ({
    DIVEScene: vi.fn().mockImplementation(() => ({
        uuid: 'mock-scene-uuid',
    })),
}));
describe('modules/state/State', () => {
    let state: State;
    let mockDive: DIVE;
    let mockController: OrbitController;
    let mockToolbox: Toolbox;
    let mockCamera: DIVEPerspectiveCamera;
    let mockScene: DIVEScene;

    beforeEach(() => {
        // Clear all instances before each test
        State['__instances'] = [];

        const diveSettings: Partial<DIVESettings> = {
            autoStart: false,
            displayAxes: false,
        };

        mockCamera = new DIVEPerspectiveCamera();
        mockScene = new DIVEScene();
        mockDive = new DIVE(diveSettings);

        const mockCanvas = document.createElement('canvas');
        mockController = new OrbitController(mockCamera, mockCanvas);

        state = new State(mockDive, mockController);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('Instance Management', () => {
        it('should create a new instance with unique ID', () => {
            expect(state.id).toBeDefined();
            expect(typeof state.id).toBe('string');
        });

        it('should be able to get instance by ID', () => {
            const foundState = State.get(state.id);
            expect(foundState).toBe(state);
        });

        it('should destroy instance correctly', () => {
            const result = state.destroyInstance();
            expect(result).toBe(true);
            expect(State.get(state.id)).toBeUndefined();
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

    describe('Static Methods', () => {
        it('should get instance by ID', () => {
            const foundState = State.get(state.id);
            expect(foundState).toBe(state);
        });

        it('should get instance by registered object ID', () => {
            const mockEntity = {
                id: 'test-entity-id',
            };
            state['registered'].set('test-entity-id', mockEntity as any);
            const foundState = State.get('test-entity-id');
            expect(foundState).toBe(state);
        });

        it('should return undefined when instance not found', () => {
            const foundState = State.get('non-existent-id');
            expect(foundState).toBeUndefined();
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

        it('should lazy load MediaCreator when getMediaCreator is called', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                MediaCreatorActionClass as any,
            );

            await state.performAction('TEST_MEDIA_CREATOR');

            // Verify that MediaCreator was instantiated
            const { MediaCreator } = await import(
                '@shopware-ag/dive/mediacreator'
            );
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
            const { AssetExporter } = await import(
                '@shopware-ag/dive/assetexporter'
            );
            expect(AssetExporter).toHaveBeenCalled();
        });

        it('should lazy load AnimationSystem when getAnimationSystem is called', async () => {
            vi.mocked(getActionClass).mockReturnValue(
                AnimationSystemActionClass as any,
            );

            await state.performAction('TEST_ANIMATION_SYSTEM');

            // Verify that AnimationSystem was instantiated
            const { AnimationSystem } = await import(
                '@shopware-ag/dive/animation'
            );
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
            const { MediaCreator } = await import(
                '@shopware-ag/dive/mediacreator'
            );
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
            const { AssetExporter } = await import(
                '@shopware-ag/dive/assetexporter'
            );
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
            const { AnimationSystem } = await import(
                '@shopware-ag/dive/animation'
            );
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
});
