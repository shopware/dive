import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type StateData } from '../../../types/index.ts';
import { type DIVESceneObject } from '@shopware-ag/dive';
import { type EntitySchema } from '../../../types/index.ts';
import {
    AddObjectAction,
    DeleteObjectAction,
    SetParentAction,
} from '@shopware-ag/dive/state';

export const SetStateAction = Action.define<
    StateData,
    Pick<ActionDependencies, 'gateway' | 'controller' | 'registered'>,
    Promise<DIVESceneObject[]>
>({
    description: 'Applies complete state data to current dive instance.',
    execute: async (_payload, { gateway, controller, registered }) => {
        // the state is meant to replace what is there, and ADD_OBJECT skips ids that are already registered, so clear the scene up front
        Array.from(registered.values()).forEach((entity: EntitySchema) => {
            new DeleteObjectAction(
                {
                    id: entity.id,
                    entityType: entity.entityType,
                },
                { gateway, registered },
            ).execute();
        });

        // one call instead of a hand-written copy per property, which is how
        // gridEnabled went missing here while updatescene had it
        gateway.applySceneSettings(_payload);
        _payload.userCamera !== undefined &&
            controller.setState({
                position: _payload.userCamera.position,
                target: _payload.userCamera.target,
                azimuthalAngle: controller.getState().azimuthalAngle,
                polarAngle: controller.getState().polarAngle,
                distance: controller.getState().distance,
                quaternion: controller.getState().quaternion,
            });

        /** What was created, in the order the entities finished loading. Entity types without a scene object, currently cameras, contribute nothing. */
        const objects: DIVESceneObject[] = [];
        /** Entities that made it into the scene and can be reparented below. */
        const added: EntitySchema[] = [];
        // reported through a warning, not the return value, which only carries what was created
        const failed: { entity: EntitySchema; reason: unknown }[] = [];

        // Everything is added detached, the hierarchy follows in a second pass below, so the order the entities arrive in does not matter. Each entity handles its own outcome, which lets one broken asset fail on its own.
        const promises: Promise<void>[] = [];

        _payload.groups !== undefined &&
            _payload.groups.forEach((group) => {
                const entity = {
                    ...group,
                    locked: group.locked ?? false,
                    visible: group.visible ?? true,
                    entityType: 'group' as const,
                };
                promises.push(
                    new AddObjectAction(
                        {
                            ...entity,
                            parentId: null,
                        },
                        { gateway, registered },
                    )
                        .execute()
                        .then((object) => {
                            added.push(entity);
                            if (object !== undefined) objects.push(object);
                        })
                        .catch((reason) => {
                            failed.push({ entity, reason });
                        }),
                );
            });

        _payload.lights !== undefined &&
            _payload.lights.forEach((light) => {
                const entity = {
                    ...light,
                    locked: light.locked ?? false,
                    visible: light.visible ?? true,
                    entityType: 'light' as const,
                };
                promises.push(
                    new AddObjectAction(
                        {
                            ...entity,
                            parentId: null,
                        },
                        { gateway, registered },
                    )
                        .execute()
                        .then((object) => {
                            added.push(entity);
                            if (object !== undefined) objects.push(object);
                        })
                        .catch((reason) => {
                            failed.push({ entity, reason });
                        }),
                );
            });
        _payload.cameras !== undefined &&
            _payload.cameras.forEach((camera) => {
                const entity = {
                    ...camera,
                    locked: camera.locked ?? false,
                    visible: camera.visible ?? true,
                    entityType: 'camera' as const,
                };
                promises.push(
                    new AddObjectAction(
                        {
                            ...entity,
                            parentId: null,
                        },
                        { gateway, registered },
                    )
                        .execute()
                        .then((object) => {
                            added.push(entity);
                            if (object !== undefined) objects.push(object);
                        })
                        .catch((reason) => {
                            failed.push({ entity, reason });
                        }),
                );
            });
        _payload.primitives !== undefined &&
            _payload.primitives.forEach((primitive) => {
                const entity = {
                    ...primitive,
                    locked: primitive.locked ?? false,
                    visible: primitive.visible ?? true,
                    entityType: 'primitive' as const,
                };
                promises.push(
                    new AddObjectAction(
                        {
                            ...entity,
                            parentId: null,
                        },
                        { gateway, registered },
                    )
                        .execute()
                        .then((object) => {
                            added.push(entity);
                            if (object !== undefined) objects.push(object);
                        })
                        .catch((reason) => {
                            failed.push({ entity, reason });
                        }),
                );
            });
        _payload.objects !== undefined &&
            _payload.objects.forEach((object) => {
                const entity = {
                    ...object,
                    locked: object.locked ?? false,
                    visible: object.visible ?? true,
                    entityType: 'model' as const,
                };
                promises.push(
                    new AddObjectAction(
                        {
                            ...entity,
                            parentId: null,
                        },
                        { gateway, registered },
                    )
                        .execute()
                        .then((sceneObject) => {
                            added.push(entity);
                            if (sceneObject !== undefined)
                                objects.push(sceneObject);
                        })
                        .catch((reason) => {
                            failed.push({ entity, reason });
                        }),
                );
            });

        _payload.spotmarks !== undefined &&
            console.warn(
                'SET_STATE: Spotmarks are not supported yet and will be ignored.',
            );

        // ADD_OBJECT resolves once its scene object exists, which for models includes loading the asset. None of these can reject, so this waits for all of them.
        await Promise.all(promises);

        // Second pass restores the hierarchy. Every object exists by now, so the order the entities arrive in no longer matters.
        for (const entity of added) {
            if (!entity.parentId) continue;

            try {
                // awaited so a rejection is caught too, should SET_PARENT ever stop being synchronous
                await new SetParentAction(
                    {
                        object: { id: entity.id },
                        parent: { id: entity.parentId },
                    },
                    { gateway, registered },
                ).execute();
            } catch (reason) {
                failed.push({ entity, reason });
            }
        }

        if (failed.length > 0) {
            console.warn(
                `SET_STATE: ${failed.length} of ${promises.length} entities could not be applied.`,
                failed,
            );
        }

        return objects;
    },
});

declare global {
    interface ActionTypes {
        SET_STATE: typeof SetStateAction;
    }
}

registerAction<'SET_STATE'>('SET_STATE', SetStateAction);
