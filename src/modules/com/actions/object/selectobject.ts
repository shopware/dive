import { Action } from '../action';
import { ActionDependencies } from '../types';
import { isSelectTool } from '../../../toolbox/select/SelectTool';
import { type COMEntity } from '../../types';
import { type DIVESelectable } from '../../../../interfaces/Selectable';

export const SelectObjectAction = Action.define<
    Partial<COMEntity> & { id: string },
    Pick<ActionDependencies, 'engine' | 'toolbox' | 'registered'>,
    void
>({
    description: 'Selects an existing object.',
    execute: (payload, { engine, toolbox, registered }) => {
        const object = registered.get(payload.id);
        if (!object) throw new Error('Object not found.');

        const sceneObject = engine.scene.GetSceneObject(object);
        if (!sceneObject) throw new Error('Object not found in scene.');

        if (!('isSelectable' in sceneObject))
            throw new Error('Object is not selectable.');

        const activeTool = toolbox.GetActiveTool();
        if (activeTool && isSelectTool(activeTool)) {
            activeTool.AttachGizmo(sceneObject as DIVESelectable);
        }
    },
});

declare global {
    interface ActionClasses {
        SELECT_OBJECT: typeof SelectObjectAction;
    }
}
