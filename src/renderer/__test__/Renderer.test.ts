import DIVEPerspectiveCamera from '../../camera/PerspectiveCamera';
import DIVEScene from '../../scene/Scene';
import DIVERenderer, { DIVERendererDefaultSettings } from '../Renderer';

/**
 * @jest-environment jsdom
 */

const test_uuid = 'test-uuid';

const mock_render = jest.fn();
const mock_setSize = jest.fn();
const mock_setAnimationLoop = jest.fn();

jest.mock('three', () => {
    return {
        WebGLRenderer: jest.fn(function () {
            this.domElement = {
                style: {
                    position: 'absolute',
                },
            };
            this.dispose = jest.fn();
            this.debug = {
                checkShaderErrors: true,
            };
            this.setSize = mock_setSize;
            this.setPixelRatio = jest.fn();
            this.render = mock_render;
            this.setAnimationLoop = mock_setAnimationLoop;
            this.shadowMap = {
                enabled: false,
            };
            return this;
        }),
        MathUtils: {
            generateUUID: () => { return test_uuid; },
        },
    }
});

let renderer: DIVERenderer;

describe('dive/renderer/DIVERenderer', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        renderer = new DIVERenderer();
    });

    it('should instantiate', () => {
        expect(renderer).toBeDefined();
    });

    it('should instantiate with settings parameter', () => {
        renderer = new DIVERenderer(DIVERendererDefaultSettings);
        expect(renderer).toBeDefined();
    });

    it('should dispose', () => {
        renderer.Dispose();
    });

    it('should start render', () => {
        expect(() => { renderer.StartRenderer({} as DIVEScene, {} as DIVEPerspectiveCamera) }).not.toThrow();
        expect(renderer['running']).toBe(true);
    });

    it('should pause render', () => {
        renderer.StartRenderer({} as DIVEScene, {} as DIVEPerspectiveCamera);
        expect(() => { renderer.PauseRenderer() }).not.toThrow();
        expect(renderer['paused']).toBe(true);
    });

    it('should resume render', () => {
        renderer.StartRenderer({} as DIVEScene, {} as DIVEPerspectiveCamera);
        renderer.PauseRenderer();
        expect(() => { renderer.ResumeRenderer() }).not.toThrow();
        expect(renderer['paused']).toBe(false);
    });

    it('should stop render', () => {
        expect(() => { renderer.StopRenderer() }).not.toThrow();
        expect(renderer['running']).toBe(false);
    });

    it('should resize renderer', () => {
        expect(() => { renderer.OnResize(500, 500) }).not.toThrow();
        expect(mock_setSize).toHaveBeenCalledTimes(1);
    });

    it('should render', () => {
        expect(mock_render).toHaveBeenCalledTimes(0);

        renderer.StartRenderer({} as DIVEScene, {} as DIVEPerspectiveCamera);
        expect(() => { renderer['internal_render']({} as DIVEScene, {} as DIVEPerspectiveCamera) }).not.toThrow();
        expect(mock_render).toHaveBeenCalledTimes(1);
    });

    it('should force render', () => {
        expect(() => { renderer.ForceRendering() }).not.toThrow();
    });

    it('should not render when not started', () => {
        expect(mock_render).toHaveBeenCalledTimes(0);
        renderer['internal_render']({} as DIVEScene, {} as DIVEPerspectiveCamera);
        expect(mock_render).toHaveBeenCalledTimes(0);
    });

    it('should not render when stopped', () => {
        renderer.StartRenderer({} as DIVEScene, {} as DIVEPerspectiveCamera);
        renderer['internal_render']({} as DIVEScene, {} as DIVEPerspectiveCamera);
        expect(mock_render).toHaveBeenCalledTimes(1);

        renderer.StopRenderer();
        renderer['internal_render']({} as DIVEScene, {} as DIVEPerspectiveCamera);
        expect(mock_render).toHaveBeenCalledTimes(1);
    });

    it('should not render when paused', () => {
        renderer.StartRenderer({} as DIVEScene, {} as DIVEPerspectiveCamera);
        renderer['internal_render']({} as DIVEScene, {} as DIVEPerspectiveCamera);
        expect(mock_render).toHaveBeenCalledTimes(1);

        renderer.PauseRenderer();
        renderer['internal_render']({} as DIVEScene, {} as DIVEPerspectiveCamera);
        expect(mock_render).toHaveBeenCalledTimes(1);
    });

    it('should resume render when running', () => {
        renderer.StartRenderer({} as DIVEScene, {} as DIVEPerspectiveCamera);
        renderer.PauseRenderer();
        renderer['internal_render']({} as DIVEScene, {} as DIVEPerspectiveCamera);
        expect(mock_render).toHaveBeenCalledTimes(0);

        renderer.ResumeRenderer();
        renderer['internal_render']({} as DIVEScene, {} as DIVEPerspectiveCamera);
        expect(mock_render).toHaveBeenCalledTimes(1);
    });

    it('should add pre render callback', () => {
        expect(renderer.AddPreRenderCallback(() => { })).toBe(test_uuid);
        expect(renderer['preRenderCallbacks'].size).toBe(1);
    });

    it('should remove pre render callback', () => {
        const uuid = renderer.AddPreRenderCallback(() => { });
        expect(renderer.RemovePreRenderCallback(uuid)).toBe(true);
    });

    it('should not crash while removing non-existing pre render callback', () => {
        expect(() => { renderer.RemovePreRenderCallback(test_uuid) }).not.toThrow();
    });

    it('should add post render callback', () => {
        expect(renderer.AddPostRenderCallback(() => { })).toBe(test_uuid);
        expect(renderer['postRenderCallbacks'].size).toBe(1);
    });

    it('should remove post render callback', () => {
        const uuid = renderer.AddPostRenderCallback(() => { });
        expect(renderer.RemovePostRenderCallback(uuid)).toBe(true);
    });

    it('should not crash while removing non-existing post render callback', () => {
        expect(() => { renderer.RemovePostRenderCallback(test_uuid) }).not.toThrow();
    });

    it('should execute pre and post render callbacks', () => {
        renderer.StartRenderer({} as DIVEScene, {} as DIVEPerspectiveCamera);
        const precallback = jest.fn();
        const postcallback = jest.fn();
        renderer.AddPreRenderCallback(precallback);
        renderer.AddPostRenderCallback(postcallback);
        renderer['internal_render']({} as DIVEScene, {} as DIVEPerspectiveCamera);
        expect(precallback).toHaveBeenCalledTimes(1);
        expect(postcallback).toHaveBeenCalledTimes(1);
    });
});