import { MediaCreator } from '../MediaCreator';
import { DIVERenderer } from '../../../engine/renderer/Renderer';
import { DIVEScene } from '../../../engine/scene/Scene';
import {
    DIVEPerspectiveCamera,
    DIVEPerspectiveCameraDefaultSettings,
} from '../../../engine/camera/PerspectiveCamera';
import { type COMPov } from '../../../modules/com/types';
import { DIVEOrbitController } from '../../../modules/controller/orbit/OrbitController';
import { DIVEAnimationSystem } from '../../../modules/animation/AnimationSystem';
import { DIVERenderPipeline } from '../../../engine/pipeline/RenderPipeline';

/**
 * @jest-environment jsdom
 */

// Mock ResizeObserver
class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = MockResizeObserver as any;

const mock_render = jest.fn();
const mock_toDataURL = jest.fn();

jest.mock('../../../engine/scene/Scene', () => {
    return {
        DIVEScene: jest.fn(function () {
            this.add = jest.fn();
            this.children = [];
            this.Root = {
                children: [],
            };
            return this;
        }),
    };
});

jest.mock('../../../engine/camera/PerspectiveCamera', () => {
    return {
        DIVEPerspectiveCamera: jest.fn(function () {
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
            };
            this.onResize = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../../modules/controller/orbit/OrbitController', () => {
    return {
        DIVEOrbitController: jest.fn(function () {
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
                onResize: jest.fn(),
            };

            this.target = {
                clone: jest.fn(),
                copy: jest.fn(),
            };

            this.update = jest.fn();

            return this;
        }),
    };
});

jest.mock('../../../engine/renderer/Renderer', () => {
    return {
        DIVERenderer: jest.fn(function () {
            this.domElement = {
                toDataURL: mock_toDataURL,
            };
            this.render = mock_render;
            this.onResize = jest.fn();
            return this;
        }),
    };
});

jest.mock('../../../modules/animation/AnimationSystem', () => {
    return {
        DIVEAnimationSystem: jest.fn(function () {
            this.domElement = {
                toDataURL: mock_toDataURL,
            };
            this.render = mock_render;
            this.OnResize = jest.fn();
            this.AddPreRenderCallback = jest.fn((callback) => {
                callback();
                return 'id';
            });
            return this;
        }),
    };
});

const mockRenderer = new DIVERenderer();
const mockScene = new DIVEScene();
const mockCamera = new DIVEPerspectiveCamera();
const mockPipeline = new DIVERenderPipeline(
    mockRenderer,
    mockScene,
    mockCamera,
);
const mockAnimationSystem = new DIVEAnimationSystem();
const mockOrbitController = new DIVEOrbitController(
    mockCamera,
    mockRenderer,
    mockPipeline,
    mockAnimationSystem,
);
let mediaCreator: MediaCreator;

describe('MediaCreator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mediaCreator = new MediaCreator(
            mockRenderer,
            mockScene,
            mockOrbitController,
        );
    });

    it('should instantiate', () => {
        expect(mediaCreator).toBeDefined();
    });

    it('should generate media', () => {
        const mock_POV = {
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
        } as COMPov;
        expect(() => {
            mediaCreator.GenerateMedia(
                mock_POV.position,
                mock_POV.target,
                800,
                600,
            );
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
