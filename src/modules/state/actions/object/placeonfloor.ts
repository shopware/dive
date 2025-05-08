import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';

export const PlaceOnFloorAction = Action.define<
    { id: string },
    Pick<ActionDependencies, 'engine' | 'registered'>,
    void
>({
    description: 'Places an object on the floor.',
    execute: (payload, { engine, registered }) => {
        const object = registered.get(payload.id);
        if (!object) {
            throw new Error(
                `Object with id ${payload.id} not registered. Registered: ${registered}`,
            );
        }

        const model = engine.scene.root.getSceneObject(object);
        if (!model) {
            throw new Error(
                `Object with id ${payload.id} is not found in the scene. Scene: ${engine.scene}`,
            );
        }

        if (!('isDIVEModel' in model)) {
            throw new Error(
                `Object with id ${payload.id} is not a DIVEModel. Model: ${model}`,
            );
        }

        model.placeOnFloor();
    },
});

declare global {
    interface ActionTypes {
        PLACE_ON_FLOOR: typeof PlaceOnFloorAction;
    }
}

registerAction('PLACE_ON_FLOOR', PlaceOnFloorAction);
