import {
    type DIVEEntityTransformEvent,
    type DIVESceneObject,
    ModelComponent,
} from '@shopware-ag/dive';
import {
    type ActionDependencies,
    type EntitySchema,
    type PartialSchema,
} from '../../../types/index.ts';
import { copyVectors } from '../copyVectors/copyVectors.ts';
import { updateParentLink } from '../updateParentLink/updateParentLink.ts';

/**
 * Listens to what a scene object reports about itself and records it.
 *
 * ### Why this reports instead of commanding
 *
 * An object's own report travels engine -> state. The state is the destination,
 * not the source, so the report writes the schema and announces the change —
 * it does not run an action. Running `UPDATE_OBJECT` here, as this code used to,
 * meant sending a command back to the very object that had just moved: the
 * position went out through `updateEntity` -> `setPosition` -> `worldToLocal`
 * onto the node it came from, once per frame of a gizmo drag.
 *
 * Subscribers see no difference. `dispatch` is the same call `performAction`
 * makes at the end, with the same payload under the same name, so
 * `state.subscribe('UPDATE_OBJECT', …)` keeps receiving gizmo positions.
 *
 * The closure is the routing: the id comes from the entity that was just
 * created, so nothing has to search for it later, and the engine never learns
 * that any of this happens.
 *
 * @param node - The scene object to listen to.
 * @param entity - The entity it stands for.
 * @param deps - EntityRegistry to write, dispatch to announce.
 * @returns Drops every listener again. Belongs in the registry entry.
 *
 * @module
 */
export const watchEntity = (
    node: DIVESceneObject,
    entity: EntitySchema,
    { registry, dispatch }: Pick<ActionDependencies, 'registry' | 'dispatch'>,
): (() => void) => {
    const { id, entityType } = entity;

    const onTransform = (event: DIVEEntityTransformEvent): void => {
        /**
         * copied once for both the schema and the subscribers, the event carries
         * live references into a buffer the next frame overwrites
         */
        const report = copyVectors({
            id,
            entityType,
            position: event.position,
            rotation: event.rotation,
            scale: event.scale,
        } as PartialSchema);

        registry.write(id, report);

        // redraw the link to the group, stateless because the node knows its parent
        updateParentLink(node);

        dispatch('UPDATE_OBJECT', report);
    };

    // no re-entry guard needed, announcing does not reach the toolbox
    const onSelect = (): void => {
        dispatch('SELECT_OBJECT', { id, entityType });
    };

    const onDeselect = (): void => {
        dispatch('DESELECT_OBJECT', { id, entityType });
    };

    const onLoad = (): void => {
        registry.write(id, { id, entityType, loaded: true } as PartialSchema);
        dispatch('MODEL_LOADED', { id });
    };

    node.addEventListener('object-transform', onTransform);
    node.addEventListener('object-select', onSelect);
    node.addEventListener('object-deselect', onDeselect);

    /**
     * on the component, because that is what loads
     * the component that exists now: an entity is composed in createEntity,
     * before this runs, and a mesh component swapped later would stop reporting
     */
    const model = node.getComponent(ModelComponent);
    model?.addEventListener('object-load', onLoad);

    return () => {
        node.removeEventListener('object-transform', onTransform);
        node.removeEventListener('object-select', onSelect);
        node.removeEventListener('object-deselect', onDeselect);
        model?.removeEventListener('object-load', onLoad);
    };
};
