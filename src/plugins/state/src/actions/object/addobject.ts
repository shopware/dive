import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type DIVESceneObject } from '@shopware-ag/dive';
import { type EntitySchema } from '../../../types/index.ts';
import { watchEntity } from '../../watchEntity.ts';

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

        // A camera has no scene object, so there is nothing to listen to and
        // nothing to apply.
        if (!node) {
            registry.register(payload);
            return undefined;
        }

        // Registered and listening before the data is applied. Applying a model
        // awaits the asset load and `object-load` fires inside it, so a listener
        // attached afterwards would miss it — and a report arriving before the
        // entity is registered has nowhere to write.
        registry.register(
            payload,
            node,
            watchEntity(node, payload, { registry, dispatch }),
        );

        try {
            await gateway.applyEntity(node, payload);
        } catch (error) {
            // Nothing half-created stays behind: a failed asset load used to
            // leave a registered schema with no object in the scene.
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
