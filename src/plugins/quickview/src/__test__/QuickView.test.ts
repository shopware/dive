/**
 * @jest-environment jsdom
 */

import { vi } from 'vitest';
import type { StateData } from '@shopware-ag/dive/state';
import { QuickView, QuickViewDefaultSettings } from '../QuickView.ts';
import { QuickViewUri } from '../uri/QuickViewUri.ts';
import { QuickViewState } from '../state/QuickViewState.ts';
import {
    type QuickViewWithModel,
    type QuickViewWithState,
} from '../../types/index.ts';

const uriResult = { source: 'uri' } as unknown as QuickViewWithModel;
const stateResult = { source: 'state' } as unknown as QuickViewWithState;

vi.mock('../uri/QuickViewUri.ts', () => ({
    QuickViewUri: vi.fn(async () => uriResult),
}));

vi.mock('../state/QuickViewState.ts', () => ({
    QuickViewState: vi.fn(async () => stateResult),
}));

vi.mock('@shopware-ag/dive', () => ({
    DIVEDefaultSettings: {
        backgroundColor: '#000000',
        displayGrid: false,
        displayFloor: false,
        lightIntensity: 1,
    },
}));

const settings = { autoStart: false, displayGrid: true };

const state = {
    name: 'scene',
    objects: [],
} as unknown as StateData;

describe('QuickView', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('routes a string source to the uri implementation', async () => {
        const result = await QuickView('test_uri');

        expect(QuickViewUri).toHaveBeenCalledWith('test_uri', undefined);
        expect(QuickViewState).not.toHaveBeenCalled();
        expect(result).toBe(uriResult);
    });

    it('routes a state object to the state implementation', async () => {
        const result = await QuickView(state);

        expect(QuickViewState).toHaveBeenCalledWith(state, undefined);
        expect(QuickViewUri).not.toHaveBeenCalled();
        expect(result).toBe(stateResult);
    });

    it('forwards the settings to the uri implementation', async () => {
        await QuickView('test_uri', settings);

        expect(QuickViewUri).toHaveBeenCalledWith('test_uri', settings);
    });

    it('forwards the settings to the state implementation', async () => {
        await QuickView(state, settings);

        expect(QuickViewState).toHaveBeenCalledWith(state, settings);
    });

    it('treats an empty string as a uri rather than as state', async () => {
        await QuickView('');

        expect(QuickViewUri).toHaveBeenCalledWith('', undefined);
        expect(QuickViewState).not.toHaveBeenCalled();
    });

    it('propagates a rejection from the selected implementation', async () => {
        vi.mocked(QuickViewUri).mockRejectedValueOnce(new Error('load failed'));

        await expect(QuickView('test_uri')).rejects.toThrow('load failed');
    });

    it('exposes the DIVE defaults as QuickView defaults', () => {
        expect(QuickViewDefaultSettings).toMatchObject({
            backgroundColor: '#000000',
            displayGrid: false,
            displayFloor: false,
            lightIntensity: 1,
        });
    });
});
