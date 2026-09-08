import {
    type AnimationClip,
    type Object3D,
    PropertyBinding,
} from 'three/webgpu';
import { type DIVENode } from '../../engine/node/Node.ts';

/** Anything that can hold the clips an asset came with. */
type AnimationSource = { animations?: AnimationClip[] };

const isNode = (object: Object3D): object is DIVENode => 'isDIVENode' in object;

/** Resolves a track's target inside one asset, never across assets. */
const findWithin = (
    scope: readonly Object3D[],
    nodeName: string,
): Object3D | null => {
    for (const root of scope) {
        // @types/three declares this as `object | null`
        const found = PropertyBinding.findNode(
            root,
            nodeName,
        ) as Object3D | null;
        if (found) return found;
    }

    return null;
};

/**
 * Points a clip's tracks at one asset's own objects, by uuid.
 *
 * A track names its target, and glTF makes those names unique only within a
 * single file: two assets both holding a `Cube`, or the same asset loaded twice,
 * collide. The exporter resolves a track by walking the export root and taking
 * the first name that matches, so without this the second model's clips animate
 * the first model's objects.
 *
 * A uuid is unique across the scene, so resolving cannot stray into a
 * neighbour. Only the resolution matters: what lands in the file is a node
 * index, so the names written out are unaffected.
 *
 * The clip is cloned, because the one held by the component is what a mixer is
 * playing.
 */
const bindTo = (
    clip: AnimationClip,
    scope: readonly Object3D[],
): AnimationClip => {
    const bound = clip.clone();

    bound.tracks.forEach((track) => {
        const { nodeName } = PropertyBinding.parseTrackName(track.name);
        if (!nodeName) return;

        const target = findWithin(scope, nodeName);

        // left alone when it belongs to nothing here, and the exporter says so
        if (!target) return;

        track.name = target.uuid + track.name.slice(nodeName.length);
    });

    return bound;
};

/**
 * Gathers every animation clip below a root, bound to the objects it animates.
 *
 * Both exporters take a root and its clips separately, and resolve each track
 * against the subtree they are handed. Clips therefore reach a file only when
 * they are passed at the top level -- ones sitting on a descendant's
 * `Object3D.animations`, or held by a component, are invisible to the export.
 *
 * Two places are read, because that is where clips end up: `Object3D.animations`,
 * which the asset loader fills for a plain load, and the `animations` field of a
 * component, which is where {@link ModelComponent} keeps them. Components are not
 * part of the graph, so a traversal alone never reaches them. Matched
 * structurally, so a component added later that carries clips needs no change
 * here.
 *
 * Each clip is bound to the objects of the asset that holds it, which is why this
 * cannot live in the exporter: only the holder knows which objects its clips
 * belong to, and by the time a whole scene is handed over, that pairing is gone.
 *
 * @param root - The object to collect below.
 */
export function collectAnimations(root: Object3D): AnimationClip[] {
    const clips: AnimationClip[] = [];

    const take = (source: unknown, scope: readonly Object3D[]): void => {
        (source as AnimationSource).animations?.forEach((clip) =>
            clips.push(bindTo(clip, scope)),
        );
    };

    root.traverse((object) => {
        take(object, [object]);

        if (!isNode(object)) return;
        object.components.forEach((component) =>
            take(component, component.contributions),
        );
    });

    return clips;
}
