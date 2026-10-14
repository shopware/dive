import {
    BoundingBox,
    DIVE,
    DIVEDefaultSettings,
    DIVENode,
    disposeComponents,
    GyroInput,
    ModelComponent,
    PointerInput,
} from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import type { State, StateData } from '@shopware-ag/dive/state';
import type {
    TiltController,
    TiltControllerPose,
} from '@shopware-ag/dive/tiltcontroller';
import { type QuickViewSettings } from '../types/index.ts';

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

    /** Mouse and touch on the canvas, driving the {@link orbitController}. */
    pointerInput: PointerInput;

    /** Which controller moves the camera right now. */
    readonly activeController: QuickViewController;

    /**
     * Hands the camera to another controller. Exactly one is active at a time.
     *
     * `'gyro'` turns the camera by how the device is tilted, around the pose the
     * first load was framed in. It needs the orientation sensor, which iOS only
     * grants from inside a user gesture -- call this straight from the click
     * handler. It rejects, and the previous controller stays, when the sensor is
     * refused or reports nothing.
     *
     * `'gyro'` is experimental, see `GyroInput` and `TiltController`: how it
     * feels may change without a major release.
     *
     * @param kind - The controller to use.
     */
    useController: (kind: QuickViewController) => Promise<void>;

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
     */
    load: (source: string | StateData) => Promise<void>;
};

/**
 * The controllers a {@link QuickView} can hand its camera to. `'gyro'` is
 * experimental.
 */
