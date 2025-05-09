import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';
import { type Vector3Like } from 'three';
import { isCOMPov } from '../../types/index.ts';

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
    Pick<ActionDependencies, 'registered' | 'getMediaCreator'>,
    Promise<string>
>({
    description:
        'Generates a screenshot, stores it in a Blob and returns a Promise of a valid URI.',
    execute: async (payload, { registered, getMediaCreator }) => {
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

        return getMediaCreator().then((mediaCreator) => {
            return mediaCreator.generateMedia(
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

registerAction<'GENERATE_MEDIA'>('GENERATE_MEDIA', GenerateMediaAction);
