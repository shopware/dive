import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { type StateData } from '../../../types/index.ts';

export const SetStateAction = Action.define<
    StateData,
    Pick<ActionDependencies, 'engine' | 'controller' | 'state'>,
    Promise<void>
>({
    description: 'Applies complete state data to current dive instance.',
    execute: async (_payload, { engine, controller, state }) => {
        _payload.name !== undefined && (engine.scene.name = _payload.name);
        _payload.backgroundColor !== undefined &&
            engine.scene.setBackground(_payload.backgroundColor);
        _payload.floorEnabled !== undefined &&
            engine.scene.root.floor.setVisibility(_payload.floorEnabled);
        _payload.floorColor !== undefined &&
            engine.scene.root.floor.setColor(_payload.floorColor);
        _payload.userCamera !== undefined &&
            controller.setState({
                position: _payload.userCamera.position,
                target: _payload.userCamera.target,
                azimuthalAngle: controller.getState().azimuthalAngle,
                polarAngle: controller.getState().polarAngle,
                distance: controller.getState().distance,
                quaternion: controller.getState().quaternion,
            });

        const promises: Promise<void>[] = [];

        _payload.groups !== undefined &&
            _payload.groups.forEach((group) => {
                promises.push(
                    state.performAction('ADD_OBJECT', {
                        ...group,
                        locked: group.locked ?? false,
                        visible: group.visible ?? true,
                        entityType: 'group',
                    }),
                );
            });
        _payload.lights !== undefined &&
            _payload.lights.forEach((light) => {
                promises.push(
                    state.performAction('ADD_OBJECT', {
                        ...light,
                        locked: light.locked ?? false,
                        visible: light.visible ?? true,
                        entityType: 'light',
                    }),
                );
            });
        _payload.cameras !== undefined &&
            _payload.cameras.forEach((camera) => {
                promises.push(
                    state.performAction('ADD_OBJECT', {
                        ...camera,
                        locked: camera.locked ?? false,
                        visible: camera.visible ?? true,
                        entityType: 'camera',
                    }),
                );
            });
        _payload.primitives !== undefined &&
            _payload.primitives.forEach((primitive) => {
                promises.push(
                    state.performAction('ADD_OBJECT', {
                        ...primitive,
                        locked: primitive.locked ?? false,
                        visible: primitive.visible ?? true,
                        entityType: 'primitive',
                    }),
                );
            });
        _payload.objects !== undefined &&
            _payload.objects.forEach((object) => {
                promises.push(
                    state.performAction('ADD_OBJECT', {
                        ...object,
                        locked: object.locked ?? false,
                        visible: object.visible ?? true,
                        entityType: 'model',
                    }),
                );
            });

        _payload.spotmarks !== undefined &&
            console.warn(
                'SET_STATE: Spotmarks are not supported yet and will be ignored.',
            );

        await Promise.all(promises);
    },
});

declare global {
    interface ActionTypes {
        SET_STATE: typeof SetStateAction;
    }
}

registerAction<'SET_STATE'>('SET_STATE', SetStateAction);
