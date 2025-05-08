/**
 * @jest-environment jsdom
 */

import { vi } from 'vitest';
import { DIVE, DIVESettings } from '../Dive.ts';
import { MathUtils } from 'three';
// Mock ResizeObserver
class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = MockResizeObserver as any;

vi.mock('../../engine/Engine', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('../../engine/Engine.ts')>();
    return {
        ...actual,
        DIVEEngine: vi.fn(function (this: any) {
            this.camera = {
                position: {
                    set: vi.fn(),
                    copy: vi.fn(),
                },
            };
            this.scene = {
                computeSceneBB: vi.fn(),
                background: {
                    set: vi.fn(),
                },
                grid: {
                    setVisibility: vi.fn(),
                },
                root: {
                    add: vi.fn(),
                    floor: {
                        setVisibility: vi.fn(),
                        setColor: vi.fn(),
                    },
                    addSceneObject: vi.fn(),
                },
            };
            this.renderer = {
                webglrenderer: {
                    domElement: {},
                },
                onResize: vi.fn(),
            };
            this.clock = {
                addTicker: vi.fn(),
                removeTicker: vi.fn(),
                tick: vi.fn(),
                dispose: vi.fn(),
            };
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

vi.mock(
    '../../modules/controller/orbit/OrbitController',
    async (importOriginal) => {
        const actual =
            await importOriginal<
                typeof import('../../modules/controller/orbit/OrbitController.ts')
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
                return this;
            }),
        };
    },
);

vi.mock('../../modules/axiscamera/AxisCamera', () => {
    return {
        DIVEAxisCamera: vi.fn(function (this: any) {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = vi.fn();
            this.position = {
                set: vi.fn(),
            };
            this.setIntensity = vi.fn();
            this.setEnabled = vi.fn();
            this.setColor = vi.fn();
            this.userData = {
                id: undefined,
            };
            this.removeFromParent = vi.fn();
            this.SetFromCameraMatrix = vi.fn();
            this.Dispose = vi.fn();
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
        expect(() => dive.Dispose()).not.toThrow();

        const settings = {
            displayAxes: true,
        };
        dive = new DIVE(settings);
        expect(() => dive.Dispose()).not.toThrow();
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
        expect(dive.canvas).toBeDefined();
    });

    it('should resize', () => {
        const dive = new DIVE();
        expect(() => dive.engine.renderer.onResize(800, 600)).not.toThrow();
    });

    it('should initialize with axis camera when displayAxes is true', () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);
        expect(dive['axisCamera']).toBeDefined();
    });

    it('should not initialize axis camera when displayAxes is false', () => {
        const settings = {
            displayAxes: false,
        } as DIVESettings;

        const dive = new DIVE(settings);
        expect(dive['axisCamera']).toBeNull();
    });

    it('should properly dispose all components', async () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);

        await dive.Dispose();

        expect(dive['orbitController'].dispose).toHaveBeenCalled();
        expect(dive['axisCamera']?.Dispose).toHaveBeenCalled();
    });

    it('should handle dispose when animation system pipeline is not initialized', () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);

        expect(() => dive.Dispose()).not.toThrow();
    });
});
