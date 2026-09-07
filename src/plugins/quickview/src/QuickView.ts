import {
    DIVE,
    DIVEDefaultSettings,
    DIVENode,
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
    node.traverse((object) => {
        if (!('isDIVENode' in object)) return;

        (object as unknown as DIVENode).components.forEach((component) =>
            component.dispose(),
        );
    });

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
    try {
        const dive = new DIVE({ ...settings, autoStart: false });

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

        let model: DIVENode | null = null;
        let state: State | null = null;

        /**
         * Whether what is loaded is worth pointing a camera at.
         *
         * A model always is. A scene state only if it created something visible:
         * an empty scene measures to a negative radius, which would put the
         * camera behind its own target.
         */
        let framable = false;

        /** Frames whatever is loaded, from wherever the decision is made. */
        const frame = (): void => {
            if (!framable) return;

            orbitController.focusObject(model ?? dive.scene.root);
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

            await model.requireComponent(ModelComponent).setFromURL(uri);
            framable = true;

            if (loadSettings?.dropToFloor ?? true) model.dropIt();
            if (loadSettings?.focus ?? true) frame();
        };

        const loadState = async (
            sceneData: StateData,
            loadSettings?: Partial<QuickViewLoadSettings>,
        ): Promise<void> => {
            clear();

            state = new (await import('@shopware-ag/dive/state')).State(
                dive,
                orbitController,
            );

            /**
             * SET_STATE settles once every model is loaded, so there is nothing
             * left to wait for and the created objects come back with it
             * a single broken asset is warned about rather than dropping the
             * whole scene, so what comes back is everything that made it in
             */
            const objects = await state.performAction('SET_STATE', sceneData);

            framable = objects.some(
                (object) =>
                    'isDIVEModel' in object || 'isDIVEPrimitive' in object,
            );

            if (loadSettings?.focus ?? true) frame();
        };

        const load = (
            nextSource: string | StateData,
            loadSettings?: Partial<QuickViewLoadSettings>,
        ): Promise<void> =>
            typeof nextSource === 'string'
                ? loadUri(nextSource, loadSettings)
                : loadState(nextSource, loadSettings);

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
            orbitController.dispose();
            clear();

            // dispose dive
            await originalDispose();
        };

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
        console.error('Failed to initialize QuickView:', error);
        return Promise.reject(error);
    }
}
