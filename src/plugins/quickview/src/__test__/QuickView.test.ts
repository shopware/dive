/**
 * @jest-environment jsdom
 */

import { vi } from 'vitest';
import { DIVE, DIVEModel } from '@shopware-ag/dive';
import { QuickView } from '../QuickView.ts';

vi.mock('@shopware-ag/dive', () => {
    return {
        DIVE: vi.fn(() => {
            return {
                mainView: {
                    canvas: vi.fn(),
                    camera: {
                        position: {
                            set: vi.fn(),
                        },
                    },
                },
                scene: {
                    setBackground: vi.fn(),
                    grid: {
                        setVisibility: vi.fn(),
                    },
                    root: {
                        add: vi.fn(),
                        floor: {
                            setVisibility: vi.fn(),
                        },
                    },
                },
                clock: {
                    addTicker: vi.fn(),
                },
            };
        }),
        DIVEDefaultSettings: {
            backgroundColor: '#000000',
            displayGrid: false,
            displayFloor: false,
            lightIntensity: 1,
        },
        DIVEModel: vi.fn(function (this: DIVEModel) {
            this.placeOnFloor = vi.fn();
            this.setFromURL = vi.fn(async () => this);
            return this;
        }),
        DIVESceneLight: vi.fn(() => {
            return {
                setIntensity: vi.fn(),
            };
        }),
    };
});

vi.mock('@shopware-ag/dive/orbitcontroller', () => {
    return {
        OrbitController: vi.fn(() => {
            return {
                focusObject: vi.fn(),
            };
        }),
    };
});

describe('QuickView', () => {
    beforeEach(() => {
        console.log = vi.fn();
    });

    it('should QuickView', async () => {
        const dive = await QuickView('test_uri');
        expect(dive).toBeDefined();
    });

    it('should handle QuickView with multiple instances', async () => {
        const dive1 = await QuickView('test_uri');
        const dive2 = await QuickView('test_uri');
        expect(dive1).toBeDefined();
        expect(dive2).toBeDefined();
    });

    it('should QuickView with settings', async () => {
        const settings = {
            backgroundColor: 0xff0000,
            displayGrid: true,
            displayFloor: false,
            lightIntensity: 2,
        };
        const dive = await QuickView('test_uri', settings);

        expect(dive).toBeDefined();
    });
});
