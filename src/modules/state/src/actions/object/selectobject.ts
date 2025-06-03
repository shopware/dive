import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { isSelectTool } from '@shopware-ag/dive/toolbox';
import { type COMEntity } from '../../../types/index.ts';
import { type DIVESelectable } from '@shopware-ag/dive';

export const SelectObjectAction = Action.define<
    Partial<COMEntity> & { id: string },
    Pick<ActionDependencies, 'engine' | 'getToolbox' | 'registered'>,
    Promise<void>
>({
    description: 'Selects an existing object.',
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
            activeTool.attachGizmo(sceneObject as DIVESelectable);
        }
    },
});

declare global {
    interface ActionTypes {
        SELECT_OBJECT: typeof SelectObjectAction;
    }
}

registerAction<'SELECT_OBJECT'>('SELECT_OBJECT', SelectObjectAction);
