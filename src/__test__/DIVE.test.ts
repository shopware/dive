import DIVE, { DIVESettings } from '../dive.ts';

jest.mock('three', () => {
    return {
        Vector4: jest.fn(),
        WebGLRenderer: jest.fn(function () {
            this.domElement = {
                clientWidth: 800,
                clientHeight: 600,
                style: {
                    position: 'absolute',
                },
            };
            this.domElement.parentElement = this.domElement;
            this.debug = {
                checkShaderErrors: true,
            };
            this.setSize = jest.fn();
            this.setPixelRatio = jest.fn();
            this.render = jest.fn();
            this.setAnimationLoop = jest.fn();
            this.shadowMap = {
                enabled: false,
            };
            return this;
        }),
        MathUtils: {
            generateUUID: () => { return 'test_uuid'; },
        },
    }
});

jest.mock('../renderer/Renderer.ts', () => {
    return jest.fn(function () {
        this.domElement = {
            clientWidth: 800,
            clientHeight: 600,
            style: {
                position: 'absolute',
            },
        };
        this.domElement.parentElement = this.domElement;
        this.AddPreRenderCallback = (callback: () => void) => {
            callback();
        };
        this.RemovePreRenderCallback = jest.fn();
        this.AddPostRenderCallback = (callback: () => void) => {
            callback();
        };
        this.getViewport = jest.fn();
        this.setViewport = jest.fn();
        this.autoClear = false;
        this.render = jest.fn();
        this.StartRenderer = jest.fn();
        this.OnResize = jest.fn();

        return this;
    });
});

jest.mock('../scene/Scene.ts', () => {
    return jest.fn(function () {
        this.add = jest.fn();
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../camera/PerspectiveCamera.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        this.OnResize = jest.fn();
        return this;
    });
});

jest.mock('../controls/OrbitControls.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../toolbox/Toolbox.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        return this;
    });
});

jest.mock('../axiscamera/AxisCamera.ts', () => {
    return jest.fn(function () {
        this.isObject3D = true;
        this.parent = null;
        this.dispatchEvent = jest.fn();
        this.position = {
            set: jest.fn(),
        }
        this.SetIntensity = jest.fn();
        this.SetEnabled = jest.fn();
        this.SetColor = jest.fn();
        this.userData = {
            id: undefined,
        }
        this.removeFromParent = jest.fn();
        this.SetFromCameraMatrix = jest.fn();
        return this;
    });
});

describe('dive/DIVE', () => {
    it('should instantiate', () => {
        const dive = new DIVE();
        expect(dive).toBeDefined();
    });

    it('should instantiate with settings', () => {
        const settings = {
            autoResize: false,
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
            orbitControls: {
                enableDamping: false,
                dampingFactor: 0,
            }
        } as DIVESettings;
        const dive = new DIVE(settings);
        expect(dive).toBeDefined();
    });

    it('should have Canvas', () => {
        const dive = new DIVE();
        expect(dive.Canvas).toBeDefined();
    });

    it('should have Communication', () => {
        const dive = new DIVE();
        expect(dive.Communication).toBeDefined();
    });

    it('should resize', () => {
        const dive = new DIVE();
        expect(() => dive.OnResize(800, 600)).not.toThrow();
    });

    it('should update settings', () => {
        const dive = new DIVE();
        dive.Settings = {
            autoResize: false,
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
            orbitControls: {
                enableDamping: false,
                dampingFactor: 0,
            }
        }

        dive.Settings = {
            autoResize: true,
        }

        Object.assign(dive.Canvas, { parentElement: null });

        dive.Settings = {
            autoResize: false,
        }

        dive.Settings = {
            autoResize: true,
        }
    });


});