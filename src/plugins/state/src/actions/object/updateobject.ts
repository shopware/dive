import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import {
    type ActionDependencies,
    type PartialSchema,
} from '../../../types/index.ts';
import { type EntitySchema } from '../../../types/index.ts';

export const UpdateObjectAction = Action.define<
    Partial<EntitySchema> & { id: string },
    Pick<ActionDependencies, 'gateway' | 'registry'>,
    Promise<void>
>({
    description: 'Updates an existing object.',
    execute: async (payload, { gateway, registry }) => {
        const objectToUpdate = registry.read(payload.id)?.schema;
        if (!objectToUpdate) throw new Error('Object not found.');

        // writeSchema merges and copies vectors; this action no longer needs to
        // know either rule
        registry.write(payload.id, payload as PartialSchema);

        await gateway.updateEntity({
            ...payload,
            id: objectToUpdate.id,
            entityType: objectToUpdate.entityType,
        } as EntitySchema);
    },
});

declare global {
    interface ActionTypes {
        UPDATE_OBJECT: typeof UpdateObjectAction;
    }
}

registerAction<'UPDATE_OBJECT'>('UPDATE_OBJECT', UpdateObjectAction);
