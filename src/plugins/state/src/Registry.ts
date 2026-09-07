import merge from 'lodash/merge.js';
import { type DIVESceneObject } from '@shopware-ag/dive';
import {
    type EntitySchema,
    type PartialSchema,
    type RegisteredEntity,
} from '../types/index.ts';
import { copyVectors } from './helpers/copyVectors/copyVectors.ts';

/**
 * Holds every entity the state knows: its data, its scene object, and the
 * teardown for the listeners on that object.
 *
 * The map itself never leaves this class. Actions get the registry and use
 * `read` / `write` / `register` / `unregister`, so how an entity is stored stays
 * a detail here — and `write` being the only way in means the vector-copy rule
 * is enforced rather than remembered at each call site.
 *
 * @module
 */
export class Registry {
    private readonly _entities: Map<string, RegisteredEntity> = new Map();

    /** How many entities are registered. */
    public get size(): number {
        return this._entities.size;
    }

    /** Every entity. */
    public read(): RegisteredEntity[];
    /** One entity, or `undefined` if it is not registered. */
    public read(id: string): RegisteredEntity | undefined;
    public read(
        id?: string,
    ): RegisteredEntity[] | RegisteredEntity | undefined {
        if (id === undefined) return Array.from(this._entities.values());

        return this._entities.get(id);
    }

    /**
     * Patches an entity's data.
     *
     * Copies vectors on the way in. The engine reports them as live references
     * into a buffer it reuses next frame, and `merge` assigns by reference when
     * the target key is absent — so a moving object would otherwise keep
     * rewriting its own stored transform.
     *
     * @param id - The entity to patch.
     * @param patch - The fields to apply; anything absent stays as it is.
     */
    public write(id: string, patch: PartialSchema): void {
        const entry = this._entities.get(id);
        if (!entry) return;

        merge(entry.schema, copyVectors(patch));
    }

    /**
     * Takes an entity in.
     *
     * @param schema - The entity data.
     * @param node - Its scene object, absent for a state-only entity.
     * @param unwatch - Drops the listeners on the node again.
     */
    public register(
        schema: EntitySchema,
        node?: DIVESceneObject,
        unwatch?: () => void,
    ): void {
        this._entities.set(schema.id, { schema, node, unwatch });
    }

    /**
     * Drops an entity and the listeners on its node.
     *
     * @param id - The entity to drop.
     * @returns Whether it was registered.
     */
    public unregister(id: string): boolean {
        const entry = this._entities.get(id);
        if (!entry) return false;

        entry.unwatch?.();

        return this._entities.delete(id);
    }

    /** Drops everything, listeners included. */
    public clear(): void {
        this._entities.forEach((entry) => entry.unwatch?.());
        this._entities.clear();
    }
}
