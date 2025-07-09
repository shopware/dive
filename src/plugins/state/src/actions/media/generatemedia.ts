import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { isPovSchema } from '@shopware-ag/dive';
import {
    type MediaGenerationByPosition,
    type MediaGenerationById,
} from '@shopware-ag/dive/mediacreator';

export const GenerateMediaAction = Action.define<
    MediaGenerationByPosition | MediaGenerationById,
    Pick<ActionDependencies, 'registered' | 'getMediaCreator'>,
    Promise<string>
>({
    description:
        'Generates a screenshot, stores it in a Blob and returns a Promise of a valid URI.',
    execute: async (payload, { registered, getMediaCreator }) => {
        const mediaCreator = await getMediaCreator();

        if ('id' in payload) {
            const object = registered.get(payload.id);
            if (!object) {
                throw new Error(
                    `Object with id ${payload.id} not registered. Registered: ${registered}`,
                );
            }

            if (!isPovSchema(object)) {
                throw new Error(
                    `Object with id ${payload.id} is not a POV. Object: ${object}`,
                );
            }

            const { resolution } = payload;
            const { position, target } = object;

            return mediaCreator.generateMedia({
                position,
                target,
                resolution,
            });
        }

        return mediaCreator.generateMedia(payload);
    },
});

declare global {
    interface ActionTypes {
        GENERATE_MEDIA: typeof GenerateMediaAction;
    }
}

registerAction<'GENERATE_MEDIA'>('GENERATE_MEDIA', GenerateMediaAction);
