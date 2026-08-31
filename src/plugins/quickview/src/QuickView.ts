import {
    BoundingBox,
    DIVE,
    DIVEDefaultSettings,
    DIVENode,
    disposeComponents,
    ModelComponent,
} from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import type { State, StateData } from '@shopware-ag/dive/state';
import {
    type QuickViewLoadSettings,
    type QuickViewSettings,
} from '../types/index.ts';

/**
 * What {@link QuickView} hands back.
 *
 * Named after the factory, and declared in the same module so it can be: a
 * function lives in the value namespace and a type in the type one, so one
 * import and no `type` keyword covers both.
 *
 *     import { QuickView } from '@shopware-ag/dive/quickview';
 *     const view: Ref<QuickView | null> = ref(null);
 *
 * One type, because a QuickView can hold either kind of source and can be handed
 * the other one later -- {@link load} takes whatever {@link QuickView} takes. So
 * which of {@link model} and {@link state} is there is a question about right
 * now, not about how the view was built, and both are therefore nullable rather
 * than promised.
 */
export type QuickView = DIVE & {
    orbitController: OrbitController;

    /** The node the model sits on, or `null` while a scene state is loaded. */
    readonly model: DIVENode | null;

    /** The state driving the scene, or `null` while a single model is loaded. */
    readonly state: State | null;

    /**
     * Puts something else in front of the viewer.
     *
     * Takes the same sources the factory does, and replaces whatever is loaded --
     * including across kinds: a QuickView built from a URI can be handed scene
     * state and the other way round. The previous source is torn down first, its
     * GPU resources included.
     *
     * @param source - A model URI, or the scene data to apply.
     * @param settings - What to skip; see {@link QuickViewLoadSettings}.
     */
    load: (
        source: string | StateData,
        settings?: Partial<QuickViewLoadSettings>,
    ) => Promise<void>;
};

export const QuickViewDefaultSettings: Omit<
    Required<QuickViewSettings>,
    'hdr'
> = {
    ...DIVEDefaultSettings,
};

/** Frees the GPU resources of every component below a node, and unparents it. */
const disposeNode = (node: DIVENode): void => {
    disposeComponents(node);
    node.removeFromParent();
};

/**
 * Creates a QuickView from a model URI or from scene data.
 *
 * @param source - A model URI, or the scene data to display.
 * @param settings - The settings for the QuickView.
 */
