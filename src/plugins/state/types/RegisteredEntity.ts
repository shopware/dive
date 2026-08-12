import { type DIVESceneObject } from '@shopware-ag/dive';
import { type EntitySchema } from './schema/index.ts';

/**
 * One entity, as the state holds it: its data, the node representing it, and the
 * teardown for the listeners attached to that node.
 *
 * Kept together on purpose. All three share an id, a lifetime and every state
 * change, so splitting them across separate maps only created the chance for
 * them to drift apart — and made every caller that needed two of them do two
 * lookups.
 *
 * This shape is a state-internal detail. Actions reach it through `readSchema`,
 * `readNode` and `writeSchema`, never through the map, so it can change without
 * touching them.
 *
 * @module
 */
export type RegisteredEntity = {
    schema: EntitySchema;

    /**
     * Absent for a state-only entity. A camera has a position and a target, but
     * nothing in the scene tree.
     */
    node?: DIVESceneObject;

    /** Drops the listeners on {@link node}. Called by `unregisterEntity`. */
    unwatch?: () => void;
};
