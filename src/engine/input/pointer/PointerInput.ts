import { Vector2 } from 'three/webgpu';
import { DIVEInput } from '../Input.ts';
import { type DIVEInputChannel } from '../../../types/index.ts';

/** One wheel notch away from the user, whatever the browser reports as its size. */
const WHEEL_STEP = 0.95;

/**
 * Mouse and touch on one element, as input events.
 *
 * - left drag or one finger: `primary`
 * - right drag, or left with Ctrl/Meta/Shift, or two fingers: `secondary`
 * - right drag with Ctrl/Meta/Shift: `primary`
 * - middle drag: `tertiary`
 * - wheel and pinch: `scale`
 *
 * Movement is in `viewport` units: pixels divided by the element's height, on
 * both axes.
 */
export class PointerInput extends DIVEInput {
    /** While `false`, nothing is reported. A drag still in progress ends normally. */
    public enabled = true;

    private _element: HTMLElement;

    /** The pointers that are down, by id, at their last client position. */
    private readonly _pointers = new Map<number, Vector2>();

    private _channel: DIVEInputChannel | null = null;

    /** Centre of and distance between two touches, for pan and pinch. */
    private readonly _centroid = new Vector2();
    private _spread = 0;

    constructor(element: HTMLElement) {
        super();

        this._element = element;
        this._attach();
    }

    public get element(): HTMLElement {
        return this._element;
    }

    /** Moves to another element, ending whatever was in progress on the old one. */
    public setElement(element: HTMLElement): void {
        if (element === this._element) return;

        this._release();
        this._detach();
        this._element = element;
        this._attach();
    }

    public dispose(): void {
        this._release();
        this._detach();
    }

    private _attach(): void {
        const element = this._element;
        element.addEventListener('pointerdown', this._onPointerDown);
        element.addEventListener('pointermove', this._onPointerMove);
        element.addEventListener('pointerup', this._onPointerUp);
        element.addEventListener('pointercancel', this._onPointerUp);
        element.addEventListener('wheel', this._onWheel, { passive: false });
        element.addEventListener('contextmenu', this._onContextMenu);
    }

    private _detach(): void {
        const element = this._element;
        element.removeEventListener('pointerdown', this._onPointerDown);
        element.removeEventListener('pointermove', this._onPointerMove);
        element.removeEventListener('pointerup', this._onPointerUp);
        element.removeEventListener('pointercancel', this._onPointerUp);
        element.removeEventListener('wheel', this._onWheel);
        element.removeEventListener('contextmenu', this._onContextMenu);
    }

    /** Lets go of every pointer and ends the active channel. */
    private _release(): void {
        this._pointers.forEach((_, id) => this._releaseCapture(id));
        this._pointers.clear();
        this._begin(null);
    }

    /** Switches the active channel, ending the previous one. */
    private _begin(channel: DIVEInputChannel | null): void {
        if (channel === this._channel) return;

        if (this._channel) {
            this.dispatchEvent({ type: 'end', channel: this._channel });
        }

        this._channel = channel;

        if (channel) {
            this.dispatchEvent({ type: 'start', channel });
        }
    }

    private _mouseChannel(event: PointerEvent): DIVEInputChannel | null {
        const swap = event.ctrlKey || event.metaKey || event.shiftKey;

        switch (event.button) {
            case 0:
                return swap ? 'secondary' : 'primary';
            case 1:
                return 'tertiary';
            case 2:
                return swap ? 'primary' : 'secondary';
            default:
                return null;
        }
    }

    /**
     * Picks the channel for the touches that are down.
     *
     * Runs whenever a finger lands or lifts, so going from two fingers to one
     * hands over from `secondary` to `primary` rather than leaving a pinch
     * running on a single finger.
     */
    private _regroupTouches(): void {
        if (this._pointers.size === 2) {
            this._spread = this._measureTouches(this._centroid);
        }

        switch (this._pointers.size) {
            case 1:
                this._begin('primary');
                break;
            case 2:
                this._begin('secondary');
                break;
            default:
                this._begin(null);
        }
    }

    /** Writes the centre of the first two touches and returns their distance. */
    private _measureTouches(centroid: Vector2): number {
        const [a, b] = [...this._pointers.values()];
        centroid.addVectors(a, b).multiplyScalar(0.5);

        return a.distanceTo(b);
    }

    private _releaseCapture(pointerId: number): void {
        if (this._element.hasPointerCapture?.(pointerId)) {
            this._element.releasePointerCapture(pointerId);
        }
    }

    private _onPointerDown = (event: PointerEvent): void => {
        if (!this.enabled || this._pointers.has(event.pointerId)) return;

        // keeps the drag alive when it leaves the element
        this._element.setPointerCapture?.(event.pointerId);

        this._pointers.set(
            event.pointerId,
            new Vector2(event.clientX, event.clientY),
        );

        if (event.pointerType === 'touch') {
            this._regroupTouches();
        } else {
            this._begin(this._mouseChannel(event));
        }
    };

    private _onPointerMove = (event: PointerEvent): void => {
        const position = this._pointers.get(event.pointerId);
        if (!position) return;

        const height = this._element.clientHeight;
        const delta = new Vector2(
            event.clientX - position.x,
            event.clientY - position.y,
        );

        // tracked even while disabled, so the next delta starts from here
        position.set(event.clientX, event.clientY);

        if (!this.enabled || !this._channel || height === 0) return;

        if (this._channel !== 'secondary' || this._pointers.size !== 2) {
            this.dispatchEvent({
                type: 'move',
                channel: this._channel,
                delta: delta.divideScalar(height),
                unit: 'viewport',
            });
            return;
        }

        // two fingers: the centre pans, the distance pinches
        const previous = this._centroid.clone();
        const spread = this._measureTouches(this._centroid);

        this.dispatchEvent({
            type: 'move',
            channel: 'secondary',
            delta: this._centroid.clone().sub(previous).divideScalar(height),
            unit: 'viewport',
        });

        if (this._spread > 0 && spread > 0) {
            this.dispatchEvent({
                type: 'scale',
                factor: spread / this._spread,
            });
        }

        this._spread = spread;
    };

    private _onPointerUp = (event: PointerEvent): void => {
        if (!this._pointers.delete(event.pointerId)) return;

        this._releaseCapture(event.pointerId);

        if (this._pointers.size === 0) {
            this._begin(null);
        } else if (event.pointerType === 'touch') {
            this._regroupTouches();
        }
    };

    private _onWheel = (event: WheelEvent): void => {
        // a wheel during a drag would fight it
        if (!this.enabled || this._channel || event.deltaY === 0) return;

        event.preventDefault();

        this.dispatchEvent({
            type: 'scale',
            factor: event.deltaY < 0 ? 1 / WHEEL_STEP : WHEEL_STEP,
        });
    };

    private _onContextMenu = (event: MouseEvent): void => {
        if (!this.enabled) return;

        // the right button is a drag here, not a menu
        event.preventDefault();
    };
}
