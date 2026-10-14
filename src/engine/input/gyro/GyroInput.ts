import { Euler, MathUtils, Quaternion, Vector2, Vector3 } from 'three/webgpu';
import { DIVEInput } from '../Input.ts';

type PermissionRequest = () => Promise<PermissionState | 'granted' | 'denied'>;

/** @experimental See {@link GyroInput}. */
export type GyroInputSettings = {
    /** How long `enable()` waits for a first reading, in milliseconds. */
    timeout?: number;

    /**
     * How quickly the reported tilt follows the sensor, per second. Higher is
     * snappier; `Infinity` passes readings through unfiltered.
     */
    smoothing?: number;

    /**
     * Play in radians: the reported tilt only moves once the sensor has moved
     * further than this from it, and then trails it by this much. Takes out
     * the jitter of a hand without the jumps of a threshold. `0` turns it off.
     */
    deadzone?: number;
};

const Z = new Vector3(0, 0, 1);

/** Turns the device frame into a screen frame looking out of the back. */
const MINUS_HALF_PI_X = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));

/**
 * The way the device is held, as an absolute `axis` on `orientation`.
 *
 * `value` is the tilt relative to a neutral pose, in radians, as if the screen
 * were a window: `x > 0` turned to the right, `y > 0` turned up. Turning the
 * device within the screen plane is ignored. The neutral pose is the one held
 * when {@link enable} receives its first reading, or at {@link recalibrate}.
 *
 * Browsers that guard the sensor -- iOS -- only grant it from inside a user
 * gesture, so call {@link GyroInput.requestPermission} straight from the click
 * handler, before anything else is awaited.
 *
 * @experimental How the tilt is measured and filtered is still being tuned on
 * devices; values, defaults and settings may change without a major release.
 */
export class GyroInput extends DIVEInput {
    public static get isSupported(): boolean {
        return (
            typeof window !== 'undefined' &&
            typeof window.DeviceOrientationEvent !== 'undefined'
        );
    }

    /**
     * Asks for the sensor where the browser requires it, and resolves whether it
     * may be used. Browsers that do not ask resolve `true`.
     */
    public static async requestPermission(): Promise<boolean> {
        if (!GyroInput.isSupported) return false;

        const request = (
            DeviceOrientationEvent as unknown as {
                requestPermission?: PermissionRequest;
            }
        ).requestPermission;
        if (!request) return true;

        return (await request.call(DeviceOrientationEvent)) === 'granted';
    }

    public timeout = 1000;
    public smoothing = 15;
    public deadzone = MathUtils.degToRad(1);

    private _state: 'off' | 'waiting' | 'on' = 'off';

    private _pending: {
        resolve: () => void;
        reject: (reason: Error) => void;
        timer: ReturnType<typeof setTimeout>;
    } | null = null;

    /** What a second `enable()` gets while the first still waits. */
    private _enabling: Promise<void> | null = null;

    private readonly _neutral = new Quaternion();
    private readonly _current = new Quaternion();
    private _needsCalibration = true;

    private readonly _euler = new Euler();
    private readonly _screen = new Quaternion();
    private readonly _relative = new Quaternion();
    private readonly _normal = new Vector3();

    /** The tilt after the low-pass, and after the play on top of it. */
    private readonly _filtered = new Vector2();
    private readonly _reported = new Vector2();
    private _lastTime = 0;

    constructor(settings?: GyroInputSettings) {
        super();

        Object.assign(this, settings);
    }

    public get enabled(): boolean {
        return this._state === 'on';
    }

    /**
     * Starts listening and settles with the first reading, which becomes the
     * neutral pose. Rejects when none arrives in time -- desktop browsers report
     * orientation events without values.
     */
    public enable(): Promise<void> {
        if (this._state === 'on') return Promise.resolve();
        if (this._enabling) return this._enabling;

        if (!GyroInput.isSupported) {
            return Promise.reject(
                new Error('GyroInput: this browser reports no orientation.'),
            );
        }

        this._state = 'waiting';
        this._needsCalibration = true;

        this._enabling = new Promise<void>((resolve, reject) => {
            const timer = setTimeout(() => {
                this._stop();
                this._settle(
                    new Error('GyroInput: the device reports no orientation.'),
                );
            }, this.timeout);

            this._pending = { resolve, reject, timer };
        });

        window.addEventListener('deviceorientation', this._onOrientation);
        screen.orientation?.addEventListener('change', this.recalibrate);

        return this._enabling;
    }

