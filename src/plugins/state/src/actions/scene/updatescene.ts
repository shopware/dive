import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../../types/index.ts';
import { type SceneSettingsPatch } from '../../EngineGateway.ts';

export const UpdateSceneAction = Action.define<
    SceneSettingsPatch,
    Pick<ActionDependencies, 'gateway'>,
    Promise<void>
>({
    description: 'Updates scene properties.',
    execute: async (payload, { gateway }) => {
        await gateway.applySceneSettings(payload);

        /**
         * the payload doubles as the action's result, so it is filled with
         * what the scene actually holds afterwards
         */
        Object.assign(payload, gateway.readSceneSettings());
    },
});

declare global {
    interface ActionTypes {
        UPDATE_SCENE: typeof UpdateSceneAction;
    }
}

registerAction<'UPDATE_SCENE'>('UPDATE_SCENE', UpdateSceneAction);
