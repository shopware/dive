import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';
import { isSelectTool } from '../../../toolbox/select/SelectTool';
import { type COMEntity } from '../../types';
import { type DIVESelectable } from '../../../../interfaces/Selectable';

export const SelectObjectAction = Action.define<
    Partial<COMEntity> & { id: string },
    Pick<
        ActionDependencies,
        'engine' | 'controller' | 'Toolbox' | 'registered'
    >,
    Promise<void>
>({
    description: 'Selects an existing object.',
    execute: async (payload, { engine, controller, Toolbox, registered }) => {
        const object = registered.get(payload.id);
        if (!object) throw new Error('Object not found.');

        const sceneObject = engine.scene.GetSceneObject(object);
        if (!sceneObject) throw new Error('Object not found in scene.');

        if (!('isSelectable' in sceneObject))
            throw new Error('Object is not selectable.');

        const instance = await Toolbox.instantiate(engine.scene, controller);
        const activeTool = instance.GetActiveTool();
        if (activeTool && isSelectTool(activeTool)) {
            activeTool.AttachGizmo(sceneObject as DIVESelectable);
        }
    },
});

declare global {
    interface ActionTypes {
        SELECT_OBJECT: typeof SelectObjectAction;
    }
}

registerAction('SELECT_OBJECT', SelectObjectAction);
