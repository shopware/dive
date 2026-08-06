import {
    EventDispatcher,
    MathUtils,
    Matrix4,
    MOUSE,
    Object3D,
    OrthographicCamera,
    PerspectiveCamera,
    Quaternion,
    Spherical,
    TOUCH,
    Vector2,
    Vector3,
    Vector3Like,
} from 'three/webgpu';
import {
    DIVEPerspectiveCamera,
    DIVETicker,
    BoundingBox,
} from '@shopware-ag/dive';
import { OrbitControllerState } from '../types/index.ts';

export type OrbitControllerSettings = {
    enableDamping?: boolean;
    dampingFactor?: number;
    enabled?: boolean;
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
    rotateSpeed?: number;
    enablePan?: boolean;
    panSpeed?: number;
    screenSpacePanning?: boolean;
    keyPanSpeed?: number;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    keys?: { LEFT: string; UP: string; RIGHT: string; BOTTOM: string };
    mouseButtons?: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };
    touches?: { ONE: TOUCH; TWO: TOUCH };
};

export const OrbitControllerDefaultSettings: Required<OrbitControllerSettings> =
    {
        enableDamping: true,
        dampingFactor: 0.05,
        enabled: true,
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
        rotateSpeed: 1.0,
        enablePan: true,
        panSpeed: 1.0,
        screenSpacePanning: true,
        keyPanSpeed: 7.0,
        autoRotate: false,
        autoRotateSpeed: 2.0,
        keys: {
            LEFT: 'ArrowLeft',
            UP: 'ArrowUp',
            RIGHT: 'ArrowRight',
            BOTTOM: 'ArrowDown',
        },
        mouseButtons: {
            LEFT: MOUSE.ROTATE,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.PAN,
        },
        touches: {
            ONE: TOUCH.ROTATE,
            TWO: TOUCH.DOLLY_PAN,
        },
    };

type EventMap = {
    dispose: { type: 'dispose' };
    change: { type: 'change' };
    start: { type: 'start' };
    end: { type: 'end' };
};

enum STATE {
    NONE = -1,
    ROTATE = 0,
    DOLLY = 1,
    PAN = 2,
    TOUCH_ROTATE = 3,
    TOUCH_PAN = 4,
    TOUCH_DOLLY_PAN = 5,
    TOUCH_DOLLY_ROTATE = 6,
}

