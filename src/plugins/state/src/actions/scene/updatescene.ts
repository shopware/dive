import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../../types/index.ts';

export const UpdateSceneAction = Action.define<
    Partial<{
        name: string;
        backgroundColor: string | number;
        gridEnabled: boolean;
        floorEnabled: boolean;
        floorColor: string | number;
    }>,
    Pick<ActionDependencies, 'gateway'>,
    void
>({
    description: 'Updates scene properties.',
    execute: (payload, { gateway }) => {
        gateway.applySceneSettings(payload);

        // the payload doubles as the action's result, so it is filled with
        // what the scene actually holds afterwards
        Object.assign(payload, gateway.readSceneSettings());
    },
});

declare global {
    interface ActionTypes {
        UPDATE_SCENE: typeof UpdateSceneAction;
    }
}

registerAction<'UPDATE_SCENE'>('UPDATE_SCENE', UpdateSceneAction);
