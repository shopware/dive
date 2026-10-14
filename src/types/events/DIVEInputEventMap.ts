import { type Vector2 } from 'three/webgpu';

/**
 * Where an input comes from, in terms of what the user did rather than what it
 * means.
 *
 * A device maps its own controls onto these; what a channel does is the
 * controller's decision. `primary` is a left drag or one finger, `secondary` a
 * right drag or two fingers, `tertiary` a middle drag, `orientation` the way the
 * device itself is held.
 */
export type DIVEInputChannel =
    'primary' | 'secondary' | 'tertiary' | 'orientation';

/**
 * What a relative movement is measured in.
 *
 * `viewport` is a fraction of the element's height on both axes, so a drag means
 * the same on every canvas size. `radians` is an angle, for devices that measure
 * one.
 */
export type DIVEInputUnit = 'viewport' | 'radians';

export type DIVEInputEventMap = {
    /** A channel became active: a button went down, a gesture began. */
    start: { channel: DIVEInputChannel };

    /** A channel is no longer active. */
    end: { channel: DIVEInputChannel };

    /** Relative movement on a channel since the last `move`. */
    move: { channel: DIVEInputChannel; delta: Vector2; unit: DIVEInputUnit };

    /**
     * Absolute position on a channel, `0` being neutral.
     *
     * For devices that have a resting position, such as the way a phone is held.
     * Integrating `move` instead would drift away from it at every clamp.
     */
    axis: { channel: DIVEInputChannel; value: Vector2; unit: 'radians' };

    /** A relative scale, above `1` meaning closer: a wheel notch, a pinch. */
    scale: { factor: number };
};
