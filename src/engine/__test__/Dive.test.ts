/**
 * @jest-environment jsdom
 */

import { vi } from 'vitest';
import { DIVE, DIVESettings } from '../Dive.ts';
import { MathUtils } from 'three';
import { DIVEClock } from '../clock/Clock.ts';
import { DIVERenderer } from '../renderer/Renderer.ts';
import { DIVEScene } from '../scene/Scene.ts';
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
            this.dispose = vi.fn();
            this.onResize = vi.fn();
            this.tick = vi.fn();
            this.camera = {
                position: {
                    set: vi.fn(),
                },
            };
            this.canvas = {
                parentElement: document.createElement('div'),
                getBoundingClientRect: vi.fn().mockReturnValue({
                    width: 100,
                    height: 100,
                }),
            };
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

vi.mock('../../modules/ModuleRegistry', () => {
    return {
        getModule: vi.fn().mockReturnValue(
            vi.fn(function (this: any) {
                this.performAction = vi.fn().mockReturnValue({
                    position: { x: 0, y: 0, z: 0 },
                    target: { x: 0, y: 0, z: 0 },
                });
                this.subscribe = vi.fn(
                    (
                        action: string,
                        callback: (data: { id: string }) => void,
                    ) => {
                        callback({ id: 'incorrect id' });
                        callback({ id: test_uuid });
                    },
                );
                this.destroyInstance = vi.fn().mockReturnValue(true);
                return this;
            }),
        ),
    };
});

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
        console.log = vi.fn();
    });

    it('should QuickView', async () => {
        const dive = await DIVE.QuickView('test_uri');
        expect(dive).toBeDefined();
    });

    it('should handle QuickView with multiple instances', async () => {
        const dive1 = await DIVE.QuickView('test_uri');
        const dive2 = await DIVE.QuickView('test_uri');
        expect(dive1).toBeDefined();
        expect(dive2).toBeDefined();
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
        } as DIVESettings;
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

    it('should initialize with axis camera when displayAxes is true', () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);
        expect(dive['orientationDisplay']).toBeDefined();
    });

    it('should not initialize axis camera when displayAxes is false', () => {
        const settings = {
            displayAxes: false,
        } as DIVESettings;

        const dive = new DIVE(settings);
        expect(dive['orientationDisplay']).toBeNull();
    });

    it('should properly dispose all components', async () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);

        await dive.dispose();

        expect(dive['orientationDisplay']?.dispose).toHaveBeenCalled();
    });

    it('should handle dispose when animation system pipeline is not initialized', () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);

        expect(() => dive.dispose()).not.toThrow();
    });
});
