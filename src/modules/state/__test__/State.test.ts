import { State } from '../State';
import { DIVEEngine, type EngineSettings } from '../../../engine/Engine';
import { OrbitController } from '../../controller/orbit/OrbitController';
import { DIVEToolbox } from '../../toolbox/Toolbox';
import { getActionClass } from '../ActionRegistry';
import { DIVEPerspectiveCamera } from '../../../engine/camera/PerspectiveCamera';
import { DIVEScene } from '../../../engine/scene/Scene';
import { Action } from '../actions/action';
import { type ActionDependencies } from '../types';
import { type Vector3Like } from 'three';

// Extend the global ActionTypes interface for our tests
declare global {
    interface ActionTypes {
        GET_CAMERA_TRANSFORM: typeof MockActionClass;
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

// Mock dependencies
jest.mock('../../../engine/Engine', () => ({
    DIVEEngine: jest.fn().mockImplementation(() => ({
        uuid: 'mock-engine-uuid',
    })),
}));
jest.mock('../../controller/orbit/OrbitController', () => ({
    OrbitController: jest.fn().mockImplementation(() => ({
        uuid: 'mock-orbit-controller-uuid',
    })),
}));
jest.mock('../../toolbox/Toolbox', () => ({
    DIVEToolbox: jest.fn().mockImplementation(() => ({
        uuid: 'mock-toolbox-uuid',
    })),
}));
jest.mock('../ActionRegistry');
jest.mock('../../../engine/camera/PerspectiveCamera', () => ({
    DIVEPerspectiveCamera: jest.fn().mockImplementation(() => ({
        uuid: 'mock-perspective-camera-uuid',
    })),
}));
jest.mock('../../../engine/scene/Scene', () => ({
    DIVEScene: jest.fn().mockImplementation(() => ({
        uuid: 'mock-scene-uuid',
    })),
}));
describe('modules/state/State', () => {
    let state: State;
    let mockEngine: jest.Mocked<DIVEEngine>;
    let mockController: jest.Mocked<OrbitController>;
    let mockToolbox: jest.Mocked<DIVEToolbox>;
    let mockCamera: jest.Mocked<DIVEPerspectiveCamera>;
    let mockScene: jest.Mocked<DIVEScene>;

    beforeEach(() => {
        // Clear all instances before each test
        State['__instances'] = [];

        const engineSettings: Partial<EngineSettings> = {
            autoStart: false,
            displayAxes: false,
        };

        mockCamera =
            new DIVEPerspectiveCamera() as jest.Mocked<DIVEPerspectiveCamera>;
        mockScene = new DIVEScene() as jest.Mocked<DIVEScene>;
        mockEngine = new DIVEEngine(engineSettings) as jest.Mocked<DIVEEngine>;

        // Mock the getters
        Object.defineProperty(mockEngine, 'camera', {
            get: () => mockCamera,
        });
        Object.defineProperty(mockEngine, 'scene', {
            get: () => mockScene,
        });

        const mockCanvas = document.createElement('canvas');
        mockController = new OrbitController(
            mockCamera,
            mockCanvas,
        ) as jest.Mocked<OrbitController>;
        mockToolbox = new DIVEToolbox(
            mockScene,
            mockController,
        ) as jest.Mocked<DIVEToolbox>;

        state = new State(mockEngine, mockController, mockToolbox);
    });

    afterEach(() => {
        jest.clearAllMocks();
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
            const result = state.DestroyInstance();
            expect(result).toBe(true);
            expect(State.get(state.id)).toBeUndefined();
        });

        it('should return false when destroying non-existent instance', () => {
            state.DestroyInstance();
            const result = state.DestroyInstance();
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

            (getActionClass as jest.Mock).mockReturnValue(MockActionClass);

            const result = state.PerformAction(mockAction);
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

            (getActionClass as jest.Mock).mockReturnValue(AsyncMockActionClass);

            const result = await state.PerformAction(mockAction);
            expect(result).toEqual(mockResult);
        });

        it('should throw error for non-existent action', () => {
            (getActionClass as jest.Mock).mockReturnValue(undefined);

            expect(() => {
                state.PerformAction('GET_CAMERA_TRANSFORM');
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

            (getActionClass as jest.Mock).mockReturnValue(ErrorMockActionClass);

            expect(() => {
                state.PerformAction(mockAction);
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

            (getActionClass as jest.Mock).mockReturnValue(ErrorMockActionClass);

            try {
                state.PerformAction(mockAction);
                fail('Should have thrown an error');
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

            (getActionClass as jest.Mock).mockReturnValue(
                AsyncErrorMockActionClass,
            );

            try {
                await state.PerformAction(mockAction);
                fail('Should have thrown an error');
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
            const mockListener = jest.fn();

            const unsubscribe = state.Subscribe(mockAction, mockListener);
            expect(unsubscribe).toBeDefined();
            expect(typeof unsubscribe).toBe('function');
        });

        it('should call subscribed listeners when action is performed', () => {
            const mockAction = 'GET_CAMERA_TRANSFORM';
            const mockListener = jest.fn();

            state.Subscribe(mockAction, mockListener);

            (getActionClass as jest.Mock).mockReturnValue(MockActionClass);

            state.PerformAction(mockAction);
            expect(mockListener).toHaveBeenCalledWith(undefined);
        });

        it('should unsubscribe listener correctly', () => {
            const mockAction = 'GET_CAMERA_TRANSFORM';
            const mockListener = jest.fn();

            const unsubscribe = state.Subscribe(mockAction, mockListener);
            unsubscribe();

            (getActionClass as jest.Mock).mockReturnValue(MockActionClass);

            state.PerformAction(mockAction);
            expect(mockListener).not.toHaveBeenCalled();
        });
    });

    describe('Subscription Management', () => {
        const mockAction = 'GET_CAMERA_TRANSFORM';
        const mockListener = jest.fn();

        beforeEach(() => {
            mockListener.mockClear();
        });

        it('should subscribe and unsubscribe successfully', () => {
            const unsubscribe = state.Subscribe(mockAction, mockListener);

            // Perform action to trigger listener
            (getActionClass as jest.Mock).mockReturnValue(MockActionClass);
            state.PerformAction(mockAction);
            expect(mockListener).toHaveBeenCalled();

            // Unsubscribe and verify listener is not called
            unsubscribe();
            state.PerformAction(mockAction);
            expect(mockListener).toHaveBeenCalledTimes(1);
        });

        it('should handle unsubscribe when action type has no listeners', () => {
            const unsubscribe = state.Subscribe(mockAction, mockListener);

            // Clear all listeners for this action type
            state['listeners'].delete(mockAction);

            // Should not throw when unsubscribing
            expect(() => unsubscribe()).not.toThrow();
        });

        it('should handle unsubscribe when listener is not found', () => {
            const unsubscribe = state.Subscribe(mockAction, mockListener);

            // Remove the specific listener
            const listeners = state['listeners'].get(mockAction)!;
            listeners.splice(listeners.indexOf(mockListener), 1);

            // Should not throw when unsubscribing
            expect(() => unsubscribe()).not.toThrow();
        });

        it('should handle multiple subscriptions to same action', () => {
            const mockListener2 = jest.fn();

            state.Subscribe(mockAction, mockListener);
            state.Subscribe(mockAction, mockListener2);

            // Perform action to trigger both listeners
            (getActionClass as jest.Mock).mockReturnValue(MockActionClass);
            state.PerformAction(mockAction);

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
});
