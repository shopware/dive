import {
    type DIVESceneObject,
    DIVENode,
    PerspectiveCameraComponent,
} from '@shopware-ag/dive';
import { type OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { Vector3 } from 'three/webgpu';
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

/**
 * Builds the camera dependency an action expects.
 *
 * Real node, real camera component, real target vector -- for the same reason
 * {@link makeActionDeps} uses a real registry: an action's contract is where the
 * transform ends up, and a mock that records `setState` calls cannot tell whether
 * the position landed on the node or vanished onto the component, which is exactly
 * the mistake this guards against.
 *
 * `update` is a spy over a no-op, because a real one would recompute the position
 * from its orbit state and hide what the action wrote.
 *
 * @param position - Where the camera node starts.
 * @param target - What it starts out looking at.
 */
export const makeCameraController = (
    position = new Vector3(),
    target = new Vector3(),
): OrbitController & { update: ReturnType<typeof vi.fn> } => {
    const node = new DIVENode();
    node.addComponent(new PerspectiveCameraComponent());
    node.position.copy(position);

    return {
        object: node.getComponent(PerspectiveCameraComponent),
        target: target.clone(),
        update: vi.fn(() => false),
    } as unknown as OrbitController & { update: ReturnType<typeof vi.fn> };
};
