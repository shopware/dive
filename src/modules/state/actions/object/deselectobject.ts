import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';
import { isSelectTool } from '../../../toolbox/select/SelectTool';
import { type COMEntity } from '../../types';

export const DeselectObjectAction = Action.define<
    Partial<COMEntity> & { id: string },
    Pick<
        ActionDependencies,
        'engine' | 'controller' | 'Toolbox' | 'registered'
    >,
    Promise<void>
>({
    description: 'Deselects an existing object.',
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
            activeTool.DetachGizmo();
        }
    },
});

declare global {
    interface ActionTypes {
        DESELECT_OBJECT: typeof DeselectObjectAction;
    }
}

registerAction('DESELECT_OBJECT', DeselectObjectAction);
