import { Action } from '../action';
import { ActionDependencies } from '../types';
import { isCOMModel } from '../../types';

export const ModelLoadedAction = Action.define<
    { id: string },
    Pick<ActionDependencies, 'registered'>,
    void
>({
    description: 'Is triggered when a model is loaded.',
    execute: (payload, { registered }) => {
        const model = registered.get(payload.id);

        if (!model) {
            throw new Error(`Model with id ${payload.id} not found`);
        }

        if (!isCOMModel(model)) {
            throw new Error(`Model with id ${payload.id} is not a COMModel`);
        }

        model.loaded = true;
    },
});

declare global {
    interface ActionClasses {
        MODEL_LOADED: typeof ModelLoadedAction;
    }
}
