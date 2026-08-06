import { EntityTypeSchema } from './EntityTypeSchema.ts';

/** What every entity of a scene carries, whatever its type. */
export type BaseEntitySchema = {
    /**
     * Identifies the entity across the whole system: it keys the state's
     * registry and is what a scene object carries in `userData.id`, which is
     * how the two are matched up again.
     */
    id: string;
    /** Free text for the user interface, not used to look anything up. */
    name: string;
    /** Discriminates the union, see {@link EntityTypeSchema}. */
    entityType: EntityTypeSchema;
    visible: boolean;
    /**
     * The id of the group this entity hangs under, or `null` for the root.
     *
     * This is the one field where `null` carries meaning rather than standing
     * for "not set". A parent that is not in the scene is ignored with a
     * warning and the entity stays at the root.
     */
    parentId?: string | null;
    /** Blocks the entity from being moved through the toolbox. */
    locked?: boolean;
};