export class OrbitController
    extends EventDispatcher<EventMap>
    implements DIVETicker
{
    public static readonly DEFAULT_ZOOM_FACTOR = 1;

    // public API
    public object: DIVEPerspectiveCamera | OrthographicCamera;
    public get domElement(): HTMLCanvasElement {
        return this.domElements[0];
    }
    public domElements: HTMLCanvasElement[];

    public enabled = true;

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
    public rotateSpeed = 1.0;

    public enablePan = true;
    public panSpeed = 1.0;
    public screenSpacePanning = true;
    public keyPanSpeed = 7.0;

    public autoRotate = false;
    public autoRotateSpeed = 2.0;

    public keys = {
        LEFT: 'ArrowLeft',
        UP: 'ArrowUp',
        RIGHT: 'ArrowRight',
        BOTTOM: 'ArrowDown',
    };
    public mouseButtons = {
        LEFT: MOUSE.ROTATE,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.PAN,
    };
    public touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };

    public target0: Vector3;
    public position0: Vector3;
    public zoom0: number;
    public uuid: string = MathUtils.generateUUID();

    // private state
    private state: STATE = STATE.NONE;

    private readonly EPS = 0.000001;

    private readonly spherical = new Spherical();
    private readonly sphericalDelta = new Spherical();

    private scale = 1;
    private readonly panOffset = new Vector3();
    private zoomChanged = false;

    private readonly rotateStart = new Vector2();
    private readonly rotateEnd = new Vector2();
    private readonly rotateDelta = new Vector2();

    private readonly panStart = new Vector2();
    private readonly panEnd = new Vector2();
    private readonly panDelta = new Vector2();

    private readonly dollyStart = new Vector2();
    private readonly dollyEnd = new Vector2();
    private readonly dollyDelta = new Vector2();

    private readonly pointers: PointerEvent[] = [];
    private readonly pointerPositions: Record<number, Vector2> = {};

    // for update() function
    private readonly offset = new Vector3();
    private readonly quat: Quaternion;
    private readonly quatInverse: Quaternion;
    private readonly lastPosition = new Vector3();
    private readonly lastQuaternion = new Quaternion();
    private readonly lastTarget = new Vector3();

    constructor(
        camera: DIVEPerspectiveCamera | OrthographicCamera,
        domElements: HTMLCanvasElement | HTMLCanvasElement[],
        settings?: OrbitControllerSettings,
    ) {
        super();

        this.object = camera;
        this.domElements = Array.isArray(domElements)
            ? domElements
            : [domElements];

        // apply settings
        Object.assign(this, settings);

        // for reset
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;

        this.quat = new Quaternion().setFromUnitVectors(
            camera.up,
            new Vector3(0, 1, 0),
        );
        this.quatInverse = this.quat.clone().invert();

        this.domElements.forEach((element) => this.addEventListeners(element));

        // force an update at start
        this.update();
    }

    public tick(): void {
        if (!this.enabled) return;

        this.update();
    }

    public getPolarAngle(): number {
        return this.spherical.phi;
    }

    public getAzimuthalAngle(): number {
        return this.spherical.theta;
    }

    public getDistance(): number {
        return this.object.position.distanceTo(this.target);
    }

    public saveState(): void {
        this.target0.copy(this.target);
        this.position0.copy(this.object.position);
        this.zoom0 = this.object.zoom;
    }

    public reset(): void {
        this.target.copy(this.target0);
        this.object.position.copy(this.position0);
        this.object.zoom = this.zoom0;

        this.object.updateProjectionMatrix();
        this.dispatchEvent({ type: 'change' });

        this.update();

        this.state = STATE.NONE;
    }

    public update(): boolean {
        this.offset.copy(this.object.position).sub(this.target);
        this.offset.applyQuaternion(this.quat);
        this.spherical.setFromVector3(this.offset);

        if (this.autoRotate && this.state === STATE.NONE) {
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

        this.object.position.copy(this.target).add(this.offset);

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
            this.lastPosition.distanceToSquared(this.object.position) >
                this.EPS ||
            8 * (1 - this.lastQuaternion.dot(this.object.quaternion)) >
                this.EPS ||
            this.lastTarget.distanceToSquared(this.target) > this.EPS
        ) {
            this.dispatchEvent({ type: 'change' });
            this.lastPosition.copy(this.object.position);
            this.lastQuaternion.copy(this.object.quaternion);
            this.lastTarget.copy(this.target);
            this.zoomChanged = false;
            return true;
        }

        return false;
    }

    public dispose(): void {
        this.domElements.forEach((element) =>
            this.removeEventListeners(element),
        );
        this.dispatchEvent({ type: 'dispose' });
    }

    public addDomElements(...domElements: HTMLCanvasElement[]): void {
        domElements.forEach((domElement) => {
            if (this.domElements.includes(domElement)) return;
            this.domElements.push(domElement);
            this.addEventListeners(domElement);
        });
    }

    public removeDomElements(...domElements: HTMLCanvasElement[]): void {
        domElements.forEach((domElement) => {
            const index = this.domElements.indexOf(domElement);
            if (index > -1) {
                this.removeEventListeners(domElement);
                this.domElements.splice(index, 1);
            }
        });
    }

    public setDomElements(...domElements: HTMLCanvasElement[]): void {
        this.removeDomElements(...this.domElements);
        this.domElements = [];
        this.addDomElements(...domElements);
    }

    public computeEncompassingView(
        bb: BoundingBox,
        padding = 0.0,
    ): {
        position: Vector3Like;
        target: Vector3Like;
    } {
        const center = bb.center;
        const sphere = bb.sphere;
        const radius = sphere.radius;

        const fov = (this.object as PerspectiveCamera).fov * (Math.PI / 180);
        const aspect = (this.object as PerspectiveCamera).aspect;
        const verticalTheta = fov / 2;
        const horizontalTheta = Math.atan(Math.tan(verticalTheta) * aspect);

        const distanceV = radius / Math.sin(verticalTheta);
        const distanceH = radius / Math.sin(horizontalTheta);
        const distance = Math.max(distanceV, distanceH) * (1.0 + padding);

        const currentDirection = this.object.position
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

    public focusObject(objects: Object3D | Object3D[], padding = 0.0): void {
        const bb = new BoundingBox(objects);
        const transform = this.computeEncompassingView(bb, padding);

        this.object.position.copy(transform.position as Vector3);
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
            position: this.object.position.clone(),
            quaternion: this.object.quaternion.clone(),
        };
    }

    public setState(state: OrbitControllerState): void {
        this.target.copy(state.target);
        this.object.position.copy(state.position);
        this.object.quaternion.copy(state.quaternion);
        this.update();
    }

    //
    // Private methods
    //

    private addEventListeners(element: HTMLCanvasElement): void {
        element.style.touchAction = 'none';
        element.addEventListener('contextmenu', this.onContextMenu);
        element.addEventListener('pointerdown', this.onPointerDown);
        element.addEventListener('pointercancel', this.onPointerCancel);
        element.addEventListener('wheel', this.onMouseWheel, {
            passive: false,
        });
        element.addEventListener('keydown', this.onKeyDown);
    }

    private removeEventListeners(element: HTMLCanvasElement): void {
        element.removeEventListener('contextmenu', this.onContextMenu);
        element.removeEventListener('pointerdown', this.onPointerDown);
        element.removeEventListener('pointercancel', this.onPointerCancel);
        element.removeEventListener('wheel', this.onMouseWheel);
        element.removeEventListener('keydown', this.onKeyDown);
        element.removeEventListener('pointermove', this.onPointerMove);
        element.removeEventListener('pointerup', this.onPointerUp);
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
                v.crossVectors(this.object.up, v);
            }
            v.multiplyScalar(distance);
            this.panOffset.add(v);
        };
    })();

    private pan(
        deltaX: number,
        deltaY: number,
        element: HTMLCanvasElement,
    ): void {
        const offset = new Vector3();

        if ('isPerspectiveCamera' in this.object) {
            const position = this.object.position;
            offset.copy(position).sub(this.target);
            let targetDistance = offset.length();
            targetDistance *= Math.tan(
                ((this.object.fov / 2) * Math.PI) / 180.0,
            );
            this.panLeft(
                (2 * deltaX * targetDistance) / element.clientHeight,
                this.object.matrix,
            );
            this.panUp(
                (2 * deltaY * targetDistance) / element.clientHeight,
                this.object.matrix,
            );
        } else if ('isOrthographicCamera' in this.object) {
            this.panLeft(
                (deltaX * (this.object.right - this.object.left)) /
                    this.object.zoom /
                    element.clientWidth,
                this.object.matrix,
            );
            this.panUp(
                (deltaY * (this.object.top - this.object.bottom)) /
                    this.object.zoom /
                    element.clientHeight,
                this.object.matrix,
            );
        } else {
            console.warn(
                'WARNING: OrbitController encountered an unknown camera type - pan disabled.',
            );
            this.enablePan = false;
        }
    }

    private dollyIn(dollyScale: number): void {
        if (
            'isPerspectiveCamera' in this.object ||
            'isOrthographicCamera' in this.object
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
            'isPerspectiveCamera' in this.object ||
            'isOrthographicCamera' in this.object
        ) {
            this.scale /= dollyScale;
        } else {
            console.warn(
                'WARNING: OrbitController encountered an unknown camera type - dolly/zoom disabled.',
            );
            this.enableZoom = false;
        }
    }

    // event callbacks
    private handleMouseDownRotate(event: MouseEvent): void {
        this.rotateStart.set(event.clientX, event.clientY);
    }

    private handleMouseDownDolly(event: MouseEvent): void {
        this.dollyStart.set(event.clientX, event.clientY);
    }

    private handleMouseDownPan(event: MouseEvent): void {
        this.panStart.set(event.clientX, event.clientY);
    }

    private handleMouseMoveRotate(event: MouseEvent): void {
        this.rotateEnd.set(event.clientX, event.clientY);
        this.rotateDelta
            .subVectors(this.rotateEnd, this.rotateStart)
            .multiplyScalar(this.rotateSpeed);

        const element = event.currentTarget as HTMLCanvasElement;
        this.rotateLeft(
            (2 * Math.PI * this.rotateDelta.x) / element.clientHeight,
        );
        this.rotateUp(
            (2 * Math.PI * this.rotateDelta.y) / element.clientHeight,
        );
        this.rotateStart.copy(this.rotateEnd);
        this.update();
    }

    private handleMouseMoveDolly(event: MouseEvent): void {
        this.dollyEnd.set(event.clientX, event.clientY);
        this.dollyDelta.subVectors(this.dollyEnd, this.dollyStart);

        if (this.dollyDelta.y > 0) {
            this.dollyIn(this.getZoomScale());
        } else if (this.dollyDelta.y < 0) {
            this.dollyOut(this.getZoomScale());
        }

        this.dollyStart.copy(this.dollyEnd);
        this.update();
    }

    private handleMouseMovePan(event: MouseEvent): void {
        const element = event.currentTarget as HTMLCanvasElement;

        this.panEnd.set(event.clientX, event.clientY);
        this.panDelta
            .subVectors(this.panEnd, this.panStart)
            .multiplyScalar(this.panSpeed);
        this.pan(this.panDelta.x, this.panDelta.y, element);
        this.panStart.copy(this.panEnd);
        this.update();
    }

    private handleMouseWheel(event: WheelEvent): void {
        if (event.deltaY < 0) {
            this.dollyIn(this.getZoomScale());
        } else if (event.deltaY > 0) {
            this.dollyOut(this.getZoomScale());
        }
        this.update();
    }

    private handleKeyDown(event: KeyboardEvent): void {
        let needsUpdate = false;
        const element = event.currentTarget as HTMLCanvasElement;

        switch (event.code) {
            case this.keys.UP:
                this.pan(0, this.keyPanSpeed, element);
                needsUpdate = true;
                break;
            case this.keys.BOTTOM:
                this.pan(0, -this.keyPanSpeed, element);
                needsUpdate = true;
                break;
            case this.keys.LEFT:
                this.pan(this.keyPanSpeed, 0, element);
                needsUpdate = true;
                break;
            case this.keys.RIGHT:
                this.pan(-this.keyPanSpeed, 0, element);
                needsUpdate = true;
                break;
        }

        if (needsUpdate) {
            event.preventDefault();
            this.update();
        }
    }

    private handleTouchStartRotate(event: PointerEvent): void {
        if (this.pointers.length === 1) {
            this.rotateStart.set(event.pageX, event.pageY);
        } else {
            const otherPointer = this.getSecondPointer(event);
            const x = 0.5 * (event.pageX + otherPointer.pageX);
            const y = 0.5 * (event.pageY + otherPointer.pageY);
            this.rotateStart.set(x, y);
        }
    }

    private handleTouchStartPan(event: PointerEvent): void {
        if (this.pointers.length === 1) {
            this.panStart.set(event.pageX, event.pageY);
        } else {
            const otherPointer = this.getSecondPointer(event);
            const x = 0.5 * (event.pageX + otherPointer.pageX);
            const y = 0.5 * (event.pageY + otherPointer.pageY);
            this.panStart.set(x, y);
        }
    }

    private handleTouchStartDolly(event: PointerEvent): void {
        const otherPointer = this.getSecondPointer(event);
        const dx = event.pageX - otherPointer.pageX;
        const dy = event.pageY - otherPointer.pageY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        this.dollyStart.set(0, distance);
    }

    private handleTouchStartDollyPan(event: PointerEvent): void {
        if (this.enableZoom) this.handleTouchStartDolly(event);
        if (this.enablePan) this.handleTouchStartPan(event);
    }

    private handleTouchStartDollyRotate(event: PointerEvent): void {
        if (this.enableZoom) this.handleTouchStartDolly(event);
        if (this.enableRotate) this.handleTouchStartRotate(event);
    }

    private handleTouchMoveRotate(event: PointerEvent): void {
        if (this.pointers.length === 1) {
            this.rotateEnd.set(event.pageX, event.pageY);
        } else {
            const otherPointer = this.getSecondPointer(event);
            const x = 0.5 * (event.pageX + otherPointer.pageX);
            const y = 0.5 * (event.pageY + otherPointer.pageY);
            this.rotateEnd.set(x, y);
        }
        const element = event.currentTarget as HTMLCanvasElement;

        this.rotateDelta
            .subVectors(this.rotateEnd, this.rotateStart)
            .multiplyScalar(this.rotateSpeed);
        this.rotateLeft(
            (2 * Math.PI * this.rotateDelta.x) / element.clientHeight,
        );
        this.rotateUp(
            (2 * Math.PI * this.rotateDelta.y) / element.clientHeight,
        );
        this.rotateStart.copy(this.rotateEnd);
    }

    private handleTouchMovePan(event: PointerEvent): void {
        if (this.pointers.length === 1) {
            this.panEnd.set(event.pageX, event.pageY);
        } else {
            const otherPointer = this.getSecondPointer(event);
            const x = 0.5 * (event.pageX + otherPointer.pageX);
            const y = 0.5 * (event.pageY + otherPointer.pageY);
            this.panEnd.set(x, y);
        }

        const element = event.currentTarget as HTMLCanvasElement;

        this.panDelta
            .subVectors(this.panEnd, this.panStart)
            .multiplyScalar(this.panSpeed);
        this.pan(this.panDelta.x, this.panDelta.y, element);
        this.panStart.copy(this.panEnd);
    }

    private handleTouchMoveDolly(event: PointerEvent): void {
        const otherPointer = this.getSecondPointer(event);
        const dx = event.pageX - otherPointer.pageX;
        const dy = event.pageY - otherPointer.pageY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        this.dollyEnd.set(0, distance);
        this.dollyDelta.set(
            0,
            Math.pow(this.dollyEnd.y / this.dollyStart.y, this.zoomSpeed),
        );
        this.dollyOut(this.dollyDelta.y);
        this.dollyStart.copy(this.dollyEnd);
    }

    private handleTouchMoveDollyPan(event: PointerEvent): void {
        if (this.enableZoom) this.handleTouchMoveDolly(event);
        if (this.enablePan) this.handleTouchMovePan(event);
    }

    private handleTouchMoveDollyRotate(event: PointerEvent): void {
        if (this.enableZoom) this.handleTouchMoveDolly(event);
        if (this.enableRotate) this.handleTouchMoveRotate(event);
    }

    private onMouseDown = (event: MouseEvent): void => {
        let mouseAction: MOUSE | number;

        switch (event.button) {
            case 0:
                mouseAction = this.mouseButtons.LEFT;
                break;
            case 1:
                mouseAction = this.mouseButtons.MIDDLE;
                break;
            case 2:
                mouseAction = this.mouseButtons.RIGHT;
                break;
            default:
                mouseAction = -1;
        }

        switch (mouseAction) {
            case MOUSE.DOLLY:
                if (this.enableZoom === false) return;
                this.handleMouseDownDolly(event);
                this.state = STATE.DOLLY;
                break;
            case MOUSE.ROTATE:
                if (event.ctrlKey || event.metaKey || event.shiftKey) {
                    if (this.enablePan === false) return;
                    this.handleMouseDownPan(event);
                    this.state = STATE.PAN;
                } else {
                    if (this.enableRotate === false) return;
                    this.handleMouseDownRotate(event);
                    this.state = STATE.ROTATE;
                }
                break;
            case MOUSE.PAN:
                if (event.ctrlKey || event.metaKey || event.shiftKey) {
                    if (this.enableRotate === false) return;
                    this.handleMouseDownRotate(event);
                    this.state = STATE.ROTATE;
                } else {
                    if (this.enablePan === false) return;
                    this.handleMouseDownPan(event);
                    this.state = STATE.PAN;
                }
                break;
            default:
                this.state = STATE.NONE;
        }

        if (this.state !== STATE.NONE) {
            this.dispatchEvent({ type: 'start' });
        }
    };

    private onMouseMove = (event: MouseEvent): void => {
        if (this.enabled === false) return;

        switch (this.state) {
            case STATE.ROTATE:
                if (this.enableRotate === false) return;
                this.handleMouseMoveRotate(event);
                break;
            case STATE.DOLLY:
                if (this.enableZoom === false) return;
                this.handleMouseMoveDolly(event);
                break;
            case STATE.PAN:
                if (this.enablePan === false) return;
                this.handleMouseMovePan(event);
                break;
        }
    };

    private onMouseWheel = (event: WheelEvent): void => {
        if (
            this.enabled === false ||
            this.enableZoom === false ||
            this.state !== STATE.NONE
        )
            return;

        event.preventDefault();

        this.dispatchEvent({ type: 'start' });
        this.handleMouseWheel(event);
        this.dispatchEvent({ type: 'end' });
    };

    private onKeyDown = (event: KeyboardEvent): void => {
        if (this.enabled === false || this.enablePan === false) return;

        this.handleKeyDown(event);
    };

    private onTouchStart = (event: PointerEvent): void => {
        this.trackPointer(event);

        switch (this.pointers.length) {
            case 1:
                switch (this.touches.ONE) {
                    case TOUCH.ROTATE:
                        if (this.enableRotate === false) return;
                        this.handleTouchStartRotate(event);
                        this.state = STATE.TOUCH_ROTATE;
                        break;
                    case TOUCH.PAN:
                        if (this.enablePan === false) return;
                        this.handleTouchStartPan(event);
                        this.state = STATE.TOUCH_PAN;
                        break;
                    default:
                        this.state = STATE.NONE;
                }
                break;
            case 2:
                switch (this.touches.TWO) {
                    case TOUCH.DOLLY_PAN:
                        if (
                            this.enableZoom === false &&
                            this.enablePan === false
                        )
                            return;
                        this.handleTouchStartDollyPan(event);
                        this.state = STATE.TOUCH_DOLLY_PAN;
                        break;
                    case TOUCH.DOLLY_ROTATE:
                        if (
                            this.enableZoom === false &&
                            this.enableRotate === false
                        )
                            return;
                        this.handleTouchStartDollyRotate(event);
                        this.state = STATE.TOUCH_DOLLY_ROTATE;
                        break;
                    default:
                        this.state = STATE.NONE;
                }
                break;
            default:
                this.state = STATE.NONE;
        }

        if (this.state !== STATE.NONE) {
            this.dispatchEvent({ type: 'start' });
        }
    };

    private onTouchMove = (event: PointerEvent): void => {
        this.trackPointer(event);

        switch (this.state) {
            case STATE.TOUCH_ROTATE:
                if (this.enableRotate === false) return;
                this.handleTouchMoveRotate(event);
                this.update();
                break;
            case STATE.TOUCH_PAN:
                if (this.enablePan === false) return;
                this.handleTouchMovePan(event);
                this.update();
                break;
            case STATE.TOUCH_DOLLY_PAN:
                if (this.enableZoom === false && this.enablePan === false)
                    return;
                this.handleTouchMoveDollyPan(event);
                this.update();
                break;
            case STATE.TOUCH_DOLLY_ROTATE:
                if (this.enableZoom === false && this.enableRotate === false)
                    return;
                this.handleTouchMoveDollyRotate(event);
                this.update();
                break;
            default:
                this.state = STATE.NONE;
        }
    };

    private onPointerDown = (event: PointerEvent): void => {
        if (this.enabled === false) return;

        if (this.pointers.length === 0) {
            const element = event.currentTarget as HTMLCanvasElement;
            element.setPointerCapture(event.pointerId);
            element.addEventListener('pointermove', this.onPointerMove);
            element.addEventListener('pointerup', this.onPointerUp);
        }

        if (this.isTrackingPointer(event)) return;

        this.addPointer(event);
        if (event.pointerType === 'touch') {
            this.onTouchStart(event);
        } else {
            this.onMouseDown(event);
        }
    };

    private onPointerMove = (event: PointerEvent): void => {
        if (this.enabled === false) return;
        if (event.pointerType === 'touch') {
            this.onTouchMove(event);
        } else {
            this.onMouseMove(event);
        }
    };

    private onPointerUp = (event: PointerEvent): void => {
        this.removePointer(event);

        if (this.pointers.length === 0) {
            const element = event.currentTarget as HTMLCanvasElement;
            element.releasePointerCapture(event.pointerId);
            element.removeEventListener('pointermove', this.onPointerMove);
            element.removeEventListener('pointerup', this.onPointerUp);
            this.dispatchEvent({ type: 'end' });
            this.state = STATE.NONE;
        }
    };

    private onPointerCancel = (event: PointerEvent): void => {
        this.removePointer(event);
    };

    private onContextMenu = (event: MouseEvent): void => {
        if (this.enabled === false) return;
        event.preventDefault();
    };

    private addPointer(event: PointerEvent): void {
        this.pointers.push(event);
    }

    private removePointer(event: PointerEvent): void {
        delete this.pointerPositions[event.pointerId];

        for (let i = 0; i < this.pointers.length; i++) {
            if (this.pointers[i].pointerId == event.pointerId) {
                this.pointers.splice(i, 1);
                return;
            }
        }
    }

    private trackPointer(event: PointerEvent): void {
        let position = this.pointerPositions[event.pointerId];

        if (position === undefined) {
            position = new Vector2();
            this.pointerPositions[event.pointerId] = position;
        }

        position.set(event.pageX, event.pageY);
    }

    private getSecondPointer(event: PointerEvent): PointerEvent {
        return this.pointers[0].pointerId === event.pointerId
            ? this.pointers[1]
            : this.pointers[0];
    }

    private isTrackingPointer(event: PointerEvent): boolean {
        return this.pointers.some(
            (pointer) => pointer.pointerId === event.pointerId,
        );
    }
}
