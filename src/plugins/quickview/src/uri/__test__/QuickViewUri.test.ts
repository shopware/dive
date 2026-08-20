/**
 * @jest-environment jsdom
 */

import { vi } from 'vitest';
import { DIVE, DIVENode, ModelComponent } from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { QuickViewUri } from '../QuickViewUri.ts';

// shared across instances, because QuickViewUri replaces disposeAsync on the
// returned object and the mesh component's loader is created per instance
const { setFromURL, diveDisposeAsync } = vi.hoisted(() => ({
    setFromURL: vi.fn(),
    diveDisposeAsync: vi.fn(async () => {}),
}));

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
                    // the controller drives the component, not the camera
                    cameraComponent: { owner: { position: { set: vi.fn() } } },
                },
                scene: {
                    root: {
                        add: vi.fn(),
                    },
                },
                clock: {
                    addTicker: vi.fn(),
                },
                startAsync: vi.fn(async () => {}),
                disposeAsync: diveDisposeAsync,
            };
        }),
        DIVENode: vi.fn(function (this: DIVENode) {
            this.dropIt = vi.fn();
            this.addComponent = vi.fn((component) => component);
            return this;
        }),
        ModelComponent: vi.fn(function (this: ModelComponent) {
            this.setFromURL = setFromURL.mockImplementation(async () => this);
            return this;
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

describe('QuickViewUri', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        console.error = vi.fn();
    });

    it('loads the model from the given uri', async () => {
        const quickView = await QuickViewUri('test_uri');

        expect(setFromURL).toHaveBeenCalledWith('test_uri');
        expect(quickView.model).toBeDefined();
    });

    it('grounds the loaded model in the scene', async () => {
        const quickView = await QuickViewUri('test_uri');

        expect(quickView.scene.root.add).toHaveBeenCalledWith(quickView.model);
        expect(quickView.model.dropIt).toHaveBeenCalledTimes(1);
    });

    it('creates the DIVE instance without auto start and starts it afterwards', async () => {
        const quickView = await QuickViewUri('test_uri');

        expect(DIVE).toHaveBeenCalledWith({ autoStart: false });
        expect(quickView.startAsync).toHaveBeenCalledTimes(1);
    });

    it('registers the orbit controller as a ticker and focuses the model', async () => {
        const quickView = await QuickViewUri('test_uri');

        expect(OrbitController).toHaveBeenCalledWith(
            quickView.mainView.cameraComponent,
            quickView.mainView.canvas,
        );
        expect(quickView.clock.addTicker).toHaveBeenCalledWith(
            quickView.orbitController,
        );
        expect(quickView.orbitController.focusObject).toHaveBeenCalledWith(
            quickView.model,
        );
    });

    it('forwards the settings but keeps auto start disabled', async () => {
        const settings = {
            autoStart: false,
            backgroundColor: 0xff0000,
            displayGrid: true,
            displayFloor: false,
            lightIntensity: 2,
        };

        const quickView = await QuickViewUri('test_uri', settings);

        expect(DIVE).toHaveBeenCalledWith({ ...settings, autoStart: false });
        expect(quickView.startAsync).not.toHaveBeenCalled();
        expect(quickView.orbitController.focusObject).not.toHaveBeenCalled();
    });

    it('disposes the orbit controller before the wrapped DIVE instance', async () => {
        const quickView = await QuickViewUri('test_uri');

        await quickView.disposeAsync();

        const controllerDispose = vi.mocked(quickView.orbitController.dispose);
        expect(controllerDispose).toHaveBeenCalledTimes(1);
        expect(diveDisposeAsync).toHaveBeenCalledTimes(1);
        expect(controllerDispose.mock.invocationCallOrder[0]).toBeLessThan(
            diveDisposeAsync.mock.invocationCallOrder[0],
        );
    });

    it('rejects when the DIVE instance cannot be created', async () => {
        vi.mocked(DIVE).mockImplementationOnce(() => {
            throw new Error('DIVE initialization error');
        });

        await expect(QuickViewUri('test_uri')).rejects.toThrow(
            'DIVE initialization error',
        );
        expect(console.error).toHaveBeenCalled();
    });

    it('creates an independent instance per call', async () => {
        const first = await QuickViewUri('first_uri');
        const second = await QuickViewUri('second_uri');

        expect(first).not.toBe(second);
        expect(DIVE).toHaveBeenCalledTimes(2);
    });
});
