/**
 * @jest-environment jsdom
 */

import { vi } from 'vitest';
import { DIVE, DIVESettings } from '../Dive.ts';
import { MathUtils } from 'three/webgpu';

const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

// Mock ResizeObserver
class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = MockResizeObserver as any;

vi.mock('../../components/boundingbox/BoundingBox.ts', () => ({
    BoundingBox: vi.fn(),
}));

vi.mock('../view/View.ts', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../view/View.ts')>();
    return {
        ...actual,
        DIVEView: vi.fn(function (this: any) {
            const renderer = {
                initialized: false,
                canvas: {
                    parentElement: document.createElement('div'),
                    getBoundingClientRect: vi.fn().mockReturnValue({
                        width: 100,
                        height: 100,
                    }),
                },
                init: vi.fn(() => {
                    renderer.initialized = true;
                    return Promise.resolve();
                }),
                dispose: vi.fn(),
                onResize: vi.fn(),
                render: vi.fn(),
                setCanvas: vi.fn(),
            };
            this.dispose = vi.fn();
            this.onResize = vi.fn();
            this.tick = vi.fn();
            this.setCanvas = vi.fn();
            this.renderer = renderer;
            this.camera = {
                position: {
                    set: vi.fn(),
                },
            };
            this.canvas = renderer.canvas;
            return this;
        }),
    };
});

vi.mock('../scene/Scene.ts', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../scene/Scene.ts')>();
    return {
        ...actual,
        DIVEScene: vi.fn(function (this: any) {
            this.add = vi.fn();
            this.background = {
                set: vi.fn(),
            };
            this.setBackground = vi.fn();
            this.setGrid = vi.fn();
            this.setRoot = vi.fn();
            this.setRootFloor = vi.fn();
            this.setRootFloorColor = vi.fn();
            this.addSceneObject = vi.fn();
            this.dispose = vi.fn();
            this.grid = {
                setVisibility: vi.fn(),
            };
            this.root = {
                add: vi.fn(),
                floor: {
                    setVisibility: vi.fn(),
                    setColor: vi.fn(),
                },
                addSceneObject: vi.fn(),
            };
            return this;
        }),
    };
});

vi.mock('../camera/PerspectiveCamera.ts', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('../camera/PerspectiveCamera.ts')>();
    return {
        ...actual,
        DIVEPerspectiveCamera: vi.fn(function (this: any) {
            this.position = {
                set: vi.fn(),
                copy: vi.fn(),
            };
            return this;
        }),
    };
});

vi.mock('../clock/Clock.ts', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../clock/Clock.ts')>();
    return {
        ...actual,
        DIVEClock: vi.fn(function (this: any) {
            this.addTicker = vi.fn();
            this.removeTicker = vi.fn();
            this.tick = vi.fn();
            this.dispose = vi.fn();
            this.start = vi.fn();
            this.stop = vi.fn();
            return this;
        }),
    };
});

vi.mock('../renderer/Renderer.ts', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('../renderer/Renderer.ts')>();
    return {
        ...actual,
        DIVERenderer: vi.fn(function (this: any) {
            this.canvas = {
                parentElement: document.createElement('div'),
                getBoundingClientRect: vi.fn().mockReturnValue({
                    width: 100,
                    height: 100,
                }),
            };
            this.dispose = vi.fn();
            this.onResize = vi.fn();
            this.render = vi.fn();
            this.setSize = vi.fn();
            this.setPixelRatio = vi.fn();
            this.setViewport = vi.fn();
            this.getViewport = vi.fn();
            return this;
        }),
    };
});

const test_uuid = 'test_uuid';
vi.spyOn(MathUtils, 'generateUUID').mockReturnValue(test_uuid);

vi.mock('@shopware-ag/dive/orbitcontroller', async (importOriginal) => {
    const actual =
        await importOriginal<
            typeof import('@shopware-ag/dive/orbitcontroller')
        >();
    return {
        ...actual,
        OrbitController: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.position = {
                set: vi.fn(),
            };
            this.target = {
                set: vi.fn(),
                copy: vi.fn(),
            };
            this.setIntensity = vi.fn();
            this.setEnabled = vi.fn();
            this.setColor = vi.fn();
            this.userData = {
                id: undefined,
            };
            this.removeFromParent = vi.fn();
            this.dispose = vi.fn();
            this.computeEncompassingView = vi.fn().mockReturnValue({
                position: { x: 0, y: 0, z: 0 },
                target: { x: 0, y: 0, z: 0 },
            });
            this.focusObject = vi.fn();
            return this;
        }),
    };
});

vi.mock('@shopware-ag/dive/orientationdisplay', () => {
    return {
        OrientationDisplay: vi.fn(function (this: any) {
            this.tick = vi.fn();
            this.dispose = vi.fn();
            return this;
        }),
    };
});

