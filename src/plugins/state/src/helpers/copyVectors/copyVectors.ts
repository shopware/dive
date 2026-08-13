import { type PartialSchema } from '../../../types/index.ts';

/** The schema fields that carry a vector. */
const VECTOR_FIELDS = ['position', 'rotation', 'scale', 'target'] as const;

const isVector = (
    value: unknown,
): value is { x: number; y: number; z: number } =>
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { x?: unknown }).x === 'number' &&
    typeof (value as { y?: unknown }).y === 'number' &&
    typeof (value as { z?: unknown }).z === 'number';

/**
 * Returns a patch whose vectors are plain copies.
 *
 * The engine reports transforms as live references into objects it keeps reusing
 * — `DIVENode.onMove` hands out a scratch `Vector3` that the next frame
 * overwrites. Storing such a reference means the stored schema silently changes
 * underneath its owner, and `lodash.merge` assigns by reference whenever the
 * target key is absent.
 *
 * This used to be `copyVec` at each call site in the gateway. It lives here
 * because `EntityRegistry.write` is now the only way into a schema, so copying
 * can happen once instead of being remembered every time.
 *
 * @param patch - The patch to sanitise.
 */
export const copyVectors = <T extends PartialSchema>(patch: T): T => {
    const copy = { ...patch } as Record<string, unknown>;

    VECTOR_FIELDS.forEach((field) => {
        const value = copy[field];
        if (!isVector(value)) return;

        copy[field] = { x: value.x, y: value.y, z: value.z };
    });

    return copy as T;
};
