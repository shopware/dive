/**
 * @jest-environment jsdom
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock ResizeObserver
class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
global.ResizeObserver = MockResizeObserver as any;

const originalCreateElement = document.createElement.bind(document);

const mockRender = vi.fn();
const mockToDataURL = vi.fn().mockReturnValue('data:image/png;base64,test');
const mockSetRenderTarget = vi.fn();
const mockGetRenderTarget = vi.fn().mockReturnValue(null);
const mockReadRenderTargetPixelsAsync = vi.fn().mockResolvedValue(
    new Uint8Array([
        255,
        0,
        0,
        255,
    ]),
);
const mockRendererInit = vi.fn().mockResolvedValue(undefined);
const mockCreateImageData = vi.fn((width: number, height: number) => ({
    data: new Uint8ClampedArray(width * height * 4),
}));
const mockPutImageData = vi.fn();

const createMockCanvas = (): HTMLCanvasElement => {
    const canvas = originalCreateElement('canvas');

    Object.defineProperty(canvas, 'clientWidth', {
        configurable: true,
        value: 800,
    });
    Object.defineProperty(canvas, 'clientHeight', {
        configurable: true,
        value: 600,
    });
    Object.defineProperty(canvas, 'getContext', {
        configurable: true,
        value: vi.fn(() => ({
            createImageData: mockCreateImageData,
            putImageData: mockPutImageData,
        })),
    });
    Object.defineProperty(canvas, 'toDataURL', {
        configurable: true,
        value: mockToDataURL,
    });

    return canvas;
};

vi.mock('three/webgpu', async (importOriginal) => {
    const actual = await importOriginal<typeof import('three/webgpu')>();

    return {
        ...actual,
        RenderTarget: vi.fn(function (
            this: any,
            width: number,
            height: number,
        ) {
            this.width = width;
            this.height = height;
            this.dispose = vi.fn();
            return this;
        }),
    };
});

vi.mock('@shopware-ag/dive', () => {
    const MockDIVERenderer = vi.fn(function (this: any) {
        const nativeRenderer = {
            domElement: createMockCanvas(),
            render: mockRender,
            setRenderTarget: mockSetRenderTarget,
            getRenderTarget: mockGetRenderTarget,
            readRenderTargetPixelsAsync: mockReadRenderTargetPixelsAsync,
        };

        this.canvas = nativeRenderer.domElement;
        this.init = mockRendererInit;
        this.webgpurenderer = nativeRenderer;
        this.webglrenderer = nativeRenderer;
        return this;
    });

    const MockPerspectiveCamera = vi.fn(function (this: any) {
        this.position = {
            clone: vi.fn(() => ({ copy: vi.fn() })),
            copy: vi.fn(),
        };
        this.quaternion = {
            clone: vi.fn(() => ({ copy: vi.fn() })),
            copy: vi.fn(),
        };
        this.layers = {
            mask: 0,
        };
        this.onResize = vi.fn();
        return this;
    });
    (MockPerspectiveCamera as any).LIVE_VIEW_LAYER_MASK = 1;
    (MockPerspectiveCamera as any).EDITOR_VIEW_LAYER_MASK = 2;

    const MockScene = vi.fn(function (this: any) {
        this.add = vi.fn();
        this.children = [];
        this.root = {
            children: [],
        };
        return this;
    });

    return {
        DIVERenderer: MockDIVERenderer,
        DIVEPerspectiveCamera: MockPerspectiveCamera,
        DIVEScene: MockScene,
    };
});

vi.mock('@shopware-ag/dive/orbitcontroller', () => {
    return {
        OrbitController: vi.fn(function (this: any) {
            this.object = {
                position: {
                    clone: vi.fn(() => ({ copy: vi.fn() })),
                    copy: vi.fn(),
                },
                quaternion: {
                    clone: vi.fn(() => ({ copy: vi.fn() })),
                    copy: vi.fn(),
                },
                layers: {
                    mask: 0,
                },
                onResize: vi.fn(),
            };

            this.target = {
                clone: vi.fn(() => ({ copy: vi.fn() })),
                copy: vi.fn(),
            };

            this.update = vi.fn();

            return this;
        }),
    };
});

import { MediaCreator } from '../MediaCreator.ts';
import {
    DIVEPerspectiveCamera,
    DIVERenderer,
    DIVEScene,
} from '@shopware-ag/dive';
import { OrbitController } from '@shopware-ag/dive/orbitcontroller';
import { type MediaGenerationByPosition } from '../../types/index.ts';

const mockScene = new DIVEScene();
const mockCamera = new DIVEPerspectiveCamera();
const mockRenderer = new DIVERenderer(mockScene, mockCamera);
const mockOrbitController = new OrbitController(
    mockCamera,
    mockRenderer.webgpurenderer.domElement,
);

describe('MediaCreator', () => {
    let mediaCreator: MediaCreator;

    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(document, 'createElement').mockImplementation(((
            tagName: string,
        ) => {
            if (tagName === 'canvas') {
                return createMockCanvas();
            }

            return originalCreateElement(tagName);
        }) as typeof document.createElement);

        mediaCreator = new MediaCreator(
            mockRenderer,
            mockScene,
            mockOrbitController,
        );
    });

    it('should instantiate', () => {
        expect(mediaCreator).toBeDefined();
    });

    it('should generate media by position', async () => {
        const options: MediaGenerationByPosition = {
            position: { x: 0, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
            resolution: {
                width: 2,
                height: 1,
            },
        };

        const dataUri = await mediaCreator.generateMedia(options);

        expect(mockRendererInit).toHaveBeenCalledTimes(1);
        expect(mockRender).toHaveBeenCalledTimes(1);
        expect(mockReadRenderTargetPixelsAsync).toHaveBeenCalledWith(
            expect.anything(),
            0,
            0,
            2,
            1,
        );
        expect(mockToDataURL).toHaveBeenCalledTimes(1);
        expect(dataUri).toBe('data:image/png;base64,test');
    });

    it('should draw into a custom canvas', async () => {
        const canvas = createMockCanvas();

        const result = await mediaCreator.drawCanvas(canvas, {
            width: 4,
            height: 4,
        });

        expect(result).toBe(canvas);
        expect(mockSetRenderTarget).toHaveBeenCalled();
        expect(mockPutImageData).toHaveBeenCalledTimes(1);
    });

    it('should restore the requested resolution when the renderer canvas has no client size', async () => {
        Object.defineProperty(mockRenderer.canvas, 'clientWidth', {
            configurable: true,
            value: 0,
        });
        Object.defineProperty(mockRenderer.canvas, 'clientHeight', {
            configurable: true,
            value: 0,
        });

        await mediaCreator.generateMedia({
            position: { x: 1, y: 2, z: 3 },
            target: { x: 4, y: 5, z: 6 },
            resolution: {
                width: 16,
                height: 9,
            },
        });

        expect(mockOrbitController.object.onResize).toHaveBeenNthCalledWith(
            1,
            16,
            9,
        );
        expect(mockOrbitController.object.onResize).toHaveBeenLastCalledWith(
            16,
            9,
        );
    });

    it('should fall back to the renderer canvas size when no resolution is provided', async () => {
        const canvas = createMockCanvas();

        Object.defineProperty(canvas, 'width', {
            configurable: true,
            value: undefined,
            writable: true,
        });
        Object.defineProperty(canvas, 'height', {
            configurable: true,
            value: undefined,
            writable: true,
        });
        Object.defineProperty(canvas, 'clientWidth', {
            configurable: true,
            value: undefined,
        });
        Object.defineProperty(canvas, 'clientHeight', {
            configurable: true,
            value: undefined,
        });
        Object.defineProperty(mockRenderer.canvas, 'clientWidth', {
            configurable: true,
            value: 321,
        });
        Object.defineProperty(mockRenderer.canvas, 'clientHeight', {
            configurable: true,
            value: 123,
        });

        const result = await mediaCreator.drawCanvas(canvas);

        expect(result.width).toBe(321);
        expect(result.height).toBe(123);
        expect(mockReadRenderTargetPixelsAsync).toHaveBeenCalledWith(
            expect.anything(),
            0,
            0,
            321,
            123,
        );
    });

    it('should throw when the output canvas has no 2D context', async () => {
        const canvas = createMockCanvas();
        Object.defineProperty(canvas, 'getContext', {
            configurable: true,
            value: vi.fn(() => null),
        });

        await expect(
            mediaCreator.drawCanvas(canvas, {
                width: 1,
                height: 1,
            }),
        ).rejects.toThrow(
            'MediaCreator.drawCanvas: 2D canvas context is not available.',
        );
    });
});
