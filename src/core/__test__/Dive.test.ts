/**
 * @jest-environment jsdom
 */

import { DIVE, DIVESettings } from '../Dive.ts';
import { MathUtils } from 'three';
import { State } from '../../modules/state/State.ts';
import { DIVEEngine } from '../../engine/Engine.ts';
import { OrbitController } from '../../modules/controller/orbit/OrbitController.ts';

// Mock ResizeObserver
class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = MockResizeObserver as any;

jest.mock('../../engine/Engine.ts', () => {
    return {
        DIVEEngine: jest.fn(function () {
            this.camera = {};
            this.scene = {};
            this.renderer = {
                webglrenderer: {
                    domElement: {},
                },
                onResize: jest.fn(),
            };
            this.clock = {
                addTicker: jest.fn(),
                removeTicker: jest.fn(),
                tick: jest.fn(),
                dispose: jest.fn(),
            };
            return this;
        }),
    };
});

jest.mock('../../modules/index.ts', () => {
    return {
        ModuleImporter: jest.fn(function () {
            this.instantiate = jest
                .fn()
                .mockResolvedValue(
                    new State({} as DIVEEngine, {} as OrbitController),
                );
            return this;
        }),
    };
});
const test_uuid = 'test_uuid';
jest.spyOn(MathUtils, 'generateUUID').mockReturnValue(test_uuid);

jest.mock('../../modules/state/State.ts', () => {
    return {
        State: jest.fn(function () {
            this.performAction = jest.fn().mockReturnValue({
                position: { x: 0, y: 0, z: 0 },
                target: { x: 0, y: 0, z: 0 },
            });
            this.subscribe = jest.fn(
                (action: string, callback: (data: { id: string }) => void) => {
                    callback({ id: 'incorrect id' });
                    callback({ id: test_uuid });
                },
            );
            this.destroyInstance = jest.fn().mockReturnValue(true);
            return this;
        }),
    };
});

jest.mock('../../modules/controller/orbit/OrbitController.ts', () => {
    return {
        OrbitController: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.position = {
                set: jest.fn(),
            };
            this.SetIntensity = jest.fn();
            this.SetEnabled = jest.fn();
            this.SetColor = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.removeFromParent = jest.fn();
            this.dispose = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../modules/axiscamera/AxisCamera.ts', () => {
    return {
        DIVEAxisCamera: jest.fn(function () {
            this.isObject3D = true;
            this.parent = null;
            this.dispatchEvent = jest.fn();
            this.position = {
                set: jest.fn(),
            };
            this.SetIntensity = jest.fn();
            this.SetEnabled = jest.fn();
            this.SetColor = jest.fn();
            this.userData = {
                id: undefined,
            };
            this.removeFromParent = jest.fn();
            this.SetFromCameraMatrix = jest.fn();
            this.Dispose = jest.fn();
            return this;
        }),
    };
});

describe('DIVE', () => {
    beforeEach(() => {
        console.log = jest.fn();
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
        expect((window as any).DIVE.PrintScene).toBeDefined();
        expect(() => (window as any).DIVE.PrintScene()).not.toThrow();
    });

    it('should instantiate in development DIVE_NODE_ENV', () => {
        process.env.DIVE_NODE_ENV = 'development';
        const dive = new DIVE();
        expect(dive).toBeDefined();
        expect((window as any).DIVE.PrintScene).toBeDefined();
        expect(() => (window as any).DIVE.PrintScene()).not.toThrow();
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
