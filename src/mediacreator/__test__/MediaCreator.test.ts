import { DIVEMediaCreator } from '../MediaCreator';
import { DIVERenderer } from '../../renderer/Renderer';
import { DIVEScene } from '../../scene/Scene';
import DIVEPerspectiveCamera, { DIVEPerspectiveCameraDefaultSettings } from '../../camera/PerspectiveCamera';
import { COMPov } from '../../com';
import DIVEOrbitControls from '../../controls/OrbitControls';
import { DIVEAnimationSystem } from '../../animation/AnimationSystem';

/**
 * @jest-environment jsdom
 */

const mock_render = jest.fn();
const mock_toDataURL = jest.fn();

jest.mock('../../scene/Scene', () => {
    return jest.fn(() => {
        return {};
    });
});

jest.mock('../../camera/PerspectiveCamera', () => {
    return jest.fn(function () {
        this.position = {
            clone: jest.fn(),
            copy: jest.fn(),
        };
        this.quaternion = {
            clone: jest.fn(),
            copy: jest.fn(),
        };
        this.orbitControls = {
            target: {
                clone: jest.fn(),
                copy: jest.fn(),
            },
            update: jest.fn(),
        };
        this.layers = {
            mask: 0,
        }
        return this;
    });
});

jest.mock('../../controls/OrbitControls', () => {
    return jest.fn(function () {
        this.object = {
            position: {
                clone: jest.fn(),
                copy: jest.fn(),
            },
            quaternion: {
                clone: jest.fn(),
                copy: jest.fn(),
            },
            layers: {
                mask: 0,
            },
            OnResize: jest.fn(),
        };

        this.target = {
            clone: jest.fn(),
            copy: jest.fn(),
        };

        this.update = jest.fn();

        return this;
    });
});

jest.mock('../../renderer/Renderer', () => {
    return {
        DIVERenderer: jest.fn(function () {
            this.domElement = {
                toDataURL: mock_toDataURL,
            }
            this.render = mock_render;
            this.OnResize = jest.fn();
            return this;
        })
    }
});

jest.mock('../../animation/AnimationSystem', () => {
    return {
        DIVEAnimationSystem: jest.fn(function () {
            this.domElement = {
                toDataURL: mock_toDataURL,
            }
            this.render = mock_render;
            this.OnResize = jest.fn();
            this.AddPreRenderCallback = jest.fn((callback) => {
                callback();
                return 'id';
            });
            return this;
        })
    }
});

let mediaCreator: DIVEMediaCreator;

describe('dive/mediacreator/DIVEMediaCreator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mediaCreator = new DIVEMediaCreator(new DIVERenderer(), new DIVEScene(), new DIVEOrbitControls(new DIVEPerspectiveCamera(DIVEPerspectiveCameraDefaultSettings), new DIVERenderer(), new DIVEAnimationSystem(new DIVERenderer())));
    });

    it('should instantiate', () => {
        expect(mediaCreator).toBeDefined();
    });

    it('should generate media', () => {
        const mock_POV = {
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 }
        } as COMPov;
        expect(() => {
            mediaCreator.GenerateMedia(mock_POV.position, mock_POV.target, 800, 600)
        }).not.toThrow();
        expect(mock_render).toHaveBeenCalledTimes(1);
        expect(mock_toDataURL).toHaveBeenCalledTimes(1);
    });

    it('should draw canvas with custom canvas', () => {
        const canvas = document.createElement('canvas');
        mediaCreator.DrawCanvas(canvas);
        expect(mock_render).toHaveBeenCalledTimes(1);
    });
});
