import {
    AnimationClip,
    Object3D,
    PropertyBinding,
    VectorKeyframeTrack,
} from 'three/webgpu';
import { collectAnimations } from '../collectAnimations.ts';
import { DIVENode } from '../../../engine/node/Node.ts';
import { DIVEComponent } from '../../../engine/component/Component.ts';

class Animated extends DIVEComponent {
    public animations: AnimationClip[] = [];

    /** contributing is protected, so the fixture opens it */
    public hold(...objects: Object3D[]): this {
        this.contribute(...objects);

        return this;
    }
}

const clip = (name: string, trackNames: string[] = []): AnimationClip =>
    new AnimationClip(
        name,
        1,
        trackNames.map(
            (track) =>
                new VectorKeyframeTrack(track, [0, 1], [0, 0, 0, 1, 1, 1]),
        ),
    );

/** A node holding one asset: a named root with a child every asset also has. */
const asset = (
    rootName: string,
): { node: DIVENode; cube: Object3D; component: Animated } => {
    const node = new DIVENode();
    const root = new Object3D();
    root.name = rootName;
    const cube = new Object3D();
    cube.name = 'Cube';
    root.add(cube);
    const component = node.addComponent(new Animated()).hold(root);

    return { node, cube, component };
};

describe('dive/helpers/collectAnimations', () => {
    it('should find nothing when there is nothing to find', () => {
        expect(collectAnimations(new Object3D())).toEqual([]);
    });

    it('should read the clips of the root itself', () => {
        const root = new Object3D();
        root.animations = [clip('walk')];

        expect(collectAnimations(root).map((c) => c.name)).toEqual(['walk']);
    });

    it('should read the clips of a descendant', () => {
        // the asset loader puts them on the glTF scene, which ends up nested
        const root = new Object3D();
        const child = new Object3D();
        child.animations = [clip('walk')];
        root.add(child);

        expect(collectAnimations(root).map((c) => c.name)).toEqual(['walk']);
    });

    it('should read the clips a component holds', () => {
        // components are not in the graph, so the traversal alone misses them
        const node = new DIVENode();
        node.addComponent(new Animated()).animations = [clip('walk')];

        expect(collectAnimations(node).map((c) => c.name)).toEqual(['walk']);
    });

    it('should reach a component through objects that are not nodes', () => {
        const root = new Object3D();
        const wrapper = new Object3D();
        const node = new DIVENode();
        node.addComponent(new Animated()).animations = [clip('walk')];
        wrapper.add(node);
        root.add(wrapper);

        expect(collectAnimations(root)).toHaveLength(1);
    });

    it('should ignore a component that carries no clips', () => {
        const node = new DIVENode();
        node.addComponent(new (class extends DIVEComponent {})());

        expect(collectAnimations(node)).toEqual([]);
    });

    it('should gather from every model in the scene', () => {
        const root = new Object3D();
        const first = new DIVENode();
        const second = new DIVENode();
        first.addComponent(new Animated()).animations = [clip('walk')];
        second.addComponent(new Animated()).animations = [clip('turn')];
        root.add(first, second);

        expect(collectAnimations(root).map((c) => c.name)).toEqual([
            'walk',
            'turn',
        ]);
    });

    describe('binding a track to the asset that owns it', () => {
        it('should bind each model to its own object', () => {
            /**
             * glTF makes track names unique per file only, so two assets both
             * holding a `Cube` collide -- and the exporter takes the first name
             * it finds, which animated the wrong model
             */
            const root = new Object3D();
            const a = asset('ModelA');
            const b = asset('ModelB');
            a.component.animations = [clip('walkA', ['Cube.position'])];
            b.component.animations = [clip('walkB', ['Cube.position'])];
            root.add(a.node, b.node);

            const [boundA, boundB] = collectAnimations(root);

            expect(boundA.tracks[0].name).toBe(`${a.cube.uuid}.position`);
            expect(boundB.tracks[0].name).toBe(`${b.cube.uuid}.position`);
        });

        it('should resolve to the right object from the export root', () => {
            // the proof the export needs: unique names cannot collide
            const root = new Object3D();
            const a = asset('ModelA');
            const b = asset('ModelB');
            b.component.animations = [clip('walkB', ['Cube.position'])];
            root.add(a.node, b.node);

            const { nodeName } = PropertyBinding.parseTrackName(
                collectAnimations(root)[0].tracks[0].name,
            );

            expect(PropertyBinding.findNode(root, nodeName)).toBe(b.cube);
            expect(PropertyBinding.findNode(root, 'Cube')).toBe(a.cube);
        });

        it('should give two instances of one asset their own binding', () => {
            // a cloned ModelComponent shares the clip objects with its source
            const root = new Object3D();
            const a = asset('Model');
            const b = asset('Model');
            const shared = [clip('walk', ['Cube.position'])];
            a.component.animations = shared;
            b.component.animations = shared;
            root.add(a.node, b.node);

            const [first, second] = collectAnimations(root);

            expect(first.tracks[0].name).toBe(`${a.cube.uuid}.position`);
            expect(second.tracks[0].name).toBe(`${b.cube.uuid}.position`);
        });

        it('should leave the clip a mixer is playing untouched', () => {
            const node = new DIVENode();
            const original = clip('walk', ['Cube.position']);
            const root = new Object3D();
            root.name = 'Cube';
            const component = node.addComponent(new Animated());
            component.hold(root);
            component.animations = [original];

            collectAnimations(node);

            expect(original.tracks[0].name).toBe('Cube.position');
        });

        it('should keep the rest of a track name', () => {
            // a skinned mesh names a bone after the node it hangs on
            const node = new DIVENode();
            const armature = new Object3D();
            armature.name = 'Armature';
            const component = node.addComponent(new Animated());
            component.hold(armature);
            component.animations = [
                clip('walk', ['Armature.bones[Hip].position']),
            ];

            expect(collectAnimations(node)[0].tracks[0].name).toBe(
                `${armature.uuid}.bones[Hip].position`,
            );
        });

        it('should leave a track it cannot place alone', () => {
            // the exporter warns about it, which is the report the caller needs
            const node = new DIVENode();
            const component = node.addComponent(new Animated());
            component.hold(new Object3D());
            component.animations = [clip('walk', ['Elsewhere.position'])];

            expect(collectAnimations(node)[0].tracks[0].name).toBe(
                'Elsewhere.position',
            );
        });
    });
});
