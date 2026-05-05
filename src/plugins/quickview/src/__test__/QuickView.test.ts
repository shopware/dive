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
                    renderer: {},
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
                startAsync: vi.fn(async () => {}),
                disposeAsync: vi.fn(async () => {}),
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
                dispose: vi.fn(),
            };
        }),
    };
});

vi.mock('@shopware-ag/dive/hdr', () => {
    return {
        HDREnvironment: vi.fn(() => {
            return {
                enable: vi.fn(),
            };
        }),
        HDREnvironmentDefaultSettings: {
            enabled: false,
            imageUrl: '',
            useAsBackground: false,
            replaceLights: false,
        },
    };
});

describe('QuickView', () => {
    beforeEach(() => {
        console.log = vi.fn();
    });

    it('should QuickView', async () => {
        const dive = await QuickView('test_uri');

        expect(dive).toBeDefined();
        expect(DIVE).toHaveBeenCalledWith({ autoStart: false });
        expect(dive.startAsync).toHaveBeenCalledTimes(1);
    });

    it('should handle QuickView with multiple instances', async () => {
        const dive1 = await QuickView('test_uri');
        const dive2 = await QuickView('test_uri');
        expect(dive1).toBeDefined();
        expect(dive2).toBeDefined();
    });

    it('should QuickView with settings', async () => {
        const settings = {
            autoStart: false,
            backgroundColor: 0xff0000,
            displayGrid: true,
            displayFloor: false,
            lightIntensity: 2,
        };
        const dive = await QuickView('test_uri', settings);

        expect(dive).toBeDefined();
        expect(DIVE).toHaveBeenCalledWith({ ...settings, autoStart: false });
        expect(dive.startAsync).not.toHaveBeenCalled();
    });

    it('should dispose orbit controls before disposing the wrapped DIVE instance', async () => {
        const quickView = await QuickView('test_uri');

        await quickView.disposeAsync();

        expect(quickView.orbitController.dispose).toHaveBeenCalledTimes(1);
        expect(quickView.disposeAsync).toBeDefined();
    });
});
