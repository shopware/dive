import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';
import { type ARSystemOptions } from '../../../ar/ARSystem';

export const LaunchARAction = Action.define<
    { uri: string; options?: ARSystemOptions },
    Pick<ActionDependencies, 'ARSystem'>,
    Promise<void>
>({
    description:
        'Launches AR mode in native capabilities. (iOS: AR Quick Look, Android: Google Scene Viewer)',
    execute: async (payload, { ARSystem }) => {
        return ARSystem.instantiate().then((arSystem) => {
            arSystem.launch(payload.uri, payload.options);
        });
    },
});

declare global {
    interface ActionTypes {
        LAUNCH_AR: typeof LaunchARAction;
    }
}

registerAction('LAUNCH_AR', LaunchARAction);
