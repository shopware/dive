import { EventDispatcher, Vector2, Vector3 } from 'three/webgpu';
import type {
    DIVEInput,
    DIVEInputChannel,
    DIVEInputEventMap,
} from '@shopware-ag/dive';
import {
    TiltController,
    TiltControllerDefaultSettings,
    type TiltControllerSettings,
} from '../TiltController.ts';

import { DIVENode } from '../../../../engine/node/Node.ts';
import { PerspectiveCameraComponent } from '../../../../components/camera/perspective/PerspectiveCameraComponent.ts';

/** An input device that reports whatever tilt a test tells it to. */
class FakeInput extends EventDispatcher<DIVEInputEventMap> {
    public tilt(
        x: number,
        y: number,
        channel: DIVEInputChannel = 'orientation',
    ): void {
        this.dispatchEvent({
            type: 'axis',
            channel,
            value: new Vector2(x, y),
            unit: 'radians',
        });
    }

    public asInput(): DIVEInput {
        return this as unknown as DIVEInput;
    }
}

const MAX_X = TiltControllerDefaultSettings.maxTilt.x;
const MAX_Y = TiltControllerDefaultSettings.maxTilt.y;

/** Fast enough that one tick lands on the goal. */
const instant: TiltControllerSettings = { smoothing: 1000 };

