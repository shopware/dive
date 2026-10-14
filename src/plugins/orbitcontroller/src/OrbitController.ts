import {
    EventDispatcher,
    MathUtils,
    Matrix4,
    OrthographicCamera,
    PerspectiveCamera,
    Quaternion,
    Sphere,
    Spherical,
    Vector3,
    Vector3Like,
} from 'three/webgpu';
import {
    BoundingBox,
    DIVENode,
    DIVETicker,
    type DIVECameraComponent,
    type DIVEInput,
    type DIVEInputChannel,
    type DIVEInputEventMap,
} from '@shopware-ag/dive';
import { OrbitControllerState } from '../types/index.ts';

/** What a movement on an input channel does to the camera. */
export type OrbitControllerAction = 'rotate' | 'pan' | 'dolly';

export type OrbitControllerBinding = {
    action: OrbitControllerAction;
    speed: number;
};

/** Which channel does what. A channel without a binding is ignored. */
export type OrbitControllerBindings = Partial<
    Record<DIVEInputChannel, OrbitControllerBinding>
>;

export type OrbitControllerSettings = {
    enableDamping?: boolean;
    dampingFactor?: number;
    enabled?: boolean;
    inputEnabled?: boolean;
    target?: Vector3;
    minDistance?: number;
    maxDistance?: number;
    minZoom?: number;
    maxZoom?: number;
    minPolarAngle?: number;
    maxPolarAngle?: number;
    minAzimuthAngle?: number;
    maxAzimuthAngle?: number;
    enableZoom?: boolean;
    zoomSpeed?: number;
    enableRotate?: boolean;
    enablePan?: boolean;
    screenSpacePanning?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    bindings?: OrbitControllerBindings;
};

export const OrbitControllerDefaultSettings: Required<OrbitControllerSettings> =
    {
        enableDamping: true,
        dampingFactor: 0.05,
        enabled: true,
        inputEnabled: true,
        target: new Vector3(),
        minDistance: 0,
        maxDistance: Infinity,
        minZoom: 0,
        maxZoom: Infinity,
        minPolarAngle: 0,
        maxPolarAngle: Math.PI,
        minAzimuthAngle: -Infinity,
        maxAzimuthAngle: Infinity,
        enableZoom: true,
        zoomSpeed: 1.0,
        enableRotate: true,
        enablePan: true,
        screenSpacePanning: true,
        autoRotate: false,
        autoRotateSpeed: 2.0,
        bindings: {
            primary: { action: 'rotate', speed: 1.0 },
            secondary: { action: 'pan', speed: 1.0 },
            tertiary: { action: 'dolly', speed: 1.0 },
        },
    };

type EventMap = {
    dispose: { type: 'dispose' };
    change: { type: 'change' };
    start: { type: 'start' };
    end: { type: 'end' };
};

/** What the controller keeps per connected input. */
type Connection = {
    /** The channels of this input that are active right now. */
    active: Set<DIVEInputChannel>;
    detach: () => void;
};

/**
 * Orbits the camera around a target, driven by input devices.
 *
 * Devices are connected with {@link connect} and report in the shared input
 * format; {@link bindings} decides what each channel does. The controller never
 * touches the DOM itself.
 */
