import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type ImageBasedLightPatch } from '../../EngineGateway.ts';

export type SetImageBasedLightPayload = {
    /**
     * What to change, or `null` to turn the image based light off. Fields
     * left out keep their value; an `image` of `null` is the bundled default
     * HDR.
     */
    imageBasedLight: ImageBasedLightPatch | null;
};

export const SetImageBasedLightAction = Action.define<
    SetImageBasedLightPayload,
    Pick<ActionDependencies, 'gateway'>,
    Promise<void>
>({
    description:
        'Sets the image, rotation and intensity of the image based light, or turns it off.',
    execute: (payload, { gateway }) => {
        return gateway.applySceneSettings({
            imageBasedLight: payload.imageBasedLight,
        });
    },
});

declare global {
    interface ActionTypes {
        SET_IMAGE_BASED_LIGHT: typeof SetImageBasedLightAction;
    }
}

registerAction<'SET_IMAGE_BASED_LIGHT'>(
    'SET_IMAGE_BASED_LIGHT',
    SetImageBasedLightAction,
);
