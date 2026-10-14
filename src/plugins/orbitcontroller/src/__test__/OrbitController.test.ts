import type { Mock } from 'vitest';
import {
    Camera,
    EventDispatcher,
    OrthographicCamera,
    PerspectiveCamera,
    Quaternion,
    Sphere,
    Vector2,
    Vector3,
} from 'three/webgpu';
import { BoundingBox } from '@shopware-ag/dive';
import type {
    DIVEInput,
    DIVEInputChannel,
    DIVEInputEventMap,
} from '@shopware-ag/dive';
import {
    OrbitController,
    OrbitControllerDefaultSettings,
    type OrbitControllerSettings,
} from '../OrbitController.ts';

import { DIVENode } from '../../../../engine/node/Node.ts';
import { DIVECameraComponent } from '../../../../components/camera/CameraComponent.ts';
import { PerspectiveCameraComponent } from '../../../../components/camera/perspective/PerspectiveCameraComponent.ts';

vi.mock('@shopware-ag/dive', () => {
    return {
        // framing measures whatever it is handed, so this is what focusObject
        // reaches for -- a unit sphere around the origin
        BoundingBox: vi.fn(function (this: Record<string, unknown>) {
            this.sphere = new Sphere(new Vector3(), 1);
            this.enclose = vi.fn(() => this);
            return this;
        }),
    };
});

/**
 * Stands in for the orthographic component that does not exist yet.
 */
class TestOrthographicCameraComponent extends DIVECameraComponent {
    constructor() {
        super(new OrthographicCamera(-1, 1, 1, -1, 0.1, 100));
    }

    public onResize(): void {}
}

/** A camera the controller can neither pan nor zoom. */
class TestUnknownCameraComponent extends DIVECameraComponent {
    constructor() {
        super(new Camera());
    }

    public onResize(): void {}
}

/** A camera component on a node, the way the engine builds one. */
function attach<T extends DIVECameraComponent>(component: T): T {
    new DIVENode().addComponent(component);

    return component;
}

/** A perspective camera at (0, 2, 2), looking at the origin. */
function makeCamera(): PerspectiveCameraComponent {
    const component = attach(new PerspectiveCameraComponent());
    component.owner!.position.set(0, 2, 2);

    return component;
}

/** An input device that reports whatever a test tells it to. */
class FakeInput extends EventDispatcher<DIVEInputEventMap> {
    public start(channel: DIVEInputChannel): void {
        this.dispatchEvent({ type: 'start', channel });
    }

    public end(channel: DIVEInputChannel): void {
        this.dispatchEvent({ type: 'end', channel });
    }

    public move(
        channel: DIVEInputChannel,
        x: number,
        y: number,
        unit: 'viewport' | 'radians' = 'viewport',
    ): void {
        this.dispatchEvent({
            type: 'move',
            channel,
            delta: new Vector2(x, y),
            unit,
        });
    }

    public scale(factor: number): void {
        this.dispatchEvent({ type: 'scale', factor });
    }

    public asInput(): DIVEInput {
        return this as unknown as DIVEInput;
    }
}

/** Damping off, so one move lands in full on the next update. */
const immediate: OrbitControllerSettings = { enableDamping: false };

const SQRT8 = Math.sqrt(8);

