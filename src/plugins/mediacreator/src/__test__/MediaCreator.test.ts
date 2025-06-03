import { MediaCreator } from '../MediaCreator.ts';
import {
    DIVEPerspectiveCamera,
    DIVERenderPipeline,
    DIVEScene,
} from '@shopware-ag/dive';
import { OrbitController } from 'src/plugins/orbitcontroller/index.ts';
import { type PovSchema } from '@shopware-ag/dive';

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

const mock_render = vi.fn();
const mock_toDataURL = vi.fn();

vi.mock('@shopware-ag/dive', () => {
    return {
        DIVERenderPipeline: vi.fn(function (this: any) {
            this.webglrenderer = {
                domElement: {
                    toDataURL: mock_toDataURL,
                },
                render: mock_render,
            };
            this.onResize = vi.fn();
            return this;
        }),
        DIVEPerspectiveCamera: vi.fn(function (this: any) {
            this.position = {
                clone: vi.fn(),
                copy: vi.fn(),
            };
            this.quaternion = {
                clone: vi.fn(),
                copy: vi.fn(),
            };
            this.layers = {
                mask: 0,
            };
            this.onResize = vi.fn();
            return this;
        }),
        DIVEScene: vi.fn(function (this: any) {
            this.add = vi.fn();
            this.children = [];
            this.root = {
                children: [],
            };
            return this;
        }),
    };
});

vi.mock('@shopware-ag/dive/orbitcontroller', () => {
    return {
        OrbitController: vi.fn(function (this: any) {
            this.object = {
                position: {
                    clone: vi.fn(),
                    copy: vi.fn(),
                },
                quaternion: {
                    clone: vi.fn(),
                    copy: vi.fn(),
                },
                layers: {
                    mask: 0,
                },
                onResize: vi.fn(),
            };

            this.target = {
                clone: vi.fn(),
                copy: vi.fn(),
            };

            this.update = vi.fn();

            return this;
        }),
    };
});

vi.mock('@shopware-ag/dive/animation', () => {
    return {
        DIVEAnimationSystem: vi.fn(function (this: any) {
            this.domElement = {
                toDataURL: mock_toDataURL,
            };
            this.render = mock_render;
            this.OnResize = vi.fn();
            this.AddPreRenderCallback = vi.fn((callback) => {
                callback();
                return 'id';
            });
            return this;
        }),
    };
});

const mockScene = new DIVEScene();
const mockCamera = new DIVEPerspectiveCamera();
const mockRenderer = new DIVERenderPipeline(mockScene, mockCamera);
const mockOrbitController = new OrbitController(
    mockCamera,
    mockRenderer.webglrenderer.domElement,
);
let mediaCreator: MediaCreator;

describe('MediaCreator', () => {
    beforeEach(() => {
        vi.clearAllMocks();
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
        } as PovSchema;
        expect(() => {
            mediaCreator.generateMedia(
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
        mediaCreator.drawCanvas(canvas);
        expect(mock_render).toHaveBeenCalledTimes(1);
    });
});
