import { Action } from '../action';
import { ActionDependencies } from '../types';
import { type DIVESceneData } from '../../../../types';
import { Color, MeshStandardMaterial } from 'three';
import {
    type COMGroup,
    type COMLight,
    type COMModel,
    type COMPov,
    type COMPrimitive,
} from '../../../..';

export const GetAllSceneDataAction = Action.define<
    object,
    Pick<ActionDependencies, 'engine' | 'controller' | 'registered'>,
    DIVESceneData
>({
    description: 'Retrieves all current scene data.',
    execute: (_payload, { engine, controller, registered }) => {
        return {
            name: engine.scene.name,
            mediaItem: null,
            backgroundColor:
                '#' + (engine.scene.background as Color).getHexString(),
            floorEnabled: engine.scene.Root.floor.visible,
            floorColor:
                '#' +
                (
                    engine.scene.Root.floor.material as MeshStandardMaterial
                ).color.getHexString(),
            userCamera: {
                position: controller.object.position.clone(),
                target: controller.target.clone(),
            },
            spotmarks: [],
            lights: Array.from(registered.values()).filter(
                (object) => object.entityType === 'light',
            ) as COMLight[],
            objects: Array.from(registered.values()).filter(
                (object) => object.entityType === 'model',
            ) as COMModel[],
            cameras: Array.from(registered.values()).filter(
                (object) => object.entityType === 'pov',
            ) as COMPov[],
            primitives: Array.from(registered.values()).filter(
                (object) => object.entityType === 'primitive',
            ) as COMPrimitive[],
            groups: Array.from(registered.values()).filter(
                (object) => object.entityType === 'group',
            ) as COMGroup[],
        };
    },
});

declare global {
    interface ActionClasses {
        GET_ALL_SCENE_DATA: typeof GetAllSceneDataAction;
    }
}
