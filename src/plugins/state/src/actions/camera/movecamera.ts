import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { type ActionDependencies } from '../../../types/index.ts';
import { isCameraSchema } from '../../../types/index.ts';
import { type Vector3Like } from 'three/webgpu';

export const MoveCameraAction = Action.define<
    | {
          position: Vector3Like;
          target: Vector3Like;
          locked: boolean;
          duration: number;
      }
    | {
          id: string;
          locked: boolean;
          duration: number;
      },
    Pick<
        ActionDependencies,
        'registry' | 'controller' | 'getAnimationSystem' | 'gateway'
    >,
    Promise<{ stop: () => void }>
>({
    description: 'Moves the camera to a new position and target.',
    execute: async (
        payload,
        { controller, registry, getAnimationSystem, gateway },
    ) => {
        const animationSystem = await getAnimationSystem();
        let position = { x: 0, y: 0, z: 0 };
        let target = { x: 0, y: 0, z: 0 };
        if ('id' in payload) {
            const object = registry.read(payload.id)?.schema;
            if (!object) {
                throw new Error(`CAMERA with id ${payload.id} not registered.`);
            }

            if (!isCameraSchema(object)) {
                throw new Error(
                    `Object with id ${payload.id} is not a CAMERA. Object: ${object}`,
                );
            }

            position = object.position;
            target = object.target;
        } else {
            position = payload.position;
            target = payload.target;
        }

        gateway.registerTicker(animationSystem);

        controller.enabled = true;

        const animator = await animationSystem.fromTargets(
            [
                {
                    object: controller.object.position,
                    to: position,
                },
                {
                    object: controller.target,
                    to: target,
                },
            ],
            payload.duration,
            {
                easing: animationSystem.Easing.Quadratic.Out,
                onUpdate: () => {
                    controller.object.lookAt(controller.target);
                },
                onComplete: () => {
                    controller.enabled = !payload.locked;
                },
            },
        );

        animator.play();

        return {
            stop: () => animator.stop(),
        };
    },
});

declare global {
    interface ActionTypes {
        MOVE_CAMERA: typeof MoveCameraAction;
    }
}

registerAction<'MOVE_CAMERA'>('MOVE_CAMERA', MoveCameraAction);
