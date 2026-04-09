import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type StateSceneData } from '../../../types/StateSceneData.ts';
import { Color, MeshStandardMaterial } from 'three/webgpu';
import {
    GroupSchema,
    LightSchema,
    ModelSchema,
    PovSchema,
    PrimitiveSchema,
} from '@shopware-ag/dive';

export const GetAllSceneDataAction = Action.define<
    object,
    Pick<ActionDependencies, 'engine' | 'controller' | 'registered'>,
    StateSceneData
>({
    description: 'Retrieves all current scene data.',
    execute: (_payload, { engine, controller, registered }) => {
        return {
            name: engine.scene.name,
            mediaItem: null,
            backgroundColor:
                '#' + (engine.scene.background as Color).getHexString(),
            floorEnabled: engine.scene.root.floor.visible,
            floorColor:
                '#' +
                (
                    engine.scene.root.floor.material as MeshStandardMaterial
                ).color.getHexString(),
            userCamera: {
                position: controller.object.position.clone(),
                target: controller.target.clone(),
            },
            spotmarks: [],
            lights: Array.from(registered.values()).filter(
                (object) => object.entityType === 'light',
            ) as LightSchema[],
            objects: Array.from(registered.values()).filter(
                (object) => object.entityType === 'model',
            ) as ModelSchema[],
            cameras: Array.from(registered.values()).filter(
                (object) => object.entityType === 'pov',
            ) as PovSchema[],
            primitives: Array.from(registered.values()).filter(
                (object) => object.entityType === 'primitive',
            ) as PrimitiveSchema[],
            groups: Array.from(registered.values()).filter(
                (object) => object.entityType === 'group',
            ) as GroupSchema[],
        };
    },
});

declare global {
    interface ActionTypes {
        GET_ALL_SCENE_DATA: typeof GetAllSceneDataAction;
    }
}

registerAction<'GET_ALL_SCENE_DATA'>(
    'GET_ALL_SCENE_DATA',
    GetAllSceneDataAction,
);
