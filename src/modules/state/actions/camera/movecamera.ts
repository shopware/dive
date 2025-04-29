import { Action } from '../action.ts';
import { registerAction } from '../../ActionRegistry.ts';
import { ActionDependencies } from '../../types/index.ts';
import { isCOMPov } from '../../types';
import { type Vector3Like } from 'three';
import { Easing } from '@tweenjs/tween.js';

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
        'registered' | 'controller' | 'AnimationSystem' | 'engine'
    >,
    Promise<{ stop: () => void }>
>({
    description: 'Moves the camera to a new position and target.',
    execute: async (
        payload,
        { controller, registered, AnimationSystem, engine },
    ) => {
        let position = { x: 0, y: 0, z: 0 };
        let target = { x: 0, y: 0, z: 0 };
        if ('id' in payload) {
            const object = registered.get(payload.id);
            if (!object) {
                throw new Error(
                    `POV with id ${payload.id} not registered. Registered: ${registered}`,
                );
            }

            if (!isCOMPov(object)) {
                throw new Error(
                    `Object with id ${payload.id} is not a POV. Object: ${object}`,
                );
            }

            position = object.position;
            target = object.target;
        } else {
            position = payload.position;
            target = payload.target;
        }
        // controller.MoveTo(position, target, payload.duration, payload.locked);

        const animatorArray = await AnimationSystem.instantiate(
            engine.pipeline,
        ).then((animationSystem) => {
            const animatorPosition = animationSystem
                .createAnimator(
                    controller.object.position,
                    position,
                    payload.duration,
                    {
                        easing: Easing.Quadratic.Out,
                    },
                )
                .play();

            const animatorTarget = animationSystem
                .createAnimator(controller.target, target, payload.duration, {
                    easing: Easing.Quadratic.Out,
                    onUpdate: () => {
                        controller.object.lookAt(controller.target);
                    },
                    onComplete: () => {
                        controller.enabled = !payload.locked;
                    },
                })
                .play();

            return [
                animatorPosition,
                animatorTarget,
            ];
        });

        return {
            stop: () => animatorArray.forEach((animator) => animator.stop()),
        };
    },
});

declare global {
    interface ActionTypes {
        MOVE_CAMERA: typeof MoveCameraAction;
    }
}

registerAction('MOVE_CAMERA', MoveCameraAction);