export type QuickViewController = 'orbit' | 'gyro';

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
    /** Read by a load that settles after the setup gave up. */
    let disposed = false;

    /**
     * Built before the `try`, so the `catch` can reach it without it being
     * nullable. Nothing needs taking back if this line is what fails, and a
     * failure after it must be cleaned up: a DIVE registers itself in a global
     * list and is only removed by its own dispose, so one left behind eats an
     * instance slot for good -- and may leave a clock running.
     */
    const dive = new DIVE({ ...settings, autoStart: false });

    try {
        /**
         * the node, not the camera: the camera sits at its node's origin, and the
         * controller below moves the node
         */
        dive.mainView.cameraComponent.owner.position.set(0, 1, 2);

        /**
         * The aspect the camera is built with is a placeholder, and framing
         * reads it: a portrait viewport fits horizontally, so a frame against
         * the placeholder puts the camera too close. A laid-out canvas answers
         * it here already, long before the view runs and reports the same size.
         * A canvas the consumer has yet to mount measures zero, which is no
         * answer at all -- better the placeholder than a NaN aspect.
         */
        const { clientWidth: width, clientHeight: height } =
            dive.mainView.canvas;
        if (width > 0 && height > 0) {
            dive.mainView.cameraComponent.onResize(width, height);
        }

        const pointerInput = new PointerInput(dive.mainView.canvas);
        const orbitController = new OrbitController(
            dive.mainView.cameraComponent,
        );
        orbitController.connect(pointerInput);
        dive.clock.addTicker(orbitController);

        let activeController: QuickViewController = 'orbit';

        /**
         * The front the gyro turns around: the pose of the first framing. Set
         * before the view is handed out, so before anyone can switch.
         */
        let homePose: TiltControllerPose | null = null;

        /** Built on the first switch to the gyro, so nobody else loads it. */
        let gyro: { input: GyroInput; controller: TiltController } | null =
            null;

        const disposeGyro = (): void => {
            if (!gyro) return;

            dive.clock.removeTicker(gyro.controller);
            gyro.controller.dispose();
            gyro.input.dispose();
            gyro = null;
        };

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

        /**
         * Installed as soon as its pieces exist, so from here on there is one
         * teardown and one only -- the `catch` below calls exactly what the
         * caller would. It replaces `disposeAsync` on the DIVE itself, which is
         * the object handed back.
         */
        const originalDispose = dive.disposeAsync.bind(dive);
        dive.disposeAsync = async () => {
            // before clear(), so a load in flight sees it and frees what it got
            disposed = true;
            generation++;

            orbitController.dispose();
            pointerInput.dispose();
            disposeGyro();
            clear();

            // dispose dive
            await originalDispose();
        };

        const loadUri = async (uri: string): Promise<void> => {
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

            node.dropIt();
        };

        const loadState = async (sceneData: StateData): Promise<void> => {
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
        };

        const load = (nextSource: string | StateData): Promise<void> => {
            const ticket = ++generation;

            const run = queue.then(() => {
                // overtaken while it waited, or there is no view left to fill
                if (ticket !== generation || disposed) return;

                return typeof nextSource === 'string'
                    ? loadUri(nextSource)
                    : loadState(nextSource);
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

        /** Serialized like {@link load}: a newer switch overtakes a waiting one. */
        let switchGeneration = 0;
        let switchQueue: Promise<void> = Promise.resolve();

        const switchToGyro = async (
            ticket: number,
            permission: Promise<boolean>,
        ): Promise<void> => {
            if (!(await permission)) {
                throw new Error(
                    'QuickView: reading the device orientation was not permitted.',
                );
            }

            if (!gyro) {
                const { TiltController } =
                    await import('@shopware-ag/dive/tiltcontroller');

                const input = new GyroInput();
                const controller = new TiltController(
                    dive.mainView.cameraComponent,
                    { enabled: false },
                );
                controller.connect(input);
                dive.clock.addTicker(controller);
                gyro = { input, controller };
            }

            const { input, controller } = gyro;
            controller.setHome(homePose!);

            await input.enable();

            // overtaken or thrown away while the sensor woke up
            if (ticket !== switchGeneration || disposed) {
                input.disable();
                if (disposed) disposeGyro();

                return;
            }

            orbitController.enabled = false;
            controller.enabled = true;
            activeController = 'gyro';
        };

        // only ever leaves the gyro, so there is one
        const switchToOrbit = (): void => {
            const { input, controller } = gyro!;
            input.disable();
            controller.enabled = false;

            orbitController.enabled = true;
            activeController = 'orbit';
        };

        const useController = (kind: QuickViewController): Promise<void> => {
            const ticket = ++switchGeneration;

            /**
             * Asked before anything is awaited: iOS grants the sensor only while
             * the user gesture that led here is still current. Caught here so a
             * switch that gets overtaken leaves no unhandled rejection; awaiting
             * it below still sees the failure.
             */
            const permission =
                kind === 'gyro' ? GyroInput.requestPermission() : null;
            permission?.catch(() => {});

            const run = switchQueue.then(() => {
                if (ticket !== switchGeneration || disposed) return;
                if (kind === activeController) return;

                return kind === 'gyro'
                    ? switchToGyro(ticket, permission!)
                    : switchToOrbit();
            });

            // a failed switch must not block the next one
            switchQueue = run.then(
                () => {},
                () => {},
            );

            return run;
        };

        /**
         * Getters rather than fields, because `load` swaps what is there and
         * `Object.assign` would have copied whatever was current at setup.
         */
        const quickView = Object.assign(dive, {
            orbitController,
            pointerInput,
            load,
            useController,
        });
        Object.defineProperties(quickView, {
            model: { get: () => model, enumerable: true },
            state: { get: () => state, enumerable: true },
            activeController: {
                get: () => activeController,
                enumerable: true,
            },
        });

        await load(source);

        frame();

        homePose = {
            position: dive.mainView.cameraComponent.owner.position.clone(),
            target: orbitController.target.clone(),
        };

        if (settings?.autoStart ?? true) {
            await dive.startAsync();
        }

        return quickView as QuickView;
    } catch (error) {
        disposed = true;
        // never in front of the error that brought us here
        try {
            await dive.disposeAsync();
        } catch (failure) {
            console.error('Failed to clean up a QuickView:', failure);
        }

        /**
         * rethrown untouched, and not logged: the caller knows it asked for a
         * QuickView, so "during initialization" adds nothing the error does not
         * already say -- and a library that logs what it rethrows makes the same
         * failure appear twice, in a channel the caller did not choose
         */
        throw error;
    }
}