    /** Stops listening. A pending {@link enable} rejects. */
    public disable(): void {
        const wasOn = this._state === 'on';

        this._stop();
        this._settle(
            new Error('GyroInput: disabled before the first reading.'),
        );

        if (wasOn) {
            this.dispatchEvent({ type: 'end', channel: 'orientation' });
        }
    }

    /** Makes the next reading the neutral pose. */
    public recalibrate = (): void => {
        this._needsCalibration = true;
    };

    public dispose(): void {
        this.disable();
    }

    private _stop(): void {
        this._state = 'off';
        window.removeEventListener('deviceorientation', this._onOrientation);
        screen.orientation?.removeEventListener('change', this.recalibrate);
    }

    /** Resolves a pending `enable()`, or rejects it with `error`. */
    private _settle(error?: Error): void {
        const pending = this._pending;
        if (!pending) return;

        this._pending = null;
        this._enabling = null;
        clearTimeout(pending.timer);

        if (error) {
            pending.reject(error);
        } else {
            pending.resolve();
        }
    }

    private _onOrientation = (event: DeviceOrientationEvent): void => {
        const { alpha, beta, gamma } = event;
        if (alpha === null || beta === null || gamma === null) return;

        this._readOrientation(alpha, beta, gamma);

        const calibrating = this._needsCalibration;
        if (calibrating) {
            this._neutral.copy(this._current);
            this._needsCalibration = false;
        }

        this._filter(this._tilt(new Vector2()), event.timeStamp, calibrating);

        if (this._state === 'waiting') {
            this._state = 'on';
            this._settle();
            this.dispatchEvent({ type: 'start', channel: 'orientation' });
        }

        this.dispatchEvent({
            type: 'axis',
            channel: 'orientation',
            value: this._reported.clone(),
            unit: 'radians',
        });
    };

    /** The device orientation as a screen-aligned frame, into `_current`. */
    private _readOrientation(alpha: number, beta: number, gamma: number): void {
        const screenAngle = MathUtils.degToRad(screen.orientation?.angle ?? 0);

        this._euler.set(
            MathUtils.degToRad(beta),
            MathUtils.degToRad(alpha),
            -MathUtils.degToRad(gamma),
            'YXZ',
        );
        this._current
            .setFromEuler(this._euler)
            .multiply(MINUS_HALF_PI_X)
            .multiply(this._screen.setFromAxisAngle(Z, -screenAngle));
    }

    /**
     * Low-pass, then play, into `_reported`.
     *
     * The low-pass is timed by the events themselves, so a sensor that reports
     * at 60 Hz and one at 200 Hz feel the same. A calibration starts both over
     * at the reading, which is neutral by definition.
     */
    private _filter(tilt: Vector2, time: number, reset: boolean): void {
        if (reset) {
            this._filtered.copy(tilt);
            this._reported.copy(tilt);
        } else {
            const seconds = Math.max(0, time - this._lastTime) / 1000;
            const ease =
                this.smoothing === Infinity
                    ? 1
                    : 1 - Math.exp(-this.smoothing * seconds);

            this._filtered.lerp(tilt, ease);
            this._reported.set(
                this._trail(this._reported.x, this._filtered.x),
                this._trail(this._reported.y, this._filtered.y),
            );
        }

        this._lastTime = time;
    }

    /** Where `reported` ends up, when it may lag `filtered` by the deadzone. */
    private _trail(reported: number, filtered: number): number {
        return (
            filtered -
            MathUtils.clamp(filtered - reported, -this.deadzone, this.deadzone)
        );
    }

    /**
     * Where the screen faces now, seen from the neutral pose.
     *
     * Taken from the screen normal rather than from Euler angles: no wraparound
     * at 360 degrees, no gimbal lock at 90, and turning within the screen plane
     * leaves the normal where it is.
     *
     * `y` is the angle in the vertical plane, `x` how far the normal leaves that
     * plane. The other way round, a sideways wobble would grow with the tilt --
     * by `1 / cos(y)`, twice as much at 60 degrees -- and moving the device up
     * and down would turn the camera sideways.
     */
    private _tilt(target: Vector2): Vector2 {
        this._relative.copy(this._neutral).invert().multiply(this._current);
        const n = this._normal.copy(Z).applyQuaternion(this._relative);

        return target.set(
            Math.atan2(-n.x, Math.hypot(n.y, n.z)),
            Math.atan2(-n.y, n.z),
        );
    }
}
