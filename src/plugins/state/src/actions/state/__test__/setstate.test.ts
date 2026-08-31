import { SetStateAction } from '../setstate.ts';
import {
    State,
    AddObjectAction,
    DeleteObjectAction,
    SetParentAction,
} from '@shopware-ag/dive/state';
import { GetStateAction } from '../getstate.ts';
import { DIVE, DIVEScene } from '@shopware-ag/dive';
import { EngineGateway } from '../../../EngineGateway.ts';
import {
    type EntitySchema,
    type CameraSchema,
    type GroupSchema,
    type LightSchema,
    type ModelSchema,
    type PrimitiveSchema,
} from '../../../../types/index.ts';
import { Color, MeshStandardMaterial, Vector3 } from 'three/webgpu';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type StateData } from '../../../../types/index.ts';
import { EntityRegistry } from '../../../EntityRegistry.ts';
import { makeCameraController } from '../../../__test__/actionDeps.ts';

// SET_STATE builds these actions itself, so both the constructor arguments and
// the executions are recorded. Payload and dependencies are handed to the
// execute mocks as well, which lets the defaults keep the registry in sync the
// way the real actions do.
const { addExecute, deleteExecute, setParentExecute } = vi.hoisted(() => ({
    addExecute: vi.fn(),
    deleteExecute: vi.fn(),
    setParentExecute: vi.fn(),
}));

vi.mock('@shopware-ag/dive/state', async () => ({
    /**
     * the real one, imported past the barrel this factory replaces, the round
     * trip below has to actually move the camera
     */
    SetCameraTransformAction: (
        await import('../../camera/setcameratransform.ts')
    ).SetCameraTransformAction,
    AddObjectAction: vi.fn((payload, deps) => ({
        execute: () => addExecute(payload, deps),
    })),
    DeleteObjectAction: vi.fn((payload, deps) => ({
        execute: () => deleteExecute(payload, deps),
    })),
    SetParentAction: vi.fn((payload, deps) => ({
        execute: () => setParentExecute(payload, deps),
    })),
}));

type MockDeps = { registry: EntityRegistry };

/** Restores the default behaviour, since single tests override it. */
const resetActionMocks = (): void => {
    addExecute
        .mockReset()
        .mockImplementation(async (entity: EntitySchema, deps: MockDeps) => {
            deps.registry.register(entity);
            // no scene object by default, tests that need one opt in
            return undefined;
        });
    deleteExecute
        .mockReset()
        .mockImplementation((entity: EntitySchema, deps: MockDeps) => {
            deps.registry.unregister(entity.id);
        });
    setParentExecute.mockReset();
};

