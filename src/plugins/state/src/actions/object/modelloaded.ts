import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { isModelSchema } from '../../../types/index.ts';

export const ModelLoadedAction = Action.define<
    { id: string },
    Pick<ActionDependencies, 'registry'>,
    void
>({
    description: 'Is triggered when a model is loaded.',
    execute: (payload, { registry }) => {
        const model = registry.read(payload.id)?.schema;

        if (!model) {
            throw new Error(`Model with id ${payload.id} not found`);
        }

        if (!isModelSchema(model)) {
            throw new Error(`Model with id ${payload.id} is not a ModelSchema`);
        }

        model.loaded = true;
    },
});

declare global {
    interface ActionTypes {
        MODEL_LOADED: typeof ModelLoadedAction;
    }
}

registerAction<'MODEL_LOADED'>('MODEL_LOADED', ModelLoadedAction);