describe('plugins/tiltcontroller/TiltController', () => {
    let camera: PerspectiveCameraComponent;
    let controller: TiltController;
    let input: FakeInput;

    const position = () => camera.owner!.position;

    /** Puts the camera somewhere, facing the origin. */
    const placeCamera = (x: number, y: number, z: number): void => {
        position().set(x, y, z);
        camera.lookAt(new Vector3());
    };

    const build = (settings: TiltControllerSettings = instant) => {
        controller = new TiltController(camera, settings);
        controller.connect(input.asInput());
        controller.setHome({
            position: new Vector3(0, 0, 5),
            target: new Vector3(),
        });

        return controller;
    };

    const expectAt = (x: number, y: number, z: number): void => {
        expect(position().x).toBeCloseTo(x);
        expect(position().y).toBeCloseTo(y);
        expect(position().z).toBeCloseTo(z);
    };

    beforeEach(() => {
        camera = new PerspectiveCameraComponent();
        new DIVENode().addComponent(camera);
        placeCamera(0, 0, 5);
        input = new FakeInput();
    });

    describe('construction', () => {
        it('should refuse a camera component with no node', () => {
            expect(
                () => new TiltController(new PerspectiveCameraComponent()),
            ).toThrow('must be attached');
        });

        it('should start from the defaults', () => {
            controller = new TiltController(camera);

            expect(controller.object).toBe(camera);
            expect(controller.enabled).toBe(true);
            expect(controller.maxTilt).toEqual(
                TiltControllerDefaultSettings.maxTilt,
            );
            expect(controller.maxPolarOffset).toBe(
                TiltControllerDefaultSettings.maxPolarOffset,
            );
            expect(controller.smoothing).toBe(
                TiltControllerDefaultSettings.smoothing,
            );
            expect(typeof controller.uuid).toBe('string');
        });

        it('should apply the settings it is given', () => {
            controller = new TiltController(camera, {
                enabled: false,
                maxTilt: { x: 1, y: 2 },
                maxPolarOffset: 0.5,
                smoothing: 3,
            });

            expect(controller.enabled).toBe(false);
            expect(controller.maxTilt).toEqual({ x: 1, y: 2 });
            expect(controller.maxPolarOffset).toBe(0.5);
            expect(controller.smoothing).toBe(3);
        });
    });

    describe('what keeps it still', () => {
        it('should not move before it has a home', () => {
            controller = new TiltController(camera, instant);
            controller.connect(input.asInput());
            input.tilt(MAX_X, 0);

            controller.tick(1);

            expectAt(0, 0, 5);
        });

        it('should not move while disabled', () => {
            build({ ...instant, enabled: false });
            input.tilt(MAX_X, 0);

            controller.tick(1);

            expectAt(0, 0, 5);
        });

        it('should ignore a tilt on another channel', () => {
            build();
            input.tilt(MAX_X, 0, 'primary');

            controller.tick(1);

            expectAt(0, 0, 5);
        });
    });

    describe('sideways', () => {
        beforeEach(() => build());

        it('should stay at the front without a tilt', () => {
            input.tilt(0, 0);
            controller.tick(1);

            expectAt(0, 0, 5);
        });

        it('should turn a quarter round at half the tilt', () => {
            input.tilt(MAX_X / 2, 0);
            controller.tick(1);

            expectAt(5, 0, 0);
        });

        it.each([
            ['to the one side', MAX_X],
            ['to the other side', -MAX_X],
        ])('should reach the middle of the back %s', (_, tilt) => {
            input.tilt(tilt, 0);
            controller.tick(1);

            expectAt(0, 0, -5);
        });

        it('should stop at the back however far the device goes', () => {
            input.tilt(3 * MAX_X, 0);
            controller.tick(1);

            expectAt(0, 0, -5);
        });

        it('should come back to the front when the device does', () => {
            input.tilt(MAX_X / 2, 0);
            controller.tick(1);

            input.tilt(0, 0);
            controller.tick(1);

            expectAt(0, 0, 5);
        });

        it('should turn back as soon as the device does past the limit', () => {
            input.tilt(3 * MAX_X, 0);
            controller.tick(1);

            // half a limit back from wherever the device went
            input.tilt(2.5 * MAX_X, 0);
            controller.tick(1);

            expectAt(5, 0, 0);
        });

        it('should find the front a full limit back from the stop', () => {
            input.tilt(-3 * MAX_X, 0);
            controller.tick(1);

            input.tilt(-2 * MAX_X, 0);
            controller.tick(1);

            expectAt(0, 0, 5);
        });

        it('should hold a sideways wobble at the stop without keeping it', () => {
            // moving the device up and down, with the wrist turning along
            input.tilt(1.2 * MAX_X, 3 * MAX_Y);
            controller.tick(1);

            input.tilt(0, 3 * MAX_Y);
            controller.tick(1);

            expect(position().x).toBeCloseTo(0);
            expect(position().z).toBeGreaterThan(0);
        });

        it('should drag no limit for a movement along both axes alike', () => {
            input.tilt(2 * MAX_X, 2 * MAX_X);
            controller.tick(1);

            input.tilt(0, 0);
            controller.tick(1);

            expectAt(0, 0, 5);
        });

        it('should start from the neutral pose again with a new home', () => {
            input.tilt(3 * MAX_X, 0);
            controller.tick(1);

            controller.setHome({
                position: new Vector3(0, 0, 5),
                target: new Vector3(),
            });
            input.tilt(0, 0);
            controller.tick(1);

            expectAt(0, 0, 5);
        });

        it('should start from the neutral pose again when turned back on', () => {
            input.tilt(3 * MAX_X, 0);
            controller.tick(1);

            controller.enabled = false;
            controller.enabled = true;
            input.tilt(0, 0);
            controller.tick(1);

            expectAt(0, 0, 5);
        });

        it('should keep facing the target', () => {
            input.tilt(MAX_X / 2, 0);
            controller.tick(1);

            const forward = new Vector3(0, 0, -1).applyQuaternion(
                camera.owner!.quaternion,
            );
            expect(forward.x).toBeCloseTo(-1);
        });
    });

    describe('forward and backward', () => {
        it('should move the polar angle by up to its offset', () => {
            build();

            input.tilt(0, MAX_Y);
            controller.tick(1);

            // from the horizon down by 45 degrees
            const offset = TiltControllerDefaultSettings.maxPolarOffset;
            expectAt(0, -5 * Math.sin(offset), 5 * Math.cos(offset));
        });

        it('should stop at the offset however far the device goes', () => {
            build();

            input.tilt(0, -3 * MAX_Y);
            controller.tick(1);

            const offset = TiltControllerDefaultSettings.maxPolarOffset;
            expectAt(0, 5 * Math.sin(offset), 5 * Math.cos(offset));
        });

        it('should move the polar limit along as well', () => {
            build();

            input.tilt(0, -3 * MAX_Y);
            controller.tick(1);
            input.tilt(0, -2.5 * MAX_Y);
            controller.tick(1);

            const offset = TiltControllerDefaultSettings.maxPolarOffset / 2;
            expectAt(0, 5 * Math.sin(offset), 5 * Math.cos(offset));
        });

        it('should never go over the pole', () => {
            build({ ...instant, maxPolarOffset: Math.PI });

            input.tilt(0, -MAX_Y);
            controller.tick(1);

            expect(position().y).toBeCloseTo(5);
            expect(position().y).toBeLessThan(5);
        });
    });

    describe('easing', () => {
        it('should approach the goal at its smoothing rate', () => {
            build({ smoothing: 10 });

            input.tilt(MAX_X / 2, 0);
            controller.tick(0.1);

            // 1 - e^-1 of the way to a quarter turn
            const angle = (1 - Math.exp(-1)) * (Math.PI / 2);
            expectAt(5 * Math.sin(angle), 0, 5 * Math.cos(angle));
        });

        it('should start from wherever the camera is', () => {
            placeCamera(5, 0, 0);
            build({ smoothing: 10 });

            controller.tick(0.001);

            // still nearly at the side, not snapped to the front
            expect(position().x).toBeCloseTo(5, 1);
        });

        it('should take the nearer way round to the front', () => {
            // just past the back on the negative side
            const angle = -0.9 * Math.PI;
            placeCamera(5 * Math.sin(angle), 0, 5 * Math.cos(angle));
            build({ smoothing: 10 });

            controller.tick(0.1);

            expect(position().x).toBeLessThan(0);
        });

        it('should ease distance and target home too', () => {
            placeCamera(0, 0, 10);
            build();

            controller.tick(1);

            expectAt(0, 0, 5);
        });

        it('should start from the camera again when it is turned back on', () => {
            build();
            controller.tick(1);

            controller.enabled = false;
            placeCamera(5, 0, 0);
            controller.enabled = true;
            controller.smoothing = 10;
            controller.tick(0.001);

            expect(position().x).toBeCloseTo(5, 1);
        });

        it('should keep easing when enabled is set again', () => {
            build({ smoothing: 10 });
            controller.tick(0.001);
            const before = position().clone();

            controller.enabled = true;
            input.tilt(MAX_X / 2, 0);
            controller.tick(0.001);

            expect(position().distanceTo(before)).toBeLessThan(0.1);
        });

        it('should seed a camera above its home without an offset to measure by', () => {
            placeCamera(0, 5, 0.001);
            build({ ...instant, maxPolarOffset: 0 });

            controller.tick(1);

            expectAt(0, 0, 5);
        });
    });

    describe('events', () => {
        it('should report a change only when the camera moved', () => {
            build();
            const onChange = vi.fn();
            controller.addEventListener('change', onChange);

            controller.tick(1);
            expect(onChange).not.toHaveBeenCalled();

            input.tilt(MAX_X, 0);
            controller.tick(1);
            expect(onChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('connecting inputs', () => {
        it('should listen to an input only once', () => {
            build();
            const listen = vi.spyOn(input, 'addEventListener');

            controller.connect(input.asInput());

            expect(listen).not.toHaveBeenCalled();
        });

        it('should stop listening once disconnected', () => {
            build();
            controller.disconnect(input.asInput());

            input.tilt(MAX_X, 0);
            controller.tick(1);

            expectAt(0, 0, 5);
        });

        it('should ignore disconnecting an input it never had', () => {
            build();

            expect(() =>
                controller.disconnect(new FakeInput().asInput()),
            ).not.toThrow();
        });

        it('should disconnect everything on dispose', () => {
            build();
            const onDispose = vi.fn();
            controller.addEventListener('dispose', onDispose);

            controller.dispose();
            input.tilt(MAX_X, 0);
            controller.tick(1);

            expect(onDispose).toHaveBeenCalledTimes(1);
            expectAt(0, 0, 5);
        });
    });
});
