import { SetStateAction } from '../setstate.ts';
import { GetStateAction } from '../getstate.ts';
import {
    DIVE,
    DIVEScene,
    type EntitySchema,
    type CameraSchema,
    type GroupSchema,
    type LightSchema,
    type ModelSchema,
    type PrimitiveSchema,
} from '@shopware-ag/dive';
import { Color, MeshStandardMaterial, Vector3 } from 'three/webgpu';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type State } from '../../../State.ts';
import { type StateData } from '../../../../types/index.ts';

const controllerState = {
    azimuthalAngle: 0.1,
    polarAngle: 0.2,
    distance: 3,
    quaternion: { x: 0, y: 0, z: 0, w: 1 },
};

const createDependencies = (
    alreadyRegistered: EntitySchema[] = [],
): {
    engine: DIVE;
    controller: OrbitController;
    state: State;
    registered: Map<string, EntitySchema>;
    floor: { setVisibility: ReturnType<typeof vi.fn>; setColor: typeof vi.fn };
    performAction: ReturnType<typeof vi.fn>;
} => {
    const floor = {
        setVisibility: vi.fn(),
        setColor: vi.fn(),
    };

    const registered = new Map<string, EntitySchema>(
        alreadyRegistered.map((entity) => [entity.id, entity]),
    );

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

    return {
        engine,
        controller,
        state,
        registered,
        floor,
        performAction,
    } as never;
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
                // the first pass adds detached, the second pass reparents
                parentId: null,
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

        it('should report a failed object instead of dropping the scene', async () => {
            const deps = createDependencies();
            const survivor = { name: 'ok' };
            deps.performAction
                .mockResolvedValueOnce(survivor)
                .mockRejectedValueOnce(new Error('asset missing'));

            const result = await new SetStateAction(
                stateData({
                    objects: [{ id: 'ok' }, { id: 'broken' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(result).toEqual([survivor]);
            expect(console.warn).toHaveBeenCalledWith(
                expect.stringContaining('1 of 2 entities could not be applied'),
                [
                    {
                        entity: expect.objectContaining({
                            id: 'broken',
                            entityType: 'model',
                        }),
                        reason: expect.objectContaining({
                            message: 'asset missing',
                        }),
                    },
                ],
            );
        });
    });

    describe('replacing what is already there', () => {
        it('should delete every registered entity before adding', async () => {
            const deps = createDependencies([
                { id: 'old-model', entityType: 'model' },
                { id: 'old-light', entityType: 'light' },
            ] as unknown as EntitySchema[]);

            await new SetStateAction(
                stateData({
                    objects: [{ id: 'new-model' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(deps.performAction).toHaveBeenCalledWith('DELETE_OBJECT', {
                id: 'old-model',
                entityType: 'model',
            });
            expect(deps.performAction).toHaveBeenCalledWith('DELETE_OBJECT', {
                id: 'old-light',
                entityType: 'light',
            });

            const order = deps.performAction.mock.calls.map(
                ([action]) => action,
            );
            expect(order).toEqual([
                'DELETE_OBJECT',
                'DELETE_OBJECT',
                'ADD_OBJECT',
            ]);
        });

        it('should delete nothing when the scene is empty', async () => {
            const deps = createDependencies();

            await new SetStateAction(stateData(), deps).execute();

            expect(deps.performAction).not.toHaveBeenCalled();
        });
    });

    describe('created objects', () => {
        it('should return the objects that were added', async () => {
            const deps = createDependencies();
            const created = [{ name: 'model' }, { name: 'primitive' }];
            deps.performAction
                .mockResolvedValueOnce(created[0])
                .mockResolvedValueOnce(created[1]);

            const result = await new SetStateAction(
                stateData({
                    primitives: [{ id: 'p' }],
                    objects: [{ id: 'o' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(result).toEqual(created);
        });

        it('should drop entities that created no scene object', async () => {
            const deps = createDependencies();
            const camera = undefined;
            const created = { name: 'model' };
            deps.performAction
                .mockResolvedValueOnce(camera)
                .mockResolvedValueOnce(created);

            const result = await new SetStateAction(
                stateData({
                    cameras: [{ id: 'c' }],
                    objects: [{ id: 'o' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(result).toEqual([created]);
        });
    });

    const orbitState = {
        azimuthalAngle: 0.1,
        polarAngle: 0.2,
        distance: 3,
        quaternion: { x: 0, y: 0, z: 0, w: 1 },
    };

    /**
     * A DIVE instance whose setters actually write back, so what SET_STATE applies
     * is what a following GET_STATE reads.
     */
    const createInstance = (
        entities: EntitySchema[] = [],
    ): {
        engine: DIVE;
        controller: OrbitController;
        state: State;
        registered: Map<string, EntitySchema>;
    } => {
        const floor = {
            visible: false,
            material: new MeshStandardMaterial({ color: new Color('#ffffff') }),
            setVisibility: vi.fn((visible: boolean) => {
                floor.visible = visible;
            }),
            setColor: vi.fn((color: string) => {
                floor.material.color = new Color(color);
            }),
        };

        const scene = {
            name: '',
            background: new Color('#000000'),
            setBackground: vi.fn((color: string) => {
                scene.background = new Color(color);
            }),
            root: { floor },
        } as unknown as DIVEScene;

        const controller = {
            object: { position: new Vector3(0, 0, 0) },
            target: new Vector3(0, 0, 0),
            getState: vi.fn(() => orbitState),
            setState: vi.fn((next: { position: Vector3; target: Vector3 }) => {
                controller.object.position = next.position;
                controller.target = next.target;
            }),
        } as unknown as OrbitController & {
            object: { position: Vector3 };
            target: Vector3;
        };

        const registered = new Map<string, EntitySchema>(
            entities.map((entity) => [entity.id, entity]),
        );

        // stands in for the real action dispatch: ADD_OBJECT registers,
        // DELETE_OBJECT unregisters, both without touching a real scene graph
        const state = {
            performAction: vi.fn(
                async (action: string, payload: EntitySchema) => {
                    if (action === 'ADD_OBJECT') {
                        registered.set(payload.id, payload);
                        return { name: payload.id };
                    }
                    if (action === 'DELETE_OBJECT')
                        registered.delete(payload.id);
                    return undefined;
                },
            ),
        } as unknown as State;

        return {
            engine: { scene } as unknown as DIVE,
            controller,
            state,
            registered,
        };
    };

    const entity = <T>(id: string, entityType: string): T =>
        ({
            id,
            name: id,
            entityType,
            locked: false,
            visible: true,
            parentId: null,
        }) as unknown as T;

    describe('round trip with GET_STATE', () => {
        beforeEach(() => {
            console.warn = vi.fn();
        });

        it('should reproduce the same state on a fresh instance', async () => {
            const source = createInstance([
                entity<LightSchema>('light-1', 'light'),
                entity<ModelSchema>('model-1', 'model'),
                entity<CameraSchema>('camera-1', 'camera'),
                entity<PrimitiveSchema>('primitive-1', 'primitive'),
                entity<GroupSchema>('group-1', 'group'),
            ]);
            source.engine.scene.name = 'Source Scene';
            source.engine.scene.background = new Color('#123456');
            source.engine.scene.root.floor.visible = true;
            (
                source.engine.scene.root.floor.material as MeshStandardMaterial
            ).color = new Color('#abcdef');
            source.controller.object.position.set(1, 2, 3);
            source.controller.target.set(4, 5, 6);

            const exported = await new GetStateAction(
                undefined,
                source,
            ).execute();

            const target = createInstance();
            await new SetStateAction(exported, target).execute();

            const reExported = await new GetStateAction(
                undefined,
                target,
            ).execute();

            expect(reExported).toEqual(exported);
        });

        it('should carry every entity type across the round trip', async () => {
            const source = createInstance([
                entity<LightSchema>('light-1', 'light'),
                entity<ModelSchema>('model-1', 'model'),
                entity<CameraSchema>('camera-1', 'camera'),
                entity<PrimitiveSchema>('primitive-1', 'primitive'),
                entity<GroupSchema>('group-1', 'group'),
            ]);

            const exported = await new GetStateAction(
                undefined,
                source,
            ).execute();

            const target = createInstance();
            await new SetStateAction(exported, target).execute();

            expect([...target.registered.keys()].sort()).toEqual([
                'camera-1',
                'group-1',
                'light-1',
                'model-1',
                'primitive-1',
            ]);
        });

        it('should replace the entities of an instance that already holds a scene', async () => {
            const source = createInstance([
                entity<ModelSchema>('new', 'model'),
            ]);
            const exported = await new GetStateAction(
                undefined,
                source,
            ).execute();

            const target = createInstance([
                entity<ModelSchema>('stale', 'model'),
            ]);
            await new SetStateAction(exported, target).execute();

            expect([...target.registered.keys()]).toEqual(['new']);
        });

        it('should stay stable when applied twice', async () => {
            const source = createInstance([
                entity<ModelSchema>('model-1', 'model'),
            ]);
            source.engine.scene.name = 'Twice';
            const exported = await new GetStateAction(
                undefined,
                source,
            ).execute();

            const target = createInstance();
            await new SetStateAction(exported, target).execute();
            await new SetStateAction(exported, target).execute();

            const reExported = await new GetStateAction(
                undefined,
                target,
            ).execute();
            expect(reExported).toEqual(exported);
        });
    });

    describe('hierarchy', () => {
        it('should add every entity detached and reparent afterwards', async () => {
            const deps = createDependencies();

            await new SetStateAction(
                stateData({
                    groups: [
                        { id: 'outer' },
                        { id: 'inner', parentId: 'outer' },
                    ],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            const actions = deps.performAction.mock.calls.map(([name]) => name);
            expect(actions).toEqual(['ADD_OBJECT', 'ADD_OBJECT', 'SET_PARENT']);

            // both were added without a parent, so order cannot matter
            deps.performAction.mock.calls
                .filter(([name]) => name === 'ADD_OBJECT')
                .forEach(([, payload]) => expect(payload.parentId).toBeNull());

            expect(deps.performAction).toHaveBeenCalledWith('SET_PARENT', {
                object: { id: 'inner' },
                parent: { id: 'outer' },
            });
        });

        it('should reparent a child that arrives before its parent', async () => {
            const deps = createDependencies();

            await new SetStateAction(
                stateData({
                    // the child sits in front of the parent on purpose
                    groups: [
                        { id: 'inner', parentId: 'outer' },
                        { id: 'outer' },
                    ],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(deps.performAction).toHaveBeenCalledWith('SET_PARENT', {
                object: { id: 'inner' },
                parent: { id: 'outer' },
            });
        });

        it('should not reparent entities without a parent', async () => {
            const deps = createDependencies();

            await new SetStateAction(
                stateData({
                    objects: [{ id: 'o' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(deps.performAction).not.toHaveBeenCalledWith(
                'SET_PARENT',
                expect.anything(),
            );
        });

        it('should not reparent an entity that failed to be added', async () => {
            const deps = createDependencies();
            deps.performAction.mockRejectedValueOnce(new Error('nope'));

            const result = await new SetStateAction(
                stateData({
                    groups: [{ id: 'child', parentId: 'missing' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(deps.performAction).not.toHaveBeenCalledWith(
                'SET_PARENT',
                expect.anything(),
            );
            expect(result).toEqual([]);
        });

        it('should report a parent that cannot be resolved', async () => {
            const deps = createDependencies();
            deps.performAction.mockImplementation(async (action: string) => {
                if (action === 'SET_PARENT')
                    throw new Error('Object not found.');
                return undefined;
            });

            const result = await new SetStateAction(
                stateData({
                    groups: [{ id: 'child', parentId: 'ghost' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(result).toEqual([]);
            expect(console.warn).toHaveBeenCalledWith(
                expect.stringContaining('1 of 1 entities could not be applied'),
                [
                    {
                        entity: expect.objectContaining({
                            id: 'child',
                            entityType: 'group',
                        }),
                        reason: expect.objectContaining({
                            message: 'Object not found.',
                        }),
                    },
                ],
            );
        });
    });
});
