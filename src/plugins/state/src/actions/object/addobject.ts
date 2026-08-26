import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type DIVESceneObject } from '@shopware-ag/dive';
import { type EntitySchema } from '../../../types/index.ts';
import { watchEntity } from '../../helpers/watchEntity/watchEntity.ts';

export const AddObjectAction = Action.define<
    EntitySchema,
    Pick<ActionDependencies, 'gateway' | 'registry' | 'dispatch'>,
    Promise<DIVESceneObject | undefined>
>({
    description: 'Adds an object to the scene.',
    execute: async (payload, { gateway, registry, dispatch }) => {
        const existing = registry.read(payload.id);
        if (existing) return existing.node;

        if (payload.parentId === undefined) payload.parentId = null;

        const node = gateway.createEntity(payload);

        // a camera has no scene object, nothing to listen to and nothing to apply
        if (!node) {
            registry.register(payload);
            return undefined;
        }

        /**
         * registered and listening before the data is applied, because applying a
         * model awaits the asset load and object-load fires inside it
         */
        registry.register(
            payload,
            node,
            watchEntity(node, payload, { registry, dispatch }),
        );

        try {
            await gateway.applyEntity(node, payload);
        } catch (error) {
            // leave nothing half-created behind on a failed asset load
            registry.unregister(payload.id);
            gateway.removeEntity(payload);
            throw error;
        }

        return node;
    },
});

declare global {
    interface ActionTypes {
        ADD_OBJECT: typeof AddObjectAction;
    }
}

registerAction<'ADD_OBJECT'>('ADD_OBJECT', AddObjectAction);
