import { Action } from '../action';
import { ActionDependencies } from '../types';
import { type DIVEModel } from '../../../../components';

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

        const model = engine.scene.GetSceneObject<DIVEModel>(object);
        if (!model) {
            throw new Error(
                `Object with id ${payload.id} is not found in the scene. Scene: ${engine.scene}`,
            );
        }

        model.PlaceOnFloor();
    },
});

declare global {
    interface ActionClasses {
        PLACE_ON_FLOOR: typeof PlaceOnFloorAction;
    }
}
