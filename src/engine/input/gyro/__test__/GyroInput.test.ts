import { MathUtils, Vector2 } from 'three/webgpu';
import { GyroInput } from '../GyroInput.ts';

/** jsdom knows no orientation events, so this stands in for the browser's. */
class FakeDeviceOrientationEvent extends Event {}

type Reading = {
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
};

/**
 * Reports a device orientation, in degrees as the browser does, at a time in
 * milliseconds -- the low-pass is timed by the events.
 */
function orient({ alpha, beta, gamma }: Reading, timeStamp = 0): void {
    const event = new Event('deviceorientation');
    Object.assign(event, { alpha, beta, gamma });
    Object.defineProperty(event, 'timeStamp', { value: timeStamp });
    window.dispatchEvent(event);
}

/** Held upright, screen facing the user. */
const upright: Reading = { alpha: 0, beta: 90, gamma: 0 };

const screenOrientation = Object.assign(new EventTarget(), { angle: 0 });

describe('plugins/input/GyroInput', () => {
    let input: GyroInput;
    let axes: Vector2[];
    let events: string[];

    /** The last reported tilt, in degrees. */
    const lastTilt = (): { x: number; y: number } => {
        const value = axes.at(-1)!;

        return {
            x: MathUtils.radToDeg(value.x),
            y: MathUtils.radToDeg(value.y),
        };
    };

    beforeEach(() => {
        vi.stubGlobal('DeviceOrientationEvent', FakeDeviceOrientationEvent);
        screenOrientation.angle = 0;
        Object.defineProperty(screen, 'orientation', {
            value: screenOrientation,
            configurable: true,
        });

        // unfiltered, so the geometry can be read off directly
        input = new GyroInput({ smoothing: Infinity, deadzone: 0 });
        axes = [];
        events = [];
        input.addEventListener('axis', ({ channel, value, unit }) => {
            expect(channel).toBe('orientation');
            expect(unit).toBe('radians');
            axes.push(value);
        });
        input.addEventListener('start', ({ channel }) =>
            events.push(`start ${channel}`),
        );
        input.addEventListener('end', ({ channel }) =>
            events.push(`end ${channel}`),
        );
    });

    afterEach(() => {
        input.dispose();
        vi.unstubAllGlobals();
        vi.useRealTimers();
    });

    describe('isSupported', () => {
        it('should be supported where the browser has orientation events', () => {
            expect(GyroInput.isSupported).toBe(true);
        });

        it('should not be supported without them', () => {
            vi.stubGlobal('DeviceOrientationEvent', undefined);

            expect(GyroInput.isSupported).toBe(false);
        });
    });

    describe('requestPermission', () => {
        it('should refuse where there is no sensor to ask for', async () => {
            vi.stubGlobal('DeviceOrientationEvent', undefined);

            await expect(GyroInput.requestPermission()).resolves.toBe(false);
        });

        it('should grant where the browser does not ask', async () => {
            await expect(GyroInput.requestPermission()).resolves.toBe(true);
        });

        it.each([
            ['granted', true],
            ['denied', false],
        ])(
            'should resolve %s as %s where the browser asks',
            async (answer, granted) => {
                const requestPermission = vi.fn(async () => answer);
                vi.stubGlobal(
                    'DeviceOrientationEvent',
                    Object.assign(class extends Event {}, {
                        requestPermission,
                    }),
                );

                await expect(GyroInput.requestPermission()).resolves.toBe(
                    granted,
                );
                expect(requestPermission).toHaveBeenCalledTimes(1);
            },
        );
    });

    describe('enable', () => {
        it('should settle with the first reading and start the channel', async () => {
            const enabled = input.enable();
            expect(input.enabled).toBe(false);

            orient(upright);
            await enabled;

            expect(input.enabled).toBe(true);
            expect(events).toEqual(['start orientation']);
        });

        it('should wait past readings without values', async () => {
            const enabled = input.enable();

            orient({ alpha: null, beta: null, gamma: null });
            expect(input.enabled).toBe(false);

            orient(upright);
            await expect(enabled).resolves.toBeUndefined();
        });

        it('should give up when the device reports nothing in time', async () => {
            vi.useFakeTimers();
            input.timeout = 500;
            const enabled = input.enable();

            vi.advanceTimersByTime(500);

            await expect(enabled).rejects.toThrow('reports no orientation');
            expect(input.enabled).toBe(false);

            // and it stopped listening
            orient(upright);
            expect(axes).toEqual([]);
        });

        it('should take its timeout from the settings', () => {
            expect(new GyroInput({ timeout: 250 }).timeout).toBe(250);
        });

        it('should hand a second caller the same wait', () => {
            const first = input.enable();
            // left waiting, so the teardown rejects it
            first.catch(() => {});

            expect(input.enable()).toBe(first);
        });

        it('should resolve at once when it is already on', async () => {
            const enabled = input.enable();
            orient(upright);
            await enabled;

            await expect(input.enable()).resolves.toBeUndefined();
            expect(events).toEqual(['start orientation']);
        });

        it('should reject where the browser has no orientation events', async () => {
            vi.stubGlobal('DeviceOrientationEvent', undefined);

            await expect(input.enable()).rejects.toThrow(
                'reports no orientation',
            );
        });

        it('should work where the browser has no screen orientation', async () => {
            Object.defineProperty(screen, 'orientation', {
                value: undefined,
                configurable: true,
            });

            const enabled = input.enable();
            orient(upright);
            await enabled;
            orient({ ...upright, gamma: 20 });

            expect(lastTilt().x).toBeCloseTo(-20);
            input.disable();
        });
    });

    describe('disable', () => {
        it('should end the channel and stop reporting', async () => {
            const enabled = input.enable();
            orient(upright);
            await enabled;

            input.disable();
            orient({ ...upright, gamma: 20 });

            expect(events).toEqual(['start orientation', 'end orientation']);
            expect(axes).toHaveLength(1);
            expect(input.enabled).toBe(false);
        });

        it('should reject an enable still waiting', async () => {
            const enabled = input.enable();

            input.disable();

            await expect(enabled).rejects.toThrow('disabled before');
            expect(events).toEqual([]);
        });

        it('should end nothing when it was never on', () => {
            input.disable();

            expect(events).toEqual([]);
        });
    });

    describe('tilt', () => {
        beforeEach(async () => {
            const enabled = input.enable();
            orient(upright);
            await enabled;
        });

        it('should report the pose it started in as neutral', () => {
            expect(lastTilt().x).toBeCloseTo(0);
            expect(lastTilt().y).toBeCloseTo(0);
        });

        it('should report turning the device to the left on x', () => {
            orient({ ...upright, gamma: 20 });

            expect(lastTilt().x).toBeCloseTo(-20);
            expect(lastTilt().y).toBeCloseTo(0);
        });

        it('should report tilting the top towards the user on y', () => {
            // the back of the device then looks up
            orient({ ...upright, beta: 110 });

            expect(lastTilt().x).toBeCloseTo(0);
            expect(lastTilt().y).toBeCloseTo(20);
        });

        it('should not let a sideways wobble grow with the tilt', () => {
            // tilted far back, the wrist turns a little about the vertical
            orient({ alpha: 5, beta: 160, gamma: 0 });

            // a third of the turn, where the old split reported all five degrees
            expect(Math.abs(lastTilt().x)).toBeLessThan(2);
            expect(lastTilt().y).toBeCloseTo(70, 0);
        });

        it('should report tilting up and down without a sideways share', () => {
            orient({ ...upright, beta: 150 });

            expect(lastTilt().x).toBeCloseTo(0);
            expect(lastTilt().y).toBeCloseTo(60);
        });

        it('should measure from wherever the device was held at first', () => {
            input.disable();
            const enabled = input.enable();
            orient({ alpha: 0, beta: 50, gamma: 0 });
            void enabled;

            orient({ alpha: 0, beta: 60, gamma: 0 });

            expect(lastTilt().y).toBeCloseTo(10);
        });

        it('should ignore turning the device within the screen plane', () => {
            // held flat on its back, a turn about the vertical axis spins the
            // screen in place
            input.recalibrate();
            orient({ alpha: 0, beta: 0, gamma: 0 });
            orient({ alpha: 45, beta: 0, gamma: 0 });

            expect(lastTilt().x).toBeCloseTo(0);
            expect(lastTilt().y).toBeCloseTo(0);
        });

        it('should keep counting past the half turn without jumping', () => {
            orient({ ...upright, gamma: 80 });
            const near = lastTilt().x;

            expect(near).toBeCloseTo(-80);
        });

        it('should make the next reading neutral on recalibrate', () => {
            orient({ ...upright, gamma: 20 });

            input.recalibrate();
            orient({ ...upright, gamma: 20 });

            expect(lastTilt().x).toBeCloseTo(0);
        });

        it('should recalibrate when the screen turns', () => {
            orient({ ...upright, gamma: 20 });

            screenOrientation.angle = 90;
            screenOrientation.dispatchEvent(new Event('change'));
            orient({ ...upright, gamma: 20 });

            expect(lastTilt().x).toBeCloseTo(0);
            expect(lastTilt().y).toBeCloseTo(0);
        });

        it('should follow the screen in landscape', () => {
            // held sideways, turned a quarter to the left: the device's x axis
            // is the one pointing up
            input.disable();
            screenOrientation.angle = 90;
            const landscape: Reading = { alpha: 0, beta: 0, gamma: -90 };
            const enabled = input.enable();
            orient(landscape);
            void enabled;

            orient({ ...landscape, gamma: -70 });

            expect(lastTilt().x).toBeCloseTo(0, 0);
            expect(Math.abs(lastTilt().y)).toBeCloseTo(20, 0);
        });
    });

    describe('filtering', () => {
        const DZ = 1;

        beforeEach(async () => {
            input.smoothing = 10;
            input.deadzone = MathUtils.degToRad(DZ);
            const enabled = input.enable();
            orient(upright, 1000);
            await enabled;
        });

        it('should start from the neutral pose without easing into it', () => {
            expect(lastTilt().x).toBeCloseTo(0);
            expect(lastTilt().y).toBeCloseTo(0);
        });

        it('should follow the sensor at its smoothing rate', () => {
            orient({ ...upright, gamma: 20 }, 1100);

            // 1 - e^-1 of the way, less the play
            const eased = -20 * (1 - Math.exp(-1));
            expect(lastTilt().x).toBeCloseTo(eased + DZ);
        });

        it('should arrive where the sensor stays', () => {
            orient({ ...upright, gamma: 20 }, 1100);
            orient({ ...upright, gamma: 20 }, 3000);

            expect(lastTilt().x).toBeCloseTo(-20 + DZ, 2);
        });

        it('should not move for jitter within the play', () => {
            input.smoothing = Infinity;

            orient({ ...upright, gamma: 0.6 }, 1100);
            orient({ ...upright, gamma: -0.6 }, 1200);

            expect(lastTilt().x).toBeCloseTo(0);
        });

        it('should trail a movement by the play and hold on the way back', () => {
            input.smoothing = Infinity;

            orient({ ...upright, gamma: 5 }, 1100);
            expect(lastTilt().x).toBeCloseTo(-4);

            orient({ ...upright, gamma: 4.5 }, 1200);
            expect(lastTilt().x).toBeCloseTo(-4);

            orient({ ...upright, gamma: 2 }, 1300);
            expect(lastTilt().x).toBeCloseTo(-3);
        });

        it('should take nothing from a reading at the same moment', () => {
            orient({ ...upright, gamma: 20 }, 1000);

            expect(lastTilt().x).toBeCloseTo(0);
        });

        it('should start over at a recalibration', () => {
            orient({ ...upright, gamma: 20 }, 1100);

            input.recalibrate();
            orient({ ...upright, gamma: 20 }, 1200);

            expect(lastTilt().x).toBeCloseTo(0);
        });

        it('should take its filtering from the settings', () => {
            const tuned = new GyroInput({ smoothing: 3, deadzone: 0.1 });

            expect(tuned.smoothing).toBe(3);
            expect(tuned.deadzone).toBe(0.1);
        });
    });
});
