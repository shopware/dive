import { EventDispatcher } from 'three/webgpu';
import { type DIVEInputEventMap } from '../../types/index.ts';

/**
 * An input device: turns raw events into {@link DIVEInputEventMap} events.
 *
 * Knows nothing about cameras. What an event means is decided by whatever is
 * connected to it, so one device can drive different controllers and one
 * controller can listen to several devices.
 */
export abstract class DIVEInput extends EventDispatcher<DIVEInputEventMap> {
    /** Stops listening to the device for good. */
    public abstract dispose(): void;
}
