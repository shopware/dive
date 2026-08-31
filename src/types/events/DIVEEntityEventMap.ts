import { type Object3DEventMap, type Vector3Like } from 'three/webgpu';
import { type DIVEComponent } from '../../engine/component/Component.ts';

/**
 * The transform an entity reports about itself.
 *
 * `position` is in world space, `rotation` and `scale` are local — that is
 * what the objects already computed before they reported anything.
 *
 * The vectors are live references into the emitting object, including a
 * scratch buffer that the next frame overwrites. A listener that keeps them
 * must copy first. This is deliberate: the event fires once per gizmo frame
 * and must not allocate.
 */
export type DIVEEntityTransformEvent = {
    position: Vector3Like;
    rotation: Vector3Like;
    scale: Vector3Like;
};

/**
 * What a scene object announces about itself.
 *
 * The engine only states facts here — that something moved, was selected, or
 * was deselected. Whether any of it means something is for a listener to
 * decide, which is what keeps the engine free of state knowledge.
 *
 * A finished asset load is not on this list. Fetching is a component's business,
 * and a component says so itself — see {@link DIVEComponentEventMap}. A node used
 * to announce it only because a component had no way to speak for itself, which
 * also meant a component with no owner yet dropped the event silently.
 *
 * No event carries an id: whoever attached the listener knows which object it
 * belongs to, and `event.target` is available for anyone who does not.
 */
/** Carries nothing beyond the fact that it happened. */
type DIVEEntityBareEvent = object;

/** Which component joined or left. */
export type DIVENodeComponentEvent = {
    component: DIVEComponent;
};

export type DIVEEntityEventMap = Object3DEventMap & {
    'object-transform': DIVEEntityTransformEvent;
    'object-select': DIVEEntityBareEvent;
    'object-deselect': DIVEEntityBareEvent;
    componentadded: DIVENodeComponentEvent;
    componentremoved: DIVENodeComponentEvent;
};
