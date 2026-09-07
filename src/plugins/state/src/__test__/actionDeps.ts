import { type DIVESceneObject } from '@shopware-ag/dive';
import {
    type ActionDependencies,
    type EntitySchema,
} from '../../types/index.ts';
import { EntityRegistry } from '../EntityRegistry.ts';

/** One entity to put into the registry before the action runs. */
export type SeedEntity = {
    schema: EntitySchema;
    /** Its scene object. Leave out to model a state-only entity. */
    node?: DIVESceneObject;
};

/**
 * Builds the registry-related dependencies an action expects.
 *
 * Uses a **real** {@link EntityRegistry}, not a mock: `read`/`write`/`register` do the
 * actual thing, so a test asserts on stored data rather than on which method got
 * called. That also means the vector copying in `write` is exercised instead of
 * stubbed away.
 *
 * Only `dispatch` is a spy, because there is nothing behind it to observe.
 *
 * @param entities - What the registry starts with.
 */
export const makeActionDeps = (
    entities: SeedEntity[] = [],
): Pick<ActionDependencies, 'registry' | 'dispatch'> => {
    const registry = new EntityRegistry();
    entities.forEach(({ schema, node }) => registry.register(schema, node));

    return { registry, dispatch: vi.fn() };
};