describe('plugins/orbitcontroller/OrbitController', () => {
    let camera: PerspectiveCameraComponent;
    let controller: OrbitController;
    let input: FakeInput;

    const position = () => camera.owner!.position;

    const build = (
        settings: OrbitControllerSettings = immediate,
        component: DIVECameraComponent = camera,
    ): OrbitController => {
        controller = new OrbitController(component, settings);
        controller.connect(input.asInput());

        return controller;
    };

    beforeEach(() => {
        vi.clearAllMocks();
        camera = makeCamera();
        input = new FakeInput();
    });

    describe('construction', () => {
        it('should refuse a camera component with no node', () => {
            // the controller moves object.owner, so a detached component leaves
            // it nothing to drive
            expect(
                () => new OrbitController(new PerspectiveCameraComponent()),
            ).toThrow('must be attached');
        });

        it('should start from the defaults', () => {
            controller = new OrbitController(camera);

            expect(controller.object).toBe(camera);
            expect(controller.enabled).toBe(true);
            expect(controller.inputEnabled).toBe(true);
            expect(controller.enableDamping).toBe(true);
            expect(controller.dampingFactor).toBe(0.05);
            expect(controller.zoomSpeed).toBe(1);
            expect(controller.bindings).toEqual(
                OrbitControllerDefaultSettings.bindings,
            );
            expect(typeof controller.uuid).toBe('string');
            expect(OrbitController.DEFAULT_ZOOM_FACTOR).toBe(1);
        });

        it('should apply the settings it is given', () => {
            controller = new OrbitController(camera, {
                enableDamping: false,
                dampingFactor: 0.1,
                enabled: false,
                inputEnabled: false,
                enableZoom: false,
            });

            expect(controller.enableDamping).toBe(false);
            expect(controller.dampingFactor).toBe(0.1);
            expect(controller.enabled).toBe(false);
            expect(controller.inputEnabled).toBe(false);
            expect(controller.enableZoom).toBe(false);
        });

        it('should merge bindings into the defaults', () => {
            controller = new OrbitController(camera, {
                bindings: { primary: { action: 'pan', speed: 2 } },
            });

            expect(controller.bindings.primary).toEqual({
                action: 'pan',
                speed: 2,
            });
            expect(controller.bindings.secondary).toEqual(
                OrbitControllerDefaultSettings.bindings.secondary,
            );
        });

        it('should not share its bindings with the defaults', () => {
            controller = new OrbitController(camera);
            controller.bindings.primary = { action: 'dolly', speed: 1 };

            expect(
                OrbitControllerDefaultSettings.bindings.primary!.action,
            ).toBe('rotate');
        });

        it('should place the camera on its first update', () => {
            controller = new OrbitController(camera, immediate);

            expect(controller.getDistance()).toBeCloseTo(SQRT8);
            expect(controller.getPolarAngle()).toBeCloseTo(Math.PI / 4);
            expect(controller.getAzimuthalAngle()).toBeCloseTo(0);
        });
    });

    describe('moving on a channel', () => {
        it('should rotate a full turn per viewport height', () => {
            build();

            input.move('primary', 0.25, 0);

            // a quarter turn from +Z round to -X
            expect(position().x).toBeCloseTo(-2);
            expect(position().y).toBeCloseTo(2);
            expect(position().z).toBeCloseTo(0);
        });

        it('should rotate up and down with the y axis', () => {
            build();

            input.move('primary', 0, 1 / 8);

            // phi goes from 45 degrees to zero, straight above the target
            expect(controller.getPolarAngle()).toBeCloseTo(0, 3);
        });

        it('should take radians at face value', () => {
            build();

            input.move('primary', Math.PI / 2, 0, 'radians');

            expect(position().x).toBeCloseTo(-2);
            expect(position().z).toBeCloseTo(0);
        });

        it('should scale a movement by the binding speed', () => {
            build({
                ...immediate,
                bindings: { primary: { action: 'rotate', speed: 2 } },
            });

            input.move('primary', 0.125, 0);

            expect(position().x).toBeCloseTo(-2);
        });

        it('should pan a perspective camera by the view height at the target', () => {
            build();
            const fov = (camera.camera as PerspectiveCamera).fov;

            input.move('secondary', 0.5, 0);

            const visible = 2 * SQRT8 * Math.tan(((fov / 2) * Math.PI) / 180);
            expect(controller.target.x).toBeCloseTo(-0.5 * visible);
        });

        it('should pan an orthographic camera by its frustum height', () => {
            const ortho = attach(new TestOrthographicCameraComponent());
            ortho.owner!.position.set(0, 0, 5);
            build(immediate, ortho);

            input.move('secondary', 0.5, 0);

            // half of a frustum two units high
            expect(controller.target.x).toBeCloseTo(-1);
        });

        it('should pan along the world plane when screenSpacePanning is off', () => {
            build({ ...immediate, screenSpacePanning: false });

            input.move('secondary', 0, 0.5);

            expect(controller.target.y).toBeCloseTo(0);
            expect(controller.target.z).not.toBeCloseTo(0);
        });

        it('should give up panning a camera it cannot measure', () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
            build(immediate, attach(new TestUnknownCameraComponent()));

            input.move('secondary', 0.5, 0);

            expect(warn).toHaveBeenCalled();
            expect(controller.enablePan).toBe(false);
        });

        it('should dolly in on a downward drag and out on an upward one', () => {
            build();

            input.move('tertiary', 0, 0.1);
            expect(controller.getDistance()).toBeCloseTo(SQRT8 * 0.95);

            input.move('tertiary', 0, -0.1);
            expect(controller.getDistance()).toBeCloseTo(SQRT8);
        });

        it('should not dolly without a vertical movement', () => {
            build();

            input.move('tertiary', 0.1, 0);

            expect(controller.getDistance()).toBeCloseTo(SQRT8);
        });

        it('should ignore a channel with no binding', () => {
            build();

            input.move('orientation', 0.25, 0);

            expect(position().z).toBeCloseTo(2);
        });

        it('should ease into a movement with damping on', () => {
            build({ enableDamping: true, dampingFactor: 0.5 });

            input.move('primary', 0.25, 0);
            const halfway = controller.getAzimuthalAngle();

            controller.update();

            expect(halfway).toBeCloseTo(-Math.PI / 4);
            expect(controller.getAzimuthalAngle()).toBeLessThan(halfway);
        });
    });

    describe('scaling', () => {
        it('should move closer for a factor above one', () => {
            build();

            input.scale(2);

            expect(controller.getDistance()).toBeCloseTo(SQRT8 / 2);
        });

        it('should raise the factor to the zoom speed', () => {
            build({ ...immediate, zoomSpeed: 2 });

            input.scale(2);

            expect(controller.getDistance()).toBeCloseTo(SQRT8 / 4);
        });

        it('should give up zooming a camera it cannot measure', () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
            build(immediate, attach(new TestUnknownCameraComponent()));

            input.scale(2);

            expect(warn).toHaveBeenCalled();
            expect(controller.enableZoom).toBe(false);
        });

        it('should give up dollying a camera it cannot measure', () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
            build(immediate, attach(new TestUnknownCameraComponent()));

            input.move('tertiary', 0, 0.1);

            expect(warn).toHaveBeenCalled();
            expect(controller.enableZoom).toBe(false);
        });
    });

    describe('what keeps input out', () => {
        it.each<[string, OrbitControllerSettings]>([
            ['disabled', { enabled: false }],
            ['input disabled', { inputEnabled: false }],
            ['rotate disabled', { enableRotate: false }],
        ])('should not rotate while %s', (_, settings) => {
            build({ ...immediate, ...settings });

            input.move('primary', 0.25, 0);
            controller.update();

            expect(position().z).toBeCloseTo(2);
        });

        it('should not pan while panning is disabled', () => {
            build({ ...immediate, enablePan: false });

            input.move('secondary', 0.5, 0);

            expect(controller.target.x).toBe(0);
        });

        it.each<[string, OrbitControllerSettings]>([
            ['disabled', { enabled: false }],
            ['input disabled', { inputEnabled: false }],
            ['zoom disabled', { enableZoom: false }],
        ])('should not zoom while %s', (_, settings) => {
            build({ ...immediate, ...settings });

            input.scale(2);
            input.move('tertiary', 0, 0.1);
            controller.update();

            expect(controller.getDistance()).toBeCloseTo(SQRT8);
        });

        it('should keep ticking while only input is disabled', () => {
            build({ ...immediate, autoRotate: true, inputEnabled: false });
            const before = position().clone();

            controller.tick();

            expect(position().distanceTo(before)).toBeGreaterThan(0);
        });

        it('should not tick while disabled', () => {
            build({ ...immediate, autoRotate: true, enabled: false });
            const before = position().clone();

            controller.tick();

            expect(position()).toEqual(before);
        });

        it('should drop pending movement when it is turned back on', () => {
            build({ enableDamping: true, dampingFactor: 0.05 });
            input.move('primary', 0.25, 0);
            input.scale(2);
            const before = position().clone();

            controller.enabled = false;
            controller.enabled = true;
            controller.update();

            expect(position().distanceTo(before)).toBeCloseTo(0);
        });

        it('should keep pending movement when enabled is set again', () => {
            build({ enableDamping: true, dampingFactor: 0.05 });
            input.move('primary', 0.25, 0);
            const before = position().clone();

            controller.enabled = true;
            controller.update();

            expect(position().distanceTo(before)).toBeGreaterThan(0);
        });
    });

    describe('connecting inputs', () => {
        it('should listen to an input only once', () => {
            build();
            controller.connect(input.asInput());

            input.move('primary', 0.125, 0);

            // one eighth of a turn, not two
            expect(controller.getAzimuthalAngle()).toBeCloseTo(-Math.PI / 4);
        });

        it('should stop listening once disconnected', () => {
            build();
            controller.disconnect(input.asInput());

            input.move('primary', 0.25, 0);
            input.scale(2);

            expect(position().z).toBeCloseTo(2);
            expect(controller.getDistance()).toBeCloseTo(SQRT8);
        });

        it('should ignore disconnecting an input it never had', () => {
            build();

            expect(() =>
                controller.disconnect(new FakeInput().asInput()),
            ).not.toThrow();
        });

        it('should take several inputs at once', () => {
            build();
            const other = new FakeInput();
            controller.connect(other.asInput());

            input.move('primary', 0.125, 0);
            other.move('primary', 0.125, 0);

            expect(position().x).toBeCloseTo(-2);
        });

        it('should disconnect everything on dispose', () => {
            build();
            const onDispose = vi.fn();
            controller.addEventListener('dispose', onDispose);

            controller.dispose();
            input.move('primary', 0.25, 0);

            expect(onDispose).toHaveBeenCalledTimes(1);
            expect(position().z).toBeCloseTo(2);
        });
    });

    describe('interaction', () => {
        let onStart: Mock;
        let onEnd: Mock;

        beforeEach(() => {
            build();
            onStart = vi.fn();
            onEnd = vi.fn();
            controller.addEventListener('start', onStart);
            controller.addEventListener('end', onEnd);
        });

        it('should start and end with a gesture', () => {
            input.start('primary');
            expect(controller.isInteracting()).toBe(true);
            expect(onStart).toHaveBeenCalledTimes(1);

            input.end('primary');
            expect(controller.isInteracting()).toBe(false);
            expect(onEnd).toHaveBeenCalledTimes(1);
        });

        it('should span gestures that overlap across inputs', () => {
            const other = new FakeInput();
            controller.connect(other.asInput());

            input.start('primary');
            other.start('secondary');
            input.end('primary');

            expect(onStart).toHaveBeenCalledTimes(1);
            expect(onEnd).not.toHaveBeenCalled();

            other.end('secondary');
            expect(onEnd).toHaveBeenCalledTimes(1);
        });

        it('should ignore the end of a gesture that never started', () => {
            input.end('primary');

            expect(onEnd).not.toHaveBeenCalled();
        });

        it('should end a gesture whose input is disconnected', () => {
            input.start('primary');

            controller.disconnect(input.asInput());

            expect(controller.isInteracting()).toBe(false);
            expect(onEnd).toHaveBeenCalledTimes(1);
        });

        it('should not end anything when an idle input is disconnected', () => {
            controller.disconnect(input.asInput());

            expect(onEnd).not.toHaveBeenCalled();
        });

        it('should pause auto rotation during a gesture', () => {
            controller.autoRotate = true;
            input.start('primary');
            const before = position().clone();

            controller.update();
            expect(position()).toEqual(before);

            input.end('primary');
            controller.update();
            expect(position().distanceTo(before)).toBeGreaterThan(0);
        });
    });

    describe('update', () => {
        it('should report a change only when the camera moved', () => {
            build();
            const onChange = vi.fn();
            controller.addEventListener('change', onChange);

            expect(controller.update()).toBe(false);

            position().set(0, 3, 3);
            expect(controller.update()).toBe(true);
            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it('should keep the distance within its limits', () => {
            build({ ...immediate, minDistance: 1, maxDistance: 2 });

            expect(controller.getDistance()).toBeCloseTo(2);

            input.scale(100);
            expect(controller.getDistance()).toBeCloseTo(1);
        });

        it('should keep the angles within their limits', () => {
            build({
                ...immediate,
                minAzimuthAngle: -0.1,
                maxAzimuthAngle: 0.1,
                minPolarAngle: 0.5,
                maxPolarAngle: 1,
            });

            input.move('primary', 0.25, 0.25);

            expect(controller.getAzimuthalAngle()).toBeCloseTo(-0.1);
            expect(controller.getPolarAngle()).toBeCloseTo(0.5);
        });

        it('should keep turning while auto rotation is on', () => {
            build({ ...immediate, autoRotate: true, autoRotateSpeed: 60 });
            const before = controller.getAzimuthalAngle();

            controller.update();

            // a full turn per second at sixty frames
            expect(controller.getAzimuthalAngle() - before).toBeCloseTo(
                (-2 * Math.PI) / 60,
            );
        });
    });

    describe('state', () => {
        it('should go back to the pose it saved', () => {
            build();
            position().set(1, 1, 1);
            controller.target.set(0, 1, 0);
            controller.saveState();

            input.move('primary', 0.25, 0);
            controller.reset();

            expect(position().x).toBeCloseTo(1);
            expect(position().y).toBeCloseTo(1);
            expect(position().z).toBeCloseTo(1);
            expect(controller.target).toEqual(new Vector3(0, 1, 0));
        });

        it('should hand out and take back its state', () => {
            build();
            const state = controller.getState();

            expect(state.distance).toBeCloseTo(SQRT8);
            expect(state.polarAngle).toBeCloseTo(Math.PI / 4);

            controller.setState({
                ...state,
                target: new Vector3(1, 0, 0),
                position: new Vector3(1, 0, 3),
                quaternion: new Quaternion(),
            });

            expect(controller.target).toEqual(new Vector3(1, 0, 0));
            expect(controller.getDistance()).toBeCloseTo(3);
        });

        it('should zoom in and out by the zoom factor', () => {
            build();

            controller.zoomIn();
            expect(controller.getDistance()).toBeCloseTo(SQRT8 * 0.95);

            controller.zoomOut();
            expect(controller.getDistance()).toBeCloseTo(SQRT8);

            controller.zoomIn(2);
            expect(controller.getDistance()).toBeCloseTo(SQRT8 * 0.95 ** 2);

            controller.zoomOut(2);
            expect(controller.getDistance()).toBeCloseTo(SQRT8);
        });
    });

    describe('framing', () => {
        it('should fit a sphere along the current view direction', () => {
            build();
            const sphere = new Sphere(new Vector3(1, 0, 0), 1);

            const view = controller.computeEncompassingView(sphere);
            const offset = new Vector3().copy(view.position).sub(sphere.center);

            expect(view.target).toEqual(sphere.center);
            expect(offset.clone().normalize().y).toBeCloseTo(Math.SQRT1_2);
            expect(offset.length()).toBeGreaterThan(1);
        });

        it('should step back further with padding', () => {
            build();
            const sphere = new Sphere(new Vector3(), 1);

            const tight = new Vector3().copy(
                controller.computeEncompassingView(sphere).position,
            );
            const padded = new Vector3().copy(
                controller.computeEncompassingView(sphere, 0.5).position,
            );

            expect(padded.length()).toBeCloseTo(tight.length() * 1.5);
        });

        it('should look along +Z when the camera sits on its target', () => {
            build();
            position().set(0, 0, 0);

            const view = controller.computeEncompassingView(
                new Sphere(new Vector3(), 1),
            );

            expect(view.position.x).toBe(0);
            expect(view.position.y).toBe(0);
            expect(view.position.z).toBeGreaterThan(0);
        });

        describe('focusObject', () => {
            /** What the bounding box built inside focusObject was asked to enclose. */
            const enclosed = () =>
                (
                    vi.mocked(BoundingBox).mock.results[0].value as {
                        enclose: Mock;
                    }
                ).enclose;

            it('should enclose the node it was handed', () => {
                build();
                // one node, because a node already is the handle for its whole
                // subtree -- framing several things means giving them a parent
                const node = new DIVENode();

                controller.focusObject(node);

                expect(BoundingBox).toHaveBeenCalledTimes(1);
                expect(enclosed()).toHaveBeenCalledWith(node);
            });

            it('should move camera and target onto the computed view', () => {
                build();
                const target = new Vector3(4, 5, 6);
                vi.spyOn(controller, 'computeEncompassingView').mockReturnValue(
                    { position: new Vector3(1, 2, 3), target },
                );

                controller.focusObject(new DIVENode());

                // update() rebuilds the position from spherical coordinates, so
                // it only lands on the computed one within tolerance
                expect(position().x).toBeCloseTo(1);
                expect(position().y).toBeCloseTo(2);
                expect(position().z).toBeCloseTo(3);
                expect(controller.target).toEqual(target);
            });

            it('should forward the padding and default it to zero', () => {
                build();
                const spy = vi.spyOn(controller, 'computeEncompassingView');

                controller.focusObject(new DIVENode(), 0.5);
                expect(spy).toHaveBeenLastCalledWith(expect.anything(), 0.5);

                controller.focusObject(new DIVENode());
                expect(spy).toHaveBeenLastCalledWith(expect.anything(), 0);
            });
        });
    });
});
