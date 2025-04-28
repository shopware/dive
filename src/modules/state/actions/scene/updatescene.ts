import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';
import { Color, MeshStandardMaterial } from 'three';

export const UpdateSceneAction = Action.define<
    Partial<{
        name: string;
        backgroundColor: string | number;
        gridEnabled: boolean;
        floorEnabled: boolean;
        floorColor: string | number;
    }>,
    Pick<ActionDependencies, 'engine'>,
    void
>({
    description: 'Updates scene properties.',
    execute: (payload, { engine }) => {
        if (payload.name !== undefined) engine.scene.name = payload.name;
        if (payload.backgroundColor !== undefined)
            engine.scene.SetBackground(payload.backgroundColor);

        if (payload.gridEnabled !== undefined)
            engine.scene.Grid.SetVisibility(payload.gridEnabled);

        if (payload.floorEnabled !== undefined)
            engine.scene.Root.floor.SetVisibility(payload.floorEnabled);
        if (payload.floorColor !== undefined)
            engine.scene.Root.floor.SetColor(payload.floorColor);

        // fill payload with current values
        // TODO optmize this
        payload.name = engine.scene.name;
        payload.backgroundColor =
            '#' + (engine.scene.background as Color).getHexString();
        payload.gridEnabled = engine.scene.Grid.visible;
        payload.floorEnabled = engine.scene.Root.floor.visible;
        payload.floorColor =
            '#' +
            (
                engine.scene.Root.floor.material as MeshStandardMaterial
            ).color.getHexString();
    },
});

declare global {
    interface ActionTypes {
        UPDATE_SCENE: typeof UpdateSceneAction;
    }
}

registerAction('UPDATE_SCENE', UpdateSceneAction);
