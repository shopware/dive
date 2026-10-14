import {
    EventDispatcher,
    MathUtils,
    Quaternion,
    Spherical,
    Vector2,
    Vector3,
    type Vector3Like,
} from 'three/webgpu';
import {
    type DIVECameraComponent,
    type DIVEInput,
    type DIVEInputEventMap,
    type DIVETicker,
} from '@shopware-ag/dive';

/**
 * A camera pose: where it stands and what it looks at.
 *
 * @experimental See {@link TiltController}.
 */
export type TiltControllerPose = {
    position: Vector3Like;
    target: Vector3Like;
};

/** @experimental See {@link TiltController}. */
export type TiltControllerSettings = {
    enabled?: boolean;

    /** Tilt in radians that turns the camera all the way, per axis. */
    maxTilt?: { x: number; y: number };

    /** How far up or down a full forward or backward tilt looks, in radians. */
    maxPolarOffset?: number;

    /** How quickly the camera follows the tilt, per second. Higher is snappier. */
    smoothing?: number;
};

/** @experimental See {@link TiltController}. */
export const TiltControllerDefaultSettings: Required<TiltControllerSettings> = {
    enabled: true,
    maxTilt: { x: MathUtils.degToRad(30), y: MathUtils.degToRad(20) },
    maxPolarOffset: MathUtils.degToRad(45),
    smoothing: 5,
};

type EventMap = {
    change: { type: 'change' };
    dispose: { type: 'dispose' };
};

const EPS = 0.000001;

/**
 * Turns the camera around its home pose by how a device is tilted.
 *
 * Absolute, not integrated, with limits that move along: within the limits an
 * `axis` value maps to one camera pose. Past a limit the camera stays at the
 * stop and the limit follows the device, so turning back moves the camera at
 * once instead of first winding off the excess -- the front then lies that much
 * further over. A limit only follows a movement mainly along its own axis, so
 * the sideways wobble of moving the device up and down is held at the stop
 * rather than kept. A sideways tilt of {@link maxTilt}`.x` turns the camera
 * half way round -- to the middle of the back, from either side. Tilting
 * forward or backward moves the polar angle by up to {@link maxPolarOffset}.
 *
 * Nothing moves before {@link setHome} has been called.
 *
 * @experimental The mapping is still being tuned on devices; behaviour,
 * defaults and settings may change without a major release.
 */
