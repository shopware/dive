import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type StateData } from '../../../types/StateData.ts';
import {
    GroupSchema,
    LightSchema,
    ModelSchema,
    CameraSchema,
    PrimitiveSchema,
} from '../../../types/index.ts';

/**
 * @deprecated use [`GetStateAction`](../state/getstate.ts) instead. This action will be removed in next major release.
 */
export const GetAllSceneDataAction = Action.define<
    object,
    Pick<ActionDependencies, 'controller' | 'gateway' | 'registry'>,
    StateData
>({
    description: 'Retrieves all current scene data.',
    execute: (_payload, { controller, gateway, registry }) => {
        const settings = gateway.readSceneSettings();

        return {
            name: settings.name,
            mediaItem: null,
            backgroundColor: settings.backgroundColor,
            floorEnabled: settings.floorEnabled,
            floorColor: settings.floorColor,
            userCamera: {
                position: controller.object.position.clone(),
                target: controller.target.clone(),
            },
            spotmarks: [],
            lights: registry
                .read()
                .map((entry) => entry.schema)
                .filter(
                    (object) => object.entityType === 'light',
                ) as LightSchema[],
            objects: registry
                .read()
                .map((entry) => entry.schema)
                .filter(
                    (object) => object.entityType === 'model',
                ) as ModelSchema[],
            cameras: registry
                .read()
                .map((entry) => entry.schema)
                .filter(
                    (object) => object.entityType === 'camera',
                ) as CameraSchema[],
            primitives: registry
                .read()
                .map((entry) => entry.schema)
                .filter(
                    (object) => object.entityType === 'primitive',
                ) as PrimitiveSchema[],
            groups: registry
                .read()
                .map((entry) => entry.schema)
                .filter(
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
