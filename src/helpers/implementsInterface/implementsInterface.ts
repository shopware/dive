import { type Object3D } from 'three/webgpu';

/**
 * Checks whether an object carries a capability brand.
 *
 * Tests for the value being `true`, not merely for the key being present: a
 * `readonly isSelectable: false` would otherwise count as implementing the
 * interface, and `findInterface` would stop its walk at that object and hand it
 * back as the owner.
 *
 * @param object - The object to check.
 * @param discriminator - The brand property, e.g. `isSelectable`.
 */
export function implementsInterface<T>(
    object: Object3D | null | undefined,
    discriminator: string,
): object is Object3D & T {
    if (!object) return false;
    return (
        (object as unknown as Record<string, unknown>)[discriminator] === true
    );
}
