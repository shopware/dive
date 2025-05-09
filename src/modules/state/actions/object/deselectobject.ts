import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../types/index.ts';
import { isSelectTool } from '../../../toolbox/select/SelectTool.ts';
import { type COMEntity } from '../../types/index.ts';

export const DeselectObjectAction = Action.define<
    Partial<COMEntity> & { id: string },
    Pick<ActionDependencies, 'engine' | 'getToolbox' | 'registered'>,
    Promise<void>
>({
    description: 'Deselects an existing object.',
    execute: async (payload, { engine, getToolbox, registered }) => {
        const object = registered.get(payload.id);
        if (!object) throw new Error('Object not found.');

        const sceneObject = engine.scene.root.getSceneObject(object);
        if (!sceneObject) throw new Error('Object not found in scene.');

        if (!('isSelectable' in sceneObject))
            throw new Error('Object is not selectable.');
        const instance = await getToolbox();
        const activeTool = instance.getActiveTool();
        if (activeTool && isSelectTool(activeTool)) {
            activeTool.detachGizmo();
        }
    },
});

declare global {
    interface ActionTypes {
        DESELECT_OBJECT: typeof DeselectObjectAction;
    }
}

registerAction<'DESELECT_OBJECT'>('DESELECT_OBJECT', DeselectObjectAction);