const createDependencies = (
    alreadyRegistered: EntitySchema[] = [],
): {
    gateway: EngineGateway;
    controller: OrbitController;
    registry: EntityRegistry;
    dispatch: ReturnType<typeof vi.fn>;
} => {
    const registry = new EntityRegistry();
    alreadyRegistered.forEach((entity) => registry.register(entity));

    // what the scene ends up holding is the gateway's own business, tested
    // there; here it only matters that the state is handed over in one piece
    const gateway = {
        applySceneSettings: vi.fn(),
    } as unknown as EngineGateway;

    const controller = makeCameraController();

    return { gateway, controller, registry, dispatch: vi.fn() };
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
        vi.clearAllMocks();
        resetActionMocks();
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

            expect(deps.gateway.applySceneSettings).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: 'Applied Scene',
                    backgroundColor: '#ff0000',
                    floorEnabled: true,
                    floorColor: '#00ff00',
                }),
            );
        });

        it('should leave out properties the state does not carry', async () => {
            const deps = createDependencies();

            await new SetStateAction(stateData(), deps).execute();

            // the gateway is handed the state as it stands and is the one
            // that skips what is not in it
            expect(deps.gateway.applySceneSettings).toHaveBeenCalledWith(
                expect.not.objectContaining({ name: expect.anything() }),
            );
            expect(deps.controller.object.owner!.position).toMatchObject({
                x: 0,
                y: 0,
                z: 0,
            });
        });

        it('should move the camera node and its target', async () => {
            const deps = createDependencies();
            const userCamera = {
                position: { x: 1, y: 2, z: 3 },
                target: { x: 4, y: 5, z: 6 },
            };

            await new SetStateAction(stateData({ userCamera }), deps).execute();

            /**
             * the orbit angles are derived from position and target, so there is
             * nothing else for this action to preserve
             */
            expect(deps.controller.object.owner!.position).toMatchObject(
                userCamera.position,
            );
            expect(deps.controller.target).toMatchObject(userCamera.target);
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

            expect(AddObjectAction).toHaveBeenCalledTimes(5);
            const entityTypes = vi
                .mocked(AddObjectAction)
                .mock.calls.map(([payload]) => payload.entityType);
            expect(entityTypes).toEqual([
                'group',
                'light',
                'camera',
                'primitive',
                'model',
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

            expect(AddObjectAction).toHaveBeenCalledWith(
                {
                    id: 'o',
                    locked: false,
                    visible: true,
                    entityType: 'model',
                    // the first pass adds detached, the second pass reparents
                    parentId: null,
                },
                expect.anything(),
            );
        });

        it('should keep locked and visible when the entity carries them', async () => {
            const deps = createDependencies();

            await new SetStateAction(
                stateData({
                    objects: [{ id: 'o', locked: true, visible: false }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(AddObjectAction).toHaveBeenCalledWith(
                expect.objectContaining({ locked: true, visible: false }),
                expect.anything(),
            );
        });

        it('should add nothing for an empty state', async () => {
            const deps = createDependencies();

            await new SetStateAction(stateData(), deps).execute();

            expect(AddObjectAction).not.toHaveBeenCalled();
        });
    });

    describe('awaiting the scene', () => {
        it('should not settle before every added object has settled', async () => {
            const deps = createDependencies();
            let releaseModel!: () => void;
            addExecute.mockImplementation(
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
            addExecute
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

    describe('every kind of entity', () => {
        const oneOfEach = () =>
            stateData({
                groups: [{ id: 'g' }],
                lights: [{ id: 'l' }],
                cameras: [{ id: 'c' }],
                primitives: [{ id: 'p' }],
                objects: [{ id: 'o' }],
            } as unknown as Partial<StateData>);

        it('should report a failure from any collection', async () => {
            const deps = createDependencies();
            addExecute.mockRejectedValue(new Error('nope'));

            const result = await new SetStateAction(
                oneOfEach(),
                deps,
            ).execute();

            expect(result).toEqual([]);

            const failures = vi.mocked(console.warn).mock.calls.at(-1)?.[1] as {
                entity: EntitySchema;
            }[];
            expect(
                failures.map((failure) => failure.entity.entityType),
            ).toEqual(['group', 'light', 'camera', 'primitive', 'model']);
        });

        it('should collect a scene object from any collection', async () => {
            const deps = createDependencies();
            addExecute.mockImplementation(async (entity: EntitySchema) => ({
                name: entity.id,
            }));

            const result = await new SetStateAction(
                oneOfEach(),
                deps,
            ).execute();

            expect(result).toEqual([
                { name: 'g' },
                { name: 'l' },
                { name: 'c' },
                { name: 'p' },
                { name: 'o' },
            ]);
            expect(console.warn).not.toHaveBeenCalled();
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

            expect(DeleteObjectAction).toHaveBeenCalledWith(
                { id: 'old-model', entityType: 'model' },
                expect.anything(),
            );
            expect(DeleteObjectAction).toHaveBeenCalledWith(
                { id: 'old-light', entityType: 'light' },
                expect.anything(),
            );

            // both deletions happen before anything is added
            expect(deleteExecute).toHaveBeenCalledTimes(2);
            expect(deleteExecute.mock.invocationCallOrder[1]).toBeLessThan(
                addExecute.mock.invocationCallOrder[0],
            );
        });

        it('should delete nothing when the scene is empty', async () => {
            const deps = createDependencies();

            await new SetStateAction(stateData(), deps).execute();

            expect(DeleteObjectAction).not.toHaveBeenCalled();
        });
    });

    describe('created objects', () => {
        it('should return the objects that were added', async () => {
            const deps = createDependencies();
            const created = [{ name: 'model' }, { name: 'primitive' }];
            addExecute
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
            addExecute
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

    /**
     * A DIVE instance whose setters actually write back, so what SET_STATE applies
     * is what a following GET_STATE reads.
     */
    const createInstance = (
        entities: EntitySchema[] = [],
    ): {
        gateway: EngineGateway;
        controller: OrbitController;
        state: State;
        registry: EntityRegistry;
        dispatch: ReturnType<typeof vi.fn>;
        scene: { name: string; background: Color };
        floor: { visible: boolean; material: MeshStandardMaterial };
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
            grid: { visible: false, setVisibility: vi.fn() },
            setBackground: vi.fn((color: string) => {
                scene.background = new Color(color);
            }),
            root: { floor },
        } as unknown as DIVEScene & { name: string; background: Color };

        /**
         * a real node and camera component, so what SET_STATE writes is what
         * GET_STATE reads back without a stub in between deciding it
         */
        const controller = makeCameraController();

        const registry = new EntityRegistry();
        entities.forEach((entity) => registry.register(entity));

        // stands in for the real action dispatch: ADD_OBJECT registers,
        // DELETE_OBJECT unregisters, both without touching a real scene graph
        const state = {
            performAction: vi.fn(
                async (action: string, payload: EntitySchema) => {
                    if (action === 'ADD_OBJECT') {
                        registry.register(payload);
                        return { name: payload.id };
                    }
                    if (action === 'DELETE_OBJECT')
                        registry.unregister(payload.id);
                    return undefined;
                },
            ),
        } as unknown as State;

        // the real gateway, so the round trip goes through the same read and
        // write path the application uses
        const gateway = new EngineGateway({ scene } as unknown as DIVE);

        return {
            gateway,
            controller,
            state,
            registry,
            scene,
            floor,
            dispatch: vi.fn(),
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
            source.scene.name = 'Source Scene';
            source.scene.background = new Color('#123456');
            source.floor.visible = true;
            source.floor.material.color = new Color('#abcdef');
            source.controller.object.owner!.position.set(1, 2, 3);
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

            expect(
                target.registry
                    .read()
                    .map((e) => e.schema.id)
                    .sort(),
            ).toEqual([
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

            expect(target.registry.read().map((e) => e.schema.id)).toEqual([
                'new',
            ]);
        });

        it('should stay stable when applied twice', async () => {
            const source = createInstance([
                entity<ModelSchema>('model-1', 'model'),
            ]);
            source.scene.name = 'Twice';
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

            // both adds happen before any reparenting
            expect(addExecute).toHaveBeenCalledTimes(2);
            expect(setParentExecute).toHaveBeenCalledTimes(1);
            expect(addExecute.mock.invocationCallOrder[1]).toBeLessThan(
                setParentExecute.mock.invocationCallOrder[0],
            );

            // both were added without a parent, so order cannot matter
            vi.mocked(AddObjectAction).mock.calls.forEach(([payload]) =>
                expect(payload.parentId).toBeNull(),
            );

            expect(SetParentAction).toHaveBeenCalledWith(
                { object: { id: 'inner' }, parent: { id: 'outer' } },
                expect.anything(),
            );
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

            expect(SetParentAction).toHaveBeenCalledWith(
                { object: { id: 'inner' }, parent: { id: 'outer' } },
                expect.anything(),
            );
        });

        it('should not reparent entities without a parent', async () => {
            const deps = createDependencies();

            await new SetStateAction(
                stateData({
                    objects: [{ id: 'o' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(SetParentAction).not.toHaveBeenCalled();
        });

        it('should not reparent an entity that failed to be added', async () => {
            const deps = createDependencies();
            addExecute.mockRejectedValueOnce(new Error('nope'));

            const result = await new SetStateAction(
                stateData({
                    groups: [{ id: 'child', parentId: 'missing' }],
                } as unknown as Partial<StateData>),
                deps,
            ).execute();

            expect(SetParentAction).not.toHaveBeenCalled();
            expect(result).toEqual([]);
        });

        it('should report a parent that cannot be resolved', async () => {
            const deps = createDependencies();
            setParentExecute.mockImplementation(() => {
                throw new Error('Object not found.');
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