export async function QuickView(
    source: string | StateData,
    settings?: Partial<QuickViewSettings>,
): Promise<QuickView> {
    /**
     * What to take back if the setup does not finish, newest first.
     *
     * Declared out here because the `catch` has to reach it: a DIVE registers
     * itself in a global list when it is constructed and is only removed by its
     * own dispose, so a failure that leaves one behind eats an instance slot for
     * good -- and may leave a clock running.
     */
    const undo: (() => void | Promise<void>)[] = [];

    /** Read by a load that settles after the setup gave up. */
    let disposed = false;

    try {
        const dive = new DIVE({ ...settings, autoStart: false });
        undo.push(() => dive.disposeAsync());

        /**
         * the node, not the camera: the camera sits at its node's origin, and the
         * controller below moves the node
         */
        dive.mainView.cameraComponent.owner.position.set(0, 1, 2);

        const orbitController = new OrbitController(
            dive.mainView.cameraComponent,
            dive.mainView.canvas,
        );
        dive.clock.addTicker(orbitController);
        undo.push(() => orbitController.dispose());

        let model: DIVENode | null = null;
        let state: State | null = null;

        /**
         * Which load is the current one, and the tail of the ones before it.
         *
         * Loads are serialized rather than allowed to interleave: both kinds
         * mutate `model` and `state`, and an asset that settles late would
         * otherwise write into what a newer load already took away. Queued loads
         * that a newer one has overtaken are skipped entirely -- latest wins,
         * and nothing in between is fetched for nothing.
         */
        let generation = 0;
        let queue: Promise<void> = Promise.resolve();

        /**
         * Frames whatever is loaded, if there is anything to frame.
         *
         * Asks the geometry, because that is the question: an empty box measures
         * a negative radius, which would put the camera behind its own target.
         * Entity kinds cannot answer it -- a model's marker sits in `userData`
         * and a primitive has none, so anything reading brands off what
         * `SET_STATE` returns finds nothing and frames nothing.
         */
        const frame = (): void => {
            const target = model ?? dive.scene.root;
            if (new BoundingBox().enclose(target).isEmpty) return;

            orbitController.focusObject(target);
        };

        /** Takes down whatever is loaded, so the two kinds never coexist. */
        const clear = (): void => {
            if (model) {
                disposeNode(model);
                model = null;
            }

            if (state) {
                // otherwise the instance lingers in State's static registry
                state.destroyInstance();
                state = null;

                // the entities the state created are the root's child nodes
                dive.scene.root.nodes.forEach(disposeNode);
            }
        };

        // whatever a partial load managed to build
        undo.push(clear);

        const loadUri = async (
            uri: string,
            loadSettings?: Partial<QuickViewLoadSettings>,
        ): Promise<void> => {
            if (state) clear();

            if (!model) {
                // a model is a node carrying mesh geometry
                model = new DIVENode();
                model.name = 'QuickViewModel';
                model.addComponent(new ModelComponent());
                dive.scene.root.add(model);
            }

            /**
             * Held locally across the await. The shared `model` is what a later
             * load or a disposal writes to, so reading it again afterwards is
             * reading someone else's answer.
             */
            const node = model;

            await node.requireComponent(ModelComponent).setFromURL(uri);

            if (disposed) {
                // it arrived after the view was thrown away, so nobody owns it
                disposeComponents(node);
                node.removeFromParent();

                return;
            }

            if (loadSettings?.dropToFloor ?? true) node.dropIt();
            if (loadSettings?.focus ?? true) frame();
        };

        const loadState = async (
            sceneData: StateData,
            loadSettings?: Partial<QuickViewLoadSettings>,
        ): Promise<void> => {
            clear();

            const instance = new (
                await import('@shopware-ag/dive/state')
            ).State(dive, orbitController);
            state = instance;

            /**
             * SET_STATE settles once every model is loaded, so there is nothing
             * left to wait for
             * a single broken asset is warned about rather than dropping the
             * whole scene, so what made it in is what is in the scene
             */
            await instance.performAction('SET_STATE', sceneData);

            if (disposed) {
                instance.destroyInstance();
                dive.scene.root.nodes.forEach(disposeNode);

                return;
            }

            if (loadSettings?.focus ?? true) frame();
        };

        const load = (
            nextSource: string | StateData,
            loadSettings?: Partial<QuickViewLoadSettings>,
        ): Promise<void> => {
            const ticket = ++generation;

            const run = queue.then(() => {
                // overtaken while it waited, or there is no view left to fill
                if (ticket !== generation || disposed) return;

                return typeof nextSource === 'string'
                    ? loadUri(nextSource, loadSettings)
                    : loadState(nextSource, loadSettings);
            });

            /**
             * The caller gets `run` and therefore this load's own outcome, while
             * the queue continues on a tail that never rejects -- a failed load
             * must not block the next one.
             */
            queue = run.then(
                () => {},
                () => {},
            );

            return run;
        };

        /**
         * Getters rather than fields, because `load` swaps what is there and
         * `Object.assign` would have copied whatever was current at setup.
         */
        const quickView = Object.assign(dive, { orbitController, load });
        Object.defineProperties(quickView, {
            model: { get: () => model, enumerable: true },
            state: { get: () => state, enumerable: true },
        });

        const originalDispose = dive.disposeAsync.bind(dive);
        quickView.disposeAsync = async () => {
            // before clear(), so a load in flight sees it and frees what it got
            disposed = true;
            generation++;

            orbitController.dispose();
            clear();

            // dispose dive
            await originalDispose();
        };

        /**
         * From here the wrapped dispose is the entire teardown, so it replaces
         * the pieces: keeping both would dispose the controller twice.
         */
        undo.length = 0;
        undo.push(() => quickView.disposeAsync());

        /**
         * The first load frames only after the scene runs: `focusObject` reads
         * the viewport, which has no size before then.
         */
        await load(source, { focus: false });

        if (settings?.autoStart ?? true) {
            await dive.startAsync();
            frame();
        }

        return quickView as QuickView;
    } catch (error) {
        disposed = true;

        // newest first, and never in front of the error that brought us here
        for (const step of undo.reverse()) {
            try {
                await step();
            } catch (failure) {
                console.error('Failed to clean up a QuickView:', failure);
            }
        }

        /**
         * rethrown untouched, and not logged: the caller knows it asked for a
         * QuickView, so "during initialization" adds nothing the error does not
         * already say -- and a library that logs what it rethrows makes the same
         * failure appear twice, in a channel the caller did not choose
         */
        return Promise.reject(error);
    }
}
