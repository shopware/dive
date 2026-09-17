import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';

export const DropItAction = Action.define<
    { id: string },
    Pick<ActionDependencies, 'registry'>,
    void
>({
    description:
        'Places an object on top of an underlying object or the floor.',
    execute: (payload, { registry }) => {
        const entry = registry.read(payload.id);
        if (!entry) {
            throw new Error(`Object with id ${payload.id} not registered.`);
        }

        const model = entry.node;
        /**
         * an entity with no scene object of its own (as in camera for now) has
         * nothing to drop, so there is nothing to do rather than to report
         */
        if (!model) return;

        model.dropIt();
    },
});

declare global {
    interface ActionTypes {
        DROP_IT: typeof DropItAction;
    }
}

registerAction<'DROP_IT'>('DROP_IT', DropItAction);
