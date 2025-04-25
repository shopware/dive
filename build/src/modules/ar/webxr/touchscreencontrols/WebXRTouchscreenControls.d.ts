import { Vector2 } from 'three';
import { DIVEEventExecutor } from '../../../../modules/events/EventExecutor';
export type DIVETouchscreenEvents = {
    TOUCH_START: {
        touches: {
            current: Vector2;
        }[];
        touchCount: number;
    };
    TOUCH_MOVE: {
        touches: {
            current: Vector2;
            delta: Vector2;
        }[];
        touchCount: number;
    };
    TOUCH_END: {
        touches: {
            current: Vector2;
        }[];
        touchCount: number;
    };
    ROTATE_START: {
        current: number;
    };
    ROTATE_MOVE: {
        current: number;
        delta: number;
    };
    ROTATE_END: {
        current: number;
    };
    PINCH_START: {
        current: number;
    };
    PINCH_MOVE: {
        current: number;
        delta: number;
    };
    PINCH_END: {
        current: number;
    };
};
export declare class DIVEWebXRTouchscreenControls extends DIVEEventExecutor<DIVETouchscreenEvents> {
    private _session;
    private _touchCount;
    private _touches;
    private _handleRotateStarted;
    private _handleRotateMoved;
    private _handleRotateEnded;
    private _startAngle;
    private _lastAngle;
    private _angleDelta;
    private _handlePinchStarted;
    private _handlePinchMoved;
    private _handlePinchEnded;
    private _scaleDistanceStart;
    private _currentDistance;
    private _deltaDistance;
    constructor(session: XRSession);
    Dispose(): void;
    private onTouchStart;
    private onTouchMove;
    private onTouchEnd;
    private onSessionSelectStart;
    private onSessionSelectEnd;
    private handleRotateStart;
    private handleRotateMoved;
    private handleRotateEnded;
    private handlePinchStart;
    private handlePinchMoved;
    private handlePinchEnded;
}
