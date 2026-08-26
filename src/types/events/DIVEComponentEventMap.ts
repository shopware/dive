/** Carries nothing beyond the fact that it happened. */
type DIVEComponentBareEvent = object;

/**
 * What a component announces about itself.
 *
 * Separate from {@link DIVEEntityEventMap}: a component knows about an asset, a
 * geometry, a material -- never about entities or their ids. Whoever listens
 * knows which component it attached to, and `event.target` is there for anyone
 * who does not.
 */
export type DIVEComponentEventMap = {
    'object-load': DIVEComponentBareEvent;
};
