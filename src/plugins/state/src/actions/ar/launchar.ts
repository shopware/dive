import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type ARSystemOptions } from 'src/plugins/ar/index.ts';

export const LaunchARAction = Action.define<
    { uri: string; options?: ARSystemOptions },
    Pick<ActionDependencies, 'getARSystem'>,
    Promise<void>
>({
    description:
        'Launches AR mode in native capabilities. (iOS: AR Quick Look, Android: Google Scene Viewer)',
    execute: async (payload, { getARSystem }) => {
        return getARSystem().then((arSystem) => {
            arSystem.launch(payload.uri, payload.options);
        });
    },
});

declare global {
    interface ActionTypes {
        LAUNCH_AR: typeof LaunchARAction;
    }
}

registerAction<'LAUNCH_AR'>('LAUNCH_AR', LaunchARAction);
