import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type StateData } from '../../../types/index.ts';
import {
    GroupSchema,
    LightSchema,
    ModelSchema,
    CameraSchema,
    PrimitiveSchema,
} from '@shopware-ag/dive';

export const GetStateAction = Action.define<
    void,
    Pick<ActionDependencies, 'gateway' | 'controller' | 'registered'>,
    StateData
>({
    description: 'Retrieves complete state data.',
    execute: (_payload, { gateway, controller, registered }) => {
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
            lights: Array.from(registered.values()).filter(
                (object) => object.entityType === 'light',
            ) as LightSchema[],
            objects: Array.from(registered.values()).filter(
                (object) => object.entityType === 'model',
            ) as ModelSchema[],
            cameras: Array.from(registered.values()).filter(
                (object) => object.entityType === 'camera',
            ) as CameraSchema[],
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
        GET_STATE: typeof GetStateAction;
    }
}

registerAction<'GET_STATE'>('GET_STATE', GetStateAction);
