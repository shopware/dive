import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';
import { type Vector3Like } from 'three';
import { isCOMPov } from '../../types';

export const GenerateMediaAction = Action.define<
    (
        | {
              position: Vector3Like;
              target: Vector3Like;
          }
        | {
              id: string;
          }
    ) & {
        width: number;
        height: number;
    },
    Pick<
        ActionDependencies,
        'engine' | 'registered' | 'controller' | 'MediaCreator'
    >,
    Promise<string>
>({
    description:
        'Generates a screenshot, stores it in a Blob and returns a Promise of a valid URI.',
    execute: async (
        payload,
        { engine, registered, controller, MediaCreator },
    ) => {
        let position = { x: 0, y: 0, z: 0 };
        let target = { x: 0, y: 0, z: 0 };

        if ('id' in payload) {
            const object = registered.get(payload.id);
            if (!object) {
                throw new Error(
                    `Object with id ${payload.id} not registered. Registered: ${registered}`,
                );
            }

            if (!isCOMPov(object)) {
                throw new Error(
                    `Object with id ${payload.id} is not a POV. Object: ${object}`,
                );
            }

            position = object.position;
            target = object.target;
        } else {
            position = payload.position;
            target = payload.target;
        }

        return MediaCreator.instantiate(
            engine.renderer,
            engine.scene,
            controller,
        ).then((mediaCreator) => {
            return mediaCreator.GenerateMedia(
                position,
                target,
                payload.width,
                payload.height,
            );
        });
    },
});

declare global {
    interface ActionTypes {
        GENERATE_MEDIA: typeof GenerateMediaAction;
    }
}

registerAction('GENERATE_MEDIA', GenerateMediaAction);
