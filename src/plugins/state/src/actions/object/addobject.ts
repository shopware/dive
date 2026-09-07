import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type DIVESceneObject } from '@shopware-ag/dive';
import { type EntitySchema } from '../../../types/index.ts';

export const AddObjectAction = Action.define<
    EntitySchema,
    Pick<ActionDependencies, 'gateway' | 'registry'>,
    Promise<DIVESceneObject | undefined>
>({
    description: 'Adds an object to the scene.',
    execute: async (payload, { gateway, registry }) => {
        const existing = registry.read(payload.id);
        if (existing) return existing.node;

        if (payload.parentId === undefined) payload.parentId = null;

        // Registered once the node exists, so the two can never disagree. The
        // old order registered first, which left a schema behind whenever
        // creating the node threw -- a failed asset load, for instance.
        const node = await gateway.addEntity(payload);
        registry.register(payload, node);

        return node;
    },
});

declare global {
    interface ActionTypes {
        ADD_OBJECT: typeof AddObjectAction;
    }
}

registerAction<'ADD_OBJECT'>('ADD_OBJECT', AddObjectAction);
