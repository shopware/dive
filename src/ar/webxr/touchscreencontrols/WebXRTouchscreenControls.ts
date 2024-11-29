import { Vector2 } from "three";
import { DIVEEventExecutor } from "../../../events/EventExecutor";

export type DIVETouchscreenEvents = {
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
    private _session: XRSession;

    // touch members
    private _touchCount: number = 0;
    private _touches: DIVETouch[] = [];

    // rotate members
    private _handleRotateStarted: boolean = false;
    private _handleRotateMoved: boolean = false;
    private _handleRotateEnded: boolean = false;

    private _startAngle: number = 0;
    private _lastAngle: number = 0;
    private _angleDelta: number = 0;


    // scale members
    private _handlePinchStarted: boolean = false;
    private _handlePinchMoved: boolean = false;
    private _handlePinchEnded: boolean = false;

    private _scaleDistanceStart: number = 0;
    private _currentScale: number = 0;
    private _deltaScale: number = 0;

    constructor(session: XRSession) {
        super();

        this._session = session;

        this._touches = [
            { start: new Vector2(), current: new Vector2(), delta: new Vector2() },
            { start: new Vector2(), current: new Vector2(), delta: new Vector2() },
        ];

        this._handleRotateStarted = false;

        window.addEventListener('touchstart', (e: TouchEvent) => this.onTouchStart(e));
        window.addEventListener('touchmove', (e: TouchEvent) => this.onTouchMove(e));
        window.addEventListener('touchend', (e: TouchEvent) => this.onTouchEnd(e));

        this._session.addEventListener('selectstart', () => this.onSessionSelectStart());
        this._session.addEventListener('selectend', () => this.onSessionSelectEnd());
    }

    public Dispose(): void {
        window.removeEventListener('touchstart', (e: TouchEvent) => this.onTouchStart(e));
        window.removeEventListener('touchmove', (e: TouchEvent) => this.onTouchMove(e));
        window.removeEventListener('touchend', (e: TouchEvent) => this.onTouchEnd(e));

        this._session.removeEventListener('selectstart', () => this.onSessionSelectStart());
        this._session.removeEventListener('selectend', () => this.onSessionSelectEnd());
    }

    private onTouchStart(event: TouchEvent): void {
        this._touches[0].start.set(event.touches[0].clientX, event.touches[0].clientY);

        this._touchCount = event.touches.length;
        // this.startRaycastPosition = null;
        // this.startObjectPosition.set(0, 0, 0);

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
            index: this._touchCount,
            current: this._touches[this._touchCount].current.clone(),
            delta: this._touches[this._touchCount].delta.clone(),
            touchCount: this._touchCount,
        });

        if (this._handleRotateMoved) {
            this.dispatch('ROTATE_MOVE', {
                current: this._lastAngle,
                delta: this._angleDelta,
            });
        }

        if (this._handlePinchMoved) {
            this.dispatch('PINCH_MOVE', {
                current: this._currentScale - this._scaleDistanceStart,
                delta: this._deltaScale,
            });
        }
    }

    private onTouchEnd(event: TouchEvent): void {
        this._touchCount = event.touches.length;
        if (this._touchCount > 0) {
            this.handleRotateEnded();
            this.handlePinchEnded();
        }
    }

    private onSessionSelectStart(): void {
        this.dispatch('TOUCH_START', {
            index: this._touchCount,
            current: this._touches[this._touchCount].start.clone(),
            touchCount: this._touchCount,
        });

        if (this._handleRotateStarted) {
            this.dispatch('ROTATE_START', {
                current: 0,
            });
        }

        if (this._handlePinchStarted) {
            this.dispatch('PINCH_START', {
                current: 0,
            });
        }
    }

    private onSessionSelectEnd(): void {
        this.dispatch('TOUCH_END', {
            index: this._touchCount,
            current: this._touches[this._touchCount].current.clone(),
            touchCount: this._touchCount,
        });

        if (this._handleRotateEnded) {
            this.dispatch('ROTATE_END', {
                current: this._lastAngle,
            });
        }

        if (this._handlePinchEnded) {
            this.dispatch('PINCH_END', {
                current: this._currentScale - this._scaleDistanceStart,
            });
        }
    }

    // rotation handler
    private handleRotateStart(): void {
        this._handleRotateStarted = true;

        this._startAngle = this._touches[1].start.clone().sub(this._touches[0].start).angle(); //+ this.lastAngle;
    }

    private handleRotateMoved(): void {
        this._handleRotateMoved = true;

        this._angleDelta = this._touches[1].current.clone().sub(this._touches[0].current).angle() - this._startAngle;
        // this.quaternion.copy(this.bufferQuaternion.setFromAxisAngle(this.worldDown, angleDelta * 3));
        this._lastAngle = this._angleDelta * -1;
    }

    private handleRotateEnded(): void {
        this._handleRotateEnded = true;
    }

    // pinch handler
    private handlePinchStart(): void {
        this._handlePinchStarted = true;

        this._scaleDistanceStart = this._touches[1].start.distanceTo(this._touches[0].start);
    }

    private handlePinchMoved(): void {
        this._handlePinchMoved = true;

        const beforeDistance = this._currentScale;
        this._currentScale = this._touches[1].current.distanceTo(this._touches[0].current);
        this._deltaScale = this._currentScale - beforeDistance;
        // this._scaleFactor = this._scaleFactorStart * (distance / this._scaleDistanceStart);
        // if (this._scaleFactor <= 1 + this._scaleThreshold && this._scaleFactor >= 1 - this._scaleThreshold) {
        //     this.scale.set(1.0, 1.0, 1.0);
        // } else {
        //     this.scale.set(this._scaleFactor, this._scaleFactor, this._scaleFactor);
        // }
    }

    private handlePinchEnded(): void {
        this._handlePinchEnded = true;
    }
}