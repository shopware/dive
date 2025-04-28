/**
 * @jest-environment jsdom
 */

import { DIVE, DIVESettings } from '../Dive.ts';
import { DIVERenderPipeline } from '../../engine/renderer/Renderer.ts';
import { DIVEScene } from '../../engine/scene/Scene.ts';
import { DIVEPerspectiveCamera } from '../../engine/camera/PerspectiveCamera.ts';
import { DIVEClock } from '../../engine/clock/Clock.ts';

// Mock ResizeObserver
class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = MockResizeObserver as any;

jest.mock('../../engine/renderer/Renderer.ts', () => {
    return {
        DIVERenderPipeline: jest.fn(function () {
            this.render = jest.fn();
            this.onResize = jest.fn();
            this.dispose = jest.fn();
            this.webglrenderer = {
                domElement: {},
            };
            return this;
        }),
    };
});

jest.mock('../../engine/clock/Clock.ts', () => {
    return {
        DIVEClock: jest.fn(function () {
            this.addTicker = jest.fn();
            this.removeTicker = jest.fn();
            this.start = jest.fn();
            this.stop = jest.fn();
            this.dispose = jest.fn();
            this.setRenderer = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../engine/Engine.ts', () => {
    return {
        DIVEEngine: jest.fn(function () {
            this.renderer = new DIVERenderPipeline(
                {} as DIVEScene,
                {} as DIVEPerspectiveCamera,
            );
            this.clock = new DIVEClock();
            return this;
        }),
    };
});

jest.mock('../../modules/com/Communication.ts', () => {
    return {
        DIVECommunication: jest.fn(function () {
            this.PerformAction = jest.fn().mockReturnValue({
                position: { x: 0, y: 0, z: 0 },
                target: { x: 0, y: 0, z: 0 },
            });
            this.Subscribe = jest.fn(
                (action: string, callback: (data: { id: string }) => void) => {
                    callback({ id: 'incorrect id' });
                    callback({ id: 'test_uuid' });
                },
            );
            this.DestroyInstance = jest.fn();

            return this;
        }),
    };
});

jest.mock('../../modules/controller/orbit/OrbitController.ts', () => {
    return {
        DIVEOrbitController: jest.fn(function () {
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
            this.Dispose = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../modules/toolbox/Toolbox.ts', () => {
    return {
        DIVEToolbox: jest.fn(function () {
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
            this.Dispose = jest.fn();
            this.removeFromParent = jest.fn();
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

jest.mock('../../modules/animation/AnimationSystem.ts', () => {
    return {
        DIVEAnimationSystem: jest.fn(function () {
            this.Update = jest.fn();
            this.Dispose = jest.fn();
            return this;
        }),
    };
});

console.log = jest.fn();

describe('dive/DIVE', () => {
    it('should QuickView', async () => {
        const dive = await DIVE.QuickView('test_uri');
        expect(dive).toBeDefined();
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

    it('should have Communication', () => {
        const dive = new DIVE();
        expect(dive.communication).toBeDefined();
    });

    it('should resize', () => {
        const dive = new DIVE();
        expect(() => dive.engine.renderer.onResize(800, 600)).not.toThrow();
    });

    it('should handle QuickView with multiple instances', async () => {
        const dive1 = await DIVE.QuickView('test_uri1');

        expect((window as any).DIVE.instances).toHaveLength(1);
        expect((window as any).DIVE.instances[0]).toBe(dive1);
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

    it('should properly dispose all components', () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);

        dive.Dispose();

        expect(dive['orbitControls'].Dispose).toHaveBeenCalled();
        expect(dive['axisCamera']?.Dispose).toHaveBeenCalled();
        expect(dive['animationSystem'].Dispose).toHaveBeenCalled();
        expect(dive['toolbox'].Dispose).toHaveBeenCalled();
        expect(dive['_communication'].DestroyInstance).toHaveBeenCalled();
    });

    it('should handle dispose when animation system pipeline is not initialized', () => {
        const settings = {
            displayAxes: true,
        } as DIVESettings;

        const dive = new DIVE(settings);

        expect(() => dive.Dispose()).not.toThrow();
    });
});
