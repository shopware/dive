import { DIVEDefaultSettings } from '@shopware-ag/dive';
import type { StateData } from '@shopware-ag/dive/state';
import {
    QuickViewWithModel,
    QuickViewWithState,
    type QuickViewSettings,
} from '../types/index.ts';
import { QuickViewUri } from './uri/QuickViewUri.ts';
import { QuickViewState } from './state/QuickViewState.ts';

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
): Promise<QuickViewWithModel>;

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
): Promise<QuickViewWithState>;

export function QuickView(
    source: string | StateData,
    settings?: Partial<QuickViewSettings>,
): Promise<QuickViewWithModel | QuickViewWithState> {
    return typeof source === 'string'
        ? QuickViewUri(source, settings)
        : QuickViewState(source, settings);
}