export class OrbitController
    extends EventDispatcher<EventMap>
    implements DIVETicker
{
    public static readonly DEFAULT_ZOOM_FACTOR = 1;

    // public API
    /**
     * The camera component this controller drives.
     *
     * The component rather than the camera: `setCameraLayer` and `onResize` live
     * there, and handing out the bare camera meant every caller had to search its
     * way back. What orbiting moves is `object.owner`, the node it sits on.
     */
    public object: DIVECameraComponent;

    /**
     * The camera, narrowed to the two kinds whose projection this can pan.
     *
     * `DIVECameraComponent` types its camera as the base `Camera`, which has no
     * `zoom` or `fov`; the branches below narrow it further.
     */
    private get _camera(): PerspectiveCamera | OrthographicCamera {
        return this.object.camera as PerspectiveCamera | OrthographicCamera;
    }

    /**
     * Whether the controller moves the camera at all.
     *
     * Turning it back on drops whatever movement was still pending, so damping
     * from before does not carry over into a camera someone else has moved since.
     */
    public get enabled(): boolean {
        return this._enabled;
    }
    public set enabled(enabled: boolean) {
        if (enabled && !this._enabled) {
            this.sphericalDelta.set(0, 0, 0);
            this.panOffset.set(0, 0, 0);
            this.scale = 1;
        }

        this._enabled = enabled;
    }
    private _enabled = true;

    /**
     * Whether input moves the camera. Unlike {@link enabled}, the camera keeps
     * ticking -- damping runs out and auto-rotation goes on. For a tool that
     * needs the pointer for itself.
     */
    public inputEnabled = true;

    public target = new Vector3();

    public minDistance = 0;
    public maxDistance = Infinity;

    public minZoom = 0;
    public maxZoom = Infinity;

    public minPolarAngle = 0; // radians
    public maxPolarAngle = Math.PI; // radians

    public minAzimuthAngle = -Infinity; // radians
    public maxAzimuthAngle = Infinity; // radians

    public enableDamping = true;
    public dampingFactor = 0.05;

    public enableZoom = true;
    public zoomSpeed = 1.0;

    public enableRotate = true;

    public enablePan = true;
    public screenSpacePanning = true;

    public autoRotate = false;
    public autoRotateSpeed = 2.0;

    public bindings: OrbitControllerBindings = {
        ...OrbitControllerDefaultSettings.bindings,
    };

    public target0: Vector3;
    public position0: Vector3;
    public zoom0: number;
    public uuid: string = MathUtils.generateUUID();

    // internals
    private readonly EPS = 0.000001;

    private readonly spherical = new Spherical();
    private readonly sphericalDelta = new Spherical();

    private scale = 1;
    private readonly panOffset = new Vector3();
    private zoomChanged = false;

    private readonly connections = new Map<DIVEInput, Connection>();

    // for update speedup
    private readonly offset = new Vector3();
    private readonly quat: Quaternion;
    private readonly quatInverse: Quaternion;
    private readonly lastPosition = new Vector3();
    private readonly lastQuaternion = new Quaternion();
    private readonly lastTarget = new Vector3();

    constructor(
        cameraComponent: DIVECameraComponent,
        settings?: OrbitControllerSettings,
    ) {
        super();

        this.object = cameraComponent;

        // fail here rather than on the first frame
        if (!cameraComponent.isAttached) {
            throw new Error(
                'OrbitController: the camera component must be attached to a node, because that is what gets moved.',
            );
        }

        // apply settings
        const { bindings, ...rest } = settings ?? {};
        Object.assign(this, rest);
        if (bindings) this.bindings = { ...this.bindings, ...bindings };

        // for reset
        this.target0 = this.target.clone();
        this.position0 = this.object.owner.position.clone();
        this.zoom0 = this._camera.zoom;

        this.quat = new Quaternion().setFromUnitVectors(
            this.object.camera.up,
            new Vector3(0, 1, 0),
        );
        this.quatInverse = this.quat.clone().invert();

        // force an update at start
        this.update();
    }

    public tick(): void {
        if (!this.enabled) return;

        this.update();
    }

    /** Lets an input device move the camera. Connecting twice changes nothing. */
    public connect(input: DIVEInput): void {
        if (this.connections.has(input)) return;

        const active = new Set<DIVEInputChannel>();

        const onStart = ({ channel }: DIVEInputEventMap['start']): void => {
            const wasInteracting = this.isInteracting();
            active.add(channel);
            if (!wasInteracting) this.dispatchEvent({ type: 'start' });
        };
        const onEnd = ({ channel }: DIVEInputEventMap['end']): void => {
            if (!active.delete(channel)) return;
            if (!this.isInteracting()) this.dispatchEvent({ type: 'end' });
        };
        const onMove = (event: DIVEInputEventMap['move']): void =>
            this.onInputMove(event);
        const onScale = (event: DIVEInputEventMap['scale']): void =>
            this.onInputScale(event);

        input.addEventListener('start', onStart);
        input.addEventListener('end', onEnd);
        input.addEventListener('move', onMove);
        input.addEventListener('scale', onScale);

        this.connections.set(input, {
            active,
            detach: () => {
                input.removeEventListener('start', onStart);
                input.removeEventListener('end', onEnd);
                input.removeEventListener('move', onMove);
                input.removeEventListener('scale', onScale);
            },
        });
    }

    /** Stops listening to an input device. Its gesture in progress is dropped. */
    public disconnect(input: DIVEInput): void {
        const connection = this.connections.get(input);
        if (!connection) return;

        const wasInteracting = this.isInteracting();
        connection.detach();
        this.connections.delete(input);

        if (wasInteracting && !this.isInteracting()) {
            this.dispatchEvent({ type: 'end' });
        }
    }

    /** Whether any connected input has a gesture in progress. */
    public isInteracting(): boolean {
        for (const { active } of this.connections.values()) {
            if (active.size > 0) return true;
        }

        return false;
    }

    public getPolarAngle(): number {
        return this.spherical.phi;
    }

    public getAzimuthalAngle(): number {
        return this.spherical.theta;
    }

    public getDistance(): number {
        return this.object.owner.position.distanceTo(this.target);
    }

    public saveState(): void {
        this.target0.copy(this.target);
        this.position0.copy(this.object.owner.position);
        this.zoom0 = this._camera.zoom;
    }

    public reset(): void {
        this.target.copy(this.target0);
        this.object.owner.position.copy(this.position0);
        this._camera.zoom = this.zoom0;

        this._camera.updateProjectionMatrix();
        this.dispatchEvent({ type: 'change' });

        this.update();
    }

    public update(): boolean {
        this.offset.copy(this.object.owner.position).sub(this.target);
        this.offset.applyQuaternion(this.quat);
        this.spherical.setFromVector3(this.offset);

        if (this.autoRotate && !this.isInteracting()) {
            this.rotateLeft(this.getAutoRotationAngle());
        }

        if (this.enableDamping) {
            this.spherical.theta +=
                this.sphericalDelta.theta * this.dampingFactor;
            this.spherical.phi += this.sphericalDelta.phi * this.dampingFactor;
        } else {
            this.spherical.theta += this.sphericalDelta.theta;
            this.spherical.phi += this.sphericalDelta.phi;
        }

        this.spherical.theta = Math.max(
            this.minAzimuthAngle,
            Math.min(this.maxAzimuthAngle, this.spherical.theta),
        );
        this.spherical.phi = Math.max(
            this.minPolarAngle,
            Math.min(this.maxPolarAngle, this.spherical.phi),
        );
        this.spherical.makeSafe();

        this.spherical.radius *= this.scale;
        this.spherical.radius = Math.max(
            this.minDistance,
            Math.min(this.maxDistance, this.spherical.radius),
        );

        if (this.enableDamping === true) {
            this.target.addScaledVector(this.panOffset, this.dampingFactor);
        } else {
            this.target.add(this.panOffset);
        }

        this.offset.setFromSpherical(this.spherical);
        this.offset.applyQuaternion(this.quatInverse);

        this.object.owner.position.copy(this.target).add(this.offset);

        this.object.lookAt(this.target);

        if (this.enableDamping === true) {
            this.sphericalDelta.theta *= 1 - this.dampingFactor;
            this.sphericalDelta.phi *= 1 - this.dampingFactor;
            this.panOffset.multiplyScalar(1 - this.dampingFactor);
        } else {
            this.sphericalDelta.set(0, 0, 0);
            this.panOffset.set(0, 0, 0);
        }

        this.scale = 1;

        if (
            this.zoomChanged ||
            this.lastPosition.distanceToSquared(this.object.owner.position) >
                this.EPS ||
            8 * (1 - this.lastQuaternion.dot(this.object.owner.quaternion)) >
                this.EPS ||
            this.lastTarget.distanceToSquared(this.target) > this.EPS
        ) {
            this.dispatchEvent({ type: 'change' });
            this.lastPosition.copy(this.object.owner.position);
            this.lastQuaternion.copy(this.object.owner.quaternion);
            this.lastTarget.copy(this.target);
            this.zoomChanged = false;
            return true;
        }

        return false;
    }

    public dispose(): void {
        [...this.connections.keys()].forEach((input) => this.disconnect(input));
        this.dispatchEvent({ type: 'dispose' });
    }

    /**
     * Where to put the camera so a sphere fills the view.
     *
     * Takes a `Sphere` rather than a bounding box: framing needs a centre and a
     * radius, and nothing else. Build one with `new BoundingBox().enclose(...)`,
     * or read `sphere` off a `BoundingBoxComponent` that already measures a node.
     *
     * @param sphere - What to frame, in world space.
     * @param padding - Extra distance as a fraction of the fitted one.
     */
    public computeEncompassingView(
        sphere: Sphere,
        padding = 0.0,
    ): {
        position: Vector3Like;
        target: Vector3Like;
    } {
        const center = sphere.center;
        const radius = sphere.radius;

        const perspective = this._camera as PerspectiveCamera;
        const fov = perspective.fov * (Math.PI / 180);
        const aspect = perspective.aspect;
        const verticalTheta = fov / 2;
        const horizontalTheta = Math.atan(Math.tan(verticalTheta) * aspect);

        const distanceV = radius / Math.sin(verticalTheta);
        const distanceH = radius / Math.sin(horizontalTheta);
        const distance = Math.max(distanceV, distanceH) * (1.0 + padding);

        const currentDirection = this.object.owner.position
            .clone()
            .sub(this.target)
            .normalize();
        const direction =
            currentDirection.length() > 0.001
                ? currentDirection
                : new Vector3(0, 0, 1);
        const position = center.clone().add(direction.multiplyScalar(distance));

        return {
            position,
            target: center,
        };
    }

    /**
     * Puts the camera where the whole node fits in the view.
     *
     * One node, not a list: a node already is the handle for everything below it,
     * so anything worth framing together belongs under a common parent.
     *
     * @param node - What to frame.
     * @param padding - Extra distance as a fraction of the fitted one.
     */
    public focusObject(node: DIVENode, padding = 0.0): void {
        const transform = this.computeEncompassingView(
            new BoundingBox().enclose(node).sphere,
            padding,
        );

        this.object.owner.position.copy(transform.position as Vector3);
        this.target.copy(transform.target as Vector3);
        this.update();
    }

    public zoomIn(by?: number): void {
        this.dollyIn(Math.pow(0.95, by ?? OrbitController.DEFAULT_ZOOM_FACTOR));
        this.update();
    }

    public zoomOut(by?: number): void {
        this.dollyOut(
            Math.pow(0.95, by ?? OrbitController.DEFAULT_ZOOM_FACTOR),
        );
        this.update();
    }

    public getState(): OrbitControllerState {
        return {
            target: this.target.clone(),
            azimuthalAngle: this.getAzimuthalAngle(),
            polarAngle: this.getPolarAngle(),
            distance: this.getDistance(),
            position: this.object.owner.position.clone(),
            quaternion: this.object.owner.quaternion.clone(),
        };
    }

    public setState(state: OrbitControllerState): void {
        this.target.copy(state.target);
        this.object.owner.position.copy(state.position);
        this.object.owner.quaternion.copy(state.quaternion);
        this.update();
    }

    //
    // Private methods
    //

    private onInputMove({
        channel,
        delta,
        unit,
    }: DIVEInputEventMap['move']): void {
        if (!this.enabled || !this.inputEnabled) return;

        const binding = this.bindings[channel];
        if (!binding) return;

        /**
         * One viewport height is a full turn, the ratio rotation has always used,
         * so an angle converts to viewport units and back by 2π.
         */
        const turns = unit === 'radians' ? 1 / (2 * Math.PI) : 1;
        const x = delta.x * turns * binding.speed;
        const y = delta.y * turns * binding.speed;

        switch (binding.action) {
            case 'rotate':
                if (!this.enableRotate) return;
                this.rotateLeft(2 * Math.PI * x);
                this.rotateUp(2 * Math.PI * y);
                break;
            case 'pan':
                if (!this.enablePan) return;
                this.pan(x, y);
                break;
            case 'dolly':
                if (!this.enableZoom) return;
                if (y > 0) {
                    this.dollyIn(this.getZoomScale());
                } else if (y < 0) {
                    this.dollyOut(this.getZoomScale());
                }
                break;
        }

        this.update();
    }

    private onInputScale({ factor }: DIVEInputEventMap['scale']): void {
        if (!this.enabled || !this.inputEnabled || !this.enableZoom) return;

        this.dollyOut(Math.pow(factor, this.zoomSpeed));
        this.update();
    }

    private getAutoRotationAngle(): number {
        return ((2 * Math.PI) / 60 / 60) * this.autoRotateSpeed;
    }

    private getZoomScale(): number {
        return Math.pow(0.95, this.zoomSpeed);
    }

    private rotateLeft(angle: number): void {
        this.sphericalDelta.theta -= angle;
    }

    private rotateUp(angle: number): void {
        this.sphericalDelta.phi -= angle;
    }

    private panLeft = (() => {
        const v = new Vector3();

        return (distance: number, objectMatrix: Matrix4) => {
            v.setFromMatrixColumn(objectMatrix, 0);
            v.multiplyScalar(-distance);
            this.panOffset.add(v);
        };
    })();

    private panUp = (() => {
        const v = new Vector3();

        return (distance: number, objectMatrix: Matrix4) => {
            if (this.screenSpacePanning === true) {
                v.setFromMatrixColumn(objectMatrix, 1);
            } else {
                v.setFromMatrixColumn(objectMatrix, 0);
                v.crossVectors(this.object.camera.up, v);
            }
            v.multiplyScalar(distance);
            this.panOffset.add(v);
        };
    })();

    /**
     * Pans by a distance in viewport units: fractions of the view's height.
     *
     * The orthographic branch measures both axes by the frustum's height, which
     * equals measuring x by its width as long as the frustum has the viewport's
     * aspect.
     */
    private pan(deltaX: number, deltaY: number): void {
        const offset = new Vector3();

        if ('isPerspectiveCamera' in this._camera) {
            const position = this.object.owner.position;
            offset.copy(position).sub(this.target);
            let targetDistance = offset.length();
            targetDistance *= Math.tan(
                ((this._camera.fov / 2) * Math.PI) / 180.0,
            );
            this.panLeft(2 * deltaX * targetDistance, this.object.owner.matrix);
            this.panUp(2 * deltaY * targetDistance, this.object.owner.matrix);
        } else if ('isOrthographicCamera' in this._camera) {
            const height =
                (this._camera.top - this._camera.bottom) / this._camera.zoom;
            this.panLeft(deltaX * height, this.object.owner.matrix);
            this.panUp(deltaY * height, this.object.owner.matrix);
        } else {
            console.warn(
                'WARNING: OrbitController encountered an unknown camera type - pan disabled.',
            );
            this.enablePan = false;
        }
    }

    private dollyIn(dollyScale: number): void {
        if (
            'isPerspectiveCamera' in this._camera ||
            'isOrthographicCamera' in this._camera
        ) {
            this.scale *= dollyScale;
        } else {
            console.warn(
                'WARNING: OrbitController encountered an unknown camera type - dolly/zoom disabled.',
            );
            this.enableZoom = false;
        }
    }

    private dollyOut(dollyScale: number): void {
        if (
            'isPerspectiveCamera' in this._camera ||
            'isOrthographicCamera' in this._camera
        ) {
            this.scale /= dollyScale;
        } else {
            console.warn(
                'WARNING: OrbitController encountered an unknown camera type - dolly/zoom disabled.',
            );
            this.enableZoom = false;
        }
    }
}
