import { Quaternion, Vector2 } from "three";
import { DIVEEventExecutor } from "../../../events/EventExecutor";
import { DIVERenderer } from "../../../renderer/Renderer";

type DIVETouchscreenEvents = {
    'TOUCH_START': {
        index: number,
        current: Vector2,
        touchCount: number,
    },
    'TOUCH_MOVE': {
        index: number,
        current: Vector2,
        delta: Vector2,
        touchCount: number,
    },
    'TOUCH_END': {
        index: number,
        current: Vector2,
        touchCount: number,
    },
    'ROTATE_START': {
        current: number,
    },
    'ROTATE_MOVE': {
        current: number,
        delta: number,
    },
    'ROTATE_END': {
        current: number,
    },
    'PINCH_START': {
        current: number,
    },
    'PINCH_MOVE': {
        current: number,
        delta: number,
    },
    'PINCH_END': {
        current: number,
    },
}

type DIVETouch = {
    start: Vector2;
    current: Vector2;
    delta: Vector2;
}

export class DIVEWebXRTouchscreenControls extends DIVEEventExecutor<DIVETouchscreenEvents> {
    // general members
    private _renderer: DIVERenderer;

    // touch members
    private _touchCount: number;
    private _touches: DIVETouch[] = [];

    // rotate members
    private startAngle = 0;
    private lastAngle = 0;
    protected bufferQuaternion: Quaternion = new Quaternion();

    // scale members
    protected _scaleThreshold: number = 0.05;
    protected _scaleDistanceStart: number;
    protected _scaleDistance: number;
    protected _scaleFactor: number;
    protected _scaleFactorStart: number;


    constructor(renderer: DIVERenderer) {
        super();

        this._renderer = renderer;

        this._touches = [
            { start: new Vector2(), current: new Vector2(), delta: new Vector2() },
            { start: new Vector2(), current: new Vector2(), delta: new Vector2() },
        ];

        this._touchCount = 0;
        this._scaleDistanceStart = 0;
        this._scaleDistance = 0;
        this._scaleFactorStart = 1;
        this._scaleFactor = 1;

        window.addEventListener('touchstart', (e: TouchEvent) => this.onTouchStart(e));
        window.addEventListener('touchmove', (e: TouchEvent) => this.onTouchMove(e));
        window.addEventListener('touchend', (e: TouchEvent) => this.onTouchEnd(e));
    }

    public Dispose(): void {
        window.removeEventListener('touchstart', (e: TouchEvent) => this.onTouchStart(e));
        window.removeEventListener('touchmove', (e: TouchEvent) => this.onTouchMove(e));
        window.removeEventListener('touchend', (e: TouchEvent) => this.onTouchEnd(e));
    }

    private onTouchStart(event: TouchEvent): void {
        this._touches[0].start.set(event.touches[0].clientX, event.touches[0].clientY);

        this._touchCount = event.touches.length;
        // this.startRaycastPosition = null;
        // this.startObjectPosition.set(0, 0, 0);

        this.dispatch('TOUCH_START', {
            index: this._touchCount - 1,
            current: this._touches[this._touchCount - 1].start.clone(),
            touchCount: event.touches.length,
        });

        if (event.touches.length === 2) {
            this._touches[1].start.set(event.touches[1].clientX, event.touches[1].clientY);

            this.handleRotateStart();
            this.handlePinchStart();
        }
    }

    private onTouchMove(event: TouchEvent): void {
        this._touches[0].current.set(event.touches[0].clientX, event.touches[0].clientY);
        this._touches[0].delta.copy(this._touches[0].current.clone().sub(this._touches[0].start));

        if (event.touches.length === 2) {
            this._touches[1].current.set(event.touches[1].clientX, event.touches[1].clientY);
            this._touches[1].delta.copy(this._touches[1].current.clone().sub(this._touches[1].start));

            this.handleRotateMoved();
            this.handlePinchMoved();
        }

        this.dispatch('TOUCH_MOVE', {
            index: this._touchCount - 1,
            current: this._touches[this._touchCount - 1].current.clone(),
            delta: this._touches[this._touchCount - 1].delta.clone(),
            touchCount: event.touches.length,
        });
    }

    private onTouchEnd(event: TouchEvent): void {
        this._touchCount = event.touches.length;
        if (this._touchCount > 0) {
            this.handleRotateEnded();
            this.handlePinchEnded();
        }

        this.dispatch('TOUCH_END', {
            index: this._touchCount,
            current: this._touches[this._touchCount].current.clone(),
            touchCount: event.touches.length,
        });
    }

    // rotation handler
    private handleRotateStart(): void {
        this.startAngle = this._touches[1].start.clone().sub(this._touches[0].start).angle(); //+ this.lastAngle;

        this.dispatch('ROTATE_START', {
            current: 0,
        });
    }

    private handleRotateMoved(): void {
        const angleDelta = this._touches[1].current.clone().sub(this._touches[0].current).angle() - this.startAngle;
        // this.quaternion.copy(this.bufferQuaternion.setFromAxisAngle(this.worldDown, angleDelta * 3));
        this.lastAngle = angleDelta * -1;

        this.dispatch('ROTATE_MOVE', {
            current: this.lastAngle,
            delta: angleDelta,
        });
    }

    private handleRotateEnded(): void {
        this.dispatch('ROTATE_END', {
            current: this.lastAngle,
        });
    }

    // pinch handler
    private handlePinchStart(): void {
        this._scaleDistanceStart = this._touches[1].start.distanceTo(this._touches[0].start);
        this._scaleFactorStart = this._scaleFactor;

        this.dispatch('PINCH_START', {
            current: 0,
        });
    }

    private handlePinchMoved(): void {
        const beforeDistance = this._scaleDistance;
        this._scaleDistance = this._touches[1].current.distanceTo(this._touches[0].current);
        // this._scaleFactor = this._scaleFactorStart * (distance / this._scaleDistanceStart);
        // if (this._scaleFactor <= 1 + this._scaleThreshold && this._scaleFactor >= 1 - this._scaleThreshold) {
        //     this.scale.set(1.0, 1.0, 1.0);
        // } else {
        //     this.scale.set(this._scaleFactor, this._scaleFactor, this._scaleFactor);
        // }

        this.dispatch('PINCH_MOVE', {
            current: this._scaleDistance - this._scaleDistanceStart,
            delta: this._scaleDistance - beforeDistance,
        });
    }

    private handlePinchEnded(): void {
        this.dispatch('PINCH_END', {
            current: this._scaleDistance - this._scaleDistanceStart,
        });
    }
}