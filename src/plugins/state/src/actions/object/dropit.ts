import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';

export const DropItAction = Action.define<
    { id: string },
    Pick<ActionDependencies, 'gateway' | 'registered'>,
    void
>({
    description:
        'Places an object on top of an underlying object or the floor.',
    execute: (payload, { gateway, registered }) => {
        const object = registered.get(payload.id);
        if (!object) {
            throw new Error(
                `Object with id ${payload.id} not registered. Registered: ${registered}`,
            );
        }

        const model = gateway.findEntity(object);
        if (!model) {
            throw new Error(
                `Object with id ${payload.id} is not found in the scene.`,
            );
        }

        if (!('isDIVEModel' in model)) {
            throw new Error(
                `Object with id ${payload.id} is not a DIVEModel. Object: ${model}`,
            );
        }

        model.dropIt();
    },
});

declare global {
    interface ActionTypes {
        DROP_IT: typeof DropItAction;
    }
}

registerAction<'DROP_IT'>('DROP_IT', DropItAction);