export class TiltController
    extends EventDispatcher<EventMap>
    implements DIVETicker
{
    public readonly uuid: string = MathUtils.generateUUID();

    /** The camera component this controller drives; it moves `object.owner`. */
    public readonly object: DIVECameraComponent;

    public maxTilt = { ...TiltControllerDefaultSettings.maxTilt };
    public maxPolarOffset = TiltControllerDefaultSettings.maxPolarOffset;
    public smoothing = TiltControllerDefaultSettings.smoothing;

    /**
     * Whether the controller moves the camera. Turning it on starts from wherever
     * the camera is, and eases into the pose the tilt asks for.
     */
    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(enabled: boolean) {
        if (enabled && !this._enabled) {
            this._seeded = false;
            this._resetTilt();
        }
        this._enabled = enabled;
    }
    private _enabled = true;

    private _home: {
        target: Vector3;
        spherical: Spherical;
    } | null = null;

    /** The latest tilt, measured from where the limits have moved to. */
    private readonly _tilt = new Vector2();

    /** How far the limits have been dragged along past their start. */
    private readonly _slack = new Vector2();

    /**
     * The previous report, to tell which axis a movement is along. Neutral
     * before the first one, which is where a calibrated device starts.
     */
    private readonly _last = new Vector2();

    /**
     * Where the camera is on its way to the goal, as fractions of the full turn
     * (`x`: of half a turn, `y`: of {@link maxPolarOffset}), plus distance and
     * target. Eased in fraction space rather than angle space, so there is no
     * shortest-way-round to get wrong at the back.
     */
    private readonly _fraction = new Vector2();
    private _radius = 0;
    private readonly _target = new Vector3();
    private _seeded = false;

    private readonly _connections = new Map<DIVEInput, () => void>();

    private readonly _quat: Quaternion;
    private readonly _quatInverse: Quaternion;
    private readonly _offset = new Vector3();
    private readonly _spherical = new Spherical();

    constructor(
        cameraComponent: DIVECameraComponent,
        settings?: TiltControllerSettings,
    ) {
        super();

        this.object = cameraComponent;

        // fail here rather than on the first frame
        if (!cameraComponent.isAttached) {
            throw new Error(
                'TiltController: the camera component must be attached to a node, because that is what gets moved.',
            );
        }

        Object.assign(this, settings);

        // the same up convention as the OrbitController, so the angles agree
        this._quat = new Quaternion().setFromUnitVectors(
            this.object.camera.up,
            new Vector3(0, 1, 0),
        );
        this._quatInverse = this._quat.clone().invert();
    }

    /** The pose an untilted device shows -- the front. */
    public setHome(pose: TiltControllerPose): void {
        const target = new Vector3().copy(pose.target);
        const spherical = new Spherical().setFromVector3(
            this._offset
                .copy(pose.position)
                .sub(target)
                .applyQuaternion(this._quat),
        );

        this._home = { target, spherical };
        this._seeded = false;
        this._resetTilt();
    }

    /** Listens to an input's `axis` on `orientation`. Connecting twice changes nothing. */
    public connect(input: DIVEInput): void {
        if (this._connections.has(input)) return;

        const onAxis = ({
            channel,
            value,
        }: DIVEInputEventMap['axis']): void => {
            if (channel === 'orientation') this._follow(value);
        };

        input.addEventListener('axis', onAxis);
        this._connections.set(input, () =>
            input.removeEventListener('axis', onAxis),
        );
    }

    public disconnect(input: DIVEInput): void {
        this._connections.get(input)?.();
        this._connections.delete(input);
    }

    public dispose(): void {
        this._connections.forEach((detach) => detach());
        this._connections.clear();
        this.dispatchEvent({ type: 'dispose' });
    }

    public tick(deltaTime: number): void {
        if (!this._enabled || !this._home) return;

        if (!this._seeded) {
            this._seed();
            this._seeded = true;
        }

        const home = this._home;
        const ease = 1 - Math.exp(-this.smoothing * deltaTime);

        this._fraction.x +=
            (MathUtils.clamp(this._tilt.x / this.maxTilt.x, -1, 1) -
                this._fraction.x) *
            ease;
        this._fraction.y +=
            (MathUtils.clamp(this._tilt.y / this.maxTilt.y, -1, 1) -
                this._fraction.y) *
            ease;
        this._radius += (home.spherical.radius - this._radius) * ease;
        this._target.lerp(home.target, ease);

        this._spherical.set(
            this._radius,
            MathUtils.clamp(
                home.spherical.phi + this._fraction.y * this.maxPolarOffset,
                EPS,
                Math.PI - EPS,
            ),
            home.spherical.theta + this._fraction.x * Math.PI,
        );

        const position = this.object.owner.position;
        const previous = this._offset.copy(position);

        position
            .setFromSpherical(this._spherical)
            .applyQuaternion(this._quatInverse)
            .add(this._target);
        this.object.lookAt(this._target);

        if (previous.distanceToSquared(position) > EPS) {
            this.dispatchEvent({ type: 'change' });
        }
    }

    /**
     * Takes a reported tilt, dragging a limit along by whatever goes past it --
     * but only the limit of the axis the device mainly moved along. Past the
     * other one the tilt is just held at the stop, so a wobble that comes back
     * leaves nothing behind.
     */
    private _follow(value: Vector2): void {
        const dx = Math.abs(value.x - this._last.x);
        const dy = Math.abs(value.y - this._last.y);
        this._last.copy(value);

        const x = value.x - this._slack.x;
        const y = value.y - this._slack.y;

        this._tilt.set(
            MathUtils.clamp(x, -this.maxTilt.x, this.maxTilt.x),
            MathUtils.clamp(y, -this.maxTilt.y, this.maxTilt.y),
        );

        if (dx > dy) this._slack.x += x - this._tilt.x;
        if (dy > dx) this._slack.y += y - this._tilt.y;
    }

    /** Back to limits around the neutral pose, as after a fresh calibration. */
    private _resetTilt(): void {
        this._tilt.set(0, 0);
        this._slack.set(0, 0);
        this._last.set(0, 0);
    }

    /**
     * Takes the camera's current pose as the starting point of the easing.
     *
     * The target is taken to lie straight ahead, as far away as home's target is,
     * which is exact for a camera that came from orbiting around it.
     */
    private _seed(): void {
        const home = this._home!;
        const owner = this.object.owner;
        const distance = owner.position.distanceTo(home.target);

        this._target
            .set(0, 0, -1)
            .applyQuaternion(owner.quaternion)
            .multiplyScalar(distance)
            .add(owner.position);

        const current = new Spherical().setFromVector3(
            this._offset
                .copy(owner.position)
                .sub(this._target)
                .applyQuaternion(this._quat),
        );

        // the azimuth wraps, so take the nearer way to it
        const azimuth = MathUtils.euclideanModulo(
            current.theta - home.spherical.theta + Math.PI,
            2 * Math.PI,
        );

        this._fraction.set(
            (azimuth - Math.PI) / Math.PI,
            this.maxPolarOffset > 0
                ? (current.phi - home.spherical.phi) / this.maxPolarOffset
                : 0,
        );
        this._radius = current.radius;
    }
}
