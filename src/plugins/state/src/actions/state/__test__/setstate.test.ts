import { SetStateAction } from '../setstate.ts';
import { DIVE, DIVEScene } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type State } from '../../../State.ts';
import { type StateData } from '../../../../types/index.ts';

const controllerState = {
    azimuthalAngle: 0.1,
    polarAngle: 0.2,
    distance: 3,
    quaternion: { x: 0, y: 0, z: 0, w: 1 },
};

const createDependencies = (): {
    engine: DIVE;
    controller: OrbitController;
    state: State;
    floor: { setVisibility: ReturnType<typeof vi.fn>; setColor: typeof vi.fn };
    performAction: ReturnType<typeof vi.fn>;
} => {
    const floor = {
        setVisibility: vi.fn(),
        setColor: vi.fn(),
    };

    const engine = {
        scene: {
            name: 'untouched',
            setBackground: vi.fn(),
            root: { floor },
        } as unknown as DIVEScene,
    } as unknown as DIVE;

    const controller = {
        setState: vi.fn(),
        getState: vi.fn(() => controllerState),
    } as unknown as OrbitController;

    const performAction = vi.fn(async () => {});
    const state = { performAction } as unknown as State;

    return { engine, controller, state, floor, performAction } as never;
};

/** Scene data with everything left out unless explicitly given. */
const stateData = (overrides: Partial<StateData> = {}): StateData =>
    ({
        groups: [],
        lights: [],
        cameras: [],
        primitives: [],
        objects: [],
        ...overrides,
    }) as unknown as StateData;

describe('SetStateAction', () => {
    beforeEach(() => {
        console.warn = vi.fn();
    });

    describe('scene properties', () => {
        it('should apply name, background and floor', async () => {
            const deps = createDependencies();

            await new SetStateAction(
                stateData({
                    name: 'Applied Scene',
                    backgroundColor: '#ff0000',
                    floorEnabled: true,
                    floorColor: '#00ff00',
                }),
                deps,
            ).execute();

            expect(deps.engine.scene.name).toBe('Applied Scene');
            expect(deps.engine.scene.setBackground).toHaveBeenCalledWith(
                '#ff0000',
            );
            expect(deps.floor.setVisibility).toHaveBeenCalledWith(true);
            expect(deps.floor.setColor).toHaveBeenCalledWith('#00ff00');
        });

        it('should leave out properties the state does not carry', async () => {
            const deps = createDependencies();

            await new SetStateAction(stateData(), deps).execute();

            expect(deps.engine.scene.name).toBe('untouched');
            expect(deps.engine.scene.setBackground).not.toHaveBeenCalled();
            expect(deps.floor.setVisibility).not.toHaveBeenCalled();
            expect(deps.floor.setColor).not.toHaveBeenCalled();
            expect(deps.controller.setState).not.toHaveBeenCalled();
        });

        it('should move the camera but keep the current orbit angles', async () => {
            const deps = createDependencies();
            const userCamera = {
                position: { x: 1, y: 2, z: 3 },
                target: { x: 4, y: 5, z: 6 },
            };

            await new SetStateAction(stateData({ userCamera }), deps).execute();

            expect(deps.controller.setState).toHaveBeenCalledWith({
                position: userCamera.position,
                target: userCamera.target,
                ...controllerState,
            });
        });

        it('should warn that spotmarks are ignored', async () => {
            const deps = createDependencies();

            await new SetStateAction(
                stateData({ spotmarks: [{ id: 'spot' }] }),
                deps,
            ).execute();

            expect(console.warn).toHaveBeenCalledWith(
                expect.stringContaining('Spotmarks are not supported yet'),
            );
        });

        it('should not warn when the state carries no spotmarks', async () => {
            const deps = createDependencies();

            await new SetStateAction(stateData(), deps).execute();

            expect(console.warn).not.toHaveBeenCalled();
        });
    });

    describe('entities', () => {
        it('should add every entity with its own entity type', async () => {
            const deps = createDependencies();

            await new SetStateAction(
                stateData({
                    groups: [{ id: 'g' }],
                    lights: [{ id: 'l' }],
                    cameras: [{ id: 'c' }],
                    primitives: [{ id: 'p' }],
                    objects: [{ id: 'o' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(deps.performAction).toHaveBeenCalledTimes(5);
            const entityTypes = deps.performAction.mock.calls.map(
                ([action, payload]) => [action, payload.entityType],
            );
            expect(entityTypes).toEqual([
                ['ADD_OBJECT', 'group'],
                ['ADD_OBJECT', 'light'],
                ['ADD_OBJECT', 'camera'],
                ['ADD_OBJECT', 'primitive'],
                ['ADD_OBJECT', 'model'],
            ]);
        });

        it('should default locked to false and visible to true', async () => {
            const deps = createDependencies();

            await new SetStateAction(
                stateData({
                    objects: [{ id: 'o' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(deps.performAction).toHaveBeenCalledWith('ADD_OBJECT', {
                id: 'o',
                locked: false,
                visible: true,
                entityType: 'model',
            });
        });

        it('should keep locked and visible when the entity carries them', async () => {
            const deps = createDependencies();

            await new SetStateAction(
                stateData({
                    objects: [{ id: 'o', locked: true, visible: false }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(deps.performAction).toHaveBeenCalledWith(
                'ADD_OBJECT',
                expect.objectContaining({ locked: true, visible: false }),
            );
        });

        it('should add nothing for an empty state', async () => {
            const deps = createDependencies();

            await new SetStateAction(stateData(), deps).execute();

            expect(deps.performAction).not.toHaveBeenCalled();
        });
    });

    describe('awaiting the scene', () => {
        it('should not settle before every added object has settled', async () => {
            const deps = createDependencies();
            let releaseModel!: () => void;
            deps.performAction.mockImplementation(
                () =>
                    new Promise<void>((resolve) => {
                        releaseModel = resolve;
                    }),
            );

            let settled = false;
            const pending = new SetStateAction(
                stateData({
                    objects: [{ id: 'o' }],
                } as unknown as Partial<StateData>),
                deps,
            )
                .execute()
                .then(() => {
                    settled = true;
                });

            await new Promise((resolve) => setTimeout(resolve, 5));
            expect(settled).toBe(false);

            releaseModel();
            await pending;

            expect(settled).toBe(true);
        });

        it('should reject when one of the added objects fails', async () => {
            const deps = createDependencies();
            deps.performAction
                .mockResolvedValueOnce(undefined)
                .mockRejectedValueOnce(new Error('asset missing'));

            await expect(
                new SetStateAction(
                    stateData({
                        objects: [{ id: 'ok' }, { id: 'broken' }],
                    } as unknown as Partial<StateData>),
                    deps,
                ).execute(),
            ).rejects.toThrow('asset missing');
        });
    });
});