vi.mock('../../components/model/Model', () => {
    return {
        DIVEModel: vi.fn(function (this: any) {
            this.userData = {
                id: undefined,
                uri: undefined,
            };
            this.setFromURL = vi.fn();
            this.visible = true;
            this.name = 'test_model';
            this.position = {
                set: vi.fn(),
            };
            this.rotation = {
                set: vi.fn(),
            };
            this.scale = {
                set: vi.fn(),
            };
            this.dispose = vi.fn();
            return this;
        }),
    };
});

describe('DIVE', () => {
    beforeEach(() => {
        window.DIVE.instances = [];
        console.log = vi.fn();
    });

    it('should instantiate', () => {
        const dive = new DIVE();
        expect(dive).toBeDefined();
    });

    it('should instantiate in development DIVE_NODE_ENV', () => {
        process.env.DIVE_NODE_ENV = 'development';
        const dive = new DIVE();
        expect(dive).toBeDefined();
    });

    it('should dispose', () => {
        let dive = new DIVE();
        expect(() => dive.dispose()).not.toThrow();

        const settings = {
            displayAxes: true,
        };
        dive = new DIVE(settings);
        expect(() => dive.dispose()).not.toThrow();
    });

    it('should instantiate with settings', () => {
        const settings = {
            autoResize: false,
            displayAxes: true,
            autoStart: true,
            renderPipeline: {},
            renderer: {
                antialias: false,
                alpha: false,
                stencil: false,
                shadowMapEnabled: false,
                shadowMapType: 0,
                toneMapping: 0,
            },
            perspectiveCamera: {
                fov: 0,
                near: 0,
                far: 0,
            },
            orbitController: {
                enableDamping: false,
                dampingFactor: 0,
            },
            backgroundColor: '#ffffff',
            displayGrid: false,
            displayFloor: false,
        };
        const dive = new DIVE(settings);
        expect(dive).toBeDefined();
    });

    it('should have Canvas', () => {
        const dive = new DIVE();
        expect(dive.mainView.canvas).toBeDefined();
    });

    it('should resize', () => {
        const dive = new DIVE();
        expect(() => dive.mainView.onResize(800, 600)).not.toThrow();
    });

    it('should initialize with axis camera when displayAxes is true', async () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);
        await waitForAsync();
        expect(dive['_orientationDisplay']).toBeDefined();
    });

    it('should not initialize axis camera when displayAxes is false', () => {
        const settings = {
            displayAxes: false,
        } as DIVESettings;

        const dive = new DIVE(settings);
        expect(dive['_orientationDisplay']).toBeNull();
    });

    it('should properly dispose all components', async () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);

        const orientationDisplay = {
            dispose: vi.fn(),
        } as any;
        dive['_orientationDisplay'] = orientationDisplay;

        await dive.dispose();

        expect(orientationDisplay.dispose).toHaveBeenCalled();
        expect(dive.clock.dispose).toHaveBeenCalled();
    });

    it('should handle dispose when animation system pipeline is not initialized', () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);

        expect(() => dive.dispose()).not.toThrow();
    });

    it('should add a new instance to the instances list', () => {
        const dive = new DIVE();
        expect(window.DIVE.instances).toContain(dive);
    });

    it('should start the clock', () => {
        const dive = new DIVE();
        dive.start();
        return waitForAsync().then(() => {
            expect(dive.clock.start).toHaveBeenCalled();
        });
    });

    it('should log renderer initialization failures from start', async () => {
        const error = new Error('renderer failed');
        const errorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {});
        const dive = new DIVE({
            autoStart: false,
        });

        dive.mainView.renderer.init.mockRejectedValueOnce(error);
        dive.start();
        await waitForAsync();

        expect(errorSpy).toHaveBeenCalledWith(
            'DIVE.start: Failed to initialize the WebGPU renderer.',
            error,
        );
    });

    it('should expose an explicit async start path', async () => {
        const dive = new DIVE({
            autoStart: false,
        });

        await dive.startAsync();

        expect(dive.mainView.renderer.init).toHaveBeenCalled();
        expect(dive.clock.start).toHaveBeenCalled();
    });

    it('should stop the clock', () => {
        const dive = new DIVE();
        dive.stop();
        expect(dive.clock.stop).toHaveBeenCalled();
    });

    it('should not start the clock after dispose when renderer init resolves late', async () => {
        const dive = new DIVE({
            autoStart: false,
        });
        let resolveInit: (() => void) | undefined;

        dive.mainView.renderer.init.mockImplementationOnce(
            () =>
                new Promise<void>((resolve) => {
                    resolveInit = resolve;
                }),
        );

        const pendingStart = dive.startAsync();
        await dive.dispose();

        resolveInit?.();
        await pendingStart;

        expect(dive.clock.start).not.toHaveBeenCalled();
    });

    it('should get the canvas', () => {
        const dive = new DIVE();
        const canvas = dive.canvas;
        expect(canvas).toBeDefined();
    });

    it('should get the first instance', () => {
        const dive = new DIVE();
        expect(window.DIVE.instance).toBe(dive);
    });
});
