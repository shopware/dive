import { type DIVEBackgroundSettings } from '@shopware-ag/dive';
import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';

/**
 * One object rather than a union of two: `State.performAction` builds a union
 * over every action's payload, and a union here pushes it past what
 * TypeScript can represent.
 */
export type SetBackgroundPayload = {
    /**
     * A colour, an equirectangular image (URL plus rotation), or
     * `null` for transparent. Wins over `color`.
     */
    background?: DIVEBackgroundSettings;
    /** @deprecated Use `background` instead. */
    color?: string | number;
};

export const SetBackgroundAction = Action.define<
    SetBackgroundPayload,
    Pick<ActionDependencies, 'gateway'>,
    Promise<void>
>({
    description:
        'Sets what is shown behind the scene: a colour, an image or nothing.',
    execute: (payload, { gateway }) => {
        return gateway.applySceneSettings({
            background: payload.background,
            backgroundColor: payload.color,
        });
    },
});

declare global {
    interface ActionTypes {
        SET_BACKGROUND: typeof SetBackgroundAction;
    }
}

registerAction<'SET_BACKGROUND'>('SET_BACKGROUND', SetBackgroundAction);
