import { type Object3D } from 'three/webgpu';
import { type DIVEComponent } from '../../engine/component/Component.ts';
import { type DIVENode } from '../../engine/node/Node.ts';

/**
 * Frees the GPU resources held by every component in a subtree.
 *
 * A component's geometries, materials and textures are only released by its own
 * `dispose`, and nothing else in a teardown does that -- `Renderer.dispose` drops
 * bookkeeping, and unparenting an object frees nothing at all. So whoever takes
 * something out of the scene for good has to come through here, or it leaks until
 * the page goes away.
 *
 * Walks the graph rather than a node's `components`, because components are not
 * in the graph: what the traversal finds is nodes, and each of them is asked for
 * its components.
 *
 * Unparents nothing. Removing an object and freeing what it holds are separate
 * questions, and a caller that is only moving something must not free it.
 *
 * @param object - Root of the subtree to free. Included itself.
 */
export function disposeComponents(object: Object3D): void {
    const components: DIVEComponent[] = [];

    object.traverse((child) => {
        if (!('isDIVENode' in child)) return;

        components.push(...(child as unknown as DIVENode).components);
    });

    components.forEach((component) => component.dispose());
}
