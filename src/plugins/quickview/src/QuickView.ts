import { DIVE, DIVEDefaultSettings, DIVENode } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import type { State, StateData } from '@shopware-ag/dive/state';
import { type QuickViewSettings } from '../types/index.ts';
import { QuickViewUri } from './uri/QuickViewUri.ts';
import { QuickViewState } from './state/QuickViewState.ts';

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
 * One type rather than two, because what the two ways of building a QuickView
 * share is everything except a single field. `Extra` is that field, and it
 * defaults to the ordinary case: a URI gives you `model`, scene state gives you
 * `QuickView<{ state: State }>` instead -- there is no single model to hand out
 * when the data describes any number of objects.
 *
 * The overloads pick the right one, so the parameter is something to read rather
 * than something to write.
 */
export type QuickView<Extra = { model: DIVENode }> = DIVE & {
    orbitController: OrbitController;
} & Extra;

export const QuickViewDefaultSettings: Omit<
    Required<QuickViewSettings>,
    'hdr'
> = {
    ...DIVEDefaultSettings,
};

/**
 * Creates a QuickView from a model URI.
 *
 * @param uri - The URI of the 3D model to display in QuickView
 * @param settings - The settings for the QuickView
 * @returns The DIVE instance with the orbit controller and hdr environment - { ...DIVE, orbitController: OrbitController, hdr: HDREnvironment }
 */
export function QuickView(
    uri: string,
    settings?: Partial<QuickViewSettings>,
): Promise<QuickView>;

/**
 * Creates a QuickView from scene state.
 *
 * @param state - The scene data to display in QuickView
 * @param settings - The settings for the QuickView
 * @returns The DIVE instance with the orbit controller and hdr environment - { ...DIVE, orbitController: OrbitController, hdr: HDREnvironment }
 */
export function QuickView(
    state: StateData,
    settings?: Partial<QuickViewSettings>,
): Promise<QuickView<{ state: State }>>;

export function QuickView(
    source: string | StateData,
    settings?: Partial<QuickViewSettings>,
): Promise<QuickView | QuickView<{ state: State }>> {
    return typeof source === 'string'
        ? QuickViewUri(source, settings)
        : QuickViewState(source, settings);
}
