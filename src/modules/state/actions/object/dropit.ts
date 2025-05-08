import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';
import { type DIVEModel } from '../../../../components/index.ts';

export const DropItAction = Action.define<
    { id: string },
    Pick<ActionDependencies, 'engine' | 'registered'>,
    void
>({
    description:
        'Places an object on top of an underlying object or the floor.',
    execute: (payload, { engine, registered }) => {
        const object = registered.get(payload.id);
        if (!object) {
            throw new Error(
                `Object with id ${payload.id} not registered. Registered: ${registered}`,
            );
        }

        const model = engine.scene.root.getSceneObject<DIVEModel>(object);
        if (!model) {
            throw new Error(
                `Object with id ${payload.id} is not found in the scene. Scene: ${engine.scene}`,
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

registerAction('DROP_IT', DropItAction);
