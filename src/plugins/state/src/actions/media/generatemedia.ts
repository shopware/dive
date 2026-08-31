import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { isCameraSchema } from '../../../types/index.ts';
import {
    type MediaGenerationByPosition,
    type MediaGenerationById,
} from '@shopware-ag/dive/mediacreator';

export const GenerateMediaAction = Action.define<
    MediaGenerationByPosition | MediaGenerationById,
    Pick<ActionDependencies, 'getMediaCreator' | 'registry'>,
    Promise<string>
>({
    description:
        'Generates a screenshot, stores it in a Blob and returns a Promise of a valid URI.',
    execute: async (payload, { getMediaCreator, registry }) => {
        const mediaCreator = await getMediaCreator();

        if ('id' in payload) {
            const object = registry.read(payload.id)?.schema;
            if (!object) {
                throw new Error(`Object with id ${payload.id} not registered.`);
            }

            if (!isCameraSchema(object)) {
                throw new Error(
                    `Object with id ${payload.id} is not a CAMERA. Object: ${object}`,
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
